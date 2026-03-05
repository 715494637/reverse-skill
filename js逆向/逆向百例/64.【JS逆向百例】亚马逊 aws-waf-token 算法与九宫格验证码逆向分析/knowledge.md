# 【JS逆向百例】亚马逊 aws-waf-token 算法与九宫格验证码逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247505934&idx=1&sn=1be1d534ca12cea469e408cb394c6521&chksm=c1e27ee4f695f7f2932fb35f71b4c4d3fef33c64c23a41b240861a28110487b1b479b397e9d1#rd
- 发布信息：2025年7月4日 15:01 | 作者：K哥爬虫

## 一、问题画像
最近有小伙伴私信，询问关于某时捷官网亚马逊 cookie 反爬以及验证码的相关问题，该站有 cookie 无感和九宫格验证码，本篇就对该站进行逆向分析，以及如何不训练就秒掉这类型的验证码。

## 二、关键文字要点
- 要点1：最近有小伙伴私信，询问关于某时捷官网亚马逊 cookie 反爬以及验证码的相关问题，该站有 cookie 无感和九宫格验证码，本篇就对该站进行逆向分析，以及如何不训练就秒掉这类型的验证码。
- 要点2：目标：AWS (Amazon) aws-waf-token 参数
- 要点3：提前打开控制台，再进入网站，会发现先访问了首页，返回了 405 状态码以及一些相关参数：
- 要点4：紧接着走了一个 /verify 包，载体里包括 checksum、Present 等参数：
- 要点5：该接口返回了 token 值，并且将 token 直接赋值给 cookie 中的 aws-waf-token，即本文要研究的参数：
- 要点6：获取到 cookie 后，再通过验证码，返回 captcha_voucher，后续操作将会用到：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqO6xdbyMGBX5ruy0IAbcXA0kxSibaVflFm3TSTtzwDIAbv4l4I0CwY4hyYE4J9F7uplicicTcMKUCvA/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqO6xdbyMGBX5ruy0IAbcXAsxBdqbJDT0sqoRaJEvK8ice4FXXaKAJhLwdWTWeiavId4CCWsicmBSGBg/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqO6xdbyMGBX5ruy0IAbcXAQsndgW6NwEcz7mDmSJhpFEWh2pRHOA1Loa7byYWyY9zLfBaMNHqfiaA/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqO6xdbyMGBX5ruy0IAbcXAWtKV5ZOdrcDiadlHQBc6HgAOybUoRpia1MzmiaNwh2mXx9wPfLKvgR2bg/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqO6xdbyMGBX5ruy0IAbcXAodQUIJJjnRnvj1ibt9ERoa9xUIeFlrial4cYg3Wmlg7NzMJicN7Mcp1Kw/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqO6xdbyMGBX5ruy0IAbcXA83uWEsL1uRZhLf50fThCpNdC9yjo1pTyybfXMEfGVVruRKL8VPGS7g/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqO6xdbyMGBX5ruy0IAbcXAfJAiceex5VKPIWxU76dT2ceNu3c4WzR3UGRrRLknhEIUOu3GzQluEWA/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqO6xdbyMGBX5ruy0IAbcXAbq1vVMudmiaUibQ6s190bhkKuQicgDPS2Kyia10qK8XDE7UGEUghmMsYGw/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：Hook + 反调试 + Cookie/Token + 验证码/风控 + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- Hook
- 反调试
- Cookie/Token
- 验证码/风控
- 补环境
- aws-waf-token
