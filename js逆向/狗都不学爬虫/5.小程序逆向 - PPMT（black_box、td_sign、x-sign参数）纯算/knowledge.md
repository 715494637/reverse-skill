# 小程序逆向 - PPMT（black_box、td_sign、x-sign参数）纯算

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/155857844
- 序号：5
- 标签：补环境、签名参数、指纹
- 页面信息：原创 已于 2025-12-12 16:44:46 修改 · 798 阅读 · 6 · 6 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #小程序 #网络爬虫 #爬虫 #python #wasm 于 2025-12-12 16:43:20 首次发布 原创 已于 2025-12-12 16:44:46 修改 · 798 阅读 · 6 · 6 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 调试工具
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「小程序逆向 - PPMT（black_box、td_sign、x-sign参数）纯算」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`black_box`、`td_sign`、`x-sign`、`_fmBlackbox`、`md5`、`AES`

## 核心链路（提纯）
1. 逆向：小程序逆向 - PPMT（black_box、td_sign、x-sign参数）纯算
2. 关于F12强开，这里说一下流星大佬的工具，嘎嘎好用！支持最新版本的VX版本和js文件的替换
3. 1、新旧版VX都可调试 2、可过一些简单的反调试 3、内置的Webview控制台调试
4. 1、重新初始化、进去直接搜索black_box
5. 2、观察上面可以知道：e = new L.FMAgent(h.fmOpt),success是最后得到black_box的地方，所以只需要找到这个位置断点即可
6. 3、这里可以选择扣代码或者补环境或者纯算，最后生成的位置是：
7. 4、api接口：wxapp/v1?partner=popmart
8. 5、如果每次都想生成新发包，我们就需要清空缓存，wx.setStorageSync(‘_fmBlackbox’,undefined)
9. 6、如何找到发包位置呢：这个不得不提到wx.request
10. 7、td_sign参数直接搜索：
11. 8、x-sign参数也是直接搜索：
12. 1、首先是x-sign是md5 2、td_sign是Fingerprint2.x64hash128 3、v1接口表单：AES和Fingerprint2.x64hash128

## 关键文字线索
- 概要调试工具技术名词解释技术细节小结
- 逆向：小程序逆向 - PPMT（black_box、td_sign、x-sign参数）纯算
- 关于F12强开，这里说一下流星大佬的工具，嘎嘎好用！支持最新版本的VX版本和js文件的替换
- 1、新旧版VX都可调试 2、可过一些简单的反调试 3、内置的Webview控制台调试
- 1、重新初始化、进去直接搜索black_box
- 2、观察上面可以知道：e = new L.FMAgent(h.fmOpt),success是最后得到black_box的地方，所以只需要找到这个位置断点即可
- 3、这里可以选择扣代码或者补环境或者纯算，最后生成的位置是：
- 4、api接口：wxapp/v1?partner=popmart
- 5、如果每次都想生成新发包，我们就需要清空缓存，wx.setStorageSync(‘_fmBlackbox’,undefined)
- 6、如何找到发包位置呢：这个不得不提到wx.request
- 7、td_sign参数直接搜索：
- 8、x-sign参数也是直接搜索：
- 1、首先是x-sign是md5 2、td_sign是Fingerprint2.x64hash128 3、v1接口表单：AES和Fingerprint2.x64hash128
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：公众号：流星Studio
- 提示：需要过掉反调试才能F12调试
- 提示：直接可以找到指纹数值，然后一个个去找对应的值怎么来的，说一下加密有那些吧
- 提示：学习交流主页，星球持续更新中：（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/40809b439ce84644950b990ad9078a5a.png
- 图2：https://i-blog.csdnimg.cn/direct/3e8ec3caf6994715b0c4a3d17e4ece5a.png（上下文：提示：需要过掉反调试才能F12调试）
- 图3：https://i-blog.csdnimg.cn/direct/d81c91557be4416f8e373a3962715b52.png
- 图4：https://i-blog.csdnimg.cn/direct/20f2cb8db442408b9a10ffdddc0b07c4.png
- 图5：https://i-blog.csdnimg.cn/direct/49873426720b4d23bf97f00f41dd0ce5.png
- 图7：https://i-blog.csdnimg.cn/direct/155c825a7b2442a19d283a35cf9634f9.png
- 图8：https://i-blog.csdnimg.cn/direct/89612592076e40db88b1acf12aa264b3.png
- 图9：https://i-blog.csdnimg.cn/direct/0108cf78d62f4f789df6583da6e80ea1.png
- 图10：https://i-blog.csdnimg.cn/direct/c5a773b42a494509b3652b526d7ebf20.png
- 图11：https://i-blog.csdnimg.cn/direct/db3c84c392eb43aabe49a93b5f2e1e02.png
- 图12：https://i-blog.csdnimg.cn/direct/981f70dec5724666863c278fc21870d6.png
- 图13：https://i-blog.csdnimg.cn/direct/04af6cac98b54e73aee5f0dd68f14055.png

## 代码/算法线索
- 片段1：

```text
e.getInfo({ page: t, mode: "plugin", openid: r.openid ? (0, p.default)(r.openid) : "", unionid: r.union_id ? (0, p.default)(r.union_id) : "", success: function(t) { n(t) }, fail: function(t) { o(t) }, complete: function(t) {} }) AI写代码javascript运行123456789101112131415
```
- 片段2：

```text
e.getInfo({ page: t, mode: "plugin", openid: r.openid ? (0, p.default)(r.openid) : "", unionid: r.union_id ? (0, p.default)(r.union_id) : "", success: function(t) { n(t) }, fail: function(t) { o(t) }, complete: function(t) {} })
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。