# 【JS 逆向百例】cnki 学术翻译 AES 加密分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500516&idx=1&sn=04f881e07204b0ef8bbe3acbd470f285&chksm=c1e2640ef695ed18246401528b761c98b7ac95105c23b59b17ea09a640d3b36dd9fa51883722#rd
- 发布信息：2021年11月18日 16:07 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9kaWN0LmNua2kubmV0L2luZGV4

## 二、关键文字要点
- 要点1：目标：cnki 学术翻译 AES 加密
- 要点2：接口：aHR0cHM6Ly9kaWN0LmNua2kubmV0L2Z5enMtZnJvbnQtYXBpL3RyYW5zbGF0ZS9saXRlcmFsdHJhbnNsYXRpb24=
- 要点3：逆向参数：Request Payload： words: "kufhG_UJw_k3Sfr3j0BLAA=="
- 要点4：本期逆向素材来源于K哥爬虫交流群里某位群友的求助，目标是 cnki 学术翻译，粉丝想实现两个功能：1、突破英文1000个字符的限制；2、逆向加密过程。
- 要点5：来到翻译首页，抓包定位到翻译接口，可以看到 Request Payload 里，待翻译文本会被加密处理，如下图所示：
- 要点6：控制台打印一下 (0, h.encrypto)(this.inputWord)，正是加密结果：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JaFtYbnNAxAFltARJqzxbexvHuaYG8bdO7mmN6n4w6AYdQw7myLWxcHK6crX9OnAtia2Fb4W4ODWA/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JaFtYbnNAxAFltARJqzxbev8uW0nFYPOMEQXdld6RaExn0uDejBupVeXtpgrj0QZ4nYTaSOg8jBA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JaFtYbnNAxAFltARJqzxbeY4ZtFjxcZyAnNU44xTX9IIqroSzAibfWNTfVkPORt9UKXuuKgiahPMjw/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JaFtYbnNAxAFltARJqzxbeTPwMVicKDS9lYDd9Wu2EuXy5icdAQ11Q1u0BvjFZSMFK3fQk3p1Hw53g/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JaFtYbnNAxAFltARJqzxbe233MSWdWr5EDIWvCn1hSC6UA82xBHOglCTWe1KTiaYIVsnBeKCDfMeQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES
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
- AES
- cnki
