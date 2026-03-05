# 【JS逆向百例】cebupacificair 航空逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247503545&idx=1&sn=384838cbee87ab3a57f4c437362ec7f0&chksm=c1e26853f695e145b570bdf87247316e25f833207f737814143c5343bb92f8213933fe201634#rd
- 发布信息：2024年10月30日 17:48 | 作者：K哥爬虫

## 一、问题画像
近期在知识星球中，有位星友在逆向一个航司的时候，遇到了点阻碍，向我提问，本期就对该网站进行逆向分析：

## 二、关键文字要点
- 要点1：近期在知识星球中，有位星友在逆向一个航司的时候，遇到了点阻碍，向我提问，本期就对该网站进行逆向分析：
- 要点2：打开网站，找到返回机票信息的机票查询接口 ceb-omnix_proxy：
- 要点3：目测，有这四个参数需要分析，分析之前先搜索，免得是接口返回，发现 Authorization 和 X-Auth-Token 是另外一个 ceb-omnix_proxy 接口返回的：
- 要点4：该接口有四个参数需要分析，也是有两个 content，估计都大差不差，我们继续先搜索，发现 authorization 是 main.xxx.js 文件返回的：
- 要点5：而 main.xxx.js 文件是通过首页加载的，大致流程都梳理清晰了，我们开始进行逆向分析：
- 要点6：可以通过搜索 ceb-omnix_proxy 或者 content: 就能定位到生成位置，也可以通过下 xhr 断点或者 hook 等手段来跟值，本文都会提到。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqibpW3asyj97gK0zvpWict2Ko0jlreaHsqy5iatMWPtP1tZ9S5JP0ZoibKoDNR3xLJN41sHDUKZFPzcA/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqibpW3asyj97gK0zvpWict2K3ibh4wHzbqrZ9uWa1yRNUusNjv16cMYVwupU7cCpyHhl2gBHibIDu81w/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqibpW3asyj97gK0zvpWict2KGC2PfvhNk4VWWb6TjlkvFv2FDmHiba1vHVceamicm6A4NAzSan11DepA/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqibpW3asyj97gK0zvpWict2KbhVBE0qG7MdicetLgicdDdjiaEJrhSibUNufavibup1ic4FxaoDdAb5Qxacw/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqibpW3asyj97gK0zvpWict2Ke3Lic6CicdichHgicbWnJqI53gVJibnrxJaBLibU91NkjqcGnC5weRMzbakg/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqibpW3asyj97gK0zvpWict2KKYSjyv7t8vcQoricTV2eh4z8Af5WkshC2ZCysapw21wiaUCuyEvOeIew/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqibpW3asyj97gK0zvpWict2KtQDMugTatvhokzUPolJK0P6eCoL32e9IH9rAicmaQnmJc45FIia5eNLA/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTqibpW3asyj97gK0zvpWict2K9DvzygTxCPDewwx9P5E045BwurcuZA5Q8ugjEqghdPXjAXU3YLqqrA/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + Webpack + Hook + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
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
- Hook
- Cookie/Token
- cebupacificair
