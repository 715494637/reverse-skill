# JS逆向 - 狗dong参数Log及joyytokem（补环境）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/148189730
- 序号：36
- 标签：补环境、Cookie、签名参数
- 页面信息：最新推荐文章于 2025-10-13 07:01:42 发布 原创 于 2025-05-24 13:35:55 发布 · 2.2k 阅读 · 14 · 29 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #java #开发语言 原创 于 2025-05-24 13:35:55 发布 · 2.2k 阅读 · 14 · 29 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 狗dong参数Log及joyytokem（补环境）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`aHR0cHM6Ly9wcm8ubS5qZC5jb20vbWFsbC9hY3RpdmUvNFhyQXpkV1lVRml4elNzRkw5V1VtMm02WWZ0Ny9pbmRleC5odG1sP2JhYmVsQ2hhbm5lbD10dHQyJnV0bV90ZXJtPUNvcHlVUkxfc2hhcmVpZDZkNzdmYmEyM2JhZjUzZjFhMGUzZjE3NzAwOGM1MDlhZmYyMWEzNjgxNzQ3ODc3OTg2NjgwNl9ub25lX25vbmUmdXRtX3VzZXI9cGx1c21lbWJlciZ1dG1fc291cmNlPWlvc2FwcCZ1dG1fY2FtcGFpZ249dF8zMzUxMzk3NzQmdXRtX21lZGl1bT1hcHBzaGFyZSZfdHM9MTc0Nzg3Nzk4MjYyOSZhZF9vZD1zaGFyZSZneGQ9Um5Bb3hUTmViMktMbXBvV19kVWhXTTNnUEQ2Vzd6UXVBTWFudDBJbGg5eDFJNWo5T3c0Sk5YTWZ3Yi1BV3pVJmd4PVJuQW9tVE0yYnpmY21aa2RxSVVqWGc2WlVaQWVrMGs`、`DOMTokenList`、`cookie`

## 核心链路（提纯）
1. 逆向：狗dong log参数及joyytokem
2. 1、这里直接观察window.smashUtils.get_risk_result，也就是，咱们加载进来之后，可以直接搜索get_risk_result，然后断点
3. 2、进行观察它怎么定义给window的,往上翻动发现是一个webpack
4. 好家伙，这些咱们只需要导出改方法定义的那个位置，重新刷新，发现它就是单个文件，而且已经自己加载好了
5. 在加密之前它还需要进行init初始化,所以得在init方法那重新刷新断点
6. 这里看一下appid怎么来的，直接全局搜索，发现是当前html返回的
7. 4、最后看一下咋加密的，点击领卷触发加密
8. 5、最终处理
9. 加密的时候会重新设置cookie，发送xhr得到cookie值joyytokem，然后该值会参与log参数的计算，所以一定得有
10. 提示：开始分析参数
11. 3、继续分析它是怎么加密的吧，观察smashUtils发现
12. 提示：补环境的检测

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：狗dong log参数及joyytokem
- URL：aHR0cHM6Ly9wcm8ubS5qZC5jb20vbWFsbC9hY3RpdmUvNFhyQXpkV1lVRml4elNzRkw5V1VtMm02WWZ0Ny9pbmRleC5odG1sP2JhYmVsQ2hhbm5lbD10dHQyJnV0bV90ZXJtPUNvcHlVUkxfc2hhcmVpZDZkNzdmYmEyM2JhZjUzZjFhMGUzZjE3NzAwOGM1MDlhZmYyMWEzNjgxNzQ3ODc3OTg2NjgwNl9ub25lX25vbmUmdXRtX3VzZXI9cGx1c21lbWJlciZ1dG1fc291cmNlPWlvc2FwcCZ1dG1fY2FtcGFpZ249dF8zMzUxMzk3NzQmdXRtX21lZGl1bT1hcHBzaGFyZSZfdHM9MTc0Nzg3Nzk4MjYyOSZhZF9vZD1zaGFyZSZneGQ9Um5Bb3hUTmViMktMbXBvV19kVWhXTTNnUEQ2Vzd6UXVBTWFudDBJbGg5eDFJNWo5T3c0Sk5YTWZ3Yi1BV3pVJmd4PVJuQW9tVE0yYnpmY21aa2RxSVVqWGc2WlVaQWVrMGs=
- 1、这里直接观察window.smashUtils.get_risk_result，也就是，咱们加载进来之后，可以直接搜索get_risk_result，然后断点
- 2、进行观察它怎么定义给window的,往上翻动发现是一个webpack
- 好家伙，这些咱们只需要导出改方法定义的那个位置，重新刷新，发现它就是单个文件，而且已经自己加载好了
- 在加密之前它还需要进行init初始化,所以得在init方法那重新刷新断点
- 这里看一下appid怎么来的，直接全局搜索，发现是当前html返回的
- 4、最后看一下咋加密的，点击领卷触发加密
- 这里我们可以看到n = 'coupon_receive’固定，r则是一个s方法生成的
- 打印可以看到r就等于window.smashUtils.getRandom(8)
- 代理-------自吐环境
- 将node中有，浏览器没有的可能会检测的删除掉
- 挂代理时一定得把window，globalThis分开挂，不然有些环境吐不出来，如：setProxyArr([‘window’,‘globalThis’]);会发现很多环境 提示：createTagProto我自己写的一个创建函数的方法
- Navigator.prototype.getBattery电脑电池管理信息
- dom检测removeEventListener、createElement（checkDevTools）、createTextNode、querySelectorAll（取标签的长度）
- process这里需要注意哈，不是没有，一般浏览器没有这个的
- 然后就是重点检测Error，懂的都懂，有俩处，会取值的
- 加密的时候会重新设置cookie，发送xhr得到cookie值joyytokem，然后该值会参与log参数的计算，所以一定得有
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/a9eef02faeb34c23927d938de3cd0616.png
- 图2：https://i-blog.csdnimg.cn/direct/c68596a378e34ad09fbbb0b8d4e08fb4.png
- 图3：https://i-blog.csdnimg.cn/direct/f985cc10b4864db0bae7788ab61e1144.png
- 图4：https://i-blog.csdnimg.cn/direct/a87d5f60123e4fd5896e9ad95ee4ce8a.png（上下文：3、继续分析它是怎么加密的吧，观察smashUtils发现）
- 图5：https://i-blog.csdnimg.cn/direct/dbc18b9b03584b4a9ae1a331d698b98e.png（上下文：3、继续分析它是怎么加密的吧，观察smashUtils发现）
- 图6：https://i-blog.csdnimg.cn/direct/902998d3b50246948147869a3e4dfa83.png（上下文：在加密之前它还需要进行init初始化,所以得在init方法那重新刷新断点）
- 图7：https://i-blog.csdnimg.cn/direct/2eaeb12d080c469bb61ee477f9fb13a2.png
- 图8：https://i-blog.csdnimg.cn/direct/64aacdd6a7ba452fa2e555e9ee28797a.png
- 图9：https://i-blog.csdnimg.cn/direct/9559525812f446cabcd099e49aadd768.png
- 图15：https://i-blog.csdnimg.cn/direct/1267732f8a7d43a789a863c4e09687d9.png（上下文：然后就是重点检测Error，懂的都懂，有俩处，会取值的）
- 图16：https://i-blog.csdnimg.cn/direct/0f8d6889974741a8a5e7ae37d5ba9e05.png（上下文：提示：结果）

## 代码/算法线索
- 片段1：

```text
window.smashUtils.init({ "appid": "xxx", "sceneid": "xxx", "uid": "" }); AI写代码javascript运行12345
```
- 片段2：

```text
window.smashUtils.init({ "appid": "xxx", "sceneid": "xxx", "uid": "" });
```
- 片段3：

```text
window.smashUtils.init({ appid: "xxx", sceneid: "xxx", uid: undefined }); randomc = window.smashUtils.getRandom(8); log_value = [window.smashUtils.get_risk_result({ id: "coupon_receive", data: { random: randomc } }), randomc] AI写代码javascript运行123456789101112
```
- 片段4：

```text
window.smashUtils.init({ appid: "xxx", sceneid: "xxx", uid: undefined }); randomc = window.smashUtils.getRandom(8); log_value = [window.smashUtils.get_risk_result({ id: "coupon_receive", data: { random: randomc } }), randomc]
```
- 片段5：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { if(property === 'window'){ return target[property]; } dtavm.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { dtavm.log("方法:", "set ", "对象:", "${pr
```
- 片段6：

```text
function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { if(property === 'window'){ return target[property]; } dtavm.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { dtavm.log("方法:", "set ", "对象:", "${pr
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。