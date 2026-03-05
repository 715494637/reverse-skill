# 【JS 逆向百例】元素ID定位加密位置，某麻将数据逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500496&idx=1&sn=26fae0f3775d8711d038b9cac3c1cd2e&chksm=c1e2643af695ed2c29160e87621fb15399b9ac80d955cbb631c7e79142a34d739e7073536775#rd
- 发布信息：2021年8月26日 10:38 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly90ZW5ob3UubmV0LzIvP3E9MzM2bTIzN3AyNDc5czE2N3ozcw==

## 二、关键文字要点
- 要点1：主页：aHR0cHM6Ly90ZW5ob3UubmV0LzIvP3E9MzM2bTIzN3AyNDc5czE2N3ozcw==
- 要点2：本次要逆向的对象于以往不同，不是某个接口的参数，而是网页中的数据，一般网页中的数据都可以在源码中看到，或者通过某个接口传过来，而本次的目标数据是通过 JS 加密得到的，先来抓包看看基本情况：
- 要点3：F12 检查，可以看到我们要的数据在 textarea 标签里面，看起来没什么毛病，那么直接使用 Xpath 提取试试看：
- 要点4：可以看到实际上提取到的数据是为空的，我们查看网页源代码，直接搜索 textarea，同样也是没有的，试试直接搜索数据也是没有的：
- 要点5：既然这种数据不存在于网页源码中，也不是通过其他接口返回的，那么最有可能就是通过 JS 加密后直接插入到网页源码中的，那么这里应该如何定位加密的位置呢？对比一下插入数据后的网页源码和未插入数据的网页源码，可以看到蓝色框里的代码都是通过 JS 插入的，而且这个 1008.js 多半就是加密的 JS 文件：
- 要点6：继续往上跟踪 g 的值的来源，会发现步骤比较复杂，那么我们直接将这部分函数（fa 函数）整个复制下来运行调试（大约第 794 行至第 914 行）， 本地进行调试会提示 ga 和 O 未定义，我们在其定义的语句的下一行埋下断点进行调试，可以看到 ga 的值其实是固定的 q，O 就是 URL 后面 q 的值，如：336m237p2479s167z3s

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LkbDMRFibfs2RgXknRVlib3XeoVLkBlibbmiam1PWyKZSRGZ66OAhQ64oqpRoHDBHHaAft78ztO7KdJQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LkbDMRFibfs2RgXknRVlib3Xdb67Hhce97RcowAp96Su6ibL1brlI730FHWt4sSfxEo0ibBk9hHoicbzQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LkbDMRFibfs2RgXknRVlib3XrzUjfG9Mia8dJWCg0NtvsxqYlryMsLvlfTLKpN4TlxD2NxnBZsap4CQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LkbDMRFibfs2RgXknRVlib3XbqiabYgAHBKBvX0AibREuFD1zIHI9Haq0rJMbw5F3j3mn6cfmSEz24cQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LkbDMRFibfs2RgXknRVlib3XQ9Ljm4gEYZwDlmSgvCjE69wgay0GWVvNiaVdfc37Ajia0s1Dpiaibz3LGg/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- AES
