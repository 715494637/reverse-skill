# JS逆向 - 猫眼票房（signKey、X-FOR-WITH）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/150576931
- 序号：18
- 标签：补环境
- 页面信息：原创 于 2025-08-21 11:33:01 发布 · 2k 阅读 · 15 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #网络爬虫 #python #wasm 原创 于 2025-08-21 11:33:01 发布 · 2k 阅读 · 15 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 猫眼票房（signKey、X-FOR-WITH）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`signKey`、`X-FOR-WITH`、`params`、`key`、`params_str`、`MD5`、`md5`、`uuid`、`mygsign`、`setRequestHeader`

## 核心链路（提纯）
1. 逆向：JS逆向 - 猫眼票房（signKey、X-FOR-WITH）
2. 1、请求载荷：
3. 2、请求头：
4. 3、分析加密位置：
5. 关键字搜索或者堆栈断点：signKey
6. 继续搜索：mygsig
7. 1、我们在上面分析mygsign的时候，它加密的第二个参数，就是所有的请求头参数，再观察当前堆栈是一个XMLHttpRequest.prototype.send,那么请求头肯定就是上面的XMLHttpRequest.prototype.setRequestHeader设置的
8. 2、清空缓存，重新刷新网页，在设置请求头的地方下断点
9. 3、继续往上分析：可以看到其实就是p函数生成的
10. 5、从上面的截图我们可以看到：
11. 6、所以总结一点就是：w除了时间戳，其他都可以固定，继续分析加密函数：p函数
12. 这里我们可以看到，先走v函数，其实v函数就是给w明文添加code，然后最后加密是：s（c） ==== MD5（c）

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 猫眼票房（signKey、X-FOR-WITH）
- URL：aHR0cHM6Ly9waWFvZmFuZy5tYW95YW4uY29tL2Rhc2hib2FyZA==
- 接口：dashboard-ajax
- 关键字搜索或者堆栈断点：signKey
- 观察UA和signKey的生成：
- 其实就是getMygsig函数生成：
- 观察可以看到，其实m1,m2,m3是定死，而ts,ts1则是时间戳，所以我们只需要分析ms1的生成，再看ms1的长度，不难看出也是一个md5
- 到这里其实就能出数据了！！！
- 1、我们在上面分析mygsign的时候，它加密的第二个参数，就是所有的请求头参数，再观察当前堆栈是一个XMLHttpRequest.prototype.send,那么请求头肯定就是上面的XMLHttpRequest.prototype.setRequestHeader设置的
- 2、清空缓存，重新刷新网页，在设置请求头的地方下断点
- 3、继续往上分析：可以看到其实就是p函数生成的
- 5、从上面的截图我们可以看到：
- brVD，brR，aM：d()，l()，h()这三个函数生成
- code：检测dom和bom的某些属性或者方法是否存在，存在则拼接固定的字符串
- 6、所以总结一点就是：w除了时间戳，其他都可以固定，继续分析加密函数：p函数
- 这里我们可以看到，先走v函数，其实v函数就是给w明文添加code，然后最后加密是：s（c） ==== MD5（c）
- 这里还取了window[“metaIdx”]，直接全局搜索：metaIdx
- 7、这里就直接全扣吧！！！
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/8cbc52e1f2f2413b8f550471c49ecb49.png
- 图2：https://i-blog.csdnimg.cn/direct/1c0314fdb3a5416880a442126757f620.png
- 图3：https://i-blog.csdnimg.cn/direct/e2c5bbde4d15407ca439b3eaff6a6aaa.png（上下文：接口：dashboard-ajax）
- 图4：https://i-blog.csdnimg.cn/direct/45279974092440b6ac0503b04d42d4f5.png（上下文：关键字搜索或者堆栈断点：signKey）
- 图5：https://i-blog.csdnimg.cn/direct/3acde0e811254089a8601f5155900b3f.png（上下文：观察UA和signKey的生成：）
- 图6：https://i-blog.csdnimg.cn/direct/0694f542f6444410aed127fc132f5569.png
- 图8：https://i-blog.csdnimg.cn/direct/4dc5917f5e8c4807ad35900e89dd07e1.png（上下文：继续搜索：mygsig）
- 图9：https://i-blog.csdnimg.cn/direct/aaca1f5bdc4b439b9171b4c9b06d39ab.png（上下文：其实就是getMygsig函数生成：）
- 图10：https://i-blog.csdnimg.cn/direct/72f07ceee9914eb79c7f81998e43f4c7.png（上下文：4、具体的实现）
- 图12：https://i-blog.csdnimg.cn/direct/7214ec7ca7e945e9bda9475eda258f5c.png
- 图13：https://i-blog.csdnimg.cn/direct/040f92bf6f104891bab031510c117a20.png
- 图14：https://i-blog.csdnimg.cn/direct/c8f47bc3610f43e7bff02dbf7ac45365.png

## 代码/算法线索
- 片段1：

```text
params = { 'method': "GET", 'timeStamp': +new Date, "User-Agent": btoa("Mozilla/5.0 换成自己的"), 'index': Math["floor"](1e3 * Math["random"]() + 1), 'channelId': 40009, 'sVersion': 2, 'key': "A013F70DB97834C0A5492378BD76C53A" } params_str = Object.keys(params).reduce(function (e, t) { return e = 0 === params[t] || params[t] ? e + "&" + t + "=" + params[t] : e + "&" + t + "=''" }, "")["slice"](1); signKey = CryptoJs.MD5(params_str['replace'](/\s+/g, " ")).toString() AI写代码javascrip
```
- 片段2：

```text
params = { 'method': "GET", 'timeStamp': +new Date, "User-Agent": btoa("Mozilla/5.0 换成自己的"), 'index': Math["floor"](1e3 * Math["random"]() + 1), 'channelId': 40009, 'sVersion': 2, 'key': "A013F70DB97834C0A5492378BD76C53A" } params_str = Object.keys(params).reduce(function (e, t) { return e = 0 === params[t] || params[t] ? e + "&" + t + "=" + params[t] : e + "&" + t + "=''" }, "")["slice"](1); signKey = CryptoJs.MD5(params_str['replace'](/\s+/g, " ")).toString()
```
- 片段3：

```text
const CryptoJs = require('crypto-js'); params = { 'method': "GET", 'timeStamp': +new Date, "User-Agent": btoa("Mozilla/5.0 填写自己的"), 'index': Math["floor"](1e3 * Math["random"]() + 1), 'channelId': 40009, 'sVersion': 2, 'key': "A013F70DB97834C0A5492378BD76C53A" } params_str = Object.keys(params).reduce(function (e, t) { return e = 0 === params[t] || params[t] ? e + "&" + t + "=" + params[t] : e + "&" + t + "=''" }, "")["slice"](1); signKey = CryptoJs.MD5(params_str['replace'](
```
- 片段4：

```text
const CryptoJs = require('crypto-js'); params = { 'method': "GET", 'timeStamp': +new Date, "User-Agent": btoa("Mozilla/5.0 填写自己的"), 'index': Math["floor"](1e3 * Math["random"]() + 1), 'channelId': 40009, 'sVersion': 2, 'key': "A013F70DB97834C0A5492378BD76C53A" } params_str = Object.keys(params).reduce(function (e, t) { return e = 0 === params[t] || params[t] ? e + "&" + t + "=" + params[t] : e + "&" + t + "=''" }, "")["slice"](1); signKey = CryptoJs.MD5(params_str['replace'](
```
- 片段5：

```text
var p = function(e) { v(e); e.cts = (new Date).getTime(); var r = JSON.stringify(e); var t = window["metaIdx"]; var n = releasex.util.convertStringToBytes(t); var i = releasex.util.convertStringToBytes(t); var o = releasex.util.convertStringToBytes(r); var a = releasex.padding.pkcs7.pad(o); var u = new releasex.ModeOfOperation.cbc(n,i); var c = u.encrypt(a); var f = s(c); return f }; AI写代码javascript运行1234567891011121314
```
- 片段6：

```text
var p = function(e) { v(e); e.cts = (new Date).getTime(); var r = JSON.stringify(e); var t = window["metaIdx"]; var n = releasex.util.convertStringToBytes(t); var i = releasex.util.convertStringToBytes(t); var o = releasex.util.convertStringToBytes(r); var a = releasex.padding.pkcs7.pad(o); var u = new releasex.ModeOfOperation.cbc(n,i); var c = u.encrypt(a); var f = s(c); return f };
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。