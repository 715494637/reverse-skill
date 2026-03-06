# [ Web逆向 ] reese84 及___utmvc 逆向流程分析

## 原文链接
- https://www.52pojie.cn/thread-1912763-1-1.html

## 逆向目标
- 目标网站

## 关键流程
1. 本文章中所有内容仅供学习交流，抓包内容、敏感网址、数据接口均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关，若有侵权，请联系我立即删除！
2. 这里主要搞一下 ___utmvc 和 reese84的cookie流程分析
3. 对了 很多网站还附带一个___utmvc cookie的生成。流程这里在前言讲一下。
4. 1.png
5. 2.png
6. 然后是一段ob。给他解出来。用ast去解就行了。
7. function decry_str(ast) {
8. traverse(ast, {
9. return ast;
10. 其次合并大数组 完成大数组解密
11. 到这一步已经解的差不多了。还有一些函数的还原的ast
12. 等全部解混淆之后，难度就低很多了。找到cookie生成的地方 慢慢扣吧。

## 关键图片线索
1. https://attach.52pojie.cn/forum/202410/12/161206joqcuc2bkkmk6vqv.png
2. https://attach.52pojie.cn/forum/202410/12/161208e8lg2lgxjyy11jxf.png
3. https://attach.52pojie.cn/forum/202410/12/161210hx5ixpf5z010i0w5.png
4. https://attach.52pojie.cn/forum/202410/12/161213l4ooemv5fomh6m55.png
5. https://attach.52pojie.cn/forum/202410/12/161215gmgb9v0mnw11g0k1.png
6. https://attach.52pojie.cn/forum/202410/12/161217zgmdr7y957vpjsvj.png
7. https://attach.52pojie.cn/forum/202410/12/161219e4yyy6kawr9wwt09.png
8. https://attach.52pojie.cn/forum/202410/12/161221ko6r6yro262xxv6x.png
9. https://attach.52pojie.cn/forum/202410/12/161223o1f8hdfb1bfrp5bn.png
10. https://attach.52pojie.cn/forum/202410/12/161225kyw4m7q51owm8or4.png
11. https://attach.52pojie.cn/forum/202410/12/161227ipaargygxyamoaig.png
12. https://attach.52pojie.cn/forum/202410/12/161229nw0m1lw9w1bwmj11.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 声明
- 本文章中所有内容仅供学习交流，抓包内容、敏感网址、数据接口均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关，若有侵权，请联系我立即删除！
- 目标网站
- aHR0cHM6Ly93d3cuZmx5c2Nvb3QuY29tL3po
- 前言
- 随便搞搞。。自己也是一知半解的。这里做个记录。
- 这里主要搞一下 ___utmvc 和 reese84的cookie流程分析
- ___utmvc
- 生成详解
- 对了 很多网站还附带一个___utmvc cookie的生成。流程这里在前言讲一下。

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
