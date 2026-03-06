# JS逆向 - （国外）SHEIN站 - 请求头（armorToken、Anti-in）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149629745
- 序号：23
- 标签：补环境、签名参数、指纹
- 页面信息：原创 已于 2025-07-25 16:51:06 修改 · 2.1k 阅读 · 29 · 13 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #ajax #网络爬虫 #wasm #python 于 2025-07-25 11:21:54 首次发布 原创 已于 2025-07-25 16:51:06 修改 · 2.1k 阅读 · 29 · 13 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向 - （国外）SHEIN站 - 请求头（armorToken、Anti-in）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`armorToken`、`token`、`MD5`、`armorUuid`、`armorToken_list`、`armorToken_list_data`、`key`、`AES`、`ciphertext`、`aes_encrypt`、`aes_encrypt_Ecb`

## 核心链路（提纯）
1. 逆向：JS逆向 - （国外）SHEIN站 - 请求头（armorToken、Anti-in）
2. 1、参数位置和验证接口：
3. 2、堆栈分析位置或者搜索关键字：armorToken，这里就不带着一起跟了，直接搜索
4. 3、下断，直接刷新网页，NcWc(“0x3c”)跳进去吗，发现是从zc函数进行加密的
5. 注意：手动去执行它加密的时候，浏览器会将生成好的值存储到localStorage/sessionStorage
6. 4、进入到zc函数，我们可以看到，如果$c这个对象里面的value有值的话，我们可以给它赋值字符串，重新生成一个
7. b(this, Rc, Kc)t(“0xf”)：这里观察是下面的Kc函数获取，Qr就是一个标准的MD5加密
8. 继续观察它是一个AES加密，并且是标准的，但是转字符串的函数是魔改的，你会看到AES加密其实取的是ciphertext
9. 7、继续分析我们的第二个参数Anti-in，这里划一下水，自己跟一下栈，比较容易跟
10. 你会发现它是通过浏览器指纹进行加密最好得到一大串字符串的，这里Zc就是加密函数
11. 8、进入到加密函数，我们观察可以看到，mc也是一个AES，key的值是：“Q5eV2XXICMBi0CBL”，但是它是ECB模式的，需要注意一下，肯定也是对toString进行了魔改的
12. 提示：分析参数生成

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：JS逆向 - （国外）SHEIN站 - 请求头（armorToken、Anti-in）
- URL：aHR0cHM6Ly9pZC5zaGVpbi5jb20vUmVjb21tZW5kU2VsZWN0aW9uL0hvbWUtS2l0Y2hlbi1zYy0wMTcxODU1NDYuaHRtbD9pY2k9aWRlbl90YWIwNW5hdmJhcjA1JnNyY19tb2R1bGU9dG9wY2F0JnNyY19pZGVudGlmaWVyPWZjJTNESG9tZSUyMCUyNiUyMEtpdGNoZW4lNjBzYyUzREhvbWUlMjAlMjYlMjBLaXRjaGVuJTYwdGMlM0QwJTYwb2MlM0QwJTYwcHMlM0R0YWIwNW5hdmJhcjA1JTYwamMlM0RpdGVtUGlja2luZ18wMTcxODU1NDYmc3JjX3RhYl9wYWdlX2lkPXBhZ2VfaG9tZTE3NTAzMTk2NDQ2NzQmY2F0ZWdvcnlKdW1wPTY2MTE3MV8hXzAmcGFnZT0y
- 1、参数位置和验证接口：
- 响应内容：会返回一个token
- 2、堆栈分析位置或者搜索关键字：armorToken，这里就不带着一起跟了，直接搜索
- 3、下断，直接刷新网页，NcWc(“0x3c”)跳进去吗，发现是从zc函数进行加密的
- 注意：手动去执行它加密的时候，浏览器会将生成好的值存储到localStorage/sessionStorage
- 4、进入到zc函数，我们可以看到，如果$c这个对象里面的value有值的话，我们可以给它赋值字符串，重新生成一个
- att(“0x11”)：固定、pt()：版本号
- b(this, Rc, Kc)t(“0xf”)：这里观察是下面的Kc函数获取，Qr就是一个标准的MD5加密
- 继续看一下key是什么：发现是固定的"Yp22&mqMv#3t28Zh"
- 继续观察它是一个AES加密，并且是标准的，但是转字符串的函数是魔改的，你会看到AES加密其实取的是ciphertext
- 最后将上面的值进行拼接就得到了armorToken
- 7、继续分析我们的第二个参数Anti-in，这里划一下水，自己跟一下栈，比较容易跟
- 你会发现它是通过浏览器指纹进行加密最好得到一大串字符串的，这里Zc就是加密函数
- 8、进入到加密函数，我们观察可以看到，mc也是一个AES，key的值是：“Q5eV2XXICMBi0CBL”，但是它是ECB模式的，需要注意一下，肯定也是对toString进行了魔改的
- 这里我们会发现i的值就是对指纹数组进行转字符串，然后先经过oc处理这个字符串得到一个Uint8Array数组，这里其实就是一个字符串压缩算法
- 继续我们看到，对这个压缩后的数组进行转WrodArry,其实这个J[r(“0x49”)]函数就是标准的CryptoJs.enc.Hex.parse
- Qr(i)n(“0xc”)n(“0x4d”)：说一下这里其实也是对指纹进行MD5然后取后面6位

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/72be5301d5634042b11111ac7ade3309.png
- 图2：https://i-blog.csdnimg.cn/direct/ee43e36e841a44adaebf9c61b935ac80.png
- 图3：https://i-blog.csdnimg.cn/direct/94177ece401448dfa98e6a46186f396d.png（上下文：提示：需要将浏览器加载的缓存全部清理）
- 图4：https://i-blog.csdnimg.cn/direct/f720d45b395445f6be7642b7655955d3.png
- 图5：https://i-blog.csdnimg.cn/direct/d977bbc888a74969bd247951f2a84ba3.png
- 图6：https://i-blog.csdnimg.cn/direct/d079c3187bd24e13ba65e84543db62c6.png
- 图7：https://i-blog.csdnimg.cn/direct/f29613b9760441788d6157487bbd76d6.png（上下文：att(“0x11”)：固定、pt()：版本号）
- 图8：https://i-blog.csdnimg.cn/direct/478bb2adc85c4077bd286dab7c22e039.png（上下文：b(this, Rc, Kc)t(“0xf”)：这里观察是下面的Kc函数获取，Qr就是一个标准的MD5加密）
- 图10：https://i-blog.csdnimg.cn/direct/df6de21790b64efab56c4e31ddf9f1e2.png（上下文：继续看一下key是什么：发现是固定的"Yp22&mqMv#3t28Zh"）
- 图11：https://i-blog.csdnimg.cn/direct/6fc42b0ca82947a28b004b214522b3f0.png（上下文：继续观察它是一个AES加密，并且是标准的，但是转字符串的函数是魔改的，你会看到AES加密其实取的是ciphertext）
- 图13：https://i-blog.csdnimg.cn/direct/d149838c7d2c4361924268be8825ba94.png
- 图14：https://i-blog.csdnimg.cn/direct/86ba966dd7334a29825cae80f559d008.png

## 代码/算法线索
- 片段1：

```text
w(this, Rc, $c, [["S", at[t("0x11")]()][t("0x51")](""), pt(), te[t("0x22")](mc[t("0x4e")](Dn[t("0x4f")](b(this, Rc, Kc)[t("0xf")](this)), Dn[t("0x4f")](At()), { iv: J[t("0x4f")](""), mode: L[t("0x5c")][t("0x5d")], padding: Pc })[t("0x50")]), (new Date)[t("0x5e")]()][t("0x51")]("_")) 运行项目并下载源码javascript运行12345
```
- 片段2：

```text
w(this, Rc, $c, [["S", at[t("0x11")]()][t("0x51")](""), pt(), te[t("0x22")](mc[t("0x4e")](Dn[t("0x4f")](b(this, Rc, Kc)[t("0xf")](this)), Dn[t("0x4f")](At()), { iv: J[t("0x4f")](""), mode: L[t("0x5c")][t("0x5d")], padding: Pc })[t("0x50")]), (new Date)[t("0x5e")]()][t("0x51")]("_"))
```
- 片段3：

```text
const CryptoJs = require('crypto-js'); var getReportUrl_metricCount = 0 var version = "3.7.0" var armorUuid = '浏览器返回' var userAgent = "换成自己的" var now_time = new Date().getTime() get8LRandomStr = function () { return 'xxxxxxxx'['replace'](/[xy]/g, (function (t) { var n = 16 * Math["random"]() | 0; return ("x" == t ? n : 3 & n | 8)['toString'](16) } )) }(); armorToken_list = [getReportUrl_metricCount, version, armorUuid, userAgent, now_time, get8LRandomStr, '-'].join("^@^") arm
```
- 片段4：

```text
const CryptoJs = require('crypto-js'); var getReportUrl_metricCount = 0 var version = "3.7.0" var armorUuid = '浏览器返回' var userAgent = "换成自己的" var now_time = new Date().getTime() get8LRandomStr = function () { return 'xxxxxxxx'['replace'](/[xy]/g, (function (t) { var n = 16 * Math["random"]() | 0; return ("x" == t ? n : 3 & n | 8)['toString'](16) } )) }(); armorToken_list = [getReportUrl_metricCount, version, armorUuid, userAgent, now_time, get8LRandomStr, '-'].join("^@^") arm
```
- 片段5：

```text
CryptoJs.enc.toString_ = function toString(t) { var r = !0; var e = t["words"] , x = t["sigBytes"] , a = r ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; t["clamp"](); for (var i = [], o = 0; o < x; o += 3) for (var c = (e[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, u = 0; u < 4 && o +
```
- 片段6：

```text
CryptoJs.enc.toString_ = function toString(t) { var r = !0; var e = t["words"] , x = t["sigBytes"] , a = r ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; t["clamp"](); for (var i = [], o = 0; o < x; o += 3) for (var c = (e[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (e[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | e[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, u = 0; u < 4 && o +
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。