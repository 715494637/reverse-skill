# 【JS逆向百例】某坤行 1101，雪球 1038，新 acw_sc__v2 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247506781&idx=1&sn=72a8c9266cebea109d5e632b728dd41d&chksm=c1e27db7f695f4a103b3f368a4100653a53746a10e68b7497619898966309a435804d87997ff#rd
- 发布信息：2025年9月26日 17:13 | 作者：K哥爬虫

## 一、问题画像
aHR0cHM6Ly93d3cuemtoLmNvbS9pdGVtL0FBNjI0MjI5MS5odG1s

## 二、关键文字要点
- 要点1：首先访问详情页，发现他会请求 2 次，第一次返回带混淆的 js 代码：
- 要点2：第二次请求，携带 md5__1101 参数即可返回正常的 html 内容：
- 要点3：某雪球长串短串随机触发（大部分是长串），我们这里点击评论列表的小气泡图标，发起数据请求，其中载荷参数为主要分析对象：
- 要点4：首先我们访问详情页，下脚本断点，发现他在 VMxxx.html 里成功断下，这里发现 href 暂未生成相关参数：
- 要点5：单步跟栈，最终发现在末尾调用 m[l1(Gh.GI)](j, m[l1(Gh.GV)](H, m[l1(Gh.GO)](T, b[l1(Gh.Gp)][l1(Gh.GT)]))) 方法，生成了新的 href 参数：
- 要点6：进入 j 函数，首先通过 sig 函数生成值后，再拼接时间戳等生成新参数，1482973743|0|1757665216486|1，将对应的 sig 算法扣下即可：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrpqO1cicmBnia2lf52SHBiaCR4rONY4OwQRbcydu9VmdaJhiaOpLortf7GJPcevlduXw4Lyq6GwjEvicw/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrpqO1cicmBnia2lf52SHBiaCRzM2f8YL7LTXKzCOplCib5ibcjHrnQk8znEe1kw50mUPLDYyHcJW8ZPGg/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrpqO1cicmBnia2lf52SHBiaCRibXxOUia5VxLIl00IWq52CeqBThicJ0vzibmjwAgRygdxhPf7xQjbvO1DA/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrpqO1cicmBnia2lf52SHBiaCRZwYcOP66suNhrWh6wKmYeE60N53MzZbW5XDCpRU4qh0FQbiaVYLVibBA/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrpqO1cicmBnia2lf52SHBiaCRdzeXRvphDMYsEsQu9gAF7q2sqox5nYvyJnE2I9y0srDrUuNYzfZj4w/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrpqO1cicmBnia2lf52SHBiaCRF9pEicTeCwibsicfCiaEAn1CK7r6kibbBXdq8qxotjV93icXMsbDPGHgzktg/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrpqO1cicmBnia2lf52SHBiaCRC4jAMyVYuuyp5gjwDyQeJbbNYzW8bRqSeDr0uE6SVs53fyJt2sib2Mg/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrpqO1cicmBnia2lf52SHBiaCRASjlYTNyvEJW73IY1PWKpJVGcMkrTu4VvC9utsFnEsc1rIbjuM9JGQ/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：混淆还原 + Cookie/Token + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- 混淆还原
- Cookie/Token
- 补环境
- 1101
- 1038
- acw_sc__v2
