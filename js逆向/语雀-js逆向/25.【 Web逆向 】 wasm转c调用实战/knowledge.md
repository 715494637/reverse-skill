# [ Web逆向 ] wasm转c调用实战

## 原文链接
- https://www.52pojie.cn/thread-1581887-1-1.html

## 逆向目标
- 1.某德地图矢量瓦片逆向(快速wasm逆向)，执行wasm2c翻译出来的c代码一

## 关键流程
1. 1.某德地图矢量瓦片逆向(快速wasm逆向)，执行wasm2c翻译出来的c代码一
2. 2.执行wasm2c翻译出来的c代码二
3. 3.wasm转c调用与封装至dll案例
4. 4.XXX视频cKey9.1的生成分析和实现
5. 打开网址用f12抓包
6. 1.png
7. 看到参数中有一个sign，通过调用堆栈，很容易找到其是调用sign函数计算的结果
8. 2.png
9. 打断点后跟入，发现是调用wasm的导出函数
10. 3.png
11. 搜索wasm下载，转成c文件
12. 4.png

## 关键图片线索
1. https://attach.52pojie.cn/forum/202410/11/171841wetetvjtttzzjvgw.png
2. https://attach.52pojie.cn/forum/202410/11/171843imnbgjbkuggaguns.png
3. https://attach.52pojie.cn/forum/202410/11/171845snbwrggrdwwbrdn3.png
4. https://attach.52pojie.cn/forum/202410/11/171847k23kk4kg20q4l444.png
5. https://attach.52pojie.cn/forum/202410/11/171849wi21jvrorr3ibjor.png
6. https://attach.52pojie.cn/forum/202410/11/171851dfy4mu32r269um4y.png
7. https://attach.52pojie.cn/forum/202410/11/171853jc470rif7xrhh54w.png
8. https://attach.52pojie.cn/forum/202410/11/171855x3ugohhti42g22ot.png
9. https://attach.52pojie.cn/forum/202410/11/171857uew0jez9kplzkjuw.png
10. https://attach.52pojie.cn/forum/202410/11/171859ikkkk4lhzsoso83o.png
11. https://attach.52pojie.cn/forum/202410/11/171901mb7niqnntix55eq7.png
12. https://attach.52pojie.cn/forum/202410/11/171903h0vxqq30bqfo3l0n.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 先定位 wasm 加载入口（instantiate/instantiateStreaming），记录 import/export 映射。
- 必要时 wasm2wat 对照分析，重点看参数打包与返回值校验位置。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 导入函数环境检测处理
- 带有闭包的导入函数环境检测处理
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- TOC
- 本篇文章共介绍两个案例。在本篇文章中，之前文章讲过的内容会进行跳过，主要讲新的内容和知识，所以建议先看前置阅读
- 1.某德地图矢量瓦片逆向(快速wasm逆向)，执行wasm2c翻译出来的c代码一
- 2.执行wasm2c翻译出来的c代码二
- 3.wasm转c调用与封装至dll案例
- 4.XXX视频cKey9.1的生成分析和实现
- 案例一：猿人学2022新春题
- 样品地址：
- https://match.yuanrenxue.com/match/20
- 新学习的知识：

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
