# JS逆向 - 某团Mtgsig1.2 （补环境）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/147640641
- 序号：40
- 标签：补环境、Cookie、签名参数、指纹
- 页面信息：原创 已于 2025-04-30 23:28:01 修改 · 3.5k 阅读 · 13 · 20 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2025-04-30 23:18:51 首次发布 原创 已于 2025-04-30 23:28:01 修改 · 3.5k 阅读 · 13 · 20 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 某团Mtgsig1.2 （补环境）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`Mtgsig1`、`Mtgsig`、`sign`、`getfp`、`WEBDFPID`、`cookieEnabled`、`md5`、`getParameter`、`Shanghai`、`key`

## 核心链路（提纯）
1. 逆向：某团Mtgsig1.2 （补环境）
2. 目标：请求头Mtgsig
3. 1、分析加密入口:搜索 H5guard.sign 2、将整个文件扣下: url:aHR0cHM6Ly9hcHBzZWMtbW9iaWxlLm1laXR1YW4uY29tL2g1Z3VhcmQvSDVndWFyZC5qcz92PTE3NDYwMjEzODMyNzk=
4. 3、初始化加密环境：
5. 提示：全扣补环境

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：某团Mtgsig1.2 （补环境）
- URL: aHR0cHM6Ly9hY2NvdW50LmRpYW5waW5nLmNvbS9wY2xvZ2luP3JlZGlyPWh0dHBzOi8vbS5kaWFucGluZy5jb20vZHBob21l
- 目标：请求头Mtgsig
- 1、分析加密入口:搜索 H5guard.sign 2、将整个文件扣下: url:aHR0cHM6Ly9hcHBzZWMtbW9iaWxlLm1laXR1YW4uY29tL2g1Z3VhcmQvSDVndWFyZC5qcz92PTE3NDYwMjEzODMyNzk=
- 直接找到a6生成的位置，以为a6参与了环境计算: gG就是环境数组
- 这里直接展示一下我补的浏览器环境，基本上跟浏览器一致了
- 函数保护，过多层tostring
- 补充点：RTCPeerConnection、getBattery、OfflineAudioContext三个异步
- Object.getOwnPropertyDescriptor检测点：
- 这里说一下XML怎么补，不会补就第三方库
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：补了一辈子，环境与浏览器都一致了，就是过不了，最后发现js中有空行，离谱
- 提示：学习交流群+v主页（+知识星球交流学习）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/e21d883c9fc74b9dbdad6915dae02ae9.png
- 图2：https://i-blog.csdnimg.cn/direct/c87283a290a241d489f354be796fb62c.png
- 图3：https://i-blog.csdnimg.cn/direct/f4702c66ad1540e0afe11e3e52b1a641.png
- 图8：https://i-blog.csdnimg.cn/direct/56278abdb7c1446789500fefd4bda877.png（上下文：提示：补了一辈子，环境与浏览器都一致了，就是过不了，最后发现js中有空行，离谱）
- 图9：https://i-blog.csdnimg.cn/direct/1dce3ebaf40b42548649fc044ffe3052.png

## 代码/算法线索
- 片段1：

```text
{ //版本号 k1: '3.1.0', //时间戳 k5: 1746020851587, //随机生成 sessionId: '5f0eae8fc7e443d9877edb598c683bcd', // getfp生成的WEBDFPID 后面一段值 k2: '1745824008886IMQOYUOfd79fef3d01d5e9aadc18ccd4d0c95074463', // // getfp生成的WEBDFPID 前面一段值 k3: 'u53zvu029uuw5730z5x026729ww0x6w48032y11148x979589u2vv091', k123: { k7: 16, k24: 5, k27: 5, k28: 3, k29: 3, k30: 5, k45: 7, k52: 5, k53: 5, k54: 5, k55: 5, k56: 5, k57: 5, k58: 5, k59: 5, k62: 16, k63: 5, k70: 0, k72: 3 }, // Navigator.platform k25: 'Win32'
```
- 片段2：

```text
{ //版本号 k1: '3.1.0', //时间戳 k5: 1746020851587, //随机生成 sessionId: '5f0eae8fc7e443d9877edb598c683bcd', // getfp生成的WEBDFPID 后面一段值 k2: '1745824008886IMQOYUOfd79fef3d01d5e9aadc18ccd4d0c95074463', // // getfp生成的WEBDFPID 前面一段值 k3: 'u53zvu029uuw5730z5x026729ww0x6w48032y11148x979589u2vv091', k123: { k7: 16, k24: 5, k27: 5, k28: 3, k29: 3, k30: 5, k45: 7, k52: 5, k53: 5, k54: 5, k55: 5, k56: 5, k57: 5, k58: 5, k59: 5, k62: 16, k63: 5, k70: 0, k72: 3 }, // Navigator.platform k25: 'Win32'
```
- 片段3：

```text
!(function () { "use strict"; const $toString = Function.toString; const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36))); const mytoString = function () { return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this); }; function set_native(func, key, value) { Object.defineProperty(func, key, { "enumerable": false, "configurable": true, "writable": true, "value": value }) }; delete Function.prototype[
```
- 片段4：

```text
!(function () { "use strict"; const $toString = Function.toString; const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36))); const mytoString = function () { return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this); }; function set_native(func, key, value) { Object.defineProperty(func, key, { "enumerable": false, "configurable": true, "writable": true, "value": value }) }; delete Function.prototype[
```
- 片段5：

```text
offauidio = proxy({ createOscillator: function createOscillator() { return proxy({ frequency: { setValueAtTime: function setValueAtTime() { }, }, connect: function connect() { }, start: function start() { }, disconnect:function disconnect() { } }, 'OscillatorNode') }, createDynamicsCompressor: function createDynamicsCompressor() { return proxy({ connect: function connect() { }, threshold: { setValueAtTime: function setValueAtTime() { }, }, knee: { setValueAtTime: function set
```
- 片段6：

```text
offauidio = proxy({ createOscillator: function createOscillator() { return proxy({ frequency: { setValueAtTime: function setValueAtTime() { }, }, connect: function connect() { }, start: function start() { }, disconnect:function disconnect() { } }, 'OscillatorNode') }, createDynamicsCompressor: function createDynamicsCompressor() { return proxy({ connect: function connect() { }, threshold: { setValueAtTime: function setValueAtTime() { }, }, knee: { setValueAtTime: function set
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。