# JS逆向 - YandexSmartCaptcha (worker线程)

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149396340
- 序号：26
- 标签：Worker、补环境、滑块/验证码、指纹
- 页面信息：原创 已于 2025-07-16 16:24:20 修改 · 1.9k 阅读 · 16 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #爬虫 #python #网络爬虫 #wasm 于 2025-07-16 16:07:25 首次发布 原创 已于 2025-07-16 16:24:20 修改 · 1.9k 阅读 · 16 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 小结

## 逆向目标
- 目标围绕「JS逆向 - YandexSmartCaptcha (worker线程)」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`maxShadowBlur`、`md5`、`calculateNonce`、`powNonce`、`nonce`

## 核心链路（提纯）
1. 逆向：JS逆向 - YandexSmartCaptcha (worker线程)
2. 1、当我们去点击框框时，会触发一个接口:check
3. 2、我们可以看到主要还是这几个参数，观察发现这几个都是base64加密的
4. 3、这里可以直接去断xhr去分析，或者直接去搜索btoa,hook的话只能hook到轨迹的加密，也就是tdata的值
5. 4、刷新网页
6. rdata生成：window.PGreed.safeGet异步生成的指纹加密，是在captchapgrd的js文件生成
7. 3、前面都是初始化的值，当我们点击的时候，会发送一个check包
8. 4、继续，会通过P.calculateNonce对象走异步，然后生成pdata
9. 我们可以直接替换一手文件，直接在刚刚那段字符串js里面插入debugger
10. 提示：分析参数生成以及worker调用

## 关键文字线索
- 逆向：JS逆向 - YandexSmartCaptcha (worker线程)
- URL：aHR0cHM6Ly9jYXB0Y2hhLWFwaS55YW5kZXgucnUvZGVtbw==
- 1、当我们去点击框框时，会触发一个接口:check
- 2、我们可以看到主要还是这几个参数，观察发现这几个都是base64加密的
- 3、这里可以直接去断xhr去分析，或者直接去搜索btoa,hook的话只能hook到轨迹的加密，也就是tdata的值
- picasso的值：这里的t其实是随机一个值pic: [Math.floor(1e3 * Math.random()), Math.floor(1e3 * Math.random())]
- 中间e.map(Z)操作魔改的md5
- rdata生成：window.PGreed.safeGet异步生成的指纹加密，是在captchapgrd的js文件生成
- 3、前面都是初始化的值，当我们点击的时候，会发送一个check包
- 4、继续，会通过P.calculateNonce对象走异步，然后生成pdata
- 这里我们可以看得，调用异步操作的时候，创建了worker，blob会创建一个临时的js文件，丢了一个很长的js进去
- 什么是worker 浏览器中的Web Worker是HTML5引入的API，用于在后台线程中执行JavaScript脚本，实现多线程操作，避免阻塞主线程,通过消息传递（postMessage/onmessage） 与主线程交换数据，避免共享内存冲突
- 怎么使用worker const Worker = require(‘worker_threads’); const parentPort = require(‘worker_threads’);
- 我们可以直接替换一手文件，直接在刚刚那段字符串js里面插入debugger
- 到这里之后我们可以发现它是一个webpack，传入的值也是上一个接口返回的，所以我们复制到nodejs进行调用即可，最后生成这个pdata
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：分析参数生成以及worker调用
- 提示：学习交流主页，星球持续更新中：链接https://t.zsxq.com/AJTw2（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/286ada534b5343e9b0b3f5b7d14c8565.png
- 图2：https://i-blog.csdnimg.cn/direct/8b78f2fa79ce4510844c8990858a01e7.png
- 图3：https://i-blog.csdnimg.cn/direct/57b9ce3403764f20a2a1e85088f13abb.png
- 图4：https://i-blog.csdnimg.cn/direct/933f91aff9514a1db7c18b78290117e5.png
- 图5：https://i-blog.csdnimg.cn/direct/0d1b48096a2540299361d9264decab56.png（上下文：picasso的值：这里的t其实是随机一个值pic: [Math.floor(1e3 * Math.random()), Math.floor(1e3 * Math.random())]）
- 图7：https://i-blog.csdnimg.cn/direct/48e2622c26be4e16a78fc251c14677de.png
- 图8：https://i-blog.csdnimg.cn/direct/e5e26580e35b4fa28dff042084eea6e3.png（上下文：rdata生成：window.PGreed.safeGet异步生成的指纹加密，是在captchapgrd的js文件生成）
- 图9：https://i-blog.csdnimg.cn/direct/5f1d079a5f57444f9e041d606c8a4411.png
- 图10：https://i-blog.csdnimg.cn/direct/043fd748aacd48a29e3ec52bb4c5737c.png
- 图11：https://i-blog.csdnimg.cn/direct/038ca064298245e7a43985dc80fc9c04.png
- 图13：https://i-blog.csdnimg.cn/direct/963c2638f27b484195f93c158c0a3e45.png
- 图14：https://i-blog.csdnimg.cn/direct/2ac61da3e4cc44b187c1c964bf2d5c6d.png

## 代码/算法线索
- 片段1：

```text
btoa_ = btoa; btoa = function(a){ let res = btoa_(a); console.log('a::',a,'res::',res) debugger; return res; } AI写代码javascript运行1234567
```
- 片段2：

```text
btoa_ = btoa; btoa = function(a){ let res = btoa_(a); console.log('a::',a,'res::',res) debugger; return res; }
```
- 片段3：

```text
[{ seed: t[0], rounds: 5, width: 300, height: 300, fontSizeFactor: 1.5, maxShadowBlur: 50 }, { seed: t[1], rounds: 10, width: 300, height: 300, fontSizeFactor: 2, maxShadowBlur: 70 }] AI写代码javascript运行123456789101112131415
```
- 片段4：

```text
[{ seed: t[0], rounds: 5, width: 300, height: 300, fontSizeFactor: 1.5, maxShadowBlur: 50 }, { seed: t[1], rounds: 10, width: 300, height: 300, fontSizeFactor: 2, maxShadowBlur: 70 }]
```
- 片段5：

```text
// 主线程 const worker = new Worker('worker.js'); worker.postMessage({ data: '任务开始' }); worker.onmessage = (e) => console.log(e.data); // worker.js self.onmessage = (e) => { const result = heavyCalculation(e.data); self.postMessage(result); }; AI写代码javascript运行12345678910
```
- 片段6：

```text
// 主线程 const worker = new Worker('worker.js'); worker.postMessage({ data: '任务开始' }); worker.onmessage = (e) => console.log(e.data); // worker.js self.onmessage = (e) => { const result = heavyCalculation(e.data); self.postMessage(result); };
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。