# JS逆向 - 滴滴（dd03、dd05）WSGSIG

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149500911
- 序号：24
- 标签：JSVMP/VMP、补环境、签名参数
- 页面信息：原创 已于 2025-07-21 12:28:22 修改 · 3.4k 阅读 · 17 · 13 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #爬虫 #网络爬虫 #python #wasm #javascript 于 2025-07-21 12:15:45 首次发布 原创 已于 2025-07-21 12:28:22 修改 · 3.4k 阅读 · 17 · 13 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 滴滴（dd03、dd05）WSGSIG」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`getSign`、`md5`、`MD5`、`sign`、`signUpgrade`、`x-www-form-urlencoded`、`wsgsign`、`signinit`、`Sign`、`key`、`DOMTokenList`

## 核心链路（提纯）
1. 逆向：JS逆向 - 滴滴（dd03、dd05）WSGSIG
2. 一、dd03、关键字搜索或者堆栈断点都可以
3. 搜索wsgsig
4. 观察发现加密函数是一个s.getSign
5. 单步进入发现是一个l()方法加密
6. 二、dd05、一样的关键词搜索或者堆栈断点
7. 搜索wsgsig断点
8. 发现它是通过Object(it[‘a’])函数加密的，i是一个表单参数、r是表示sign值是否更新
9. 到这里，我们就得去重新去刷新网页了，让浏览器去加载到这个地方
10. 进入到，a函数里面，发现导出加载函数是i函数
11. 然后执行window.导出(‘4bf1’),注意导出的时候不只是导出了这一个对象，因为他里面会去加载其他的对象，所以还得去拿其他的对象，不然会报错e[r].call这个加载不起来
12. 我这里直接就使用自吐了，把4bf1加载的对象全部收集起来，大概有个600多的对象函数

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：JS逆向 - 滴滴（dd03、dd05）WSGSIG
- URL(dd03): aHR0cHM6Ly9wYWdlLnVkYWNoZS5jb20vdXQtd2VieC91dC1yZWNoYXJnZS1waG9uZS9vdGhlcnMuaHRtbD9mdXNpb25fZW5hYmxlX29mZl9tb2RlPTEmaGlkZU5hdmlnYXRpb249MiZ4ZW52PWg1JmNmdD1jYXImY3N0PSZkY2huPWRkV3Bqa3gmb3BlbmlkPXVuZGVmaW5lZCZjaXR5SWQ9MCZsYXQ9MCZsbmc9MCZlbnRyYW5jZV9jaGFubmVsPTcyMjc4ODA1Mzcmd2VieF9jbHVzdGVyX2lkPTQzNiZ4X2FjdF9rZXk9dXQtcmVjaGFyZ2UtcGhvbmUtZGVmYXVsdCZ4Yml6PSZwcm9kX2tleT11dC1yZWNoYXJnZS1waG9uZSZ4cHNpZD0yNGFmODNkMTcxMmU0NjcxOTYwMTg2MDUwMzY3N2M4NSZ4b2lkPWU1YmQxMGExLTRmYTMtNGU1Yy04NWIyLTUzYmZmNGRjYzQ5OSZ4c3BtX2Zyb209Jnhwc2lkX3Jvb3Q9MjRhZjgzZDE3MTJlNDY3MTk2MDE4NjA1MDM2NzdjODUmeHBzaWRfZnJvbT0meHBzaWRfc2hhcmU9JmZfeHBzaWQ9MjRhZjgzZDE3MTJlNDY3MTk2MDE4NjA1MDM2NzdjODUmcm9vdF94cHNpZD0yNGFmODNkMTcxMmU0NjcxOTYwMTg2MDUwMzY3N2M4NSZjaGFubmVsX2lkPTcyJTJDMjc4JTJDODA1MzcjL2luZGV4P2hhc2hfcGFzc3BvcnRfbG9naW4=
- URL(dd05):aHR0cHM6Ly9wYXNzcG9ydC5kaWRpY2h1eGluZy5jb20vY29tbW9uL3BjLWxvZ2luL3YzL2luZGV4Lmh0bWwjLw==
- 一、dd03、关键字搜索或者堆栈断点都可以
- 观察发现加密函数是一个s.getSign
- 单步进入发现是一个l()方法加密
- 最后发现它是一个拼接的处理的字符串，有进行md5和base64操作
- 比较简单，直接扣下来就可以了 源码：
- 二、dd05、一样的关键词搜索或者堆栈断点
- 发现它是通过Object(it[‘a’])函数加密的，i是一个表单参数、r是表示sign值是否更新
- 到这里，我们就得去重新去刷新网页了，让浏览器去加载到这个地方
- 进入到，a函数里面，发现导出加载函数是i函数
- 这里说一个webpack的形式：
- 所以我们首页需要把r这个导出函数定义到全局，然后去浏览器中拿到，‘4bf1’键名对应的函数
- 然后执行window.导出(‘4bf1’),注意导出的时候不只是导出了这一个对象，因为他里面会去加载其他的对象，所以还得去拿其他的对象，不然会报错e[r].call这个加载不起来
- 我这里直接就使用自吐了，把4bf1加载的对象全部收集起来，大概有个600多的对象函数
- 如果还是不太懂，网上有一堆的webpack自吐教程，自己可以看看，研究研究
- 当我们全部扣下来，补完环境发现它的值的位数与浏览器不一致
- 继续观察浏览器，你会发现，它回去初始化加载其他包signinit

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/bd5b85db87ec4ead967b18bd94984186.png
- 图2：https://i-blog.csdnimg.cn/direct/9dc47a99237447668adf0b37e4c483db.png
- 图3：https://i-blog.csdnimg.cn/direct/5f8653a69ebc47c0bbf1723ee2747f84.png（上下文：搜索wsgsig）
- 图4：https://i-blog.csdnimg.cn/direct/020157f015834a5fb1a8b8b8c6487e63.png（上下文：观察发现加密函数是一个s.getSign）
- 图5：https://i-blog.csdnimg.cn/direct/73516f8963bb4e63b97cf4adcc45daf8.png（上下文：单步进入发现是一个l()方法加密）
- 图6：https://i-blog.csdnimg.cn/direct/922c84f2fd1c40ddb4b4f7484d4f6ab5.png（上下文：最后发现它是一个拼接的处理的字符串，有进行md5和base64操作）
- 图8：https://i-blog.csdnimg.cn/direct/7e0f8628b7c443eb8478ade83493f520.png
- 图9：https://i-blog.csdnimg.cn/direct/05385a537984482381107dca7d1f5400.png（上下文：搜索wsgsig断点）
- 图10：https://i-blog.csdnimg.cn/direct/5a02d61c59764666b412a6fae77b44cf.png（上下文：3. 那我们进入先进入到这个it[‘a’]方法中去观察它是怎么实现的,发现是一个webpack 4. 往上翻一点点，你会发现它其实是一个jsvmp,那么我们有俩种选择：1、插装纯算。2、扣webpack补环境 5. 这里我选择补环境吧，纯算）
- 图11：https://i-blog.csdnimg.cn/direct/e4abe270887846b2b065cde96c8245cb.png（上下文：3. 那我们进入先进入到这个it[‘a’]方法中去观察它是怎么实现的,发现是一个webpack 4. 往上翻一点点，你会发现它其实是一个jsvmp,那么我们有俩种选择：1、插装纯算。2、扣webpack补环境 5. 这里我选择补环境吧，纯算）
- 图12：https://i-blog.csdnimg.cn/direct/1d24652a5cbd4220aa5b094f62d7d583.png（上下文：3. 那我们进入先进入到这个it[‘a’]方法中去观察它是怎么实现的,发现是一个webpack 4. 往上翻一点点，你会发现它其实是一个jsvmp,那么我们有俩种选择：1、插装纯算。2、扣webpack补环境 5. 这里我选择补环境吧，纯算）
- 图13：https://i-blog.csdnimg.cn/direct/d9c9ab8ca0de48e896cefd887120ac35.png（上下文：3. 那我们进入先进入到这个it[‘a’]方法中去观察它是怎么实现的,发现是一个webpack 4. 往上翻一点点，你会发现它其实是一个jsvmp,那么我们有俩种选择：1、插装纯算。2、扣webpack补环境 5. 这里我选择补环境吧，纯算）

## 代码/算法线索
- 片段1：

```text
const CrytpJs = require('crypto-js'); function s(t) { for (var e = t.length, n = t.length - 1; n >= 0; n--) { var r = t.charCodeAt(n); r > 127 && r <= 2047 ? e++ : r > 2047 && r <= 65535 && (e += 2), r >= 56320 && r <= 57343 && n-- } return e } var b = Math.floor(new Date / 1e3); var E = 'q{自己去网页拿}'; E += Math.random(); var k = CrytpJs.MD5("R4doMFFeMNlliIWM"+E).toString() , T = [{ k: "ts", v: b }, { k: "v", v: "1" }, { k: "os", v: "web" }, { k: "av", v: "02" }, { k: "kv", v: 
```
- 片段2：

```text
const CrytpJs = require('crypto-js'); function s(t) { for (var e = t.length, n = t.length - 1; n >= 0; n--) { var r = t.charCodeAt(n); r > 127 && r <= 2047 ? e++ : r > 2047 && r <= 65535 && (e += 2), r >= 56320 && r <= 57343 && n-- } return e } var b = Math.floor(new Date / 1e3); var E = 'q{自己去网页拿}'; E += Math.random(); var k = CrytpJs.MD5("R4doMFFeMNlliIWM"+E).toString() , T = [{ k: "ts", v: b }, { k: "v", v: "1" }, { k: "os", v: "web" }, { k: "av", v: "02" }, { k: "kv", v: 
```
- 片段3：

```text
Object(it["a"])({ body: i, noDomainCheck: !0, signUpgrade: r, contentType: "application/x-www-form-urlencoded" }) AI写代码javascript运行123456
```
- 片段4：

```text
Object(it["a"])({ body: i, noDomainCheck: !0, signUpgrade: r, contentType: "application/x-www-form-urlencoded" })
```
- 片段5：

```text
var it = a("4bf1"); wsgsign = Object(it["a"])({ body: i, noDomainCheck: !0, signUpgrade: r, contentType: "application/x-www-form-urlencoded" }) AI写代码javascript运行1234567
```
- 片段6：

```text
var it = a("4bf1"); wsgsign = Object(it["a"])({ body: i, noDomainCheck: !0, signUpgrade: r, contentType: "application/x-www-form-urlencoded" })
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。