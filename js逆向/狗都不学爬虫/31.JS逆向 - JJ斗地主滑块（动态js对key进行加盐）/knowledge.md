# JS逆向 - JJ斗地主滑块（动态js对key进行加盐）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149092438
- 序号：31
- 标签：补环境、签名参数、滑块/验证码、指纹
- 页面信息：最新推荐文章于 2026-02-27 17:44:19 发布 原创 于 2025-07-03 15:00:03 发布 · 2k 阅读 · 11 · 11 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #python #爬虫 原创 于 2025-07-03 15:00:03 发布 · 2k 阅读 · 11 · 11 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - JJ斗地主滑块（动态js对key进行加盐）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`key`、`cfp`、`token`、`AES`、`MD5`、`aes`、`md5`

## 核心链路（提纯）
1. 逆向：JS逆向 - JJ斗地主滑块（动态js对key进行加盐）
2. 1、首先输入账号密码触发点击登录滑块验证
3. 2、获取滑块图片消息接口
4. 请求get接口查询参数:aHR0cHM6Ly9jYXB0Y2hhLnNydi5qai5jbi92My9nZXQ= 观察发现challenge、cfp是变化的，并且是另外一个config接口返回的，而business_id也是访问首页返回的，为固定值
5. config接口查询参数：aHR0cHM6Ly9jYXB0Y2hhLnNydi5qam1hdGNoLmNuL3YzL2NvbmZpZw== 这里ts为时间戳
6. 3、验证滑块接口
7. 验证接口查询参数：aHR0cHM6Ly9jYXB0Y2hhLnNydi5qai5jbi92My92ZXJpZnk=
8. code:10003表示加密错误 （注意以为js加密为动态，AES加密的key是经过特殊处理的）
9. 1、堆栈断点
10. 继续往上跟栈，发现往上鼠标引用的变量不能出结果了，那么只能重新找个地方下断点，往上跟栈，我们发现这个地方有个地方为data，那么肯定会把V值给到它，下断重新触发断点
11. 发现跟到这个地方时候加密了：packFingerprintsData
12. 2、在该地方下断点，具体分析是怎么进行加密的

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - JJ斗地主滑块（动态js对key进行加盐）
- URL：aHR0cHM6Ly9sb2dpbi5qai5jbi91c2VyL2xvZ2luLnBocA==
- 1、首先输入账号密码触发点击登录滑块验证
- 2、获取滑块图片消息接口
- 请求get接口查询参数:aHR0cHM6Ly9jYXB0Y2hhLnNydi5qai5jbi92My9nZXQ= 观察发现challenge、cfp是变化的，并且是另外一个config接口返回的，而business_id也是访问首页返回的，为固定值
- config接口查询参数：aHR0cHM6Ly9jYXB0Y2hhLnNydi5qam1hdGNoLmNuL3YzL2NvbmZpZw== 这里ts为时间戳
- config接口响应返回：
- get接口响应内容返回滑块图片信息：
- 验证接口查询参数：aHR0cHM6Ly9jYXB0Y2hhLnNydi5qai5jbi92My92ZXJpZnk=
- code:10002表示验证失败 滑块轨迹或者坐标识别问题
- code:10000表示验证成功 会返回一个token值
- code:10003表示加密错误 （注意以为js加密为动态，AES加密的key是经过特殊处理的）
- 继续往上跟栈，发现往上鼠标引用的变量不能出结果了，那么只能重新找个地方下断点，往上跟栈，我们发现这个地方有个地方为data，那么肯定会把V值给到它，下断重新触发断点
- 发现跟到这个地方时候加密了：packFingerprintsData
- 2、在该地方下断点，具体分析是怎么进行加密的
- 继续往下跟栈发现它将这些参数进行了赋值并转换成了JSON.stringify,然后使用encrypt传递了拼接的字符串和截取的滑块背景图片的一小段，这里直接可以猜测是一个aes加密了
- 3、继续从encrypt下面去跟栈
- 这里发现对刚刚截取的背景图片的一小段进行了处理，跟进去观察
- 4、背景图片的一小截字符串处理后，继续往下看

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/6a34b1b07c2447419f0450c0f98696a4.png
- 图3：https://i-blog.csdnimg.cn/direct/b01cdc3f760a4213a4f52fecd9ce4ba4.png（上下文：请求get接口查询参数:aHR0cHM6Ly9jYXB0Y2hhLnNydi5qai5jbi92My9nZXQ= 观察发现challenge、cfp是变化的，并且是另外一个config接口返回的，而business_id也是访问首页返回的，）
- 图4：https://i-blog.csdnimg.cn/direct/7a58c45d55544219889008fc294ca412.png（上下文：config接口查询参数：aHR0cHM6Ly9jYXB0Y2hhLnNydi5qam1hdGNoLmNuL3YzL2NvbmZpZw== 这里ts为时间戳）
- 图5：https://i-blog.csdnimg.cn/direct/77b5dd1effaa4df190b634b3cdd47da2.png（上下文：config接口响应返回：）
- 图6：https://i-blog.csdnimg.cn/direct/ff196a62effb4225a63a3e91935873c3.png（上下文：get接口响应内容返回滑块图片信息：）
- 图7：https://i-blog.csdnimg.cn/direct/3d5e2824c1ff4627b8b00e70a57c7564.png（上下文：验证接口查询参数：aHR0cHM6Ly9jYXB0Y2hhLnNydi5qai5jbi92My92ZXJpZnk=）
- 图8：https://i-blog.csdnimg.cn/direct/7cd4fb47ea9f45c0aa81f5ae566e0ceb.png（上下文：验证接口响应内容：）
- 图9：https://i-blog.csdnimg.cn/direct/09287c9bc4bc482cb023be16d944df7c.png
- 图10：https://i-blog.csdnimg.cn/direct/4f7f2b4dec1046319011cf2409c174ee.png
- 图11：https://i-blog.csdnimg.cn/direct/bd127aa97f5c48a289810eda3d0f65e8.png
- 图12：https://i-blog.csdnimg.cn/direct/5b65550aa0ca4a80992dae347b12f872.png
- 图13：https://i-blog.csdnimg.cn/direct/a1b7850e0ab744778c5433207a73047d.png

## 代码/算法线索
- 片段1：

```text
(function() { // 立即执行函数，创建独立作用域 'use strict'; // 启用严格模式，防止一些不规范的代码写法 // 调试配置对象 //按0开启日志，默认关闭 const DEBUG = { enable: 1, // 控制是否输出日志信息的开关 deb: 1 // 控制是否在关键位置设置断点的开关 }; //作者：Dexter//公众号：我不是蜘蛛 // 定义日志输出函数，根据 DEBUG.enable 决定是否输出日志 const log = function(...args) { if (DEBUG.enable == 0) { console.log(...args); } }; // 保存原始的 setInterval 函数 var originalSetInterval = window.setInterval; // 用新的函数替换原始的 setInterval window.setInterval = function(callback, delay) { // 获取除了 callback 和 delay
```
- 片段2：

```text
(function() { // 立即执行函数，创建独立作用域 'use strict'; // 启用严格模式，防止一些不规范的代码写法 // 调试配置对象 //按0开启日志，默认关闭 const DEBUG = { enable: 1, // 控制是否输出日志信息的开关 deb: 1 // 控制是否在关键位置设置断点的开关 }; //作者：Dexter//公众号：我不是蜘蛛 // 定义日志输出函数，根据 DEBUG.enable 决定是否输出日志 const log = function(...args) { if (DEBUG.enable == 0) { console.log(...args); } }; // 保存原始的 setInterval 函数 var originalSetInterval = window.setInterval; // 用新的函数替换原始的 setInterval window.setInterval = function(callback, delay) { // 获取除了 callback 和 delay
```
- 片段3：

```text
js_code = requests.get(jsurl).content.decode() jiam = re.search("""\]=_0x([a-zA-Z0-9]{6});},{'./config'""",js_code) if jiam == None: jiam = re.search('\]=_0x([a-zA-Z0-9]{6});},{.*?\\u002e\\u002f\\u0063\\u006f\\u006e\\u0066\\u0069\\u0067"',js_code) if jiam == None: return get_config() else: split_dian = jiam.group(0).split(';},{') bian_name = split_dian[0].replace(']=','') split_name = ';},{'+split_dian[1] js_split = js_code.split(split_name) jscodec = js_split[0] + ';window.z
```
- 片段4：

```text
js_code = requests.get(jsurl).content.decode() jiam = re.search("""\]=_0x([a-zA-Z0-9]{6});},{'./config'""",js_code) if jiam == None: jiam = re.search('\]=_0x([a-zA-Z0-9]{6});},{.*?\\u002e\\u002f\\u0063\\u006f\\u006e\\u0066\\u0069\\u0067"',js_code) if jiam == None: return get_config() else: split_dian = jiam.group(0).split(';},{') bian_name = split_dian[0].replace(']=','') split_name = ';},{'+split_dian[1] js_split = js_code.split(split_name) jscodec = js_split[0] + ';window.z
```
- 片段5：

```text
dtavm = { log:console.log // log:function(){} } function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { dtavm.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { if(property === 'documentElement'){ return 
```
- 片段6：

```text
dtavm = { log:console.log // log:function(){} } function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { dtavm.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", property, " 属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]); return target[property]; }, set: function(target, property, value, receiver) { if(property === 'documentElement'){ return 
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。