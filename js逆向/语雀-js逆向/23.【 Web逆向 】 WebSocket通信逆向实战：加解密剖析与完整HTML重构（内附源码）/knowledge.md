# [ Web逆向 ] WebSocket通信逆向实战：加解密剖析与完整HTML重构（内附源码）

## 原文链接
- https://www.52pojie.cn/thread-2066191-1-1.html

## 逆向目标
- 难得遇到个用websocket的网站，但遇到了都是比较恶心人的，以这个网站为例，记录一下分析过程，加解密不难，难的是websocket的消息处理还原html，话不多说，开搞！

## 关键流程
1. 难得遇到个用websocket的网站，但遇到了都是比较恶心人的，以这个网站为例，记录一下分析过程，加解密不难，难的是websocket的消息处理还原html，话不多说，开搞！
2. aes加密、通信消息获取与还原
3. 1.png
4. 2.png
5. 3.png
6. 把这段函数 r 混淆解一下看看
7. 第二部分：核心逻辑（反调试）
8. 要么写hook脚本注入
9. 4.png
10. 抓包分析
11. sessions接口
12. 载荷加密

## 关键图片线索
1. https://attach.52pojie.cn/forum/202510/16/134741t0fhqyfynxx3l8z7.png
2. https://attach.52pojie.cn/forum/202510/16/134744nv2xwxxjtqjwy3iy.png
3. https://attach.52pojie.cn/forum/202510/16/134747v2cklz3iyiq21g3x.png
4. https://attach.52pojie.cn/forum/202510/16/134749hegepp2z3zyjj4pp.png
5. https://attach.52pojie.cn/forum/202510/16/134751shnenuvhvic2gzie.png
6. https://attach.52pojie.cn/forum/202510/16/134753sbt7f7tj0fh6x6ff.png
7. https://attach.52pojie.cn/forum/202510/16/134757ecpn01j16t0n3n46.png
8. https://attach.52pojie.cn/forum/202510/16/134759ohwhh6olhd5s5ol5.png
9. https://attach.52pojie.cn/forum/202510/16/134802d34vngcepgwvp9vc.png
10. https://attach.52pojie.cn/forum/202510/16/134804tjvztj9e55swev5j.png
11. https://attach.52pojie.cn/forum/202510/16/134808aq8i34imu53m5ui4.png
12. https://attach.52pojie.cn/forum/202510/16/134810agbgbz55iij1gbam.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 第二部分：核心逻辑（反调试）
- 注意请求头headers中需要有Fetch-Mode和etag（动态 iv 值）
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 声明
- 本文章中所有内容仅供学习交流使用，不用于其他任何目的，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者删除。
- 前言
- 难得遇到个用websocket的网站，但遇到了都是比较恶心人的，以这个网站为例，记录一下分析过程，加解密不难，难的是websocket的消息处理还原html，话不多说，开搞！
- 逆向目标
- 目标网站：
- aHR0cDovL3d3dy5jcnNjLmNuL2cyNjcwL202MDkzL21wMS5hc3B4
- 关键要点：
- aes加密、通信消息获取与还原
- 过无限debugger

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
