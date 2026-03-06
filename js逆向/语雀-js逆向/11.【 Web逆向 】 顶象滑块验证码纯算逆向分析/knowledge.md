# [ Web逆向 ] 顶象滑块验证码纯算逆向分析

## 原文链接
- https://www.52pojie.cn/thread-2053068-1-1.html

## 逆向目标
- 逆向目标

## 关键流程
1. 关键要点：图像撕裂还原、轨迹、参数【lid, c, ac】
2. 抓包分析
3. 刷新页面后定位到demo位置，点击滑动拼图查看发送请求
4. 接口 a 请求载荷
5. 接口 a 响应内容
6. 当我们滑动滑块完成验证后会发送一个v1接口的请求
7. ac：包含轨迹的加密参数
8. c：c1接口获取需要逆向
9. sid：a接口响应中获取
10. aid：这里aid要与a接口的aid一致
11. y：a接口响应中获取
12. v1接口响应中的token值是我们本次逆向的最终目标

## 关键图片线索
1. https://attach.52pojie.cn/forum/202508/13/162543ip4g7s4d1i9a7ddi.png
2. https://attach.52pojie.cn/forum/202508/13/162546hwbbwbwf8wk8esf7.png
3. https://attach.52pojie.cn/forum/202508/13/162551gcwnaownq8dyrwqr.png
4. https://attach.52pojie.cn/forum/202508/13/162555vwcjuj0szu9jckaz.png
5. https://attach.52pojie.cn/forum/202508/13/162558lztc51yo97n5l74w.png
6. https://attach.52pojie.cn/forum/202508/13/162600tu435z54yjtfrk44.png
7. https://attach.52pojie.cn/forum/202508/13/162603cjsa7qu6qvzu755x.png
8. https://attach.52pojie.cn/forum/202508/13/162605xgwzt0c5q020rllu.png
9. https://attach.52pojie.cn/forum/202508/13/162608unutusvy9jd94cts.png
10. https://attach.52pojie.cn/forum/202508/13/162610rk4hnzeseybbl3qb.png
11. https://attach.52pojie.cn/forum/202508/13/162612ozavtwufupzvxtqw.png
12. https://attach.52pojie.cn/forum/202508/13/162615oymsrrg84q5yzgj4.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 验证码场景先确认服务端真正校验字段，避免只在前端做无效模拟。
- 轨迹/点击类参数要和时间序列、坐标噪声策略一起复现。

## 常见坑与规避
- 本篇文章以官网demo 5.1.53 版本进行分析，需要注意官网关键js文件每天会动态更新两次
- 这里只需要注意aid的生成
- 注意，它有两个index.js文件，咱分析的这个是带?_t=***的
- getBR：系统、浏览器版本的加密
- getJSV：js版本号的加密
- 滑动距离识别随便找个开源ocr或者用cv2，注意图像的缩放

## 主贴关键摘录
- 声明
- 本文章中所有内容仅供学习交流使用，不用于其他任何目的，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者删除。
- 逆向目标
- 目标网站：
- aHR0cHM6Ly93d3cuZGluZ3hpYW5nLWluYy5jb20vYnVzaW5lc3MvY2FwdGNoYQ==
- 关键要点：图像撕裂还原、轨迹、参数【lid, c, ac】
- 抓包分析
- 本篇文章以官网demo 5.1.53 版本进行分析，需要注意官网关键js文件每天会动态更新两次
- 进入网页，按F12打开调试窗口后刷新页面，建议每次都清理一下缓存或者直接使用无痕模式
- 刷新页面后定位到demo位置，点击滑动拼图查看发送请求

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
