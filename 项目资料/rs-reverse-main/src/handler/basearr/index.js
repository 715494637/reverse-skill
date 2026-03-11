const fs = require('fs');
const path = require('path');
const numarrEncrypt = require('../parser/common/numarrEncrypt');
const { simpleDecrypt, simpleEncrypt } = require('@utils/simpleCrypt');
const logger = require('@utils/logger');

const modMap = fs.readdirSync(__dirname)
  .filter(f => f.endsWith('.js') && f !== 'index.js')
  .map(f => require(path.join(__dirname, f)))
  .reduce((ans, mod) => {
    mod.adapt?.forEach(it => {
      if (ans[it]) logger.warn(`${it}(${simpleDecrypt(it)})存在重复适配，请检查！`);
      ans[it] = {
        ...mod,
        ...(mod[it] || {}),
        key: it,
        func: mod.bind(null, simpleDecrypt(it)),
      };
    });
    return ans;
  }, {});

function getBasearr(func, config, deep = 0) {
  if (deep >= 1000) throw new Error('生成cookie尝试次数过多')
  const basearr = func(config);
  if (func.encryptLens && numarrEncrypt(basearr).length !== func.encryptLens) return getBasearr(func, config, deep + 1);
  return basearr;
}

module.exports = (config, gv) => {
  const mod = modMap[gv.config.hostname] || modMap[simpleEncrypt(gv.config.hostname)];
  if (mod) {
    logger.debug(`当前已适配，使用【${mod.key}(${simpleDecrypt(mod.key)})】生成basearr`);
    return getBasearr(mod.func, config);
  }
  logger.debug('默认适配器生成basearr');
  return getBasearr(modMap['Q1FYVklQVxdKXlpaF1pWVBdaVw=='].func, config);
}

module.exports.adapts = modMap;
