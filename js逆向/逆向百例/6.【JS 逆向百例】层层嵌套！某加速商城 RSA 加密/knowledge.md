# 【JS 逆向百例】层层嵌套！某加速商城 RSA 加密

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500493&idx=1&sn=eac6e40e7686f238155942ce12dde17b&chksm=c1e26427f695ed3182c1422b15585286f9ddb6f06c87ce3459dcc996736a63205db868fa3d84#rd
- 发布信息：2021年8月19日 17:33 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cDovL3d3dy4xNXl1bm1hbGwuY29tL3BjL2xvZ2luL2luZGV4

## 二、关键文字要点
- 要点1：接口：aHR0cDovL3d3dy4xNXl1bm1hbGwuY29tL3BjL2xvZ2luL2NoZWNr
- 要点2：逆向参数： Cookie： PHPSESSID=g9jp7sfpukg99v03gj69nr9r56 Form Data： u[password]: 7aad70a547b016a07f2e20bee7bb2832...... _csrfToken: 4bea63330c5ccdd37588321d027f4c40129687b0
- 要点3：最后一个密码参数u[password]，肯定是通过 JS 加密得到的，直接 Ctrl+Shift+F 全局搜索，可以直接在 index 首页找到 RSA 加密的地方，埋下断点进行调试，最后的 res 正是加密后的密码：
- 要点4：这里主要用到的三个函数RSAKey()、setPublic()、encrypt()，在开发者工具中，鼠标放到函数上，可以看到这里都是调用的 rsa.js 里面的方法，我们直接将整个文件剥离下来进行本地调试：
- 要点5：有了 jsbn.js 的代码，再次进行调试，会发现又提示navigator和SecureRandom未定义，navigator我们已经非常熟悉了，是浏览器的相关信息，一般情况下直接定义为空即可（navigator = {};）；将鼠标移到SecureRandom函数上面，可以发现是调用了 rng.js 里面的方法，同样的，直接将整个 rng.js 文件剥离下来进行本地调试。这里就证实了前面我们的猜想，rsa.js 确实是依赖 jsbn....
- 要点6：rsa.js、jsbn.js、rng.js 都齐全了，再次本地调试，会发现 rng.js 里面的rng_psize未定义，鼠标放上去看到rng_psize就是一个定值 256，在右边的 Global 全局变量里也可以看到值为 256，尝试搜索一下rng_psize，可以发现在 prng4.js 里面有定义var rng_psize = 256;，果然和注释说得一样，rng.js 是依赖 prng4.js 的，但是这里似乎直接定义一下rn...

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IjX1rrVtB1zgwVKaGYhMg63KuBUHIiaPCRSKd11kFexFkA5gAk6Oqicn7ibobGWFBZlWHI5u67DLP5Q/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IjX1rrVtB1zgwVKaGYhMg6S2nictrgTNGjJw6LZ4R1EX4EB0XibQVUnh8Jhe82Wte9J4QhMpiaLnGRQ/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IjX1rrVtB1zgwVKaGYhMg6btib3HUPWwt9YibJlzwNdvdggq10FYtKUvyWN5LmOTCAm5Mib5bIdY6hA/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IjX1rrVtB1zgwVKaGYhMg6iaDiaQXjpyKaxmnXrMm4yEea9s9yEFBicsib3ia28vJRsw2Rjdb0j6ScGcQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4IjX1rrVtB1zgwVKaGYhMg6s81fOHNWdM1zoMFzd6gRVpicViaStbnXAPvhUZMqPMk2sT649L2RkFiaQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：RSA + Cookie/Token + 补环境
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 补环境坚持最小化策略，优先模拟实际调用链触达的对象。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 只复现加密函数而忽略前置参数加工，结果通常会不一致。
- 遗漏时间戳、随机数、设备标识等动态字段，接口会出现偶发失效。
- 未建立回归样例，后续改动后难以及时发现签名链路回归。

## 七、迁移关键词
- RSA
- Cookie/Token
- 补环境
