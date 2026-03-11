const getDocumentAll = require('../../build/Release/documentAll').getDocumentAll;
module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const { wrapFunc, monitor } = sdenv.tools;
  window.document.all = getDocumentAll({ length: 3 });
  wrapFunc(window.document, "createExpression", (func, ...params) => {
    return monitor(func(...params), 'sdenv:document.createExpression', {
      getParse: (key, val, target) => {
        if (key === 'evaluate') {
          return (contextNode, type, result) => {
            return val.call(target, contextNode, Number(type), result);
          }
        }
        return val;
      },
      handles: {
        has(target, prop) {
          if (prop === '_sdDoc') return false;
          return Reflect.has(target, prop);
        },
      }
    });
  });
}
