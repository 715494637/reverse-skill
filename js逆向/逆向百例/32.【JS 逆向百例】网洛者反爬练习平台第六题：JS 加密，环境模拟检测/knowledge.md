# 【JS 逆向百例】网洛者反爬练习平台第六题：JS 加密，环境模拟检测

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500528&idx=1&sn=e16d45db125dc15f6b8964a2f3056b94&chksm=c1e2641af695ed0c567e4f0e610e2062fa3c70f86cd2996fd6bc92c44a76d2088de09d1a204a#rd
- 发布信息：2021年12月28日 16:28 | 作者：K哥爬虫

## 一、问题画像
链接：http://spider.wangluozhe.com/challenge/6

## 二、关键文字要点
- 要点1：目标：网洛者反反爬虫练习平台第六题：JS加密，环境模拟检测
- 要点2：简介：同样是要求采集100页的全部数字，并计算所有数据加和。请注意！不要重复使用一个参数值，不要欺骗自己哦！
- 要点3：通过抓包分析，可以发现本题不像前面几题一样 Payload 中参数有变化，而是在 Request Headers 里有个 hexin-v 的，每次请求都会变化，如果有朋友做过某花顺财经爬虫的话，会发现这个参数在某花顺的站点里也大量使用，如下图所示：
- 要点4：首先尝试直接搜索一下 hexin-v，只在 6.js 里有值，很明显这个 JS 是被混淆了的，无法定位，仔细观察一下，整个 6.js 为一个自执行函数（IIFE），传入的参数是7个数组，分别对应 n，t，r，e，a，u，c，如下所示：
- 要点5：6.js 在调用值的时候都是通过元素下标取值的，所以这个混淆也很简单，如果你想去还原的话，直接写个脚本将数组对应的值进行替换即可，当然在本例中比较简单，不用解混淆。
- 要点6：因为 hexin-v 的值在 Request Headers 里，所以我们可以通过 Hook 的方式，捕获到设置 header 的 hexin-v 值时就 debugger 住（注入 Hook 代码的方法K哥以前的文章有详细讲解，本文不再赘述）：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IaC28B3Gec5MvUAhTyrKyN98nu06noR6FRqetaXvjUibtHiaNEJTaw6jyx7ucicR4V7McU1fKFASb4A/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IaC28B3Gec5MvUAhTyrKyNZWicqxBHalTOtEXFEK0ic7ZDV59Z31DFnsebxPb4LsNNZQnSUiawqKs3w/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IaC28B3Gec5MvUAhTyrKyNNs85mI9CJmibYkk4SycgnVORpPMZjx3n2rxc48NROthRfiaFLbe4EyMw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IaC28B3Gec5MvUAhTyrKyN80mBudrVXLjPqpTu56D2icCn8wlvdY3P4Qu7CmKeaqN7Wribm6cRgndw/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IaC28B3Gec5MvUAhTyrKyNM0e8o5gl97v7HIrPwYEhPMN6PZ7zlnSfKSBbYj4j9je9hFtv0zD5Tg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IaC28B3Gec5MvUAhTyrKyN7B1Or2ConSJlnSNtZlVsr5jVbaF7vKHq1eMoY8Cf82mzSgcFicxjic7Q/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IaC28B3Gec5MvUAhTyrKyNYR869QHc6u6libQicjM1aAHkrO2d085LVLuj1luWic3QePE4fkRPeZbicw/640?wx_fmt=png

## 四、精华技能
- 技能定位：混淆还原 + Hook + 反调试
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 简介：同样是要求采集100页的全部数字，并计算所有数据加和。请注意！不要重复使用一个参数值，不要欺骗自己哦！

## 七、迁移关键词
- 混淆还原
- Hook
- 反调试
