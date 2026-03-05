# 【JS 逆向百例】某音 X-Bogus 逆向分析，JSVMP 纯算法还原

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500563&idx=1&sn=f4c1e9a0765b99334bdd97e70f5dfd9b&chksm=c1e265f9f695ecef3a39fe8df3033620da17af4bc2879baf819c996041ddf61c06ac0bf7bb2c#rd
- 发布信息：2022年10月17日 19:07 | 作者：K哥爬虫

## 一、问题画像
接口：aHR0cHM6Ly93d3cuZG91eWluLmNvbS9hd2VtZS92MS93ZWIvdXNlci9wcm9maWxlL290aGVyLw==

## 二、关键文字要点
- 要点1：目标：某音网页端用户信息接口 X-Bogus 参数
- 要点2：接口：aHR0cHM6Ly93d3cuZG91eWluLmNvbS9hd2VtZS92MS93ZWIvdXNlci9wcm9maWxlL290aGVyLw==
- 要点3：一个完整的 JSVMP 保护系统，大致的架构应该是这样子的：服务器端读取 JavaScript 代码 —> 词法分析 —> 语法分析 —> 生成AST语法树 —> 生成私有指令 —> 生成对应私有解释器，将私有指令加密与私有解释器发送给浏览器，然后一边解释，一边执行。
- 要点4：就目前来讲，JSVMP 的逆向方法有三种（自动化不算）：RPC 远程调用，补环境，日志断点还原算法，其中日志断点也称为插桩，找到关键位置，输出关键参数的日志信息，从结果往上倒推生成逻辑，以达到算法还原的目的，RPC 技术K哥以前写过文章，补环境的方式以后有时间再写，本文主要介绍如何使用插桩来还原算法。
- 要点5：随便来到某个博主主页，抓包后搜索可发现一个接口，返回的是 JSON 数据，里面包含了博主某音号，认证信息、签名，关注、粉丝、获赞等，请求 Query String Parameters 里包含了一个 X-Bogus 参数，每次请求会改变，此外还有 sec_user_id 是博主主页 URL 后面那一串，webid 直接请求主页返回内容里就有，msToken 与 cookie 有关，清除 cookie 访问，就没这个参数了，实测该接口不验...
- 要点6：这条请求是 XHR 请求，所以直接下个 XHR 断点，当 URL 中包含 X-Bogus 参数时就断下：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLbic2Xg1W2GoCSgz5LzxibowSickHY8MdP8H1FnpALtuxrGWSic9o1hVH1A/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Luq0teplxPTMoS5iaZ7RANEoQjGwEHAibdRuC01LuGvGX3R2Ye7E2a7hxEJnSwaDMVj61IzgtEPICA/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Luq0teplxPTMoS5iaZ7RANEehqLxYUqchSklAc08PiaFNOHARCs5HJQJQhV2d1wUU7v1OWcHjLia5UA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Luq0teplxPTMoS5iaZ7RANEicVYa0cJKoshuiadoeibSvG1jlw6V8pIl8EOXYkGzHqibhSPd4OE12DWIg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Luq0teplxPTMoS5iaZ7RANErnHF45Cj2ias93eRKibOGicaG2zjicOAs5NpLNPmu5cyvZwQlKDWFWyMdw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Luq0teplxPTMoS5iaZ7RANEIqb1p8GBE0vWDYsnpZTnApibDY6qg14RmBictPjF0Licchj7AaWYT6PMQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + MD5 + Hook + Cookie/Token + 补环境
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
- 以上就是日志断点为什么要这样写的原因，下好日志断点后，注意前面我们下的 XHR 断点不要取消，然后刷新网页，控制台就开始打印日志了，因为有很多 XHR 请求都包含了 X-Bogus，如果你 XHR 断点取消了，日志就会一直打印直到卡死。日志...

## 七、迁移关键词
- AES
- MD5
- Hook
- Cookie/Token
- 补环境
- X-Bogus
- JSVMP
