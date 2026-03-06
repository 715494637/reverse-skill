# JS逆向 - 阉割版五秒盾（国内版）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149322992
- 序号：27
- 标签：补环境、Cookie、指纹
- 页面信息：原创 已于 2025-07-14 10:23:18 修改 · 2.6k 阅读 · 16 · 22 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #网络爬虫 #python #wasm #算法 于 2025-07-14 10:22:47 首次发布 原创 已于 2025-07-14 10:23:18 修改 · 2.6k 阅读 · 16 · 22 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 阉割版五秒盾（国内版）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookie`、`AES`、`key`

## 核心链路（提纯）
1. 逆向：JS逆向 - 阉割版五秒盾（国内版）
2. 1、首先将ctct_bundle.js的内容还原一下（还原网址）：https://webcrack.netlify.app/
3. 2、本地将ctct_bundle.js替换上次，通过脚本断点，一个一个文件的加载，到最后会发现会出现
4. 3、所以，我们直接搜索Devtools的关键字，会发现很多个，我们找到一个刚开始的地方
5. 4、继续往下看，我们会发现很多检测的地方，比如：toString、console、performance、debugger、setTimeout等
6. 5、继续分析我们可以看到，他确实是通过launch方法去启动的
7. 1、我们观察前面二次请求：第一次是返回412，并返回俩个js，第二次是js返回一个xyjgnaksf对象，这个很重要，可能后面会用到，那么这几个cookie值肯定是在第三个请求的js里面生成的
8. 2、直接在ctct_bundle.js中搜索：document.cookie，将所有可能断点的地方都下好debugger
9. 3、重新刷新网页加载
10. 加密内容：‘1752456817{“md”:0,“mv”:0,“mp”:0,“kc”:0}17’,分成三部分：时间戳+{“md”:0,“mv”:0,“mp”:0,“kc”:0}+时间戳后面俩位
11. 密钥：判断_0x48c9f7：query取xyjgnaksf.a6607e9a31_5d01d7，env取xyjgnaksf.e09b_cc0baf4c431
12. 加密AES（注意跟栈进去会发现）：key=iv = xyjgnaksf.属性.substring(4)

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 阉割版五秒盾（国内版）
- URL: aHR0cHM6Ly9haC5jaGluYW1pbmUtc2FmZXR5Lmdvdi5jbi9mdXd1L2hkX3pjamQv
- hd_zcjd接口:返回一个HTML，响应状态412
- 1eeb27c_268ab095d.js接口：返回一个对象xyjgnaksf
- ctct_bundle.js接口：返回js代码
- hd_zcjd接口：返回正确内容，响应状态码为200，观察cookie中发现生成5个cookie值
- 1、首先将ctct_bundle.js的内容还原一下（还原网址）：https://webcrack.netlify.app/
- 2、本地将ctct_bundle.js替换上次，通过脚本断点，一个一个文件的加载，到最后会发现会出现
- 3、所以，我们直接搜索Devtools的关键字，会发现很多个，我们找到一个刚开始的地方
- 4、继续往下看，我们会发现很多检测的地方，比如：toString、console、performance、debugger、setTimeout等
- 5、继续分析我们可以看到，他确实是通过launch方法去启动的
- 所以咱就好解决了，直接将执行launch的方法直接给注释掉就可以了
- 1、我们观察前面二次请求：第一次是返回412，并返回俩个js，第二次是js返回一个xyjgnaksf对象，这个很重要，可能后面会用到，那么这几个cookie值肯定是在第三个请求的js里面生成的
- 2、直接在ctct_bundle.js中搜索：document.cookie，将所有可能断点的地方都下好debugger
- CTCT_GLOBAL_TIME_DELTA：可写死，0
- 加密内容：‘1752456817{“md”:0,“mv”:0,“mp”:0,“kc”:0}17’,分成三部分：时间戳+{“md”:0,“mv”:0,“mp”:0,“kc”:0}+时间戳后面俩位
- 密钥：判断_0x48c9f7：query取xyjgnaksf.a6607e9a31_5d01d7，env取xyjgnaksf.e09b_cc0baf4c431
- 加密AES（注意跟栈进去会发现）：key=iv = xyjgnaksf.属性.substring(4)
- 上面加密的时间戳:当前时间戳(10位) - CTCT_GLOBAL_TIME_DELTA

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/b1c0ef3309574fa78c9c861d307c7d99.png
- 图2：https://i-blog.csdnimg.cn/direct/25a6f6c7390c4d0292a5444ba949f4ea.png
- 图3：https://i-blog.csdnimg.cn/direct/0081fb3b50c2443f9c87a0956e60355e.png（上下文：hd_zcjd接口:返回一个HTML，响应状态412）
- 图4：https://i-blog.csdnimg.cn/direct/07f14ad290bc40ebaa66b86f3f99dcdd.png（上下文：1eeb27c_268ab095d.js接口：返回一个对象xyjgnaksf）
- 图5：https://i-blog.csdnimg.cn/direct/8b2e5db2827b4a4aa680996a23671468.png（上下文：hd_zcjd接口：返回正确内容，响应状态码为200，观察cookie中发现生成5个cookie值）
- 图6：https://i-blog.csdnimg.cn/direct/e85289ad71dc4d84b16a4be2b87d0081.png
- 图7：https://i-blog.csdnimg.cn/direct/efd26978d78d461bb5a82db9ecacc51a.png
- 图8：https://i-blog.csdnimg.cn/direct/8459daecae50484e80ec50045da03b28.png
- 图9：https://i-blog.csdnimg.cn/direct/6ead6ab20d5b4caa9d9c195ac404190c.png
- 图10：https://i-blog.csdnimg.cn/direct/b8d18e906b76488d97c09c26582d7d3b.png
- 图12：https://i-blog.csdnimg.cn/direct/18d4e35eead044d0985001ecd11b7d71.png
- 图13：https://i-blog.csdnimg.cn/direct/28fdfbb5eb6444fe92279107045e1ff0.png

## 代码/算法线索
- 片段1：

```text
var xyjgnaksf = { "af8_dc12a_a162676": 0, "a6607e9a31_5d01d7": "Ri8aec619f339x^*xO53", "e_qlhhxu7nxpbcq": 1, "a271f0f91e16b_f4d": 1, "C_910fddefa_2e67d7": "6pqnuyiX#@l89x^&xOG2", "xpiq_7tw_kmeuzv63": 0, "a0e4dfb1c_f90554": 2048, "a3_b210c1396f9871": 1, "d92130a3ea_557685": "mA#22TiX#*x907r$xOh1", "pqol86xnbz1hxz_w": 1, "a0e4dfb1c_f90553": 16384, "af8_dc12a_a162678": "1752456665", "yxao91ip_xa7qmpw": "ah.chinamine-safety.gov.cn", "uyjgx63xoizzxzql": 1, "af8_dc12a_a162677": "b1
```
- 片段2：

```text
var xyjgnaksf = { "af8_dc12a_a162676": 0, "a6607e9a31_5d01d7": "Ri8aec619f339x^*xO53", "e_qlhhxu7nxpbcq": 1, "a271f0f91e16b_f4d": 1, "C_910fddefa_2e67d7": "6pqnuyiX#@l89x^&xOG2", "xpiq_7tw_kmeuzv63": 0, "a0e4dfb1c_f90554": 2048, "a3_b210c1396f9871": 1, "d92130a3ea_557685": "mA#22TiX#*x907r$xOh1", "pqol86xnbz1hxz_w": 1, "a0e4dfb1c_f90553": 16384, "af8_dc12a_a162678": "1752456665", "yxao91ip_xa7qmpw": "ah.chinamine-safety.gov.cn", "uyjgx63xoizzxzql": 1, "af8_dc12a_a162677": "b1
```
- 片段3：

```text
CTCT_GLOBAL_TIME_DELTA : 当前时间戳(10位) - xyjgnaksf.af8_dc12a_a162678 AI写代码javascript运行1
```
- 片段4：

```text
CTCT_GLOBAL_TIME_DELTA : 当前时间戳(10位) - xyjgnaksf.af8_dc12a_a162678
```
- 片段5：

```text
var _0x33cd42 = function () { var _0x31363e = _0x67cb40(); var _0x3ec4fb = document.cookie.match(/(?:^|;)\s*CTCT_GLOBAL_TIME_DELTA=([^;]+)/); if (_0x3ec4fb) { var _0x33ace6 = _0x31363e - _0x3ec4fb[1]; return `${_0x33ace6}`; } return ""; }(); AI写代码javascript运行123456789
```
- 片段6：

```text
var _0x33cd42 = function () { var _0x31363e = _0x67cb40(); var _0x3ec4fb = document.cookie.match(/(?:^|;)\s*CTCT_GLOBAL_TIME_DELTA=([^;]+)/); if (_0x3ec4fb) { var _0x33ace6 = _0x31363e - _0x3ec4fb[1]; return `${_0x33ace6}`; } return ""; }();
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。