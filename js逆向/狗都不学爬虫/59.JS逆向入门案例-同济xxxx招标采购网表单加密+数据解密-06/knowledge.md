# JS逆向入门案例-同济xxxx招标采购网表单加密+数据解密-06

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/141929981
- 序号：59
- 标签：补环境
- 页面信息：原创 已于 2025-04-08 20:50:51 修改 · 1.5k 阅读 · 18 · 9 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript #爬虫 #scrapy #python 于 2024-09-05 15:04:20 首次发布 原创 已于 2025-04-08 20:50:51 修改 · 1.5k 阅读 · 18 · 9 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-同济xxxx招标采购网表单加密+数据解密-06」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`aesKey`、`RSA`、`AES`、`key`、`aes`、`rsa`、`aesencrypt`、`rsaencrypt`、`aeskey`、`qJPhwad5zG9GP0hvfIrhczIYkgOG2i1ZvBAFBP7IZiGJz5PxS9QOFPg926sI6Mv3nBIS0`、`rsadecrypt`、`aesdecrypt`、`headers`

## 核心链路（提纯）
1. 逆向：同济xxxx招标采购网
2. 目的：表单数据：content、aesKey（也作为请求头），响应数据加密：conten、aesKey
3. 快速点位断点，全局搜索（aesKey）
4. 猜测验证AES+RSA加密
5. 模仿极验的加密模式
6. 提示：分析-调试-猜想-实现-执行 1、首先全局搜索aesKey,并在可疑的地方全部打上断点，然后触发断点： 好巧不巧就是第一个！ 2、从上图我们看见我们RSA和AES，好家伙，看样子应该是个 标准 加密 ,分析一看：
7. 3、复制curl到 spidertools.cn尝试进行请求： 也是成功拿到了响应密文！ 4、还是全局搜索有关aesKey,然后断点： 继续往下分析，我们看到**Object(b[“b”])(n, i)**对响应密文进行了调用，跟进去： 发现与刚刚我们进行加密的地方挨着，也是没谁了，一看应该是AES和RSA 解密 ：
8. 我们知道响应得到的aesKey作为RSA的密文，私钥也是死的，然后得到解密的一串字符串，而这段字符串作为AES解密的key（密钥），content就是AES的密文进行解密：
9. 差不多到这里已经结束！ 5、 python 代码的实现：
10. 6、运行结果：
11. 提示：快速定位方式，猜想是何加密，验证猜想

## 关键文字线索
- 概要整体架构流程技术细节小结
- 逆向：同济xxxx招标采购网
- URL：aHR0cHM6Ly96YmIudGpob25saW5lLmNvbS5jbi9ob21lTm90aWNl
- 目的：表单数据：content、aesKey（也作为请求头），响应数据加密：conten、aesKey
- 接口：aHR0cHM6Ly96YmIudGpob25saW5lLmNvbS5jbi90amgvcHVyY2hhc2VyL3B1YmxpYy9mcm9udFBhZ2VBbm5vdW5jZW1lbnRMaXN0
- 快速点位断点，全局搜索（aesKey）
- 猜测验证AES+RSA加密
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系！
- 提示：分析-调试-猜想-实现-执行 1、首先全局搜索aesKey,并在可疑的地方全部打上断点，然后触发断点： 好巧不巧就是第一个！ 2、从上图我们看见我们RSA和AES，好家伙，看样子应该是个 标准 加密 ,分析一看：
- 我们首先看：Object(o[“h”])(16, 16)—分析可知随机16字符串并且大写，作为AES的key和RSA的明文,而RSA的公钥为死的！
- 3、复制curl到 spidertools.cn尝试进行请求： 也是成功拿到了响应密文！ 4、还是全局搜索有关aesKey,然后断点： 继续往下分析，我们看到**Object(b[“b”])(n, i)**对响应密文进行了调用，跟进去： 发现与刚刚我们进行加密的地方挨着，也是没谁了，一看应该是AES和RSA 解密 ：
- 我们知道响应得到的aesKey作为RSA的密文，私钥也是死的，然后得到解密的一串字符串，而这段字符串作为AES解密的key（密钥），content就是AES的密文进行解密：
- 差不多到这里已经结束！ 5、 python 代码的实现：
- 提示：快速定位方式，猜想是何加密，验证猜想
- 提示：学习交流群：v:wzwzwz0613拉进群

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/adca13d8625e4766bb07a5b3bb85c629.png
- 图2：https://i-blog.csdnimg.cn/direct/4b4ed9b923eb40738b2b47970ff1c393.png（上下文：提示：分析-调试-猜想-实现-执行 1、首先全局搜索aesKey,并在可疑的地方全部打上断点，然后触发断点： 好巧不巧就是第一个！ 2、从上图我们看见我们RSA和AES，好家伙，看样子应该是个 标准 加密 ,分析一看：）
- 图4：https://i-blog.csdnimg.cn/direct/068c45040eeb4801991939119a252f21.png（上下文：3、复制curl到 spidertools.cn尝试进行请求： 也是成功拿到了响应密文！ 4、还是全局搜索有关aesKey,然后断点： 继续往下分析，我们看到**Object(b[“b”])(n, i)**对响应密文进行了调用，跟进去： 发）
- 图5：https://i-blog.csdnimg.cn/direct/ddc1a509610b4cd5ac939ded84ed4d12.png（上下文：3、复制curl到 spidertools.cn尝试进行请求： 也是成功拿到了响应密文！ 4、还是全局搜索有关aesKey,然后断点： 继续往下分析，我们看到**Object(b[“b”])(n, i)**对响应密文进行了调用，跟进去： 发）
- 图6：https://i-blog.csdnimg.cn/direct/996a18c7f31b43d498695b054fea97ca.png（上下文：3、复制curl到 spidertools.cn尝试进行请求： 也是成功拿到了响应密文！ 4、还是全局搜索有关aesKey,然后断点： 继续往下分析，我们看到**Object(b[“b”])(n, i)**对响应密文进行了调用，跟进去： 发）
- 图7：https://i-blog.csdnimg.cn/direct/3535c74c4bfe49e08c163e094f021214.png（上下文：我们知道响应得到的aesKey作为RSA的密文，私钥也是死的，然后得到解密的一串字符串，而这段字符串作为AES解密的key（密钥），content就是AES的密文进行解密：）
- 图10：https://i-blog.csdnimg.cn/direct/3d705b6aee2c4dce9618ecfa8ee5c23c.png（上下文：6、运行结果：）

## 代码/算法线索
- 片段1：

```text
表单加密 AES + RSA (请求头中的aesKey) 1、0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 随机生成16位字符串（大写）(AES的key和RSA的加密明文) 2、publicKey（RSA的key） = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCC3Lb0O4zgEakDfJ4XJO5zadXep9bQeWyJ6pa0e328PYQYZgLNP7eVrAP7mVZgG+8D4MicIcStTQnBxF8AEyJKrh/M/3WSSK2zDvrZn1paWf4SA8zFIn5cuYlcUH+WuxghQn3kKRUW2qtBY9eaGF5qntascctNgQTHmW3eqQzDBQIDAQAB"; 3、data（AES的加密明文） = '{"noticeName":null,"pageNum":'+ pageNum +',"pageSize":10,"tenderCategory":"4","noticeTypeL
```
- 片段2：

```text
表单加密 AES + RSA (请求头中的aesKey) 1、0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 随机生成16位字符串（大写）(AES的key和RSA的加密明文) 2、publicKey（RSA的key） = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCC3Lb0O4zgEakDfJ4XJO5zadXep9bQeWyJ6pa0e328PYQYZgLNP7eVrAP7mVZgG+8D4MicIcStTQnBxF8AEyJKrh/M/3WSSK2zDvrZn1paWf4SA8zFIn5cuYlcUH+WuxghQn3kKRUW2qtBY9eaGF5qntascctNgQTHmW3eqQzDBQIDAQAB"; 3、data（AES的加密明文） = '{"noticeName":null,"pageNum":'+ pageNum +',"pageSize":10,"tenderCategory":"4","noticeTypeL
```
- 片段3：

```text
const CryptoJs = require('crypto-js'); const JsEncrypt = require('jsencrypt'); function randoms(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) } function randomKey() { var strs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',key = ''; for (var i = 0; i < 16; i++){ num = randoms(0, strs.length); key += (strs[num] + '').toUpperCase(); } return key } // 加密表单数据 function setData(pageNum) { var data = '{"noticeName":null,"pageNum":'+ pageNum
```
- 片段4：

```text
const CryptoJs = require('crypto-js'); const JsEncrypt = require('jsencrypt'); function randoms(min, max) { return Math.floor(Math.random() * (max - min + 1) + min) } function randomKey() { var strs = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',key = ''; for (var i = 0; i < 16; i++){ num = randoms(0, strs.length); key += (strs[num] + '').toUpperCase(); } return key } // 加密表单数据 function setData(pageNum) { var data = '{"noticeName":null,"pageNum":'+ pageNum
```
- 片段5：

```text
加密数据 AES + RSA 1、得到返回的加密数据 content:......（作为AES的解密密文） aeskey:......（作为RSA的解密密文） 2、privateKey（RSA的key） = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALROqKeWuu+G6z6V7lesaAIC8FWWJ8qYRRy4HbbakJBH+OEWfD+0/MmMnZ28aMiV3qDy34SLfddDxvWJo/SR8iL8bjeqOEQxenu8Ogec+290w4F8IW6Ips/kZ5pnkg/TUn1GATOSV+RbB90okuykbBEbGKaNqGczJ/lI7RpfNvCpAgMBAAECgYA9RzJYaoizmRXgGlJ7Z3Odo2QMolB5sRBj90rZ9yQEdQFndh3aBOeYk/qJPhwad5zG9GP0hvfIrhczIYkgOG2i1ZvBAFBP7IZiGJz5PxS9QOFPg926sI6Mv3nBIS0+U88IyzPL/fQWNvhc3b9
```
- 片段6：

```text
加密数据 AES + RSA 1、得到返回的加密数据 content:......（作为AES的解密密文） aeskey:......（作为RSA的解密密文） 2、privateKey（RSA的key） = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALROqKeWuu+G6z6V7lesaAIC8FWWJ8qYRRy4HbbakJBH+OEWfD+0/MmMnZ28aMiV3qDy34SLfddDxvWJo/SR8iL8bjeqOEQxenu8Ogec+290w4F8IW6Ips/kZ5pnkg/TUn1GATOSV+RbB90okuykbBEbGKaNqGczJ/lI7RpfNvCpAgMBAAECgYA9RzJYaoizmRXgGlJ7Z3Odo2QMolB5sRBj90rZ9yQEdQFndh3aBOeYk/qJPhwad5zG9GP0hvfIrhczIYkgOG2i1ZvBAFBP7IZiGJz5PxS9QOFPg926sI6Mv3nBIS0+U88IyzPL/fQWNvhc3b9
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。