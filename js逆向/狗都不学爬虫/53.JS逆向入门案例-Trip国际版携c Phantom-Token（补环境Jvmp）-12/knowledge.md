# JS逆向入门案例-Trip国际版携c Phantom-Token（补环境Jvmp）-12

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/144290351
- 序号：53
- 标签：JSVMP/VMP、补环境、Cookie、签名参数
- 页面信息：原创 已于 2025-04-08 20:51:51 修改 · 3.1k 阅读 · 30 · 26 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2024-12-06 15:02:34 首次发布 原创 已于 2025-04-08 20:51:51 修改 · 3.1k 阅读 · 30 · 26 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体 架构 流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-Trip国际版携c Phantom-Token（补环境Jvmp）-12」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`Phantom-Token`、`token`、`signature`、`guideLogin`、`MAPBOX`、`benX21sFpA`、`cookie`、`randomUUID`、`uuid`

## 核心链路（提纯）
1. 逆向：Trip国际版携c
2. 目的：参数 Phantom-Token 补环境
3. 该方法在js就拿到一个图片的base64的值，这个我们可以通过浏览器进行hook，拿到该值
4. 提示：挂代理补环境并验证参数 1、找到 参数加密 位置–搜索–断点 2、分析加密入口和明文 加密内容就是载荷 数据 （表单数据） 3、进入方法内，扣下js 发现跟携程的token如出一辙，都是这种格式的vmp 4、将vmp复制到本地，挂上代理
5. 5、接下来，缺啥补啥
6. 6、接下来我们就可以调用signature方法生成Phantom-Token参数值，直接复制o.data表单
7. 7、最后我们运行看一下
8. 8、我们发现成功了

## 关键文字线索
- 概要整体架构流程技术细节小结
- 逆向：Trip国际版携c
- URL：aHR0cHM6Ly9oay50cmlwLmNvbS9ob3RlbHM=
- 目的：参数 Phantom-Token 补环境
- 接口：aHR0cHM6Ly9oay50cmlwLmNvbS9odGxzL2dldEhvdGVsTGlzdD94LXRyYWNlSUQ9MTczMzQ0OTExMjQ3OS4wOWJlblgyMXNGcEEtMTczMzQ1MDc3OTY5OS0xMTI5Mjc1NTM0
- 缺window，我们知道浏览器的window表示全局，而node里面的全局是global和globalThis，那么我们到浏览器看看window有没有这俩个
- 我们发现有globalThis
- 我们发现缺少createElement，在js中dom进行该操作实际上就是在创建标签，所以我们要捕抓它到底创建了什么标签
- 补完这些我们发现基本环境就已经通了
- 我们也给代理上，getContext原型链上的方法，创建上下文
- 我们创建的2d对象的原型就是CanvasRenderingContext2D
- canvas对象中的setAttribute在js中就是设置属性和属性值的
- 该方法在js就拿到一个图片的base64的值，这个我们可以通过浏览器进行hook，拿到该值
- 这里我们再运行发现报错了，往上找发现CanvasRenderingContext2D去调用了prototype属性，CanvasRenderingContext2D.prototype也需要挂上代理
- 这里就出现了这个属性并没有
- 运行发现有报错了，这里其实就是检测原型的toString方法
- 然后我们发现不报错了，继续
- 好家伙居然失败了，肯定检测了啥，我们突然想到了它上面检测了原型链我方法，那么createElement是不是也被检测了
- 需要注意代理的对象不能漏
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/2562cb71de9247d48120eb48db928b86.png
- 图2：https://i-blog.csdnimg.cn/direct/204f6b1144c04b99974adc095d9e2052.png（上下文：提示：挂代理补环境并验证参数 1、找到 参数加密 位置–搜索–断点 2、分析加密入口和明文 加密内容就是载荷 数据 （表单数据） 3、进入方法内，扣下js 发现跟携程的token如出一辙，都是这种格式的vmp 4、将vmp复制到本地，挂上代）
- 图3：https://i-blog.csdnimg.cn/direct/5aaea85f9b7945bf807a94780a1eb97e.png（上下文：提示：挂代理补环境并验证参数 1、找到 参数加密 位置–搜索–断点 2、分析加密入口和明文 加密内容就是载荷 数据 （表单数据） 3、进入方法内，扣下js 发现跟携程的token如出一辙，都是这种格式的vmp 4、将vmp复制到本地，挂上代）
- 图4：https://i-blog.csdnimg.cn/direct/f6a483f7a27b4264b58152c99141be01.png（上下文：提示：挂代理补环境并验证参数 1、找到 参数加密 位置–搜索–断点 2、分析加密入口和明文 加密内容就是载荷 数据 （表单数据） 3、进入方法内，扣下js 发现跟携程的token如出一辙，都是这种格式的vmp 4、将vmp复制到本地，挂上代）
- 图5：https://i-blog.csdnimg.cn/direct/fe91a1a9d66a4cbba2e47bbac296bb47.png（上下文：提示：挂代理补环境并验证参数 1、找到 参数加密 位置–搜索–断点 2、分析加密入口和明文 加密内容就是载荷 数据 （表单数据） 3、进入方法内，扣下js 发现跟携程的token如出一辙，都是这种格式的vmp 4、将vmp复制到本地，挂上代）
- 图7：https://i-blog.csdnimg.cn/direct/4302bb6b9d7345f8b612727aa338907d.png（上下文：5、接下来，缺啥补啥）
- 图8：https://i-blog.csdnimg.cn/direct/a0c3a834f1324a11a92d2730af5128c0.png
- 图9：https://i-blog.csdnimg.cn/direct/f2a571c7bef645d2914198162b04d26a.png
- 图10：https://i-blog.csdnimg.cn/direct/7131ce4e16df46818db7056f9d9255f2.png
- 图11：https://i-blog.csdnimg.cn/direct/1a6ed3ec81ca4f56998940ea33e32289.png（上下文：6、接下来我们就可以调用signature方法生成Phantom-Token参数值，直接复制o.data表单）
- 图13：https://i-blog.csdnimg.cn/direct/2e72f7a2710f44d68f18ff8303d87e6c.png
- 图14：https://i-blog.csdnimg.cn/direct/a9a1eae2ef0847ab8f9022aae1d9937e.png

## 代码/算法线索
- 片段1：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof
```
- 片段2：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof
```
- 片段3：

```text
CanvasRenderingContext2D = function () { }; HTMLCanvasElement = function () { }; navigator = {} screen = {} document = {} setProxyArr(['window','navigator','screen','document','CanvasRenderingContext2D','HTMLCanvasElement']) 运行项目并下载源码javascript运行123456
```
- 片段4：

```text
CanvasRenderingContext2D = function () { }; HTMLCanvasElement = function () { }; navigator = {} screen = {} document = {} setProxyArr(['window','navigator','screen','document','CanvasRenderingContext2D','HTMLCanvasElement'])
```
- 片段5：

```text
document = { createElement: function (res) { console.log("创建标签:", res); } } 运行项目并下载源码javascript运行12345
```
- 片段6：

```text
document = { createElement: function (res) { console.log("创建标签:", res); } }
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。