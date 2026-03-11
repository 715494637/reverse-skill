const logger = require('@utils/logger');
const Coder = require('./handler/Coder');
const Cookie = require('./handler/Cookie');
const unescape = require('@utils/unescape');
const paths = require('@utils/paths');
const fs = require('fs');
const gv = require('@src/handler/globalVarible');

function writefile(ts, immucfg, outputResolve) {
  // 如果是url形式的则保存ts和immucfg
  const now = new Date().getTime();
  const files = [
    {
      name: `makecookie_url_ts_${now}`,
      desc: 'url方式提取的ts：',
      text: JSON.stringify(ts),
    },
    {
      name: `makecookie_url_immutext_${now}`,
      desc: 'url方式提取的静态文本：',
      text: JSON.stringify(immucfg),
    },
  ].map(it => ({ ...it, filepath: outputResolve(it.name) + '.json' }))
  if (!fs.existsSync(paths.outputPath)) fs.mkdirSync(paths.outputPath);
  files.forEach(({ filepath, text }) => fs.writeFileSync(filepath, text))
  logger.info('url方式保存文件：\n\n  ' + files.reduce((ans, it, idx) => ([...ans, `${it.desc}${it.filepath}${idx === files.length - 1 ? '\n' : ''}`]), []).join('\n  '));
}
module.exports = function (ts, outputResolve) {
  gv._setAttr('_ts', ts);
  // if (immucfg) writefile(ts, immucfg, outputResolve);
  const startTime = new Date().getTime();
  const coder = new Coder({
    hasCodemap: true,
    hasDebug: !!gv.config.adapt?.hasDebug,
    ...ts,
  }, gv.config.immucfg);
  const { code, $_ts, codemap } = coder.run();
  gv.config.codemap = codemap;
  const cookie = new Cookie(coder).run();
  gv.metaContent?.forEach(({content, value}) => {
    console.log(`\n存在meta-content值：${content}\n解析结果：${value}`);
  });
  console.log(`\n成功生成cookie（长度：${cookie.length}），用时：${new Date().getTime() - startTime}ms`);
  const cookieStr = [
    gv.utils.ascii2string(gv.keys[7]).split(';')[5] + 'T=' + cookie,
    ...(gv.argv.url?.cookie ?? []),
  ].join(';')
  console.log(`cookie值: ${cookieStr}`)
  return cookie;
}