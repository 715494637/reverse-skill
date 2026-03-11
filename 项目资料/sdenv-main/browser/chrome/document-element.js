module.exports = (sdenv) => {
  const document = sdenv.memory.window.document;
  const getElementsByTagNameOri = document.getElementsByTagName;
  document.getElementsByTagName = (...params) => {
    var findArr = getElementsByTagNameOri.apply(document, params);
    if (params[0] === 'script') {
      findArr = [...findArr].filter(it => it.getAttribute('script-type') !== 'sdenv');
      var lastIdx = findArr.length - 1;
      if (lastIdx > -1) {
        return [...findArr].slice(0, lastIdx).map(it => {
          it.innerText = it.textContent;
          return it;
        });
      }
    }
    return findArr;
  }
}
