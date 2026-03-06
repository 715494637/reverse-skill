# JS逆向 - volaris航司（注册表单加密）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/150347907
- 序号：19
- 标签：补环境、签名参数、滑块/验证码
- 页面信息：原创 已于 2025-08-13 16:47:34 修改 · 1.2k 阅读 · 5 · 4 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #爬虫 #网络爬虫 #wasm #python 于 2025-08-13 16:45:21 首次发布 原创 已于 2025-08-13 16:47:34 修改 · 1.2k 阅读 · 5 · 4 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向 - volaris航司（注册表单加密）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`AES`、`key`、`RSA`、`KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvAtc`、`w5vA70gn1CgVEEQYkkwIfpZrLAb5`、`ItdAipsSyJFRP7Y8vlyJTRGTCgmE4wTZJf2G4U0FKfpbSZ2BQuAEqb4xEQsJoTsuRaF7uH85`、`FKMw0H1AfPa4JjM5pvMdTcpKYmJVE09zSzPZilSqu5ya1IvzRCURvT8Xh6bIQY53BVoyMQZJSuEFvn8gkL`、`KEY-----`、`ciphertext`

## 核心链路（提纯）
1. 逆向：JS逆向 - volaris航司（注册表单加密）
2. 1、首先进行XHR断点：createaccount
3. 2、往上跟栈你会发现，生成的地方在：const hi = lt.serializeBody();
4. 3、跟栈进去发现没头绪了，里面是一个class定义的序列化对象，实例化进去的body是一个JSON对象明文
5. 4、到这里，发现往后面跟也比较难跟到加密的地方，那么我们可以想想什么是序列化操作，它是不是得把JSON格式的对象转换成字符串，然后进行加密呢，所以直接hook
6. 5、当我们hook到json.stringify里面传入的是刚刚那个this.body发现它后面就是加密了
7. AES标准加密：key、iv随机
8. RSA加密：key 接口返回 提示：publickey返回接口：volarisAppConfig.json
9. session接口返回（无加密）：存在请求链强校验，不然就406
10. createaccount接口（表单加密）：存在请求链校验，加密错误返回500，reCaptcha失效或者错误返回400
11. 提示：这里注意node版本得使用20版本以下的（最好18.18.0），不然加密不对
12. 提示：请求头authorization：jwt

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：JS逆向 - volaris航司（注册表单加密）
- URL：aHR0cHM6Ly93d3cudm9sYXJpcy5jb20vYWdlbmN5L3JlZ2lzdGVy
- 1、首先进行XHR断点：createaccount
- 2、往上跟栈你会发现，生成的地方在：const hi = lt.serializeBody();
- 3、跟栈进去发现没头绪了，里面是一个class定义的序列化对象，实例化进去的body是一个JSON对象明文
- 4、到这里，发现往后面跟也比较难跟到加密的地方，那么我们可以想想什么是序列化操作，它是不是得把JSON格式的对象转换成字符串，然后进行加密呢，所以直接hook
- 5、当我们hook到json.stringify里面传入的是刚刚那个this.body发现它后面就是加密了
- AES标准加密：key、iv随机
- RSA加密：key 接口返回 提示：publickey返回接口：volarisAppConfig.json
- session接口返回（无加密）：存在请求链强校验，不然就406
- createaccount接口（表单加密）：存在请求链校验，加密错误返回500，reCaptcha失效或者错误返回400
- captchaResponse：recaptchaV2验证返回
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：这里注意node版本得使用20版本以下的（最好18.18.0），不然加密不对
- 提示：请求头authorization：jwt
- 提示：学习交流主页，星球持续更新中：（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/8a5869c781d94aa5838a1d0084eac684.png
- 图2：https://i-blog.csdnimg.cn/direct/ab1f5bb59c3149159f6a280936fe48f7.png
- 图3：https://i-blog.csdnimg.cn/direct/ed62415bb89b44f7b88c86294c84e5f5.png
- 图4：https://i-blog.csdnimg.cn/direct/a3ab8025ad9f487a8342dc617e0bc16f.png
- 图5：https://i-blog.csdnimg.cn/direct/33a66cb174424deeb915f29ebb75f843.png
- 图7：https://i-blog.csdnimg.cn/direct/86c1b275c0904207ad14cfa1d6253479.png

## 代码/算法线索
- 片段1：

```text
parse1 = JSON.stringify; JSON.stringify = function(){ console.log('stringify:',arguments[0]); debugger; return parse1(arguments[0]); }; 运行项目并下载源码javascript运行123456
```
- 片段2：

```text
parse1 = JSON.stringify; JSON.stringify = function(){ console.log('stringify:',arguments[0]); debugger; return parse1(arguments[0]); };
```
- 片段3：

```text
const CryptoJS = require('crypto-js'); const forge = require('node-forge'); publicKey = "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvAtc+ZqEbkSH1cRpTEe/w5vA70gn1CgVEEQYkkwIfpZrLAb5/S3bMLTuCZd46nSeK6GU49fZiEPESg1Z1+zrD3FZkHtOgQUFzB+9cifBrMYT1sdCZ5YLkP+U1F4B7/ItdAipsSyJFRP7Y8vlyJTRGTCgmE4wTZJf2G4U0FKfpbSZ2BQuAEqb4xEQsJoTsuRaF7uH85+hvr/hIfssgVJO1VZ6zC8qPY7VKCKmA6GHed9UdNOPfl/GNm+xYeE/FKMw0H1AfPa4JjM5pvMdTcpKYmJVE09zSzPZilSqu5ya1IvzRCURvT8Xh6bIQY53BVoyM
```
- 片段4：

```text
const CryptoJS = require('crypto-js'); const forge = require('node-forge'); publicKey = "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvAtc+ZqEbkSH1cRpTEe/w5vA70gn1CgVEEQYkkwIfpZrLAb5/S3bMLTuCZd46nSeK6GU49fZiEPESg1Z1+zrD3FZkHtOgQUFzB+9cifBrMYT1sdCZ5YLkP+U1F4B7/ItdAipsSyJFRP7Y8vlyJTRGTCgmE4wTZJf2G4U0FKfpbSZ2BQuAEqb4xEQsJoTsuRaF7uH85+hvr/hIfssgVJO1VZ6zC8qPY7VKCKmA6GHed9UdNOPfl/GNm+xYeE/FKMw0H1AfPa4JjM5pvMdTcpKYmJVE09zSzPZilSqu5ya1IvzRCURvT8Xh6bIQY53BVoyM
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。