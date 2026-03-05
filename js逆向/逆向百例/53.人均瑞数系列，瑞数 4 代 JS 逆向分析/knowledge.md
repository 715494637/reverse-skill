# 人均瑞数系列，瑞数 4 代 JS 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500551&idx=1&sn=60b7b3e8b8df11336981a05fc2b2d251&chksm=c1e265edf695ecfb3d0e9f43af88c22e2f158abf1680c75c8c6b42451dfda389101117c11c37#rd
- 发布信息：2022年7月1日 17:41 | 作者：K哥爬虫

## 一、问题画像
瑞数动态安全 Botgate（机器人防火墙）以“动态安全”技术为核心，通过动态封装、动态验证、动态混淆、动态令牌等技术对服务器网页底层代码持续动态变换，增加服务器行为的“不可预测性”，实现了从用户端到服务器端的全方位“主动防护”，为各类 Web、HTML5 提供强大的安全保护。

## 二、关键文字要点
- 要点1：瑞数动态安全 Botgate（机器人防火墙）以“动态安全”技术为核心，通过动态封装、动态验证、动态混淆、动态令牌等技术对服务器网页底层代码持续动态变换，增加服务器行为的“不可预测性”，实现了从用户端到服务器端的全方位“主动防护”，为各类 Web、HTML5 提供强大的安全保护。
- 要点2：瑞数 Botgate 多用于政企、金融、运营商行业，曾一度被视为反爬天花板，随着近年来逆向大佬越来越多，相关的逆向文章也层出不穷，真正到了人均瑞数的时代了，这里也感谢诸如 Nanda、懒神等逆向大佬，揭开了瑞数神秘的面纱，总结的经验让后来人少走了不少弯路。
- 要点3：过瑞数的方法基本上有以下几种：自动化工具（要隐藏特征值）、RPC 远程调用、JS 逆向（硬扣代码和补环境），本文介绍的是 JS 逆向硬扣代码，尽可能多的介绍各种细节。
- 要点4：2、瑞数的 JS 混淆代码中，变量、方法名大多类似于 _$xx，有众多的 if-else 控制流，新版瑞数还可能会有 jsvmp 以及众多三目表达式的情况：
- 要点5：FSSBBIl1UgzbN7N80T=37Na97B.nWX3....：数字 80 是 http 协议的默认端口号，对应 http 请求，其值第一位为 3，表示 3 代瑞数；
- 要点6：FSSBBIl1UgzbN7N443T=4a.tr1kEXk.....：数字 443 是 https 协议的默认端口号，对应 https 请求，其值第一位为 4，表示 4 代瑞数。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLbic2Xg1W2GoCSgz5LzxibowSickHY8MdP8H1FnpALtuxrGWSic9o1hVH1A/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ku3lLibSrsEiaicSN7AwSTjrE10Qajma91A8VAIo66wIWTPWQL7Jq5yYKKKvgjJLRlbO6xNf8p6Tlyw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ku3lLibSrsEiaicSN7AwSTjrEYEzbsBqFR9ia6gEIsGCHFoMqZ6cfficpc1NaOebh0kteQEl1N7yOmT2Q/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ku3lLibSrsEiaicSN7AwSTjrEhCmHHNp1DA0VpNVYia7cZDpKysK00a5MtW9RjZrIankCbLqn2SdZ8eQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ku3lLibSrsEiaicSN7AwSTjrEEmxuAZ4ic1Mf3f4TJak8klvbzibNeiaxMeq7KVvqU9oul63A2icKicqibChQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ku3lLibSrsEiaicSN7AwSTjrEkYzaIEpcXgUpLLmTahVyMtXAib2bvrag5QLkhPLKF604CCC4OH1zRYw/640?wx_fmt=png

## 四、精华技能
- 技能定位：混淆还原 + Hook + Cookie/Token + 验证码/风控 + 协议分析 + 补环境
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
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- 混淆还原
- Hook
- Cookie/Token
- 验证码/风控
- 协议分析
- 补环境
