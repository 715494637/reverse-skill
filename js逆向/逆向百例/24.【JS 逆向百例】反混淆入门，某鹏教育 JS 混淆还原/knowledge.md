# 【JS 逆向百例】反混淆入门，某鹏教育 JS 混淆还原

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500520&idx=1&sn=4716c6f8b34f26ad142123ae25451cfc&chksm=c1e26402f695ed14c4e2577435c05f7b0cee2d8b7bee89a402507e8b6a91fccbaa408c48880a#rd
- 发布信息：2021年11月30日 15:06 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9sZWFybi5vcGVuLmNvbS5jbi8=

## 二、关键文字要点
- 要点1：接口：aHR0cHM6Ly9sZWFybi5vcGVuLmNvbS5jbi9BY2NvdW50L1VuaXRMb2dpbg==
- 要点2：逆向参数：Form Data：black_box: eyJ2IjoiR01KM0VWWkVxMG0ydVh4WUd...
- 要点3：本次逆向的目标同样是一个登录接口，其中的加密 JS 使用了简单的混淆，可作为混淆还原的入门级教程，来到登录页面，随便输入账号密码进行登录，其中登录的 POST 请求里， Form Data 有个加密参数 black_box，也就是本次逆向的目标，抓包如下：
- 要点4：直接搜索 black_box，在 login.js 里可以很容易找到加密的地方，如下图所示：
- 要点5：看一下 _fmOpt.getinfo() 这个方法，是调用了 fm.js 里的 OO0O0() 方法，看这个又是 0 又是 O 的，多半是混淆了，如下图所示：
- 要点6：点进去看一下，整个 fm.js 都是混淆代码，我们选中类似 OQoOo[251] 的代码，可以看到实际上是一个字符串对象，也可以直接在 Console 里输出看到其实际值，这个 OO0O0 方法返回的 oOoo0[OQoOo[448]](JSON[OQoOo[35]](O0oOo[OQoOo[460]]))，就是 black_box 的值，如下图所示：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KbqV8Wj8HDYU19AGO0ibXzj76Imd4svkxsGYia7eYtUPzR5pwvSyz8ibz4ic0JticrTH90nnEicMLEIlLg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KbqV8Wj8HDYU19AGO0ibXzjQbl48pq5SnMVPShATUOkKMCeU5GOf8oY18ehkDnSmfyTAWXIXq8pzg/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KbqV8Wj8HDYU19AGO0ibXzjUT16GV6aCP1yHy8W9Ebd6NiboRLKE3AA5awY0mib2o3VhiaVbNAROT1ng/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KbqV8Wj8HDYU19AGO0ibXzjahvh6GgzT6jC3E9sbuPwJFRxwssPj5J9wECQbUv3RVE5mzcdK2WImw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KbqV8Wj8HDYU19AGO0ibXzjEeXoSN1tNdZmibLibTdckkM2deunxmH9CjESrObq6vvMPEJmtIdmia13A/640?wx_fmt=png

## 四、精华技能
- 技能定位：混淆还原 + Hook
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
