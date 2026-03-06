# [ Web逆向 ] 某里新版acw_sc__v2算法分析

## 原文链接
- https://www.52pojie.cn/thread-2062618-1-1.html

## 逆向目标
- 逆向目标

## 关键流程
1. 抓包分析
2. 打开抓包工具
3. 抓包完成后，过滤url包含queryPage的请求，这个是获取数据的接口
4. 发现有两次post请求
5. 第一次post请求响应如下
6. 1.png
7. 2.png
8. 第二次post请求响应如下
9. 3.png
10. cookie中有了acw_sc__v2
11. 4.png
12. 进入了个混淆过的js环境

## 关键图片线索
1. https://attach.52pojie.cn/forum/202509/25/202848podbjoujq1uj8rd6.png
2. https://attach.52pojie.cn/forum/202509/25/202913if9i6m9m9rvwabvn.png
3. https://attach.52pojie.cn/forum/202509/25/202928t81lwwawwmmkl338.png
4. https://attach.52pojie.cn/forum/202509/25/202931aubsspizq29zpy72.png
5. https://attach.52pojie.cn/forum/202509/25/202934ilitzcscavtc5s5q.png
6. https://attach.52pojie.cn/forum/202509/25/202936cn166kj7076k6rkh.png
7. https://attach.52pojie.cn/forum/202509/25/202938f20kr2kzwg3uz90p.png
8. https://attach.52pojie.cn/forum/202509/25/202851u1ss5yx8so2576br.png
9. https://attach.52pojie.cn/forum/202509/25/202853ucp48unc45oc87b5.png
10. https://attach.52pojie.cn/forum/202509/25/202855p0g7fscomjv8z210.png
11. https://attach.52pojie.cn/forum/202509/25/202857m30muu6y0fo5zh5z.png
12. https://attach.52pojie.cn/forum/202509/25/202900gtt5o6to65bftt65.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 上个版本也是用的这个去生成的acw_sc__v2
- 进入了个混淆过的js环境
- 执行调试后报错了
- 再重新跑一遍这回不卡死了报错了
- 再执行又会进一个try-catch报错
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。

## 主贴关键摘录
- 声明
- 本文章中所有内容仅供学习交流使用，不用于其他任何目的，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者删除。
- 逆向目标
- 目标网站：
- aHR0cHM6Ly9odW5hbi56Y3lnb3YuY24vbHViYW4vYW5ub3VuY2VtZW50L2xpc3Q=
- 抓包分析
- 打开抓包工具
- 抓包完成后，过滤url包含queryPage的请求，这个是获取数据的接口
- 发现有两次post请求
- 第一次post请求响应如下

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
