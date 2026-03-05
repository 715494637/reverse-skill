# 【JS 逆向百例】无限debugger绕过，某网站互动数据逆向

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500498&idx=1&sn=2d39793cb194f9abed647e0fb4e9f84b&chksm=c1e26438f695ed2e6e328c18e9611c6d093591340906839f1a59e2219dc49517fbb318b3d59c#rd
- 发布信息：2021年9月1日 18:06 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cDovL3p3Zncuc2FuLWhlLmdvdi5jbi9pY2l0eS9pY2l0eS9ndWVzdGJvb2svaW50ZXJhY3Q=

## 二、关键文字要点
- 要点1：接口：aHR0cDovL3p3Zncuc2FuLWhlLmdvdi5jbi9pY2l0eS9hcGktdjIvYXBwLmljaXR5Lmd1ZXN0Ym9vay5Xcml0ZUNtZC9nZXRMaXN0
- 要点2：Request Headers： Cookie: ICITYSession=fe7c34e21abd46f58555124c64713513
- 要点3：我们尝试抓包，打开开发者工具，刷新一下页面，会发现此时页面被断到 debugger 的位置，点击下一步，又会被断到另一个 debugger 的位置，这种情况就是无限 debugger，无限 debugger 存在的意义就是防止一部分人进行调试，但事实上绕过无限 debugger 的方法非常简单，方法也非常多，以下介绍常用的几种绕过方法。
- 要点4：同样右键选择 Add conditional breakpoint，输入 false 即可跳过无限 debugger，其原理是添加条件断点，不管前面代码的逻辑是什么，运行到 debugger 的时候必定是 true 才能执行，只需要将其改为 false，那么它就不执行了：
- 要点5：所谓中间人拦截替换，就是狸猫换太子，将原来的含有无限 debugger 的函数给替换掉，这种方法适用于知道无限 debugger 函数所在的具体 JS 文件，重写 JS 文件，使其不含有无限 debugger 的函数，利用第三方工具将原来的 JS 文件替换成重写过后的文件，这类工具有很多，例如浏览器插件 ReRes，它通过指定规则，可以把请求映射到其他的 URL，也可以映射到本机的文件或者目录，抓包软件 Fidder 的 Auto re...
- 要点6：首先是 Cookie，直接搜索，可以发现在首页的请求中，Set-Cookie 里设置了 cookie 值，那么使用 get 方法请求主页，在 response 里面直接取 Cookie 即可：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRibicqPhbfgjKdgeGxPNh7QyXQAblQSm8ccibGjKh9VWG2wDTFCgYWm5zjg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRibK0t4WTndUTvXP0cqg2Q46uhHVGU6uDPZqxpZkNOXxoGTx0UW1IruBA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRiblk9LsLJJA0icCb2AX1JfSZGmeABibAPhdaRbuBnic565Uvz5iaQOadVoEQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRibHVfsZ19WgXsibNOWeLGHz1cbjck71WyuNGewolySz1zic8zORj5rMBaw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LEVO6vXfa1kCRicTB7YjDRibg80sFAv71ZJiaj0iaanSFzNGXXJqjW51909SiafsoNlpW2nRxWibmb5icBA/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + Hook + 反调试 + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 我们尝试抓包，打开开发者工具，刷新一下页面，会发现此时页面被断到 debugger 的位置，点击下一步，又会被断到另一个 debugger 的位置，这种情况就是无限 debugger，无限 debugger 存在的意义就是防止一部分人进行调...
- 所谓中间人拦截替换，就是狸猫换太子，将原来的含有无限 debugger 的函数给替换掉，这种方法适用于知道无限 debugger 函数所在的具体 JS 文件，重写 JS 文件，使其不含有无限 debugger 的函数，利用第三方工具将原来的...

## 七、迁移关键词
- AES
- Hook
- 反调试
- Cookie/Token
- debugger
