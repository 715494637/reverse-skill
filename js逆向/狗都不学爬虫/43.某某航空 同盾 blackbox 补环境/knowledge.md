# 某某航空 同盾 blackbox 补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/146957367
- 序号：43
- 标签：补环境、签名参数、滑块/验证码、指纹
- 页面信息：原创 已于 2025-04-02 18:00:13 修改 · 2.1k 阅读 · 8 · 20 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #前端 #开发语言 于 2025-04-02 17:58:01 首次发布 原创 已于 2025-04-02 18:00:13 修改 · 2.1k 阅读 · 8 · 20 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「某某航空 同盾 blackbox 补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`blackbox`、`token`、`_blackbox`、`fpHost`、`tokenId`

## 核心链路（提纯）
1. 逆向：某某航空 同盾 blackbox 补环境
2. 目标：blackbox参数
3. 1、登录接口：blackbox值
4. 2、通过堆栈找到该值生成的地方：
5. 4、补环境：
6. 挂代理，补环境
7. 提前加载的window属性:_fmOpt
8. 这里说一下，作者最近开了星球，主要以补环境为主，欢迎各位的加入，咱们一起学习交流~
9. 进一步搜索该值生成的地方： 3、断住该位置，重新初始化加载（刷新页面）：
10. 该接口加载返回：url:aHR0cHM6Ly9mcC50b25nZHVuLm5ldC93ZWIzXzgvcHJvZmlsZS5qc29u js：fm.js文件生成
11. 3.接口生成的地方：document.createElement会创建一个script标签，然后赋值src链接，最后得到刚刚我们看到的接口并响应得到
12. 4._1743586336088_9724这个在fm文件中已经被重写成了一个方法，最后允许该方法生成blackbox

## 关键文字线索
- 概要整体架构流程技术细节小结
- 逆向：某某航空 同盾 blackbox 补环境
- URL：aHR0cHM6Ly9wYXNzcG9ydC5qdW5leWFvYWlyLmNvbS8=
- 目标：blackbox参数
- 1、登录接口：blackbox值
- 2、通过堆栈找到该值生成的地方：
- 提前加载的window属性:_fmOpt
- 这里说一下，作者最近开了星球，主要以补环境为主，欢迎各位的加入，咱们一起学习交流~
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 进一步搜索该值生成的地方： 3、断住该位置，重新初始化加载（刷新页面）：
- 该接口加载返回：url:aHR0cHM6Ly9mcC50b25nZHVuLm5ldC93ZWIzXzgvcHJvZmlsZS5qc29u js：fm.js文件生成
- 3.接口生成的地方：document.createElement会创建一个script标签，然后赋值src链接，最后得到刚刚我们看到的接口并响应得到
- 4._1743586336088_9724这个在fm文件中已经被重写成了一个方法，最后允许该方法生成blackbox
- 5.eval执行之后在window._fmOpt.success得到我们需要的_blackbox
- 提示：学习交流+v看主页（可加知识星球）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/e1ecc0c082bb4977bdc2f1904f6d4761.png（上下文：验证码 为鸡眼3）
- 图2：https://i-blog.csdnimg.cn/direct/226cff7a76db4431a614eeb78f852586.png（上下文：进一步搜索该值生成的地方： 3、断住该位置，重新初始化加载（刷新页面）：）
- 图3：https://i-blog.csdnimg.cn/direct/579aabcc31fb41a496391c36ff8e7132.png（上下文：进一步搜索该值生成的地方： 3、断住该位置，重新初始化加载（刷新页面）：）
- 图4：https://i-blog.csdnimg.cn/direct/7d122edff0bd487084a8f1457bf353d8.png（上下文：进一步搜索该值生成的地方： 3、断住该位置，重新初始化加载（刷新页面）：）
- 图5：https://i-blog.csdnimg.cn/direct/2dd0557844a64d2c860066d773be783a.png（上下文：进一步搜索该值生成的地方： 3、断住该位置，重新初始化加载（刷新页面）：）
- 图6：https://i-blog.csdnimg.cn/direct/170e310528804b069652d20780cd6456.png（上下文：进一步搜索该值生成的地方： 3、断住该位置，重新初始化加载（刷新页面）：）
- 图11：https://i-blog.csdnimg.cn/direct/e17430a1d81d4b1ea34d08898c36aabe.png

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
window._fmOpt = { partner: 'jxhk', appName: 'jxhk_web', token: 'jxhk' + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2), fmb: true, success: function (data) { _blackbox = data }, fpHost: "https://fp.xxx.net" }; AI写代码javascript运行12345678910
```
- 片段4：

```text
window._fmOpt = { partner: 'jxhk', appName: 'jxhk_web', token: 'jxhk' + "-" + new Date().getTime() + "-" + Math.random().toString(16).substr(2), fmb: true, success: function (data) { _blackbox = data }, fpHost: "https://fp.xxx.net" };
```
- 片段5：

```text
_1743586336088_9724({ "code": "000", "result": { "tokenId": "xxx", "xxid": "xx/xxx+8nEJGtj+fM4QZmvqCvcMiy/EdGYN4=", "xdid": "xx", "bxid": "MfgjSjjxV//xx==", "c": { "factor": 0, "op": 0, "cm": 0, "vt": 604800 } }, "desc": "" }) AI写代码javascript运行12345678910111213141516
```
- 片段6：

```text
_1743586336088_9724({ "code": "000", "result": { "tokenId": "xxx", "xxid": "xx/xxx+8nEJGtj+fM4QZmvqCvcMiy/EdGYN4=", "xdid": "xx", "bxid": "MfgjSjjxV//xx==", "c": { "factor": 0, "op": 0, "cm": 0, "vt": 604800 } }, "desc": "" })
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。