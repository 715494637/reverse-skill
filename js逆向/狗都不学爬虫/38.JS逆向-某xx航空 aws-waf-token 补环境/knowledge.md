# JS逆向-某xx航空 aws-waf-token 补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/147952902
- 序号：38
- 标签：补环境、Cookie、签名参数
- 页面信息：原创 已于 2025-05-14 14:24:53 修改 · 2.2k 阅读 · 6 · 6 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #网络爬虫 #wasm #python 于 2025-05-14 14:15:30 首次发布 原创 已于 2025-05-14 14:24:53 修改 · 2.2k 阅读 · 6 · 6 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向-某xx航空 aws-waf-token 补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookie`、`aws-waf-token`、`aHR0cHM6Ly93d3cucnlhbmFpci5jb20`、`aHR0cHM6Ly93d3cucnlhbmFpci5jb20vYXBpL3VzcnByb2YvdjIvYWNjb3VudExvZ2lu`、`token`、`numcookie`、`cookieTemp`

## 核心链路（提纯）
1. 逆向：JS逆向-某xx航空 aws-waf-token 补环境
2. 发送一个challenge.compact.js请求js
3. 该js会发送一个verify的post请求，得到一个token
4. 补环境会生成俩次cookie：aws-waf-token，第一次得到是一个不能用的，需要第二次进行验证之后生成的aws-waf-token才能使用
5. 如果是纯算发送verify请求，得到的是token值和null，那么验证才算通过，aws-waf-token才是正确的，如果还返回了其他参数，则需要二次验证
6. 提示：流程-全扣补环境-js代码固定

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向-某xx航空 aws-waf-token 补环境
- URL:aHR0cHM6Ly93d3cucnlhbmFpci5jb20=
- 验证接口：aHR0cHM6Ly93d3cucnlhbmFpci5jb20vYXBpL3VzcnByb2YvdjIvYWNjb3VudExvZ2lu
- 发送一个challenge.compact.js请求js
- 该js会发送一个verify的post请求，得到一个token
- 补环境会生成俩次cookie：aws-waf-token，第一次得到是一个不能用的，需要第二次进行验证之后生成的aws-waf-token才能使用
- 如果是纯算发送verify请求，得到的是token值和null，那么验证才算通过，aws-waf-token才是正确的，如果还返回了其他参数，则需要二次验证
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：流程-全扣补环境-js代码固定
- 提示：拿到cookie值
- 提示：学习交流群+v看主页（有星球交流学习）

## 关键图片线索
- 图2：https://i-blog.csdnimg.cn/direct/2625d034eb7e43458c63a61d850276a8.png
- 图3：https://i-blog.csdnimg.cn/direct/37ccd7a202ce44a488b2db674853db74.png

## 代码/算法线索
- 片段1：

```text
numcookie = 0; (function () { 'use strict'; Object.defineProperty(document, 'cookie', { set: function (val) { if (val.indexOf('aws-waf-token') != -1 && val.length > 300) { if (numcookie > 0) { dtavm._log(val.split(';')[0].split('=')[1]); process_.exit(0); } numcookie++; } cookieTemp = val; return cookieTemp; }, get: function () { return cookieTemp; }, }); })(); 运行项目并下载源码javascript运行1234567891011121314151617181920
```
- 片段2：

```text
numcookie = 0; (function () { 'use strict'; Object.defineProperty(document, 'cookie', { set: function (val) { if (val.indexOf('aws-waf-token') != -1 && val.length > 300) { if (numcookie > 0) { dtavm._log(val.split(';')[0].split('=')[1]); process_.exit(0); } numcookie++; } cookieTemp = val; return cookieTemp; }, get: function () { return cookieTemp; }, }); })();
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。