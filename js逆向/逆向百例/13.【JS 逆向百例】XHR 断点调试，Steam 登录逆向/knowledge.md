# 【JS 逆向百例】XHR 断点调试，Steam 登录逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500500&idx=1&sn=661a33a6e23c5e0cf9289980c16df0bf&chksm=c1e2643ef695ed283bb360f81949eb81004ff46f07db421a023bea78d5319939a57a3637017a#rd
- 发布信息：2021年9月9日 14:33 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9zdG9yZS5zdGVhbXBvd2VyZWQuY29tL2xvZ2lu

## 二、关键文字要点
- 要点1：接口：aHR0cHM6Ly9zdG9yZS5zdGVhbXBvd2VyZWQuY29tL2xvZ2luL2RvbG9naW4v
- 要点2：逆向参数： Form Data： password: MzX419b8uvaNe//lkf+15sx6hnLD/L1BX...... captchagid: 5718995253934681478 rsatimestamp: 374533150000
- 要点3：来到 Steam 的登录页面，随便输入一个账号密码登录，抓包定位到登录接口为 aHR0cHM6Ly9zdG9yZS5zdGVhbXBvd2VyZWQuY29tL2xvZ2luL2RvbG9naW4v ，POST 请求，Form Data 里，donotcache 是 13 位时间戳，密码 password 被加密处理了，captchagid 和 rsatimestamp 不知道是什么，captcha_text 是验证码：
- 要点4：我们注意到登录请求的上面，还有一个 getrsakey 的请求，很明显和 RSA 加密有关，应该是获取 key 之类的参数，可以看到其返回值类似于：
- 要点5：这里可以发现登录请求的 rsatimestamp 参数就是这里的 timestamp，其他参数在后面会用到。
- 要点6：前面 XHR 的两种方法，无论使用哪一种，定位到的位置都是一样的，查看右侧 Call Stack，即调用栈，一步一步往上查看调用的函数，在 login.js 里面，可以找到语句 var encryptedPassword = RSA.encrypt(password, pubKey);，非常明显的 RSA 加密：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4mj6oCTkU58W5cxl0MBaXvIzOAKEWOWcGWNbsN8kFfhRg4TLZRBvV6A/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4A2jgdm9T9WBf6IklUjH88KzTjUYIsZDf9ZTCcM15J1aAqWRsCic9HTQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4YUzdZoNnGAZO30WWQicjRePtePvgQSSgfNpkR9ibiaG3Uqc26JR64AemQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4oMIEfrHdoqzrLzbQTDDTz8Bh7zNbt7chGTTBdzqY7uonBbZ54DIXmA/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LogmBsMzC0YS0icwQhib4Qe4r9EHLdtpT7B0icvjw3O2BkEpL0etqWMaibBwrmOC6yyPicYVUZP2ia7VWA/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + Hook + 验证码/风控
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 我们注意到登录请求的上面，还有一个 getrsakey 的请求，很明显和 RSA 加密有关，应该是获取 key 之类的参数，可以看到其返回值类似于：

## 七、迁移关键词
- RSA
- Hook
- 验证码/风控
- XHR
- Steam
