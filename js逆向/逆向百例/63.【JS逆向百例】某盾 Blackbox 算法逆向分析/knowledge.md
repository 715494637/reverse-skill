# 【JS逆向百例】某盾 Blackbox 算法逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247504287&idx=1&sn=e1dbb823124d43aed70d7429f7d172d2&chksm=c1e27775f695fe63d0e047a2215e64a9a5e93da6975195b358d115789c980e5fe305edf5dad7#rd
- 发布信息：2025年1月10日 17:17 | 作者：K哥爬虫

## 一、问题画像
网站：aHR0cHM6Ly93d3cuanVuZXlhb2Fpci5jb20v

## 二、关键文字要点
- 要点1：本文只对某盾 Blackbox 的其中一种算法进行逆向分析，不涉及指纹风控、环境部分。
- 要点2：进入到该函数内，重新下断点刷新网站，单步往下跟，定位到最后 return 处：
- 要点3：我们的重点就是 profile.json 接口的这些请求参数，非常之多，但是不要怕，慢慢来。
- 要点4：查看堆栈，发现和 Blackbox 值最终生成的 js 文件一样，都是 fm.js 文件，也就是 Blackbox 值生成的核心文件，点进去发现有一堆 oQ0Qo0 大数组混淆，定位到 ooQGOO 的生成位置 oQ0Qo0 = ooQGOO(oQ0Qo0);：
- 要点5：oQ0Qo0 就是传入的长字符串， 通过 ooQGOO 函数就生成了 oQ0Qo0 的大数组，可以把 ooQGOO 给扣下来，非常容易，也可以分析 ooQGOO 函数，对这类混淆熟悉的可以直接秒，基本都是一套逻辑：
- 要点6：先解决 QOoooO 函数，其传入接口返回的 tokenId 参数，生成最终的 Blackbox 值，进入该函数，逻辑非常清晰：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToYPeRPgWLxIrNVwh4NFFBurnaib6pX8LNg5B157na6jDOw0miaDQZGDpGbBUvgJN4wl3nscmTQzUZQ/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToYPeRPgWLxIrNVwh4NFFBup3aQyzX3JMy8u1lmrlB3uX8xa4ibIATsfYyI2vUcckgW7SV4ibCuVZLA/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToYPeRPgWLxIrNVwh4NFFBuReQ6wwRUlgYqxFBBDdOHWJTMjtLrz6UCXfjvRJktG4q8qCCAia81dLA/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToYPeRPgWLxIrNVwh4NFFBunGqcykhRxZrYxLpxgh779TpLZiaRtmA4Vb2EgPkia0ibb55cVorQkyw8g/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToYPeRPgWLxIrNVwh4NFFBuAYILv2kzU0TCeEOISaibYRyTMKNxdKXgqiaOeibtChUOEcWsqWsKDVBNw/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToYPeRPgWLxIrNVwh4NFFBuJakb7asdjAkJ8weB8VUA4wwhKDLZHvydJBPhBdkl0jmEt6e5mTHGQA/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToYPeRPgWLxIrNVwh4NFFBut6icyibjEnpxicDnHgicdgAgEmnibWia4iapD00untCxruocPuOOw5Qe7rrwg/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToYPeRPgWLxIrNVwh4NFFBumF4IpNhHAaJEIbFIP44CDNdDy2VTqqnjhCgBDBIfibrcCYoF36r5nRg/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：RSA + 混淆还原 + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- RSA
- 混淆还原
- Cookie/Token
- Blackbox
