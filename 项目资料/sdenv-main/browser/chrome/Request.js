module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const { setFuncNative } = sdenv.tools;
  function Request() {
    throw new TypeError("Illegal constructor");
  }

  setFuncNative(window.Request = function Request(input, options) {
    return {
      __proto__: Request.prototype,
    }
  }, 1);
  setFuncNative(window.Request.prototype.clone = function clone() {});
}
