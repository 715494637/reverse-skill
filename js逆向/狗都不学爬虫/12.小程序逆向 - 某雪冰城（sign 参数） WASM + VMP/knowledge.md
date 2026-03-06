# 小程序逆向 - 某雪冰城（sign 参数） WASM + VMP

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/151794459
- 序号：12
- 标签：WASM、JSVMP/VMP、补环境、签名参数
- 页面信息：最新推荐文章于 2026-01-31 09:58:27 发布 原创 于 2025-09-17 15:50:46 发布 · 2.6k 阅读 · 8 · 9 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #小程序 #wasm #python #网络爬虫 #爬虫 #javascript 原创 于 2025-09-17 15:50:46 发布 · 2.6k 阅读 · 8 · 9 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「小程序逆向 - 某雪冰城（sign 参数） WASM + VMP」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`sign`、`rsa_sign`、`rsa`、`rsa_sign_bg`、`sha256`、`md5`

## 核心链路（提纯）
1. 逆向：小程序逆向 - 某雪冰城（sign 参数） WASM + VMP
2. 关于F12强开，这里说一下流星大佬的工具，嘎嘎好用！支持最新版本的VX版本和js文件的替换
3. 1、步入正题，使用堆栈断点：
4. 2、这里就直接跳到加密的位置，不多废话：
5. 3、当我们 执行这个**(0,o.default)(h)**函数之后，异步返回值直接就生成的 sign的值，所以单步进入该方法
6. 4、o.apply(this, arguments)会执行o函数，然后通过(0,a.default)(u, c)函数生成sign值，直接进入该方法
7. 5、从这里我们可以看到 utils/wasm/rsa_sign.js，看名字就知道肯定是 一个wasm里面进行rsa加密，继续找到m.apply(this, arguments)，需要进入到m函数里面
8. 6、观察到_()执行的是b()函数，而b函数里面是去加载一个wasm的压缩文件 rsa_sign_bg.wasm.br，因为我们在小程序中，是通过VX加载的，所以我们只能去缓存中去找了，这个时候就体现流星大佬开发工具的强大了，直接就可以js替换拿到wasm
9. 7、上面这样就可以加载完成了
10. 8、继续往下看
11. 9、接下来只需要把关于p(l, d)函数有关的，属性和函数扣下来就可以了，n是载荷数据，t表示rsa的私钥
12. 1、说一下小程序VMP补环境和纯算：还是提一下这个强开F12，非常好用

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：小程序逆向 - 某雪冰城（sign 参数） WASM + VMP
- 关于F12强开，这里说一下流星大佬的工具，嘎嘎好用！支持最新版本的VX版本和js文件的替换
- 需要 ADD VX：MeteorStudio6
- 公众号：流星Studio
- 1、步入正题，使用堆栈断点：
- 2、这里就直接跳到加密的位置，不多废话：
- 3、当我们 执行这个**(0,o.default)(h)**函数之后，异步返回值直接就生成的 sign的值，所以单步进入该方法
- 4、o.apply(this, arguments)会执行o函数，然后通过(0,a.default)(u, c)函数生成sign值，直接进入该方法
- 5、从这里我们可以看到 utils/wasm/rsa_sign.js，看名字就知道肯定是 一个wasm里面进行rsa加密，继续找到m.apply(this, arguments)，需要进入到m函数里面
- 6、观察到_()执行的是b()函数，而b函数里面是去加载一个wasm的压缩文件 rsa_sign_bg.wasm.br，因为我们在小程序中，是通过VX加载的，所以我们只能去缓存中去找了，这个时候就体现流星大佬开发工具的强大了，直接就可以js替换拿到wasm
- 7、上面这样就可以加载完成了
- 9、接下来只需要把关于p(l, d)函数有关的，属性和函数扣下来就可以了，n是载荷数据，t表示rsa的私钥
- 1、说一下小程序VMP补环境和纯算：还是提一下这个强开F12，非常好用
- 2、以某达广场小程序为例吧：sign值，看着像一个sha256，其实并不是
- 3、往上看这个函数在那个js里面：发现是TXVMP
- 4、直接将这个加载http.js全部扣下来，然后挂代理，调包，缺啥咱们补啥：
- 5、当我们补完环境之后，那么就可以本地插装，进行纯算了：
- 6、上面就是插装的内容，确实就是俩个md5进行的拼接，但是里面他会有三层的VMP是分开的
- XCX调试工具需要联系：MeteorStudio6

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/c10e0da30a954847a578df2a938fe58d.png
- 图2：https://i-blog.csdnimg.cn/direct/a0b702ded50547ea8610dc2ba79ac5bf.png（上下文：提示：该工具仅用于学习和测试哈）
- 图3：https://i-blog.csdnimg.cn/direct/d2c276d159094e478fe1de901fc1ed4b.png
- 图4：https://i-blog.csdnimg.cn/direct/310aa98b8ad94aa3adbf19e968ee93f0.png
- 图5：https://i-blog.csdnimg.cn/direct/1cf087fab94b4fed8c619e111634eecc.png
- 图6：https://i-blog.csdnimg.cn/direct/e284324d7c1c485baeb6d4f16b2a46d7.png
- 图7：https://i-blog.csdnimg.cn/direct/8659f6468bfc40e8a962afcaea0a918b.png
- 图8：https://i-blog.csdnimg.cn/direct/b5995dd3f531494aa4d13393b67aeac9.png
- 图9：https://i-blog.csdnimg.cn/direct/e92e1bf7401b4dc8b867e06676e38bc8.png
- 图10：https://i-blog.csdnimg.cn/direct/f8f5f0f904ab4b5d922c6c09eea1e916.png
- 图11：https://i-blog.csdnimg.cn/direct/9c7a96ab91454bcb95937fcf5a4beb67.png
- 图12：https://i-blog.csdnimg.cn/direct/898453f204d240e88ffbaeb9a9232897.png

## 代码/算法线索
- 片段1：

```text
const fs = require('fs'); const wasmBuffer = fs.readFileSync('./rsa_sign_bg.wasm'); const { instance } = await WebAssembly.instantiate(wasmBuffer, imports); o = instance.exports; AI写代码javascript运行1234
```
- 片段2：

```text
const fs = require('fs'); const wasmBuffer = fs.readFileSync('./rsa_sign_bg.wasm'); const { instance } = await WebAssembly.instantiate(wasmBuffer, imports); o = instance.exports;
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。