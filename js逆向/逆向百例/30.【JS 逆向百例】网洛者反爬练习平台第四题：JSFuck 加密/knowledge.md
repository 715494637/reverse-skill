# 【JS 逆向百例】网洛者反爬练习平台第四题：JSFuck 加密

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500526&idx=1&sn=2a3fbb222230fd3732543d5f70783b54&chksm=c1e26404f695ed12133d5307fce6602329cc2e36208d633e37360c57512c16291ab6a7e1ec66#rd
- 发布信息：2021年12月22日 14:17 | 作者：K哥爬虫

## 一、问题画像
链接：http://spider.wangluozhe.com/challenge/4

## 二、关键文字要点
- 要点1：目标：网洛者反反爬虫练习平台第四题：JSFuck 加密
- 要点2：简介：本题仍然是要求采集100页的全部数字，并计算所有数据加和，需要抠出源码进行计算，主要使用了 JSFuck 加密
- 要点3：JSFuck、AAEncode、JJEncode 都是同一个作者，JSFuck 由日本的 Yosuke HASEGAWA 在 2010 创造，它可以将任意 JavaScript 编码为仅使用 6 个符号的混淆形式 []( "")!+，2012 年，Martin Kleppe 在 GitHub 上创建了一个 jsfuck 项目和一个 JSFuck.com 网站，其中包含使用该编码器实现的 Web 应用程序。JSFuck 可用于绕过对网站上...
- 要点4：经过 JSFuck 混淆之后的代码：
- 要点5：使用 Hook 的方式，分别 Hook Function 和 eval，打印输出源码；
- 要点6：除了这种方法以外，我们还可以使用 Hook 的方式，直接捕获源码然后打印输出，注意到这段混淆代码最后没有 () 括号，那就是 eval 的方式执行的，我们编写 Hook eval 代码如下：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZVxspOcl2aKQs0xtKVV85XLlmgWD1ialOKCxic6BOibRibD6UkYJMQ24f270IxgibP2zw57vhzu5ribibA/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZVxspOcl2aKQs0xtKVV85W1xEj5jxrAC3WMh0Qv2lJQeYzC7P3ctX9ssTTYVhVmQ8KkX4jZmCvA/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZVxspOcl2aKQs0xtKVV85ywPD3ibCdzP49PpUmoGGfMe7qJUwXAicLcIG6yFBlJ6QqEf4R0h63Dtw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZVxspOcl2aKQs0xtKVV85aptpXvPU8e3aiaZlvcoibNW9zbgMxdiaSbibNRrp48VGXbYFnK7uFI86ng/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZVxspOcl2aKQs0xtKVV85IdedIstX0Tvg0MV4dj7BTC6EKyZXKAnTtzcIsodSCZKn6j1alZzzlQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZVxspOcl2aKQs0xtKVV852mZ1eey5sHBOC46hoxbUhf6L2t1EF9PF4cIofUw7CVnhqFYxssVU8w/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZVxspOcl2aKQs0xtKVV855ibwRKdxk13qj6DbIlonFBbHJVS7pNwqic1oTwNJuf0UYUEotTiaEZKibA/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + 混淆还原 + Hook + 反调试 + 补环境
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
- JSFuck、AAEncode、JJEncode 都是同一个作者，JSFuck 由日本的 Yosuke HASEGAWA 在 2010 创造，它可以将任意 JavaScript 编码为仅使用 6 个符号的混淆形式 []( "")!+，201...
- 除了这种方法以外，我们还可以使用 Hook 的方式，直接捕获源码然后打印输出，注意到这段混淆代码最后没有 () 括号，那就是 eval 的方式执行的，我们编写 Hook eval 代码如下：
- 可以看到就是一个 AES 加密，这里主要注意有两个 if-else 语句，第一个判断是否存在 window.document.onclick，第二个是时间差的判断，我们可以在控制台去尝试取一下 window.document.onclick...

## 七、迁移关键词
- AES
- 混淆还原
- Hook
- 反调试
- 补环境
- JSFuck
