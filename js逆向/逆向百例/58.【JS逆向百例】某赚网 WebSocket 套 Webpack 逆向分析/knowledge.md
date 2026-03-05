# 【JS逆向百例】某赚网 WebSocket 套 Webpack 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247503129&idx=1&sn=3c113dc9005d79361ff2e45ddc77b768&chksm=c1e26bf3f695e2e5b28e18a56e58a18965dc1fc84ff00da3078bb84d776b10ccbe457ad0a190#rd
- 发布信息：2024年9月27日 14:12 | 作者：K哥爬虫

## 一、问题画像
近期有粉丝私信，提到了某网站抓不到包的问题，之前还有不少新手粉丝提到不会 webpack。经过分析，发现这个网站属于 ws 协议，同时还是一个简单的 webpack，正好借此案例，解答粉丝们的疑惑：

## 二、关键文字要点
- 要点1：近期有粉丝私信，提到了某网站抓不到包的问题，之前还有不少新手粉丝提到不会 webpack。经过分析，发现这个网站属于 ws 协议，同时还是一个简单的 webpack，正好借此案例，解答粉丝们的疑惑：
- 要点2：同时该数据是密文状态，经过断点调试发现这个接口并不是我们需要的，那么它的数据应该是从何而来呢？大胆猜测应该是走了不同的协议，因为这种实时获取数据的接口，一般大概率都是走的 ws 协议， 避免了每次通信都需要重新建立连接的开销。
- 要点3：Upgrade: websocket：表明这是 WebSocket 类型请求；
- 要点4：持久连接：支持通过 HTTP Keep-Alive 持久连接，允许在一个连接内进行多次请求和响应。
- 要点5：上面分析可知，ws 向服务器发送了一段密文数据，该数据是由 y.a.encryptDes 生成的，所以我们需要将 y 函数导出，经过分析 y 是一个 webpack 打包的一个模块：
- 要点6：window = global; !function(e) { var f = window.webpackJsonp; window.webpackJsonp = function(c, b, n) { for (var r, t, o, i = 0, u = []; i < c.length; i++) t = c[i], a[t] && u.push(a[t][0]), a[t] = 0; for (r in b) Object....

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrAgyfVLFafoVGJXibX7icEiaicy2QJGkL2AiaZFGgkVXGic2UhfrydEB1v5v4WZvVpcD9hAib6bKZ5NETSA/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_jpg/POicI8TV3kTrAgyfVLFafoVGJXibX7icEiaicWswu8M2jxrSCiaOE4ibv5TKK7icqq0yXicTUSNu0j4mdR0jCH40lMibO5eA/640?wx_fmt=jpeg&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_jpg/POicI8TV3kTrAgyfVLFafoVGJXibX7icEiaicUQicJdIiaMTt5j7RruSNQNvGeFTzWD4jb3GsiasCHcia7km2ZY27kNFqVQ/640?wx_fmt=jpeg&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrAgyfVLFafoVGJXibX7icEiaic60RWzNeP5nCibwBOicgeWGPFB2EhG4hoELxA28NSKwrho4NHYxTgdficw/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrAgyfVLFafoVGJXibX7icEiaicjV3fywzFOChueuHucXK6jONPrqnTv6SUcnPpH3VK4swQGlaXWf5pEQ/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrAgyfVLFafoVGJXibX7icEiaicM2qVia0MtQlUN6G2CTxxx29Zledib8l2nUqoE3HmLP9AToZj9HBDysWQ/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrAgyfVLFafoVGJXibX7icEiaicibsRfSibia6TQISibO5loyCLxMMavQhobaJZSttvWWz2Kicb0SicH7kl6vNA/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTrAgyfVLFafoVGJXibX7icEiaicvSNlibqVzsYovAD7HeAJ9X9KZktClECz9cdibk8bbyMYL7Dy0Lx8HqDA/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + Webpack + WebSocket + 协议分析 + 补环境
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
- AES
- Webpack
- WebSocket
- 协议分析
- 补环境
