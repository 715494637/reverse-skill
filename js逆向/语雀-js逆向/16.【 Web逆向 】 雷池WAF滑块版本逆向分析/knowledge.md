# [ Web逆向 ] 雷池WAF滑块版本逆向分析

## 原文链接
- https://www.52pojie.cn/thread-1995970-1-1.html

## 逆向目标
- 网上先找了一圈没有相关的分析文章，只能自己顶了。

## 关键流程
1. 1.png
2. 先过一眼代码，不多，五千多行，没有混淆。
3. 既然是滑块滑动完后触发检测，那我们先加个mouseup的鼠标监听断点。
4. 滑动鼠标到位置后松开，看下断点位置。定位到了函数j的位置，向下继续走，能看到先拿到了轨迹去判断，too-fast检测滑动太快，too-slow滑动太慢。中间一系列计算检测是否正确滑动到尾端位置。 直接到最后的w函数。
5. 2.png
6. 3.png
7. 4.png
8. 5.png
9. 6.png
10. 1、请求首页获取client id和cookie sl-session
11. 2、请求获取challenge.js文件先进行环境检测
12. 3、携带client_id请求issue接口获取一个数组和issue_id

## 关键图片线索
1. https://attach.52pojie.cn/forum/202412/30/170235h1at3aq3tcaquuuz.png
2. https://attach.52pojie.cn/forum/202412/31/141147oeumgztmymuz00m0.png
3. https://attach.52pojie.cn/forum/202412/31/141150c3x0lxzvlxyxwzx8.png
4. https://attach.52pojie.cn/forum/202412/31/141152r7jlfvn58tkzt72l.png
5. https://attach.52pojie.cn/forum/202412/31/141154xw8feqrvkyq78yf7.png
6. https://attach.52pojie.cn/forum/202412/31/141157h1akd5e2kd1c2n5k.png
7. https://attach.52pojie.cn/forum/202412/31/141159lojzp8conjcp3lci.png
8. https://attach.52pojie.cn/forum/202412/31/141201j054r25uuv5h6he5.png
9. https://attach.52pojie.cn/forum/202412/31/141204o2ei2zxtzm8285b8.png
10. https://attach.52pojie.cn/forum/202412/31/141206m2h15aq5wja27jw4.png
11. https://attach.52pojie.cn/forum/202412/31/141209hojt6vifizfnhtic.png
12. https://attach.52pojie.cn/forum/202412/31/141211f4pxm5rvfuoxogzr.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 先定位 wasm 加载入口（instantiate/instantiateStreaming），记录 import/export 映射。
- 必要时 wasm2wat 对照分析，重点看参数打包与返回值校验位置。

## 常见坑与规避
- 进入w函数往下走两步，触发了当前环境正在被检测，ok找到了。
- 2、请求获取challenge.js文件先进行环境检测
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 前言
- 项目中的网站防护突然更新了。
- 原先是无感检测，现在加了个滑块。
- 上一版的算法看的这位佬的文章写出来的。
- https://www.52pojie.cn/thread-1930242-1-1.html
- 网上先找了一圈没有相关的分析文章，只能自己顶了。
- 目标网站
- aHR0cHM6Ly93d3cuY2hhbmdhbmp5enguY29tLw==
- DevTool控制台检测
- 滑动滑块后被检测到

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
