# 【JS 逆向百例】如何跟栈调试？某 e 网通 AES 加密分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500501&idx=1&sn=e2ad6e7765fd21ba7c912efffa18d69c&chksm=c1e2643ff695ed2958453b151d66c7df3a5675c0b1c0bc081011e4131d33851c12a46afe67c4#rd
- 发布信息：2021年9月27日 09:11 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly93ZWIuZXd0MzYwLmNvbS9yZWdpc3Rlci8jL2xvZ2lu

## 二、关键文字要点
- 要点1：接口：aHR0cHM6Ly9nYXRld2F5LmV3dDM2MC5jb20vYXBpL2F1dGhjZW50ZXIvdjIvb2F1dGgvbG9naW4vYWNjb3VudA==
- 要点2：来到某 e 网通的登录页面，随便输入一个账号密码登陆，抓包定位到登录接口为 aHR0cHM6Ly9nYXRld2F5LmV3dDM2MC5jb20vYXBpL2F1dGhjZW50ZXIvdjIvb2F1dGgvbG9naW4vYWNjb3VudA==，请求头里，有一个 sign，Payload 里，密码 password 被加密处理了。
- 要点3：首先来看一下请求头的 sign，尝试直接搜索一下，发现并不是经过某些请求返回的数据，观察一下其他请求，可以发现同样有 sign，而且每次请求的值都不一样：
- 要点4：由此可以初步判断这个值应该是通过 JS 生成的，全局搜索关键字 sign:，可以分别在 request.js、request.ts 两个文件里面看到疑似 sign 赋值的地方，埋下断点调试，成功断下，原理也很简单，时间戳加上一串固定的字符，经过 MD5 加密后再转大写即可。
- 要点5：password 是明文密码经过加密后得到的值，如果尝试直接去搜索的话，会发现出来的值非常非常多，要想找到准确的值难度巨大：
- 要点6：可以看到这条请求是 XHR 请求，本次我们使用 XHR 断点的方法来定位具体的加密位置，通过本次案例，我们来学习一下具体是如何跟进调用栈、如何通过上下文来定位具体的加密位置。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LJmLPiaJcQvictOzV5grPjHoZNhkpZPBpU6tz4mqWoTJtXFQZKhfkTvSialn6ibj0yBicyiaZbIhVZtCPw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LJmLPiaJcQvictOzV5grPjHoMDx6z4kPU6VhTuibYUBdXeVQFhFldMuklxpSL2DJygc8lMibR9O5sMdQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LJmLPiaJcQvictOzV5grPjHoicnFVj3zL44ojiavuibLpXEuQdAqkqgNgdFW1IdtQnzehZpvpcCiclMyqQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LJmLPiaJcQvictOzV5grPjHowPtH3lxFnAImFUqyL8BC2uLvqB5NpGaLHSVsDtEdbty0ib8YkqBwyoA/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LJmLPiaJcQvictOzV5grPjHoOsRR2ZTwG6rNG2iagDu7fVZ7zZ1R2FVFrUbjvsbSKl29RepPYply00w/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + MD5 + Hook + Cookie/Token
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
- AES
- MD5
- Hook
- Cookie/Token
