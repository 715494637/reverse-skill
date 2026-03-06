# JS逆向 - （新版）进阶版 瑞树 cookie（F14B3CEF1、F14B3CEF0、F14B3CEF5）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/148760814
- 序号：33
- 标签：JSVMP/VMP、补环境、Cookie、指纹
- 页面信息：原创 于 2025-06-19 11:09:52 发布 · 1.9k 阅读 · 25 · 18 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #ecmascript #网络爬虫 #wasm #python 原创 于 2025-06-19 11:09:52 发布 · 1.9k 阅读 · 25 · 18 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - （新版）进阶版 瑞树 cookie（F14B3CEF1、F14B3CEF0、F14B3CEF5）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookie`

## 核心链路（提纯）
1. 逆向：JS逆向 - （新版）进阶版 瑞树 cookie（F14B3CEF1、F14B3CEF0、F14B3CEF5）
2. 1、第一次请求首页返回202，会返回一个cookie值：F14B3CEF1
3. 2、第二次请求会带上第一次返回的cookie值：F14B3CEF1和JS文件生成的F14B3CEF0、F14B3CEF5请求，返回成功状态码200
4. 那么肯定是该文件生成的俩个cookie值了，观察js发现一堆的if平坦流混淆+vmp，咱直接补环境
5. 1、将js全部复制到本地，挂上代理，进行补环境
6. 2、补环境检测点
7. document.getElementsByTagName会取meta元素，这里需要注意了，需要等它加载完，然后第一个meta标签的name是js的文件名，而content内容是第一次返回的cookie值
8. 3、断点观察是哪个文件生成的cookie值，还是老样子，我们打开一个无痕浏览器，先开F12，挂上脚本断点，输入网址，我们发现它第一次请求得到响应给了一个script
9. 提示：补环境

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - （新版）进阶版 瑞树 cookie（F14B3CEF1、F14B3CEF0、F14B3CEF5）
- URL：aHR0cHM6Ly93d3cuanh1dGNtLmVkdS5jbi8=
- 1、第一次请求首页返回202，会返回一个cookie值：F14B3CEF1
- 2、第二次请求会带上第一次返回的cookie值：F14B3CEF1和JS文件生成的F14B3CEF0、F14B3CEF5请求，返回成功状态码200
- 那么肯定是该文件生成的俩个cookie值了，观察js发现一堆的if平坦流混淆+vmp，咱直接补环境
- 1、将js全部复制到本地，挂上代理，进行补环境
- bom/dom 基本环境
- 原型链：HTMLElement、HTMLFormElement、HTMLFormElement.prototype.submit、WebGLRenderingContext
- document.getElementsByTagName会取meta元素，这里需要注意了，需要等它加载完，然后第一个meta标签的name是js的文件名，而content内容是第一次返回的cookie值
- dom会进行createElement创建标签并给予赋值，然后通过getElementById、getElementsByClassName去取到刚刚创建的特定的标签
- 最后就是canvas、webgl指纹这一块，如果补全的话会比较多
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 3、断点观察是哪个文件生成的cookie值，还是老样子，我们打开一个无痕浏览器，先开F12，挂上脚本断点，输入网址，我们发现它第一次请求得到响应给了一个script
- 提示：学习交流主页，星球持续更新中

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/cf62d417d8c44340b0b30c817386356b.png
- 图2：https://i-blog.csdnimg.cn/direct/0c93bacaff674229bb9e3b57b2ae96ad.png
- 图3：https://i-blog.csdnimg.cn/direct/a9364476141a47bf9aa6860192a580ea.png（上下文：3、断点观察是哪个文件生成的cookie值，还是老样子，我们打开一个无痕浏览器，先开F12，挂上脚本断点，输入网址，我们发现它第一次请求得到响应给了一个script）
- 图4：https://i-blog.csdnimg.cn/direct/4404e8a378494efc919b46f925b92a42.png
- 图5：https://i-blog.csdnimg.cn/direct/16803791f72449bd9b0b5af3fcba6028.png
- 图7：https://i-blog.csdnimg.cn/direct/4ef102825449426286f9841d6de9a514.png（上下文：dom检测）
- 图8：https://i-blog.csdnimg.cn/direct/ce4e89f01dda4fee8683c4b61d21cbc2.png（上下文：document.getElementsByTagName会取meta元素，这里需要注意了，需要等它加载完，然后第一个meta标签的name是js的文件名，而content内容是第一次返回的cookie值）
- 图9：https://i-blog.csdnimg.cn/direct/eb23c2a3f57d4e85a7c3e1c11b07f6a3.png（上下文：提示：结果）
- 图10：https://i-blog.csdnimg.cn/direct/8a45c9a0761c4e30a4653344890af5f6.png（上下文：提示：结果）

## 代码/算法线索
- 片段1：

```text
// 去除打印比较难看的日志 no_print = ['window', 'globalThis', 'crypto', 'global','navigator','top','plugins']; function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { if(property === 'window'){ return target[property]; } if(property === 'globalThis'){ return target[property]; } if(no_print.includes(property)){ return target[property]; } dtavm.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", p
```
- 片段2：

```text
// 去除打印比较难看的日志 no_print = ['window', 'globalThis', 'crypto', 'global','navigator','top','plugins']; function setProxyArr(proxyObjArr) { for (let i = 0; i < proxyObjArr.length; i++) { const handler = `{ get: function(target, property, receiver) { if(property === 'window'){ return target[property]; } if(property === 'globalThis'){ return target[property]; } if(no_print.includes(property)){ return target[property]; } dtavm.log("方法:", "get ", "对象:", "${proxyObjArr[i]}", " 属性:", p
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。