# JS逆向 - 盼之（ssxmod_itna、ssxmod_itna2）纯算 + 补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/152046616
- 序号：10
- 标签：补环境、Cookie、签名参数、滑块/验证码
- 页面信息：最新推荐文章于 2026-01-20 01:11:38 发布 原创 于 2025-09-24 17:55:36 发布 · 3k 阅读 · 7 · 12 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #爬虫 #网络爬虫 #wasm #python 原创 于 2025-09-24 17:55:36 发布 · 3k 阅读 · 7 · 12 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 盼之（ssxmod_itna、ssxmod_itna2）纯算 + 补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookie`、`headers`、`Sign`、`cookieTemp`、`cookies`

## 核心链路（提纯）
1. 逆向：JS逆向 - 盼之（ssxmod_itna、ssxmod_itna2）纯算 + 补环境
2. 现在请求必需得带上这俩个cookie中的的一个，才能通过
3. 1、 直接HOOK—》 cookie
4. 2、往回跟栈，找到加密位置：
5. 3、发现是俩个自执行生成的，剩下的就是自己扣纯算了！！！
6. 1、直接将jquery.min.js文件不进行格式化全扣
7. 3、检测点，会用到ali231的一些环境检测点，比如：window.hasOwnProperty、Object.hasOwnProperty、toString、dom创建标签：script、canvas、cc等
8. 4、py调用结果：
9. 提示：纯算-----分析加密位置
10. 提示：补环境

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 盼之（ssxmod_itna、ssxmod_itna2）纯算 + 补环境
- URL：aHR0cHM6Ly93d3cucHpkcy5jb20vZ29vZHNMaXN0LzgvNg==
- 现在请求必需得带上这俩个cookie中的的一个，才能通过
- 以前是headers里面的PZTimestamp、Random、Sign，载荷里面的decode__1174，现在得再加ssxmod_itna、ssxmod_itna2的cookie值，不然就返回HTML需要验证滑块
- 魔改浏览器网上自己找下，或者私我！！！
- 1、 直接HOOK—》 cookie
- 2、往回跟栈，找到加密位置：
- 3、发现是俩个自执行生成的，剩下的就是自己扣纯算了！！！
- 1、直接将jquery.min.js文件不进行格式化全扣
- 3、检测点，会用到ali231的一些环境检测点，比如：window.hasOwnProperty、Object.hasOwnProperty、toString、dom创建标签：script、canvas、cc等
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：过debugger ---- 魔改浏览器
- 提示：纯算-----分析加密位置
- 提示：学习交流主页，星球持续更新中：（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/49deef32b1734613be582b1805b7e7e7.png
- 图3：https://i-blog.csdnimg.cn/direct/ccedf0fec397431792a6b7a8ed9e285d.png
- 图4：https://i-blog.csdnimg.cn/direct/458c916806094cf2a487d0865204fc75.png
- 图5：https://i-blog.csdnimg.cn/direct/1ca4984baa964986824513cf3dbcb060.png
- 图7：https://i-blog.csdnimg.cn/direct/f68cd18369664f538f054326adcc377e.png
- 图8：https://i-blog.csdnimg.cn/direct/b44f19db9bf1403c91b3dc84cdc60742.png（上下文：不带cookies）
- 图9：https://i-blog.csdnimg.cn/direct/7fba5e234c4d4f8a974443b2aff040b1.png（上下文：带上cookies）

## 代码/算法线索
- 片段1：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { debugger; console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })(); 运行项目并下载源码javascript运行123456789101112131415
```
- 片段2：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { debugger; console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })();
```
- 片段3：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof
```
- 片段4：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。