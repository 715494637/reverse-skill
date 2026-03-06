# 去某某航班查询 请求头 Bella（wasm）补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/147277100
- 序号：42
- 标签：WASM、补环境、签名参数、指纹
- 页面信息：最新推荐文章于 2026-03-04 10:00:05 发布 原创 于 2025-04-16 17:03:46 发布 · 1.6k 阅读 · 21 · 27 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #wasm #网络爬虫 #爬虫 原创 于 2025-04-16 17:03:46 发布 · 1.6k 阅读 · 21 · 27 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「去某某航班查询 请求头 Bella（wasm）补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`aHR0cHM6Ly9mbGlnaHQucXVuYXIuY29tL3RvdWNoL2FwaS9kb21lc3RpYy93YmRmbGlnaHRsaXN0`、`key`、`token`

## 核心链路（提纯）
1. 逆向：去某某航班查询 请求头 Bella（wasm） 补环境
2. 目标：Bella参数
3. 1、 抓包并分析加密位置，直接搜索bella
4. 找到全局加载bella的文件，全部扣下来
5. 2、 挂代理、补环境
6. 3、 环境检测点
7. dom检测：all下面的元素：all.root、all.tnav_card_order 重点是html标签的原型链检测了（没过wasm加载不了）
8. 这里说一下x程token值补环境检测点（1003版本）： canvas指纹会参与计算
9. 得和浏览器一致，不然过不了（查询详情页） 看一下纯算 接近400行

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：去某某航班查询 请求头 Bella（wasm） 补环境
- URL：aHR0cHM6Ly9mbGlnaHQucXVuYXIuY29tLw==
- 接口：aHR0cHM6Ly9mbGlnaHQucXVuYXIuY29tL3RvdWNoL2FwaS9kb21lc3RpYy93YmRmbGlnaHRsaXN0
- 1、 抓包并分析加密位置，直接搜索bella
- 找到全局加载bella的文件，全部扣下来
- 函数保护toString
- 去掉浏览器没有，nodejs有的元素
- document.all检测
- bom检测，window/document/location/navigator等，如：crypto
- dom检测：all下面的元素：all.root、all.tnav_card_order 重点是html标签的原型链检测了（没过wasm加载不了）
- 这里说一下x程token值补环境检测点（1003版本）： canvas指纹会参与计算
- 得和浏览器一致，不然过不了（查询详情页） 看一下纯算 接近400行
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：这里可以添加技术整体架构
- 例如： 在语言模型中，编码器和解码器都是由一个个的 Transformer 组件拼接在一起形成的。
- 提示：学习交流群+v看主页（可+知识星球交流学习）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/8b05ac6237bb44ad8dd1fa21e9419dcb.png
- 图2：https://i-blog.csdnimg.cn/direct/4feae1099c7b43b99a8af7e5497c5fb0.png
- 图3：https://i-blog.csdnimg.cn/direct/9ca918e01c3a4420bdb7d53e888fa6b6.png
- 图4：https://i-blog.csdnimg.cn/direct/08de4df9de1842bd86366cdbf067d6a2.png
- 图5：https://i-blog.csdnimg.cn/direct/9874edc9c97248e799f8e28067c45a60.png
- 图10：https://i-blog.csdnimg.cn/direct/fd1cdb9e95da4e849a57679664a9bb49.png（上下文：window属性：）
- 图11：https://i-blog.csdnimg.cn/direct/00c5048bd9c9467aa71d1a79d09ee513.png（上下文：-）
- 图12：https://i-blog.csdnimg.cn/direct/1f792b5bdedf4236bfbf69c593da4ad4.png
- 图13：https://i-blog.csdnimg.cn/direct/389322cfb598452084531c681315ec8b.png
- 图14：https://i-blog.csdnimg.cn/direct/29202267e52c4fa8a9139e7498dfe15e.png
- 图15：https://i-blog.csdnimg.cn/direct/6a4f38671e064a18880c22a908562242.png
- 图16：https://i-blog.csdnimg.cn/direct/0e4a19fb95434c1ba573eef02b10abb0.png

## 代码/算法线索
- 片段1：

```text
dtavm = {} dtavm.log = console.log function proxy(obj, objname, type) { function getMethodHandler(WatchName, target_obj) { let methodhandler = { apply(target, thisArg, argArray) { if (this.target_obj) { thisArg = this.target_obj } let result = Reflect.apply(target, thisArg, argArray) if (target.name !== "toString") { if (target.name === "addEventListener") { dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`) } else if (Watch
```
- 片段2：

```text
dtavm = {} dtavm.log = console.log function proxy(obj, objname, type) { function getMethodHandler(WatchName, target_obj) { let methodhandler = { apply(target, thisArg, argArray) { if (this.target_obj) { thisArg = this.target_obj } let result = Reflect.apply(target, thisArg, argArray) if (target.name !== "toString") { if (target.name === "addEventListener") { dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`) } else if (Watch
```
- 片段3：

```text
!(function () { "use strict"; const $toString = Function.toString; const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36))); const mytoString = function () { return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this); }; function set_native(func, key, value) { Object.defineProperty(func, key, { "enumerable": false, "configurable": true, "writable": true, "value": value }) }; delete Function.prototype[
```
- 片段4：

```text
!(function () { "use strict"; const $toString = Function.toString; const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36))); const mytoString = function () { return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this); }; function set_native(func, key, value) { Object.defineProperty(func, key, { "enumerable": false, "configurable": true, "writable": true, "value": value }) }; delete Function.prototype[
```
- 片段5：

```text
require_ = require; process_ = process; delete process; delete require; delete module; delete exports; delete __filename; delete __dirname; delete clearImmediate; delete setImmediate; AI写代码javascript运行12345678910
```
- 片段6：

```text
require_ = require; process_ = process; delete process; delete require; delete module; delete exports; delete __filename; delete __dirname; delete clearImmediate; delete setImmediate;
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。