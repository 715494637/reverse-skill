# JS逆向 - 某米应用查询（表单S、D）纯和补

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/150951466
- 序号：16
- 标签：补环境、Cookie、签名参数、滑块/验证码
- 页面信息：最新推荐文章于 2026-03-04 11:16:40 发布 原创 于 2025-08-28 15:17:45 发布 · 2.1k 阅读 · 21 · 24 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #爬虫 #网络爬虫 #python #wasm 原创 于 2025-08-28 15:17:45 发布 · 2.1k 阅读 · 21 · 24 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 某米应用查询（表单S、D）纯和补」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`AES`、`aes`、`key`、`RSA`、`KEY-----`、`aes_key`、`aes_iv`、`aes_data`、`DOMTokenList`、`setRequestHeader`、`cookieEnabled`、`miverify_panel_box`

## 核心链路（提纯）
1. 逆向：JS逆向 - 某米应用查询（表单S、D）纯和补
2. 1、随便输入查询框，点击查询：captcha/v2/data接口
3. 2、XHR断点或者搜索关键字或者直接encrypt搜索：‘s’:
4. 3、直接进入，观察_0x4874ab，发现是随机生成的：
5. 4、继续往下分析，可以看得_0x25aa39对象里面有AES，然后后面的混淆里面也有pkcs7的和cbc的字样，盲猜一波AES加密：
6. 6、那么d的值就分析完了，继续分析s的值，观察_0x4874ab会发现，里面有一个类似RSA加密的publicKey的密钥，猜测RSA加密
7. 加密内容：AES的key
8. 1、观察js运行情况，往上跟栈会发现：a.start({activeVerify: !1,uid: “”})
9. 2、找到a是从哪里来的，它其实是被实例化出来，那么我们想它是从哪里实例化，肯定是调用事件触发的，直接搜索：new _0xa516da
10. 3、会发现它确实是m.js文件最后去执行：调用window.startMiverify去触发即可
11. 2、展示神力：webgl = {有亿点点多，自己补吧}
12. 3、怎么调出：window.startMiverify 执行它即可

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 某米应用查询（表单S、D）纯和补
- URL：aHR0cHM6Ly9tLmFwcC5taS5jb20v
- 1、随便输入查询框，点击查询：captcha/v2/data接口
- 2、XHR断点或者搜索关键字或者直接encrypt搜索：‘s’:
- 3、直接进入，观察_0x4874ab，发现是随机生成的：
- 4、继续往下分析，可以看得_0x25aa39对象里面有AES，然后后面的混淆里面也有pkcs7的和cbc的字样，盲猜一波AES加密：
- key：_0x4874ab
- iv：0102030405060708
- 明文：{“type”:0,“startTs”:1756362746381,“endTs”:1756362752397,"env…
- 6、那么d的值就分析完了，继续分析s的值，观察_0x4874ab会发现，里面有一个类似RSA加密的publicKey的密钥，猜测RSA加密
- 公钥：‘-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArxfNLkuAQ/BYHzkzVwtu\ng+0abmYRBVCEScSzGxJIOsfxVzcuqaKO87H2o2wBcacD3bRHhMjTkhSEqxPjQ/FE\nXuJ1cdbmr3+b3EQR6wf/cYcMx2468/QyVoQ7BADLSPecQhtgGOllkC+cLYN6Md34\nUii6U+VJf0p0q/saxUTZvhR2ka9fqJ4+6C6cOghIecjMYQNHIaNW+eSKunfFsXVU\n+QfMD0q2EM9wo20aLnos24yDzRjh9HJc6xfr37jRlv1/boG/EABMG9FnTm35xWrV\nR0nw3cpYF7GZg13QicS/ZwEsSd4HyboAruMxJBPvK3Jdr4ZS23bpN0cavWOJsBqZ\nVwIDAQAB\n-----END PUBLIC KEY-----’
- 加密内容：AES的key
- 1、观察js运行情况，往上跟栈会发现：a.start({activeVerify: !1,uid: “”})
- 2、找到a是从哪里来的，它其实是被实例化出来，那么我们想它是从哪里实例化，肯定是调用事件触发的，直接搜索：new _0xa516da
- 3、会发现它确实是m.js文件最后去执行：调用window.startMiverify去触发即可
- 2、展示神力：webgl = {有亿点点多，自己补吧}
- 3、怎么调出：window.startMiverify 执行它即可
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：分析参数及加密流程 ---- 纯算版

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/52811cae4852420abe2003782cff977a.png
- 图2：https://i-blog.csdnimg.cn/direct/72b3606f5fc441c28c699361fd32996e.png
- 图3：https://i-blog.csdnimg.cn/direct/45dce52de440401a91b4800818a5a029.png
- 图4：https://i-blog.csdnimg.cn/direct/567e345139a84d69bb648108862a2723.png
- 图5：https://i-blog.csdnimg.cn/direct/89ff0ad269fd4377a1dcacd992eee759.png（上下文：5、那么我们可以复制出来，进行验证一波，找一个在线的AES加密：http://www.ip33.com/crypto/aes.html）
- 图6：https://i-blog.csdnimg.cn/direct/604156d1cd494a759d77cc8d17d921f1.png（上下文：5、那么我们可以复制出来，进行验证一波，找一个在线的AES加密：http://www.ip33.com/crypto/aes.html）
- 图7：https://i-blog.csdnimg.cn/direct/f2cc6c95c0f14415aef3796328f1dbda.png（上下文：明文：{“type”:0,“startTs”:1756362746381,“endTs”:1756362752397,"env…）
- 图8：https://i-blog.csdnimg.cn/direct/1a0767fec2f04d7d9648284113ae5e39.png
- 图10：https://i-blog.csdnimg.cn/direct/8ccab5bdcc6244d18ea0e4d5e71178bd.png
- 图11：https://i-blog.csdnimg.cn/direct/5ae018c1655d4c07bf2737c73f48b1b2.png
- 图12：https://i-blog.csdnimg.cn/direct/8324e8f7f67d45e1b3cf9e3812fc40a4.png
- 图13：https://i-blog.csdnimg.cn/direct/1f9b93b6757147049a3d6898a94fb33b.png

## 代码/算法线索
- 片段1：

```text
var _0x4874ab = function (_0xd7d75d) { for (var _0x264211 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '_', '+', '~', '`', '{', '}', '[', ']', '|', ':',
```
- 片段2：

```text
var _0x4874ab = function (_0xd7d75d) { for (var _0x264211 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '_', '+', '~', '`', '{', '}', '[', ']', '|', ':',
```
- 片段3：

```text
const JsEncrypt = require('jsencrypt'); const CryptoJS = require('crypto-js'); var publicKey = `-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArxfNLkuAQ/BYHzkzVwtu g+0abmYRBVCEScSzGxJIOsfxVzcuqaKO87H2o2wBcacD3bRHhMjTkhSEqxPjQ/FE XuJ1cdbmr3+b3EQR6wf/cYcMx2468/QyVoQ7BADLSPecQhtgGOllkC+cLYN6Md34 Uii6U+VJf0p0q/saxUTZvhR2ka9fqJ4+6C6cOghIecjMYQNHIaNW+eSKunfFsXVU +QfMD0q2EM9wo20aLnos24yDzRjh9HJc6xfr37jRlv1/boG/EABMG9FnTm35xWrV R0nw3cpYF7GZg13QicS/ZwEsSd4HyboA
```
- 片段4：

```text
const JsEncrypt = require('jsencrypt'); const CryptoJS = require('crypto-js'); var publicKey = `-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArxfNLkuAQ/BYHzkzVwtu g+0abmYRBVCEScSzGxJIOsfxVzcuqaKO87H2o2wBcacD3bRHhMjTkhSEqxPjQ/FE XuJ1cdbmr3+b3EQR6wf/cYcMx2468/QyVoQ7BADLSPecQhtgGOllkC+cLYN6Md34 Uii6U+VJf0p0q/saxUTZvhR2ka9fqJ4+6C6cOghIecjMYQNHIaNW+eSKunfFsXVU +QfMD0q2EM9wo20aLnos24yDzRjh9HJc6xfr37jRlv1/boG/EABMG9FnTm35xWrV R0nw3cpYF7GZg13QicS/ZwEsSd4HyboA
```
- 片段5：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof
```
- 片段6：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。