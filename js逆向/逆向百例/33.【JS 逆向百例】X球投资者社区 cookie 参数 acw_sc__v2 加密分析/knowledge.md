# 【JS 逆向百例】X球投资者社区 cookie 参数 acw_sc__v2 加密分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500529&idx=1&sn=08d644cabdc6e30f5318bb05b248e62a&chksm=c1e2641bf695ed0d48f68118173f669e1d459f51b281b068712dece607215aa9d5d9051cf028#rd
- 发布信息：2021年12月30日 16:51 | 作者：K哥爬虫

## 一、问题画像
目标：X 球投资者社区 cookie 参数 acw_sc__v2 加密分析

## 二、关键文字要点
- 要点1：目标：X 球投资者社区 cookie 参数 acw_sc__v2 加密分析
- 要点2：逆向参数：Cookie：acw_tc=27608267164066250867189...
- 要点3：我们的爬虫目标是：精华 —> 今日话题 —> X球热帖，热帖是 Ajax 加载的，很容易找到数据接口，接口没有其他的加密参数，主要是 cookie 里有一些值，没有 cookie 是无法访问的，其中，cookie 里又有一个 acw_sc__v2 的值，是通过 JS 生成的，其他值都是首次访问首页得到的，抓包如下：
- 要点4：我们清除一下 cookie，打开 F12 开发者工具，刷新页面，发现会进入反调试，出现了无限 debugger，往上跟调用栈，可以看到这个方法里有一大串混淆后的代码，拼接起来其实就是 debugger，如下图所示：
- 要点5：过掉 debugger 也很简单，需要注意的是这个站比较刁钻，第一次访问首页直接是混淆的 JS 代码，后面才会跳转到正常的 HTML 页面，如果你想本地替换 JS 的话，debugger 倒是过掉了，不过后续就有可能无法调试了，感兴趣的朋友可以自己试试，这里K哥就直接右键 Never pause here 永不在此处断下了：
- 要点6：我们观察这个混淆代码，直接搜索 acw_sc__v2，可以看到最后面有设置 cookie 的操作，其中 x 就是 acw_sc__v2 的值：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Iic5czQibdIQjYcqp2icDrKj35nbIgX2gwWic11IfspXNJRJerv5iczKla5iaDFsxhoUzu3syEKyzG5T0w/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Iic5czQibdIQjYcqp2icDrKj3DHrR0u0FPt7ib1eKE6EkdfTOzyNre8cmVaeMF9ibmibA7VObsTkydQLHw/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Iic5czQibdIQjYcqp2icDrKj3ynXD1yn4L3zJQK09wEE5fehfSCm7KTvREyekXtAFgBeT0jgYU673Kg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Iic5czQibdIQjYcqp2icDrKj3guic9bV5jalz66Ydr9uLOwWibzemiaBTMLpWdkyrA5K6J0LicDUsR3NXvw/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Iic5czQibdIQjYcqp2icDrKj3CYmxzHYbiasRUkaAjsUyjrOSiaYvKwAGmbjBV6pZ0ZnngGGLiaVOvzj9A/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Iic5czQibdIQjYcqp2icDrKj3pkPzte3L7kfCwHKqCzJugBhVeveEwHQu6YUYqEcEje6aCgMJUC2QCQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Iic5czQibdIQjYcqp2icDrKj3KwiaW30eedul3jmhOj8j4YWjZqyCrHdH2BicyiaBOmoiaia29ZTzCR7iboTg/640?wx_fmt=png

## 四、精华技能
- 技能定位：混淆还原 + 反调试 + Cookie/Token + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 过掉 debugger 也很简单，需要注意的是这个站比较刁钻，第一次访问首页直接是混淆的 JS 代码，后面才会跳转到正常的 HTML 页面，如果你想本地替换 JS 的话，debugger 倒是过掉了，不过后续就有可能无法调试了，感兴趣的朋友...

## 七、迁移关键词
- 混淆还原
- 反调试
- Cookie/Token
- 补环境
- cookie
- acw_sc__v2
