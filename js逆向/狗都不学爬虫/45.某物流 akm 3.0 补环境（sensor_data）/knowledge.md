# 某物流 akm 3.0 补环境（sensor_data）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/146397095
- 序号：45
- 标签：补环境、Cookie
- 页面信息：最新推荐文章于 2025-08-21 00:22:09 发布 原创 于 2025-03-20 15:42:29 发布 · 1.4k 阅读 · 4 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #网络爬虫 #爬虫 原创 于 2025-03-20 15:42:29 发布 · 1.4k 阅读 · 4 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 小结

## 逆向目标
- 目标围绕「某物流 akm 3.0 补环境（sensor_data）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`akm`、`cookie`、`headers`、`cookies`、`setRequestHeader`、`cookieStr`、`key`

## 核心链路（提纯）
1. 逆向：某物流 akm 3.0 补环境（sensor_data）
2. 目标：sensor_data参数
3. 二、第二次请求一个从home.html中得到的一个js文件，并返回cookie值：_abck
4. 三、第三次还是请求返回的js接口并发送post，提交表单数据sensor_data，并获取响应请求头中的_abck参数、
5. 五、说一下sensor_data的生成（这里仅参考补环境）：
6. 当环境补通之后该参数的值会出现在XMLHttpRequest.prototype.send方法：

## 关键文字线索
- 逆向：某物流 akm 3.0 补环境（sensor_data）
- URL：aHR0cHM6Ly93d3cuZGhsLmNvbS9jbi16aC9ob21lLmh0bWw=
- 目标：sensor_data参数
- 一、第一次访问首页获取cookie值：_abck、ak_bmsc、bm_sz
- 二、第二次请求一个从home.html中得到的一个js文件，并返回cookie值：_abck
- 三、第三次还是请求返回的js接口并发送post，提交表单数据sensor_data，并获取响应请求头中的_abck参数、
- 四、akm一般我存在tls的校验，所以编写py时我们需要绕过：使用curl_cffi库或者其他库
- 五、说一下sensor_data的生成（这里仅参考补环境）：
- 当环境补通之后该参数的值会出现在XMLHttpRequest.prototype.send方法：
- dom检测点：getElementsByTagName-》input、createElement-》span、p、div、iframe（nodeName，nodeType，ATTRIBUTE_NODE，baseURI，contentWindow，srcdoc，style）等、
- window的属性和对象（及原型）等------自己补充、
- RTCPeerConnection补充：
- 补充docuemnt.cookie时一定要动态传入前一次获取得到那三个cookie值：_abck、ak_bmsc、bm_sz
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 注意：这里的_abck是~-1~-1~-1结尾
- 注意：如果验证失败这里的_abck是~-1~-1~-1结尾，成功则得到的是：~-1~||0||~-1
- 提示：学习交流+v看主页

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/dedba70b0ea64259b1389b7c52b5026f.png
- 图2：https://i-blog.csdnimg.cn/direct/279d6fe6c07e46d180ca6a7b76f2b90b.png
- 图3：https://i-blog.csdnimg.cn/direct/d5d156b6c9294064be37c21a26ec6df8.png
- 图4：https://i-blog.csdnimg.cn/direct/47c879ca3fb6450785e445b8104771d1.png
- 图5：https://i-blog.csdnimg.cn/direct/328619bfc36a483c94a2caaf96e36f16.png
- 图6：https://i-blog.csdnimg.cn/direct/39c87d9940144a99ac2d8becb3075815.png
- 图8：https://i-blog.csdnimg.cn/direct/7825295ed9674c219d66a77e55a7cbf6.png
- 图9：https://i-blog.csdnimg.cn/direct/1ba7f75408184951bf39374d922d06fa.png（上下文：dom检测点：getElementsByTagName-》input、createElement-》span、p、div、iframe（nodeName，nodeType，ATTRIBUTE_NODE，baseURI，contentWind）
- 图10：https://i-blog.csdnimg.cn/direct/8c680da87ccd4d71afbdead2f6dc86f9.png（上下文：window的属性和对象（及原型）等------自己补充、）
- 图12：https://i-blog.csdnimg.cn/direct/964ddfd838b24a1faf6a0e0062bbd895.png

## 代码/算法线索
- 片段1：

```text
from curl_cffi import requests url = "https://xxx/home.html" response = requests.get(url, headers=headers,impersonate="chrome101") cookies = response.cookies.get_dict() 运行项目并下载源码python运行1234
```
- 片段2：

```text
from curl_cffi import requests url = "https://xxx/home.html" response = requests.get(url, headers=headers,impersonate="chrome101") cookies = response.cookies.get_dict()
```
- 片段3：

```text
XMLHttpRequest = function XMLHttpRequest() { } XMLHttpRequest.prototype.open = function () { // dtavm.log('XMLHttpRequest.open:', arguments) } XMLHttpRequest.prototype.send = function () { dtavm.log('XMLHttpRequest.prototype.send--->',JSON.parse(arguments[0])['sensor_data']) } XMLHttpRequest.prototype.setRequestHeader = function () { } XMLHttpRequest.prototype.status = 0 XMLHttpRequest.prototype.statusText = '' XMLHttpRequest.prototype.response = null XMLHttpRequest.prototype
```
- 片段4：

```text
XMLHttpRequest = function XMLHttpRequest() { } XMLHttpRequest.prototype.open = function () { // dtavm.log('XMLHttpRequest.open:', arguments) } XMLHttpRequest.prototype.send = function () { dtavm.log('XMLHttpRequest.prototype.send--->',JSON.parse(arguments[0])['sensor_data']) } XMLHttpRequest.prototype.setRequestHeader = function () { } XMLHttpRequest.prototype.status = 0 XMLHttpRequest.prototype.statusText = '' XMLHttpRequest.prototype.response = null XMLHttpRequest.prototype
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