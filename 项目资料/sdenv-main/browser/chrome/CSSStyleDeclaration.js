module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const { wrapFunc, monitor } = sdenv.tools;
  wrapFunc(window, "CSSStyleDeclaration", (func, ...params) => {
    return monitor(func(...params), 'sdenv:window.CSSStyleDeclaration', {
      handles: {
        construct(target, argumentsList, newTarget) {
          throw new TypeError("Illegal constructor");
        }
      }
    });
  });
}
