#!/usr/bin/env node
/*
  * 样例描述：主动发起请求案例，包括自定义资源管理器，模拟鼠标滑动事件，主动发起接口请求
  * 偶现问题：代码执行失败无法执行到load，发起手动请求后报错，暂时不排查原因，报错可以多试几次
  */

try{require('module-alias')(require('../../utils/paths').basePath)}catch(err){};
const { jsdomFromUrl, jsdomFromText, logger, simpleDecrypt, jsdom } = require('sdenv');

const { ResourceLoader, agentFactory, Request } = jsdom;
const tarUrl = simpleDecrypt("UU1NSQMWFlxJTFsXWldQSVgXXlZPF1pXFn1BWxZwV11cQWl9aExcS0A=", 57)
const pageData = (pageNum) => `searchCatalogInfo.Pubtype=1&searchCatalogInfo.Ggr_Begin=20251202&searchCatalogInfo.Ggr_End=&searchCatalogInfo.Pd_Begin=&searchCatalogInfo.Pd_End=&searchCatalogInfo.An=&searchCatalogInfo.Pn=&searchCatalogInfo.Ad_Begin=&searchCatalogInfo.Ad_End=&searchCatalogInfo.E71_73=&searchCatalogInfo.E72=&searchCatalogInfo.Edz=&searchCatalogInfo.E51=&searchCatalogInfo.Ti=&searchCatalogInfo.Abs=&searchCatalogInfo.Edl=&searchCatalogInfo.E74=&searchCatalogInfo.E30=&searchCatalogInfo.E66=&searchCatalogInfo.E62=&searchCatalogInfo.E83=&searchCatalogInfo.E85=&searchCatalogInfo.E86=&searchCatalogInfo.E87=&pageModel.pageNum=${pageNum}&pageModel.pageSize=3&sortFiled=ggr_desc&searchAfter=&showModel=1&isOr=False&__RequestVerificationToken=CfDJ8DmajzUhF49Oo6dsdTmCn0-wXMierHYJssQLm03PhA7X98Kob6GL4SaXMjM0obKy8xviA_OnObYwjuDwHQnQIVC33bywCUFA7pkaynRxICKTeRMlamkyYh-qxg0SNBY54-QyKZ8fUlcWCp5o0z69mFw`;

class ExampleLoader extends ResourceLoader {
  fetch(url, options) {
    if (url.includes("/Dxb/IndexPDQuery")) {
      return this.fetchCus(url, options);
    }
    if (/(jpg|png|undefined|css)$/.test(url) || url.indexOf('data:image') === 0 || url.includes('jiucuo.js')) return null;
    return super.fetch(url, options);
  }
  fetchCus(url, { accept = '*/*', cookieJar } = {}) {
    const u = new URL(url);

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": this._userAgent,
      "Referer": tarUrl,
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Accept": accept,
    };
    const agents = agentFactory(this._proxy, this._strictSSL);
    const requestClient = new Request(
      url,
      { followRedirects: true, cookieJar, agents },
      { headers }
    );
    const promise = new Promise((resolve, reject) => {
      const accumulated = [];
      requestClient.once("response", res => {
        if (res.statusCode === 502) logger.warn(res.statusMessage, ', url: ', url);
        promise.response = res;
      });
      requestClient.on("data", chunk => {
        accumulated.push(chunk);
      });
      requestClient.on("end", () => resolve(Buffer.concat(accumulated)));
      requestClient.on("error", reject);
    });
    requestClient.on("end", () => {
      promise.href = requestClient.currentURL;
    });
    promise.abort = requestClient.abort.bind(requestClient);
    promise.getHeader = name => headers[name] || requestClient.getHeader(name);
    requestClient.end();
    return promise;
  }
}

const resources = new ExampleLoader({
  strictSSL: false,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  // proxy: "http://127.0.0.1:8888",
});

async function loadPagesSecond(url, cookieJar) {
  const { window } = await jsdomFromUrl(url, {
    cookieJar,
    consoleConfig: { error: new Function },
    resources,
  });
  const title = window.document.title || window.document.querySelector('meta[name="keywords"]')?.content;
  if (title) {
    logger.info(`cookie验证通过，网站名称或者描述为：${title}`);
  } else {
    logger.error('cookie验证不通过！')
    process.exit();
  }
  window.addEventListener("load", () => {
    setTimeout(() => {
      const mousemoveNum = Math.floor(Math.random() * 151) + 50;
      for (let i = 0; i < mousemoveNum; i++) {
        const evt = new window.MouseEvent("mousemove", {
          screenX: i,
          screenY: i,
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: 0,
          view: window,
          which: 0,
        }, { isTrusted: true });
        Object.defineProperty(evt, "timeStamp", {
          value: window.performance.now(),
        });
        window.document.dispatchEvent(evt);
      }
      for (let i = 1; i <= 2; i++) {
        window.$.ajax({
          url: "/Dxb/PageQuery",
          type: "post",
          data: pageData(i),
          success: function (datas) {
            try {
              const dom = jsdomFromText(datas)
              logger.info(`第${i}页数据：`, [...dom.window.document.querySelectorAll('.item .title')].map(it => it.textContent.trim()).join('、'));
            } catch (err) {
              logger.error('解析dom失败：', datas);
            }
          },
          error: function (datas) {
            logger.error(`第${i}页数据获取失败! status: ${datas.status}, status text: ${datas.statusText}, response text: ${JSON.stringify(datas.responseText)}`);
          }
        });
      }
    }, 1000);
  });
}

async function loadPagesFirst(url) {
  const dom = await jsdomFromUrl(url, { resources });
  const { window, cookieJar } = dom;
  window.addEventListener('sdenv:location.replace', (e) => {
    e.target.close();
    logger.debug('生成cookie：', cookieJar.getCookieStringSync(url));
    loadPagesSecond(e.detail.url, cookieJar);
  })
}

loadPagesFirst(tarUrl)
