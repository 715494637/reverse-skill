# JS逆向-补环境 x点w_tsfp参数逆向

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/139741482
- 序号：62
- 标签：补环境、Cookie、签名参数、指纹
- 页面信息：原创 已于 2025-04-08 20:49:43 修改 · 2.8k 阅读 · 15 · 19 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #爬虫 #scrapy #python 于 2024-06-17 14:20:33 首次发布 原创 已于 2025-04-08 20:49:43 修改 · 2.8k 阅读 · 15 · 19 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向-补环境 x点w_tsfp参数逆向」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`w_tsfp`、`COOKIE`、`cookieTemp`、`cookie`、`cookieEnabled`、`Tsfp`、`getTsfp`、`cookies`、`headers`、`w_tsfp-cookie`、`hook-cookie`

## 核心链路（提纯）
1. 首先进行hook
2. 找到加密文件：probev3.js，使用代理进行补环境 提示：请不要格式化代码，有检测
3. 提示：如果并进行重写，定时器会0.5秒触发一次生成新的值，还有一点就是生成的cookie跟url有关，需要每次更改location的参数
4. hook-cookie
5. 补环境-格式化检测
6. x点w_tsfp参数逆向（补环境COOKIE） URL：aHR0cHM6Ly93d3cucWlkaWFuLmNvbS9hbGwv
7. 提示：通过proxy代理，手补环境
8. 提示：补环境为主 学习交流群：v:wzwzwz0613拉进群

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 找到加密文件：probev3.js，使用代理进行补环境 提示：请不要格式化代码，有检测
- 边运行js看缺少的环境进行补充
- 提示：如果并进行重写，定时器会0.5秒触发一次生成新的值，还有一点就是生成的cookie跟url有关，需要每次更改location的参数
- w_tsfp-cookie获取
- x点w_tsfp参数逆向（补环境COOKIE） URL：aHR0cHM6Ly93d3cucWlkaWFuLmNvbS9hbGwv
- 提示：通过proxy代理，手补环境
- 提示：python运行和调用js 例如：
- 提示：补环境为主 学习交流群：v:wzwzwz0613拉进群

## 关键图片线索
- 图4：https://i-blog.csdnimg.cn/blog_migrate/d3203d82c2bc3d1dc9a6fd2f7206452e.png（上下文：效果）
- 图5：https://i-blog.csdnimg.cn/blog_migrate/24ce45380748e675c036a6c31389f4b0.png（上下文：效果）

## 代码/算法线索
- 片段1：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { debugger; console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })(); 运行项目并下载源码python运行123456789101112131415
```
- 片段2：

```text
(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { debugger; console.log('Hook捕获到cookie设置->', val); cookieTemp = val; return val; }, get: function () { return cookieTemp; }, }); })();
```
- 片段3：

```text
function get_enviroment(proxy_array) { for(var i=0; i<proxy_array.length; i++){ handler = '{\n' + ' get: function(target, property, receiver) {\n' + ' console.log("方法:", "get ", "对象:", ' + '"' + proxy_array[i] + '" ,' + '" 属性:", property, ' + '" 属性类型:", ' + 'typeof property, ' + '" 属性值:", ' + 'target[property], ' + '" 属性值类型:", typeof target[property]);\n' + ' return target[property];\n' + ' },\n' + ' set: function(target, property, value, receiver) {\n' + ' console.log("方法:",
```
- 片段4：

```text
function get_enviroment(proxy_array) { for(var i=0; i<proxy_array.length; i++){ handler = '{\n' + ' get: function(target, property, receiver) {\n' + ' console.log("方法:", "get ", "对象:", ' + '"' + proxy_array[i] + '" ,' + '" 属性:", property, ' + '" 属性类型:", ' + 'typeof property, ' + '" 属性值:", ' + 'target[property], ' + '" 属性值类型:", typeof target[property]);\n' + ' return target[property];\n' + ' },\n' + ' set: function(target, property, value, receiver) {\n' + ' console.log("方法:",
```
- 片段5：

```text
local = {} localStorage ={ getItem:function(k){ return local[k] }, setItem:function(k,v){ local[k] = v }, clear:function(){ local = {} }, removeItem:function(k){ delete local[k] } } document = { cookie:'', createElement:function(arg){ console.log('createElement',arg) if(arg === 'canvas'){ return {} } } } location = { "ancestorOrigins": {}, "href": "脱密处理", "origin": "脱密处理", "protocol": "https:", "host": "脱密处理", "hostname": "脱密处理", "port": "", "pathname": "脱密处理", "search": "", 
```
- 片段6：

```text
local = {} localStorage ={ getItem:function(k){ return local[k] }, setItem:function(k,v){ local[k] = v }, clear:function(){ local = {} }, removeItem:function(k){ delete local[k] } } document = { cookie:'', createElement:function(arg){ console.log('createElement',arg) if(arg === 'canvas'){ return {} } } } location = { "ancestorOrigins": {}, "href": "脱密处理", "origin": "脱密处理", "protocol": "https:", "host": "脱密处理", "hostname": "脱密处理", "port": "", "pathname": "脱密处理", "search": "", 
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。