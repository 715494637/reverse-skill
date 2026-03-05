# 【JS逆向百例】某江 Hospital 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247504155&idx=1&sn=cf4c953327689bd441ea19ccf1cb4ba4&chksm=c1e277f1f695fee75b895010a7b38155fe2528ad09b3639959608c71d2682bbe852c2d9cf9ac#rd
- 发布信息：2024年12月27日 17:49 | 作者：K哥爬虫

## 一、问题画像
最近又有小伙伴在逆向某网站的时候，碰到了点棘手的问题，过来询问 K 哥。经过分析，该网站既有加密参数，又使用了 WebSocket 协议来传输数据，正好可以丰富 JS 逆向百例专栏。本文将对其进行逆向分析，仅作为学习研究：

## 二、关键文字要点
- 要点1：最近又有小伙伴在逆向某网站的时候，碰到了点棘手的问题，过来询问 K 哥。经过分析，该网站既有加密参数，又使用了 WebSocket 协议来传输数据，正好可以丰富 JS 逆向百例专栏。本文将对其进行逆向分析，仅作为学习研究：
- 要点2：打开开发者人员工具，刷新网页，会发现被断住了，经典的无限 debugger。不过，如果直接在 debugger 处，右键选择 Nerver pause here（永不在此处暂停），下步断点后，能正常抓到包，以为绕过了，但是当你调试的时候，再次刷新页面，就会发现，页面卡死，一直转圈圈：
- 要点3：这段代码的逻辑就是通过递归调用，和一些判断条件（如 t 是 20 的倍数时）来不断的触发 debugger 语句，使得 JavaScript 调试器被不断的激活，阻止正常的执行流程。
- 要点4：这个站的无限 debugger 较为普通，直接替换、改写，或者 hook 都可以，以下提供几个 hook 脚本，以供参考：
- 要点5：过掉之后，就能正常抓到包了，网页中的公告相关数据，直接 ctrl + f 搜索，是找不到的，翻了一会，看到一个很特别的接口，Type 为 websocket，那么是否可能是通过 websocket 协议传输的数据呢？
- 要点6：成功找到了我们想要的文本数据，证明确实是通过 websocket 协议传输的关键数据，当然 hook 跟栈分析，也能验证。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp6ZDoTichYUxnG3cgsjkHZOO9naqRCotqDwb0FAcpPklsgr7L7eg8OY471XqFtRibx5O6G8PicqOJeg/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp6ZDoTichYUxnG3cgsjkHZO0oAjS0MibLevu7LLvIZ9ENC9KmkAdhom7yKfA6DzRukZfpNSnxWbdOA/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp6ZDoTichYUxnG3cgsjkHZOGVYdMtUO47BHdKUQW1O8Xnsju9eP0Afw2VS1icVGJoBuibcIBMqjZX2Q/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp6ZDoTichYUxnG3cgsjkHZO3Nb0RgRM0QrEc258KCQ14H0haumJ3a0y0RSNJQhDjn9dlUq1OMFLEw/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp6ZDoTichYUxnG3cgsjkHZOBS1QzV6TbKNiabMeNibMlZIe9CfMC0sHia2FeRia4MyLqtmoN2WDOhwicFg/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp6ZDoTichYUxnG3cgsjkHZOT3cwMiaiayMQFChpwA5HuP70KqcU8bSvtQZr5TDMQWBo8EqzT9mT8iasQ/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp6ZDoTichYUxnG3cgsjkHZOxNqqia4D5pcP33kF1s0jNo9auI7GGAwH35mBgKfCImsf7xIOsVuoTGw/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp6ZDoTichYUxnG3cgsjkHZO2bMWEAeRlyLAYbYpACrKjiaMXalQicYUdNt5MeQQULL6vfg9TiabGqZQQ/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + Hook + 反调试 + WebSocket + 协议分析
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 打开开发者人员工具，刷新网页，会发现被断住了，经典的无限 debugger。不过，如果直接在 debugger 处，右键选择 Nerver pause here（永不在此处暂停），下步断点后，能正常抓到包，以为绕过了，但是当你调试的时候，再...

## 七、迁移关键词
- AES
- Hook
- 反调试
- WebSocket
- 协议分析
- Hospital
