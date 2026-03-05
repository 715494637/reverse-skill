# 【JS 逆向百例】某网站加速乐 Cookie 混淆逆向详解

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500554&idx=1&sn=c8a68b6b3ed8386c1b42dd102163d6f2&chksm=c1e265e0f695ecf6912d5195ddb9552f39b750a74a82c996dd0c8d473585071389a90f9b4d9a#rd
- 发布信息：2022年8月2日 17:58 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly93d3cubXBzLmdvdi5jbi9pbmRleC5odG1s

## 二、关键文字要点
- 要点1：逆向难点：OB 混淆、动态加密算法、多层 Cookie 获取
- 要点2：第一次请求网站，网站返回的响应状态码为 521，响应返回的为经过 AAEncode 混淆的 JS 代码；
- 要点3：第二次请求网站，网站同样返回的响应状态码为 521，响应返回的为经过 OB 混淆的 JS 代码；
- 要点4：第三次请求网站，网站返回的响应状态码 200，即可正常访问到网页内容。
- 要点5：第一次请求网站，服务器返回的 Set-Cookie 中携带 jsluid_s 参数，将获取到的响应内容解密拿到第一次 jsl_clearance_s 参数的值；
- 要点6：携带第一次请求网站获取到的 Cookie 值再次访问网站，将获取到的响应内容解混淆逆向拿到第二次 jsl_clearance_s 参数的值；

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4K4xsicZibPichq5ogI5qAQZcxibibCdGq537EgpIIzfhG8cfM0whVFpfgBeGPxjtCxwxyTTDOOk5aXcCg/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4K4xsicZibPichq5ogI5qAQZcxDP7qnkibTtWZJgrFnKwZktxWBpyynLiaLFJ08CAtl2wlHLbEPPVdKfKw/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4K4xsicZibPichq5ogI5qAQZcxg5ZymFLonI4AhiarUJicEDkMJbBwOnspNsgKia0Y8icqDXS4BqDqsJ0WVQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4K4xsicZibPichq5ogI5qAQZcxWG97lDC8mhvy1mXXmRzNM1MiaPBuYeypwNJeQzzZFGWhYT1DNguiaibmw/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4K4xsicZibPichq5ogI5qAQZcxNJC7ptMOcsjicKJUWoTDDTojY5puDQh22M1iaJDrwLHRUZKdRnq81uZg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4K4xsicZibPichq5ogI5qAQZcxCQ6EhHRThTUoZ8NylDNzictXzx15SRpiafJezgA6eb9EkS0u54Bo6UCw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4K4xsicZibPichq5ogI5qAQZcxiaK1icvULSmmf9IXWgdVicNMyZa4Hk3kG1wgmwujqo0FibjaxckzjuEq9g/640?wx_fmt=png

## 四、精华技能
- 技能定位：混淆还原 + Hook + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- 混淆还原
- Hook
- Cookie/Token
- Cookie
