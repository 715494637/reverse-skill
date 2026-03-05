# 【JS 逆向百例】你没见过的社会主义核心价值观加密

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500519&idx=1&sn=d3b1a1ddef247b6405f01b317f036301&chksm=c1e2640df695ed1b2d9c5a3b62dc3904c1394c6967a493cdb3951366ca3479a24695043c41aa#rd
- 发布信息：2021年11月25日 17:32 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly93d3cuYXBwbWl1LmNvbS9rZXkv

## 二、关键文字要点
- 要点1：目标：社会主义核心价值观加密原理分析
- 要点2：K哥的同事今天发来一个比较有趣的加密，不管你输入什么字符串，加密后的结果都是由 24 个字的社会主义核心价值观随机组合而成，如下图所示：
- 要点3：首先我们尝试抓包，看看是否有网络上的发包操作，实际上是没有的，这说明加密解密的逻辑都在已加载完毕的 JavaScript 代码里，这里介绍三种方法去定位加密入口：
- 要点4：1、我们注意到加密结果始终由社会主义核心价值观组成，肯定是在原 24 字的基础上做了一些操作，也就是说在某个地方肯定定义了这 24 个字，我们任意全局搜索其中一个词即可，如下图所示：
- 要点5：2、加密解密的结果都是点击了按钮才生成的，那么这个按钮肯定绑定了某些事件，比如鼠标点击事件，我们可以通过 DOM 事件断点的方式定位加密入口，如下图所示：
- 要点6：3、我们注意到加密解密的 button 都有一个 id，那么有可能 JavaScript 里会获取到这个 id 后，使用 addEventListener() 方法向这个元素添加鼠标点击事件句柄，所以也可以全局搜索其 id，即 encode-btn 和 decode-btn，也可以搜索 getElementById("encode-btn") 或者 getElementById("decode-btn")，当然也可以搜索方法关键字 ad...

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzwfzJE9tD6q292WWJVJn0KcuRTfyKfrz2v2dm61iamzr1toFDGF42R8foULibianLLAzDVry0IW1Vw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzwfzJE9tD6q292WWJVJn0QWTK3jtemf0ytVTYMn5ic40bfvgaE5xjF5ejoAkRKhX5PrMqlatoWzg/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzwfzJE9tD6q292WWJVJn0EefShBv1KrP4xyKVo18CVxQibW7YFFqdwiaEl5rXLFd38ZqibpKm1Bia0g/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzwfzJE9tD6q292WWJVJn0E9RzvlpU2LBtjVrI0pSwclY9hLuicXmusRFedVGJnlm3LrLYzYF7wTQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IzwfzJE9tD6q292WWJVJn0f9F9l9AWicLkwJw9zHoWQow8drzGfQeTicOyw7icgfbaAlDwQC588iahcw/640?wx_fmt=png

## 四、精华技能
- 技能定位：通用 JS 逆向调试
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 1、我们注意到加密结果始终由社会主义核心价值观组成，肯定是在原 24 字的基础上做了一些操作，也就是说在某个地方肯定定义了这 24 个字，我们任意全局搜索其中一个词即可，如下图所示：
- 3、我们注意到加密解密的 button 都有一个 id，那么有可能 JavaScript 里会获取到这个 id 后，使用 addEventListener() 方法向这个元素添加鼠标点击事件句柄，所以也可以全局搜索其 id，即 encode...

## 七、迁移关键词
- JS逆向
- 参数签名
- 抓包调试
