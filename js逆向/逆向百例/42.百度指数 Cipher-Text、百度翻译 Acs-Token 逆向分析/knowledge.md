# 百度指数 Cipher-Text、百度翻译 Acs-Token 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500557&idx=1&sn=93c151a4f34adf25937044ccee536a29&chksm=c1e265e7f695ecf1991bdf3c860c4e9c7192585321b6ef3a716ad066e5fd920277a327be3179#rd
- 发布信息：2022年8月16日 17:43 | 作者：K哥爬虫

## 一、问题画像
目标：百度翻译最新请求头参数 Acs-Token，百度指数请求头 Cipher-Text

## 二、关键文字要点
- 要点1：目标：百度翻译最新请求头参数 Acs-Token，百度指数请求头 Cipher-Text
- 要点2：接口：https://fanyi.baidu.com/v2transapi
- 要点3：sign、token 参数的逆向方法本文不再赘述，想了解的可以阅读 K 哥往期百度翻译逆向的文章
- 要点4：先以百度翻译为例，随便输入文字，可以看到没有刷新页面，翻译结果就出来了，由此可以推断是 Ajax 加载的，打开开发者工具，选择 XHR 过滤 Ajax 请求，找到接口位置，详细分析推荐阅读K哥往期百度翻译逆向的文章，如下图可以看到在请求头中新增了一个 Acs-Token 参数，前面两串数字看起来像时间戳，具体加密方式需要我们来进一步分析：
- 要点5：这里使用 Fiddler 插件 hook 定位 Acs-Token 参数，相关 hook 操作方式可阅读K哥往期文章，本文不再赘述：
- 要点6：清除缓存，点击翻译，可以看到成功 hook 到 Acs-Token 参数，往下跟栈即可找到其值生成的位置：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLbic2Xg1W2GoCSgz5LzxibowSickHY8MdP8H1FnpALtuxrGWSic9o1hVH1A/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JwvA0ZnUGlrpBTxw7LtaEq1Qbn8P5iaVgXtTEJBagJ9v7ghISbGibHg6aftW0icechS1rdtqIkB00PQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JwvA0ZnUGlrpBTxw7LtaEqEmcHibt059IXzG1HzoxqIHsA2y554lOebaD4v36o2AT7wtVibic8OHtHg/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JwvA0ZnUGlrpBTxw7LtaEq3JuGfX7o1FNiaItBt2ezHVB8ezHE6DaNdEicWliaqunvhMLdT7PkENZfw/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JwvA0ZnUGlrpBTxw7LtaEqcRic8Do0CKotdhibmhartC13AGpTrZQoXic92SfOkKuickiaRtoAxPibHISg/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JwvA0ZnUGlrpBTxw7LtaEqtsvUVE33RnQEvQIZ44fk0iazydektdRScha1f5Z6WR3uAZl1Cic16HnA/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + Hook + Cookie/Token + 补环境
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
- AES
- Hook
- Cookie/Token
- 补环境
- Cipher-Text
- Acs-Token
