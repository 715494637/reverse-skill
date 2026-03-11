process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.OPENSSL_LEGACY_RENEGOTIATION = "1";

const { request, cookieJar } = require('./request');
const cheerio = require('cheerio');
const isValidUrl = require('./isValidUrl');
const isFile = require('./isFile');
const logger = require('./logger');
const _get = require('lodash/get');
const urlresolve = require('url').resolve;
const paths = require('./paths');
const fs = require('fs');
const path = require('path');

function addRequestHead(uri) {
  return {
    proxy: process.env.proxy,
    gzip: true,
    uri,
    resolveWithFullResponse: true,
    simple: false,
    headers: {
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Referer': uri,
    }
  }
}

function nameHandle(name, extend) {
  return name.split('.').pop() === extend ? name : `${name}.${extend}`;
}

async function getCodeByHtml(url, cookieStr) {
  const start = Date.now();
  if (cookieStr) {
    cookieJar.setCookie(request.cookie(cookieStr), url);
  }
  if (!isValidUrl(url)) throw new Error('输入链接不正确');
  const res = await request(addRequestHead(url));
  const $ = cheerio.load(res.body);
  const scripts = [...$('script')]
  const tsscript = scripts.map(ele => $(ele).text()).filter(text => text.includes('$_ts.nsd') && text.includes('$_ts.cd'));
  if (!tsscript.length) throw new Error(`${res.body}\n错误：链接返回结果未找到cd或nsd, 请检查!`);
  const $_ts = Function('window', tsscript[0] + 'return $_ts')({});
  const metaContent = Array.from($('meta[r=m]')).map(it => it.attribs.content);
  $_ts.from = url;
  const checkSrc = (src) => (!src || (src[0] !== '/' && src.indexOf(url) === -1) || src.split('.').pop().split('?')[0] !== 'js') ? undefined : src;
  const remotes = scripts.map(it => checkSrc(it.attribs.src)).filter(Boolean);
  if (!remotes.length) throw new Error('未找到js外链，无法提取配置文本请检查!');
  const ret = {
    cookie: cookieJar.getCookieString(url).split('; '),
    $_ts,
    jscode: null,
    metaContent,
    html: {
      code: res.body,
      url,
      name: nameHandle(url.split('?')[0].split('/').pop() || 'index', 'html'),
      desc: 'html代码：'
    },
    appcode: [],
    url,
    statusCode: res.statusCode,
  }
  await getCodeByJs(remotes.map(it => urlresolve(url, it)), ret);
  logger.info(`网络请求用时：${Date.now() - start} ms`);
  if (ret.jscode) {
    if (ret.jscode.code.includes('push("gger;")')) {
      ret.$_ts.hasDebug = true;
    }
    return ret;
  }
  throw new Error('js外链中没有瑞数的代码文件');
}

async function getCodeByJs(urls, ret = { appcode: [] }) {
  for(let jsurl of urls) {
    const data = { desc: 'javascript代码：' };
    if (isValidUrl(jsurl)) {
      const resp = await request(addRequestHead(jsurl));
      Object.assign(data, {
        from: 'remote',
        url: jsurl,
        name: nameHandle(jsurl.split('?')[0].split('/').pop(), 'js'),
        code: resp.body,
      })
    } else if (isFile(paths.resolveCwd(jsurl))) {
      Object.assign(data, {
        from: 'local',
        url: paths.resolveCwd(jsurl),
        name: path.basename(jsurl) + (jsurl.split('.').pop() === 'js' ? '' : '.js'),
        code: fs.readFileSync(paths.resolveCwd(jsurl), 'utf8'),
      });
    } else {
      continue;
    }
    if (data.code.indexOf('$_ts.l__(') === 0) {
      ret.appcode.push(data);
    } else if (data.code.includes('r2mKa')) {
      ret.jscode = data;
    }
  }
  return ret;
}

module.exports = function getCode(url, ...params) {
  if (typeof url === 'string') {
    return getCodeByHtml(url, ...params);
  }
  if (Array.isArray(url)) {
    return getCodeByJs(url);
  }
}
