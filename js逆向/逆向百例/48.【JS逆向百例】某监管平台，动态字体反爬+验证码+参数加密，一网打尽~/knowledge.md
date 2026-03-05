# 【JS逆向百例】某监管平台，动态字体反爬+验证码+参数加密，一网打尽~

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500636&idx=1&sn=136cae07b051a58698cf469e367b1419&chksm=c1e265b6f695eca0f08364aa30c4953d0b0d2ea6ce2080c6650e359c2c1a5dfec2619157bcf9#rd
- 发布信息：2024年2月23日 18:18 | 作者：K哥爬虫

## 一、问题画像
最近看到群里有群友反馈，不知道如何处理字体反爬，已有热心的群友给出了相关解答。本文将对这类型的反爬策略做一个讲解：

## 二、关键文字要点
- 要点1：目标：css 字体反爬，验证码识别，Token 参数逆向
- 要点2：刷新网页，弹出一个图片码，目测看来是一个简单混淆的图形验证码，这里推荐大家使用k哥免费的图片码识别网站或者 ddddocr 也可以：
- 要点3：接下来抓到的是一个图片码验证接口，没有参数加密，这里不做分析，最后抓到的就是查询数据响应的接口，如下：
- 要点4：首先是验证码的处理，我们通过抓包发现这属于一个 session 会话，我们首先通过 python 创建一个会话窗口：
- 要点5：然后将我们抓到的图片码接口与验证接口进行 python 复现，这里比较简单，就不在概述了，复现如下：
- 要点6：查询接口中存在 Token 参数加密，打开启动器，查看堆栈，这里教大家一个快速定位的办法，发现前俩个是 Ajax 请求，我们从第三个堆栈直接进入：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4Ld5XG4dnk6sRfIEVyZcLzJSia1GIA79KLkpr2U8OiaTwWppCHJYOnyiadSRGFDIntwVxAibQINJ8U90w/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4Ld5XG4dnk6sRfIEVyZcLzJ2qqhLxxCWdXu02blG5bXEicfeYFDXeYMmJlvCVAPAY88xwbugCXxPcw/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4Ld5XG4dnk6sRfIEVyZcLzJq2Q8gExN4d419GFYmD9gj3F0LfXibuP2kPtib3Ime9ndDnnATF035MVQ/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4Ld5XG4dnk6sRfIEVyZcLzJMibXDrbicOH1vj0MMibia3CfdKKBj0icQnBy6bM7pDicNLDpdpTVFQeP2T7A/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4Ld5XG4dnk6sRfIEVyZcLzJc0ibEyC8Xfolr7nY8JLtGM72SdgYWPLReZTPQpKe4bhowbkg7ZUrBtQ/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4Ld5XG4dnk6sRfIEVyZcLzJETo1et3mNyic826KSvUuoEspAIiaVyd1m4T6yzI0BeyUd40t5NroCxSA/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4Ld5XG4dnk6sRfIEVyZcLzJnpcRwcrfv6yBtUPiabe9s4lFAuVr2822GqqIicLOBdOpleh9WmKk3yXA/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4Ld5XG4dnk6sRfIEVyZcLzJJDiaUiaTBDVGKKdzEVSyGQlzia8iaeibo1rkjxG9uoG0Bic1dVkGzVCUlS7A/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + Webpack + 混淆还原 + Cookie/Token + 验证码/风控
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 先提取并复用 webpack 模块加载入口，避免在混乱打包代码中盲查。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- AES
- Webpack
- 混淆还原
- Cookie/Token
- 验证码/风控
