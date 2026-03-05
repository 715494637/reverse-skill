# 【JS 逆向百例】webpack 改写实战，G 某游戏 RSA 加密

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500509&idx=1&sn=c046826999667a6dfd8efdcecd517bdc&chksm=c1e26437f695ed21758c710e92dd06a08925721d845b76fdc22f45ec8025e942af8ce164118d#rd
- 发布信息：2021年10月28日 10:00 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly93d3cuZ205OS5jb20v

## 二、关键文字要点
- 要点1：跟进 a.encode() 函数，此函数仍然在 home.min.js 里，观察这部分代码，可以发现使用了 JSEncrypt，并且有 setPublicKey 设置公钥方法，由此可以看出应该是 RSA 加密，具体步骤是将明文密码和时间戳组合成用 | 组合，经过 RSA 加密后再进行 URL 编码得到最终结果，如下图所示：
- 要点2：RSA 加密找到了公钥，其实就可以直接使用 Python 的 Cryptodome 模块来实现加密过程了，代码如下所示：
- 要点3：本文的标题是 webpack 改写实战，所以很显然本文的目的是为了练习 JavaScript 模块化编程 webpack 代码的改写，现在大多数站点都使用了这种写法，然而并不是所有站点都像本文遇到的站点一样，可以很容易使用其他方法来实现的，往往大多数站点需要你自己扒下他的源码来还原加密过程，有关 JavaScript 模块化编程，即 webpack，在 K 哥往期的文章中有过详细的介绍：爬虫逆向基础，理解 JavaScript 模块化编...
- 要点4：一个标准的 webpack 整体是一个 IIFE 立即调用函数表达式，其中有一个模块加载器，也就是调用模块的函数，该函数中一般具有 function.call() 或者 function.apply() 方法，IIFE 传递的参数是一个列表或者字典，里面是一些需要调用的模块，写法类似于：
- 要点5：观察这次站点的加密代码，会发现所有加密方法都在 home.min.js 里面，在此文件开头可以看到整个是一个 IIFE 立即调用函数表达式，function e 里面有关键方法 .call()，由此可以判断该函数为模块加载器，后面传递的参数是一个字典，里面是一个个的对象方法，也就是需要调用的模块函数，这就是一个典型的 webpack 写法，如下图所示：
- 要点6：接下来我们通过 4 步完成对 webpack 代码的改写，将原始代码扒下来实现加密的过程。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IA7LpHuY8UUwCsib2NUSMPhq0wJgumPzuZZe0GhluF3owvicamaDs6BYhJdjXA99JxDe4MpeAfBULg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IA7LpHuY8UUwCsib2NUSMPh0eGde2qAf4TJjWzTYvia3VIMicttMqKKbqXZuhUxgOAAaNKBcmJQmrBw/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IA7LpHuY8UUwCsib2NUSMPhrAj9rmGrSLWZ8icCqaebdo2bMrn2K8V6MMdMN2iaaIdNfkDtRNmS1gGA/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IA7LpHuY8UUwCsib2NUSMPh6tkIDia4dQ3OfxUJlHJQq0HicgtSfkLZF6y5Dj9bKdTRoFIhhYpH69Dw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IA7LpHuY8UUwCsib2NUSMPh9zcdYTgCh7Mibkgq1PZv3V8kT75NuzelJlvkialxENkicQnwE66KIq1jw/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + Webpack + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 先提取并复用 webpack 模块加载入口，避免在混乱打包代码中盲查。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- RSA
- Webpack
- 补环境
- webpack
