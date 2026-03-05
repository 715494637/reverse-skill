# 【JS 逆向百例】当乐网登录接口参数逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500491&idx=1&sn=90e20fbcd25a00da204b7757ed7eaefc&chksm=c1e26421f695ed37accfb7c8edcb73e46220ffc2972c780ae4fa41a8f4a659089c83f9870137#rd
- 发布信息：2021年8月17日 16:47 | 作者：K哥爬虫

## 一、问题画像
主页：https://oauth.d.cn/auth/goLogin.html

## 二、关键文字要点
- 要点1：接口：https://oauth.d.cn/auth/login
- 要点2：逆向参数： Query String Parameters： pwd:26fac08e6b524bef29c09479fdefe604ea7b2c4d7285a3e01f0969a9230a4e9af1b8ed23ca840978f61bf0e7850c72ece07dc95ef3f7484a5086284f825bd420da19ecd8b832877b113f21181bc9a22cc795c92f8d4c8dc6ca8b21309...
- 要点3：随便输入一个账号密码，点击登陆，抓包定位到登录接口为 https://oauth.d.cn/auth/login ，GET 请求，Query String Parameters 里，密码 pwd 被加密处理了。
- 要点4：全局搜索 pwd 关键字，在首页就可以找到一段 submitData 提交数据的函数，埋下断点进行调试，可以发现明文密码是经过 RSA 加密后得到的：
- 要点5：跟进这个 rsa 加密函数：
- 要点6：var rsa = function (arg) { setMaxDigits(130); var PublicExponent = "10001"; var modulus = "be44aec4d73408f6b60e6fe9e3dc55d0e1dc53a1e171e071b547e2e8e0b7da01c56e8c9bcf0521568eb111adccef4e40124b76e33e7ad75607c227af8f8e0b759...

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JSlhKbZ7886IyfdWMia07ODy9qkTmeL8Nd1GbecibLNMtibH3mkOuwqRUeNH76gwPGs7wYz1dc1bQCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JSlhKbZ7886IyfdWMia07OD4ribMp4Vp3ezz9EWfficeiaZeZOVZUuv5uGUpmGoY2TkkKE4e0BotBfSw/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JSlhKbZ7886IyfdWMia07OD52MjAygF0L7hAXOgAEHUVYoNVbrwPzIlfOQic0OIkQ6gRR25icCZEmTQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
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
