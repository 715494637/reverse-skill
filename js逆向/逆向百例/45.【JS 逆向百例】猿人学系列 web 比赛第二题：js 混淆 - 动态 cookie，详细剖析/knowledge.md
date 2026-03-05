# 【JS 逆向百例】猿人学系列 web 比赛第二题：js 混淆 - 动态 cookie，详细剖析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500566&idx=1&sn=e10588c554c23ea47e945ad73e57b270&chksm=c1e265fcf695eceac2aad8c4c30320756afe247aa9190a7aa3d0bf5c09151a48d91176c0b1e1#rd
- 发布信息：2022年11月10日 15:29 | 作者：K哥爬虫

## 一、问题画像
猿人学 - 反混淆刷题平台 Web 第二题：js 混淆，动态 cookie

## 二、关键文字要点
- 要点1：猿人学 - 反混淆刷题平台 Web 第二题：js 混淆，动态 cookie
- 要点2：接口：https://match.yuanrenxue.com/api/match/2
- 要点3：在 Network 的筛选栏中选择 XHR，数据接口为 2，在响应预览中可以看到当前页各手机发布日的热度：
- 要点4：这时候点击第二页，会弹出提示框：cookie 失效，正在重置页面，证明 cookie 是有时效性的，并且会进行校验：
- 要点5：(function () { 'use strict'; var cookieTemp = ''; Object.defineProperty(document, 'cookie', { set: function (val) { if (val.indexOf('m') != -1) { debugger; } console.log('Hook捕获到cookie设置->', val); cookieTemp = val; retur...
- 要点6：勾选开启框，启动 Fiddler 进行 hook 注入：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LmWuWe8gcgakibIA4iabeYpZwibUNHNdlpeicibZCRnJMicZMcbiaOLDEF3YsZ8dfsent3ibSz4UrkARYUow/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LmWuWe8gcgakibIA4iabeYpZMib2f6JuR2icVTIfs4suWC4JkuZ0Oh6Q5b9dO6CIRQKiaibicTiay7icBQgQA/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LmWuWe8gcgakibIA4iabeYpZ8VO7XbnSLyGC7uTjdL8llmuluXrWpRhgEAHBt9ENAtUSpOEbxXQWibQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LmWuWe8gcgakibIA4iabeYpZYOtUXUnRpaibcJozwoEMOIoWt0dElDfOkyuXlH2zQD2yibw05GqHBZ5g/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LmWuWe8gcgakibIA4iabeYpZRMRmyW9YaOyZYvMqIcTJIiaU2SLOicH0JbhzT3bKibAREyhUOGecBHe9w/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LmWuWe8gcgakibIA4iabeYpZp7iaaXB8z62bxufcFXRcnDX7oURatr4NywxRSsdnuFNsS2te7eqz7ng/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LmWuWe8gcgakibIA4iabeYpZWKGdCiaYjEs2mzjm6g9yh7m49FBtJCS9cH0NlZYfXfOKrTsKwr6ouSQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：混淆还原 + Hook + 反调试 + Cookie/Token + 补环境
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
- 这时候点击第二页，会弹出提示框：cookie 失效，正在重置页面，证明 cookie 是有时效性的，并且会进行校验：

## 七、迁移关键词
- 混淆还原
- Hook
- 反调试
- Cookie/Token
- 补环境
- web
- cookie
