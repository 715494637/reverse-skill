# 【JS 逆向百例】某 7 网游登录接口参数逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500494&idx=1&sn=84c5d550cddf6e37640468a98463fd0b&chksm=c1e26424f695ed3254c6c3a0905e60915091f1b51be84152bc3c6d4892c29bf5ed31e0adb869#rd
- 发布信息：2021年8月20日 14:53 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly93d3cuMzcuY29tLw==

## 二、关键文字要点
- 要点1：接口：aHR0cHM6Ly9teS4zNy5jb20vYXBpL2xvZ2luLnBocA==
- 要点2：逆向参数：Query String Parameters：password: SlVEOThrcjgzNDNjaUYxOTQzNDM0eVM=
- 要点3：来到某 7 网游首页，随便输入一个账号密码，点击登陆，抓包定位到登录接口为 aHR0cHM6Ly9teS4zNy5jb20vYXBpL2xvZ2luLnBocA== ，GET 请求:
- 要点4：分析一下 Query String Parameters 里的主要参数：
- 要点5：callback 是一个回调参数，这个参数的值不影响请求结果，它的格式为 jQuery + 20位数字 + _ + 13位时间戳，使用 Python 很容易构建：
- 要点6：login_account 是登录的账户名；

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IUYqicK0UqCyPqwT0ib4eb846OmKibTWgNicsLYVkjrVIfib2Nds8uvmRKAApgvdrMk9Y5th2ic877GLicg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IyXASUYVZqIEibOcJqWTkv3XI7MU7hNpicfhhBa5pro9clcZ5mStx5VhMetr55ibH11wTibCiaaDHb8Iw/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IyXASUYVZqIEibOcJqWTkv3K2S9N1BG4vJj1nMDWjvhSXuZcuFYtFk569MJlpkFjxam73SlibRdpUA/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/iabtD4jabia4JSlhKbZ7886IyfdWMia07ODtZic3RreIOyKWHWwwY5ibGEB9xR0n3xjJBJm385fWMDHPXUgad9wZz9A/640?wx_fmt=gif
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/5NAO1Vbb2iaYoibSzCFLGtqkhZ6zyC56NXLIiaQXWy1icdlbm9DjqktFzMpeIsmuhHPiaKfic8faobCw0O3ziaL2VXX2A/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- RSA
- 补环境
