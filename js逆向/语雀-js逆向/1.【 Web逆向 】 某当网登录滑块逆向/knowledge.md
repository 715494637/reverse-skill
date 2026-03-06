# [ Web逆向 ] 某当网登录滑块逆向

## 原文链接
- https://www.52pojie.cn/thread-2025578-1-1.html

## 逆向目标
- 目标：实现账号的登录，滑块验证。

## 关键流程
1. 本文章中所有内容仅供学习交流，抓包内容、敏感网址、数据接口均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关，若有侵权，请联系我立即删除！
2. 1. 随便输入手机号和密码，手动滑动滑块实现登录全过程，在控制台可以看到一些主要的请求，从后往前分析，看看每个请求需要的参数，主要四次请求。
3. isShowSlide 原本以为是对参数的验证，结果是无需理会
4. accountLogin 登录接口
5. 2.登录需要的参数有很多需要分析，主要分析是sign的生成过程，token是
6. getSlidingVerifyCode 返回结果数据，check_token 是验证滑块后
7. 3.首先是先获得滑块的图片，可以看到主要有三个参数。前两个permanent_id requestid 在这四次请求中同时存在，值还是一样的。直接搜索sign或者hook JSON，xhr断点指定接口等
8. 4.直接搜索sign 返回不多，主要两个打上断点，再次请求，可以看到变量n 就是一些请求参数，r就是最终sign的值，加密有的结果在赋值到n中，
9. 5.
10. D.state.requestId 返回requestId 刚开始我以为这个值是js生成的，在往上跟栈找着找着发现是接口返回的数据，首先重新刷新网站，再次断到当前位置，直接打印requestid的结果，直接搜索。
11. 6.
12. requestId 直接是一个接口返回值，请求参数也是先获得

## 关键图片线索
1. https://attach.52pojie.cn/forum/202504/19/123644d3dch7hu7c9xod7x.png
2. https://attach.52pojie.cn/forum/202504/19/124929bd4thiybyhunowtw.png
3. https://attach.52pojie.cn/forum/202504/19/125003ra7b0a738vrq9a7k.png
4. https://attach.52pojie.cn/forum/202504/19/124730i5v1d1idlkvvnc5l.png
5. https://attach.52pojie.cn/forum/202504/19/125313sl4gwgnq5iwmh0xj.png
6. https://attach.52pojie.cn/forum/202504/19/130413vqu5v4nk57d5v7qy.png
7. https://attach.52pojie.cn/forum/202504/19/131035n6f6czi5yccvj5ya.png
8. https://attach.52pojie.cn/forum/202504/19/130806rh2poo2m9io0siat.png
9. https://attach.52pojie.cn/forum/202504/19/131857gvfwcf6h8lwzv5vc.png
10. https://attach.52pojie.cn/forum/202504/19/131950jvpnkddejmpkem13.png
11. https://attach.52pojie.cn/forum/202504/19/132023qe8ljjlqqjl3qg5u.png
12. https://attach.52pojie.cn/forum/202504/19/132253rdbm7w4212b1cer4.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 验证码场景先确认服务端真正校验字段，避免只在前端做无效模拟。
- 轨迹/点击类参数要和时间序列、坐标噪声策略一起复现。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 11. 哦对，还有一个t参数，是时间戳，这样就可以拿到rankey和requestId，需要注意的是，在请求
- getSlidingVerifyCode 接口时，注意一下参数，密钥就是
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 本文章中所有内容仅供学习交流，抓包内容、敏感网址、数据接口均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关，若有侵权，请联系我立即删除！
- 目标：实现账号的登录，滑块验证。
- 网站：
- aHR0cHM6Ly9sb2dpbi5kYW5nZGFuZy5jb20vIw==
- 说明 本文主要是对该网站实现登录，逆向其中遇到的滑块。
- 1. 随便输入手机号和密码，手动滑动滑块实现登录全过程，在控制台可以看到一些主要的请求，从后往前分析，看看每个请求需要的参数，主要四次请求。
- image.png
- (32.52 KB, 下载次数: 1)
- 下载附件
- 2025-4-19 12:36 上传

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
