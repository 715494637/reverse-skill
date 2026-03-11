const gv = require('../globalVarible');
const common = require('./common');
const logger = require('@utils/logger');

function init(coder) {
  if (!coder.$_ts || !coder.r2mkaText) throw new Error('初始化失败，请传入正确的coder对象!');
  const startTime = new Date().getTime();
  gv._setAttr('utils', common);
  gv._setAttr('ts', coder.$_ts);
  require('./r2mka').init(coder.r2mkaText);
  require('./tscp').init(coder);
  require('./constData').init(); // 常量数据初始化依赖于cp值，因此要放在cp后面

  require('./tscd').init();
  require('./meta').init();
  logger.debug(`globalVarible完成初始化！用时：${new Date().getTime() - startTime}ms`);
}
module.exports = {
  ...common,
  init,
}