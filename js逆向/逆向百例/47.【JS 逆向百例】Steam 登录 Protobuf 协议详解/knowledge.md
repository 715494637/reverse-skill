# 【JS 逆向百例】Steam 登录 Protobuf 协议详解

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500628&idx=1&sn=0f516df8f792b7d1157a2fc0c2246b75&chksm=c1e265bef695eca83b76ba64f89bb5edae90413d2dad6d9b9f95dde08a90519ebf278d76e036#rd
- 发布信息：2023年12月29日 16:57 | 作者：K哥爬虫

## 一、问题画像
网址：aHR0cHM6Ly9zdG9yZS5zdGVhbXBvd2VyZWQuY29tL2xvZ2luLw==

## 二、关键文字要点
- 要点1：目标：Steam 登录协议逆向分析
- 要点2：输入账密后点击登录，首先看接口 GetPasswordRSAPublicKey/v1，看接口命名可以了解到这个这个接口应该是返回 RSA 加密的公钥信息，先不管这些，观察参数 ，很明显加密参数为 input_protobuf_encoded ：
- 要点3：可以看到 input_protobuf_encoded 的值为 a ，而 a 的值为 r.JQ(o) ：
- 要点4：先看参数 o 的值，为 n.SerializeBody() ，其中 n 是一个对象，包含我们输入的账号信息：
- 要点5：到这就生成了 input_protobuf_encoded 的值，那么还需要解决接口返回值。
- 要点6：到这里第一个接口的请求参数与响应信息我们就都搞定了，这里返回了三个参数：publickey_mod ，publickey_exp，timestamp，很明显是用于进行 RSA 加密的，那么看下一个接口：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LzLTLXOzqJGibeibLbSNeSQuUStvw1JBECCeaelFJsnVIv6Pc24IiaQ2Jbs57rW2kIicHTNqTHUsibtIw/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LzLTLXOzqJGibeibLbSNeSQu9icRHrwfBlMxhVnk7NO7UPrtF75Ga6jo4BIksxd4MFryxEJ8lzjVQJQ/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LzLTLXOzqJGibeibLbSNeSQurV6nq7MrQZDbASkljfRVichMYW1GnLhUia1fFBdVZM7UtAAj9mKcqIzA/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LzLTLXOzqJGibeibLbSNeSQuoTGulcuSxNdhkNrOAZNyVhQPQHVZwBhY6sARIxTkFNap4wq2d1iboQw/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LzLTLXOzqJGibeibLbSNeSQue5MqeeOLIoLD736zA5lwGbBY1Q9k65WSMiaibdiaPNwiahBFfbk6YYQmwQ/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LzLTLXOzqJGibeibLbSNeSQuFic7rkmBGaVfbSnqQUyIQKMibtMF8gia1oMicw2LCdquTrINQIXgbDF8Bw/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LzLTLXOzqJGibeibLbSNeSQu019wsls2prJKrvxMEnTGwrLE1a3Jic9n4eu9YDibtnQkXsxYHwzcQYrg/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LzLTLXOzqJGibeibLbSNeSQu9Dg8jZWXxO2wKca7X8aiayUK6GicCUNjurYCzbicLlnLoiaBxw0ZibBckhA/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：RSA + 协议分析
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- RSA
- 协议分析
- Steam
- Protobuf
