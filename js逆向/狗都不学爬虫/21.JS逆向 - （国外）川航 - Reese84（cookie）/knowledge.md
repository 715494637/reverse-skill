# JS逆向 - （国外）川航 - Reese84（cookie）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149881176
- 序号：21
- 标签：补环境、Cookie
- 页面信息：原创 已于 2025-08-03 15:48:47 修改 · 1.2k 阅读 · 3 · 4 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #爬虫 #网络爬虫 #python #wasm 于 2025-08-03 15:46:06 首次发布 原创 已于 2025-08-03 15:48:47 修改 · 1.2k 阅读 · 3 · 4 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向 - （国外）川航 - Reese84（cookie）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookie`、`aHR0cHM6Ly9nbG9iYWwuc2ljaHVhbmFpci5jb20vd3d3Lz9jb3VudHJ5PVVTLUVOIy9ob21l`

## 核心链路（提纯）
1. 逆向：JS逆向 - （国外）川航 - Reese84（cookie）
2. python实现结果（补环境），可并发

## 关键文字线索
- 逆向：JS逆向 - （国外）川航 - Reese84（cookie）
- URL：aHR0cHM6Ly9nbG9iYWwuc2ljaHVhbmFpci5jb20vd3d3Lz9jb3VudHJ5PVVTLUVOIy9ob21l
- python实现结果（补环境），可并发
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：学习交流主页，星球持续更新中（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/f3427027f6cd4838b9e842e99c7b35a1.png
- 图2：https://i-blog.csdnimg.cn/direct/1c21443d0e6f4278876f4d893c530dec.png
- 图3：https://i-blog.csdnimg.cn/direct/35a91ab121b34e7db25386c9b75a731d.png

## 代码/算法线索
- 未提取到可见代码块，需通过断点 + 调用栈继续定位。

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。