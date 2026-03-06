# JS逆向入门案例-瑞树3（cookie值）- 16

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/145700606
- 序号：48
- 标签：补环境、Cookie
- 页面信息：原创 已于 2025-04-08 20:52:35 修改 · 1.6k 阅读 · 9 · 12 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2025-02-18 12:15:35 首次发布 原创 已于 2025-04-08 20:52:35 修改 · 1.6k 阅读 · 9 · 12 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体 架构 流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-瑞树3（cookie值）- 16」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookie`、`headers`、`signed-exchange`、`sandbox`、`getcookie`、`getCookie`

## 核心链路（提纯）
1. 逆向：瑞树3 - cookie值
2. 一、加载步骤（生成）： 1、打开无痕浏览器窗口 - 输入网址 - 事件 监听器打开脚本直接断住
3. 2、跟栈往后面走，到html文件
4. 注意：我们不能直接去复制到本地的js文件中，不然会出现js的转义问题 3、python获取对应的content、ts、js代码
5. 4、挂代理补环境：
6. 注意：补着补着会发现，会检测nodejs,出现变量没有定义或者方法没有的情况 5、不能直接挂代理补，得使用vm2,纯v8环境

## 关键文字线索
- 概要整体架构流程技术细节小结
- 逆向：瑞树3 - cookie值
- URL：aHR0cDovL3d3dy5jaGluYWRydWd0cmlhbHMub3JnLmNuL2luZGV4Lmh0bWw=
- 这里分别是content和js组成，content后面会取值，js会生成cookie
- npm install -g vm2 npm install -g node-inspect
- vscode联调：调试配置
- pycharm联调：–inspect-brk
- 这里我使用的是vscode
- document：getElementById 9DhefwqGPrzGxEp9hPaoag
- navigator：直接补Navigator
- screen:到这里吧，慢慢补，没什么检测，代码补通了就可以
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：大致步骤跟瑞树4差不多
- 一、加载步骤（生成）： 1、打开无痕浏览器窗口 - 输入网址 - 事件 监听器打开脚本直接断住
- 2、跟栈往后面走，到html文件
- 注意：我们不能直接去复制到本地的js文件中，不然会出现js的转义问题 3、python获取对应的content、ts、js代码
- 注意：补着补着会发现，会检测nodejs,出现变量没有定义或者方法没有的情况 5、不能直接挂代理补，得使用vm2,纯v8环境
- 二、使用vm2,首先要下载,还有就是浏览器联调：
- 三、在env.js加上代理直接开补，缺啥补啥：
- 提示：关于怎么调出值，上面写了那个注释就是

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/91d8e3b220fe4c0999846828eb90ccc9.png
- 图2：https://i-blog.csdnimg.cn/direct/214ffcae0cd4487eb56e2194ffcd7af8.png（上下文：一、加载步骤（生成）： 1、打开无痕浏览器窗口 - 输入网址 - 事件 监听器打开脚本直接断住）
- 图3：https://i-blog.csdnimg.cn/direct/42589d6a7cf44454bdba8ba69b3d260c.png（上下文：2、跟栈往后面走，到html文件）
- 图6：https://i-blog.csdnimg.cn/direct/b0091816e80a4bbf8bbbffc074fb0350.png
- 图7：https://i-blog.csdnimg.cn/direct/be78314197354d05b074295c9b00eb4f.png
- 图8：https://i-blog.csdnimg.cn/direct/686c0152b7c049099b531baffa581766.png（上下文：三、在env.js加上代理直接开补，缺啥补啥：）
- 图9：https://i-blog.csdnimg.cn/direct/e69808444a0f4f43a13a794cbb9621c1.png（上下文：三、在env.js加上代理直接开补，缺啥补啥：）
- 图10：https://i-blog.csdnimg.cn/direct/0da5bea3658a4b88b4d5b1c9bf4da8fa.png
- 图12：https://i-blog.csdnimg.cn/direct/d4df2106f2294311a30a36e4fff5e5d9.png
- 图14：https://i-blog.csdnimg.cn/direct/d94abfe91eb64c8280c4b2a92805e97a.png
- 图15：https://i-blog.csdnimg.cn/direct/0aca386097fb4c07ae10a20d85e2064e.png（上下文：提示：关于怎么调出值，上面写了那个注释就是）
- 图17：https://i-blog.csdnimg.cn/direct/c536ae5b4f3d4583975d387f7bd963f0.png

## 代码/算法线索
- 片段1：

```text
headers = { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6', 'Connection': 'keep-alive', 'Upgrade-Insecure-Requests': '1', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0', } response = requests.get('http://xxx/index.
```
- 片段2：

```text
headers = { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6', 'Connection': 'keep-alive', 'Upgrade-Insecure-Requests': '1', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0', } response = requests.get('http://xxx/index.
```
- 片段3：

```text
function proxy(obj,name){ return new Proxy(obj,{ get:function (target, p, receiver) { console.table([{'method':'get',target:name,p:p,receiver:receiver,value:Reflect.get(target, p, receiver)}]) return Reflect.get(target, p, receiver) }, set:function (target, p, value,receiver){ console.table([{'method':'set',target:name, p:p, value:value, receiver:receiver}]) return Reflect.set(target, p, value, receiver) }, }) }; AI写代码javascript运行123456789101112
```
- 片段4：

```text
function proxy(obj,name){ return new Proxy(obj,{ get:function (target, p, receiver) { console.table([{'method':'get',target:name,p:p,receiver:receiver,value:Reflect.get(target, p, receiver)}]) return Reflect.get(target, p, receiver) }, set:function (target, p, value,receiver){ console.table([{'method':'set',target:name, p:p, value:value, receiver:receiver}]) return Reflect.set(target, p, value, receiver) }, }) };
```
- 片段5：

```text
const {VM,VMScript} = require("vm2"); const fs = require('fs'); var code = fs.readFileSync('./env.js') + '\n' // 环境代码 code += fs.readFileSync('./cont.js') + '\n' // content代码 code += fs.readFileSync('./ts.js') + '\n' // ts代码 code += fs.readFileSync('./cd.js') + '\n'; // js代码 const vm = new VM(); vm.run(code); AI写代码javascript运行123456789
```
- 片段6：

```text
const {VM,VMScript} = require("vm2"); const fs = require('fs'); var code = fs.readFileSync('./env.js') + '\n' // 环境代码 code += fs.readFileSync('./cont.js') + '\n' // content代码 code += fs.readFileSync('./ts.js') + '\n' // ts代码 code += fs.readFileSync('./cd.js') + '\n'; // js代码 const vm = new VM(); vm.run(code);
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。