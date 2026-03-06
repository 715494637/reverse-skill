# 某呼__zse_ck参数补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/146310812
- 序号：46
- 标签：WASM、JSVMP/VMP、补环境、签名参数
- 页面信息：原创 已于 2025-03-18 11:07:57 修改 · 2k 阅读 · 19 · 19 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #爬虫 #网络爬虫 于 2025-03-17 12:04:21 首次发布 原创 已于 2025-03-18 11:07:57 修改 · 2k 阅读 · 19 · 19 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「某呼__zse_ck参数补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`__zse_ck`、`zse_ck`

## 核心链路（提纯）
1. 逆向：某呼__zse_ck参数补环境
2. script链接加载的就是生成__zse_ck参数的js文件，全部复制下来
3. js文件：wasm+vmp,补环境时应把window…原型链全部补好
4. 去获取响应的meta中的content，然后进行加密
5. 提示：加载页面-观察流程-补充环境
6. 提示：原型链补充 1、wasm文件中检测window的原型链 2、动态更新meta和script的js文件 3、取了querySelector和getElementById

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：某呼__zse_ck参数补环境
- URL：aHR0cHM6Ly96aHVhbmxhbi56aGlodS5jb20vcC80Mjk5MzI5OTg=
- 第一次运行py发现返回403，并且响应文本中有一个meta和script链接
- script链接加载的就是生成__zse_ck参数的js文件，全部复制下来
- js文件：wasm+vmp,补环境时应把window…原型链全部补好
- 注意：console.log有检测，dtavm = {}，dtavm.log = console.log
- 删除node中没有的: require_ = require; pocess_ = process; delete global; delete require; delete process; delete __dirname; delete __filename; delete module; delete exports;
- 挂上代理，观察哪些环境需要补充：
- 发现取了刚刚响应里面的script：
- 去获取响应的meta中的content，然后进行加密
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：加载页面-观察流程-补充环境
- 提示：原型链补充 1、wasm文件中检测window的原型链 2、动态更新meta和script的js文件 3、取了querySelector和getElementById
- 提示：学习交流+v看主页

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/1c77a7faec804ab3881837e57c0f5325.png
- 图2：https://i-blog.csdnimg.cn/direct/121239d569d44c5c9067b325e1bf3e02.png（上下文：提示：加载页面-观察流程-补充环境）
- 图3：https://i-blog.csdnimg.cn/direct/c04078788e8246679b8cb96ceb30b578.png
- 图5：https://i-blog.csdnimg.cn/direct/c6e3fdeb5d7c45f389e817e89b5a98f9.png
- 图7：https://i-blog.csdnimg.cn/direct/c06084eb5f164a5ba6fd0d3b8f40893a.png
- 图8：https://i-blog.csdnimg.cn/direct/39ed8da637594172ab76ec3b8a4ec378.png
- 图9：https://i-blog.csdnimg.cn/direct/e1d13c73656f42e4a5d166b12524f19a.png

## 代码/算法线索
- 片段1：

```text
Window = function Window() {throw new TypeError("Illegal constructor");}; Object.defineProperties(globalThis, { [Symbol.toStringTag]: { value: 'Window' } }); window = globalThis; 重点：meta标签原型和script标签原型 .......其他自己补充 AI写代码javascript运行123456789
```
- 片段2：

```text
Window = function Window() {throw new TypeError("Illegal constructor");}; Object.defineProperties(globalThis, { [Symbol.toStringTag]: { value: 'Window' } }); window = globalThis; 重点：meta标签原型和script标签原型 .......其他自己补充
```
- 片段3：

```text
dtavm = {} dtavm.log = console.log function proxy(obj, objname, type) { function getMethodHandler(WatchName, target_obj) { let methodhandler = { apply(target, thisArg, argArray) { if (this.target_obj) { thisArg = this.target_obj } let result = Reflect.apply(target, thisArg, argArray) if (target.name !== "toString") { if (target.name === "addEventListener") { dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`) } else if (Watch
```
- 片段4：

```text
dtavm = {} dtavm.log = console.log function proxy(obj, objname, type) { function getMethodHandler(WatchName, target_obj) { let methodhandler = { apply(target, thisArg, argArray) { if (this.target_obj) { thisArg = this.target_obj } let result = Reflect.apply(target, thisArg, argArray) if (target.name !== "toString") { if (target.name === "addEventListener") { dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`) } else if (Watch
```
- 片段5：

```text
DOMStringMap = function DOMStringMap() { throw new TypeError("Illegal constructor"); }; dOMStringMap = { assetsTrackerConfig: '{"appName":"zse_ck","trackJSRuntimeError":true}' }; dOMStringMap.__proto__ = DOMStringMap.prototype; HTMLScriptElement = function HTMLScriptElement() { throw new TypeError("Illegal constructor"); }; setTostringAndstringTag(HTMLScriptElement, null); data_assets = { dataset: dOMStringMap }; data_assets.__proto__ = HTMLScriptElement.prototype; AI写代码javas
```
- 片段6：

```text
DOMStringMap = function DOMStringMap() { throw new TypeError("Illegal constructor"); }; dOMStringMap = { assetsTrackerConfig: '{"appName":"zse_ck","trackJSRuntimeError":true}' }; dOMStringMap.__proto__ = DOMStringMap.prototype; HTMLScriptElement = function HTMLScriptElement() { throw new TypeError("Illegal constructor"); }; setTostringAndstringTag(HTMLScriptElement, null); data_assets = { dataset: dOMStringMap }; data_assets.__proto__ = HTMLScriptElement.prototype;
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。