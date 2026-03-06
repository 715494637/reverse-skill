# [ Web逆向 ] 某手势验证码纯算逆向分析

## 原文链接
- https://www.52pojie.cn/thread-2051922-1-1.html

## 逆向目标
- 逆向目标

## 关键流程
1. 关键要点：canvas指纹、参数en、图片还原、手势轨迹
2. 抓包分析
3. config接口分析
4. 请求载荷：
5. 响应内容：包含关键参数knock和一些版本信息
6. get获取验证码接口分析
7. k：前面请求config接口返回的值
8. origin_url：当前请求网页的地址
9. en：经过加密生成的
10. 响应内容：包含图片的链接以及一些后续需要用到的参数
11. validate验证接口分析
12. 请求载荷：差别不大，加密参数en中包含了轨迹

## 关键图片线索
1. https://attach.52pojie.cn/forum/202508/08/134357onnrrkcnw94ccww9.png
2. https://attach.52pojie.cn/forum/202508/08/134450d7m366uhgm32e62w.png
3. https://attach.52pojie.cn/forum/202508/08/134542th3soogkn3sclnvb.png
4. https://attach.52pojie.cn/forum/202508/08/134631hooohvy2e4ohnlp0.png
5. https://attach.52pojie.cn/forum/202508/08/134731q99tjfjm5zrn3jj9.png
6. https://attach.52pojie.cn/forum/202508/08/134800cx3zlg7hlcjzlqbc.png
7. https://attach.52pojie.cn/forum/202508/08/134857p342z3ay3esw4on2.png
8. https://attach.52pojie.cn/forum/202508/08/134946d8ez7azx8ata4p48.png
9. https://attach.52pojie.cn/forum/202508/08/135032cqf6g6mwumqgqs3q.png
10. https://attach.52pojie.cn/forum/202508/08/135453naqeql4gjmie4q5o.png
11. https://attach.52pojie.cn/forum/202508/08/135532dldm79r47it88rtf.png
12. https://attach.52pojie.cn/forum/202508/08/135602rxll9tl48yn62n2s.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 验证码场景先确认服务端真正校验字段，避免只在前端做无效模拟。
- 轨迹/点击类参数要和时间序列、坐标噪声策略一起复现。

## 常见坑与规避
- 响应内容：包含关键参数knock和一些版本信息
- 进入后发现它return了一个Promise，逐步分析后，可以得知最终返回的是 _0x297a60 的值。它是由一套环境经过murmurhash算法后生成的，环境可以先抠下来写死。之后再判断 _0x4d7c27，如果为true则直接返回_0x297a60，否则将_0x297a60切割前八位后返回
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 声明
- 本文章中所有内容仅供学习交流使用，不用于其他任何目的，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者删除。
- 逆向目标
- 目标网站：aHR0cHM6Ly93d3cudmFwdGNoYS5jb20vI2RlbW8=
- 关键要点：canvas指纹、参数en、图片还原、手势轨迹
- 抓包分析
- config接口分析
- config.png
- (32.94 KB, 下载次数: 8)
- 下载附件

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
