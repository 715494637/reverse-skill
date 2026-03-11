module.exports = function(scd, log) {
  const his = [scd];
  return function(look) {
    if (look) {
      console.log(his.length, his);
      return
    }
    if (log) console.log(scd);
    scd = 15679 * (scd & 65535) + 2531011;
    his.push(scd);
    return scd
  }
}
