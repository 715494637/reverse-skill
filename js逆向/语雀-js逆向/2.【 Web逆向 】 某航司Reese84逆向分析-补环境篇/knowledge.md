# [ Web逆向 ] 某航司Reese84逆向分析-补环境篇

## 原文链接
- https://www.52pojie.cn/thread-2062377-1-1.html

## 逆向目标
- 逆向目标

## 关键流程
1. 抓包分析
2. 1.png
3. 此时会打开一个tab页跳转新的链接，速度将链接复制下来，后续直接访问这个链接抓包，就不用每次进首页填信息搜索了
4. 这个网站有两种请求链接的方式可以获取到目标加密参数
5. 这里我使用抓包工具Reqable来展示（很好用的工具赶紧出3.0！！）
6. 2.png
7. 发送了三次请求，一次get两次post
8. get请求 ?s= 后面的是每次请求都会变更的
9. 这是我们需要主要分析的，加密逻辑基本都在这个js里面
10. 第一次post请求
11. 3.png
12. 解码后样式如下，包含一些字段参数，在主逻辑中需要用到

## 关键图片线索
1. https://attach.52pojie.cn/forum/202509/24/200319kyy2p80umy3uz38t.png
2. https://attach.52pojie.cn/forum/202509/24/200344pdhzjhwjsx47n4sn.png
3. https://attach.52pojie.cn/forum/202509/24/200409cl4ddnlr71d4nld4.png
4. https://attach.52pojie.cn/forum/202509/24/200431r6uukj60djdz886t.png
5. https://attach.52pojie.cn/forum/202509/24/200439u7qgzs8vw2p28el8.png
6. https://attach.52pojie.cn/forum/202509/24/200441r3uon3f7vti8myno.png
7. https://attach.52pojie.cn/forum/202509/24/200444h4fi8cthhztthnlg.png
8. https://attach.52pojie.cn/forum/202509/24/200446uhu66a5yhi8w08eq.png
9. https://attach.52pojie.cn/forum/202509/24/200448rozexqotad4ahby8.png
10. https://attach.52pojie.cn/forum/202509/24/200323c1wubkqkwqzau7nq.png
11. https://attach.52pojie.cn/forum/202509/24/200325youkuwza9qu45h4k.png
12. https://attach.52pojie.cn/forum/202509/24/200327p2dhtzrn3b5dfg8g.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 补环境返回完整的载荷直接用就行
- 总结就是用动态链接的js或者固定连接的js补环境都可以
- 下面以动态链接方式作为补环境分析目标
- 然后将第二部分代码执行，声明出解密环境
- 替换有一个关键点需要注意，解混淆文件中有一个路径代码如下
- 不然替换后会报错，报错看控制台提示如下就说明得改路径了

## 主贴关键摘录
- 声明
- 本文章中所有内容仅供学习交流使用，不用于其他任何目的，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者删除。
- 逆向目标
- 目标网站：
- aHR0cHM6Ly93d3cudGhhaWFpcndheXMuY29tL2VuLXVzLw==
- 抓包分析
- 进入页面后选择单程航班，填写完出发和到达地等基础信息后点击Search Flights搜索航班
- 1.png
- (40.24 KB, 下载次数: 3)
- 下载附件

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
