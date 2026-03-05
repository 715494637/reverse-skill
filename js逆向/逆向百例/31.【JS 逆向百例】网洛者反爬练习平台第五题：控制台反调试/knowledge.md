# 【JS 逆向百例】网洛者反爬练习平台第五题：控制台反调试

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500527&idx=1&sn=c57e03a0da78269d7880ea48531d4c1c&chksm=c1e26405f695ed138760159a07e518475535d4fc80d76d5d084364c06a3ef0f18d9a6e406770#rd
- 发布信息：2021年12月24日 10:06 | 作者：K哥爬虫

## 一、问题画像
链接：http://spider.wangluozhe.com/challenge/5

## 二、关键文字要点
- 要点1：目标：网洛者反反爬虫练习平台第五题：控制台反调试
- 要点2：链接：http://spider.wangluozhe.com/challenge/5
- 要点3：简介：打开浏览器控制台，控制台 Console 位置输出 bbbb[0] 可看见答案，填上答案提交即可。
- 要点4：我们直接打开控制台，发现右键不能使用，直接 F12，页面就会直接跳转到首页了，问题不大，新起一个页面，先打开 F12 再进入页面即可，此时可以看到控制台在疯狂输出 div 标签，如下图所示：
- 要点5：这里比较尴尬的就是，虽然控制台在不断刷 div，但是对我们的输入没有太大影响，直接输入 bbbb[0]，往上找一找，就可以看到答案了，或者直接输入 copy(bbbb[0]) 就直接把答案复制到粘贴板了。如下图所示：
- 要点6：Hook 定时器，将输出 div 的语句删除；

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZACMMyNIo6SeiaIwBGC00SwdxhxuBRZerut1iaDuyl4YR2hpy2lev06nCQD6tZou6p4FXt4AWPRRA/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZACMMyNIo6SeiaIwBGC00S9qYMnYNQtn6tw75wPSJAXib4keuR5bxTcFGZqaZoJfMPa1miazuPs44Q/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZACMMyNIo6SeiaIwBGC00SVXKlWc7aszrP4RAcXQEUSmC6cuFgDWctj3R8LyNeUKDHKrqPF6turQ/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZACMMyNIo6SeiaIwBGC00SUBQGRNqvJibWgqiaH55dQg7awKgy6icIPS8icEMibMIu7LGc14Cy9BA5nyA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZACMMyNIo6SeiaIwBGC00S9uNmZhjibKonIrSGQynNFoSlppb12GTKdkIzRBk2ZIMW4dhWsmshwcA/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZACMMyNIo6SeiaIwBGC00SQbocenwc90ozLto20IcW6CNYE5yJQGt4NKTSicRHazAIxcwFQBT7peg/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4KZACMMyNIo6SeiaIwBGC00S8AcngNUEFicHAib4SCBDSsHgBzKxHCBxFJOSiaAhSSDwiaUlHY1bGqTfHA/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + Hook + 反调试
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 本次我们直接在控制台 Hook，将定时器置空，这里注意，如果程序已经进入了定时器，再 Hook 是没用的，所以正确的做法是在定时器前，比如 let div 的地方下个断点，刷新网页，再在控制台输入 setInterval = functio...

## 七、迁移关键词
- AES
- Hook
- 反调试
