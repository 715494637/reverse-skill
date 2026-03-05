# 【JS逆向百例】某东 h5st 4.7 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500660&idx=1&sn=286cee8798db333b0ab413f3c4322624&chksm=c1e2659ef695ec888a3aa7f9e268b74af112bf485d633d876e93bdeea9d603826f21936d6c69#rd
- 发布信息：2024年5月10日 17:42 | 作者：K哥爬虫

## 一、问题画像
最近某东也是在不断的维护升级 h5st 参数， 原因就是逐渐 VMP 化，现在已经到了 4.7 版本了，也相对稳定下来了，那我们就来分析分析。

## 二、关键文字要点
- 要点1：最近某东也是在不断的维护升级 h5st 参数， 原因就是逐渐 VMP 化，现在已经到了 4.7 版本了，也相对稳定下来了，那我们就来分析分析。
- 要点2：目标：某东 h5st 4.7 参数逆向分析
- 要点3：我们先抓包分析一下，随便找个有 h5st 参数的接口，我们可以直接看到它的版本：
- 要点4：也是接口返回，a，d 参数由大量的浏览器环境以及指纹信息生成，这边就不具体分析了，可以先写死，我们具体来看看 h5st 参数。
- 要点5：定位 h5st 参数的生成，可以直接通过搜索大法，或者找堆栈都能快速定位到生成的位置：
- 要点6：可以发现他将 colorParamSign 传入 window.PSign.sign 这个异步函数，返回的结果就有了 h5st 参数：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LhHS9UKf9IvICa0sroyd5nWh0icSreGZvDcna5YKqWlV9fy4jrBZZ0ErkBAueiaZ7vLnaQial5w8LQg/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LhHS9UKf9IvICa0sroyd5nzIHPNX6Q1pfX8MLuelju6aBYFRTCZacpGC1kjAbia1ibHsU3c6gLkpWg/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LhHS9UKf9IvICa0sroyd5naxaMJMwHgEGKdtsia4MfJyjMauEbcysQ3A3UX0g60BobwuribCUsWOLg/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LhHS9UKf9IvICa0sroyd5n1qnNFams4xI1JqcpSeLbqpdefITPOS6kJkx2MI84qrOXDBiaKTDywaA/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LhHS9UKf9IvICa0sroyd5n3JrSDxriaaD8wXoetEFfdvnLyhEvicThsZliaxlYfeQjwj7TUcH3fUVSA/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LhHS9UKf9IvICa0sroyd5naqSJ8yARx0xCQLC8rLrI8YzHxibh5DIFFPhMpnCqV9fNo8CDccVKCyA/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LhHS9UKf9IvICa0sroyd5nsIbXzLDEiaaoWQiaMickLkPn1UUxqxCjxGGjSgBw0bxHbvaeIwoSFNCxg/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4LhHS9UKf9IvICa0sroyd5nFxl7Yo6bZfpATMzdWPu2goDfkXiaXhQEbCovrVrmGahEFZ3ryVyS8dw/640?wx_fmt=png&from=appmsg

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
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- AES
- Cookie/Token
- 补环境
- h5st
