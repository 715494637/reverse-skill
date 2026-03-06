# JS逆向案例-ali231补环境 - 14

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/145494629
- 序号：51
- 标签：补环境、滑块/验证码、指纹
- 页面信息：原创 已于 2025-04-08 20:52:14 修改 · 4.9k 阅读 · 25 · 27 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #原型模式 #开发语言 于 2025-02-07 15:31:31 首次发布 原创 已于 2025-04-08 20:52:14 修改 · 4.9k 阅读 · 25 · 27 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要 记录一下补环境的分享
- 整体架构流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向案例-ali231补环境 - 14」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`_umopt_npfp`、`getParameter`

## 核心链路（提纯）
1. 概要 记录一下补环境的分享整体架构流程技术细节小结
2. 概要 记录一下补环境的分享
3. 逆向：ali系参数231的值
4. 一、找到加密位置：
5. 二、分析初始化的环境值：将该文件全扣，补环境
6. 我们看到，当初始化完成后，会出现一个数组W为127位，该数组可以确定你补环境是否与之一致，如果基本一致就说明补对了，后面当我们滑动滑块时，轨迹数组也会存在当中
7. 三、下面说一下初始化时会有哪些检测 如果怕漏环境，最好是能挂代理的都挂上，能补原型的基本也补上
8. 其他 — 能够将初始化127补对了，后面补出值的环境，其实都大差不差 注意ali140、227检测的时候： HTMLDocument.hasOwnProperty(‘getSelection’)是存在的 HTMLDocument.prototype.getSelection = function (){}
9. 需要注意我们补环境时process.exit(0)这玩意带上，不然会处于宕机状态
10. 将W[8]、W[51]替换成浏览器的值！！！

## 关键文字线索
- 概要 记录一下补环境的分享整体架构流程技术细节小结
- 概要 记录一下补环境的分享
- 逆向：ali系参数231的值
- URL：aHR0cHM6Ly91cGF5LjEwMDEwLmNvbS91cGF5LXdhcC8/c2VydmljZVR5cGU9MDEmYnVzc1R5cGVJbj0mcGhvbmU9JmNoYW5uZWxLZXk9c3h3eCZqb2luU2lnbj0=
- 接口：aHR0cHM6Ly9jZi5hbGl5dW4uY29tL25vY2FwdGNoYS9hbmFseXplLmpzb25w
- 单步进入我们发现，最终是在一个fireye.js的文件中生成的
- 二、分析初始化的环境值：将该文件全扣，补环境
- 我们看到，当初始化完成后，会出现一个数组W为127位，该数组可以确定你补环境是否与之一致，如果基本一致就说明补对了，后面当我们滑动滑块时，轨迹数组也会存在当中
- 三、下面说一下初始化时会有哪些检测 如果怕漏环境，最好是能挂代理的都挂上，能补原型的基本也补上
- window.hasOwnProperty 检测window中是否存在某些元素
- Object.hasOwnProperty / Object.prototype.hasOwnProperty 检测window下某个对象是否存在某些方法对象
- dom/bom检测 如创建标签，SCRIPT，style，canvas，span，div，audio，对标签对象进行一些操作，如appendChild、removeChild到，重点canvas、getContext、补充2d、webgl（getSupportedExtensions、getExtension、getParameter等）
- 检测方法的toString、Reflect.getOwnPropertyDescriptor（webdriver）
- getComputedStyle、performance.getEntriesByType等window的某些方法
- 其他 — 能够将初始化127补对了，后面补出值的环境，其实都大差不差 注意ali140、227检测的时候： HTMLDocument.hasOwnProperty(‘getSelection’)是存在的 HTMLDocument.prototype.getSelection = function (){}
- 需要注意我们补环境时process.exit(0)这玩意带上，不然会处于宕机状态
- 四、说一下轨迹问题，轨迹的这里直接借鉴B站某博主的方法，因为该站轨迹校验不严，所以我们直接使用浏览器的轨迹
- 也是补了一万年，2000多行
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 而ali231如果你补充了这个方法，那么： [1, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 1, 247, 15, 254, 230, 127]会变成 [1, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 5, 247, 15, 254, 230, 127]

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/c77d762257574564ae2b2a7b849a0a65.png
- 图3：https://i-blog.csdnimg.cn/direct/526acd11c5544d4d9b246875870f208e.png
- 图4：https://i-blog.csdnimg.cn/direct/5a6dfe0ff8ba407b82842c6b7cebf374.png
- 图5：https://i-blog.csdnimg.cn/direct/4e8ae77b1c8947fd97f10b0c05d9a100.png（上下文：其他 — 能够将初始化127补对了，后面补出值的环境，其实都大差不差 注意ali140、227检测的时候： HTMLDocument.hasOwnProperty(‘getSelection’)是存在的 HTMLDocument.proto）
- 图7：https://i-blog.csdnimg.cn/direct/edac5f74757a49149b6d94f37e2504eb.png（上下文：将W[8]、W[51]替换成浏览器的值！！！）
- 图8：https://i-blog.csdnimg.cn/direct/7eadc17ee25542898064341140285c42.png（上下文：接口测试：）
- 图9：https://i-blog.csdnimg.cn/direct/26ebe6a261f74a59a52909a3cd1034f5.png（上下文：接口测试：）

## 代码/算法线索
- 片段1：

```text
fyglobalopt = { Enable: 3, MTInterval: 4, MaxFocusLog: 6, MaxKSLog: 14, MaxMTLog: 300, MaxNGPLog: 200, MinMTDwnLog: 30, NGPInterval: 4, location: "cn", timeout: 2000, _umopt_npfp:1 } o.__fy_options = fyglobalopt; fyglobalopt.reqUrl = fyglobalopt; 运行项目并下载源码javascript运行123456789101112131415
```
- 片段2：

```text
fyglobalopt = { Enable: 3, MTInterval: 4, MaxFocusLog: 6, MaxKSLog: 14, MaxMTLog: 300, MaxNGPLog: 200, MinMTDwnLog: 30, NGPInterval: 4, location: "cn", timeout: 2000, _umopt_npfp:1 } o.__fy_options = fyglobalopt; fyglobalopt.reqUrl = fyglobalopt;
```
- 片段3：

```text
B(54, fyglobalopt) 运行项目并下载源码javascript运行1
```
- 片段4：

```text
B(54, fyglobalopt)
```
- 片段5：

```text
RTCPeerConnection = class { } RTCPeerConnection.prototype.getLocalStreams = function () { } RTCPeerConnection.prototype.createDataChannel = function () { return { onopen: function () { }, onclose: function () { }, onmessage: function () { }, send: function () { }, close: function () { }, } } RTCPeerConnection.prototype.createAnswer = function () { } RTCPeerConnection.prototype.createOffer = function () { return new Promise((resolve, reject) => { const offer = { sdp: "v=0\r\no
```
- 片段6：

```text
RTCPeerConnection = class { } RTCPeerConnection.prototype.getLocalStreams = function () { } RTCPeerConnection.prototype.createDataChannel = function () { return { onopen: function () { }, onclose: function () { }, onmessage: function () { }, send: function () { }, close: function () { }, } } RTCPeerConnection.prototype.createAnswer = function () { } RTCPeerConnection.prototype.createOffer = function () { return new Promise((resolve, reject) => { const offer = { sdp: "v=0\r\no
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。