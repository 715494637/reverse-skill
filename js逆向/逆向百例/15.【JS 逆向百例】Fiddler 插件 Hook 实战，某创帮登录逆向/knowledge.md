# 【JS 逆向百例】Fiddler 插件 Hook 实战，某创帮登录逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500503&idx=1&sn=5bc60d1701028cd1df7de920c700c800&chksm=c1e2643df695ed2bc477a4e780859e17e1ea7e1f4128fae6add4b8b7f554bf21ae0300a4aeff#rd
- 发布信息：2021年10月12日 16:16 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9tLndjYmNoaW5hLmNvbS9sb2dpbi9vdGhlci1sb2dpbi5odG1s

## 二、关键文字要点
- 要点1：该站点的加密其实并不复杂，直接搜索加密参数也可以很快定位到加密代码，但是本文主要介绍使用 Fiddler 抓包软件，搭配插件，使用 Hook 的方式来定位加密位置，如果遇到加密参数搜索不到，或者搜索结果太多的情况，Hook 是比较高效的方法，能够帮助你快速定位加密入口，有关 Hook 的详细知识，在 K 哥前期的文章有详细介绍：JS 逆向之 Hook，吃着火锅唱着歌，突然就被麻匪劫了！
- 要点2：需要注意的是，Fiddler 本身没有 Hook 功能，需要自己编写插件，而且只有 Fiddler Classic 版本是支持插件的，可以参考 Fiddler Classic 插件编写文档[2]，也就是说 MacOS 和 Linux 用户可能无法通过 Fiddler 插件进行 Hook，但是不用担心，MacOS 和 Linux 用户可以通过编写浏览器插件的方式来进行 Hook，后续 K 哥也会写一篇实战文章来演示如何编写浏览器插件进行 ...
- 要点3：我们知道在 JavaScript 中 JSON.stringify() 方法用于将 JavaScript 对象或值转换为 JSON 字符串，JSON.parse() 方法用于将一个 JSON 字符串转换为 JavaScript 对象，某些站点在向 web 服务器传输用户名密码时，会用到这两个方法，在本案例中，就用到了 JSON.stringify() 方法，针对该方法，我们编写一个 Hook 脚本：
- 要点4：(function() { var stringify = JSON.stringify; JSON.stringify = function(params) { console.log("Hook JSON.stringify ——> ", params); debugger; return stringify(params); } })();
- 要点5：整个 Hook 脚本是一个 IIFE 立即调用函数表达式（也叫自执行函数、立即执行函数等），借助 Fiddler 插件，它可以在整个网页加载之前运行，首先定义了一个变量 stringify 保留原始 JSON.stringify 方法，然后重写 JSON.stringify 方法，遇到 JSON.stringify 方法就会执行 debugger 语句，会立即断下，最后将接收到的参数返回给原始的 JSON.stringify 方法进行处...
- 要点6：将 Hook 脚本放到 Fiddler 插件里，F12 开启抓包，刷新网页，重新输入账号密码点击登录，就可以看到成功断下：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IURIBVof6O6zDPvTPJZ7VTLoxHG6jfdPRMYfz3tSd6qmjgHL1TPS7oT6us0CBKLo0a3B9LL6TqyQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IURIBVof6O6zDPvTPJZ7VTzvribcjW4HQ8GXbnvb3KAhBvpxUySn6wLLqdKVC8wzrW8AjxaDIkBpg/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IURIBVof6O6zDPvTPJZ7VTylmKN3aYVtyQ0X6kZZKLxrV7HIjdCqKl5VcYlTeicwglRzrgWNc2HSQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IURIBVof6O6zDPvTPJZ7VT9SlVxqIcAkq81JaBibsXic86sr4vwL0vaTUvgp3yYUyk1eLwTVicOuBrQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IURIBVof6O6zDPvTPJZ7VTD8iawuvswlADtbmber0yy9M6cKDd22gbx6jgBBtoel1hX8p2JfLhGRQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：MD5 + Hook + 反调试
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 需要注意的是，Fiddler 本身没有 Hook 功能，需要自己编写插件，而且只有 Fiddler Classic 版本是支持插件的，可以参考 Fiddler Classic 插件编写文档[2]，也就是说 MacOS 和 Linux 用户可...

## 七、迁移关键词
- MD5
- Hook
- 反调试
- Fiddler
