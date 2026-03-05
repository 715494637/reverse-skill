# 吾爱破解2024春节解题领红包活动，喜迎新春~

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500637&idx=1&sn=33e7887a96ff568a071a2670daa2cb42&chksm=c1e265b7f695eca1a9cd08aa2f4d3a5418c80e515ddc99bb848115149ee9219d4f2728858b44#rd
- 发布信息：2024年2月27日 17:26 | 作者：K哥爬虫

## 一、问题画像
吾爱破解每年都有个解题领红包活动，今年也不例外，需要我们使出看家逆向本领来分析内容获得口令红包，根据难度等级不同会获得不同数量的吾爱币，活动持续到元宵节结束。活动一共有十个题，本文分享过年期间抽空做的几个题的相关思路。文章很早就写好了，不过遵循论坛的规则，延迟至元宵节之后发布。

## 二、关键文字要点
- 要点1：吾爱破解每年都有个解题领红包活动，今年也不例外，需要我们使出看家逆向本领来分析内容获得口令红包，根据难度等级不同会获得不同数量的吾爱币，活动持续到元宵节结束。活动一共有十个题，本文分享过年期间抽空做的几个题的相关思路。文章很早就写好了，不过遵循论坛的规则，延迟至元宵节之后发布。
- 要点2：主要逻辑就是下面部分，先判断长度是否等于 36，再逐字节判断 *v10 != *v9，那么直接动态调试：
- 要点3：if ( *v10 != *v9 ) 这里下个断点，输入 "a"×36，很明显是明文对比了：
- 要点4：开启调试，建议使用 Edge。
- 要点5：直接搜索失败的提示 "汗流浃背了吧，老弟！"，可以看到失败和成功调用函数，在失败处下个断点，随便点击：
- 要点6：在 FlagActivity 中，先获取了签名，再和 o 异或，就得到了 flag：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_jpg/iabtD4jabia4KF8UfxN4JvbN7FQDUkwyqDZuibegVEfQCX9TfTlz4DpH2G7iaKVwJS3Lj47f3VicpyZtjYEf71204jQ/640?wx_fmt=jpeg&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_gif/iabtD4jabia4KF8UfxN4JvbN7FQDUkwyqDxgwdLMDbI0pAjziasNdCXhNiaXaK1cNdR5mrnYWTUtLrpf1QIicib8twnQ/640?wx_fmt=gif&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4KF8UfxN4JvbN7FQDUkwyqDwN8SeHxxdV4uCZSRhQb2ogV39nNK05yw4uCcBP5u8nI0toFXQhrdwA/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_gif/iabtD4jabia4KF8UfxN4JvbN7FQDUkwyqDXsB55EsT7kHXcQFghiaIOqkf5NaiccmN5H47zFAQbRoOEk5KGibHxhPYQ/640?wx_fmt=gif&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4KF8UfxN4JvbN7FQDUkwyqDjeibJYsI1QDOz0wZE8fdkm9naneg5icnEkgR7T4vw8VF6d4gkF4E2icGA/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_jpg/iabtD4jabia4KF8UfxN4JvbN7FQDUkwyqDqo1LX34oxib5OG75mkwqJCo83Oic8X1uVoLLEdHk4P66VfoPUQWxyBzg/640?wx_fmt=jpeg&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_gif/iabtD4jabia4KF8UfxN4JvbN7FQDUkwyqDNGQddYqkvbg30FeVJQRiauRZ11iasH51oiaVy7N8IJ5maUSet79hnyOHw/640?wx_fmt=gif&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4KF8UfxN4JvbN7FQDUkwyqDTjibuBLfHLJUGDBA3HQJOUCDy9nvTqZoMplWcmC1MPxxjtd2C0WeylQ/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + Hook
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 直接搜索失败的提示 "汗流浃背了吧，老弟！"，可以看到失败和成功调用函数，在失败处下个断点，随便点击：
- 还注意到在获取了对应方法后，删掉了修复后的 dex，那么直接 hook 删除函数，或者 hook 写入函数传到电脑里：

## 七、迁移关键词
- AES
- Hook
- 2024
