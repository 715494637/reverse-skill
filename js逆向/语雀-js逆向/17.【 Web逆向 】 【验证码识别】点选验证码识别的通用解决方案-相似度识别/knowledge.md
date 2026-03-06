# [ Web逆向 ] [验证码识别]点选验证码识别的通用解决方案-相似度识别

## 原文链接
- https://www.52pojie.cn/thread-1888314-1-1.html

## 逆向目标
- yolov5目标检测

## 关键流程
1. 1.png
2. 2.png
3. 老样子，我们将下载好的图片按照内容计算MD5值，保存到本地。（当然也可以不用怎么干）
4. 3.png
5. 4.png
6. 5.png
7. 6.png
8. 7.png
9. 8.png
10. 9.png
11. 10.png
12. input1 = cv2.resize(image1, (105, 105)).astype(np.float32) / 255

## 关键图片线索
1. https://attach.52pojie.cn/forum/202402/05/213355whww4iz4o9mmih05.png
2. https://attach.52pojie.cn/forum/202402/05/213410ridy7y1zt17a1s6w.png
3. https://attach.52pojie.cn/forum/202402/05/213417fza39moyvplvu93m.png
4. https://attach.52pojie.cn/forum/202402/05/213421ugnwbnebfmfdwznn.png
5. https://attach.52pojie.cn/forum/202402/05/213424g17mmra77vuirz4v.png
6. https://attach.52pojie.cn/forum/202402/05/213433nuzs0pqa0932l5pc.png
7. https://attach.52pojie.cn/forum/202402/05/213436qmvvdgm33lvz333c.png
8. https://attach.52pojie.cn/forum/202402/05/213437rv0otnevuoopz2en.png
9. https://attach.52pojie.cn/forum/202402/05/213439cjhspoouj888s0aw.png
10. https://attach.52pojie.cn/forum/202402/05/213441fa5ttkaaww0mcn15.png
11. https://attach.52pojie.cn/forum/202402/05/213444m35zrq771dn3d303.png
12. https://attach.52pojie.cn/forum/202402/05/213446wxyfy2yz8iq8onfj.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 验证码场景先确认服务端真正校验字段，避免只在前端做无效模拟。
- 轨迹/点击类参数要和时间序列、坐标噪声策略一起复现。

## 常见坑与规避
- 注意事项
- 总结和注意事项
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 本帖最后由 s1lencee 于 2024-2-5 21:40 编辑
- [验证码识别]点选验证码识别的通用解决方案-相似度识别
- 本文章所有内容仅供学习和研究使用，本人不提供具体模型和源码。若有侵权，请联系我立即删除！维护网络安全，人人有责。
- 前言
- 最近发了个关于机器学习的教程，没想到大家都挺感兴趣的。
- 1.png
- (653.53 KB, 下载次数: 0)
- 下载附件
- 2024-2-5 21:33 上传
- 点选验证码是比较常见的验证码之一，主要有3种:

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
