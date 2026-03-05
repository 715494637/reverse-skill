# 【JS 逆向百例】网洛者反爬练习平台第三题：AAEncode 加密

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500525&idx=1&sn=6da64add024da99da9c503dba4c1e2d7&chksm=c1e26407f695ed1137a74e74db9970c4ccaebf0ae2f89fcfdcb9ee09671f01f490c0a05e82a5#rd
- 发布信息：2021年12月16日 16:12 | 作者：K哥爬虫

## 一、问题画像
链接：http://spider.wangluozhe.com/challenge/3

## 二、关键文字要点
- 要点1：目标：网洛者反反爬虫练习平台第三题：AAEncode 加密
- 要点2：简介：本题仍然是要求采集100页的全部数字，并计算所有数据加和，需要抠出源码进行计算，主要使用了 AAEncode 加密
- 要点3：经过 AAEncode 混淆之后的代码：
- 要点4：AAEncode 解混淆的方式和 JJEncode 类似，很简单，以下介绍几种常见的方法：
- 要点5：3.在线调试，在 AAEncode 代码第一行下断点，然后一步一步执行，最终也会在虚拟机（VM）里看到源码；
- 要点6：逆向的目标主要是翻页接口 _signature 参数，调用的加密方法仍然是 window.get_sign()，和前面两题是一样的，本文不再赘述，不清楚的可以去看 K 哥上期的文章。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JpIJPA8LeKBYdQCwYFVc8YMfjia7ticoaY3URAwhiaPU7cIpPfcRMRfpaEGN2oVNlzFwctibPGibE5dvg/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JpIJPA8LeKBYdQCwYFVc8YicGyQc2KItlWwgAoG6iaoyQJ68ibTuGHhicdEX99shKMxlicYsBtWCepqIg/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JpIJPA8LeKBYdQCwYFVc8Yxqkshx9ooFLamEZ8EFV6icLicVVpMSJnWYolcdvPVZzicHeTKzDtibXHVg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JpIJPA8LeKBYdQCwYFVc8YdF70YRSiaRjHACjurj1Nzua4U2JoFRiamYm0Nla4Rh6d6Axlhv11X3ww/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JpIJPA8LeKBYdQCwYFVc8YBTialVfIcnPrMbASrWqoW3hhgsfmRLnWslDxSI6Wn4FDVmdvuicvXjibg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JpIJPA8LeKBYdQCwYFVc8YSAVtXHPbhOrLmd47lT97FSSa8z1fwibYJVTHTK6HYmvvLRFlvZEj07A/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JpIJPA8LeKBYdQCwYFVc8Y8w10bwUqpN1zhrNTZbz1MOeA14xXWum9wSzicic5CWca2N7ua83GiaQQA/640?wx_fmt=png

## 四、精华技能
- 技能定位：混淆还原 + Hook + Cookie/Token + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- 混淆还原
- Hook
- Cookie/Token
- 补环境
- AAEncode
