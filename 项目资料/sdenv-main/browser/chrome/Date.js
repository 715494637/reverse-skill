module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const setFuncNative = sdenv.tools.setFuncNative;

  setFuncNative(window.Date.prototype.getTime)
}
