const SdenvExtend = require('sdenv-extend');

module.exports = (win, type = 'chrome') => {
  if (type === 'chrome') return require('./chrome/')(new SdenvExtend({ }, win));
  throw new Error(`浏览器类型${type}未适配！`);
}

module.exports.supports = ['chrome'];

module.exports.isSupport = (type) => module.exports.supports.includes(type);
