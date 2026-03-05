# 人均瑞数系列，瑞数 5 代 JS 逆向分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500558&idx=1&sn=fbeac1dd2a320216c1874b4cec3290a5&chksm=c1e265e4f695ecf23fbfe9d4acd79e88123679ad3bca7a242f1a6c170dd10bfb121a24c24a59#rd
- 发布信息：2022年9月1日 15:04 | 作者：K哥爬虫

## 一、问题画像
瑞数动态安全 Botgate（机器人防火墙）以“动态安全”技术为核心，通过动态封装、动态验证、动态混淆、动态令牌等技术对服务器网页底层代码持续动态变换，增加服务器行为的“不可预测性”，实现了从用户端到服务器端的全方位“主动防护”，为各类 Web、HTML5 提供强大的安全保护。

## 二、关键文字要点
- 要点1：瑞数动态安全 Botgate（机器人防火墙）以“动态安全”技术为核心，通过动态封装、动态验证、动态混淆、动态令牌等技术对服务器网页底层代码持续动态变换，增加服务器行为的“不可预测性”，实现了从用户端到服务器端的全方位“主动防护”，为各类 Web、HTML5 提供强大的安全保护。
- 要点2：在 K 哥往期的文章《人均瑞数系列，瑞数 4 代 JS 逆向分析》中，详细介绍了瑞数的特征、如何区分不同版本、瑞数的代码结构以及各自的作用，本文就不再赘述了，不了解的同志可以先去看看之前的文章。
- 要点3：定位 Cookie，首选 Hook 来的最快，通过 Fiddler 插件、油猴脚本、浏览器插件等方式注入以下 Hook 代码：
- 要点4：(function() { var cookieTemp = ""; Object.defineProperty(document, 'cookie', { set: function(val) { console.log('Hook捕获到cookie设置->', val); debugger; cookieTemp = val; return val; }, get: function() { return cookieTemp; }...
- 要点5：断下之后往上跟栈，可以看到组装 Cookie 后赋值给 document.cookie 的代码，类似如下结构：
- 要点6：继续往上跟栈，和4代瑞数类似，(772, 1) 的位置是入口，4代有一次生成假 cookie 的过程，5代就没有了，如下图所示：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Ly70P3iaKrDXsvQx2ewlNoLbic2Xg1W2GoCSgz5LzxibowSickHY8MdP8H1FnpALtuxrGWSic9o1hVH1A/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J9sNCjlzknOicXRTSHyIxx56FRty9oyzTsGDia7App22eh9fYueQuOEXHNfNzibfkO6K6DIDrRmY32Q/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J9sNCjlzknOicXRTSHyIxx5kv7A3k3ew48fzj4KibxNu3U2z3SqgzukYUHlZHIicAZj3XW27ticDRyXA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J9sNCjlzknOicXRTSHyIxx50pAjn4GUVLIHzOk3r2dtazyRNCha6cibhtmHKHKiaUJs8lqAvtJicxyyQ/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J9sNCjlzknOicXRTSHyIxx54dClzvu8pnzVmnibjkFHpztBXEsRHkBcVAOMDpcLwTia5h7ayZgjWGSQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4J9sNCjlzknOicXRTSHyIxx5kledemaQKa6bGiapiav6TfSVWVgiamGTeeU8iaU5orDlkVRyFueNcAGIRw/640?wx_fmt=png

## 四、精华技能
- 技能定位：MD5 + 混淆还原 + Hook + 反调试 + Cookie/Token + 验证码/风控 + 补环境
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
- MD5
- 混淆还原
- Hook
- 反调试
- Cookie/Token
- 验证码/风控
- 补环境
