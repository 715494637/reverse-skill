# 【JS 逆向百例】转变思路，少走弯路，X米加密分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500495&idx=1&sn=b656077cffe9de9a1927cc3edb10275a&chksm=c1e26425f695ed33c4f180c05663807cae2aa72eb66f7fba19cc4d3f7b4fe9b5549f3a4b078f#rd
- 发布信息：2021年8月24日 18:11 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9hY2NvdW50LnhpYW9taS5jb20v

## 二、关键文字要点
- 要点1：接口：aHR0cHM6Ly9hY2NvdW50LnhpYW9taS5jb20vcGFzcy9zZXJ2aWNlTG9naW5BdXRoMg==
- 要点2：逆向参数：Form Data：hash: FCEA920F7412B5DA7BE0CF42B8C93759
- 要点3：来到X米的登录页面，随便输入一个账号密码登陆，抓包定位到登录接口为 aHR0cHM6Ly9hY2NvdW50LnhpYW9taS5jb20vcGFzcy9zZXJ2aWNlTG9naW5BdXRoMg==
- 要点4：POST 请求，Form Data 里的参数比较多，分析一下主要参数：
- 要点5：serviceParam: {"checkSafePhone":false,"checkSafeAddress":false,"lsrp_score":0.0}，从参数的字面意思来看，似乎是在检查手机和地址是否安全，至于具体是什么含义，暂时不得而知，也不知道是在哪个地方设置的。
- 要点6：callback: http://order.xxx.com/login/callback?followup=https%3A%2F%2Fwww.xx......，回调链接，一般来说是固定的，后面带有 followup 和 sid 参数。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Jy01It0IJfakoeQc4XbO4htvkRtfrB6CuulFWulP4297Od1nQiba71VIKa88cib5NYJb8icMO7m9V4w/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Jy01It0IJfakoeQc4XbO4hDstiabF2HzKBGxfRauoXslQdy1zEUib3ia2sl2amQxqw6lbKUV9FSJBUQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Jy01It0IJfakoeQc4XbO4hRCFFnOGBOUiaWc8L9xtfPl1OVdrpY3vSAqjmu0cBGia2UPib8CDcSwTBQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Jy01It0IJfakoeQc4XbO4hn2AQo1LDuXuGLG3EVwCdOHsJfDH7fzjmic858m79JSyZQPpkXOmyJpQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Jy01It0IJfakoeQc4XbO4hWnulSG6Wytia8I6lfwj6SN2Zboz2jnEs7QToAiadXZxDbuLMsu1ZFBiaQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：MD5
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
- MD5
