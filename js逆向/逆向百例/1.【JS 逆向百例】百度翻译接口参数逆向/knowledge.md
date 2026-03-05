# 【JS 逆向百例】百度翻译接口参数逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500488&idx=1&sn=2d22c83b1350c41178774b15c2a9ba03&chksm=c1e26422f695ed344ab163d21930896e70fc13539d64e98356a0b0cee9c7f00f9d551a09c3c9#rd
- 发布信息：2021年8月12日 14:07 | 作者：K哥爬虫

## 一、问题画像
接口：https://fanyi.baidu.com/v2transapi

## 二、关键文字要点
- 要点1：接口：https://fanyi.baidu.com/v2transapi
- 要点2：trans_result 是翻译的结果，dict_result 是更多翻译结果，liju_result 是例句、标签等，那么这个 URL 就是我们需要的翻译接口了。
- 要点3：token：它的值虽然不会变，但是不知道是怎么来的，需要进一步分析。
- 要点4：在抓包过程中我们还注意到有一条 URL 为 https://fanyi.baidu.com/langdetect 的 POST 请求，而它返回的数据如下：
- 要点5：很明显，这个是自动检测待翻译字符串的语言，它的 Form Data 也很简单，query 就是待翻译的字符串，这个接口可以根据实际场景进行使用。
- 要点6：token 的值由于是固定的，所以我们可以尝试直接搜索，可以在首页源码里面找到，使用正则表达式可以直接提取。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jU3UKVFokk6iab9UYjHP9xAc7ibKInZlm9NbiaibbcicINEabJ6u12E83ByiaQ/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUmLRUjibrSIyBmQkib6jg0E6AxRP0FxzuH13Iqh552n8lNBdSR9VVk7pg/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jU080tcxPYeRxwzic6NWKiaC3JHzH8rIhcAdq3wsF4cH5kSy181QriayzfQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUiayRwo25c3RzibTLP2KVbr41gGK8P4J4lBaKDwts0mQ2tyV1fVw4iap0Q/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUZWiangbGJuUuiaQCuRKs9YdiaibyiaCn4eJZTyNl2401swI7IXR8jWwByBg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUibBUNKz6Ub8kzOWkdF1AIVQicic51dtg05ODIIWHQwfK42Pw4BTXHrc2Q/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/iabtD4jabia4JSlhKbZ7886IyfdWMia07ODtZic3RreIOyKWHWwwY5ibGEB9xR0n3xjJBJm385fWMDHPXUgad9wZz9A/640?wx_fmt=gif

## 四、精华技能
- 技能定位：Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 在抓包过程中我们还注意到有一条 URL 为 https://fanyi.baidu.com/langdetect 的 POST 请求，而它返回的数据如下：

## 七、迁移关键词
- Cookie/Token
