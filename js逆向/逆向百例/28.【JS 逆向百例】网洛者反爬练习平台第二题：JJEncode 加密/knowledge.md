# 【JS 逆向百例】网洛者反爬练习平台第二题：JJEncode 加密

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500524&idx=1&sn=40bcdae3ab1d6610ce47e7f4b023206a&chksm=c1e26406f695ed1035ed36f30de3c96808ee35ea377f3e30d7ce673ce13a074d0eaed0a5ec7e#rd
- 发布信息：2021年12月15日 16:20 | 作者：K哥爬虫

## 一、问题画像
链接：http://spider.wangluozhe.com/challenge/2

## 二、关键文字要点
- 要点1：简介：本题和第一题类似，都是要求采集100页的全部数字，并计算所有数据加和，第二题使用的算法是 SHA1 魔改版，另外主要还有一个 JJEncode 加密
- 要点2：作者有提示：JJEncode 易于解码，它不是实用的混淆，只是一个编码器，JJEncode 太有特点了，很容易被检测，而且还浏览器依赖，代码不能在某种浏览器上运行。它的缺点是压栈很严重，如果 JS 很大，去做加密可能内存溢出，所以只适合核心功能加密，事实上 JJEncode 商用的还是很少，不过认识一下并没有什么坏处。
- 要点3：经过 JJEncode 混淆（自定义变量名为 $）之后的代码：
- 要点4：JJEncode 解混淆的方式很简单，以下介绍几种常见的方法：
- 要点5：3.在线调试，在 JJEncode 代码第一行下断点，然后一步一步执行，最终也会在虚拟机（VM）里看到源码
- 要点6：逆向的目标主要是翻页接口 _signature 参数，调用的加密方法仍然是 window.get_sign()，和第一题是一样的，本文不再赘述，不清楚的可以去看 K 哥上期的文章。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J95jXqiaG0ecgQZZAGjjRezw2gRyycDWHQ8j842YXKYqqvtopqHOick0A0TtTj4kEfksnC9Sgn5yDA/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J95jXqiaG0ecgQZZAGjjRezsCicIicq0RVWmo59KZ8fTzxGU2pIic185QdCqg9HoT44HFicWSiaL4SCiaPw/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J95jXqiaG0ecgQZZAGjjRezxDCVHmicbrDNXHU6rRO93Qk0nHT4KqfbiaQLia8HUBrV43eMhGTuD2JnA/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J95jXqiaG0ecgQZZAGjjRezGxaaNcriaaOXp4TY6KFbgReuib58RNUCPM2lquzN0gmd53883bJ0Ywqg/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J95jXqiaG0ecgQZZAGjjRez8xUt4zialESHmRxOEbbsqNeVsHYaoWuwNNC5qsechfq0vhfHkQiaqy9A/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J95jXqiaG0ecgQZZAGjjRezw46qibs4N5icmx48X0gkMsRFO0icYqSO7f9mfoTkxeKgRb2WIpYSuAic1g/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J95jXqiaG0ecgQZZAGjjRezFwb9YMfgb8yicZHYst87jTKmAkVd2rfnYgtS64GOpP8LTu4hPYEiaWbA/640?wx_fmt=png

## 四、精华技能
- 技能定位：混淆还原 + Cookie/Token + 补环境
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
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- 混淆还原
- Cookie/Token
- 补环境
- JJEncode
