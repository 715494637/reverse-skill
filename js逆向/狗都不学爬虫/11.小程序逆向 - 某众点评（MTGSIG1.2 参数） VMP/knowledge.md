# 小程序逆向 - 某众点评（MTGSIG1.2 参数） VMP

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/151961889
- 序号：11
- 标签：JSVMP/VMP、补环境、签名参数
- 页面信息：原创 已于 2025-09-22 14:35:22 修改 · 1.8k 阅读 · 9 · 10 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #小程序 #网络爬虫 #python #爬虫 于 2025-09-22 14:28:10 首次发布 原创 已于 2025-09-22 14:35:22 修改 · 1.8k 阅读 · 9 · 10 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「小程序逆向 - 某众点评（MTGSIG1.2 参数） VMP」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`MTGSIG1`、`signWithSiua`、`mtgsig`、`header`

## 核心链路（提纯）
1. 逆向：小程序逆向 - 某众点评（MTGSIG1.2 参数） VMP
2. 1、直接复制curl，并发送请求：不填或者填错都是返回403，不会给到正确的数据
3. 2、分析参数加密的位置：这里直接通过堆栈断点：
4. 3、这里我就直接略过跟栈的步骤了，直接跳到加密的位置：
5. 4、我们可以看到K对象，里面有一堆的函数，而K.signWithSiua就是实现加密的函数，x表示一些表单明文信息
6. 5、当我们运行完K.signWithSiua之后，mtgsig会添加到header里面，进入到这个函数里面，继续跟栈
7. 6、可以发现是d生成的，还是一个自执行，所以咱们可以直接扣算法
8. 7、setTimeout((function() {Dc[t(5)].t(Dc, {})}), 0)会判断a6是否存在，如果不存在会生成新的，这里直接说一下a6的生成位置
9. 8、扣的话相对比较简单，大概扣个1300行左右就搞定了
10. 1、首先就是初始化环境：
11. 2、调用函数加密：
12. 提示：是否校验该参数

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：小程序逆向 - 某众点评（MTGSIG1.2 参数） VMP
- 关于F12强开，流星大佬的工具！！！
- 公众号：流星Studio
- 1、直接复制curl，并发送请求：不填或者填错都是返回403，不会给到正确的数据
- 2、分析参数加密的位置：这里直接通过堆栈断点：
- 3、这里我就直接略过跟栈的步骤了，直接跳到加密的位置：
- 4、我们可以看到K对象，里面有一堆的函数，而K.signWithSiua就是实现加密的函数，x表示一些表单明文信息
- 5、当我们运行完K.signWithSiua之后，mtgsig会添加到header里面，进入到这个函数里面，继续跟栈
- 6、可以发现是d生成的，还是一个自执行，所以咱们可以直接扣算法
- d是一个自执行，里面是有一段是VMP，不用管，直接扣！！！
- 7、setTimeout((function() {Dc[t(5)].t(Dc, {})}), 0)会判断a6是否存在，如果不存在会生成新的，这里直接说一下a6的生成位置
- 8、扣的话相对比较简单，大概扣个1300行左右就搞定了
- 1、首先就是初始化环境：
- XCX调试工具需要+V：MeteorStudio6
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：该工具仅用于学习和测试哈
- 提示：需要注意的是，a6是初始化就加载好了
- 提示：学习交流主页，星球持续更新中：（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/f9eac4688fe34102a7f59ff5a8eef005.png
- 图2：https://i-blog.csdnimg.cn/direct/86040e4c1dfb401ab783f479d512f655.png（上下文：提示：该工具仅用于学习和测试哈）
- 图3：https://i-blog.csdnimg.cn/direct/2110b8ffb1964bb593c2a026da2c7030.png
- 图4：https://i-blog.csdnimg.cn/direct/fd92eda4a6ca4e018a52e1269dc727a3.png
- 图5：https://i-blog.csdnimg.cn/direct/c7d4a567716044e9b19b82dabace7835.png
- 图6：https://i-blog.csdnimg.cn/direct/844f3bc5ae3246eb9481227758f9e787.png
- 图7：https://i-blog.csdnimg.cn/direct/3f90dad26d5a4c1391f3cf5deff01895.png
- 图8：https://i-blog.csdnimg.cn/direct/1ca02711298d471180ca34625c29db48.png
- 图9：https://i-blog.csdnimg.cn/direct/64862d1f901041dfb8c31f3ecb2086a3.png
- 图10：https://i-blog.csdnimg.cn/direct/eb173f56a6624cd6aea9b402bd47c18e.png
- 图11：https://i-blog.csdnimg.cn/direct/a19b79ba60fe4895bbb46beaaa001a2e.png
- 图12：https://i-blog.csdnimg.cn/direct/fafddc155adb41e3b223376a3fef3a3a.png

## 代码/算法线索
- 未提取到可见代码块，需通过断点 + 调用栈继续定位。

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。