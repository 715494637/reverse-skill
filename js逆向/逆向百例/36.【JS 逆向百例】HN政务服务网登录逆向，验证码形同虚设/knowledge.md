# 【JS 逆向百例】HN政务服务网登录逆向，验证码形同虚设

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500533&idx=1&sn=7eda7752ce7040002edd0fdadd22dfb0&chksm=c1e2641ff695ed09158f07419c3c06fa0cd9aa3936a00ebf75ff37ab680682668b80beeb80dc#rd
- 发布信息：2022年1月18日 15:47 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9sb2dpbi5obnp3ZncuZ292LmNuL3RhY3MtdWMvbG9naW4vaW5kZXg=

## 二、关键文字要点
- 要点1：接口：aHR0cHM6Ly9sb2dpbi5obnp3ZncuZ292LmNuL3RhY3MtdWMvbmF0dXJhbE1hbi9sb2dpbk5v
- 要点2：逆向参数：Form Data：loginNo、loginPwd、code、requestUUID Request Headers：token
- 要点3：跟进 encrypt，可以看到用到了 JSEncrypt，标准的 RSA 加密：
- 要点4：Form Data 解决了，再来看看 Request Headers 里的 token 参数，由于它存在于请求头里，所以我们可以通过 Hook 的方式来查找其生成的地方：
- 要点5：这个 token 参数在很多请求中都会用到，生成方法是一样的，都是拿 csrfSave 请求返回的 data 经过 RSA 加密后得到的：
- 要点6：2、访问 csrfSave，拿到一个 data 值，经过 RSA 加密得到 token，携带 token 访问 uploadIdentifier，拿到 uuid；

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IhUfPdlo0yQyCjSXzpjCQvjX6RYFtG9bgOpLzIKxn3SmuGSOVNTs4IiaTFw074CFQOibNl0A0w28Cg/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IhUfPdlo0yQyCjSXzpjCQvQ0EVcQD130Leh4wqByfrbpAbykk3GGm7bc8cA3jlqUicKdF1bJqPXVA/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IhUfPdlo0yQyCjSXzpjCQvMAjP3yE6ZObt06u46AJMC3yHLj94qzvU4fEkiceRHZibEiaPfrQS6zeWA/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IhUfPdlo0yQyCjSXzpjCQvGOibdFMCcyic9wDZWZeYlDdjwrHJ2NO64JIDsBQMXjzHS6QbFaNxsBzA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IhUfPdlo0yQyCjSXzpjCQvUyjiclrjPlsQpX3yzgfRpZDPbhYuhnY4sEmoWf6M8P1xcSfMb6cKYSw/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IhUfPdlo0yQyCjSXzpjCQvWj5VlZPnaaGsibSn81HK5BYhibblZkJfNxhQibb1hpoByBCcic0QzzbiaDw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IhUfPdlo0yQyCjSXzpjCQvoZIg2LIgVWPpmbVpeNrn9G1IYdjgXrAib5k7Rb3r8twW0YanYPVwFpw/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + Hook + Cookie/Token + 验证码/风控
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- RSA
- Hook
- Cookie/Token
- 验证码/风控
