# 【JS逆向百例】某词霸翻译逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500639&idx=1&sn=2aaffeca05ec95eeafafda2a3c187f42&chksm=c1e265b5f695eca335b4e92dbd7fc2100c54129de55ea9da933ab280480a0d362ba1c8c014e1#rd
- 发布信息：2024年3月1日 18:05 | 作者：K哥爬虫

## 一、问题画像
今天在查看某平台私信的时候，发现有位粉丝表示自己在逆向某站的过程中，有一些疑惑，态度十分友好，K哥一向是尽力满足粉丝需求的，本文就对该站进行逆向研究，该案例不难，不过为了便于粉丝理解，会写的相对详细点，大佬们直接跳过就可以了~

## 二、关键文字要点
- 要点1：今天在查看某平台私信的时候，发现有位粉丝表示自己在逆向某站的过程中，有一些疑惑，态度十分友好，K哥一向是尽力满足粉丝需求的，本文就对该站进行逆向研究，该案例不难，不过为了便于粉丝理解，会写的相对详细点，大佬们直接跳过就可以了~
- 要点2：进入翻译页，左边输入查询单词，右边即会翻译出中文释义，很显然通过接口传输的数据：
- 要点3：F12 打开开发者人员工具，重新输入一个英文单词，比如 ratel，进行抓包，/index.php 接口的 Form Data 中有个 q 参数，很明显，就是我们输入的待翻译的英文单词，请求参数 sign 是经过加密的：
- 要点4：Query String Parameters：URL 中的查询字符串部分所包含的参数；
- 要点5：Form Data：HTTP 请求中发送数据的方式，通常用于提交表单数据。
- 要点6：很明显的 AES 加密，mode 为 ECB，padding 为 PKCS7，key 是经过一系列编码得到的，为定值 L4fBtD5fLC9FQw22：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IPia6Yichw92j5qkv0MKbQ2OtkYibxOSMHSpI6Z9EM8VE2csq9K7x6ln2GUMkQqoJWtUTL4WE2HoRIw/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IPia6Yichw92j5qkv0MKbQ2OyXPmoNibULhnf3MiaiczosjFLtlHukk0bJ9IULDyhJ4x4Rt5fZiaALHckg/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IPia6Yichw92j5qkv0MKbQ2O6GlCtlf6vDuiaMF4MRcZk92EdX35eEONBuic8kXFppDq9yPye5erV36A/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IPia6Yichw92j5qkv0MKbQ2OOZyTwJEPCNAVibXRDVlibC3nCb9ubOo0uXaNwicYH0pic15CcrQ3UhYg8g/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IPia6Yichw92j5qkv0MKbQ2O8zGq57S4vdtN2ExQSFteb9XnVOeniaFatSgVb65g3rYARWgoem4OWyg/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IPia6Yichw92j5qkv0MKbQ2OhKZxL5IW9YvnUicHGJGdaDISfyqjicic67nYm4FnSpzYqb85VSlce3oRQ/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IPia6Yichw92j5qkv0MKbQ2OYvTmwwDmD0iaRyGBWic6S7Z78Vun4DdtS8jWqeNHXS2ALAbRwuBqHibOw/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IPia6Yichw92j5qkv0MKbQ2O5fOeiaI2cNVTlQicI0GcsaWbjw1A8dUibHfkFtyoUGeFQmZ5ZNMmemqFw/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + MD5 + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 大伙应该注意到了，content: JSON.parse((0, _.B6)(e.content))，这里是否就是 content 参数解密还原出释义的算法位置呢？跟进到 _.B6 中去看看，同样是 AES 算法，断住后就会发现，解密的位置...

## 七、迁移关键词
- AES
- MD5
- Cookie/Token
