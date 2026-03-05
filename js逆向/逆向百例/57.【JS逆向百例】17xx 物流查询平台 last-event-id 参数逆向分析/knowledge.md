# 【JS逆向百例】17xx 物流查询平台 last-event-id 参数逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247502977&idx=1&sn=32786288b6029560967c64095dc8026a&chksm=c1e26a6bf695e37dfeae9185376811b677f03868fb80fccd5643e5f094685f7ae41e448b4728#rd
- 发布信息：2024年9月20日 17:57 | 作者：K哥爬虫

## 一、问题画像
目标：17xx 物流查询平台 last-event-id 参数逆向分析

## 二、关键文字要点
- 要点1：目标：17xx 物流查询平台 last-event-id 参数逆向分析
- 要点2：又是经典的 ob 混淆， 这里直接借用 v佬 的插件快速还原，工具地址如下：
- 要点3：看了一下也不需要我们做另外的预处理操作了，只需要把代码 ob 混淆的部分放入工具内就可以还原了：
- 要点4：我们就可以正常抓包分析代码了，目标参数：
- 要点5：通过搜索 last-event-id 就可以定位到，其就在我们解完混淆的文件里：
- 要点6：解完混淆后代码就清晰可见，缺啥扣啥，一步步来就好了，代码也不多，可见 AST 解混淆的重要性。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LprQycDr6Jkye33DEXkGWScHXLd62pwKUc9GJib2uVjpofbDZbjgaR6ZVbvda3RZv1eVCAI8EMgvQ/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToqnSCkIpNwsNAguic9eZm2vswqCHrq3WsrhSmasP4YZbFfJckjxp7Bu8OdyPIERYXKCpViaz4dCnKQ/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToqnSCkIpNwsNAguic9eZm2vdjYTplf2p4lO3Hqh2TdxuYxqHdoKXiamzfribnJsmQz9k4grutcibDWwA/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToqnSCkIpNwsNAguic9eZm2vkFymIgtvzIzx11Mc2u0ceeKfwsu7A4Bfafhcu5GaQ1uCO4OgnWbk7Q/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToqnSCkIpNwsNAguic9eZm2vDiaHh8GV71NZYCSFvuIxbDj9qplBBB02TaSprgkRobibowC2bgId6OMw/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToqnSCkIpNwsNAguic9eZm2vC3XVibDQpDbjE4wW2L36sibT4WwI17OAqicY8Sic4gC0V2x1mkApd0fndA/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToqnSCkIpNwsNAguic9eZm2vic36trDsy3kZ8ZcTjHO2rmA9vvRV6ScfPEIqRCs2CAvO4dibQdUzgIPw/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kToqnSCkIpNwsNAguic9eZm2viaANqcqicDNWtFzVibsy990q0NaP7Nm1hBbnRPKIb7rZIWQrNzAe3U0vg/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：MD5 + 混淆还原 + Hook + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- MD5
- 混淆还原
- Hook
- Cookie/Token
- 17xx
- last-event-id
