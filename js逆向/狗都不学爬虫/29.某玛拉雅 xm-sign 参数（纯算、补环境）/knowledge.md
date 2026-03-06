# 某玛拉雅 **xm-sign** 参数（纯算、补环境）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149248713
- 序号：29
- 标签：补环境、签名参数、指纹
- 页面信息：最新推荐文章于 2026-01-03 23:54:46 发布 原创 于 2025-07-10 15:39:13 发布 · 1.3k 阅读 · 23 · 31 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #网络爬虫 #爬虫 #python 原创 于 2025-07-10 15:39:13 发布 · 1.3k 阅读 · 23 · 31 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「某玛拉雅 **xm-sign** 参数（纯算、补环境）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`xm-sign`、`AES`、`key`、`aes_encrypt`、`uuid`、`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`、`headers`

## 核心链路（提纯）
1. 逆向：某玛拉雅 xm-sign 参数（纯算、补环境）
2. 1、全局搜索xm-sign,这俩个位置下断点，刷新或者点击其他选项触发
3. 2、断点发现是异步生成的，
4. 3、进行往上断点，在dwsGetSessionID、dwsGetBrowserId里面下断点
5. 多次进行断点会发现， window.du_web_sdk.getBrowserID只加载一次，然后就不加载，观察生成的值也会发现，后面那一段是不变的，每次只有第一段值是变，那么肯定是window.du_web_sdk.getSessionID异步操作生成的
6. 4、跳进去发现一堆混淆，还是异步，这就难搞了，这里直接说一下特点吧，每次生成一次这个值，浏览器会发送一个包，而且是加密的，所以猜测可能是浏览器返回的这个加密值进行解密得到xm-sign的后半段参数
7. 5、那么我们直接去对这个包的位置下断点,请求数据是一个二进制流
8. 6、开始分析_0x32a48b是怎么来的，往上看，它是_0x32a48b = this[_0x17c4de(0x6758f ^ 0x6740c)](_0x6096f0, _0x489d66)生成
9. 7、进行往下走，跳入_getProcessData函数里面，观察分析对指纹信息进行什么操作
10. 最后一步可以通过前面来猜想会不会是一个AES加密
11. 果不其然，发现就是AES加密
12. 8、到这里我们其实就已经拿到了最后的请求载荷，而浏览器它后面还有一步操作是将_base64ToArrayBuffer转换，然后发送xhr，而我们是使用py发送请求的没必要

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：某玛拉雅 xm-sign 参数（纯算、补环境）
- URL: aHR0cHM6Ly93d3cueGltYWxheWEuY29tL3RvcC8=
- 1、全局搜索xm-sign,这俩个位置下断点，刷新或者点击其他选项触发
- 2、断点发现是异步生成的，
- 3、进行往上断点，在dwsGetSessionID、dwsGetBrowserId里面下断点
- 多次进行断点会发现， window.du_web_sdk.getBrowserID只加载一次，然后就不加载，观察生成的值也会发现，后面那一段是不变的，每次只有第一段值是变，那么肯定是window.du_web_sdk.getSessionID异步操作生成的
- 4、跳进去发现一堆混淆，还是异步，这就难搞了，这里直接说一下特点吧，每次生成一次这个值，浏览器会发送一个包，而且是加密的，所以猜测可能是浏览器返回的这个加密值进行解密得到xm-sign的后半段参数
- 5、那么我们直接去对这个包的位置下断点,请求数据是一个二进制流
- 6、开始分析_0x32a48b是怎么来的，往上看，它是_0x32a48b = this[_0x17c4de(0x6758f ^ 0x6740c)](_0x6096f0, _0x489d66)生成
- 这里发现它是通过_0x6096f0一堆指纹信息，和一个固定值m9ZtRrz:qujT8@da进行_getProcessData函数操作得到的arrbuffer
- 7、进行往下走，跳入_getProcessData函数里面，观察分析对指纹信息进行什么操作
- 第一步是对指纹信息进行了转字符串，然后将字符串转换成了Uint8Array数组
- 第二步对生成的Uint8Array数组进行_compress函数操作
- 进入到_compress函数操作观察，发现个pako的关键字，看着像对数组进行压缩，经过对比发现就是标准的压缩操作
- 第三步发现先将Uint8Array数组转换成ArrayBuffer数组，再进行Jcr.lib.WordArray.create操作,Jcr有点像require(‘crypto-js’)，验证发现一样
- 最后一步可以通过前面来猜想会不会是一个AES加密
- 进入到_aeEn函数观察
- 果不其然，发现就是AES加密
- 8、到这里我们其实就已经拿到了最后的请求载荷，而浏览器它后面还有一步操作是将_base64ToArrayBuffer转换，然后发送xhr，而我们是使用py发送请求的没必要

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/dedb5a3efc694ad3b59b3a23029d234a.png
- 图2：https://i-blog.csdnimg.cn/direct/3eddb96dde034c4b8fc9f25dc47505fa.png
- 图3：https://i-blog.csdnimg.cn/direct/86e6faf327d24916a9adf31d10ca5e74.png
- 图5：https://i-blog.csdnimg.cn/direct/b8823c9f95b8467e966bf4caac56198f.png
- 图6：https://i-blog.csdnimg.cn/direct/1cf2485e0f6e41c4a6092091117d6913.png
- 图7：https://i-blog.csdnimg.cn/direct/68cc92e3aae446b09752fb50cfb4ba41.png
- 图8：https://i-blog.csdnimg.cn/direct/1a422b5cf0f948c7840178666bd5d9d2.png
- 图9：https://i-blog.csdnimg.cn/direct/e1e48ce599444a4f9bdda938a5206cbc.png
- 图10：https://i-blog.csdnimg.cn/direct/9653847179234e779b0af23a619517c4.png
- 图11：https://i-blog.csdnimg.cn/direct/f59d3e7e704d48bb88cacd8bf765379a.png
- 图12：https://i-blog.csdnimg.cn/direct/b175ecc2a27042a69c97684c9a9de927.png
- 图13：https://i-blog.csdnimg.cn/direct/4c4ec00ea6b9430c8e7ef2f2acc8371d.png

## 代码/算法线索
- 片段1：

```text
Promise.all([(0, u.dwsGetSessionID)(), (0, u.dwsGetBrowserId)()]).then((function(e) { var t = v(e, 2) , n = t[0] , o = t[1] , a = "".concat(o, "&&").concat(n); return h(h({}, r || {}), {}, { "xm-sign": a }) } 运行项目并下载源码javascript运行1234567891011
```
- 片段2：

```text
Promise.all([(0, u.dwsGetSessionID)(), (0, u.dwsGetBrowserId)()]).then((function(e) { var t = v(e, 2) , n = t[0] , o = t[1] , a = "".concat(o, "&&").concat(n); return h(h({}, r || {}), {}, { "xm-sign": a }) }
```
- 片段3：

```text
['e0Hq1duRaqCNimDNy2VmvxM2ZFdiFIW9yqroYskYUnZXx4rtN5smBsaKCuafegkM_2', 'D2BgAVn9zhb5y60RO3tj2GJLsB1cTb6mtzHvbhgo8po1gXf5'] 前半段固定 D2BgAVn9zhb5y60RO3tj2GJLsB1cTb6mtzHvbhgo8po1gXf5 后半段需要逆向 e0Hq1duRaqCNimDNy2VmvxM2ZFdiFIW9yqroYskYUnZXx4rtN5smBsaKCuafegkM_2 运行项目并下载源码javascript运行12345
```
- 片段4：

```text
['e0Hq1duRaqCNimDNy2VmvxM2ZFdiFIW9yqroYskYUnZXx4rtN5smBsaKCuafegkM_2', 'D2BgAVn9zhb5y60RO3tj2GJLsB1cTb6mtzHvbhgo8po1gXf5'] 前半段固定 D2BgAVn9zhb5y60RO3tj2GJLsB1cTb6mtzHvbhgo8po1gXf5 后半段需要逆向 e0Hq1duRaqCNimDNy2VmvxM2ZFdiFIW9yqroYskYUnZXx4rtN5smBsaKCuafegkM_2
```
- 片段5：

```text
m9ZtRrz:qujT8@da 固定 运行项目并下载源码python运行1
```
- 片段6：

```text
m9ZtRrz:qujT8@da 固定
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。