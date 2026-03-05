# 【JS 逆向百例】有道翻译接口参数逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500489&idx=1&sn=ec2bb0e14f21c2b4a8bf03baa761b986&chksm=c1e26423f695ed35827101f302e383fb5bbcd8c857dfe7ab3b5cf4250277327c0984a8ed779a#rd
- 发布信息：2021年8月13日 09:39 | 作者：K哥爬虫

## 一、问题画像
接口：https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule

## 二、关键文字要点
- 要点1：接口：https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule
- 要点2：translateResult 是翻译的结果，smartResult 是智能推荐的其他翻译，那么这个 URL 就是我们需要的翻译接口了。
- 要点3：继续跟进 generateSaltSign 函数，点击跳转到 r 函数，这里可以看到关键的加密代码：
- 要点4：bv 的值由 UserAgent 经过 MD5 加密得到
- 要点5：sign 的值由待翻译的字符串、salt 的值和另外两个固定的字符串组成，再由 MD5 加密得到最终结果
- 要点6：或者直接引用 JS，使用 nodejs 里面的加密模块 CryptoJS 来进行 MD5 加密，改写 JS 如下：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUostR9o3TQOsHZq38byNp5z9HfCnCVA2VeeYQV7mxH1pAVPPsFYoGzA/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUDrRdSFfWyddylbH0QVohJkosAYoLzbK1lZ20CiaMowrgBKovKy5S0jQ/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jURXBsztVkasdv1L87c6F4B825icj4nficpd9HkbOuLBaWJCZ7xPmVFFNA/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/iabtD4jabia4JSlhKbZ7886IyfdWMia07ODtZic3RreIOyKWHWwwY5ibGEB9xR0n3xjJBJm385fWMDHPXUgad9wZz9A/640?wx_fmt=gif

## 四、精华技能
- 技能定位：MD5 + Cookie/Token
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
- MD5
- Cookie/Token
