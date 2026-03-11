module.exports = function(cursor, globalText) {
  function addCursor(step) {
    cursor += step;
  }
  function charCodeByGlobalText(idx) {
    return globalText.charCodeAt(idx);
  }
  function getCurr(step = 0) {
    addCursor(step);
    return cursor;
  }
  function getCode(step = 0) {
    addCursor(step);
    return charCodeByGlobalText(cursor++);
  }
  function setCurr(newCursor) {
    cursor = newCursor;
  }
  function setText(newGlobalText) {
    globalText = newGlobalText;
  }
  function getList(step = 0) {
    addCursor(step);
    const len = charCodeByGlobalText(cursor);
    return {
      data: new Array(len).fill(-1).map((_, idx) => charCodeByGlobalText(cursor + idx + 1)),
      cursor, // 当前游标
      next: setCurr(cursor + len + 1), // 下一段数据游标
    }
  }
  function getLine(nextCursor) {
    const data = globalText.substr(cursor, nextCursor);
    addCursor(nextCursor);
    return data;
  }
  function init(newCursor, newText) {
    newCursor !== undefined && setCurr(newCursor);
    newText !== undefined && setText(newText);
  }
  return {
    getCode,
    getList,
    getLine,
    getCurr,
    setCurr,
    setText,
    init,
  }
}
