# JS逆向入门案例-某花顺股票数据（hexin-v）-07

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/143054248
- 序号：58
- 标签：补环境、Cookie
- 页面信息：原创 已于 2025-04-08 20:51:04 修改 · 1.5k 阅读 · 36 · 31 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #前端 #开发语言 于 2024-10-18 16:06:40 首次发布 原创 已于 2025-04-08 20:51:04 修改 · 1.5k 阅读 · 36 · 31 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-某花顺股票数据（hexin-v）-07」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookie`、`cookieTemp`、`param`、`key`

## 核心链路（提纯）
1. 逆向：某花顺股票数据
2. 一、hook进行断点
3. 继续往上跟栈，找到值生成的地方：
4. 直接搜索：var rt;,给它定义成全局变量
5. 二、这里我们直接补环境，直接将该js文件全部扣下到node里面，并挂上代理：

## 关键文字线索
- URL：aHR0cHM6Ly9xLjEwanFrYS5jb20uY24v
- 目的：hexin-v（cookie）
- 继续往上跟栈，找到值生成的地方：
- 直接搜索：var rt;,给它定义成全局变量
- 挂上代理，我们直接补上window、document、navigator、location
- 继续将undefined改为浏览器对应的值：
- 下面的自己慢慢补吧,直接划一波水，帖一波最后的环境值：
- 三、最终就是实现python
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系！
- 提示：分析-调试-猜想-实现-执行
- 二、这里我们直接补环境，直接将该js文件全部扣下到node里面，并挂上代理：
- 提示：学习交流群：v:wzwzwz0613拉进群

## 关键图片线索
- 图2：https://i-blog.csdnimg.cn/direct/9b90959d23464475a43c162e4cc57da9.png
- 图3：https://i-blog.csdnimg.cn/direct/233dd39a77394e29b5367523c9eef26c.png（上下文：二、这里我们直接补环境，直接将该js文件全部扣下到node里面，并挂上代理：）
- 图5：https://i-blog.csdnimg.cn/direct/a76466a02f4545bbbe720e8dc728add8.png
- 图6：https://i-blog.csdnimg.cn/direct/281201db1fe6420bbb4ca499b352149b.png
- 图7：https://i-blog.csdnimg.cn/direct/97d3ae14c16f486d8b023554d2e237f6.png
- 图9：https://i-blog.csdnimg.cn/direct/56b81b39d0724d6fbbe6b0fdedfa250b.png
- 图10：https://i-blog.csdnimg.cn/direct/f1ee6332f5b14082aee418f9368d4ebe.png

## 代码/算法线索
- 片段1：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { if (val.indexOf('v') != -1) { debugger; } console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })(); AI写代码javascript运行123456789101112131415161718
```
- 片段2：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { if (val.indexOf('v') != -1) { debugger; } console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })();
```
- 片段3：

```text
my_Proxy = function (obj_, obj_name, proxy=true) { function set_traverse_object(tarrget, obj, recursion_layers) { recursion_layers -= 1; console.log(); for (let prop in obj) { const value = obj[prop]; const tg_name = `${tarrget}.${prop.toString()}`; const value_type = get_value_type(value); if (value && value_type === "object" && recursion_layers >= 1) { set_traverse_object(tg_name, value, recursion_layers); continue } if (value && value.toString() !== '[object Object]') { co
```
- 片段4：

```text
my_Proxy = function (obj_, obj_name, proxy=true) { function set_traverse_object(tarrget, obj, recursion_layers) { recursion_layers -= 1; console.log(); for (let prop in obj) { const value = obj[prop]; const tg_name = `${tarrget}.${prop.toString()}`; const value_type = get_value_type(value); if (value && value_type === "object" && recursion_layers >= 1) { set_traverse_object(tg_name, value, recursion_layers); continue } if (value && value.toString() !== '[object Object]') { co
```
- 片段5：

```text
window = global; addEventListener = function () { }; document = { head: {}, getElementsByTagName: function (res) { return [] }, createElement: function (res) { if (res === 'canvas') { return { getContext: function (res) { if (res === 'webgl2') { return {} } } } } return {} }, addEventListener: function () { }, documentElement:{} }; navigator = { plugins: { length: 2, '0': { name:'Chromium PDF Plugin' }, '1': { name:'Chromium PDF Viewer' } }, userAgent: 'Mozilla/5.0 (Windows N
```
- 片段6：

```text
window = global; addEventListener = function () { }; document = { head: {}, getElementsByTagName: function (res) { return [] }, createElement: function (res) { if (res === 'canvas') { return { getContext: function (res) { if (res === 'webgl2') { return {} } } } } return {} }, addEventListener: function () { }, documentElement:{} }; navigator = { plugins: { length: 2, '0': { name:'Chromium PDF Plugin' }, '1': { name:'Chromium PDF Viewer' } }, userAgent: 'Mozilla/5.0 (Windows N
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。