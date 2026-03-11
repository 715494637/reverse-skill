const AppCode = require('./handler/AppCode');
const Coder = require('./handler/Coder');
const paths = require('@utils/paths');
const fs = require('fs');
const fse = require('fs-extra');
const logger = require('@utils/logger');
const gv = require('@src/handler/globalVarible');

function filenameAddDesc(name, desc) {
  const arr = name.split('.');
  if (arr.length < 2) throw new Error(`文件名不正确: ${name}`);
  arr[arr.length - 2] += desc;
  return arr.join('.');
}

function writeFile(ts, immucfg, { jscode, html, appcode = [] }, $_ts, code, codePure, outputResolve) {
  const files = [
    {
      name: 'ts.json',
      desc: '原始$_ts：',
      text: JSON.stringify(ts),
    },
    {
      name: 'ts-full.json',
      desc: '外层虚拟机生成的$_ts：',
      text: JSON.stringify($_ts),
    },
    {
      name: 'immucfg.json',
      desc: '静态文本：',
      text: JSON.stringify(immucfg),
    },
    html && { ...html, desc: 'html代码：' },
    jscode && { ...jscode, desc: '外层虚拟机代码：' },
    {
      name: jscode ? filenameAddDesc(jscode.name, '-dynamic') : 'dynamic.js',
      desc: `内层虚拟机代码：`,
      text: '// 该行标记来源，非动态代码生成: ' + JSON.stringify(ts) + '\n\n' + code,
    },
    codePure && {
      name: jscode ? filenameAddDesc(jscode.name, '-dynamic-pure') : 'dynamic.js',
      desc: `内层虚拟机代码（纯净）：`,
      text: '// 该行标记来源，非动态代码生成: ' + JSON.stringify(ts) + '\n\n' + codePure,
    },
    ...appcode.reduce((ans, it) => {
      ans.push(it);
      if (it.decryptCode) {
        ans.push({
          name: filenameAddDesc(it.name, '-decrypt'),
          desc: `${it.name}生成的解密代码：`,
          text: it.decryptCode,
        });
      }
      return ans;
    }, []),
  ].filter(Boolean).map(it => ({ ...it, filepath: outputResolve('makecode', it.name) }))
  if (!fs.existsSync(outputResolve('makecode'))) fse.ensureDirSync(outputResolve('makecode'));
  files.forEach(({ filepath, text, code }) => filepath && fs.writeFileSync(filepath, text || code));
  return files;
}

module.exports = function (ts, outputResolve) {
  const mate = gv.argv.mate;
  const startTime = new Date().getTime();
  if (fs.existsSync(outputResolve('makecode'))) {
    fse.moveSync(outputResolve('makecode'), outputResolve('makecode-old'), { overwrite: true });
  }
  const coder = new Coder(ts, gv.config.immucfg);
  const { code, $_ts, codePure } = coder.run();
  mate.appcode?.forEach((appcode, idx) => {
    appcode.decryptCode = new AppCode(AppCode.getParams(appcode.code), idx + 1).run();
  });
  const files = writeFile(ts, coder.immucfg, mate, $_ts, code, codePure, outputResolve);
  console.log([
    `\n代码还原成功！用时：${new Date().getTime() - startTime}ms\n`,
    ...files.reduce((ans, it, idx) => ([...ans, typeof it === 'string' ? it : `${it.desc}${paths.relative(it.filepath)}${idx === files.length - 1 || it.newLine ? '\n' : ''}`]), []),
  ].join('\n  '));
}
