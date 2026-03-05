# 【JS逆向百例】某芯商城逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500646&idx=1&sn=eda550dee0d683dece6b2995e7c95991&chksm=c1e2658cf695ec9af85fdca979f9fe799b06977ea2e2a4bae62c9f79bed8d569292bf46dc0a2#rd
- 发布信息：2024年3月21日 18:03 | 作者：K哥爬虫

## 一、问题画像
继上次粉丝提问，K哥出了对应站点的分析文章之后，又有不少小伙伴提出了在逆向一些网站的时候碰到的问题，态度都很友好，K哥会尽力满足粉丝需求，不过只能一个个慢慢来，本文先对其中一个进行逆向分析：

## 二、关键文字要点
- 要点1：继上次粉丝提问，K哥出了对应站点的分析文章之后，又有不少小伙伴提出了在逆向一些网站的时候碰到的问题，态度都很友好，K哥会尽力满足粉丝需求，不过只能一个个慢慢来，本文先对其中一个进行逆向分析：
- 要点2：打开开发者人员工具，随便搜索一个型号的芯片，在 Network 中即会抓包到相应的数据接口，即 /search/ajax-get-res-v001：
- 要点3：p 参数值长度为 32 位，看着很像是 MD5 加密，我们来跟一下，p 参数在下图处生成：
- 要点4：直接 hook 一下 window 中的 x 参数，断住后跟栈分析，使用 Fiddler 或者油猴之类的都可以，hook 脚本如下：
- 要点5：向上跟栈到 VM 中，可以看到 window.x = hex_md5('xxx')，这里像是 MD5 加密的源码：
- 要点6：我们直接拿加密内容去爬虫工具站测试一下，发现值并不一样，这里的 MD5 算法可能经过了魔改：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IuPOrVGMvYM7Hfvb4SeBicsSVef5EYnr1tOdAPgh2QqWwEkh5fG7oedbImIHMahznZjz9Qv9HT7VA/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IuPOrVGMvYM7Hfvb4SeBicsqQjuTvwBGe0snTkPPfxWHcVCmQrNXuDtmMbIVXVCGWzm3vcDJhjWwQ/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IuPOrVGMvYM7Hfvb4SeBicsazObJUEaMxvLMtNxEjk9xcxH70AbAISX9cwr3ziaMrTGyf0UUOwGf2Q/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IuPOrVGMvYM7Hfvb4SeBics1EZ0G6eMTFWsTu5EgHJqkD9fvdWB5vqcsKymHLFTrarIjkicxqMH1Mg/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IuPOrVGMvYM7Hfvb4SeBicseFFJyZsgsVJiaSBy0B0vY3GUkIYgrNEEalg4ueHH53iaDicVXAeTVwIgQ/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IuPOrVGMvYM7Hfvb4SeBicssaLZwTJ4siaCNaMxhicCVIeZTxp3ViaPbXcyRnxhtvh1zcvtr2FgiaE5JQ/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IuPOrVGMvYM7Hfvb4SeBicslFSnEsPbAJQOUaZCicVeUhFwQQ9LSSdrRwOpb6wthNDlTXhbgWZOIDQ/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/iabtD4jabia4IuPOrVGMvYM7Hfvb4SeBics0vsAWZQau7AZc3Fiafncia0dvntGSxQITu77picK0TAqtt2t53lYSxraQ/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：MD5 + Hook + 补环境
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
- MD5
- Hook
- 补环境
