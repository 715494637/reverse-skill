# [ Android 原创 ] 某密企业版加固反调试与VMP分析

## 原文链接
- https://www.52pojie.cn/thread-2093062-1-1.html

## 逆向目标
- 某密企业版加固反调试与VMP分析

## 关键流程
1. 某密企业版加固反调试与VMP分析
2. 本来想的是来分析一下这些加固方案来对frida和lsp进行魔改优化的，但是分析到后面感觉可以学习的东西还是蛮多的，就将爱加密企业版加固继续分析了一下，目前的进度是基本上将vmp给还原出来啦，但是还没有找到被保护的方法名到opcode之间是怎么进行映射的，如果有对这个爱加密企业版分析的大佬，欢迎交流一下一下，教教弟弟
3. 混淆去除
4. 我们要分析的基本上就是libexec.so和libexecmain.so，然后经过我的分析这个libexec.so应该是主要的加固逻辑，比如vmp，frida检测，fart检测，lsp检测等等，这个libexecmain.so呢主要作用就是配合libexec.so的vmp保护来使用的，就我发现的两个点：第一个就是java层函数转换成native函数是在libexecmain.so中进行注册的；第二个呢就是vmp有一层opcode的转换，这个转换就是在libexecmain.so中进行的
5. function my_hook_dlopen(soName) {
6. this.is_can_hook = true;
7. if (this.is_can_hook) {
8. setImmediate(my_hook_dlopen("libexec.so"));//libexec.so为要进行内存dump的so文件名称
9. br混淆&字符串混淆
10. 1、字符串被混淆了
11. 2、br混淆，ollvm混淆导致很难分析
12. 可以看到有一个这样的混淆，另外就是可以看看字符串，可以看到一些具有价值的字符串，但是会缺少一些检测的字符串，例如：frida，fart，lsp等等

## 关键图片线索
1. https://attach.52pojie.cn/forum/202602/25/110418ig30r3iz1i13glt7.png
2. https://attach.52pojie.cn/forum/202602/25/110422iod55ilg22u5ei5d.png
3. https://attach.52pojie.cn/forum/202602/25/110424f0n9ee1h2952905w.png
4. https://attach.52pojie.cn/forum/202602/25/110427x1zf68rrmc888hz7.png
5. https://attach.52pojie.cn/forum/202602/25/110429qrqd6096z0s7zss7.png
6. https://attach.52pojie.cn/forum/202602/25/110432gjfmenmilg00jzma.png
7. https://attach.52pojie.cn/forum/202602/25/110434sz80uhlqmim8pvir.png
8. https://attach.52pojie.cn/forum/202602/25/112850k0042100o43k4c0z.png
9. https://attach.52pojie.cn/forum/202602/25/110437metpxethwhttcew0.png
10. https://attach.52pojie.cn/forum/202602/25/110440v16tm7dzztzfwvwy.png
11. https://attach.52pojie.cn/forum/202602/25/110442i8j92a228fqmme2m.png
12. https://attach.52pojie.cn/forum/202602/25/110445wzz7i7z0z2ikqrma.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 先识别调度器（dispatcher）和 opcode 表，再分离虚拟指令语义。
- 将高频 opcode 做语义映射表，逐步恢复关键计算链路而非一次性全还原。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 某密企业版加固反调试与VMP分析
- # 如果自动获取失败，请手动填入 str_crypto 的地址 (例如: 0xA2050)
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 本帖最后由 xiaowaaa 于 2026-2-26 16:17 编辑
- 某密企业版加固反调试与VMP分析
- 前言：
- 如有侵权，联系删除
- 本来想的是来分析一下这些加固方案来对frida和lsp进行魔改优化的，但是分析到后面感觉可以学习的东西还是蛮多的，就将爱加密企业版加固继续分析了一下，目前的进度是基本上将vmp给还原出来啦，但是还没有找到被保护的方法名到opcode之间是怎么进行映射的，如果有对这个爱加密企业版分析的大佬，欢迎交流一下一下，教教弟弟
- 混淆去除
- 我们要分析的基本上就是libexec.so和libexecmain.so，然后经过我的分析这个libexec.so应该是主要的加固逻辑，比如vmp，frida检测，fart检测，lsp检测等等，这个libexecmain.so呢主要作用就是配合libexec.so的vmp保护来使用的，就我发现的两个点：第一个就是java层函数转换成native函数是在libexecmain.so中进行注册的；第二个呢就是vmp有一层opcode的转换，这个转换就是在libexecmain.so中进行的
- So dump
- 我们先看libexec.so就行，这个so需要我们从内存中dump下来，然后才可以分析，要不然都没法看
- 两种dump方法，应该是第二种可以dump下来，不过这些dump so的方法都有很多，网上的教程代码也很多，直接网上找一下就行。另外我有看到有师傅会说遇到中间不可读的内存怎么dump，我之前也遇到一次，那个时候直接用gg修改器dump的内存，这个没看到出现有内存权限的问题，有兴趣的大佬可以去看看

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
