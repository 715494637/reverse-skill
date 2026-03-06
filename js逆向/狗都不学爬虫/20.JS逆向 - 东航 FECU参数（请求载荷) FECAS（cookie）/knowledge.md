# JS逆向 - 东航 FECU参数（请求载荷) FECAS（cookie）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/150001098
- 序号：20
- 标签：补环境、Cookie、指纹
- 页面信息：原创 已于 2025-08-07 10:33:18 修改 · 1.6k 阅读 · 13 · 33 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #网络爬虫 #爬虫 #wasm #python 于 2025-08-07 10:31:06 首次发布 原创 已于 2025-08-07 10:33:18 修改 · 1.6k 阅读 · 13 · 33 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 东航 FECU参数（请求载荷) FECAS（cookie）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`FECU`、`FECAS`、`cookie`、`Hook-cookie`、`cookieTemp`、`key`、`ws2024_hex_md5`、`MD5`、`cookie_FECWS`、`phantomjs`、`AES`

## 核心链路（提纯）
1. 逆向：JS逆向 - 东航 FECU参数（请求载荷) FECAS（cookie）
2. 输入航班号，点击搜索
3. flightInformation接口会拼接一个参数：FECU（加密）
4. 观察cookie，你会发现有一个FECAS，它加密的结果发现跟FECU的格式是一致的，那么我们直接就可以hook这个参数的生成
5. 浏览器Hook-cookie
6. 发现是一个hxk_fec_0defe817.js文件js里面生成的
7. 这里我们给它还原一下Ob，再替换上去
8. 重新无痕进入断点，进入a0_0x221cae函数
9. 观察配置参数生成：全局搜索a0_0x37e883，发现是a0_0x4cb936函数生成
10. 可以看到配置参数其实就是全局fecBaseConfig_wsyzwdbq和dom标签里面去拿wsyzwdbq值
11. 接下来就差a0_0x1d5399数组了，然后通过a0_0x3af7a3(a0_0x46d3de(a0_0x1d5399))加密生成最后的FECAS
12. 这里发现第8个数组会取sessionStorage.getItem(“fi”)，后面会发现它其实是一个FP指纹ws2024_hex_md5(JSON.stringify(new Fingerprint().get()))，ws2024_hex_md5是标准MD5加密

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 东航 FECU参数（请求载荷) FECAS（cookie）
- URL：aHR0cHM6Ly93d3cuY2VhaXIuY29tL3NlbGYtc2VydmljZS9iZWZvcmUvZmxpZ2h0LXN0YXR1cw==
- flightInformation接口会拼接一个参数：FECU（加密）
- 观察cookie，你会发现有一个FECAS，它加密的结果发现跟FECU的格式是一致的，那么我们直接就可以hook这个参数的生成
- 浏览器Hook-cookie
- 发现是一个hxk_fec_0defe817.js文件js里面生成的
- 这里我们给它还原一下Ob，再替换上去
- 还原网站：https://webcrack.netlify.app/
- 还原后发现是a0_0x221cae函数生成
- 重新无痕进入断点，进入a0_0x221cae函数
- 观察配置参数生成：全局搜索a0_0x37e883，发现是a0_0x4cb936函数生成
- 可以看到配置参数其实就是全局fecBaseConfig_wsyzwdbq和dom标签里面去拿wsyzwdbq值
- fecBaseConfig_wsyzwdbq：fec_wrapper文件js获取，wsyzwdbq首页获取
- _0x38fad5的值是取的浏览器中的cookie:FECW（首页返回的）
- 接下来就差a0_0x1d5399数组了，然后通过a0_0x3af7a3(a0_0x46d3de(a0_0x1d5399))加密生成最后的FECAS
- 这里发现第8个数组会取sessionStorage.getItem(“fi”)，后面会发现它其实是一个FP指纹ws2024_hex_md5(JSON.stringify(new Fingerprint().get()))，ws2024_hex_md5是标准MD5加密
- window.sessionStorage.getItem(“fi”) === ws2024_hex_md5(JSON.stringify(new Fingerprint().get()))
- 这里a0_0x1d5399[“8”]取的ws2024_hex_md5(JSON.stringify(“none”))
- 最后就是数组中5，6，7的来历，和a0_0x46d3de、a0_0x3af7a3的加密

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/2699220c7f7742cb97030569d640a5b0.png
- 图2：https://i-blog.csdnimg.cn/direct/a68bd27e248b420c90d0cde26b2b2984.png（上下文：输入航班号，点击搜索）
- 图3：https://i-blog.csdnimg.cn/direct/4d7b360263b443ed8372b66200e14662.png（上下文：观察cookie，你会发现有一个FECAS，它加密的结果发现跟FECU的格式是一致的，那么我们直接就可以hook这个参数的生成）
- 图5：https://i-blog.csdnimg.cn/direct/d6954012310e42c2b6605c24307b969c.png（上下文：发现是一个hxk_fec_0defe817.js文件js里面生成的）
- 图6：https://i-blog.csdnimg.cn/direct/7868bfde1b6442f1b24bbdc07ac9dc2e.png（上下文：还原后发现是a0_0x221cae函数生成）
- 图7：https://i-blog.csdnimg.cn/direct/b2179b252aa947e49c1bc7bcfcf401eb.png（上下文：重新无痕进入断点，进入a0_0x221cae函数）
- 图8：https://i-blog.csdnimg.cn/direct/17d60481aa3d40d38346a2f5e8a0b96e.png（上下文：观察配置参数生成：全局搜索a0_0x37e883，发现是a0_0x4cb936函数生成）
- 图10：https://i-blog.csdnimg.cn/direct/e15d013e78424870808ba78672c2ef73.png（上下文：_0x38fad5的值是取的浏览器中的cookie:FECW（首页返回的））
- 图12：https://i-blog.csdnimg.cn/direct/27c9cf88fdfb4be991c479ef25a8ba9d.png（上下文：搜索a0_0x1d5399[“5”]发现是dom的事件计数处理）
- 图13：https://i-blog.csdnimg.cn/direct/4804e12e39f74e44b77c3c67dd225625.png（上下文：a0_0x46d3de加密）
- 图15：https://i-blog.csdnimg.cn/direct/cca3723a393d437bbd225797fa941baa.png（上下文：a0_0x3af7a3：通过这个去加密生成_0x4789e4.apply(this, arguments)）
- 图16：https://i-blog.csdnimg.cn/direct/dca4138ef6c3451c83dce5231ece6169.png（上下文：观察_0x4789e4发现就是从配置参数里面取key进行处理分割，然后进行AES加密）

## 代码/算法线索
- 片段1：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { if(val.indexOf('FECAS') != -1){ debugger; } console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })(); AI写代码javascript运行1234567891011121314151617
```
- 片段2：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { if(val.indexOf('FECAS') != -1){ debugger; } console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })();
```
- 片段3：

```text
function a0_0x4cb936() { try { var _0x3bc9d7 = window.fecBaseConfig_wsyzwdbq || document.getElementById("wsyzwdbq").innerHTML.replace(/[\r\n]/g, ""); var _0x56bb09 = _0x3bc9d7.split(","); var _0x2bf7e0 = [2, 3, 6, 7, 8, 9]; var _0x2c9f0e = ""; for (var _0x3335d3 = 0; _0x3335d3 < _0x2bf7e0.length; _0x3335d3++) { var _0x31ce27 = _0x2bf7e0[_0x3335d3]; for (var _0x1a2034 = 1; _0x1a2034 <= 32; _0x1a2034++) { if (_0x1a2034 * _0x31ce27 >= 32 + _0x31ce27) { break; } _0x2c9f0e += _0x5
```
- 片段4：

```text
function a0_0x4cb936() { try { var _0x3bc9d7 = window.fecBaseConfig_wsyzwdbq || document.getElementById("wsyzwdbq").innerHTML.replace(/[\r\n]/g, ""); var _0x56bb09 = _0x3bc9d7.split(","); var _0x2bf7e0 = [2, 3, 6, 7, 8, 9]; var _0x2c9f0e = ""; for (var _0x3335d3 = 0; _0x3335d3 < _0x2bf7e0.length; _0x3335d3++) { var _0x31ce27 = _0x2bf7e0[_0x3335d3]; for (var _0x1a2034 = 1; _0x1a2034 <= 32; _0x1a2034++) { if (_0x1a2034 * _0x31ce27 >= 32 + _0x31ce27) { break; } _0x2c9f0e += _0x5
```
- 片段5：

```text
_0x55ff4e = JSON.parse(JSON.stringify(navigator.userAgent)); // cookie_FECWS 进行MD5 a0_0x1d5399["0"] = ws2024_hex_md5(_0x38fad5); // a0_0x1d5399["8"] = window.sessionStorage.getItem("fi") || ws2024_hex_md5(JSON.stringify("none")); // ua 进行MD5 a0_0x1d5399["9"] = ws2024_hex_md5(_0x55ff4e); // window下面属性 a0_0x1d5399["10"] = a0_0x5315bd(); // 自动化检测 a0_0x1d5399["2"] = a0_0x157b45(); // 固定false a0_0x1d5399["3"] = _0x2383e8; // 固定返回“None” a0_0x1d5399["4"] = a0_0x32de1d(); // (start_t
```
- 片段6：

```text
_0x55ff4e = JSON.parse(JSON.stringify(navigator.userAgent)); // cookie_FECWS 进行MD5 a0_0x1d5399["0"] = ws2024_hex_md5(_0x38fad5); // a0_0x1d5399["8"] = window.sessionStorage.getItem("fi") || ws2024_hex_md5(JSON.stringify("none")); // ua 进行MD5 a0_0x1d5399["9"] = ws2024_hex_md5(_0x55ff4e); // window下面属性 a0_0x1d5399["10"] = a0_0x5315bd(); // 自动化检测 a0_0x1d5399["2"] = a0_0x157b45(); // 固定false a0_0x1d5399["3"] = _0x2383e8; // 固定返回“None” a0_0x1d5399["4"] = a0_0x32de1d(); // (start_t
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。