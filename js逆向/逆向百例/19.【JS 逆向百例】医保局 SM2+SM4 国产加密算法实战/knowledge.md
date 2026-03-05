# 【JS 逆向百例】医保局 SM2+SM4 国产加密算法实战

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500514&idx=1&sn=2d21fbdf1cf275232ca1731dfd0fedc4&chksm=c1e26408f695ed1e49bd2fdb7a5661f4548873e8466fbc84277bed42b91ef969c2bd429e099e#rd
- 发布信息：2021年11月11日 16:01 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9mdXd1Lm5oc2EuZ292LmNuL25hdGlvbmFsSGFsbFN0LyMvc2VhcmNoL21lZGljYWw=

## 二、关键文字要点
- 要点1：接口：aHR0cHM6Ly9mdXd1Lm5oc2EuZ292LmNuL2VidXMvZnV3dS9hcGkvbnRobC9hcGkvZml4ZWQvcXVlcnlGaXhlZEhvc3BpdGFs
- 要点2：逆向参数：Request Payload 的 encData 和 signData、Request Headers 的 x-tif-nonce 和 x-tif-signature
- 要点3：来到公共查询页面，点击翻页，就可以看到一个 POST 请求，Request Payload 的参数部分是加密的，主要是 appCode、encData 和 signData 参数，同样返回的数据也有这些参数，其加密解密方法是一样的，其中 encType 和 signType 分别为 SM4 和 SM2，所以大概率这是国密算法了，有关国密算法 K 哥前期文章有介绍：《爬虫逆向基础，认识 SM1-SM9、ZUC 国密算法》，此外请求头还有 ...
- 要点4：直接全局搜索 encData 或 signData，搜索结果仅在 app.1634197175801.js 有，非常明显，上面还有设置 header 的地方，所有参数都在这里，埋下断点，可以看到这里就是加密的地方，如下图所示：
- 要点5：这里的加密函数，主要都传入了一个 e 参数，我们可以先看一下这个 e，里面的参数含义如下：
- 要点6：我们再观察一下整个 JS 文件，在头部可以看到 .call 语句，并且有 exports 关键字，很明显是一个 webpack 形式的写法。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Im7TqtwSzCpvAfX2AlI2DsE8s0PKydzklc3aepZto57ib0ATDdxzUfEhiaYGic8Hhvlwq3sw17w4DUw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Im7TqtwSzCpvAfX2AlI2Ds0lTPfPLFTSu54eggjODqriaW9KLAOOmwz6R6B7jbydbqwI5VFwn0f5Q/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Im7TqtwSzCpvAfX2AlI2DsqBrrWVodibHROvP35eKEhib82e2xAjibhDlrpsibfjVXJeu4n8mzdr0Pxw/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Im7TqtwSzCpvAfX2AlI2DsdhFTZnMWsoWcckibVWSxGGP1Mbt3UAjwLrIIxEKdYCKKP4fgnZyHEcw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Im7TqtwSzCpvAfX2AlI2Ds04RqTLIzicRfJBJDK57ribqPaFSclZzWw8cS5iaKuljWCFfBDicV95czww/640?wx_fmt=png

## 四、精华技能
- 技能定位：SM2/SM4 + Webpack + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 先提取并复用 webpack 模块加载入口，避免在混乱打包代码中盲查。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 将模块写成 webpack 形式，在自执行方法里调用，然后定义全局变量来接收，再将原来的 o, e 换成全局变量即可，这里还需要注意的一个地方，那就是 o.doSignature 传入的 h，是一个定值，需要定义一下，不然后面解密是失败的。...
- 这里扣 webpack 模块的时候也需要注意，不要把所有原方法里有的模块都扣出来，有些根本没用到，可以直接注释掉，这个过程是需要有耐心的，你如果全部扣，那将会是无穷无尽的，还不如直接使用整个 JS 文件，所有有用的模块如下（可能会多，但不会...

## 七、迁移关键词
- SM2/SM4
- Webpack
- Cookie/Token
- SM2
- SM4
