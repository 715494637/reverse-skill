# JS逆向 - spiderdemo T6题（JSVMP喵喵盾、protobuf、css）纯算

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/153781127
- 序号：8
- 标签：JSVMP/VMP、补环境、Cookie、签名参数、指纹
- 页面信息：原创 于 2025-10-23 16:02:02 发布 · 2.2k 阅读 · 27 · 26 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #wasm #python #网络爬虫 #爬虫 原创 于 2025-10-23 16:02:02 发布 · 2.2k 阅读 · 27 · 26 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向 - spiderdemo T6题（JSVMP喵喵盾、protobuf、css）纯算」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`authToken`、`EGPNewQ1KFbub02bkfvqTeXeQx9doFpBjbGEl1rYtHbHas33`、`cookiesEnabled`、`blackboxprotobuf`、`RSA`、`auth_token`、`rsa_encrypt`、`headers`、`cookies`、`params`

## 核心链路（提纯）
1. 逆向：JS逆向 - spiderdemo T6题（JSVMP喵喵盾、protobuf、css）纯算
2. 1、首先打开F12观察发包情况：
3. 2、根据题目的提示，我们可以知道表单数据和响应数据看到是protobuf处理了的，观察一下启动器（堆栈），看看有没有什么线索
4. 3、好家伙，就这个混淆（vmp），单步调试都调试不了，很多小伙伴这个时候想放弃了，或者想着去补环境了，这里只能说补环境更难，喵喵盾的检测不是一般的恶心
5. 4、这个时候，看看断XHR有没有什么线索吧！
6. 5、我们把这些数组的对象展开看看，有没有什么线索吧：
7. 6、根据上面我们可以看到：body提交的是一个Uint8Array的长度位512的数据，还可以看到：
8. 7、看到这里是不是很眼熟了，刚刚我们表单的数据是不是也有这些呢我们，这时候我们直接跳过断点，看看刚刚请求的表单：
9. 8、好家伙，大致是差不多的，回到刚刚的那个Uint8Array的长度位512，我们直接给它转换一下，通过String.fromCharCode
10. 9、其实就是一致的，那么我们知道它是一个protobuf，是不是可以通过这个Uint8Array的长度位512去给它返回序列化一下呢：blackboxprotobuf 我们 可以py里面的序列化库给它解析一下
11. 10、这里推荐大家去看一下万方的protobuf文章，序列化结果
12. 11、观察序列化之后的那个结果，我们分析分析那些是需要加密处理的：

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：JS逆向 - spiderdemo T6题（JSVMP喵喵盾、protobuf、css）纯算
- URL：aHR0cHM6Ly93d3cuc3BpZGVyZGVtby5jbi9hdXRoZW50aWNhdGlvbi9qc3ZtcF9jaGFsbGVuZ2UvP2NoYWxsZW5nZV90eXBlPWpzdm1wX2NoYWxsZW5nZQ==
- 1、首先打开F12观察发包情况：
- 2、根据题目的提示，我们可以知道表单数据和响应数据看到是protobuf处理了的，观察一下启动器（堆栈），看看有没有什么线索
- 3、好家伙，就这个混淆（vmp），单步调试都调试不了，很多小伙伴这个时候想放弃了，或者想着去补环境了，这里只能说补环境更难，喵喵盾的检测不是一般的恶心
- 4、这个时候，看看断XHR有没有什么线索吧！
- 5、我们把这些数组的对象展开看看，有没有什么线索吧：
- 6、根据上面我们可以看到：body提交的是一个Uint8Array的长度位512的数据，还可以看到：
- 7、看到这里是不是很眼熟了，刚刚我们表单的数据是不是也有这些呢我们，这时候我们直接跳过断点，看看刚刚请求的表单：
- 8、好家伙，大致是差不多的，回到刚刚的那个Uint8Array的长度位512，我们直接给它转换一下，通过String.fromCharCode
- 9、其实就是一致的，那么我们知道它是一个protobuf，是不是可以通过这个Uint8Array的长度位512去给它返回序列化一下呢：blackboxprotobuf 我们 可以py里面的序列化库给它解析一下
- 10、这里推荐大家去看一下万方的protobuf文章，序列化结果
- 11、观察序列化之后的那个结果，我们分析分析那些是需要加密处理的：
- 12、所以我们只需要知道那俩个加密值是怎么来的，先去判断一下长度吧：
- 13、打印发现是一个172位的大小写和数字的字符串，大概率是RSA了，因为RSA也有这个特征，直接全局搜索encrypt和setPublicKey
- 14、您猜怎么着，还真断住了，我的哥，继续走，看看加密情况：
- 15、这里可以看到这个t有点像base64的值，直接atob试试：
- 16、破案了，就是RSA了，第一个密文我们拿到了，就是说： '1761204227_jsvmp_secret_key_2024’进行base64再RSA,继续看下一个
- 17、这里我们可以看上图，另外一个加密的东西其实就是User-Agent前面一段进行RSA加密，继续看XHR发包的时候是不是刚刚生成的那俩个值

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/44416e4acae24f59a4f0951de0df593e.png
- 图2：https://i-blog.csdnimg.cn/direct/2112309c542f4789b5e74a511622455f.png
- 图3：https://i-blog.csdnimg.cn/direct/61f7ece63bfa4b58a40b44dd127d090d.png
- 图4：https://i-blog.csdnimg.cn/direct/db82c0dd7fa949c3ac51f2fbcbeb210d.png
- 图5：https://i-blog.csdnimg.cn/direct/421aecb92c48431aaaf686e1046a40ee.png
- 图6：https://i-blog.csdnimg.cn/direct/87785e31bf5d4ed5a8b06b94f71ea938.png
- 图7：https://i-blog.csdnimg.cn/direct/eb5f3540b2e144fdada0d50e3be0456a.png
- 图9：https://i-blog.csdnimg.cn/direct/d9023f076e11497ab4eb7a1ea3611e5c.png
- 图10：https://i-blog.csdnimg.cn/direct/d2833190c5804e99bfa4b723c3fb78a4.png
- 图11：https://i-blog.csdnimg.cn/direct/1f886d027eaf44288dbea7d184073274.png
- 图13：https://i-blog.csdnimg.cn/direct/bfdfcd3c55d44227bb09845a1bcb2e56.png
- 图14：https://i-blog.csdnimg.cn/direct/ce5021afd8134fb38e351f70d31307e6.png

## 代码/算法线索
- 片段1：

```text
{ "pageNumber": 1, "challengeType": "jsvmp_challenge", "authToken": "Rs60Gllw8rYyfk7K1FaGprH/+x8diToyss47uH4e6hucr6nCZ2WOn284AYzIb7muwsUR+tC3+5VczL1XnTNPSCmF88iGPDqt+1Av6Z2bW8504so776l29hCzW50nnpyH/RCejyaA9iWnurNEoqEIU6bPafGAWHSSIhdH38UTeuA=", "timestamp": 1761202259, "fingerprint": { "userAgent": "aKKzVH4pI/OPdZRgyLibDBzCrfbH4cBI1HRyzuVCIP/jyP6F6W8eSrG6gwRzsqZZ6sib21K8rYMdnOjdtNUY7yVhzF5wv4vyQ0TQ1LH6v4i3/EGPNewQ1KFbub02bkfvqTeXeQx9doFpBjbGEl1rYtHbHas33+n7n8Ka1CaKnPI=", "lang
```
- 片段2：

```text
{ "pageNumber": 1, "challengeType": "jsvmp_challenge", "authToken": "Rs60Gllw8rYyfk7K1FaGprH/+x8diToyss47uH4e6hucr6nCZ2WOn284AYzIb7muwsUR+tC3+5VczL1XnTNPSCmF88iGPDqt+1Av6Z2bW8504so776l29hCzW50nnpyH/RCejyaA9iWnurNEoqEIU6bPafGAWHSSIhdH38UTeuA=", "timestamp": 1761202259, "fingerprint": { "userAgent": "aKKzVH4pI/OPdZRgyLibDBzCrfbH4cBI1HRyzuVCIP/jyP6F6W8eSrG6gwRzsqZZ6sib21K8rYMdnOjdtNUY7yVhzF5wv4vyQ0TQ1LH6v4i3/EGPNewQ1KFbub02bkfvqTeXeQx9doFpBjbGEl1rYtHbHas33+n7n8Ka1CaKnPI=", "lang
```
- 片段3：

```text
import blackboxprotobuf from loguru import logger # 前5位是空格及长度 # Uint8Array的长度位512 body array = [0,0,0,1,251,8,1,18,15,106,115,118,109,112,95,99,104,97,108,108,101,110,103,101,26,172,1,82,81,50,117,79,111,101,66,69,83,120,114,48,48,100,102,77,116,88,76,89,89,53,74,84,111,57,120,105,118,90,101,113,119,52,81,110,116,70,67,77,109,52,79,56,97,73,48,67,56,119,103,51,72,51,73,114,101,104,55,47,118,43,50,52,80,43,104,68,65,79,54,97,119,115,120,114,108,83,53,109,114,66,86,104,49,67,48
```
- 片段4：

```text
import blackboxprotobuf from loguru import logger # 前5位是空格及长度 # Uint8Array的长度位512 body array = [0,0,0,1,251,8,1,18,15,106,115,118,109,112,95,99,104,97,108,108,101,110,103,101,26,172,1,82,81,50,117,79,111,101,66,69,83,120,114,48,48,100,102,77,116,88,76,89,89,53,74,84,111,57,120,105,118,90,101,113,119,52,81,110,116,70,67,77,109,52,79,56,97,73,48,67,56,119,103,51,72,51,73,114,101,104,55,47,118,43,50,52,80,43,104,68,65,79,54,97,119,115,120,114,108,83,53,109,114,66,86,104,49,67,48
```
- 片段5：

```text
now_ = int(time.time()) auth_token = self.rsa_encrypt(base64.b64encode(f'{now_}_jsvmp_secret_key_2024'.encode('utf-8')).decode('utf-8')) ua = self.rsa_encrypt("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)") original_data = { '1': page, '2': b'jsvmp_challenge', '3': auth_token.encode(), '4': now_, '5': { '1': ua.encode(), '2': b'zh-CN', '3': b'1536x864', '4': b'24', '5': 32, '6': 1, '7': b"PDF Viewer, Chrome PDF Viewer, Chromium PDF Viewer, 
```
- 片段6：

```text
now_ = int(time.time()) auth_token = self.rsa_encrypt(base64.b64encode(f'{now_}_jsvmp_secret_key_2024'.encode('utf-8')).decode('utf-8')) ua = self.rsa_encrypt("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)") original_data = { '1': page, '2': b'jsvmp_challenge', '3': auth_token.encode(), '4': now_, '5': { '1': ua.encode(), '2': b'zh-CN', '3': b'1536x864', '4': b'24', '5': 32, '6': 1, '7': b"PDF Viewer, Chrome PDF Viewer, Chromium PDF Viewer, 
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。