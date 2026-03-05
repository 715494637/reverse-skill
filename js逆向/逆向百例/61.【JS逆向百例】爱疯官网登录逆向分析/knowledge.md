# 【JS逆向百例】爱疯官网登录逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247504047&idx=1&sn=4f51f36bc4da1140ef28fc23b7ce4c96&chksm=c1e27645f695ff532945cb1ffb44af680b6102335d3d70cf4d390dedafb11a5956223d6e9a33#rd
- 发布信息：2024年12月19日 17:36 | 作者：K哥爬虫

## 一、问题画像
最近有些小伙伴在微信群交流，关于爱疯登录相关加密参数的问题，同时，也有粉丝私信，想让 K 哥出关于 m1、m2 相关参数逆向的系列教程。众所周知，K 哥一向会尽力满足粉丝们的需求，本文就对该站进行逆向研究，该案例综合性较强，适合作为逆向案例来练手：

## 二、关键文字要点
- 要点1：最近有些小伙伴在微信群交流，关于爱疯登录相关加密参数的问题，同时，也有粉丝私信，想让 K 哥出关于 m1、m2 相关参数逆向的系列教程。众所周知，K 哥一向会尽力满足粉丝们的需求，本文就对该站进行逆向研究，该案例综合性较强，适合作为逆向案例来练手：
- 要点2：进入 store 登录页，输入邮箱后点击箭头，发现有数据包产生，此处我们称为 init 包，该数据包需要提交 a 等加密参数：
- 要点3：该接口响应返回 iteration、salt、protocol、b、c 等参数：
- 要点4：最后经过 /signin/complete 接口由 c、m1、m2 等参数完成登录校验：
- 要点5：由于该站属于全异步，该参数的定位，我们还是采用跟栈的方式，在 send 接口处打断点，向上跟栈：
- 要点6：经过分析，n 是一个模块，按照之前扣 webpack 的逻辑，我们将分发器找到，在该处下断点，刷新浏览器成功在该处断下：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqngrGKXVL3pAb9DUryjJ6xRbya4LpgyWQyPuInYVJ8n4nJ5h7Niav6iarZezVHMNxSqKCh3Zjw7ZFw/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_jpg/POicI8TV3kTqngrGKXVL3pAb9DUryjJ6xt4I4k64icT1l6T3dSjYUTvwib9zAZbh2HvsuM2fMfM0DhkoWe0r7bN5Q/640?wx_fmt=jpeg&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqngrGKXVL3pAb9DUryjJ6xicYiaCTQIXhftgHNT8zyjbRgVJ7aYsLBBNKO3qXVOyrwAPRmo6w0Calg/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqngrGKXVL3pAb9DUryjJ6xzZiao1Ka85e5uic4H87NKBN0rCnDicoSNC7OCOa4EUnrLiaKWDUvkZ6DOw/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqngrGKXVL3pAb9DUryjJ6xBOEicv7ibz8OQRa9fxs4VsNRyam0vPCYuSrTniaMtfcHn5PWsN1GhseXA/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqngrGKXVL3pAb9DUryjJ6xr5V3T75oriczBVLNxrLVsoKBjZoo2ulN3psUdJNNMdMM2pR12DQia6QQ/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqngrGKXVL3pAb9DUryjJ6xQO5tQyibSV8ZjlxhARWALb3VNOONiap78NcbKDyWibU4ULzMcjCtGgX1A/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqngrGKXVL3pAb9DUryjJ6xmxPZS0ianSHGfX88sLepnlFObnhZ0F9fFuHM6uWs6UdtV6nFJQX6icbQ/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + Webpack + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
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
- Cookie/Token
