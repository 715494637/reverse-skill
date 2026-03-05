# 【JS 逆向百例】吾爱破解2022春节解题领红包之番外篇 Web 中级题解

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500538&idx=1&sn=861597f65b634c53e65ecde44a857a12&chksm=c1e26410f695ed06b4f4e2d7b80dac6693e5068c9492cffce55d0ca23dfd5eb0927f3686223d#rd
- 发布信息：2022年2月16日 09:05 | 作者：K哥爬虫

## 一、问题画像
此 Web 题题目是：小 D 最爱看的视频网站最近关站了，关站前他用 Fiddler 和 Web Archive 保存了一位主播的视频，但他发现存下来的文件无法播放。你能帮小 D 找回他的回忆吗？（.saz 与 .wacz 任选其一即可解题）

## 二、关键文字要点
- 要点1：本次逆向的目标来源于吾爱破解 2022 春节解题领红包之番外篇 Web 中级题，吾爱破解每年都会有派送红包活动（送吾爱币），需要大家使出看家逆向本领来分析内容获得口令红包，今年一共有五个题，一个送分题，两个 Windows 题、一个 Android 题和一个 Web 题，本文分析的正是 Web 题，吾爱有规定活动结束前不要外泄口令、讨论分享分析过程，所以本文在活动结束后才发出来。
- 要点2：HLS 全称 HTTP Live Streaming，即基于 HTTP 的自适应码率流媒体传输协议，是苹果研发的动态码率自适应技术，它包括一个 M3U(8) 的索引文件，若干 TS 视频流文件，如果视频流文件是加密的，那就还会存在一个 key 加密串文件。
- 要点3：针对 TS 格式的文件，如果是未加密的，一般的播放器就能够直接播放，也可以使用 FFmpeg 等工具转换为其他格式，FFmpeg 也可以直接处理 M3U8 文件，自动解密合并转换 TS 文件，当然也有其他大佬写好的小工具，拖入 M3U8 文件就直接给你处理好了。
- 要点4：#EXT-X-KEY：TS 片段可以被加密，该标签指定加密方式（METHOD）、密钥的 URI 以及偏移量 IV 等信息，没有此标签表示未加密；
- 要点5：在 Fiddler 软件中，使用 SAZ 格式用来保存和读取 HTTP/HTTPS 请求信息，打开该文件可以注意到一些重要的请求：script.bundle.js、live.m3u8、drm 以及八个 ts 视频流文件。
- 要点6：先来看看 m3u8 文件，可以看到是 AES-128 加密，加密的 key 文件地址为 key://live，如下图所示：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JZcEXbRy7e5ztoaS26owvnUibkxS4ojbysfYHMY5ibibsFEdQGQbPldPVRUtcCzzmPasbFd0ELCpIBQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JZcEXbRy7e5ztoaS26owvn1sUHzibUZciaE4vBB7pxiaEiaS2yNSQElaZ9UZlO2xXVTUJlbaM0Rj8h0g/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JZcEXbRy7e5ztoaS26owvnlbNWJWic2ggiaUZjlyhJJX9mCbp2aJzW8m25k8M6nSwufhh5dQ01DbPg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JZcEXbRy7e5ztoaS26owvnKvhoficrxSkNzszR0HPkicU7BNzQv0t0nnLaLwcBOYycpRn6LObarBibA/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JZcEXbRy7e5ztoaS26owvnYcia2PYWsoVZt0qDCHJ5qCLumz5GTsicDiam7D5biaqdPicLRbfUT5mHIIA/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + Hook + 协议分析 + 补环境
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
- 在 Fiddler 软件中，使用 SAZ 格式用来保存和读取 HTTP/HTTPS 请求信息，打开该文件可以注意到一些重要的请求：script.bundle.js、live.m3u8、drm 以及八个 ts 视频流文件。

## 七、迁移关键词
- AES
- Hook
- 协议分析
- 补环境
- 2022
- Web
