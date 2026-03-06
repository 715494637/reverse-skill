# JS逆向入门案例-补环境 新版(Jsvmp) x点w_tsfp参数逆向-11

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/144231814
- 序号：54
- 标签：JSVMP/VMP、补环境、Cookie、签名参数、指纹
- 页面信息：原创 已于 2025-04-08 20:51:40 修改 · 2.2k 阅读 · 7 · 13 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2024-12-04 10:49:05 首次发布 原创 已于 2025-04-08 20:51:40 修改 · 2.2k 阅读 · 7 · 13 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-补环境 新版(Jsvmp) x点w_tsfp参数逆向-11」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`w_tsfp`、`COOKIE`、`cookie`、`cookieTemp`、`cookieEnabled`、`hook-cookie`

## 核心链路（提纯）
1. 打开网页，按F12，发现一个debugger，直接使用hook
2. 再通过 hook cookie 找到生成w_tsfp位置
3. 找到生成改参数的js文件，发现是一个vmp,之前旧版的是一个正常的混淆js代码
4. 下面是新版的js代码，它们的加密逻辑没变，js换成了vmp
5. 下面我们直接拿下新版的js，进行补环境：划下水，直接看环境
6. 至于python代码，可以看看之前发过的那篇旧版的补环境
7. 找到反爬位置-hook-cookie
8. 补环境-格式化检测
9. 提示：仅供学习交流，不得用作商业交易，如果有侵权，请及时联系 x点w_tsfp参数逆向（补环境COOKIE） URL：aHR0cHM6Ly93d3cucWlkaWFuLmNvbS9hbGwv
10. 提示：通过proxy代理，手补环境

## 关键文字线索
- 概要整体架构流程技术细节小结
- 打开网页，按F12，发现一个debugger，直接使用hook
- 再通过 hook cookie 找到生成w_tsfp位置
- 找到生成改参数的js文件，发现是一个vmp,之前旧版的是一个正常的混淆js代码
- 下面是新版的js代码，它们的加密逻辑没变，js换成了vmp
- 下面我们直接拿下新版的js，进行补环境：划下水，直接看环境
- 至于python代码，可以看看之前发过的那篇旧版的补环境
- 找到反爬位置-hook-cookie
- 提示：仅供学习交流，不得用作商业交易，如果有侵权，请及时联系 x点w_tsfp参数逆向（补环境COOKIE） URL：aHR0cHM6Ly93d3cucWlkaWFuLmNvbS9hbGwv
- 提示：通过proxy代理，手补环境
- 提示：v:wzwzwz0613拉进群

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/83c428919eef4965b367edb8360a6742.png
- 图2：https://i-blog.csdnimg.cn/direct/e957971164f94b5885174f54acdcb357.png
- 图4：https://i-blog.csdnimg.cn/direct/4317d77aa36449c48c047597cf20a9d7.png
- 图5：https://i-blog.csdnimg.cn/direct/60a6e970867048198cfa791cb7a44eb1.png
- 图7：https://i-blog.csdnimg.cn/direct/9176d9535e53436ca8073a1b5b5f8e52.png
- 图8：https://i-blog.csdnimg.cn/direct/fc9becad0d804a8eaea2b3b0b577cd94.png

## 代码/算法线索
- 片段1：

```text
(function () { 'use strict'; var debs = Function.prototype.constructor Function.prototype.constructor = function(X){ if(X!="debugger") {return degs(X);} return function(){}; }; })(); 运行项目并下载源码javascript运行123456789
```
- 片段2：

```text
(function () { 'use strict'; var debs = Function.prototype.constructor Function.prototype.constructor = function(X){ if(X!="debugger") {return degs(X);} return function(){}; }; })();
```
- 片段3：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { debugger; console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })(); 运行项目并下载源码javascript运行12345678910111213141516
```
- 片段4：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { debugger; console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })();
```
- 片段5：

```text
__process = process; Object.defineProperties(globalThis, { [Symbol.toStringTag]: { value: "Window" } }) window = globalThis; delete global; delete Buffer; delete process; document = { cookie:'' } location = { "ancestorOrigins": {}, "href": "脱密处理", "origin": "脱密处理", "protocol": "https:", "host": "脱密处理", "hostname": "脱密处理", "port": "", "pathname": "", "search": "", "hash": "" } navigator = { appCodeName:"Mozilla", appName:"Netscape", appVersion:"5.0 (Windows NT 10.0; Win64; x64
```
- 片段6：

```text
__process = process; Object.defineProperties(globalThis, { [Symbol.toStringTag]: { value: "Window" } }) window = globalThis; delete global; delete Buffer; delete process; document = { cookie:'' } location = { "ancestorOrigins": {}, "href": "脱密处理", "origin": "脱密处理", "protocol": "https:", "host": "脱密处理", "hostname": "脱密处理", "port": "", "pathname": "", "search": "", "hash": "" } navigator = { appCodeName:"Mozilla", appName:"Netscape", appVersion:"5.0 (Windows NT 10.0; Win64; x64
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。