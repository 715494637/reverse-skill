# 某空气质量监测平台无限 debugger 以及数据动态加密分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500531&idx=1&sn=7bcd23b1d7eec1ba67191218fa01cce6&chksm=c1e26419f695ed0ff1b311802866513b4595c234c4913f37d2ce075b73c98cd5e9549bfb3bc7#rd
- 发布信息：2022年1月8日 18:28 | 作者：K哥爬虫

## 一、问题画像
目标：某空气质量监测平台无限 debugger 以及请求数据、返回数据动态加密、解密

## 二、关键文字要点
- 要点1：打开控制台后会进入第一个无限 debugger，往上跟一个栈，可以看到一个 try-catch 语句，你下断点会发现他会一直走 catch，调用 setTimeout() 方法，该方法用于在指定的毫秒数后调用函数或计算表达式，注意上面，是将 debugger 传递给了构造方法 constructor，所以这里我们有两种方法过掉 debugger，Hook 掉 constructor 或 setTimeout 都可以。
- 要点2：// 两种 Hook 任选一中 // Hook 构造方法 Function.prototype.constructor_ = Function.prototype.constructor; Function.prototype.constructor = function (a) { if(a == "debugger") { return function (){}; } return Function.prototype.const...
- 要点3：然后就来到了第二个无限 debugger，同样跟栈，发现有个 setInterval 定时器和构造方法 constructor，类似的，我们 Hook 掉 constructor 或 setInterval 都可以。注意：定时器这里还检测了窗口高宽，即便是你过了 constructor 或 setInterval，如果不把开发者工具单独拿出来也是不行的，会不断输出“检测到非法调试”。
- 要点4：// Hook setInterval var setInterval_ = setInterval setInterval = function (func, time){ if (time == 2000) { return function () {}; } return setInterval_(func, time) }
- 要点5：我们观察到，其实这两个无限 debugger 都可以 Hook 构造方法来过掉，所以直接 Fiddler 注入该 Hook 构造方法的代码即可：
- 要点6：一些 appId、时间戳、城市等参数，做了一些 MD5、base64 的操作，返回的 param 就是我们要的值了。看起来不难，我们再找找返回的加密数据是如何解密的，我们注意到 ajax 请求有个 success 关键字，我们即便是不懂 JS 逻辑，也可以猜到应该是请求成功后的处理操作吧，如下图所示：传进来的 dzJMI 就是返回的加密的数据，经过 db0HpCYIy97HkHS7RkhUn() 方法后，就解密成功了：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JHWYn3ffet8ibtyRzrr8BmT343bFuHeQjXdTAA3IbqeKicGznMRgicnlsvicmtvKqP5EppfUcPtZ5KeQ/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JHWYn3ffet8ibtyRzrr8BmTtxajXibtFQ2SCQYIo8FQyDxMciaBfe0kyWcpcVicKLYEUKbsE2P31gg2Q/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JHWYn3ffet8ibtyRzrr8BmTFPmpvNnSW5YKNaT9PXEt20HjC0QzUrb8mNZ6wKPl35fQmle7jaLC2w/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JHWYn3ffet8ibtyRzrr8BmT4tkLmib3WIibz9poP4Zx1t8OZiaKEZ25Zzf5obtHDbDgOTrpicc4z96afA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JHWYn3ffet8ibtyRzrr8BmTmdibKqgBd3LaibBMGVrpZxrqaIIMibN96MHGQUfOkicnjLDhxILFbmG9Gg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JHWYn3ffet8ibtyRzrr8BmTNXuoAuIzzu0mTaze4CkQZTKRO3WhiaA5RbQuhgjpL8yl0B3NPzRib4ag/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4JHWYn3ffet8ibtyRzrr8BmTEiatxYmh5Rymibokv2c9sRRHXyc6Pj6JeX4CRZ2cPcTOygwibe4RtZoRw/640?wx_fmt=png

## 四、精华技能
- 技能定位：AES + MD5 + Hook + 反调试
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 对 XHR/fetch/加密函数做 Hook，记录入参、出参与调用栈。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 打开控制台后会进入第一个无限 debugger，往上跟一个栈，可以看到一个 try-catch 语句，你下断点会发现他会一直走 catch，调用 setTimeout() 方法，该方法用于在指定的毫秒数后调用函数或计算表达式，注意上面，是将...
- 然后就来到了第二个无限 debugger，同样跟栈，发现有个 setInterval 定时器和构造方法 constructor，类似的，我们 Hook 掉 constructor 或 setInterval 都可以。注意：定时器这里还检测了...
- 一些 appId、时间戳、城市等参数，做了一些 MD5、base64 的操作，返回的 param 就是我们要的值了。看起来不难，我们再找找返回的加密数据是如何解密的，我们注意到 ajax 请求有个 success 关键字，我们即便是不懂 J...

## 七、迁移关键词
- AES
- MD5
- Hook
- 反调试
- debugger
