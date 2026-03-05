# 【JS 逆向百例】Ether Rock 空投接口 AES256 加密分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500517&idx=1&sn=6ed2aece02c04783eb26a83307f4ee54&chksm=c1e2640ff695ed1947c07e7bbe58aae3f4c5a3de900f7e05a0136d4bae5198a4c187462e3759#rd
- 发布信息：2021年11月24日 17:35 | 作者：K哥爬虫

## 一、问题画像
目标：Ether Rock（一种数字货币）空投接口 AES256 加密分析 主页：aHR0cHM6Ly9ldGhlcnJvY2submV0L2FpcmRyb3Av

## 二、关键文字要点
- 要点1：目标：Ether Rock（一种数字货币）空投接口 AES256 加密分析 主页：aHR0cHM6Ly9ldGhlcnJvY2submV0L2FpcmRyb3Av
- 要点2：接口：aHR0cHM6Ly9ldGhlcnJvY2submV0L2FpcmRyb3Atc3VibWl0
- 要点3：逆向参数：Form Data： content: U2FsdGVkX1/XnffSPZONOHb... key: jrwBwX2ll38bu/FFql+bAUYrRG8Ij...
- 要点4：来到空投页面，随便输入一个 ETH 钱包地址，点击提交，可抓包到提交接口，POST 请求，Form Data 里 content 和 key 参数均经过了加密处理，如下图所示：
- 要点5：老方法，尝试直接搜索，结果很多，不利于快速定位，XHR 断点，很容易定位到加密位置，如下图所示：
- 要点6：接着将定义的 content 和生成的 key 进行了一个叫做 AES256 的加密：content=AES256.encrypt(JSON.stringify(content),key); 这里 AES256 一般是指的密钥长度为 32 bytes（256 bit / 8）的 AES 加密，但是不要被名称迷惑，我们跟进去看看：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JxneYvdXsUaqr7GutV1N14OzWGTYIaH1KgP0QXHA25h4VmE8tTgwI66ibHAiazHS8qOJsjM3KKTa5Q/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JxneYvdXsUaqr7GutV1N142GfWmkkq17hNn1p70WazzzS02RrjxxGjVFM9rmC4KUibzbBSe32ee1w/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JxneYvdXsUaqr7GutV1N14C3XIQFsiczAnyBx0jBBwg6dcWh6okpxEyYnG5wDxIZMmBpK2TLkmF4Q/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JxneYvdXsUaqr7GutV1N14LLhenZianrg8fbpPJibPbY3ku2HnovYjaDOoW5cwZKqlcN3bx5ib9iauNw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JxneYvdXsUaqr7GutV1N145LFamlxYtgyZGPHlxpkfSFdcNibJXsaxFSwyqJ4Ykm2MLRzotufwFng/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + AES + Hook
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- RSA
- AES
- Hook
- Ether
- Rock
- AES256
