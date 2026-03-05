# 【JS 逆向百例】复杂的登录过程，最新WB逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500497&idx=1&sn=217192ce8d74da0c2869a2e4a1948fc6&chksm=c1e2643bf695ed2da2329113e0867ee6a8235cc95e417881a636013df3a7f399b462e88751b7#rd
- 发布信息：2021年8月31日 09:54 | 作者：K哥爬虫

## 一、问题画像
本次的逆向目标是WB的登录，虽然登录的加密参数没有太多，但是登录的流程稍微复杂一点，经历了很多次中转，细分下来大约要经过九次处理才能成功登录。

## 二、关键文字要点
- 要点1：本次的逆向目标是WB的登录，虽然登录的加密参数没有太多，但是登录的流程稍微复杂一点，经历了很多次中转，细分下来大约要经过九次处理才能成功登录。
- 要点2：在登录过程中遇到的加密参数只有一个，即密码加密，加密后的密码在获取 token 的时候会用到，获取 token 是一个 POST 请求，其 Form Data 里的 sp 值就是加密后的密码，类似于：e23c5d62dbf9f8364005f331e487873c70d7ab0e8dd2057c3e66d1ae5d2837ef1dcf86......
- 要点3：首先来理清一下登录流程，每一步特殊的参数进都行了说明，没有提及的参数表示是定值，直接复制即可。
- 要点4：预登陆为 GET 请求，Query String Parameters 中主要包含两个比较重要的参数：su：用户名经过 base64 编码得到，_：13 位时间戳，返回的数据包含一个 JSON，可用正则提取出来，JSON 里面包含 retcode，servertime，pcid，nonce，pubkey，rsakv， exectime 七个参数值，其中大多数值都是后面的请求当中要用到的，部分值是加密密码要用到的，返回数据数示例：
- 要点5：密码的加密使用的是 RSA 加密，可以通过 Python 或者 JS 来获取加密后的密码，JS 加密的逆向在后面拿出来单独分析。
- 要点6：返回数据为 HTML 源码，可以从里面提取 token 值，类似于：2NGFhARzFAFAIp_QwX70Npj8gw4lgj7RbCnByb3RlY3Rpb24.，如果返回的 token 不是这种，则说明账号或者密码错误。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRib2KUetwjVPT6uhY4pVdHibr0MudibaQOKsxBXroRKOlqU61YibO3C4cdEg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRibAZ039gGDJcfrqeCtTrHzmiaM0saTdIX0tcNymv1e74lib6toJcY4vE2g/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRibjyOycyUmxDQdRb7Y5lsDoHKEPWibzFau4AOIX2B5ict50gIbcstpP1WA/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRibiaPMPN61Kue5CTzMszBKPYqibiaQOL49wPXNUCzWpgTIoQQuLPv5Flyew/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRibqG1qCKxE1uKicysVNqVxTSmibmbjubH7Reple5CuhQ1wCoSKfVGULyug/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 返回数据为 HTML 源码，可以从里面提取 token 值，类似于：2NGFhARzFAFAIp_QwX70Npj8gw4lgj7RbCnByb3RlY3Rpb24.，如果返回的 token 不是这种，则说明账号或者密码错误。

## 七、迁移关键词
- RSA
- Cookie/Token
