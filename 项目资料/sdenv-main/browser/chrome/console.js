/*
 * Object.keys(console).filter(key => typeof console[key] === 'function').map(key => ({key, name: console[key].name, length: console[key].length}))
 */
module.exports = (sdenv) => {
  const window = sdenv.memory.window;
  const setFuncNative = sdenv.tools.setFuncNative;

  [{"key":"debug","name":"debug","length":0},{"key":"error","name":"error","length":0},{"key":"info","name":"info","length":0},{"key":"log","name":"log","length":0},{"key":"warn","name":"warn","length":0},{"key":"dir","name":"dir","length":0},{"key":"dirxml","name":"dirxml","length":0},{"key":"table","name":"table","length":0},{"key":"trace","name":"trace","length":0},{"key":"group","name":"group","length":0},{"key":"groupCollapsed","name":"groupCollapsed","length":0},{"key":"groupEnd","name":"groupEnd","length":0},{"key":"clear","name":"clear","length":0},{"key":"count","name":"count","length":0},{"key":"countReset","name":"countReset","length":0},{"key":"assert","name":"assert","length":0},{"key":"profile","name":"profile","length":0},{"key":"profileEnd","name":"profileEnd","length":0},{"key":"time","name":"time","length":0},{"key":"timeLog","name":"timeLog","length":0},{"key":"timeEnd","name":"timeEnd","length":0},{"key":"timeStamp","name":"timeStamp","length":0},{"key":"context","name":"context","length":1},{"key":"createTask","name":"createTask","length":0}].forEach(it => {
    if (window.console[it.key]) {
      setFuncNative(window.console[it.key], it.name, it.length);
    }
  });
}
