# JS逆向 - 盼之（decode__1174、sign）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/150772182
- 序号：17
- 标签：补环境、签名参数
- 页面信息：原创 已于 2025-08-28 14:27:50 修改 · 3k 阅读 · 17 · 23 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #网络爬虫 #python #wasm #爬虫 于 2025-08-25 17:11:22 首次发布 原创 已于 2025-08-28 14:27:50 修改 · 3k 阅读 · 17 · 23 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 盼之（decode__1174、sign）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`sign`、`get_header`、`MD5`、`strMd5`、`URLSearchParams`、`_waf_bd8ce2ce37`、`_waf_hook`、`md5`、`_waf_a86dfdc5f2`

## 核心链路（提纯）
1. 逆向：JS逆向 - 盼之（decode__1174、sign）
2. 点击下一页发送POST请求
3. 1、请求载荷：
4. 2、请求头：
5. 3、分析请求头加密位置：全局搜索
6. 1、堆栈断点,点击下一页触发断点：
7. 2、观察参数是否生成：
8. 3、往上跟一个栈，发现发送了一个send，那么可能是重写了xhr的send方法，然后通过一个对象去接收new URLSearchParams拿到href，去拼接的decode__1174
9. 4、单步进去send方法，继续观察什么时候生成的
10. 5、到这里我们可以看到，赋值了一个新对象，里面有H，猜测可能会对它进行拼接，继续往下跟栈
11. 6、当我们一步一步跟栈下面，发现运行Ri这个函数，发现页面刷新了，xhr的值也拼接了，那么decode__1174肯定是这个函数生成的，进入Ri函数分析
12. 7、刚进入就判断了window下面有没有该属性：_waf_bd8ce2ce37

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 盼之（decode__1174、sign）
- URL：aHR0cHM6Ly93d3cucHpkcy5jb20vZ29vZHNMaXN0LzgvNg==
- 点击下一页发送POST请求
- 魔改浏览器网上自己找下，或者私我！！！
- 3、分析请求头加密位置：全局搜索
- 1、堆栈断点,点击下一页触发断点：
- 3、往上跟一个栈，发现发送了一个send，那么可能是重写了xhr的send方法，然后通过一个对象去接收new URLSearchParams拿到href，去拼接的decode__1174
- 4、单步进去send方法，继续观察什么时候生成的
- 5、到这里我们可以看到，赋值了一个新对象，里面有H，猜测可能会对它进行拼接，继续往下跟栈
- 6、当我们一步一步跟栈下面，发现运行Ri这个函数，发现页面刷新了，xhr的值也拼接了，那么decode__1174肯定是这个函数生成的，进入Ri函数分析
- 7、刚进入就判断了window下面有没有该属性：_waf_bd8ce2ce37
- 其实这个值就是当我第一次请求，或者请求失败时返回的HTML里面的script
- 8、继续往下走，会发现去判断了xhr里面是否存在某些属性：
- 9、当我们运行完R[ZC(M5.d)](XY, Xg[0x17 * -0x151 + -0x12af + 0x2d12 + ME], Xi[ZC(M5.n)], Xg[-0x1955 + 0x268f + -0xd3a], 0x1 * -0x12eb + -0x43 * -0x2f + 0x3 * 0x235),Xj里面就拼接了decode__1174
- 10、到这里我们可以知道，decode_1174肯定时XY函数生成，跟进去，里面一大堆的switch，这里我就不一步一步讲了，直接说位置
- 11、到这里你会发现值生成了，'28178cb220-'的值是固定的，那么最后只需要还原R[ZJ(M4.X6)](J, Xb)是怎么来的就行了
- 12、Xb是加密的明文，首页得知道它怎么来的，往上跟就是case 3的时候生成的
- R[ZJ(M4.v)](XX, Xb)：Xb ---- Xm、Xh进行md5再通过计算拼接得到，而Xm、Xh是通过_waf_bd8ce2ce37、请求方式、api、data…拼接的encodeURIComponent
- RZJ(M4.p)：这个值，确实是Math.random没重写之前的方法进行操作一个数组，然后操作0和1得到的一个数，直接扣就行

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/d4d8ffb0e4f645b0b4c1a33aa42b379b.png
- 图2：https://i-blog.csdnimg.cn/direct/065ebbb4030748e9a434690acc907c5b.png
- 图3：https://i-blog.csdnimg.cn/direct/cb9425a539054b53a9d2daf443de0aa8.png
- 图4：https://i-blog.csdnimg.cn/direct/c40d29014eb347fcbe76ea39e2d8a7a0.png
- 图5：https://i-blog.csdnimg.cn/direct/2efc9360e991480fba3d38b38ecafef0.png
- 图7：https://i-blog.csdnimg.cn/direct/5f9d16bd1d4e44adabc93963ea065cf1.png
- 图8：https://i-blog.csdnimg.cn/direct/5c953698497a42479b4ebfd9f16d0a4c.png
- 图9：https://i-blog.csdnimg.cn/direct/7af15267b04f43638017f6bced8ecbd1.png
- 图10：https://i-blog.csdnimg.cn/direct/ce5fb7907ace4aa7a3d79d699c47d789.png
- 图11：https://i-blog.csdnimg.cn/direct/b12151df4db04d9fa05cdfe686400c43.png
- 图12：https://i-blog.csdnimg.cn/direct/eb80b1672dcf4730bb9e22aa026a1df0.png
- 图13：https://i-blog.csdnimg.cn/direct/e7195a22a00a47368e3672ce7c5ce048.png

## 代码/算法线索
- 片段1：

```text
const CryptoJS = require('crypto-js'); function get_header(o) { I = Date.now(); for (a = I, "", s = "", f = new Array(1,2,3,4,5,6,7,8,9), l = 0; l < 6; l++) d = Math.floor(9 * Math.random()), s += f[d]; if (c = Number(s), p = [], 'post') p.push("PZTimestamp=" + a + "&Random=" + c + "&2147483647=" + encodeURIComponent(JSON.stringify(o))) E = p.join("&") + "&accessKey=3qXyB7uf",O = void 0,O = E.replace(/[(]/g, "%28"), E = O = (O = (O = (O = (O = O.replace(/[)]/g, "%29")).replac
```
- 片段2：

```text
const CryptoJS = require('crypto-js'); function get_header(o) { I = Date.now(); for (a = I, "", s = "", f = new Array(1,2,3,4,5,6,7,8,9), l = 0; l < 6; l++) d = Math.floor(9 * Math.random()), s += f[d]; if (c = Number(s), p = [], 'post') p.push("PZTimestamp=" + a + "&Random=" + c + "&2147483647=" + encodeURIComponent(JSON.stringify(o))) E = p.join("&") + "&accessKey=3qXyB7uf",O = void 0,O = E.replace(/[(]/g, "%28"), E = O = (O = (O = (O = (O = O.replace(/[)]/g, "%29")).replac
```
- 片段3：

```text
明文：[R[ZJ(M4.v)](XX, Xb), R[ZJ(M4.F)](XX, XQ), R[ZJ(M4.p)](X0), R[ZJ(M4.e)](new M['E'][(ZJ(M4.k))]()[ZJ(M4.G)](), ''), XV[ZJ(M4.J) + ZJ(M4.d)], XV[ZJ(M4.n) + ZJ(M4.S)], R[ZJ(M4.c)](f)] 运行项目并下载源码javascript运行1
```
- 片段4：

```text
明文：[R[ZJ(M4.v)](XX, Xb), R[ZJ(M4.F)](XX, XQ), R[ZJ(M4.p)](X0), R[ZJ(M4.e)](new M['E'][(ZJ(M4.k))]()[ZJ(M4.G)](), ''), XV[ZJ(M4.J) + ZJ(M4.d)], XV[ZJ(M4.n) + ZJ(M4.S)], R[ZJ(M4.c)](f)]
```
- 片段5：

```text
// 固定0.6398672226746067 func_chufa = function (a,b) { return a / b; } func_yushu = function (a,b) { return a % b; } func_jiafa = function (a,b) { return a + b; } func_chengfa = function (a,b) { return a * b; } function set_random(Xi) { var XM = {}; XM["qTmGq"] = "function random() { [native code] }"; var Xg = XM; F = -0x139d5b97 + -0xed0f55d + 0x5fd2a01a; // Error检测 var XR = 1436544; var Xy = -0x17603115 + -0xf38cfa0f + -0x6e99ab * -0x412 + 997 , XA = function () { return fun
```
- 片段6：

```text
// 固定0.6398672226746067 func_chufa = function (a,b) { return a / b; } func_yushu = function (a,b) { return a % b; } func_jiafa = function (a,b) { return a + b; } func_chengfa = function (a,b) { return a * b; } function set_random(Xi) { var XM = {}; XM["qTmGq"] = "function random() { [native code] }"; var Xg = XM; F = -0x139d5b97 + -0xed0f55d + 0x5fd2a01a; // Error检测 var XR = 1436544; var Xy = -0x17603115 + -0xf38cfa0f + -0x6e99ab * -0x412 + 997 , XA = function () { return fun
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。