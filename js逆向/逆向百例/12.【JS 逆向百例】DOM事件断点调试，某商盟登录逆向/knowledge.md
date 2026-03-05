# 【JS 逆向百例】DOM事件断点调试，某商盟登录逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500499&idx=1&sn=184ad30b657eb02a21130734944bf199&chksm=c1e26439f695ed2fe12e681fdb3c281ddb0b5eabcf0c5f36acd3c7b515dead09ddccf89e24b3#rd
- 发布信息：2021年9月7日 17:31 | 作者：K哥爬虫

## 一、问题画像
逆向参数：Query String Parameters：j_mcmm: 351faaef3ba8f4db2001ec621344dbbf

## 二、关键文字要点
- 要点1：逆向参数：Query String Parameters：j_mcmm: 351faaef3ba8f4db2001ec621344dbbf
- 要点2：在以前的案列中，我们都是通过直接搜索来定位加密参数的位置的，直接搜索出来的定位通常是比较准确的，但是有个弊端就是搜索的结果可能会非常多，需要人工去过滤，需要一定的经验去判断准确的加密位置，而且对于一些反爬力度较大的站点来说，可能做了很多混淆，根本就搜索不到，那么今天的案列中，我们将介绍另一种方法，即 DOM 事件断点，需要注意的是，DOM 事件断点也是有弊端的，通过这种方法找到的位置通常在加密处理之前，也就是说想要找到准确的加密位置，还...
- 要点3：DOM 全称 Document Object Model，即文档对象模型，是 HTML 和 XML 文档的编程接口，定义了访问和操作 HTML 文档的标准方法。
- 要点4：本次逆向的目标是某商盟的登录密码，本案例的加密参数为 j_mcmm，加密比较简单，直接全局搜索也很容易找到加密的地方，但是本次我们不使用全局搜索，改用 DOM 事件断点来定位加密位置。
- 要点5：我们将这些事件展开具体看一下，submit 提交事件，定位到 div 标签，div 标签下有一个 form 表单，form 的作用就是为用户输入创建 HTML 表单，向服务器传输数据，跟进这个 submit 用到的 JS 文件，大概率就能够找到加密的地方，这里还有个小技巧，如果事件太多，不太好判断哪个是提交数据的，或者哪个是登录事件的，可以选择性的点击 Remove，移除一些事件，再登录，如果登录不能点击，或者 Network 里没有提...
- 要点6：跟进 submit 事件用到的 JS，会定位到 function e() 的位置，往下看，就可以找到疑似加密的地方，这里出现了两个 j_mcmm，分别是 g.j_mcmm 和 P.j_mcmm，埋下断点进行调试，经过对比可以发现 g.j_mcmm 是最终需要的值：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4zIc8P7ZWe99HxhaaZ5Ay2Fia9icb6PDUiaeIrC0N8P75lPOlnnR7Mjx6g/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4x2iagWEEQTlWdor1vo9ibY6XTxAlMBYTrHrscPbMgJ1gUXE8gxuac9jQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4UGibl492HAJSEv52ze7z5NcX8Vgk8BWvKFbPWvSic5ZAEOamM0vicOTYw/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4qe6L8BWK1nHiaDoibR6wJlmv9jDT9ibibtfhjmkgps5C2za6wucaBdhCwQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4rz41PbHEKU8hrAHcxE5IKrrl5oQeAO8teS3Buaw2vzUbkYTzFPcSFA/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + 混淆还原 + 验证码/风控 + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 在以前的案列中，我们都是通过直接搜索来定位加密参数的位置的，直接搜索出来的定位通常是比较准确的，但是有个弊端就是搜索的结果可能会非常多，需要人工去过滤，需要一定的经验去判断准确的加密位置，而且对于一些反爬力度较大的站点来说，可能做了很多混淆...

## 七、迁移关键词
- AES
- 混淆还原
- 验证码/风控
- 补环境
- DOM
