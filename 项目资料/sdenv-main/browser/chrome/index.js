module.exports = (sdenv) => {
  require('./window')(sdenv);
  require('./document')(sdenv);
  require('./navigation')(sdenv);
  require('./navigator')(sdenv);
  require('./chrome')(sdenv);
  require('./visualViewport')(sdenv);
  require('./styleMedia')(sdenv);
  require('./webkitRequestFileSystem')(sdenv);
  require('./ctorRegistry')(sdenv);
  require('./location')(sdenv);
  require('./indexedDB')(sdenv);
  require('./RTCPeerConnection')(sdenv);
  require('./document-element')(sdenv);
  require('./CanvasRenderingContext2D')(sdenv);
  require('./matchMedia')(sdenv);
  require('./Request')(sdenv);
  require('./console')(sdenv);
  require('./Date')(sdenv);
  require('./URL')(sdenv);
  require('./Worker')(sdenv);
  require('./CSSStyleDeclaration')(sdenv)
  require('./Object')(sdenv)
  return sdenv;
}
