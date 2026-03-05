# 【JS逆向百例】某音乐网分离式 webpack 非 IIFE 改写实战

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500510&idx=1&sn=d005cd58fca22a3032dbafbc990ddc35&chksm=c1e26434f695ed227aefc9aee11c01bf05460bb80fba1cab6ae12fe915859e44b6ad81329677#rd
- 发布信息：2021年11月2日 16:24 | 作者：K哥爬虫

## 一、问题画像
reqId: 15c31270-32e8-11ec-a637-0b779ce474e4

## 二、关键文字要点
- 要点1：本次的逆向目标是搜索接口的一个参数 reqId，注意这个参数并不是必须的，本文的主要目的是介绍分离式 webpack，即模块加载器与各个模块不在同一个 JS 文件里时，该如何改写 webpack，以及如何通过非 IIFE（立即调用函数表达式、自执行函数）的方式对 webpack 进行改写，本篇文章是对往期文章的一个扩充：
- 要点2：爬虫逆向基础，理解 JavaScript 模块化编程 webpack
- 要点3：【JS 逆向百例】webpack 改写实战，G 某游戏 RSA 加密
- 要点4：来到搜索页面，随便搜索一搜歌曲，抓包到接口类为 aHR0cDovL3d3dy5rdXdvLmNuL2FwaS93d3cvc2VhcmNoL3NlYXJjaE11c2ljQnlrZXlXb3Jk，GET 请求，Query String Parameters 里有个 reqId 加密参数，如下图所示：
- 要点5：埋下断点进行调试，可以看到 n 其实是 runtime.d5e801d.js 里面的一个方法，如下图所示：
- 要点6：观察这个 function d(n){}，return 语句用到了 .call 语法，里面还有 exports 关键字，通过 K 哥往期文章的介绍，很容易知道这是一个 webpack 的模块加载器，那么 e 就包含了所有模块，如下图所示：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IXvyo26ianSIoQx76CGoguLUuyibcrMgt4zlusYaLE7NPtCIPQtpJTuUcUpeEuChicDjLd7qvxYlnbQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IXvyo26ianSIoQx76CGoguLO1tzsORU5JkGs787ic5l0l5ibon8dGicKnI9o43vT45rzPmNaumVBWUkA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IXvyo26ianSIoQx76CGoguLHmmibwmaicbtGDb2h9r1QvRMjQeDGXpqpWHDGcrDRlSRlhNNxS9RDaXQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IXvyo26ianSIoQx76CGoguL0AXE3lReFia9jDkJicT8lrw3ibUJbcQGRiaa3TkA3iavqRc286Db8OdJjmw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IXvyo26ianSIoQx76CGoguLvXic3JrzllFibD2WOpjUjUKuFcAc3orfGSvZAFkpQQvIoqorRicaEc8OQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + Webpack
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 先提取并复用 webpack 模块加载入口，避免在混乱打包代码中盲查。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 本次的逆向目标是搜索接口的一个参数 reqId，注意这个参数并不是必须的，本文的主要目的是介绍分离式 webpack，即模块加载器与各个模块不在同一个 JS 文件里时，该如何改写 webpack，以及如何通过非 IIFE（立即调用函数表达式...

## 七、迁移关键词
- RSA
- Webpack
- webpack
- IIFE
