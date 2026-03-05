# 人均瑞数系列，瑞数 6 代 JS 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500618&idx=1&sn=8b60f6406af04e65cff75efa54c08795&chksm=c1e265a0f695ecb650ddab1711edfd4935e4a122a55bcf923f3b50ffccc3c28ec1dba9ae22f3#rd
- 发布信息：2023年10月20日 17:19 | 作者：K哥爬虫

## 一、问题画像
转载十一姐优质好文：js逆向思路-区分瑞数vmp/6/5/4/3反爬

## 二、关键文字要点
- 要点1：转载十一姐优质好文：js逆向思路-区分瑞数vmp/6/5/4/3反爬
- 要点2：与以往的四代、五代一样，定位 Cookie，首选 Hook，通过 Fiddler 插件、油猴脚本、浏览器插件等方式注入以下 Hook 代码：
- 要点3：(function() { var cookieTemp = ""; Object.defineProperty(document, 'cookie', { set: function(val) { console.log('Hook捕获到cookie设置->', val); debugger; cookieTemp = val; return val; }, get: function() { return cookieTemp; }...
- 要点4：参考 5 代文章：人均瑞数系列，瑞数 5 代 JS 逆向分析
- 要点5：与五代一致，用本地替换固定一套代码。通过 (947, 1) 定位到加密流程入口，开始进行流程分析，从现在开始只需要 F9 操作，并且做好记录，其中大部分流程与 5 代一致，可以参考之前的文章。下文中不会对流程中的每一步进行讲解，只会记录对结果有影响的关键步骤。
- 要点6：先看参数 _$yx._$N$ 的值，AMEExbhbQVYKGNjj8cTp.A，通过全局搜索可以发现这个值是在 JS 文件中：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LprQycDr6Jkye33DEXkGWScHXLd62pwKUc9GJib2uVjpofbDZbjgaR6ZVbvda3RZv1eVCAI8EMgvQ/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4L5N8Bib0MOAlRUfcn9Pe7ial3V2dMywDjEl96P7SufzkXfEAOR1M3F4tDDP4exFlqgfLibttUnibXALQ/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4L5N8Bib0MOAlRUfcn9Pe7ialBlY0yticiciaAZMVqaZXSLgoX0a5JmZMjuiarV0b3jcM8NqVzRFIicfaHGg/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4L5N8Bib0MOAlRUfcn9Pe7ialwK6wQFpCiasOYNqpoRzvUf47lATVSK9ZB3k4ibRnngJia71ibuvLGsZBXw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4L5N8Bib0MOAlRUfcn9Pe7ial18bUicPhI6KNjeRICJ8e5KxI21GQ7ejc5BcjHBtUqF8wP4DYH3icywLg/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4L5N8Bib0MOAlRUfcn9Pe7iald7CBGvmLH8f36meqm0WwiaPx409zbCuwu8qicEkQTaeEKoU9zInnc5SQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4L5N8Bib0MOAlRUfcn9Pe7ialMWCZIhDiaYc6OhY0LL8Szu1s1KZ2uwzv4QhyOiaEAwCLOiaY7BfeMYGgg/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4L5N8Bib0MOAlRUfcn9Pe7ial4qnhswG0PSicSaBicrib2RxGruXkd3CictcLWUJ5MsclcLic4iadOI3BwSyw/640?wx_fmt=png

## 四、精华技能
- 技能定位：Hook + 反调试 + Cookie/Token + 验证码/风控 + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- Hook
- 反调试
- Cookie/Token
- 验证码/风控
- 补环境
