# JS逆向入门案例-x球网 md5__1038参数（补环境）-13

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/145047640
- 序号：52
- 标签：补环境
- 页面信息：原创 已于 2025-04-08 20:52:06 修改 · 2.7k 阅读 · 4 · 9 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2025-01-10 09:51:28 首次发布 原创 已于 2025-04-08 20:52:06 修改 · 2.7k 阅读 · 4 · 9 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-x球网 md5__1038参数（补环境）-13」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`md5__1038`、`xhr-md5_1038`

## 核心链路（提纯）
1. 逆向：x球网-md5__1038参数
2. 一、找到参数生成的位置：断xhr-md5_1038
3. 我们继续往回跟栈，最后找了一百年发现它早就生成好了
4. 好了，位置我们找到了，这里可以扣代码，我选择了补环境，因为补环境1分钟不到就完事

## 关键文字线索
- 逆向：x球网-md5__1038参数
- URL：aHR0cHM6Ly94dWVxaXUuY29tLw==
- 一、找到参数生成的位置：断xhr-md5_1038
- 我们继续往回跟栈，最后找了一百年发现它早就生成好了
- 最后也是找了一万年，也是找到了
- 好了，位置我们找到了，这里可以扣代码，我选择了补环境，因为补环境1分钟不到就完事
- 直接上最后结果吧，环境特别少
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 二、挂代理补浏览器环境,js 代码 全扣
- 提示：学习交流群：看以往发布的文章小结

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/b823946215cf4e3789eb662ad8175492.png
- 图2：https://i-blog.csdnimg.cn/direct/841dbad502cd43338135b3e48881fcba.png
- 图3：https://i-blog.csdnimg.cn/direct/54324fa22bb44c70b183cfc9959f80ec.png
- 图5：https://i-blog.csdnimg.cn/direct/bf19a9a3665e4aa3aba9bb8c0858d1f2.png

## 代码/算法线索
- 片段1：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof
```
- 片段2：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof
```
- 片段3：

```text
log_ = console.log; console.log = function () { } window = globalThis; delete Buffer; location = { "ancestorOrigins": {}, "href": "https://脱密.com/", "origin": "https://脱密.com", "protocol": "https:", "host": "脱密.com", "hostname": "脱密.com", "port": "", "pathname": "/", "search": "", "hash": "" } document = { location: location, createElement: function (res) {if (res === 'div') {return {firstChild: location}}}, documentElement: {getAttribute:function(){return null}} }; navigator
```
- 片段4：

```text
log_ = console.log; console.log = function () { } window = globalThis; delete Buffer; location = { "ancestorOrigins": {}, "href": "https://脱密.com/", "origin": "https://脱密.com", "protocol": "https:", "host": "脱密.com", "hostname": "脱密.com", "port": "", "pathname": "/", "search": "", "hash": "" } document = { location: location, createElement: function (res) {if (res === 'div') {return {firstChild: location}}}, documentElement: {getAttribute:function(){return null}} }; navigator
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。