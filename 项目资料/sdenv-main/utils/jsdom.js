const jsdom = require('sdenv-jsdom');
const logger = require('./logger');
const paths = require('./paths');
const { JSDOM, CookieJar } = jsdom;
const browser = require('../browser/');
const version = require(paths.package).version.split('-')[0];

function wrap(func, type) {
  return (urlOrHtml, {
    // 日志打印配置对象
    consoleConfig = {},
    // 浏览器类型
    browserType = 'chrome',
    // window代理的配置对象
    windowProxyConfig = {},
    beforeParse,
    // 直接传入JSDOM或JSDOM.fromURL，参考jsdom文档
    ...config
  } = {}) => {
    if (!browser.isSupport(browserType)) throw new Error(`浏览器类型（${browserType}）不正确或未适配！`)
    const options = {
      pretendToBeVisual: true,
      cookieJar: new CookieJar(),
      beforeParse(window) {
        const sdenv = browser(window, browserType);
        sdenv.getHandle('window')(windowProxyConfig);
        beforeParse?.(window, sdenv);
      },
      ...config,
    }
    if (typeof consoleConfig === 'object') {
        const virtualConsole = new jsdom.VirtualConsole();
        virtualConsole.on("log", consoleConfig.log || logger.log.bind(logger));
        virtualConsole.on("warn", consoleConfig.warn || logger.warn.bind(logger));
        virtualConsole.on("error", consoleConfig.error || logger.error.bind(logger));
        virtualConsole.on("info", consoleConfig.info || logger.info.bind(logger));
        virtualConsole.on("table", consoleConfig.table || logger.log.bind(logger));
        virtualConsole.on("jsdomError", consoleConfig.error || logger.error.bind(logger));
        options.virtualConsole = virtualConsole;
      }
    return func(urlOrHtml, options);
  };
}

exports.jsdomFromUrl = wrap(async (url, { strictSSL = false, proxy, userAgent = `sdenv/${version}`, ...options }) => {
  // resources的配置对象，参考jsdom.ResourceLoader
  return await JSDOM.fromURL(url, {
    runScripts: "dangerously",
    resources: new jsdom.ResourceLoader({
      strictSSL,
      proxy,
      userAgent,
    }),
    ...options
  });
});

exports.jsdomFromText = wrap((html, options) => {
  return new JSDOM(html, options);
});
