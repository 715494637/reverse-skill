# 【JS 逆向百例】某易支付密码 MD5+AES 加密分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500515&idx=1&sn=17d6e81c313fd4265ade0490f7eb542c&chksm=c1e26409f695ed1f808ba9db699e0eb30fbd33ded0263bf8d1c156a78f6c5181bde39c9deeb8#rd
- 发布信息：2021年11月16日 16:01 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9lcGF5LjE2My5jb20vaDVDYXNoaWVyL2JlZm9yZS12YWxpZGF0aW9u

## 二、关键文字要点
- 要点1：接口：aHR0cHM6Ly9lcGF5LjE2My5jb20vY2FzaGllci9tL3NlY3VyaXR5L3ZlcmlmeVBheUl0ZW1z
- 要点2：逆向参数：Form Data： "shortPayPassword":"ZY4iJQkXwvhMwlw2hvpZQ9T%2Fc1S7wRfcfQrpe6bmnlA3hy5PJTJqeYY%2Bj372D70i"
- 要点3：本期逆向素材来源于K哥爬虫交流群里某位群友的求助：
- 要点4：粉丝发来的链接是某宝阁平台，一个游戏角色的购买链接，购买方式是某易支付，逆向的对象是购买时加密后的支付密码，需要注意的是要将界面调成手机模式，点击支付，来到输入密码页面，随便输入一个 6 位密码，点击确定，抓包到支付密码是加密后的，如下图所示：
- 要点5：直接搜索关键字 shortPayPassword，可以在 common.e94aeed9.js 里找到加密函数，如下图所示：
- 要点6：e：一串字符串，前后找不到其生成的地方，可以直接搜索一下这个字符串，发现是通过一个接口返回的 peEnSeed 值；

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KJVFoXuhnaPfbyeANGNLgQoLYjju8vooGqhczE4tOk4NO2hV3cxmmKEbfdZ8A2rMdSVl22VicG2Yg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KJVFoXuhnaPfbyeANGNLgQnp3AmF2j60xV98ibic9En1vFkbbg9GV8LtDLMS2x6C6U3PpqlCXEObWQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KJVFoXuhnaPfbyeANGNLgQdOLXk2NR0byaa6sJiaBsPtmVicWeXNTRfjE8DwqLn1tGMhF6akJ7po2A/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KJVFoXuhnaPfbyeANGNLgQcq5RHDS6dDWiaPJX8icYmGhyGImz3MLCIN5iaWwjuPVO1c2w74BUwfVhg/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KJVFoXuhnaPfbyeANGNLgQjLPqc16p0kqPnqhNK8WpUu3okluDDNhrFfalbTbpLgYhLTQOib3LTDQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + MD5
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 粉丝发来的链接是某宝阁平台，一个游戏角色的购买链接，购买方式是某易支付，逆向的对象是购买时加密后的支付密码，需要注意的是要将界面调成手机模式，点击支付，来到输入密码页面，随便输入一个 6 位密码，点击确定，抓包到支付密码是加密后的，如下图所...

## 七、迁移关键词
- AES
- MD5
