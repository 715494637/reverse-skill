# 【JS 逆向百例】建筑市场监管平台企业数据

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500490&idx=1&sn=cd7d32dd56bb5dfd686b9b34dc290b81&chksm=c1e26420f695ed36775c290eb2f80a24664106a21f800a14be1471cf4021216a924f8b30416b#rd
- 发布信息：2021年8月16日 09:09 | 作者：K哥爬虫

## 一、问题画像
目标：住房和城乡建设部&全国建筑市场监管公共服务平台的企业数据

## 二、关键文字要点
- 要点1：接口：http://jzsc.mohurd.gov.cn/api/webApi/dataservice/query/comp/list?pg=%s&pgsz=15&total=450
- 要点2：逆向参数：请求返回的加密数据
- 要点3：本次的逆向目标是建筑市场监管平台的企业数据，来到全国建筑市场监管公共服务平台首页，依次点击数据服务 —> 企业数据，尝试抓包一下所有企业的数据，可以看到返回的数据是经过加密的：
- 要点4：数据看不出来是什么加密方式，但是加密分析得多了，就知道一般都是经过 CryptoJS 加密模块加密得到的，那么我们可以尝试直接搜索 CryptoJS，decrypt 等关键字，或者搜索加密算法中经常用到的偏移量 iv、模式 mode、填充方式 padding 等，还有一般的 JSON 数据可以搜索 JSON.parse 等，这里直接搜索 JSON.parse，在 app.a9f6bb6d.js 文件里定位到可疑代码，埋下断点进行调试：
- 要点5：可以看到 e 就是解密后的数据，观察语句 var e = JSON.parse(h(t.data));，直接跟进 h 函数，可以看到很明显的 AES 加密：
- 要点6：function h(t) { var e = d.a.enc.Hex.parse(t) , n = d.a.enc.Base64.stringify(e) , a = d.a.AES.decrypt(n, f, { iv: m, mode: d.a.mode.CBC, padding: d.a.pad.Pkcs7 }) , r = a.toString(d.a.enc.Utf8); return r.toString() }

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUf79au5Dufpjs6D8U2yZVIwHyFVXQK1DUBVt8bO8opffibtSoiaNPytgw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUib9hPYZE62tIGwuQKgVyu6VNnhgqwonQbybmE3JSCQI8x9s68D4Kxbg/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUVaQGMnWesMQJpCbE9vxpiaqsQIm2ibM4ej3XV4VVDCGk5wWGXhsUBOlA/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/iabtD4jabia4JSlhKbZ7886IyfdWMia07ODtZic3RreIOyKWHWwwY5ibGEB9xR0n3xjJBJm385fWMDHPXUgad9wZz9A/640?wx_fmt=gif

## 四、精华技能
- 技能定位：AES
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
- AES
