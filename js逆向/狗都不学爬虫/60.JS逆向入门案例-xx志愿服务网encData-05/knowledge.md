# JS逆向入门案例-xx志愿服务网encData-05

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/141721245
- 序号：60
- 标签：JS逆向
- 页面信息：原创 已于 2025-04-08 20:50:42 修改 · 867 阅读 · 11 · 8 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript #爬虫 #scrapy #python 于 2024-08-30 18:55:02 首次发布 原创 已于 2025-04-08 20:50:42 修改 · 867 阅读 · 11 · 8 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-xx志愿服务网encData-05」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`key`、`aes`

## 核心链路（提纯）
1. 逆向：xx志愿服务网
2. 目标：表单数据中的 encData参数
3. 1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密，我们猜测一下，来验证是不是 标准 加密： 发现与上图的结果不一致，那么肯定是魔改了！ 2、这个时候我们只能进入S方法，看看里面都进行了什么操作，然后返回了对象从而调用encrypt方法的： 往上找，我们看看这个w方法在哪里： 我们发现w是一个自执行 函数 ，上面n(“EKta”)有点像webpack来调用的： 3、w方法是在webpack里面加载对象的独立空间，那么我们可以将该对象里面的所有方法和变量都可以扣下来，然后缺什么补什么： 发现A没有定义，那么我们可以重新断点进入，看看里面是什么： 我们去断点发现断不住，那么我们直接进入方法里面去断点：
4. 打印继续看看缺啥： 继续补u对象，断点跳转进去扣下来：
5. 发现缺少h对象，继续扣，断点跳转进去发现就是这三个方法：
6. 继续断点补l方法：
7. 发现缺少r对象： 断点发现r为一个数组值： 最后运行发现： 4、还有一种就是webpack的形式： 留着自己扣吧！

## 关键文字线索
- 概要整体架构流程技术细节小结
- URL：aHR0cDovL2NoaW5hdm9sdW50ZWVyLm1jYS5nb3YuY24vc2l0ZS9wcm9qZWN0
- 目标：表单数据中的 encData参数
- 这里我们发现a方法其实是一个：Object.defineProperty,直接将a()改成这个！
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系！
- 提示：分析-调试-猜想-实现-执行
- 1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密，我们猜测一下，来验证是不是 标准 加密： 发现与上图的结果不一致，那么肯定是魔改了！ 2、这个时候我们只能进入S方法，看看里面都进行了什么操作，然后返回了对象从而调用encrypt方法的： 往上找，我们看看这个w方法在哪里： 我们发现w是一个自执行 函数 ，上面n(“EKta”)有点像webpack来调用的： 3、w方法是在webpack里面加载对象的独立空间，那么我们可以将该对象里面的所有方法和变量都可以扣下来，然后缺什么补什么： 发现A没有定义，那么我们可以重新断点进入，看看里面是什么： 我们去断点发现断不住，那么我们直接进入方法里面去断点：
- 继续补g方法： 我们可以看到其实g什么都没有做，就是赋了俩个值： 继续补b方法： 我们仔细看这个p会方法该方法其实就是刚刚的A方法：
- 打印继续看看缺啥： 继续补u对象，断点跳转进去扣下来：
- 发现缺少h对象，继续扣，断点跳转进去发现就是这三个方法：
- 发现缺少r对象： 断点发现r为一个数组值： 最后运行发现： 4、还有一种就是webpack的形式： 留着自己扣吧！
- 提示：边更边扣，跟对地方
- 提示：学习交流群：v:wzwzwz0613拉进群

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/136343b761ae4b888e30e3c6dc48d8fb.png
- 图2：https://i-blog.csdnimg.cn/direct/2939d4a757704bda9cc6c59db7c69887.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图3：https://i-blog.csdnimg.cn/direct/25d90200319d4409a3dde45268261216.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图4：https://i-blog.csdnimg.cn/direct/da4b060be1014321a3beac36e2614fe0.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图5：https://i-blog.csdnimg.cn/direct/cbddc20e22b14bc5b9b90af33a169700.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图6：https://i-blog.csdnimg.cn/direct/2d3c1d9203574d5498c95c607ded4af8.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图7：https://i-blog.csdnimg.cn/direct/39a96f7e2de64e6fbce4c1f01faebb62.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图8：https://i-blog.csdnimg.cn/direct/bf76546b79d54d72bbd85aa8d543459e.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图9：https://i-blog.csdnimg.cn/direct/933b4eb4ad7c459d9227276ec384a472.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图10：https://i-blog.csdnimg.cn/direct/e897b1f8b92e4b4a95abbda4f6a7b5ff.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图11：https://i-blog.csdnimg.cn/direct/2229c3f11f694f3689ad681d71347078.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）
- 图12：https://i-blog.csdnimg.cn/direct/22e685a6524f4840b2f4ffa306149dd7.png（上下文：1、直接开始全局搜索encData: 我们用鼠标去触发第二页： 我们打印这几个参数和方法，看看都是些什么： 上图我们发现有几个关键参数：key,iv,mode,encrypt, 信息 做多了js逆向人都知道，这肯定是一个aes或者des加密）

## 代码/算法线索
- 片段1：

```text
key: "stringToArrayBufferInUtf8", value: function(e) { var t = TextEncoder; return (new t).encode(e) } AI写代码javascript运行12345
```
- 片段2：

```text
key: "stringToArrayBufferInUtf8", value: function(e) { var t = TextEncoder; return (new t).encode(e) }
```
- 片段3：

```text
var u = { encode: function(t) { return t.replace(/./g, function(t) { var n = t.charCodeAt(0); if (8364 == (r = n) || r <= 127 && r >= 0) return encodeURIComponent(t); var r, i = n.toString(16); return 4 != i.length && (i = ("000" + i).match(/....$/)[0]), e[i] || t }) }, decode: function(e) { return e.replace(/%[0-9A-F]{2}%[0-9A-F]{2}/g, function(e) { return e in t ? String.fromCharCode("0x" + t[e]) : e }).replace(/%[\w]{2}/g, function(e) { return decodeURIComponent(e) }) } } 
```
- 片段4：

```text
var u = { encode: function(t) { return t.replace(/./g, function(t) { var n = t.charCodeAt(0); if (8364 == (r = n) || r <= 127 && r >= 0) return encodeURIComponent(t); var r, i = n.toString(16); return 4 != i.length && (i = ("000" + i).match(/....$/)[0]), e[i] || t }) }, decode: function(e) { return e.replace(/%[0-9A-F]{2}%[0-9A-F]{2}/g, function(e) { return e in t ? String.fromCharCode("0x" + t[e]) : e }).replace(/%[\w]{2}/g, function(e) { return decodeURIComponent(e) }) } }
```
- 片段5：

```text
var h = { byteLength : function(e) { var t = f(e) , n = t[0] , r = t[1]; return 3 * (n + r) / 4 - r }, toByteArray : function(e) { var t, n, r = f(e), a = r[0], c = r[1], s = new o(function(e, t, n) { return 3 * (t + n) / 4 - n }(0, a, c)), l = 0, u = c > 0 ? a - 4 : a; for (n = 0; n < u; n += 4) t = i[e.charCodeAt(n)] << 18 | i[e.charCodeAt(n + 1)] << 12 | i[e.charCodeAt(n + 2)] << 6 | i[e.charCodeAt(n + 3)], s[l++] = t >> 16 & 255, s[l++] = t >> 8 & 255, s[l++] = 255 & t; 2
```
- 片段6：

```text
var h = { byteLength : function(e) { var t = f(e) , n = t[0] , r = t[1]; return 3 * (n + r) / 4 - r }, toByteArray : function(e) { var t, n, r = f(e), a = r[0], c = r[1], s = new o(function(e, t, n) { return 3 * (t + n) / 4 - n }(0, a, c)), l = 0, u = c > 0 ? a - 4 : a; for (n = 0; n < u; n += 4) t = i[e.charCodeAt(n)] << 18 | i[e.charCodeAt(n + 1)] << 12 | i[e.charCodeAt(n + 2)] << 6 | i[e.charCodeAt(n + 3)], s[l++] = t >> 16 & 255, s[l++] = t >> 8 & 255, s[l++] = 255 & t; 2
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。