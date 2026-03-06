# [ Web逆向 ] 【JS逆向系列】某乎__zse_ck参数js与wasm多重套娃地狱级（左篇）

## 原文链接
- https://www.52pojie.cn/thread-1968832-1-1.html

## 逆向目标
- 【JS逆向系列】某乎x96参数与jsvmp初体验

## 关键流程
1. 【JS逆向系列】某乎x96参数与jsvmp初体验
2. 【JS逆向系列】某乎x96参数3.0版本与jsvmp进阶
3. 先下一个脚本断点，然后当使用浏览器无痕模式访问某乎提问题的主页时，并不会直接返回网页源代码，而是返回一个验证的中间页面
4. 这个js主要分成四部分，首先是来了一个常见的ob混淆
5. 这里只看重要的jsvmp和wasm两个部分，jsvmp部分的代码与上一篇的__zse_ck完全一样，但是字节码部分却很奇怪，解码之前字符串有一万多的长度
6. 由之前可知执行每一步都会通过【>> 19】来计算进入哪一组函数，所以在这里下断点，断下是已经解析好字节码
7. 因为代码有ob混淆，所以搜索【>> 0x13】下断点，此时就可以查看this的数据
8. 也就是说这段jsvmp的流程可能是非常短，只是有一个非常大的字符串
9. 还是用之前的方法对这段jsvmp进行反汇编
10. 流程确实很短，前面是一些环境检测，检测不通过的话就会设置一个默认的ck值，但是这个值拿去请求的话，是会返回乱码的内容。
11. 可以看到这是一个很标准的胶水代码，那么就是为了后续加载wasm做准备。到这里对真实的ck还没开始，那么继续往下看
12. 最外层js加载wasm

## 关键图片线索
1. https://attach.52pojie.cn/forum/202409/30/002112oda2nvz9xz5z9fv9.jpg
2. https://attach.52pojie.cn/forum/202409/30/002117czix033tta1bbxxf.jpg
3. https://attach.52pojie.cn/forum/202409/30/002121ykztujppjfnffuu7.jpg
4. https://attach.52pojie.cn/forum/202409/30/002126wv3k3ozsssm999or.jpg
5. https://attach.52pojie.cn/forum/202409/30/002130xgj1gnsxx6tvjjhy.jpg
6. https://attach.52pojie.cn/forum/202409/30/002135alp0ltz9ip0xp40g.jpg
7. https://attach.52pojie.cn/forum/202409/30/002139bwl67g1y6kl6ylmv.jpg
8. https://attach.52pojie.cn/forum/202409/30/002143zzn10gclgxo0nodf.jpg
9. https://attach.52pojie.cn/forum/202409/30/002148vhhm4qfqyqhyfm7z.jpg
10. https://attach.52pojie.cn/forum/202409/30/002153kw7y8ot7d7kyco6s.jpg
11. https://attach.52pojie.cn/forum/202409/30/002157wkj1tl8z2dib82qk.jpg

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 先定位 wasm 加载入口（instantiate/instantiateStreaming），记录 import/export 映射。
- 必要时 wasm2wat 对照分析，重点看参数打包与返回值校验位置。
- 先识别调度器（dispatcher）和 opcode 表，再分离虚拟指令语义。
- 将高频 opcode 做语义映射表，逐步恢复关键计算链路而非一次性全还原。

## 常见坑与规避
- 【JS逆向系列】某乎x96参数3.0版本与jsvmp进阶
- 流程确实很短，前面是一些环境检测，检测不通过的话就会设置一个默认的ck值，但是这个值拿去请求的话，是会返回乱码的内容。
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- TOC
- 前言
- 本片文章在一部分内容中会关联其他文章，建议优先阅读
- 【JS逆向系列】某乎x96参数与jsvmp初体验
- 【JS逆向系列】某乎x96参数3.0版本与jsvmp进阶
- 最外层js逆向分析
- 先下一个脚本断点，然后当使用浏览器无痕模式访问某乎提问题的主页时，并不会直接返回网页源代码，而是返回一个验证的中间页面
- 这个中间页面非常简单，仅仅只加载了一个js文件
- 这个js主要分成四部分，首先是来了一个常见的ob混淆
- 这里只看重要的jsvmp和wasm两个部分，jsvmp部分的代码与上一篇的__zse_ck完全一样，但是字节码部分却很奇怪，解码之前字符串有一万多的长度

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
