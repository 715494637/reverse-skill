module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const {
    setFuncNative,
    wrapFunc,
    monitor
  } = sdenv.tools

  window.closed = false;
  window.opener = null;
  window.clientInformation = window.navigator;
  window.isSecureContext = false;
  delete window.XPathException;

  setFuncNative(window.fetch = function fetch() {}, 1);
  setFuncNative(window.open = function open(url) {
    sdenv.tools.exit({ url, eventId: 'open' });
  }, 0).prototype = undefined;
  setFuncNative(window.Event, 'Event');
  setFuncNative(window.prompt = function prompt() {}, 'prompt').prototype = undefined;
  setFuncNative(window.cancelIdleCallback = function cancelIdleCallback(handle) {});
  setFuncNative(window.createImageBitmap = function createImageBitmap(image) {}, 1);
  setFuncNative(window.find = function find() {});
  setFuncNative(window.moveBy = function moveBy(deltaX, deltaY) {});
  setFuncNative(window.moveTo = function moveTo(x, y) {});
  setFuncNative(window.postMessage, 'postMessage', 1);
  setFuncNative(window.resizeBy, 'resizeBy', 2);
  setFuncNative(window.resizeTo, 'resizeTo', 2);
  setFuncNative(window.alert = (...params) => {
    window.console.log(...params);
    return process.exit;
  }, 'alert', 0);
  setFuncNative(window.atob, 'atob', 1);
  setFuncNative(window.blur, 'blur', 0);
  setFuncNative(window.btoa, 'btoa', 1);
  setFuncNative(window.cancelAnimationFrame, 'cancelAnimationFrame', 1);
  setFuncNative(window.captureEvents, 'captureEvents', 0);
  setFuncNative(window.clearInterval, 'clearInterval', 0);
  setFuncNative(window.setInterval, 'setInterval', 1);
  setFuncNative(window.clearTimeout, 'clearTimeout', 0);
  setFuncNative(window.setTimeout, 'setTimeout', 1);
  setFuncNative(window.close, 'close', 0);
  setFuncNative(window.stop, 'stop', 0);
  setFuncNative(window.confirm, 'confirm', 0);
  setFuncNative(window.focus, 'focus', 0);
  setFuncNative(window.print, 'print', 0);
  setFuncNative(window.scroll, 'scroll', 0);
  setFuncNative(window.scrollBy, 'scrollBy', 0);
  setFuncNative(window.scrollTo, 'scrollTo', 0);
  setFuncNative(window.requestAnimationFrame, 'requestAnimationFrame', 1);
  setFuncNative(window.queueMicrotask, 'queueMicrotask', 1);
  setFuncNative(window.getComputedStyle, 'getComputedStyle', 1);
  setFuncNative(window.getSelection, 'getSelection', 0);
  setFuncNative(window.releaseEvents, 'releaseEvents', 0);
  setFuncNative(window.HTMLCanvasElement);
  setFuncNative(window.HTMLCanvasElement.prototype.toBlob = function toBlob() {}, 1);
  setFuncNative(window.HTMLCanvasElement.prototype.toDataURL = function toDataURL() {}, 0);
  setFuncNative(window.reportError = function reportError() {}, 1);
  setFuncNative(window.webkitResolveLocalFileSystemURL = function webkitResolveLocalFileSystemURL() {}, 2);
  setFuncNative(window.requestIdleCallback = function requestIdleCallback() {}, 1);
  setFuncNative(window.structuredClone = function structuredClone() {}, 1);
  setFuncNative(window.webkitCancelAnimationFrame = function webkitCancelAnimationFrame() {}, 1);
  setFuncNative(window.webkitRequestAnimationFrame = function webkitRequestAnimationFrame() {}, 1);
  setFuncNative(window.getScreenDetails = function getScreenDetails() {});
  setFuncNative(window.queryLocalFonts = function queryLocalFonts() {});
  setFuncNative(window.showDirectoryPicker = function showDirectoryPicker() {});
  setFuncNative(window.showOpenFilePicker = function showOpenFilePicker() {});
  setFuncNative(window.showSaveFilePicker = function showSaveFilePicker() {});
  setFuncNative(window.CanvasRenderingContext2D = function CanvasRenderingContext2D() {}, 0);

  wrapFunc(window, "getComputedStyle", (func, ...params) => {
    return monitor(func(...params), 'sdenv:window.getComputedStyle', {
      getParse: (key, val) => {
        if (['_onChange'].includes(key)) return undefined;
        return val;
      },
    });
  });

  window.addEventListener = wrapFunc(window.document, "addEventListener", function (func, type, callback) {
    return func.call(this, type, async (...params) => {
      if (type === 'load')  {
        /* 最小次数，可多不可少
         * 瑞数：2
         */
        let mintime = 5;
        do {
          // 最少执行两次，如果内置存在timeout对象，并且有未执行的延迟为0的，则等待执行
          await sdenv.tools.delay(0);
        } while (window.sdenv.memory.timeout?.index.filter(it => it.time === 0 && it.flag === 0).length || --mintime > 0);
      }
      callback(...params)
    });
  });
}
