# 【JS逆向百例】东某航空数某指纹 v4 设备 ID 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247503992&idx=1&sn=9895137dc029ddb4c5506c85395755a9&chksm=c1e27692f695ff8417806c0772ef0180ed4635bad1fd7c7b91f6c925b173818a8be4933460fe#rd
- 发布信息：2024年12月9日 16:15 | 作者：K哥爬虫

## 一、问题画像
网站：aHR0cHM6Ly93d3cuZG9uZ2hhaWFpci5jb20v

## 二、关键文字要点
- 要点1：打开网站，找到返回机票信息的机票查询接口 flightSearch，分析发现两个加密参数需要分析：
- 要点2：deviceId：设备 ID， 需要重点分析的参数，特征是，以 "B" 开头；
- 要点3：b2c-api-user-token：登录接口返回的，抓包可以发现，登录接口也会有设备 ID，同理。
- 要点4：rsaEncrypt，经过测试，这里就是标准的 rsa 加密：
- 要点5：扣下来即可，里面的 md5 摘要算法，经过测试也是标准的，继续往下走，跟进到 _0x8b10c3['default'] 函数中，传入了两个对象：
- 要点6：继续往下走，来到我们返回最后一个 _0x1498fb 值的生成位置，通过 aesEncrypt 函数将上面的压缩数据 _0x1498fb 与 priId 加密后生成，进入到这个函数中观察一下：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp8VA4shbeXe3N2c8F5Wnhq77EJ98wpK86Bbibic2D0CaA6mxF5epYdtibt6f3y0qvTT1j7RE01fFSag/640?wx_fmt=png&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp8VA4shbeXe3N2c8F5WnhqeHB39v3pflh8l7cTcnJIicHgzRCQkUPZBtjjukpL67tx5OwibZm5VpjQ/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp8VA4shbeXe3N2c8F5WnhqDHvO1szV522IqJRGIUY6sibeKyw44MJM9VzNVo8ibtsBkKicVpjhknxCQ/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp8VA4shbeXe3N2c8F5WnhqtFw4ASyADPBbpLicEMhicQ6ZTWbpareTt1X8PceHA43U0zcQpxj76O4w/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp8VA4shbeXe3N2c8F5Wnhq3Gib6726FbP5AtwV3R4T25Iep3CPtKDeFHH7jfhEN472DcuWhanMX3A/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp8VA4shbeXe3N2c8F5Wnhq8V8ekc3rESrXaC7nrs2R7ReC5er5qY2gK5FKjKsV7ibYPiatNUnV5wBQ/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp8VA4shbeXe3N2c8F5WnhqbTvpnO7SovV75sZ8epTehKUiazUWZpfRIHlMqaPGeTkxYsNmgxj0jrQ/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTp8VA4shbeXe3N2c8F5WnhqjUW2mOOW3wdBMYjQW7URIGwlSnWJ5Y2tzV4MicuibRWm8riaVibnOEhn1Q/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：RSA + AES + MD5 + Cookie/Token + 验证码/风控
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- RSA
- AES
- MD5
- Cookie/Token
- 验证码/风控
