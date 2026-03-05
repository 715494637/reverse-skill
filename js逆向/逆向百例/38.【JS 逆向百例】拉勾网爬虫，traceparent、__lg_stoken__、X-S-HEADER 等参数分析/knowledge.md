# 【JS 逆向百例】拉勾网爬虫，traceparent、__lg_stoken__、X-S-HEADER 等参数分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500542&idx=1&sn=d8f3362adb76b5148c79eb27da04a462&chksm=c1e26414f695ed02a27f112156aead062c7788b802953f62d858ce2370944a833b142f628bd2#rd
- 发布信息：2022年3月16日 15:23 | 作者：K哥爬虫

## 一、问题画像
请求头参数：traceparent、X-K-HEADER、X-S-HEADER、X-SS-REQ-HEADER、x-anit-forge-code、x-anit-forge-token

## 二、关键文字要点
- 要点1：请求头参数：traceparent、X-K-HEADER、X-S-HEADER、X-SS-REQ-HEADER、x-anit-forge-code、x-anit-forge-token
- 要点2：POST 请求数据加密，返回的加密职位信息解密，AES 算法
- 要点3：直接搜索没有值，直接上 Hook 大法，小白朋友不清楚的话可以看K哥以前的文章，都有详细教程，这里不再细说。
- 要点4：(function () { 'use strict'; var cookieTemp = ""; Object.defineProperty(document, 'cookie', { set: function (val) { console.log('Hook捕获到cookie设置->', val); if (val.indexOf('X_HTTP_TOKEN') != -1) { debugger; } cookieTemp =...
- 要点5：__lg_stoken__ 这个参数是在点击搜索后才开始生成的，直接搜索同样没值，Hook 一下，往上跟栈，很容易找到生成位置：
- 要点6：这里就非常明显了，t 是32位随机字符串，赋值为 aesKey，后面紧接着一个 RSA 加密了 aesKey，赋值为 rsaEncryptData，而 rsaEncryptData 就是前面 agreement 接口请求的 secretKeyValue 值。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLbic2Xg1W2GoCSgz5LzxibowSickHY8MdP8H1FnpALtuxrGWSic9o1hVH1A/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLcpAE49sGc8XFOiaYKhNT72ODpozUIFJ8H60dl9eawmKM0FZbfvfACiaw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLgCWy0icwjEwChF5k5y9KR3RK7Sy89t77acD6ZlibswLUQ0SWicytdA7kQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoL6HIeS2veQiasVOvRrsf1iawsouuEJiclr74IXEEiaLlzBWCsKXA9X1NrbA/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLgODrV1pjPsyDPSN3iarjR11bHnice2cxX8J6qiaWzrLwQvdtC1u18W3FQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLmHWY0k9kUK9yZ3KZgQpMa25Mza1sCRou9TEpvqbIWiabWEibPU86wvHA/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + AES + Hook + 反调试 + Cookie/Token + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- jsencrypt 这个库，本地运行可能会报错 window is not defined，在 \node_modules\jsencrypt\bin\jsencrypt.js 源码中加入var window = global;即可，这是实...

## 七、迁移关键词
- RSA
- AES
- Hook
- 反调试
- Cookie/Token
- 补环境
- traceparent
- __lg_stoken__
- X-S-HEADER
