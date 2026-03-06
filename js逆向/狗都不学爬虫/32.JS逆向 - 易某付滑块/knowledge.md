# JS逆向 - 易某付滑块

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149019336
- 序号：32
- 标签：补环境、滑块/验证码、指纹
- 页面信息：原创 已于 2025-06-30 12:38:01 修改 · 1.9k 阅读 · 11 · 30 文章标签： #javascript #开发语言 #网络爬虫 #python #wasm 于 2025-06-30 12:30:02 首次发布 原创 已于 2025-06-30 12:38:01 修改 · 1.9k 阅读 · 11 · 30

## 章节结构
- 文章目录
- 概要
- 整体架构流程

## 逆向目标
- 目标围绕「JS逆向 - 易某付滑块」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`key`、`decryptInitParam`、`JfP`、`hex_md5`、`params`、`md5_value`

## 核心链路（提纯）
1. 逆向：JS逆向 - 易某付滑块
2. 1、滑动滑块进行验证：接口：aHR0cHM6Ly9kdC5zdW5pbmcuY29tL2RldGVjdC9kdC9kcmFnRGV0ZWN0Lmpzb24=
3. 2、这里发现需要逆向的参数是ffs和key，观察堆栈进行断点
4. 这里观察这个key是通过N(i)加密生成的，而i我们发现是一些配置参数
5. 取了i.g，然后进行BASE64加密+decryptInitParam,JfP(“q”)等于|，这里咱们观察js发现是7hY8wB0wi.js加载的
6. 那么咱们直接全扣，发现js只有差不多不到2000行，直接补环境就可以了，环境很少很少，这里就不说了，直接导出来就可以加密了
7. 3、进行分析ffs参数怎么生成的
8. 这里我们可以看到ffs就是F和s参数拼接生成的,往上看这俩个怎么来的

## 关键文字线索
- 概要 整体架构流程 技术细节 小结
- 逆向：JS逆向 - 易某付滑块
- URL：aHR0cHM6Ly9wYXkuc3VuaW5nLmNvbS9lcHAtZXB3L3VzZXJhY2NvdW50L3VzZXJkYXRhL2ZpbmQtbG9naW4tcGFzc3dvcmQhaW5pdEZpbmRMb2dpblBhc3N3b3JkLmFjdGlvbg==
- 1、滑动滑块进行验证：接口：aHR0cHM6Ly9kdC5zdW5pbmcuY29tL2RldGVjdC9kdC9kcmFnRGV0ZWN0Lmpzb24=
- 验证成功返回：jsonp_76571751254341672(‘NJYH_7617b654-8cc5-468c-83b8-c96812861b75-f9df5’); 验证失败返回：jsonp_76571751254341672(‘null’);
- 2、这里发现需要逆向的参数是ffs和key，观察堆栈进行断点
- 这里发现ffs和key已经生成好了，往上观察我们会发现它是通过拼接＋上去的
- 这里观察这个key是通过N(i)加密生成的，而i我们发现是一些配置参数
- 取了i.g，然后进行BASE64加密+decryptInitParam,JfP(“q”)等于|，这里咱们观察js发现是7hY8wB0wi.js加载的
- 那么咱们直接全扣，发现js只有差不多不到2000行，直接补环境就可以了，环境很少很少，这里就不说了，直接导出来就可以加密了
- 3、进行分析ffs参数怎么生成的
- 这里我们可以看到ffs就是F和s参数拼接生成的,往上看这俩个怎么来的
- 观察这里 s = encode(A),F = hex_md5(s+P),而A是等于传参的E + l._after+(new Date().getTime() % 10)生成
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/17537fd775c440ff97161b4457688971.png
- 图2：https://i-blog.csdnimg.cn/direct/244fcd3eab1b4ad7804b1cb753b384e1.png
- 图3：https://i-blog.csdnimg.cn/direct/742f12bab4654d7eb70c42861085d172.png
- 图4：https://i-blog.csdnimg.cn/direct/84c68da1f6954b27aebb1b2bd2a9cd62.png
- 图5：https://i-blog.csdnimg.cn/direct/3a8405bcbcd54c9dbcdea89445c2f010.png
- 图6：https://i-blog.csdnimg.cn/direct/a2c7ed7f66e94aee908de5d4cd4e8507.png
- 图7：https://i-blog.csdnimg.cn/direct/55eb44fda9a24d188e48e1e2fea4d6db.png
- 图8：https://i-blog.csdnimg.cn/direct/9ef4e7041ca84685b05e2158df1e622d.png
- 图9：https://i-blog.csdnimg.cn/direct/352df6a7681a40c297df9b2e6d0e5eb4.png
- 图10：https://i-blog.csdnimg.cn/direct/bd224053e43b4fa8bef6a74e8a9f8bd7.png
- 图11：https://i-blog.csdnimg.cn/direct/3314be350e7f4637878c4f6a518c7f4c.png
- 图12：https://i-blog.csdnimg.cn/direct/08fb0124faf64973b82a2bb105cbf9cc.png

## 代码/算法线索
- 片段1：

```text
// params 就E params = params + captchaDrag._after + (new Date().getTime() % 10); // params 就F params = encodec(params) // 这里 md5_value就是s md5_value = hex_md5(params + 'dg'AI写代码javascript12345
```
- 片段2：

```text
// params 就E params = params + captchaDrag._after + (new Date().getTime() % 10); // params 就F params = encodec(params) // 这里 md5_value就是s md5_value = hex_md5(params + 'dg'
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。