# 【JS 逆向百例】浏览器插件 Hook 实战，亚航加密参数分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500504&idx=1&sn=bf335229cc6f5f6952834c013302aae1&chksm=c1e26432f695ed245c3aa27c799b83a54423a225ac768fed217522fac21448be541d980ae74c#rd
- 发布信息：2021年10月14日 17:33 | 作者：K哥爬虫

## 一、问题画像
目标：亚航 airasia 航班状态查询，请求头 Authorization 参数

## 二、关键文字要点
- 要点1：有关 Hook 的详细知识，在 K 哥前期的文章有详细介绍：JS 逆向之 Hook，吃着火锅唱着歌，突然就被麻匪劫了！
- 要点2：既然是通过编写浏览器插件的方式进行 Hook，那么首先我们肯定是要简单了解一下如何编写浏览器插件了，编写浏览器插件也有对应的规范，在以前，不同浏览器的插件编写方式都不太一样，到现在基本上都和 Google Chrome 插件的编写方式一样了，Google Chrome 的插件除了能运行在 Chrome 浏览器之外，还可以运行在所有 webkit 内核的国产浏览器，比如 360 极速浏览器、360 安全浏览器、搜狗浏览器、QQ 浏览器等等...
- 要点3：一个浏览器插件的开发说简单也简单，说复杂也复杂，不过对于我们做爬虫逆向的开发人员来说，我们主要是利用插件对代码进行 Hook，我们只需要知道一个插件是由一个 manifest.json 和一个 JavaScript 脚本文件组成的就够了，接下来 K 哥以本案例中请求头的 authorization 参数为例，带领大家开发一个 Hook 插件。当然，如果你想深入研究浏览器插件的开发，可以参考 Google Chrome 扩展文档[1]和 ...
- 要点4：按照 Google Chrome 插件的开发规范，首先新建一个文件夹，该文件夹下包含一个 manifest.json 文件和一个 JS Hook 脚本，当然，如果你想为你的插件配置一个图标的话，也可以将图标放到该文件夹下，图标格式官方建议 PNG，也可以是 WebKit 支持的任何格式，包括 BMP、GIF、ICO 和 JPEG 等，注意：manifest.json 文件名不可更改！正常的插件目录类似如下结构：
- 要点5：JavaScript Hook ├─ manifest.json // 配置文件，文件名不可更改 ├─ icons.png // 图标 └─ javascript_hook.js // Hook 脚本，文件名顺便取
- 要点6：{ "name": "JavaScript Hook", // 插件名称 "version": "1.0", // 插件版本 "description": "JavaScript Hook", // 插件描述 "manifest_version": 2, // 清单版本，必须是2或者3 "icons": { // 插件图标 "16": "/icons.png", // 图标路径，插件图标不同尺寸也可以是同一张图 "48": "/icon...

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KlZTQicXjZYD9MXwQC1wVNY95mBTQ5XKmYiaBGpYpK0UQOlCeicL3DS14f5lCKzIapYyg5hlHMs1PkQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KlZTQicXjZYD9MXwQC1wVNYRtUUBU0M6Z7Qg9l1SyyDL5eKJPWfXcqPuc9UyeWdbnWrU8QbaaMvnw/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KlZTQicXjZYD9MXwQC1wVNYpnp2IgCgstJTmCCukEuB1M4vuuFSuzVymvqImEmg9swVAwLlsjGJMA/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KlZTQicXjZYD9MXwQC1wVNY0ftlfBkSgUurZcVqb8jky2hqwLeFuSC5Y4OucJZIicYqiaKesq6aqH2w/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KlZTQicXjZYD9MXwQC1wVNYevKWb8tBRbcFLrWeF8y2VXt5w5y3gdC52A6DudEd39GqJYUvFUYOmQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：Hook
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 按照 Google Chrome 插件的开发规范，首先新建一个文件夹，该文件夹下包含一个 manifest.json 文件和一个 JS Hook 脚本，当然，如果你想为你的插件配置一个图标的话，也可以将图标放到该文件夹下，图标格式官方建议 ...

## 七、迁移关键词
- Hook
