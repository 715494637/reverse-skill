# JS逆向 - 东、深、昆航查询参数

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149469366
- 序号：25
- 标签：WASM、签名参数
- 页面信息：原创 于 2025-07-19 20:23:36 发布 · 1.6k 阅读 · 7 · 5 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #爬虫 #网络爬虫 #wasm 原创 于 2025-07-19 20:23:36 发布 · 1.6k 阅读 · 7 · 5 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 东、深、昆航查询参数」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`X-Tingyun`、`x-s3-se4`、`sm4`、`key`、`sign`、`AES`

## 核心链路（提纯）
1. 加密：req(wasm)、X-Tingyun、refer__1036(xhr.send重写)、TLS
2. 加密：x-s3-se4(sm4/key动态算法)、sign(AES)
3. 逆向：JS逆向 - 东、深、昆航 查询 参数

## 关键文字线索
- URL(东)：aHR0cHM6Ly9tLmNlYWlyLmNvbS9tYXBwL3Jlc2VydmUvZmxpZ2h0TGlzdD9uZXdQYXJhbT0lN0IlMjJ0cmlwVHlwZSUyMiUzQTAsJTIyZGVwQ29kZSUyMiUzQSUyMlNIQSUyMiwlMjJhcnJDb2RlJTIyJTNBJTIyQkpTJTIyLCUyMmR0JTIyJTNBJTIyMSUyMiwlMjJhdCUyMiUzQSUyMjElMjIsJTIyZGVwTiUyMiUzQSUyMiVFNCVCOCU4QSVFNiVCNSVCNyUyMiwlMjJhcnJOJTIyJTNBJTIyJUU1JThDJTk3JUU0JUJBJUFDJTIyLCUyMmZsaWdodERhdGUlMjIlM0ElMjIyMDI1MDcxNyUyMiwlMjJwcm9kdWN0VHlwZSUyMiUzQSUyMkNBU0glMjIsJTIyY3VySW5kZXglMjIlM0EwJTdE
- 加密：req(wasm)、X-Tingyun、refer__1036(xhr.send重写)、TLS
- URL(深、昆)：aHR0cDovL3d3dy5haXJrdW5taW5nLmNvbS8jLw==、aHR0cHM6Ly93d3cuc2hlbnpoZW5haXIuY29tL3N6YWlyX0IyQy8=
- 加密：x-s3-se4(sm4/key动态算法)、sign(AES)
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 逆向：JS逆向 - 东、深、昆航 查询 参数
- 提示：提示：学习交流主页，星球持续更新中：链接https://t.zsxq.com/AJTw2（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/d7c0427df9aa4e07bfd19a824536783e.png
- 图2：https://i-blog.csdnimg.cn/direct/09aa98fc47b847c8b288056e31e504ae.png
- 图3：https://i-blog.csdnimg.cn/direct/8beefe272a474dfe899665cb13f4d4fa.png（上下文：提示：py实现）
- 图4：https://i-blog.csdnimg.cn/direct/20cfee8bf8c5465992a5ae968ef571a7.png（上下文：提示：py实现）
- 图5：https://i-blog.csdnimg.cn/direct/dfcce8aa0c6c4eecaefe7538e26c0c30.png（上下文：提示：py实现）

## 代码/算法线索
- 未提取到可见代码块，需通过断点 + 调用栈继续定位。

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。