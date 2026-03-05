# 【JS 逆向百例】猿人学系列 web 比赛第五题：js 混淆 - 乱码增强，详细剖析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500562&idx=1&sn=09eda15bf1c5c3cbf4ed64d27d3af449&chksm=c1e265f8f695eceefeff0f8c5dbce1bc624546061ae15cec3857f094f66ef780da3eeaf5c367#rd
- 发布信息：2022年9月29日 18:20 | 作者：K哥爬虫

## 一、问题画像
猿人学 - 反混淆刷题平台 Web 第五题：js 混淆，乱码增强

## 二、关键文字要点
- 要点1：猿人学 - 反混淆刷题平台 Web 第五题：js 混淆，乱码增强
- 要点2：(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { if (val.indexOf('RM4hZBv0dDon443M') != -1) { debugger; } console.log('Hook捕获到cookie的值->', val); cookieTe...
- 要点3：将以上代码写入插件中，注入 Hook：
- 要点4：清除网页缓存，勾选开启框，打开 Fiddler 进行 Hook 注入，可以发现成功断住：
- 要点5：直接搜索 _$ss 没有结果，同样尝试 Hook，Hook 代码：
- 要点6：(function () { 'use strict' Object.defineProperty(window, '_$ss', { set: function (val) { console.log('Hook捕获到_$ss的值->', val); debugger; }, }); })();

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Lqib39WMxLxfLuHIB4aXF9CQg4mXicsS9774XCQbV8QWiaEm89qWUmjVKNsX8New1VjacwyDwkg86Mw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Lqib39WMxLxfLuHIB4aXF9CntImJBDU0RuLsodtVIEtfdoX29ON3kAxiaibxwEk6jAYMympIlEtH0ag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Lqib39WMxLxfLuHIB4aXF9CUgOkvT3bXQdWQSFcf3yWLK9icjtR1YwbiatszdNHFnt3GB0GnycpyPTw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Lqib39WMxLxfLuHIB4aXF9CjibuzPEpNFz9mYss2KNsZia4JHwktkEuiaUgok8iaibvsNERBcHPhfzfia8A/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Lqib39WMxLxfLuHIB4aXF9CMoibbXSg7weJ2C9iaq7YIwp5fhia05OPKSjlK7oLgRibvg0XTOu7s7lyOQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Lqib39WMxLxfLuHIB4aXF9CEMDEzVkFXGe70B8AgxaicbSm3w1CUmpFucLK0gpTX8MiamtkLISuibLEA/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Lqib39WMxLxfLuHIB4aXF9CTkbZibecXsB0TZNB1gwhHzZXyVbD9ibFzVCZYv3tP4CbXnfY4HhQ3UYg/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + 混淆还原 + Hook + 反调试 + Cookie/Token + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 先做字符串表与控制流还原，恢复可读性后再定位核心算法。
- 构造最小可用复现脚本，只保留必须环境和必要字段。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- AES
- 混淆还原
- Hook
- 反调试
- Cookie/Token
- 补环境
- web
