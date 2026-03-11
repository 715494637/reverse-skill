module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const setFuncNative = sdenv.tools.setFuncNative;
  function Worker() {
    throw new TypeError("Illegal constructor");
  }

  setFuncNative(window.Worker = function Worker(url) {
    const self = this;
    setTimeout(() => {
      if (self.onmesssage) {
        debugger;
        self.onmessage();
      }
    }, 0);
    return {
      __proto__: Worker.prototype,
    }
  }, 1);
  // setFuncNative(window.worker.prototype.onmessage = function onmessage() {});
}
