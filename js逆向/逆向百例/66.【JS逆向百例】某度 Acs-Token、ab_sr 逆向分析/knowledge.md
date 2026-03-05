# 【JS逆向百例】某度 Acs-Token、ab_sr 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247507061&idx=1&sn=ed18c249b959300d54d5b88d38e5f6cf&chksm=c1e27a9ff695f389cb0355892e880514643b79df79e225a3af1747d207752e4c8e36d43e2f78#rd
- 发布信息：2025年12月12日 17:52 | 作者：K哥爬虫

## 一、问题画像
最近浏览 CSDN 博客的评论时，看见有位粉丝表示，案例网站做了更新，之前的教程已经失效了。相信很多小伙伴的入门练手案例都有某瓣、某道、某度翻译，因为复杂度相对较低，但是人家也不可能一直都是“软柿子”，这些年也有过几次更新。

## 二、关键文字要点
- 要点1：例如某度翻译，K 哥就曾伴随更新写过两篇文章，22 年新增的 Acs-Token 参数，相关加密算法的 js，最初还自注释为“玉门关”，这应当是尚未完全更新，有些注释都描述的很清晰，后续又更新了几轮，这些痕迹自然就没有了。在加密算法的处理上，也用上了当时较火的 JSVMP，算是上了一道坎。
- 要点2：爬虫教程是有时效性的，大多数网站或多或少都会进行更新，“毕竟得干活”。不过呢，K 哥有空会对失效的教程进行更新，以供粉丝们更好的学习、成长。本文就再次对该站进行逆向分析：
- 要点3：进入网站，打开开发者人员工具，随便输入一个需要查询的英文单词，比如 spider，就能抓包到相关翻译结果的接口。不同翻译方案对应的接口名有所不同，请求参数上，差异不大，相较于之前，还与时俱进的更新了 AI大模型翻译（translateIncognitoAi），不过限制请求频率，当然，这些不在本文的讨论范围内。
- 要点4：请求头中的 Acs-Token 就是本文需要分析的加密参数：
- 要点5：同时，cookie 中还有个 ab_sr 参数，这个参数的生成流程挺有意思的，本文也会对其进行分析：
- 要点6：清除缓存，刷新网页，从数据接口的 cookie 中，复制该参数的值，ctrl + f 查找下，发现其是 abdr 接口响应返回的 cookie 值：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpZdSpufun7IwusafLWVUuSsA5oZLq8YcHhQAcOoET3WL34jmftjBn8oHEALu2SqMDcAJITQ1t9Ag/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpZdSpufun7IwusafLWVUuSRoqj3oiadVxmkPeOKEDL4N2KyaFibPKmMvmWKJIysAACoNjgGcvB8DCA/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpZdSpufun7IwusafLWVUuSVicIJnLFYCV5dfVIaHC4o8iaBF3jtAlZlfsgHG1cMHcAZKaxIMKz4Pnw/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpZdSpufun7IwusafLWVUuS4RqP7jibsUvRuFeIMAZvpYjn8upibBZBftiaw8h5T8rYAFen8nKicxhT0w/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpZdSpufun7IwusafLWVUuSvKjmOYH8VFLz1ePPRia1kUzg8t8ibbZFBA8423r1FxH7t4abc6cGgWaQ/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpZdSpufun7IwusafLWVUuSVOgrkqyZ2r2OyF7Tg5HYZT9WR3k6YO20Wico8TIOK2fFyiazE13stdvQ/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpZdSpufun7IwusafLWVUuSqzst1Toc4TR9lQzeYnVmaHjcHGadsrIp5ribEvfUzNVJiaib3QkjoKh4A/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpZdSpufun7IwusafLWVUuSJOFOLbqsaPmHvwIicjNgUVZ6UVcGzyTosC2jgygLPX496neO3KguFGw/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + Cookie/Token + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 爬虫教程是有时效性的，大多数网站或多或少都会进行更新，“毕竟得干活”。不过呢，K 哥有空会对失效的教程进行更新，以供粉丝们更好的学习、成长。本文就再次对该站进行逆向分析：

## 七、迁移关键词
- AES
- Cookie/Token
- 补环境
- Acs-Token
- ab_sr
