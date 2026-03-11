const AppCode = require('./handler/AppCode');
const paths = require('@utils/paths');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');
const unescape = require('@utils/unescape');
const gv = require('@src/handler/globalVarible');
const getCode = require('@utils/getCode');
const { getLength } = require('@src/handler/parser/common');
const getImmucfg = require('@utils/getImmucfg');

function filenameAddDesc(name, desc) {
  const arr = name.split('.');
  if (arr.length < 2) arr.push('js');
  if (arr.length < 2) throw new Error(`文件名不正确: ${name}`);
  arr[arr.length - 2] += desc;
  return arr.join('.');
}
function writeFile(step, ts, immucfg, { jscode, html, appcode = [] }, $_ts, code, codePure, outputResolve) {
  const files = [
    {
      name: 'ts.json',
      desc: '原始$_ts：',
      text: JSON.stringify(ts),
    },
    {
      name: 'immucfg.json',
      desc: '静态文本：',
      text: JSON.stringify(immucfg),
    },
    {
      name: 'ts-full.json',
      desc: '外层虚拟机生成的$_ts：',
      text: JSON.stringify($_ts),
    },
    html && { ...html, desc: 'html代码：' },
    jscode && { ...jscode, desc: '外层虚拟机代码：' },
    {
      name: filenameAddDesc(jscode.name, '-dynamic'),
      desc: `内层虚拟机代码：`,
      text: '// 该行标记来源，非动态代码生成: ' + JSON.stringify(ts) + '\n\n' + code,
    },
    codePure && {
      name: jscode ? filenameAddDesc(jscode.name, '-dynamic-pure') : 'dynamic.js',
      desc: `内层虚拟机代码（纯净）：`,
      text: '// 该行标记来源，非动态代码生成: ' + JSON.stringify(ts) + '\n\n' + codePure,
    },
    ...appcode,
    ...appcode.filter(it => it.decryptCode).map(it => ({
      name: filenameAddDesc(it.name, '-decrypt'),
      desc: `${it.name}生成的解密代码：`,
      text: it.decryptCode,
    }))
  ].filter(Boolean).map(it => ({ ...it, filepath: outputResolve('makecode-high', step, it.name) }))
  if (!fs.existsSync(outputResolve('makecode-high', step))) fse.ensureDirSync(outputResolve('makecode-high', step));
  return files;
}

function firstStep(ts, immucfg, mate, outputResolve) {
  gv._setAttr('_ts', ts);
  const coder = new Coder({
    hasCodemap: true,
    hasDebug: !!gv.config.adapt?.hasDebug,
    ...ts
  }, immucfg);
  const { code, $_ts, codemap, codePure } = coder.run();
  gv.config.codemap = codemap;
  const files = writeFile('first', ts, immucfg, mate, $_ts, code, codePure, outputResolve);
  const cookieVal = new Cookie(coder).run();
  const cookieKey = gv.utils.ascii2string(gv.keys[7]).split(';')[5] + (gv.config.adapt?.lastWord || 'T');
  return [files, `${cookieKey}=${cookieVal}`];
}

function secondStep(ts, immucfg, mate, outputResolve) {
  gv._setAttr('_ts', ts);
  const coder = new Coder(ts, immucfg);
  const { code, $_ts, codePure } = coder.run();
  mate.appcode.forEach((appcode, idx) => {
    appcode.decryptCode = new AppCode(AppCode.getParams(appcode.code), idx + 1).run();
  });
  return writeFile('second', ts, immucfg, mate, $_ts, code, codePure, outputResolve);
}

module.exports = async function (ts, outputResolve) {
  const mate = gv.argv.mate;
  if (fs.existsSync(outputResolve('makecode-high'))) {
    fse.moveSync(outputResolve('makecode-high'), outputResolve('makecode-high-old'), { overwrite: true });
  }
  const startTime = new Date().getTime();
  const [files, cookieStr] = firstStep(ts, gv.config.immucfg, mate, outputResolve);
  logger.debug(`生成cookie：${cookieStr}`);
  files.unshift('\n第1次请求保存文件：\n');
  const result = await getCode(mate.url, cookieStr);
  if (result.statusCode !== 200) throw new Error(`第二次请求返回状态码非200（${result.statusCode}）`);
  files.push('\n第2次请求保存文件：\n', ...secondStep(result.$_ts, getImmucfg(result.jscode.code), result, outputResolve));
  files.forEach(({ filepath, text, code }) => filepath && fs.writeFileSync(filepath, text || code));
  console.log([
    `\n代码还原成功！用时：${new Date().getTime() - startTime}ms\n`,
    ...files.reduce((ans, it, idx) => ([...ans, typeof it === 'string' ? it : `${it.desc}${paths.relative(it.filepath)}${idx === files.length - 1 || it.newLine ? '\n' : ''}`]), []),
  ].join('\n  '));
}