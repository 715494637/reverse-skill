# JS逆向-新版x球网 md5__1038参数（补环境）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/148188405
- 序号：37
- 标签：补环境
- 页面信息：原创 已于 2025-05-24 12:39:45 修改 · 3.5k 阅读 · 31 · 21 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2025-05-24 12:17:10 首次发布 原创 已于 2025-05-24 12:39:45 修改 · 3.5k 阅读 · 31 · 21 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向-新版x球网 md5__1038参数（补环境）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`md5__1038`、`md5_1038`、`_waf_bd8ce2ce37`、`key`

## 核心链路（提纯）
1. 逆向：新版x球网-md5__1038参数
2. 1、打开网站，发现立马就生成好了，那么肯定是直接用的location.href自拼接md5_1038
3. 2、那么我们就得打开f12，断脚本，去分析到底是那个文件加密拼接的href
4. 3、进行下一步，执行单步，发现是一个无限debugger，这里直接用<我真的不是蜘蛛>大佬的debugger通杀脚本
5. 4、可以使用还原网站或者v_jstools插件去还原代码，直接去找location.href,最后咱直接看位置 5、位置找到了，咱们直接将整个文件复制出来，然后补环境吧

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：新版x球网-md5__1038参数
- URL：aHR0cHM6Ly94dWVxaXUuY29tLw==
- 1、打开网站，发现立马就生成好了，那么肯定是直接用的location.href自拼接md5_1038
- 2、那么我们就得打开f12，断脚本，去分析到底是那个文件加密拼接的href
- 这里咱们可以看到断住，而且还给了一个window属性_waf_bd8ce2ce37，我们可以看到document.getElementById(‘renderData’)，直接从第一次返回的html拿的id为renderData的innerHTML
- 代理使用 window = globalThis; location ={}； document={}; navigator={}; localStorage={}; window._waf_bd8ce2ce37=浏览器直接复制出来 setProxyArr(['window ',‘location’…]);
- 相当于旧版本新增了localStorage、_waf_bd8ce2ce37
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系 最近也是有粉丝投稿，说更新下，咱也是抽时间看了下、
- 3、进行下一步，执行单步，发现是一个无限debugger，这里直接用<我真的不是蜘蛛>大佬的debugger通杀脚本
- 4、可以使用还原网站或者v_jstools插件去还原代码，直接去找location.href,最后咱直接看位置 5、位置找到了，咱们直接将整个文件复制出来，然后补环境吧
- 提示：开始挂代码补缺少的环境

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/b564baeb13e245729f5153161142d366.png（上下文：新版： 旧版：）
- 图2：https://i-blog.csdnimg.cn/direct/4ca91d1cc4f2420190ce0d7699d08097.png（上下文：新版： 旧版：）
- 图3：https://i-blog.csdnimg.cn/direct/a7eab02c453e406f93724451039b3c4b.png（上下文：1、打开网站，发现立马就生成好了，那么肯定是直接用的location.href自拼接md5_1038）
- 图4：https://i-blog.csdnimg.cn/direct/eedb07756010400cadb6a8649303805b.png（上下文：2、那么我们就得打开f12，断脚本，去分析到底是那个文件加密拼接的href）
- 图6：https://i-blog.csdnimg.cn/direct/944aea90e7534b8388820813a2ff6ac0.png（上下文：4、可以使用还原网站或者v_jstools插件去还原代码，直接去找location.href,最后咱直接看位置 5、位置找到了，咱们直接将整个文件复制出来，然后补环境吧）
- 图9：https://i-blog.csdnimg.cn/direct/0a6629171f61442698fd46604ba97761.png（上下文：提示：结果）

## 代码/算法线索
- 片段1：

```text
(function() { // 立即执行函数，创建独立作用域 'use strict'; // 启用严格模式，防止一些不规范的代码写法 // 调试配置对象 //按0开启日志，默认关闭 const DEBUG = { enable: 1, // 控制是否输出日志信息的开关 deb: 1 // 控制是否在关键位置设置断点的开关 }; // 定义日志输出函数，根据 DEBUG.enable 决定是否输出日志 const log = function(...args) { if (DEBUG.enable == 0) { console.log(...args); } }; // 保存原始的 setInterval 函数 var originalSetInterval = window.setInterval; // 用新的函数替换原始的 setInterval window.setInterval = function(callback, delay) { // 获取除了 callback 和 delay 的其他额外参数 var args = Arr
```
- 片段2：

```text
(function() { // 立即执行函数，创建独立作用域 'use strict'; // 启用严格模式，防止一些不规范的代码写法 // 调试配置对象 //按0开启日志，默认关闭 const DEBUG = { enable: 1, // 控制是否输出日志信息的开关 deb: 1 // 控制是否在关键位置设置断点的开关 }; // 定义日志输出函数，根据 DEBUG.enable 决定是否输出日志 const log = function(...args) { if (DEBUG.enable == 0) { console.log(...args); } }; // 保存原始的 setInterval 函数 var originalSetInterval = window.setInterval; // 用新的函数替换原始的 setInterval window.setInterval = function(callback, delay) { // 获取除了 callback 和 delay 的其他额外参数 var args = Arr
```
- 片段3：

```text
//代理 function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", t
```
- 片段4：

```text
//代理 function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", t
```
- 片段5：

```text
_log = console.log; window = globalThis; location = { 自己去浏览器拿 } document = { location: location, createElement: function (res) {if (res === 'div') {return {firstChild: location}}}, documentElement: {getAttribute:function(){return null}} }; navigator = { webdriver: false }; local = {}; localStorage = { setItem: function (key, value) { this[key] = value; }, getItem: function (key) { if (local.includes(key)) { return local[key]; } return null; }, removeItem: function (key) { if 
```
- 片段6：

```text
_log = console.log; window = globalThis; location = { 自己去浏览器拿 } document = { location: location, createElement: function (res) {if (res === 'div') {return {firstChild: location}}}, documentElement: {getAttribute:function(){return null}} }; navigator = { webdriver: false }; local = {}; localStorage = { setItem: function (key, value) { this[key] = value; }, getItem: function (key) { if (local.includes(key)) { return local[key]; } return null; }, removeItem: function (key) { if 
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。