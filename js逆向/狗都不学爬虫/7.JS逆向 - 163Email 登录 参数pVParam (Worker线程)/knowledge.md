# JS逆向 - 163Email 登录 参数pVParam (Worker线程)

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/154402258
- 序号：7
- 标签：Worker
- 页面信息：最新推荐文章于 2026-03-04 22:44:41 发布 原创 于 2025-11-04 17:53:23 发布 · 1.2k 阅读 · 28 · 6 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #网络爬虫 #爬虫 #python 原创 于 2025-11-04 17:53:23 发布 · 1.2k 阅读 · 28 · 6 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 163Email 登录 参数pVParam (Worker线程)」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`pVParam`、`encParams`、`encparams`

## 核心链路（提纯）
1. 逆向：JS逆向 - 163Email 登录 参数pVParam (Worker线程)
2. 1、首先它是登录接口gt里面的：存在于encParams表单的明文，注意是加密之前的明文数据
3. 这里直接搜索encparams
4. 2、分析pVParam是怎么来的：
5. 这里说一下，观察发包情况我们可以知道：puzzle是接口返回的
6. 3、继续回到刚刚那个地方，pVParam怎么来的，直接搜索看一下：
7. 4、你会发现有4处地方都用到了，但是它们的赋值都是一样的：e.pVParam = this.__powerData，所以这里，我们直接搜索一下 __powerData 是谁给的
8. 5、你会发现有三处这个，都断上点：清楚缓存，重新刷新页面，然后输入账号观察断点情况
9. 6、可以看到，__powerData的值有了，我们再往上跟三步栈：到onmessage这里
10. 1、关于什么是Worker，就不多说了，自己网上百度，说一说我的理解
11. 我可以这样理解：onmessage是接收消息的：当我们需要在worker临时js文件里面加密时，我可以传递一些明文对象
12. postMessage是发送：当明文加密完成后，我可以通过这个属性把密文给拿到

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：JS逆向 - 163Email 登录 参数pVParam (Worker线程)
- URL：aHR0cHM6Ly9tYWlsLjE2My5jb20v
- 1、首先它是登录接口gt里面的：存在于encParams表单的明文，注意是加密之前的明文数据
- 这里直接搜索encparams
- 2、分析pVParam是怎么来的：
- 这里说一下，观察发包情况我们可以知道：puzzle是接口返回的
- powGetP接口会返回：
- 后面肯定会用到这个，先留意
- 3、继续回到刚刚那个地方，pVParam怎么来的，直接搜索看一下：
- 4、你会发现有4处地方都用到了，但是它们的赋值都是一样的：e.pVParam = this.__powerData，所以这里，我们直接搜索一下 __powerData 是谁给的
- 5、你会发现有三处这个，都断上点：清楚缓存，重新刷新页面，然后输入账号观察断点情况
- 6、可以看到，__powerData的值有了，我们再往上跟三步栈：到onmessage这里
- 1、关于什么是Worker，就不多说了，自己网上百度，说一说我的理解
- worker相当于一个临时线程，在js中就是一个对象，它可以实例化，当实例化时，会传入一个Blob对象，这个对象相当于一个临时js的url，里面会生成临时的js，当线程结束后会关闭
- 实列的worker对象里面会有俩个属性：postMessage和onmessage
- 我可以这样理解：onmessage是接收消息的：当我们需要在worker临时js文件里面加密时，我可以传递一些明文对象
- postMessage是发送：当明文加密完成后，我可以通过这个属性把密文给拿到
- 那么它是怎么触发的呢？事件对象，通过message事件传递触发
- 2、了解了这个之后，就好弄了，我们直接去断一下new Worker的地方，先进入这个临时文件

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/134e14adacb443f0b2c8143d1c1ff832.png
- 图2：https://i-blog.csdnimg.cn/direct/1fac243a92d647b194b3b3e56726c234.png
- 图4：https://i-blog.csdnimg.cn/direct/224949dfe0384e118e999c258bd4d9f0.png
- 图5：https://i-blog.csdnimg.cn/direct/777fc0b0f757444398ed81134a0d8020.png
- 图6：https://i-blog.csdnimg.cn/direct/17dbef27bae641b9baf794a7ab7de982.png
- 图7：https://i-blog.csdnimg.cn/direct/a31ebd84044648ee877f11ebb38a05c6.png
- 图8：https://i-blog.csdnimg.cn/direct/1a8dbbb0268a4aeb89b1bec17efa4e4e.png
- 图9：https://i-blog.csdnimg.cn/direct/35ad1f5460254774a8545aa12488e92d.png
- 图10：https://i-blog.csdnimg.cn/direct/3c776e00086c404c8356ec54ecbfa92e.png
- 图11：https://i-blog.csdnimg.cn/direct/78a377a985024e11a524a55aaf369363.png
- 图12：https://i-blog.csdnimg.cn/direct/abaddf1d5fc54a10ad2c1e30e3677bbb.png
- 图13：https://i-blog.csdnimg.cn/direct/b88e9f25c94d45688194ec450c3e79eb.png

## 代码/算法线索
- 片段1：

```text
{ "ret": "201", "pVInfo": { "needCheck": true, "sid": "3c891c58-ccaf-4348-8aed-70304dd14a8c", "hashFunc": "VDF_FUNCTION", "maxTime": 550, "minTime": 500, "args": { "mod": "b3ef6efe1b82e7c2dbca7bdac95fe6b0ef", "t": 100000, "puzzle": "Yg2SisUbVqdze/D+Arw96fCwMlGfI4pYAxc8pvCT0uAC+ial5QbXvvRw17rvLeJdynB9xgYu5bgR\r\nF7WogX9uKur/XQJo35V/BZrFnqZEXmTFoG24Ry9GsIaGLEk2vxNCcGtcVPVUPl/OdXI+0616ty5c\r\n0uW59pMttMxZfctIKnJ3cLgedTMkcDQ/LkfVE+0RaNauRKQ9v3daFfH5XRQWe5rkTRfEmAzaRLSv\r\nkflEuuF
```
- 片段2：

```text
{ "ret": "201", "pVInfo": { "needCheck": true, "sid": "3c891c58-ccaf-4348-8aed-70304dd14a8c", "hashFunc": "VDF_FUNCTION", "maxTime": 550, "minTime": 500, "args": { "mod": "b3ef6efe1b82e7c2dbca7bdac95fe6b0ef", "t": 100000, "puzzle": "Yg2SisUbVqdze/D+Arw96fCwMlGfI4pYAxc8pvCT0uAC+ial5QbXvvRw17rvLeJdynB9xgYu5bgR\r\nF7WogX9uKur/XQJo35V/BZrFnqZEXmTFoG24Ry9GsIaGLEk2vxNCcGtcVPVUPl/OdXI+0616ty5c\r\n0uW59pMttMxZfctIKnJ3cLgedTMkcDQ/LkfVE+0RaNauRKQ9v3daFfH5XRQWe5rkTRfEmAzaRLSv\r\nkflEuuF
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。