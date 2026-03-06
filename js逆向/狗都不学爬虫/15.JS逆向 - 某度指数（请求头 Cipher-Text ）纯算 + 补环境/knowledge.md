# JS逆向 - 某度指数（请求头**Cipher-Text**）纯算 + 补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/151395467
- 序号：15
- 标签：补环境、Cookie、签名参数、指纹
- 页面信息：最新推荐文章于 2026-03-04 11:16:40 发布 原创 于 2025-09-10 10:41:06 发布 · 1.3k 阅读 · 28 · 11 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #网络爬虫 #爬虫 #wasm #python 原创 于 2025-09-10 10:41:06 发布 · 1.3k 阅读 · 28 · 11 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 某度指数（请求头**Cipher-Text**）纯算 + 补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`Cipher-Text`、`aHR0cHM6Ly9pbmRleC5iYWlkdS5jb20vdjIvbWFpbi9pbmRleC5odG1sIy90cmVuZC8lRTklODclOTElRTglOUUlOEQlRTclQTclOTElRTYlOEElODA`、`headers`、`getSign`、`AES`、`fpData`、`caes`、`key`、`fpEncrypt`、`ciphertext`、`Cipher_Text`、`cookie`

## 核心链路（提纯）
1. 逆向：JS逆向 - 某度指数（请求头Cipher-Text）纯算 + 补环境
2. 1、直接搜索关键字：Cipher-Text
3. 2、在此处断点、然后刷新网页：从上面可以看到Cipher-Text其实就是等于p()
4. 3、所以直接在p函数下断、跳进去观察：
5. 4、可以看到会执行apply进入到异步方法中，我们可以直接在u.Paris.getAcsInstance和r.getSign函数地方下端，然后单步跟栈，里面没有多少;当执行到getSign里面的时候我们会发现,t.gs函数就是最终生成值的地方
6. 5、进入到t.gs里面，我们会发现它会进入到一个单独的js文件里面：acs-2057.js
7. 6、继续往下跟栈进入到g2方法，会发现一个地方特别像：b(‘0x77’) + ae + ‘\x5f’ + eg(a2, a0, a1)
8. 7、直接在JSONb(‘0x24’)下断点观察：发现a1的值其实就是浏览器的指纹+时间戳
9. 8、这里我们只需要分析**eg(a2, a0, a1)**是怎么加密的了：盲猜一手AES了，很像,进入该方法
10. 9、果不其然，这时我们需要去验证是不是标准加密了：直接在线加密http://www.hiencode.com/caes.html
11. 10、最后实现：
12. 1、通过前面纯算的分析：我们可以知道Cipher-Text其实就是通过window.$BSB_2057.gs函数去通过指纹得到的，而且还是一个单独的js文件：acs-2057.js

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：JS逆向 - 某度指数（请求头Cipher-Text）纯算 + 补环境
- URL：aHR0cHM6Ly9pbmRleC5iYWlkdS5jb20vdjIvbWFpbi9pbmRleC5odG1sIy90cmVuZC8lRTklODclOTElRTglOUUlOEQlRTclQTclOTElRTYlOEElODA/d29yZHM9JUU5JTg3JTkxJUU4JTlFJThEJUU3JUE3JTkxJUU2JThBJTgw
- 1、直接搜索关键字：Cipher-Text
- 2、在此处断点、然后刷新网页：从上面可以看到Cipher-Text其实就是等于p()
- 3、所以直接在p函数下断、跳进去观察：
- 4、可以看到会执行apply进入到异步方法中，我们可以直接在u.Paris.getAcsInstance和r.getSign函数地方下端，然后单步跟栈，里面没有多少;当执行到getSign里面的时候我们会发现,t.gs函数就是最终生成值的地方
- 5、进入到t.gs里面，我们会发现它会进入到一个单独的js文件里面：acs-2057.js
- 6、继续往下跟栈进入到g2方法，会发现一个地方特别像：b(‘0x77’) + ae + ‘\x5f’ + eg(a2, a0, a1)
- 7、直接在JSONb(‘0x24’)下断点观察：发现a1的值其实就是浏览器的指纹+时间戳
- 8、这里我们只需要分析**eg(a2, a0, a1)**是怎么加密的了：盲猜一手AES了，很像,进入该方法
- 9、果不其然，这时我们需要去验证是不是标准加密了：直接在线加密http://www.hiencode.com/caes.html
- 1、通过前面纯算的分析：我们可以知道Cipher-Text其实就是通过window.$BSB_2057.gs函数去通过指纹得到的，而且还是一个单独的js文件：acs-2057.js
- 2、直接将acs-2057.js全扣下来，挂上代理
- 3、随便补下就可以调值了：
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：分析参数及加密流程 ---- 纯算版
- 提示：分析参数加载流程 ----- 补环境版
- 提示：学习交流主页，星球持续更新中：（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/2a8b50dd4f164790942a68856a1ea28a.png
- 图2：https://i-blog.csdnimg.cn/direct/d37e97f64c864abcb08c993f4b79e45a.png
- 图3：https://i-blog.csdnimg.cn/direct/b7e4a52d955146cabbc3f1f425c30c4d.png
- 图4：https://i-blog.csdnimg.cn/direct/930056263b424051b7ede783f9988d72.png
- 图5：https://i-blog.csdnimg.cn/direct/a2ce72b4d4184b029c5698e3f47e6429.png
- 图6：https://i-blog.csdnimg.cn/direct/4f656202888b4d9fb61873961357a2c8.png
- 图7：https://i-blog.csdnimg.cn/direct/163f60d0705c4201bded540e82500c4a.png
- 图8：https://i-blog.csdnimg.cn/direct/1195f01615864f24a77d0b73782f71a7.png
- 图10：https://i-blog.csdnimg.cn/direct/cbcc0bb8f38f4d62bab5560d0f14519f.png
- 图11：https://i-blog.csdnimg.cn/direct/cc57fa7e69744bf88594b49955fbf4ab.png
- 图12：https://i-blog.csdnimg.cn/direct/408eac92a25c4591921c5a36109c30aa.png
- 图14：https://i-blog.csdnimg.cn/direct/978a9bec47fa43afb1f6c94a6a534f9c.png

## 代码/算法线索
- 片段1：

```text
p(); case 3: n = t.sent, e.headers = e.headers || {}, e.headers["Cipher-Text"] = n; AI写代码javascript运行12345
```
- 片段2：

```text
p(); case 3: n = t.sent, e.headers = e.headers || {}, e.headers["Cipher-Text"] = n;
```
- 片段3：

```text
u.Paris.getAcsInstance r.getSign AI写代码javascript运行12
```
- 片段4：

```text
u.Paris.getAcsInstance r.getSign
```
- 片段5：

```text
window.$BSB_2057 = t.gs AI写代码javascript运行1
```
- 片段6：

```text
window.$BSB_2057 = t.gs
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。