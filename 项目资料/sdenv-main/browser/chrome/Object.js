module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const { wrapFunc, monitor, isWindow } = sdenv.tools;
  wrapFunc(window.Object, "getOwnPropertySymbols", (func, obj) => {
    if (isWindow(obj)) return [];
    return func(obj);
  });
}
