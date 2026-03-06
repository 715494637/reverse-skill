# JS逆向 - 新版 QQ music逆向（sign、表单、响应加密）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/148691066
- 序号：34
- 标签：JSVMP/VMP、补环境、签名参数
- 页面信息：最新推荐文章于 2025-12-06 06:48:17 发布 原创 于 2025-06-16 15:45:44 发布 · 2.9k 阅读 · 27 · 16 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #java #前端 #网络爬虫 #爬虫 原创 于 2025-06-16 15:45:44 发布 · 2.9k 阅读 · 27 · 16 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 新版 QQ music逆向（sign、表单、响应加密）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`sign`、`_getSecuritySign`、`param`

## 核心链路（提纯）
1. 逆向：JS逆向 - 新版 QQ music逆向（sign、表单、响应加密）
2. 1、首先分析sign和表单加密是怎么来的，这里可以使用堆栈断点或者直接搜索sign:
3. 2、这里我们直接使用搜索关键字
4. 3、这里我们可以看到sign值等于c,c=P(r.data),而表单数据加密等于r.data的等于n.sent，应该是一个异步加密
5. 4、进入到P方法中我们去观察
6. 观察发现是一个vmp，那么我们就往上看它是怎么加载的，发现一个自执行，那么肯定会有导出某个加密函数
7. 继续观察，我们不难发现，这个P函数是通过上面那个自执行加载的_getSecuritySign方法去生成的
8. 5、我们可以通过扣这一部分代码来实现加密，我们放到后面一起分析，继续分析表单数据加密,L(r.data),从这里我们其实就可以看到L函数其实就是下面这个自执行方法导出来的
9. 6、那么不难发现最后我们解密arrBuffer字节数据的时候肯定是通过__cgiDecrypt函数进行解密的，所以我们直接往下去找调用N方法的地方
10. 1、这里首先将俩块代码全部复制
11. 2、创建一个js文件，复制进去
12. 3、观察G、j的值，这里直接可以重新刷新断浏览器，发现都等于window,这个时候我们可以window = globalThis，去挂个代理调用加密，观察缺不缺环境

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 新版 QQ music逆向（sign、表单、响应加密）
- URL：aHR0cHM6Ly95LnFxLmNvbS9uL3J5cXEvdG9wbGlzdC8yNw==
- 接口：aHR0cHM6Ly91Ni55LnFxLmNvbS9jZ2ktYmluL211c2ljcy5mY2c=
- 1、首先分析sign和表单加密是怎么来的，这里可以使用堆栈断点或者直接搜索sign:
- 2、这里我们直接使用搜索关键字
- 3、这里我们可以看到sign值等于c,c=P(r.data),而表单数据加密等于r.data的等于n.sent，应该是一个异步加密
- 4、进入到P方法中我们去观察
- 观察发现是一个vmp，那么我们就往上看它是怎么加载的，发现一个自执行，那么肯定会有导出某个加密函数
- 继续观察，我们不难发现，这个P函数是通过上面那个自执行加载的_getSecuritySign方法去生成的
- 5、我们可以通过扣这一部分代码来实现加密，我们放到后面一起分析，继续分析表单数据加密,L(r.data),从这里我们其实就可以看到L函数其实就是下面这个自执行方法导出来的
- 6、那么不难发现最后我们解密arrBuffer字节数据的时候肯定是通过__cgiDecrypt函数进行解密的，所以我们直接往下去找调用N方法的地方
- 1、这里首先将俩块代码全部复制
- 2、创建一个js文件，复制进去
- 3、观察G、j的值，这里直接可以重新刷新断浏览器，发现都等于window,这个时候我们可以window = globalThis，去挂个代理调用加密，观察缺不缺环境
- 4、直接运行观察，发现调用了global,但是在浏览器中是没有这个global的
- 5、注意一个点，这里我们可以看到window取了一个constructor，这个其实就是一个构造方法，在浏览器中window的构造方法其实就是Window,这里它没有过多检测所以无所谓，但我们还是补上
- 6、补到这里初始化函数其实已经加载完毕
- 7、接下来我们调用方法，观察函数缺少什么环境,定义一个data用于加密
- 这里呢我们可以看到它缺少了navigator,所以我们得补上去

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/35419f80af2946b0abf16109940eba2a.png
- 图2：https://i-blog.csdnimg.cn/direct/73b2eab95a1b4d7e8a1ecc22ee70a320.png
- 图3：https://i-blog.csdnimg.cn/direct/78e18c4a4a6049b3bc150680fe75b39e.png
- 图4：https://i-blog.csdnimg.cn/direct/4ec1e1a6e8e34d6a837b23c2ef4e3f97.png
- 图5：https://i-blog.csdnimg.cn/direct/87084d3c7c17474a8ac3fc25354909a6.png
- 图6：https://i-blog.csdnimg.cn/direct/517ff75608b84ec08572da23a4644705.png
- 图7：https://i-blog.csdnimg.cn/direct/e4712b08c86e4485a415e284a04f4032.png
- 图8：https://i-blog.csdnimg.cn/direct/4afc53b6cc644ce29e005ce4d77cdd22.png
- 图9：https://i-blog.csdnimg.cn/direct/c701213567044d7e9108df7ae0d977f3.png
- 图10：https://i-blog.csdnimg.cn/direct/d96be751090b410ea718ff4d1fd718a5.png
- 图11：https://i-blog.csdnimg.cn/direct/41c1950c55e34dfaaed6870adde1c606.png
- 图13：https://i-blog.csdnimg.cn/direct/3edc6f0096a74015875c034f6d7e4588.png

## 代码/算法线索
- 片段1：

```text
//代理 function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", t
```
- 片段2：

```text
//代理 function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { console.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { console.log("方法:", "set ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", t
```
- 片段3：

```text
window = globalThis; delete global; setProxyArr(['window', 'globalThis']); AI写代码javascript运行123
```
- 片段4：

```text
window = globalThis; delete global; setProxyArr(['window', 'globalThis']);
```
- 片段5：

```text
Window = function Window() { }; window = globalThis; window.__proto__ = Window.prototype; delete global; setProxyArr(['window', 'globalThis']); AI写代码javascript运行12345
```
- 片段6：

```text
Window = function Window() { }; window = globalThis; window.__proto__ = Window.prototype; delete global; setProxyArr(['window', 'globalThis']);
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。