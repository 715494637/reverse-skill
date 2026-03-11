const _chunk = require('lodash/chunk');
const unescape = require('./unescape');

function findAllQuotesIndex(str) {
  const res = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '"' && str[i-1] !== '\\') res.push(i);
  }
  return res;
}

module.exports = function getImmucfg(jscode) {
  const [globalText1, cp0, cp2, globalText2] = _chunk(findAllQuotesIndex(jscode), 2)
    .map(([start, end]) => unescape(jscode.slice(start + 1, end)))
    .sort((a, b) => b.length - a.length)
    .slice(0, 4);
  return {
    globalText1,
    globalText2,
    cp0,
    cp2
  }
}
