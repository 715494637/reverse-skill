# 某某航空 （新版）同盾 blackbox 补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149295609
- 序号：28
- 标签：WASM、补环境、签名参数、指纹
- 页面信息：最新推荐文章于 2026-01-06 15:34:36 发布 原创 于 2025-07-12 16:44:57 发布 · 1.6k 阅读 · 16 · 23 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #网络爬虫 #wasm #python 原创 于 2025-07-12 16:44:57 发布 · 1.6k 阅读 · 16 · 23 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「某某航空 （新版）同盾 blackbox 补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`blackbox`、`tokenId`、`token`、`_blackbox`、`fpHost`、`getParameter`

## 核心链路（提纯）
1. 逆向：某某航空 （新版）同盾 blackbox 补环境
2. 加载一个td.js去加载_fmOpt这个对象和创建一个script标签：fm.js
3. fm.js会初始化浏览器环境,并且会通过XMLHttpRequest发送一个请求
4. 请求的载荷数据是一个base加密的东西，加密的内容是经过wasm处理的
5. 然后通过requestId和result进行wasm解密new TextDecoder()[“decode”],得到tokenId的值
6. 提示：补环境
7. 提示：补环境---检查点

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：某某航空 （新版）同盾 blackbox 补环境
- URL：aHR0cHM6Ly9wYXNzcG9ydC5qdW5leWFvYWlyLmNvbS8=
- 这里就不分析流程，参考分析流程看我之前旧版的文章
- 加载一个td.js去加载_fmOpt这个对象和创建一个script标签：fm.js
- fm.js会初始化浏览器环境,并且会通过XMLHttpRequest发送一个请求
- 请求的载荷数据是一个base加密的东西，加密的内容是经过wasm处理的
- 然后通过requestId和result进行wasm解密new TextDecoder()[“decode”],得到tokenId的值
- 最后这个tokenId经过处理得到blackbox
- bom和dom常见对象、
- window下各种配置属性和方法
- 原型链：HTMLElement、WebGLRenderingContext等
- 异步对象：getBattery、OfflineAudioContext、RTCPeerConnection、
- 画布指纹：canvas、2d、webgl、
- "all"in document是否存在以及document.all.length
- toString:eval、HTMLElement、window、toDataURL、createAnalyser、plugins、getParameter、enumerateDevices、RTCPeerConnection、console.log、AudioContext、sampleRate等
- 描述符检测：getOwnPropertyDescriptor—WebGLRenderingContext.__proto__下getParameter、bufferData、HTMLElement.prototype下offsetHeight、offsetWidth。getOwnPropertyDescriptors：navigator、screen
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：补环境---检查点
- 提示：学习交流主页，星球持续更新中：链接https://t.zsxq.com/AJTw2

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/a332d2fb92df4045bf03fe41c8a9a5f2.png
- 图2：https://i-blog.csdnimg.cn/direct/50e3f0c781d74e73a6c3f01c443da8e9.png（上下文：会发送一个v2的包）
- 图3：https://i-blog.csdnimg.cn/direct/f3ac5a660acd46278a6a9fa9a6fa2760.png（上下文：请求的载荷数据是一个base加密的东西，加密的内容是经过wasm处理的）
- 图4：https://i-blog.csdnimg.cn/direct/e1c96e2d8dab4530ac337e8c157fc753.png（上下文：请求的载荷数据是一个base加密的东西，加密的内容是经过wasm处理的）
- 图5：https://i-blog.csdnimg.cn/direct/0b1f7bdf07f84b80987a59265bec20c8.png（上下文：请求的载荷数据是一个base加密的东西，加密的内容是经过wasm处理的）
- 图6：https://i-blog.csdnimg.cn/direct/66869e0369f2498db7e93c66e36343be.png（上下文：然后通过requestId和result进行wasm解密new TextDecoder()[“decode”],得到tokenId的值）
- 图7：https://i-blog.csdnimg.cn/direct/bd3bfb7be5564d15a242aa509a4a5e73.png（上下文：最后这个tokenId经过处理得到blackbox）
- 图9：https://i-blog.csdnimg.cn/direct/590315fc3d154eb798135f03876fa448.png（上下文：最后观察指纹数组）
- 图10：https://i-blog.csdnimg.cn/direct/48fa60ccbc6d4aadbaf4752b6b789f7c.png（上下文：提示：nodejs生成）

## 代码/算法线索
- 片段1：

```text
window._fmOpt = { partner: 'jxhk', appName: 'jxhk_web', token: 'jxhk' + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2), fmb: true, success: function (data) { debugger _blackbox = data console.log('新版blackbox:',_blackbox) }, fpHost: "https://xxx.net" }; 运行项目并下载源码javascript运行123456789101112
```
- 片段2：

```text
window._fmOpt = { partner: 'jxhk', appName: 'jxhk_web', token: 'jxhk' + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2), fmb: true, success: function (data) { debugger _blackbox = data console.log('新版blackbox:',_blackbox) }, fpHost: "https://xxx.net" };
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。