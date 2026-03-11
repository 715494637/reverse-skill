#!/usr/bin/env node
/*
  * 样例描述：被动获取请求数据案例，如拦截打印页面初始化接口请求
  */

try{require('module-alias')(require('../../utils/paths').basePath)}catch(err){};
const { jsdomFromUrl, logger, simpleDecrypt } = require('sdenv');
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

const baseUrl = simpleDecrypt("UU1NSUoDFhZDUVhWSVBXF0peWloXWlZUF1pX")

async function loadPagesSecond(url, cookieJar) {
  const { window } = await jsdomFromUrl(url, {
    cookieJar,
    userAgent,
    consoleConfig: { error: new Function },
    beforeParse: (window, sdenv) => {
      sdenv.tools.wrapFunc(window.document, "querySelector", function (func, selector, ...params) {
        if (selector === ':has(*,:jqfake)') {
          throw new SyntaxError(`Failed to execute 'querySelector' on 'Document': '${selector}' is not a valid selector.`);
        }
        return func.call(this, selector, ...params);
      });
      sdenv.getHandle('request')({ cb: ({ response, url, status }) => {
        if (url.indexOf(`${baseUrl}/sgcchr/index/notes_list`) === 0) {
          logger.info(`链接: ${url.replace(baseUrl, '')} 返回数据: ${sdenv.tools.compressText(response, 400)}`);
          process.exit();
        }
      } })
    }
  });
  const title = window.document.title || window.document.querySelector('meta[name="keywords"]')?.content;
  if (title) {
    logger.info(`cookie验证通过，网站名称或者描述为：${title}`);
  } else {
    logger.error('cookie验证不通过！')
  }
}

async function loadPagesFirst(url) {
  const { window, cookieJar } = await jsdomFromUrl(url, { userAgent });
  window.addEventListener('sdenv:location.replace', (e) => {
    e.target.close();
    logger.debug('生成cookie：', cookieJar.getCookieStringSync(url));
    loadPagesSecond(e.detail.url, cookieJar);
  })
}

loadPagesFirst(`${baseUrl}/sgcchr/static/dynaAument.html`)
