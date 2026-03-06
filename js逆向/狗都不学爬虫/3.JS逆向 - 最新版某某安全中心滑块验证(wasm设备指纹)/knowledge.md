# JS逆向 - 最新版某某安全中心滑块验证(wasm设备指纹)

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/157139576
- 序号：3
- 标签：WASM、补环境、签名参数、滑块/验证码、指纹
- 页面信息：最新推荐文章于 2026-03-04 22:44:41 发布 原创 于 2026-01-19 18:31:51 发布 · 1.3k 阅读 · 9 · 8 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #爬虫 #网络爬虫 #python #wasm 原创 于 2026-01-19 18:31:51 发布 · 1.3k 阅读 · 9 · 8 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体分析流程
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 最新版某某安全中心滑块验证(wasm设备指纹)」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`nonce`、`sign`、`getSign`、`md5`、`aes`、`key`

## 核心链路（提纯）
1. 逆向：JS逆向 - 最新版某某安全中心滑块验证(wasm设备指纹)
2. 1、按照以往我们分析滑块验证码的流程：获取滑块图片信息接口、验证接口
3. 2、观察get接口，通过查找堆栈的方式分析：nonce 和 sign （这里的sessionid和d后面我们再看）
4. 3、分析验证接口的加密：behaviorData、pointJson，搜索关键词
5. 这里initWasm函数是加载wasm初始化的，jsonEncryptor.ccall就是加密函数，搜索：behaviorData，发现加密是一样的
6. 3、现在我们再来分析sessionid和d参数：
7. 4、102接口：nonce、sgei、ts、core、detail、sig都是加密参数，直接搜索加密位置：detail
8. 5、继续观察这个I的值从哪里来的：发现还是一个102接口给的
9. 6、上面可以看到会去解密ePkCore、ePkDetail，然后gA(t, B)去加密最后的指纹
10. 7、继续观察(C = A.v).ChangeDKey(I)：其实这里也是一个wasm加密
11. 8、继续观察会发现sessionid就是init接口返回的
12. 直接搜索：init加密：其实就是一个aes加密，key：K9Q4XI4QyEP0sANO

## 关键文字线索
- 逆向：JS逆向 - 最新版某某安全中心滑块验证(wasm设备指纹)
- URL：aHR0cHM6Ly9hcS45OS5jb20vVjMvTkRVc2VyX0xvZ2luLmh0bQ==
- 1、按照以往我们分析滑块验证码的流程：获取滑块图片信息接口、验证接口
- 获取图片验证码接口：/v1/captcha/get
- 验证接口：/v1/captcha/verify
- 2、观察get接口，通过查找堆栈的方式分析：nonce 和 sign （这里的sessionid和d后面我们再看）
- 这里可以看到const {sign: a, nonce: u} = await this.getSign(); 代码是混淆的，直接可以使用在线还原混淆：https://webcrack.netlify.app/
- 单步进去观察：时间戳就是nonce+md5值就是sign
- 3、分析验证接口的加密：behaviorData、pointJson，搜索关键词
- 这里initWasm函数是加载wasm初始化的，jsonEncryptor.ccall就是加密函数，搜索：behaviorData，发现加密是一样的
- 3、现在我们再来分析sessionid和d参数：
- 4、102接口：nonce、sgei、ts、core、detail、sig都是加密参数，直接搜索加密位置：detail
- 5、继续观察这个I的值从哪里来的：发现还是一个102接口给的
- 6、上面可以看到会去解密ePkCore、ePkDetail，然后gA(t, B)去加密最后的指纹
- 7、继续观察(C = A.v).ChangeDKey(I)：其实这里也是一个wasm加密
- 8、继续观察会发现sessionid就是init接口返回的
- 直接搜索：init加密：其实就是一个aes加密，key：K9Q4XI4QyEP0sANO
- 9、观察102接口的请求表单：第二次接口使用的ap和第三次接口的ap是一致的
- 10、最后我们看py实现的效果：
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/7fb528d6bb88431098a2a4026cc0e921.png
- 图2：https://i-blog.csdnimg.cn/direct/731bf29d904a4bf18e540237af3a6ce3.png（上下文：获取图片验证码接口：/v1/captcha/get）
- 图3：https://i-blog.csdnimg.cn/direct/faad1029fab943bfb7673cda49af1bcd.png
- 图4：https://i-blog.csdnimg.cn/direct/d8c495a31fdc43b89243fea1b0c533b7.png
- 图5：https://i-blog.csdnimg.cn/direct/7326ac5d6ed948208b08559e4e984581.png
- 图6：https://i-blog.csdnimg.cn/direct/9cc8a44f074549a0ae9fbd1d286790b7.png
- 图7：https://i-blog.csdnimg.cn/direct/9b3c9edee5984d2ea0ed7d90fbfae02e.png（上下文：提示：这里说一下x就是滑块滑动的距离）
- 图8：https://i-blog.csdnimg.cn/direct/e6190cda4fd7433babe73d6ea9f76023.png（上下文：提示：这里说一下x就是滑块滑动的距离）
- 图9：https://i-blog.csdnimg.cn/direct/f6a79091252647d6bb81a5149a8ab72a.png
- 图10：https://i-blog.csdnimg.cn/direct/d8f7c840f95b48bd82a7dbb45e3e7f7c.png
- 图11：https://i-blog.csdnimg.cn/direct/b8e9231b06214f0c9d9494bfeb772a73.png
- 图12：https://i-blog.csdnimg.cn/direct/c2e8a0c6cb2042d3b7b105590d083583.png

## 代码/算法线索
- 未提取到可见代码块，需通过断点 + 调用栈继续定位。

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。