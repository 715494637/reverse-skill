const logger = require('./logger');
const ifConditional2switch = require('sdenv-extract/src/plugins/ifConditional2switch');

module.exports = function getCodemap(jscode) {
  const result = ifConditional2switch(null, { input: jscode });
  const content = result.filter(it => it.path.indexOf('main_codemap') === 0).pop()?.content;
  if (!content) throw new Error('codemap获取失败，请检查！');
  return JSON.parse(content);
}
