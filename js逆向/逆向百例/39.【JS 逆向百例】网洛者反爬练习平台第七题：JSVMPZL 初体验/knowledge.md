# 【JS 逆向百例】网洛者反爬练习平台第七题：JSVMPZL 初体验

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500543&idx=1&sn=6e2b472e4caf47edba10d62a9591dd3d&chksm=c1e26415f695ed032b0d34971fb61b9eb35328c88ad310cfe24b4a69520bc0e755f195144ad6#rd
- 发布信息：2022年3月28日 16:38 | 作者：K哥爬虫

## 一、问题画像
链接：http://spider.wangluozhe.com/challenge/7

## 二、关键文字要点
- 要点1：跟进y__()，就可以看到 jsvmpzl 混淆的代码了，如果有做过猿人学平台的题，会发现此混淆和猿人学第18题(https://match.yuanrenxue.com/match/18)是一样的，在y__() 第一行下个断点，观察__v_() 第一个参数_，_[2][0] 你会发现有关 MD5 算法的一些特征，如下图所示：
- 要点2：那么我们直接大胆猜测一下，是不是就是某个数据经过 MD5 之后就是_signature了呢？再继续调试一下，注意arguments的变化：
- 要点3：可以注意到，源码里面有很多 md5_ff、md5_gg、md5_hh、md5_ii 的方法，最后一个值都是固定的，那么有没有可能此题就是在标准 MD5 的基础上修改了一些默认值呢？所以我们可以直接 Hook 这些关键方法，在控制台输出传入的值，来一一对比一下，看看默认值是否是一样的，为了方便观察，我们还可以为输出语句加上颜色，Hook 代码如下：
- 要点4：Hook 代码写得比较死板，熟悉 JS 的大佬可自己优化一下，注意注入代码的时机，清除定时器后，断点运行到 y__() 方法后再注入，然后取消断点，一直下一步，就可以在控制台看到输出的参数了，如下图所示：
- 要点5：与默认参数进行对比，可以发现 md5_hh() 里有两个默认参数被修改了：
- 要点6：除了 Hook 以外，我们还可以通过插桩调试的方式，将整个生成 _signature 的流程、涉及到的参数、生成的值，都通过日志的形式打印出来，逆向分析其逻辑。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLbic2Xg1W2GoCSgz5LzxibowSickHY8MdP8H1FnpALtuxrGWSic9o1hVH1A/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LPIWu61Oiaugrnh818tTicsSbWNVlqRavuuu48kTWdAMfUXtKoeHdCfcSXbHKh5TibDKcmL1CDByxZw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LPIWu61Oiaugrnh818tTicsSjp3kWCR7FMs6PO3Llhqm8QzP3VkCmibssb1yf6uNUhSjkK9wPVDtnqg/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LPIWu61Oiaugrnh818tTicsSDsbYE97QqbRcg7UiaWibPnSmWj2GlvhZOribTqc3R1SPqeXHzQUicaf45A/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LPIWu61Oiaugrnh818tTicsS8k4ty5tZduuiaSvJaBwVQF3BJ682s00TiaiaHBf7XiaiavtkN8Pukn4t2uQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LPIWu61Oiaugrnh818tTicsSOibc2TNXgZO1KOOQrUIgGL4T64dvlhwEEAYibyCQMbd7lWEwXp16IN4w/640?wx_fmt=png

## 四、精华技能
- 技能定位：MD5 + 混淆还原 + Hook + Cookie/Token + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。

## 六、排错清单
- 那么我们直接大胆猜测一下，是不是就是某个数据经过 MD5 之后就是_signature了呢？再继续调试一下，注意arguments的变化：
- 可以注意到，源码里面有很多 md5_ff、md5_gg、md5_hh、md5_ii 的方法，最后一个值都是固定的，那么有没有可能此题就是在标准 MD5 的基础上修改了一些默认值呢？所以我们可以直接 Hook 这些关键方法，在控制台输出传入的...
- Hook 代码写得比较死板，熟悉 JS 的大佬可自己优化一下，注意注入代码的时机，清除定时器后，断点运行到 y__() 方法后再注入，然后取消断点，一直下一步，就可以在控制台看到输出的参数了，如下图所示：

## 七、迁移关键词
- MD5
- 混淆还原
- Hook
- Cookie/Token
- 补环境
- JSVMPZL
