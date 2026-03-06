# JS逆向 - 某程 w-payload-source 纯算、补环境分析

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/156267650
- 序号：4
- 标签：补环境、签名参数、指纹
- 页面信息：原创 于 2025-12-25 13:45:11 发布 · 1.9k 阅读 · 31 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #wasm #python #网络爬虫 #爬虫 原创 于 2025-12-25 13:45:11 发布 · 1.9k 阅读 · 31 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 某程 w-payload-source 纯算、补环境分析」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`header`、`w-payload-source`、`aHR0cHM6Ly9mbGlnaHRzLmN0cmlwLmNvbS9vbmxpbmUvbGlzdC9vbmV3YXktc2hhLWJqcz9fPTEmZGVwZGF0ZT0yMDI1LTEyLTI2JmNhYmluPVlfU19DX0Y`、`c_sign`、`md5`、`c-sign`、`callPhantom`、`_phantom`、`phantom`、`getParameter`、`MD5`、`pxZ9ApPmFtj9fpToE0d4uJH7vOuCkVFJcuEB9Xm0pXbDt8U8qlKyDxhCD0pSgSXDN`、`salt_`、`payload_source`

## 核心链路（提纯）
1. 逆向：某程 header请求头参数 w-payload-source 纯算、补环境分析
2. 1、搜索关键词：w-payload-source
3. 2、window.c_sign.toString(i) 下断点，可以看到i其实就是表单进行md5加密,继续进入c_sign.toString函数
4. 3、这里我们发现加密的函数是在window下面，而且这个函数是在一个单独的文件里面：c-sign.js
5. 1、补环境：将c-sign.js文件代码全部复制出来，缺啥补啥
6. 2、纯算分析
7. 所以我们只需要观察j里面的字符串从哪里来的：**直接找j.push(**断点即可
8. 这里可以看到，第一，二个就是F和K,直接搜索F =
9. 这里可以发现Rt加密出来也是32位，有可能是md5，经过校验发现是魔改的MD5，所以直接扣下面，然后再去分析魔改点
10. 继续搜索I = ，var I = Ct.UdHwk(mt);也就是mt函数在干嘛
11. 也是很久没有更新教学文章了，这次就更新一波纯算和补环境
12. 提示：加密位置分析流程

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：某程 header请求头参数 w-payload-source 纯算、补环境分析
- URL：aHR0cHM6Ly9mbGlnaHRzLmN0cmlwLmNvbS9vbmxpbmUvbGlzdC9vbmV3YXktc2hhLWJqcz9fPTEmZGVwZGF0ZT0yMDI1LTEyLTI2JmNhYmluPVlfU19DX0Y=
- 1、搜索关键词：w-payload-source
- 2、window.c_sign.toString(i) 下断点，可以看到i其实就是表单进行md5加密,继续进入c_sign.toString函数
- 3、这里我们发现加密的函数是在window下面，而且这个函数是在一个单独的文件里面：c-sign.js
- 1、补环境：将c-sign.js文件代码全部复制出来，缺啥补啥
- 最后直接调用window.c_sign.toString(i)
- 可以发现最后的值是在Bt函数里面生成
- 进入到Bt函数发现是一个switch平坦流，无所谓，咱们直接找到return返回结果的地方（有能力的可以还原一下js）
- 这里我们发现y就是最后的结果，只是拼接了一下102! ,那么我们就可以往后反推，这里我就不一步一步去反推了，直接告诉你们，其实有一个环境数组：j
- 所以我们只需要观察j里面的字符串从哪里来的：**直接找j.push(**断点即可
- 首先我们观察第一个怎么来：
- 这里可以看到，第一，二个就是F和K,直接搜索F =
- 可以发现F就是随机生成的8位字符串,而k等于 Rt(body的MD5+‘-’+F,31)
- 这里可以发现Rt加密出来也是32位，有可能是md5，经过校验发现是魔改的MD5，所以直接扣下面，然后再去分析魔改点
- 继续搜索I = ，var I = Ct.UdHwk(mt);也就是mt函数在干嘛
- 这里我们可以看到检测了一堆浏览器指纹，所以这个值我们可以写死
- 后面的我就不一一带着去找了，说一下怎么来的
- 得到这个数组之后会干嘛呢，猜一猜肯定是会去传charCodeAt，这里你们单独往下跟就可以看到

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/e65a02b6b2aa49a8ac5086bfe23bade4.png
- 图2：https://i-blog.csdnimg.cn/direct/8f7294af73d0437fbd73328584ce76d4.png
- 图3：https://i-blog.csdnimg.cn/direct/c061397b75a4414da6088aa0b335dda5.png
- 图4：https://i-blog.csdnimg.cn/direct/8158a6b0603240a392a52988d25be19a.png
- 图8：https://i-blog.csdnimg.cn/direct/a61dc516fa5844d9a6b5ac1ffa112da3.png
- 图9：https://i-blog.csdnimg.cn/direct/b02268bf20594c6d94266f620a5277ab.png（上下文：可以发现最后的值是在Bt函数里面生成）
- 图10：https://i-blog.csdnimg.cn/direct/fc280bbe1e8146ca8ffdd2a5ff7b1e08.png（上下文：进入到Bt函数发现是一个switch平坦流，无所谓，咱们直接找到return返回结果的地方（有能力的可以还原一下js））
- 图11：https://i-blog.csdnimg.cn/direct/8a862205984a4c8db99f1b3e3fda817a.png（上下文：这里我们发现y就是最后的结果，只是拼接了一下102! ,那么我们就可以往后反推，这里我就不一步一步去反推了，直接告诉你们，其实有一个环境数组：j）
- 图12：https://i-blog.csdnimg.cn/direct/0ba8b627f78e45f0b107895987ebffbf.png（上下文：所以我们只需要观察j里面的字符串从哪里来的：**直接找j.push(**断点即可）
- 图13：https://i-blog.csdnimg.cn/direct/73f3f75389aa478293ed41912fc17a40.png（上下文：首先我们观察第一个怎么来：）
- 图14：https://i-blog.csdnimg.cn/direct/33442f84d2cd41a3a28f7ec4ff826f6a.png
- 图15：https://i-blog.csdnimg.cn/direct/a83225b770e241668672852d09cc53a0.png

## 代码/算法线索
- 片段1：

```text
AsObj = { print: console.log, // print:function (){} } no_print = ['Boolean', 'String', 'parseFloat', 'Array', 'Object']; function watch(object, WatchName) { const handler = { get(target, property, receiver) { if ( property !== 'isNaN' && property !== 'encodeURI' && property !== "Uint8Array" && property !== 'undefined' && property !== 'JSON' && property !== 'Number' && !no_print.includes(property) && property !== Symbol.for('nodejs.util.inspect.custom') && typeof property !==
```
- 片段2：

```text
AsObj = { print: console.log, // print:function (){} } no_print = ['Boolean', 'String', 'parseFloat', 'Array', 'Object']; function watch(object, WatchName) { const handler = { get(target, property, receiver) { if ( property !== 'isNaN' && property !== 'encodeURI' && property !== "Uint8Array" && property !== 'undefined' && property !== 'JSON' && property !== 'Number' && !no_print.includes(property) && property !== Symbol.for('nodejs.util.inspect.custom') && typeof property !==
```
- 片段3：

```text
// bom dom 属性 in操作 代理对象: window 方法: has 检查属性: callPhantom 代理对象: Window.prototype 方法: has 检查属性: callPhantom 代理对象: window 方法: has 检查属性: _phantom 代理对象: Window.prototype 方法: has 检查属性: _phantom 代理对象: window 方法: has 检查属性: phantom 代理对象: Window.prototype 方法: has 检查属性: phantom 代理对象: navigator 方法: has 检查属性: mimeTypes 代理对象: Navigator.prototype 方法: has 检查属性: mimeTypes 代理对象: navigator 方法: has 检查属性: __lookupGetter__ 代理对象: Navigator.prototype 方法: has 检查属性: __lookupGetter__ 代理对象: navigator 方
```
- 片段4：

```text
// bom dom 属性 in操作 代理对象: window 方法: has 检查属性: callPhantom 代理对象: Window.prototype 方法: has 检查属性: callPhantom 代理对象: window 方法: has 检查属性: _phantom 代理对象: Window.prototype 方法: has 检查属性: _phantom 代理对象: window 方法: has 检查属性: phantom 代理对象: Window.prototype 方法: has 检查属性: phantom 代理对象: navigator 方法: has 检查属性: mimeTypes 代理对象: Navigator.prototype 方法: has 检查属性: mimeTypes 代理对象: navigator 方法: has 检查属性: __lookupGetter__ 代理对象: Navigator.prototype 方法: has 检查属性: __lookupGetter__ 代理对象: navigator 方
```
- 片段5：

```text
// 原型函数 代理对象: HTMLElement.prototype 方法: has 检查属性: offsetHeight 方法: get 对象: HTMLCanvasElement.prototype 属性: toDataURL 属性类型: string 属性值: [Function: toDataURL] 属性值类型: function 方法: get 对象: CanvasRenderingContext2D.prototype 属性: getImageData 属性类型: string 属性值: [Function: getImageData] 属性值类型: function 方法: get 对象: CanvasRenderingContext2D.prototype 属性: toBlob 属性类型: string 属性值: [Function: toBlob] 属性值类型: function 方法: get 对象: WebGLRenderingContext.prototype 属性: bufferData 属性类型: string 属
```
- 片段6：

```text
// 原型函数 代理对象: HTMLElement.prototype 方法: has 检查属性: offsetHeight 方法: get 对象: HTMLCanvasElement.prototype 属性: toDataURL 属性类型: string 属性值: [Function: toDataURL] 属性值类型: function 方法: get 对象: CanvasRenderingContext2D.prototype 属性: getImageData 属性类型: string 属性值: [Function: getImageData] 属性值类型: function 方法: get 对象: CanvasRenderingContext2D.prototype 属性: toBlob 属性类型: string 属性值: [Function: toBlob] 属性值类型: function 方法: get 对象: WebGLRenderingContext.prototype 属性: bufferData 属性类型: string 属
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。