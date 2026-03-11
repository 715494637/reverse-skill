module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const setFuncNative = sdenv.tools.setFuncNative;
  setFuncNative(window.URL.createObjectURL = function createObjectURL (blob) {
    return `blob:${window.location.origin}/${new sdenv.memory.Date().getTime()}`;
  });

}

