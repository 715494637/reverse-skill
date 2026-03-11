module.exports = (sdenv) => {
  const window = sdenv.memory.window;

  window.styleMedia = sdenv.tools.getNativeProto('StyleMedia', 'styleMedia', {
    type: 'screen'
  })[1];
}
