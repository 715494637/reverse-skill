# 【JS 逆向百例】W店UA，OB反混淆，抓包替换CORS跨域错误分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500521&idx=1&sn=f0757e8408671dfa1af7c636f7f9deb5&chksm=c1e26403f695ed15330926c041bdc1676f3c63215aeb39e3d178e2636298de32253b02d6bd82#rd
- 发布信息：2021年12月2日 17:43 | 作者：K哥爬虫

## 一、问题画像
目标：W 店登录接口 UA 参数加密，JS 代码经过了 OB 混淆

## 二、关键文字要点
- 要点1：目标：W 店登录接口 UA 参数加密，JS 代码经过了 OB 混淆
- 要点2：接口：aHR0cHM6Ly9zc28xLndlaWRpYW4uY29tL3VzZXIvbG9naW4=
- 要点3：逆向参数：Form Data：ua: H4sIAAAAAAAAA91ViZUbMQhtiVOIcnRRxRafr%2FGuN5ukgoyfLUZC...
- 要点4：OB 混淆全称 Obfuscator，Obfuscator 其实就是混淆的意思，官网：https://obfuscator.io/ ，其作者是一位叫 Timofey Kachalov 的俄罗斯 JavaScript 开发工程师，早在 2016 年就发布了第一个版本。
- 要点5：1、一般由一个大数组或者含有大数组的函数、一个自执行函数、解密函数和加密后的函数四部分组成；
- 要点6：例如在上面的例子中，_0x3f26() 方法就定义了一个大数组，自执行函数里有 push、shift 关键字，主要是对大数组进行移位操作，_0x1fe9() 就是解密函数，hi() 就是加密后的函数。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzA74NsJRqZXFrLzcYAXic6pPfOKQ4xTiaD8qibmoYoib7NXW2tqOSYiaRv16qDndsBQLYHJX1DmCTJlg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzA74NsJRqZXFrLzcYAXic6JTtAS2dnKJ11ianvQvn9SdnYgwCyOMibkfVV6lCIBnB8nMHOxP9ROlKw/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzA74NsJRqZXFrLzcYAXic6Xqib3GquR7Q3YPTVA7VGhxQXff339p21tjEIqoDMT3ARib3JG62Eggibw/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzA74NsJRqZXFrLzcYAXic6rQjqoKNXaPN0AEMWD3RiaXLHicyYwErrXNfE5XxVuYoEXU6T4HHLdpug/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzA74NsJRqZXFrLzcYAXic6cea54u1kjJXzDJnGvHTjMJMI4g2PtzL2sC4GgaIgV5OatkicC4d6G3g/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + 混淆还原 + Hook + 补环境
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
- 补环境
- CORS
