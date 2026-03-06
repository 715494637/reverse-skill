# [ Web逆向 ] 某盾无感验证码逆向 - 1

## 原文链接
- https://www.52pojie.cn/thread-2049010-1-1.html

## 逆向目标
- 某盾无感验证码逆向

## 关键流程
1. 快速定位
2. 这里我们选择无感下的绑定自有验证按钮（这个方便），打开控制台抓个包看看。我们很清晰明了的就可以知道这个验证接口：
3. check接口
4. 简单的重放攻击看看失败和成功结果之间的差异。
5. 表示本次请求是否通过检测。那么接下来观察负载，看看需要哪些加密参数。
6. 简单观察一下负载，大概可以推断出几个关键参数：
7. token
8. 还是老步骤，先搜索看看这些加密参数是否来自于其他的包。果不其然，我们会发现：
9. 2.png
10. 3.png
11. irToken
12. 包。这个包也是困难重重，参数一眼望去几乎全是要逆向的。而且这个参数命名方式太过简单(

## 关键图片线索
1. https://attach.52pojie.cn/forum/202507/27/182724gjbev8jn7avzb7l1.png
2. https://attach.52pojie.cn/forum/202507/27/182729ttzkztrlluukjrlw.png
3. https://attach.52pojie.cn/forum/202507/27/182739qcqnnncmm8nm7m34.png
4. https://attach.52pojie.cn/forum/202507/27/182742kdtaej1lh1t4ie0q.png
5. https://attach.52pojie.cn/forum/202507/27/182733aeugga9whjeani65.png
6. https://attach.52pojie.cn/forum/202507/27/182736zh21c3ypww1cbu9c.png
7. https://attach.52pojie.cn/forum/202507/27/182744uwww2j8x3mo8odqx.png
8. https://attach.52pojie.cn/forum/202507/27/182751nza89ia5mdn5di1h.png
9. https://attach.52pojie.cn/forum/202507/27/182754djcvqsjvhhle9iij.png
10. https://attach.52pojie.cn/forum/202507/27/182805z5353nx2724gn10l.png
11. https://attach.52pojie.cn/forum/202507/27/182807x8f7i9as7pswpzb7.png
12. https://attach.52pojie.cn/forum/202507/27/182810qvqa4xav85xajexx.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 验证码场景先确认服务端真正校验字段，避免只在前端做无效模拟。
- 轨迹/点击类参数要和时间序列、坐标噪声策略一起复现。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 简单的重放攻击看看失败和成功结果之间的差异。
- 这里有一个坑，可能有些小伙伴扣完代码，一跑，欸，为什么不出值。这里就是一个调试的小技巧了，我们扣代码的时候一定要把全部的异常捕获都给杀掉。只有抛出异常，我们才知道哪里出错了。
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 本帖最后由 utf8 于 2025-7-31 20:12 编辑
- 某盾无感验证码逆向
- 本文仅供学习交流，因使用本文内容而产生的任何风险及后果，作者不承担任何责任，一起学习吧
- 目标网站：aHR0cHM6Ly9kdW4uMTYzLmNvbS90cmlhbC9zZW5zZQ==
- 快速定位
- 这里我们选择无感下的绑定自有验证按钮（这个方便），打开控制台抓个包看看。我们很清晰明了的就可以知道这个验证接口：
- check接口
- 简单的重放攻击看看失败和成功结果之间的差异。
- 经过测试我们会发现，
- result

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
