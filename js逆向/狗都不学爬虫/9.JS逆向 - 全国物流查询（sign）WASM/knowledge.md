# JS逆向 - 全国物流查询（sign）WASM

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/152789084
- 序号：9
- 标签：WASM、补环境、签名参数、指纹
- 页面信息：最新推荐文章于 2026-03-04 22:44:41 发布 原创 于 2025-10-09 12:07:51 发布 · 2k 阅读 · 15 · 9 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #wasm #爬虫 #网络爬虫 #python 原创 于 2025-10-09 12:07:51 发布 · 2k 阅读 · 15 · 9 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 全国物流查询（sign）WASM」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`sign`

## 核心链路（提纯）
1. 逆向：JS逆向 - 全国物流查询（sign）WASM
2. 1、刷新网页进入，会发现有一个无效debugger
3. 2、直接通过堆栈断点去找到加密生成的位置
4. 3、重新刷新界面，发现断住了
5. 4、从上图可以观察到，e = await this.createRequestData，C = JSON.stringify(e)，那么猜测肯定是这个createRequestData异步方法去生成了sign，直接单步进去
6. 5、这里可以看到l = await this.fingerPrinter.getFingerprint()，sign: l，如果是老手应该知道这个getFingerprint是个啥，它其实就是fp指纹加密（window的一些配置属性，navigator的属性，screen的属性，canvas标签绘图的一些属性和toDataUrl）
7. 从上图我们可以看出，肯定是Q对象进行实例化的时候，去加载了fingerPrinter对象，直接搜索
8. 其实也可以全局搜索的，发现是一个webpack
9. 这个东西就不用我多说了吧，直接扣加载器，然后用全扣自吐
10. console.log(‘error::’, n)这个是用来观察没有加载成功的键函数
11. 最后我们可以看到eval(‘debugger;’+‘datac={’+strc+‘};’)，这一步是让字符串的键值对变成对象，然后讲原来e里面的所有的键值对替换掉，减少代码量
12. fingerprintModule加载不成功的情况，是因为wasm没有加载成功

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 全国物流查询（sign）WASM
- URL：aHR0cHM6Ly90LjE3dHJhY2submV0L3poLWNuI251bXM9TFoyODU2NDYzMTRDTg==
- 1、刷新网页进入，会发现有一个无效debugger
- 2、直接通过堆栈断点去找到加密生成的位置
- 3、重新刷新界面，发现断住了
- 4、从上图可以观察到，e = await this.createRequestData，C = JSON.stringify(e)，那么猜测肯定是这个createRequestData异步方法去生成了sign，直接单步进去
- 5、这里可以看到l = await this.fingerPrinter.getFingerprint()，sign: l，如果是老手应该知道这个getFingerprint是个啥，它其实就是fp指纹加密（window的一些配置属性，navigator的属性，screen的属性，canvas标签绘图的一些属性和toDataUrl）
- 直接找fingerPrinter对象函数从哪里来的
- 从上图我们可以看出，肯定是Q对象进行实例化的时候，去加载了fingerPrinter对象，直接搜索
- constructor这个就是构造器，实例化时会执行
- 那么现在我们只需要找到这个O对象是这么来的就可以了,往上找到这个O
- 其实也可以全局搜索的，发现是一个webpack
- 这个东西就不用我多说了吧，直接扣加载器，然后用全扣自吐
- (()=>{});这个就是一个自执行方法，es6语法，不用管，全扣，e相当于一个字典，里面全部都是键值对，值是方法或者属性
- console.log(‘error::’, n)这个是用来观察没有加载成功的键函数
- 最后我们可以看到eval(‘debugger;’+‘datac={’+strc+‘};’)，这一步是让字符串的键值对变成对象，然后讲原来e里面的所有的键值对替换掉，减少代码量
- fingerprintModule加载不成功的情况，是因为wasm没有加载成功
- 正常情况下r.e(748).then(r.bind(r, 27716))里面有一层会去创建script标签，然后去加载一个新的js，生成wasm文件，然后加载起来
- 这里我直接替换掉了，r.e(748).then(r.bind(r, 27716))替换window.wang(27716)

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/7707cba5d0004f34a639dee41a793298.png
- 图2：https://i-blog.csdnimg.cn/direct/691a596b773d46658344050c076492d4.png（上下文：这个其实是wasm里面的debugger,有点恶心，格式化 检测 了，还有toString等,直接上魔改浏览器）
- 图3：https://i-blog.csdnimg.cn/direct/f943eb4bf49f44458c5026e548eb8f03.png
- 图4：https://i-blog.csdnimg.cn/direct/9541259b8df94abbab0a4d3050e2acf5.png（上下文：这里的{ trackingNums: e, fc: t, sc: n }其实就是data，直接单步跳进去）
- 图5：https://i-blog.csdnimg.cn/direct/b98a65825a20487baecccb5fcfc8f1f2.png（上下文：这里的{ trackingNums: e, fc: t, sc: n }其实就是data，直接单步跳进去）
- 图6：https://i-blog.csdnimg.cn/direct/4b4ee55e657641d3866d483e2a6f4e99.png
- 图7：https://i-blog.csdnimg.cn/direct/31806fb023964adaa345d9858c173655.png（上下文：直接找fingerPrinter对象函数从哪里来的）
- 图8：https://i-blog.csdnimg.cn/direct/446efac8bc814426ad4e666f0360ed69.png（上下文：从上图我们可以看出，肯定是Q对象进行实例化的时候，去加载了fingerPrinter对象，直接搜索）
- 图9：https://i-blog.csdnimg.cn/direct/49503f2b77e244d2b830d74e29319104.png（上下文：那么现在我们只需要找到这个O对象是这么来的就可以了,往上找到这个O）
- 图10：https://i-blog.csdnimg.cn/direct/db6f8d219fb545158434b857ff1b4392.png（上下文：其实也可以全局搜索的，发现是一个webpack）
- 图11：https://i-blog.csdnimg.cn/direct/7b16c0c466d14171b425dab030187565.png（上下文：这个东西就不用我多说了吧，直接扣加载器，然后用全扣自吐）
- 图12：https://i-blog.csdnimg.cn/direct/d6262fc0a7bb4410890ac55a02d5dcb1.png（上下文：说一下怎么导出来：）

## 代码/算法线索
- 片段1：

```text
this.fingerPrinter = new O.Up({ maxMovePoints: 0, obfuscate: L.Br }), this.fingerPrinter.initialize() 运行项目并下载源码javascript运行12345
```
- 片段2：

```text
this.fingerPrinter = new O.Up({ maxMovePoints: 0, obfuscate: L.Br }), this.fingerPrinter.initialize()
```
- 片段3：

```text
// 存放键值对的属性（就是需要加载的键值对，拼接字符串） window.strc = ''; // 存放已经加载好的键，如果不存在，那么字符串就拼接，存在就跳过 window.listc = []; 运行项目并下载源码javascript运行1234
```
- 片段4：

```text
// 存放键值对的属性（就是需要加载的键值对，拼接字符串） window.strc = ''; // 存放已经加载好的键，如果不存在，那么字符串就拼接，存在就跳过 window.listc = [];
```
- 片段5：

```text
no_print = ['window', 'globalThis','navigator','top','self','plugins','String','console','Promise']; function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { if(no_print.includes(property)){ return target[property]; } dtavm.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return ta
```
- 片段6：

```text
no_print = ['window', 'globalThis','navigator','top','self','plugins','String','console','Promise']; function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { if(no_print.includes(property)){ return target[property]; } dtavm.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return ta
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。