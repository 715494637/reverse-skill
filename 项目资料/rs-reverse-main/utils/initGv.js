const paths = require('@utils/paths');
const JSON5 = require('json5');
const fs = require('fs');
const { init } = require('@src/handler/parser/');
const logger = require('./logger');
const Coder = require('@src/handler/Coder');

module.exports = function({ argv, config }) {
  const filepath = argv.file ? argv.file : paths.exampleResolve('codes', '$_ts.json');
  logger.debug(`初始化GlobalVarible变量，$_ts配置文件：${filepath}`);
  const coder = new Coder(JSON5.parse(fs.readFileSync(filepath, 'utf8')), config.immucfg);
  const { code, $_ts, codemap } = coder.run().genCodemap();
  config.codemap = codemap;
  init(coder);
};
