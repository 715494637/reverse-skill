# 【JS 逆向百例】房天下登录接口参数逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500492&idx=1&sn=2fa6bde901e4631d16cd3d888b10838f&chksm=c1e26426f695ed300e93096b13b719a70c0d6cd1f3bdf7084275484f9a936ee896f2239ef33f#rd
- 发布信息：2021年8月18日 17:47 | 作者：K哥爬虫

## 一、问题画像
接口：https://passport.fang.com/login.api

## 二、关键文字要点
- 要点1：目标：房天下账号密码登录
- 要点2：接口：https://passport.fang.com/login.api
- 要点3：随便输入一个账号密码，点击登陆，抓包定位到登录接口为 https://passport.fang.com/login.api ，POST 请求，Form Data 里，密码 pwd 被加密处理了。
- 要点4：加密参数只有一个 pwd，直接全局搜索，出现一个 loginbypassword.js，很明显就是加密的 JS，这个 JS 贴心的写上了中文注释，直接来到登录模块，埋下断点：
- 要点5：这里主要用到了 encryptedString 这个函数和 key_to_encode 参数，鼠标放到 encryptedString 函数上面，可以看到这个函数实际上是在一个叫做 RSA.min.js 的加密 JS 文件里，很明显的 RSA 加密，我们跟进这个函数，直接将所有加密函数剥离下来进行本地调试即可：
- 要点6：而 key_to_encode 这个参数是可以直接在首页搜到，可以看到是向 RSAKeyPair 函数传入参数得到的：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JSlhKbZ7886IyfdWMia07OD7Tiad5l19Et3lneVcJf9Mq5hjibB7aibSAKQLXNTiaWicbUicaD6QNUrG4pA/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JSlhKbZ7886IyfdWMia07OD10Ws71Y2XXPYuibSyN8Dibv6At2ppLBgYX45ZEEfxRz1Zm66AjByaShA/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IyXASUYVZqIEibOcJqWTkv3hcibJ0AqYiczRQ4ZKlpcIYKFAibH0uscqZgHI4xlaV2oPJlK4Oy5ST4Ww/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JSlhKbZ7886IyfdWMia07ODqWBOylQdaQQRfPN9YU4A64DtmaibLVW4jVP1BKLGicKlWibZ84hjpDGLQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/iabtD4jabia4JSlhKbZ7886IyfdWMia07ODtZic3RreIOyKWHWwwY5ibGEB9xR0n3xjJBJm385fWMDHPXUgad9wZz9A/640?wx_fmt=gif

## 四、精华技能
- 技能定位：RSA
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
- RSA
