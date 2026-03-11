const getLens = require('./getLens');

module.exports = function (numarr) {
  const arr = [];
  for(let i = 1; i < numarr.length; i++) {
    const len = getLens(numarr, i)[0];
    if (len === 0) {
      arr.push([]);
    } else {
      arr.push(numarr.slice(i + 1, i + 1 + len));
      i += len;
    }
  }
  return arr;
}
