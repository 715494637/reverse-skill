# 【JS 逆向百例】某公共资源交易网，公告 URL 参数逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500553&idx=1&sn=6a791ca4d8b904ad0a6cc186d6b6d6ba&chksm=c1e265e3f695ecf5f432fcbdfebdccf0c858d0aff7cb21d729db4598c903984ef9d95d036402#rd
- 发布信息：2022年7月20日 17:55 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cDovL2dnenkuamNzLmdvdi5jbi93ZWJzaXRlL3RyYW5zYWN0aW9uL2luZGV4

## 二、关键文字要点
- 要点1：接口：aHR0cDovL2dnenkuamNzLmdvdi5jbi9wcm8tYXBpLWNvbnN0cnVjdGlvbi9jb25zdHJ1Y3Rpb24vYmlkZGVyL2JpZFNlY3Rpb24vbGlzdA==
- 要点2：逆向参数：链接中的 projectId、projectInfo 参数
- 要点3：Query String Parameters 中有些参数信息，各类型什么含义后文会详细讲解：
- 要点4：接下来随便点击一条公告，跳转到一个新页面，会发现网页链接变成了这种格式：XXX/index?projectId=XXX&projectInfo=XXX，生成了 projectId 和 projectInfo 两个加密参数，并且经过测试，同一个公告页面这两个加密参数的值是固定的，接下来我们需要尝试找到这两个参数的加密位置。
- 要点5：从主页位置 CTRL + SHIFT + F 全局搜索 projectId 参数，依次对比可以发现，projectId 和 projectInfo 两个加密参数在 chunk-63628500.eb5f8d30.js 中定义，这里是个三目运算，若项目类型相同则执行其后的方法，若不同则往后执行：
- 要点6：上文代码行判断中出现的 ZFCG、GTGC 是什么意思呢，CTRL + SHIFT + F 全局搜索 ZBGG 参数，在 chunk-043c03b8.34f6abab.js 文件中我们可以找到相应的定义，以下即各自的含义：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IOKk5ke1vVRgwMjuPKS9vnoGtnGRhmLy7Sz5kgiacUY2JxjLZ9ta0brWLUoFkIh6ONt33Feogh9nw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IOKk5ke1vVRgwMjuPKS9vnk0sybRUk1YJmpWiaOd9sY6edZhfMAlRYrBTibKm30UGILcAOrNIxQjwQ/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IOKk5ke1vVRgwMjuPKS9vniarm09PEiakkyWtFodBY7vjJRpF7veM4eb31A44FBhmr8zs58gW8u2Sg/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IOKk5ke1vVRgwMjuPKS9vnS7aAvlRW0Wt5Yw6N6oJWWp7A7SF8Ek3NrS7z8icfmBFQ7ZsL1qyr1RQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IOKk5ke1vVRgwMjuPKS9vnsgGibjstNHtaBSHfSTz1fAFY3JbZmyicPwia6FhSEQml1PRQWYPXrjdqw/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IOKk5ke1vVRgwMjuPKS9vn66vZrsF9OibjQPuCbf0TKY4gxcv2aEN0OGm0eXcbQS9GwoK8VdWt50A/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IOKk5ke1vVRgwMjuPKS9vnemk9tVoYbRzgENyUA4Q5pQjmmVqicdUUn9UfUibF4usibC0gn60Aer3wA/640?wx_fmt=png

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
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- URL
