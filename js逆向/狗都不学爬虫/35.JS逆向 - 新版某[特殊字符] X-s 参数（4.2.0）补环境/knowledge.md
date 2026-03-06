# JS逆向 - 新版某[特殊字符] X-s 参数（4.2.0）补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/148299819
- 序号：35
- 标签：补环境、签名参数
- 页面信息：原创 已于 2025-07-06 13:50:50 修改 · 2.4k 阅读 · 13 · 28 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2025-05-29 10:25:11 首次发布 原创 已于 2025-07-06 13:50:50 修改 · 2.4k 阅读 · 13 · 28 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 新版某[特殊字符] X-s 参数（4.2.0）补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`X-s`、`x-s`、`params`、`md5`

## 核心链路（提纯）
1. 逆向：新版某📕 X-s 参数（4.2.0）补环境
2. 1、跟栈，找到加密位置
3. 这里可以看到c是由b加密得来的，b我们可以看出是一个网址的Api拼接了它的params,而加密方式我们可以看到有点像md5加密，32位小写字母+数组，经过验证就是md5
4. 2、往下看有，最终的结果是这样的
5. 看一下f的值，通过对f进行转字符串格式，然后经过p.lz、p.xE这俩个函数进行加密得到结果
6. 这里我们需要分析p.lz、p.xE加密就是encodeUtf8、b64Encode方法
7. 最后我们就来分析一下这个d怎么来的吧，他是通过window.mnsv2函数加密得来的
8. 一大堆混淆加if套娃式直接看懵逼，不管直接全扣准备补环境吧
9. 这里发现它就只是加载了一个方法，并没有看到我们需要的window.mnsv2方法，所以肯定是需要初始化该方法然后设置一个mnsv2方法的，所以直接找到这个方法里面，重新加载看看
10. 第二个文件初始化加载了一堆方法
11. 初始化后浏览器添加了这俩个属性
12. 提示：分析加密x-s

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：新版某📕 X-s 参数（4.2.0）补环境
- URL：aHR0cHM6Ly93d3cueGlhb2hvbmdzaHUuY29tL2V4cGxvcmU/Y2hhbm5lbF9pZD1ob21lZmVlZC5mYXNoaW9uX3Yz
- 接口：aHR0cHM6Ly9lZGl0aC54aWFvaG9uZ3NodS5jb20vYXBpL3Nucy93ZWIvdjEvaG9tZWZlZWQ=
- 这里可以看到c是由b加密得来的，b我们可以看出是一个网址的Api拼接了它的params,而加密方式我们可以看到有点像md5加密，32位小写字母+数组，经过验证就是md5
- 2、往下看有，最终的结果是这样的
- 看一下f的值，通过对f进行转字符串格式，然后经过p.lz、p.xE这俩个函数进行加密得到结果
- 这里我们需要分析p.lz、p.xE加密就是encodeUtf8、b64Encode方法
- 最后我们就来分析一下这个d怎么来的吧，他是通过window.mnsv2函数加密得来的
- 继续进入到window.mnsv2方法里面看一下
- 一大堆混淆加if套娃式直接看懵逼，不管直接全扣准备补环境吧
- 这里发现它就只是加载了一个方法，并没有看到我们需要的window.mnsv2方法，所以肯定是需要初始化该方法然后设置一个mnsv2方法的，所以直接找到这个方法里面，重新加载看看
- 第二个文件初始化加载了一堆方法
- 初始化后浏览器添加了这俩个属性
- documentElement.getAttribute检测自动化
- document.all
- getElementsByTagName(’*’)取所有TagName标签进行迭代取出再取tagName进行push
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：学习交流主页，星球持续更新中、

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/82bf420218bf427889e504ea09623081.png
- 图2：https://i-blog.csdnimg.cn/direct/248fb8e5233c4857a149fedc27b5dd5c.png
- 图3：https://i-blog.csdnimg.cn/direct/9535d686d9394ff0b9aac0ce13a2687e.png
- 图4：https://i-blog.csdnimg.cn/direct/884370943b404b188d7f5adae5632fb2.png
- 图5：https://i-blog.csdnimg.cn/direct/8ed288619ebb48e38ae94559ed7c81c6.png
- 图6：https://i-blog.csdnimg.cn/direct/8cb8e5111aa54833b03c1096fd2ee68f.png
- 图8：https://i-blog.csdnimg.cn/direct/6c9afb2fd52d43fcbc970391497fe6d3.png
- 图9：https://i-blog.csdnimg.cn/direct/53ef503159014913ae7ec33ecd35ffe5.png
- 图10：https://i-blog.csdnimg.cn/direct/1993edae8291407d904e112c3b3a979e.png
- 图11：https://i-blog.csdnimg.cn/direct/19185df5c53c459bb0d1f5666c0764da.png
- 图12：https://i-blog.csdnimg.cn/direct/2768110418f24b5d8f1d34a04564d68a.png
- 图14：https://i-blog.csdnimg.cn/direct/08711646465b47a6a16a1485e5dd9978.png（上下文：提示：完结）

## 代码/算法线索
- 片段1：

```text
"XYS_" + (0, p.xE)((0, p.lz)(JSON.stringify(f))) AI写代码javascript运行123
```
- 片段2：

```text
"XYS_" + (0, p.xE)((0, p.lz)(JSON.stringify(f)))
```
- 片段3：

```text
for (var b = [], c = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5", d = 0, f = c.length; d < f; ++d) b[d] = c[d]; function tripletToBase64(e) { return b[e >> 18 & 63] + b[e >> 12 & 63] + b[e >> 6 & 63] + b[63 & e] } function encodeChunk(e, a, r) { for (var b, c = [], d = a; d < r; d += 3) b = (e[d] << 16 & 0xff0000) + (e[d + 1] << 8 & 65280) + (255 & e[d + 2]), c.push(tripletToBase64(b)); return c.join("") } function b64Encode(e) { for (var a, r = e.lengt
```
- 片段4：

```text
for (var b = [], c = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5", d = 0, f = c.length; d < f; ++d) b[d] = c[d]; function tripletToBase64(e) { return b[e >> 18 & 63] + b[e >> 12 & 63] + b[e >> 6 & 63] + b[63 & e] } function encodeChunk(e, a, r) { for (var b, c = [], d = a; d < r; d += 3) b = (e[d] << 16 & 0xff0000) + (e[d + 1] << 8 & 65280) + (255 & e[d + 2]), c.push(tripletToBase64(b)); return c.join("") } function b64Encode(e) { for (var a, r = e.lengt
```
- 片段5：

```text
d = window.mnsv2(b, c) f = { x0: s.i8,//版本 x1: "xhs-pc-web", x2: window[s.mj] || "PC",//设备 x3: d, x4: a ? void 0 === a ? "undefined" : (0, h._)(a) : "" //(0,h._)判断类型的方法 }; AI写代码javascript运行123456789
```
- 片段6：

```text
d = window.mnsv2(b, c) f = { x0: s.i8,//版本 x1: "xhs-pc-web", x2: window[s.mj] || "PC",//设备 x3: d, x4: a ? void 0 === a ? "undefined" : (0, h._)(a) : "" //(0,h._)判断类型的方法 };
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。