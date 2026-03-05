# 【JS逆向百例】携某 testab 参数补环境详解

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247501677&idx=1&sn=529931cb34a6f5ce23e773f7f9b742cd&chksm=c1e26187f695e89169b047479ecdb7409b93edcf3ecde1724d5e9cb602af32e4b7f3d5cbe84f#rd
- 发布信息：2024年8月16日 18:17 | 作者：K哥爬虫

## 一、问题画像
可以发现是 e 函数生成的，我们向下跟栈，发现是一段 vmp 代码：

## 二、关键文字要点
- 要点1：目标：携某 testab 参数逆向分析
- 要点2：这段 vmp 代码是动态变化的，由 getHotelScript 接口返回的，我们为了方便调试，这里进行固定：
- 要点3：我们只需要在 node 中也成功打印出这个结果就 OK 了，话不多说，开始补环境。
- 要点4：jsvmp 插桩辅助补环境
- 要点5：对于补 jsvmp，不要一上来就挂代理补环境，我们应该先大致看看 vmp 代码怎样操作的浏览器环境。
- 要点6：相关 vmp 知识就不介绍了，网上有很多，自行查阅。因为我们是辅助补环境，我们可以在指令为函数调用的地方下断点：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_jpg/POicI8TV3kTpm0lPcQwjnzoTZ95eJtPHRV1FMXwxO3PercfZClm6TbN6BO0QDNHSXG494ZEcG3gtDjZpjzU9MeQ/640?wx_fmt=jpeg&from=appmsg
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpm0lPcQwjnzoTZ95eJtPHRQtK5IHEAwtCmo8UViaibjHM5CcWMfn0Ct7IkHLgcOkqM6mHlS9V2Ecow/640?wx_fmt=png&from=appmsg
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpm0lPcQwjnzoTZ95eJtPHRMK2Hpc3HjYh5VOlmbPAGQUJTYCDTetAvn19tMMiciccWwznFXp3iaF5nQ/640?wx_fmt=png&from=appmsg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpm0lPcQwjnzoTZ95eJtPHRzIoJ2rUV5smHz61Ky0Zn6QheFQ8pGcx9AwTnpqrsNnJYVW9S7KiaE7g/640?wx_fmt=png&from=appmsg
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpm0lPcQwjnzoTZ95eJtPHRDbKk35HCRAaKlIPImL9EBia2SQGdmX5ic3g2R8EudwQA5OHSK4HjayLg/640?wx_fmt=png&from=appmsg
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpm0lPcQwjnzoTZ95eJtPHRYX2S1s4Rnytubm8Kjnkuj6yY4QiczewcRhChgibibOiaJ5MwdqP4x7ZNuQ/640?wx_fmt=png&from=appmsg
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpm0lPcQwjnzoTZ95eJtPHR55SOzTibX53qIiapCclAziaQ7qibbJPWFx9prC9lleH8AmEexmPtJA854w/640?wx_fmt=png&from=appmsg
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/sz_mmbiz_png/POicI8TV3kTpm0lPcQwjnzoTZ95eJtPHRYbJGRPjJHutiaIEFbKQKzdjd9hSic8PqSCaq6lHPtgOwAp7ZTMVp6mMw/640?wx_fmt=png&from=appmsg

## 四、精华技能
- 技能定位：AES + Hook + 补环境
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
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- AES
- Hook
- 补环境
- testab
