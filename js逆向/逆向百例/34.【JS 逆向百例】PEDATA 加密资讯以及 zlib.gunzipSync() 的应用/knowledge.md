# 【JS 逆向百例】PEDATA 加密资讯以及 zlib.gunzipSync() 的应用

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500530&idx=1&sn=03fa2857ad73b3281eb6677e228cd58f&chksm=c1e26418f695ed0e7e1ce7425edffee02dc3221f8b4b23ddea8477761d844ab579e75ae0b870#rd
- 发布信息：2022年1月6日 17:22 | 作者：K哥爬虫

## 一、问题画像
目标：某投资领域 SAAS 系统 PEDATA MAX 资讯，返回结果加密

## 二、关键文字要点
- 要点1：目标：某投资领域 SAAS 系统 PEDATA MAX 资讯，返回结果加密
- 要点2：接口：aHR0cHM6Ly9tYXgucGVkYXRhLmNuL2FwaS9xNHgvbmV3c2ZsYXNoL2xpc3Q=
- 要点3：逆向参数：请求返回的加密结果，data: "L+o+YmIyNDE..."
- 要点4：我们在首页，点击查看全部24小时资讯，往下拉，资讯是以 Ajax 形式加载的，我们选中开发者工具 XHR 进行筛选，很容易找到一个 list 请求，其返回值 data 是一串经过加密后的字符串，exor 不知道是啥，但是后面可能有用，ts 是时间戳，如下图所示：
- 要点5：我们注意到返回的是一个字典，在获取到加密数据后，肯定会有一个取值的过程，所以我们直接搜索键，搜索 exor 结果只有一个：
- 要点6：这里e.data就是返回的字典，e.data.data、e.data.exor 依次取加密值和 exor，这里就可以猜测是将加密值取出来进行解密操作了，我们在此函数结尾处也打个断点，看看这段代码执行完毕后，data 的值是否变成了明文：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LdYTSkNe1XGmZXXIT0cgODBlZYHY46oDhcJicHshlaXFEKmfLzm41LQ5fq1iaqL5DGjHo69gSiclolA/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LdYTSkNe1XGmZXXIT0cgOD5OHru1ibia7QE6ILz6aFaGS0GFRpqNScibZibCGkX5aoAQtTCTSPZ9uGLg/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LdYTSkNe1XGmZXXIT0cgODS3ujsJxU0QlvdPzM7YSj2OzGVQlrAan5BbiaWiboOdZuCo940eHheeHg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LdYTSkNe1XGmZXXIT0cgODAibITBLqHpEYzcKIBFHibyRbvHAKwbFvdxX2o5rjlhicPeibshfs8GWrtQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LdYTSkNe1XGmZXXIT0cgODgPLcpJYedJhOdW8d6ibkTTzRLiaIrFYYPyyBENfKDTnklibWQ3GFwL79w/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LdYTSkNe1XGmZXXIT0cgODVHuBb5cRxc3eaaP5YXFCUrROTF3Dx6iaA8ttYu1WH3axf64Otl9ibGMA/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LdYTSkNe1XGmZXXIT0cgODI3UvfhPUlxeIf0B6WiazfjtKaNNvry9Frw2WCMPDINc16aNgkgmBTTQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：Hook + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 我们注意到返回的是一个字典，在获取到加密数据后，肯定会有一个取值的过程，所以我们直接搜索键，搜索 exor 结果只有一个：

## 七、迁移关键词
- Hook
- Cookie/Token
- PEDATA
- zlib
- gunzipSync
