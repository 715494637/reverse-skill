# [ Web逆向 ] 某q音乐jsvmp反编译

## 原文链接
- https://www.52pojie.cn/thread-2042090-1-1.html

## 逆向目标
- 一、分析虚拟机架构

## 关键流程
1. https://jixun.uk/posts/2024/qqmusic-zzc-sign/
2. 首先调用createVM函数传入入口点、初始化参数、全局变量、初始数据等等，返回一个构造好的虚拟函数
3. 1、Mov
4. 2、MovCall
5. 3、LoadImm
6. 4、LoadConstant
7. 1、算数运算
8. (7) PreIncrementAssign
9. (8) PostIncrementAssign
10. 2、逻辑运算
11. 3、位运算
12. 4、比较指令

## 关键图片线索
1. https://attach.52pojie.cn/forum/202506/28/030257fqkemrwbrco62dmw.png
2. https://attach.52pojie.cn/forum/202506/28/030250if0y10oy15xsntn5.png
3. https://attach.52pojie.cn/forum/202506/28/030242mvn6jvevcje4eepn.png
4. https://attach.52pojie.cn/forum/202506/28/030246g78f7a75s87j9x5z.png
5. https://attach.52pojie.cn/forum/202506/28/030248azenckecfd2frh2t.png
6. https://attach.52pojie.cn/forum/202506/28/030252r2ec4127e5zeickc.png
7. https://attach.52pojie.cn/forum/202506/28/030301m0ekehgwgwk9zkwk.png
8. https://attach.52pojie.cn/forum/202506/28/030259v9vvyfhav9wtv2mx.png
9. https://attach.52pojie.cn/forum/202506/28/030303iqjc4qjz1ocwxxd4.png
10. https://attach.52pojie.cn/forum/202506/28/030306qfy1p1spv1v91ff6.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 先识别调度器（dispatcher）和 opcode 表，再分离虚拟指令语义。
- 将高频 opcode 做语义映射表，逐步恢复关键计算链路而非一次性全还原。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 一、分析虚拟机架构
- 参考这位师傅的文章
- https://jixun.uk/posts/2024/qqmusic-zzc-sign/
- , 将虚拟机架构代码重新命名了一下
- 该虚拟机是基于寄存器的虚拟框架，所有临时变量、结果都保存在一个寄存器列表中
- function getVariableType(e) {
- return e && "undefined" != typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
- // 这俩虚拟机指令都相同
- function VM() {
- function decodeVM() {}

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
