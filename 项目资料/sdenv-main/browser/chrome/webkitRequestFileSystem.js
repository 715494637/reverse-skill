module.exports = (sdenv) => {
  const window = sdenv.memory.window;

  const webkitRequestFileSystem = function webkitRequestFileSystem(type, size, successCallback, errorCallback) {
    if (typeof successCallback === 'function') {
      sdenv.memory.setTimeout(successCallback, 0);
    }
  };
  sdenv.tools.setFuncNative(webkitRequestFileSystem, 'webkitRequestFileSystem', 3);
  window.webkitRequestFileSystem = webkitRequestFileSystem;
}
