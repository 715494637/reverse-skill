# JS逆向 - 某酒店登录（阉割版JY3）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149771223
- 序号：22
- 标签：补环境、滑块/验证码、指纹
- 页面信息：原创 已于 2025-07-30 12:01:10 修改 · 2.2k 阅读 · 23 · 31 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #网络爬虫 #python #wasm 于 2025-07-30 11:56:34 首次发布 原创 已于 2025-07-30 12:01:10 修改 · 2.2k 阅读 · 23 · 31 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 某酒店登录（阉割版JY3）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`uuid`、`key`、`RSA`、`AES`、`KEY-----PUBLIC_KEY-----END`、`KEY-----`、`box`

## 核心链路（提纯）
1. 逆向：JS逆向 - 某酒店登录（阉割版JY3）
2. 1、首先输入账号密码点击密码会发送一个:geeVerify接口
3. 2、接口，会发送一个：getQuestion接口
4. publicKey：后续加密需要
5. 3、开始验证，当我们滑动到错误的时候会发现浏览器不会发包，那么肯定前端会先验证是否滑动到正确的位置
6. 4、验证接口：collectData接口
7. 5、验证状态码：
8. 参数加密错误：errorMsg: Error，Close and try again.
9. 1、我们只需要分析：collectData、key，直接通过堆栈断点或者直接将混淆的代码还原，然后直接搜索：collectData
10. 替换文件：yrule-0.2.23.js
11. 2、触发断点：发现有俩个不知名参数，_0x3c0113这个一看就是前面已经加密好的了，_0x2a4c49这个看着有点像RSA加密的密钥，仔细看会返回就是获取滑块图片接口返回的publicKey
12. 这里会发现：collectData: _0x439b22、key: _0x4e92fb

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 某酒店登录（阉割版JY3）
- URL：aHR0cHM6Ly9ob3RlbC5vY3l1YW4uY29tL2xvZ2lu
- 1、首先输入账号密码点击密码会发送一个:geeVerify接口
- 2、接口，会发送一个：getQuestion接口
- publicKey：后续加密需要
- shuffle：背景图片还原的顺序
- staticServer：背景图片的根路径
- bgUrl、sliceUrl：背景图片and缺口图片的api
- 3、开始验证，当我们滑动到错误的时候会发现浏览器不会发包，那么肯定前端会先验证是否滑动到正确的位置
- 4、验证接口：collectData接口
- 参数加密错误：errorMsg: Error，Close and try again.
- 缺口识别或者轨迹错误：errorMsg: Try again.
- 验证成功：errorMsg: None
- 1、我们只需要分析：collectData、key，直接通过堆栈断点或者直接将混淆的代码还原，然后直接搜索：collectData
- 还原混淆网站：https://webcrack.netlify.app/
- 替换文件：yrule-0.2.23.js
- 2、触发断点：发现有俩个不知名参数，_0x3c0113这个一看就是前面已经加密好的了，_0x2a4c49这个看着有点像RSA加密的密钥，仔细看会返回就是获取滑块图片接口返回的publicKey
- 这里会发现：collectData: _0x439b22、key: _0x4e92fb
- 分析_0x439b22参数是怎么来的_0xf3a3a7.encode(_0x3c0113, _0xf87a91)

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/f1a8271d4cc64cf6b1e55939329d0c6b.png（上下文：注意：缺口识别、背景图片、轨迹问题在文章最后）
- 图2：https://i-blog.csdnimg.cn/direct/04be8338c12148dbbc9e38a7bdd49a4d.png（上下文：请求载荷：user_id就是uuid 响应内容：这里challenge、verifyId后续获取滑块图片接口和验证接口都需要）
- 图3：https://i-blog.csdnimg.cn/direct/af05fee872c64558a9811bab9550a465.png（上下文：请求载荷：user_id就是uuid 响应内容：这里challenge、verifyId后续获取滑块图片接口和验证接口都需要）
- 图4：https://i-blog.csdnimg.cn/direct/2aaf19142cf8416791018bf345c6391a.png（上下文：请求载荷：challenge、verifyId是geeVerify接口返回 响应内容：publicKey、shuffle、staticServer、bgUrl、sliceUrl都需要用到）
- 图5：https://i-blog.csdnimg.cn/direct/1dbd69a37e4e4985a94a73a8865f00f1.png（上下文：请求载荷：challenge、verifyId是geeVerify接口返回 响应内容：publicKey、shuffle、staticServer、bgUrl、sliceUrl都需要用到）
- 图6：https://i-blog.csdnimg.cn/direct/c6de36348f9c45febdfbccfec78702be.png（上下文：请求表单：challenge、verifyId前面接口返回，collectData、key是需要逆向的加密参数 响应内容：）
- 图7：https://i-blog.csdnimg.cn/direct/737ab510b1014784bf2c4a59d2b7d6d5.png（上下文：请求表单：challenge、verifyId前面接口返回，collectData、key是需要逆向的加密参数 响应内容：）
- 图8：https://i-blog.csdnimg.cn/direct/5c7ec921cbf949ccbbd6a25342a92410.png（上下文：替换文件：yrule-0.2.23.js）
- 图9：https://i-blog.csdnimg.cn/direct/765b54868dc64df19f7aea6a1b14f6e1.png
- 图11：https://i-blog.csdnimg.cn/direct/704c8338496a446e9d45fa27d2977637.png（上下文：进入到_0xf3a3a7对象里面:发现有点像AES加密，getKey是随机的16位字符串）
- 图12：https://i-blog.csdnimg.cn/direct/261aa74f2bac4e9b8a7690a3a33ea29b.png（上下文：进入到encode函数里面观察：）
- 图13：https://i-blog.csdnimg.cn/direct/bac1e327ea4e407383a16eeb2abbfb81.png

## 代码/算法线索
- 片段1：

```text
function _0x41c5ba(_0x3c0113, _0x2a4c49) { debugger; var _0xf87a91 = _0xf3a3a7.getKey(16); var _0x439b22 = _0xf3a3a7.encode(_0x3c0113, _0xf87a91); var _0x4e92fb = _0x313169.publicKeyEncrypt(_0xf87a91, _0x2a4c49); var _0x5b3f6a = "verify_" + new Date().getTime(); var _0x1aeac9 = { collectData: _0x439b22, key: _0x4e92fb, callback: _0x5b3f6a }; return _0x1aeac9; } AI写代码javascript运行12345678910111213
```
- 片段2：

```text
function _0x41c5ba(_0x3c0113, _0x2a4c49) { debugger; var _0xf87a91 = _0xf3a3a7.getKey(16); var _0x439b22 = _0xf3a3a7.encode(_0x3c0113, _0xf87a91); var _0x4e92fb = _0x313169.publicKeyEncrypt(_0xf87a91, _0x2a4c49); var _0x5b3f6a = "verify_" + new Date().getTime(); var _0x1aeac9 = { collectData: _0x439b22, key: _0x4e92fb, callback: _0x5b3f6a }; return _0x1aeac9; }
```
- 片段3：

```text
CryptoJs.enc.Base64.stringify(iv的值['concat'](CryptoJs.enc.Base64.parse(前面加密的值))) AI写代码javascript运行1
```
- 片段4：

```text
CryptoJs.enc.Base64.stringify(iv的值['concat'](CryptoJs.enc.Base64.parse(前面加密的值)))
```
- 片段5：

```text
var publicKeyEncrypt = function(_0x1b9ff2, _0x347537) { var _0xb15ad3 = "-----BEGIN PUBLIC KEY-----PUBLIC_KEY-----END PUBLIC KEY-----"; var _0x2fc45d = new JsEncrypt(); var _0xf5d796 = _0xb15ad3["replace"]("PUBLIC_KEY", _0x347537); _0x2fc45d['setPublicKey'](_0xf5d796); return _0x2fc45d['encrypt'](_0x1b9ff2); } AI写代码javascript运行1234567
```
- 片段6：

```text
var publicKeyEncrypt = function(_0x1b9ff2, _0x347537) { var _0xb15ad3 = "-----BEGIN PUBLIC KEY-----PUBLIC_KEY-----END PUBLIC KEY-----"; var _0x2fc45d = new JsEncrypt(); var _0xf5d796 = _0xb15ad3["replace"]("PUBLIC_KEY", _0x347537); _0x2fc45d['setPublicKey'](_0xf5d796); return _0x2fc45d['encrypt'](_0x1b9ff2); }
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。