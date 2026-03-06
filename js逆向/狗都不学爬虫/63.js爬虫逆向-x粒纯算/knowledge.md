# js爬虫逆向-x粒纯算

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/139664487
- 序号：63
- 标签：签名参数
- 页面信息：原创 已于 2025-04-08 20:49:18 修改 · 1.3k 阅读 · 12 · 12 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #爬虫 #前端 #scrapy #python 于 2024-06-13 22:26:40 首次发布 原创 已于 2025-04-08 20:49:18 修改 · 1.3k 阅读 · 12 · 12 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体 架构 流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「js爬虫逆向-x粒纯算」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cipher_password`、`header`、`x-client-id`、`x-nonce`、`x-timestamp`、`X-Authentication-Signature`、`key`、`nonce`、`cipher`、`AES`、`MD5`

## 核心链路（提纯）
1. 进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现
2. x粒纯算（js逆向）
3. 逆向 参数： 登录form：cipher_password、client_identifier 请求头header：x-client-id、x-nonce、x-timestamp、X-Authentication-Signature
4. 提示：进入网址-分析js代码-验证加密算法-实现python代码
5. client_identifier参数分析 跟栈 到此处form表单参数分析完成
6. 找到header请求头加密–》x-client-id、x-nonce、x-timestamp、X-Authentication-Signature 分析参数 x-client-id我们分析知道是写死的：
7. 那么这最后一个参数位置在： 传递的参数为
8. 这里水一下，各位自行定位拼接参数 ^ - ^ 到这里所有参数分析完成！！！
9. 提示：挺简单，都是标准加密-AES+MD5

## 关键文字线索
- 概要整体架构流程技术细节小结
- 进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系！
- URL：aHR0cHM6Ly93d3cuemFubGkuY29tLw==
- 逆向 参数： 登录form：cipher_password、client_identifier 请求头header：x-client-id、x-nonce、x-timestamp、X-Authentication-Signature
- 提示：进入网址-分析js代码-验证加密算法-实现python代码
- client_identifier参数分析 跟栈 到此处form表单参数分析完成
- 找到header请求头加密–》x-client-id、x-nonce、x-timestamp、X-Authentication-Signature 分析参数 x-client-id我们分析知道是写死的：
- 那么这最后一个参数位置在： 传递的参数为
- 这里水一下，各位自行定位拼接参数 ^ - ^ 到这里所有参数分析完成！！！
- 提示：有需要可加v:wzwzwz0613
- 提示：挺简单，都是标准加密-AES+MD5
- 学习交流群：可联系v:wzwzwz0613拉进群 最后，就是 python 实现效果了！

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/blog_migrate/fae1a27bd8ad47ea23b5a47e2d52684f.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图2：https://i-blog.csdnimg.cn/blog_migrate/7cc55766b180acf5c6845f62437b95f4.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图3：https://i-blog.csdnimg.cn/blog_migrate/acda622587c5cd6a0c16de837a9e2067.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图4：https://i-blog.csdnimg.cn/blog_migrate/cfe0b16f5cf60441bc11df44c2c95344.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图5：https://i-blog.csdnimg.cn/blog_migrate/8bdc996787b9ee048ffd213de8e7defe.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图6：https://i-blog.csdnimg.cn/blog_migrate/4a9f28cded912e8cdf9686ac8d4b8956.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图7：https://i-blog.csdnimg.cn/blog_migrate/7f14ea3566e291c90dfc7d26cd210556.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图8：https://i-blog.csdnimg.cn/blog_migrate/67297dec24d4d341ba91daa8986b74c4.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图9：https://i-blog.csdnimg.cn/blog_migrate/59b8f5c0874df4621ea0ff2d3f6fbdf5.png（上下文：进入网址-打开开发者工具-登录 2、直接跟堆栈 找到form表单加密–》cipher_password、client_identifier 开始分析cipher_password 进入函数内部分析 具体代码实现）
- 图11：https://i-blog.csdnimg.cn/blog_migrate/c080ff2f1c526a9e401c4bf306ee314f.png（上下文：client_identifier参数分析 跟栈 到此处form表单参数分析完成）
- 图12：https://i-blog.csdnimg.cn/blog_migrate/bc8c54e17dc79125ddc6f8e72554f53e.png（上下文：client_identifier参数分析 跟栈 到此处form表单参数分析完成）
- 图13：https://i-blog.csdnimg.cn/blog_migrate/5728218a48f5a46a9bc3ed1b04494c77.png（上下文：找到header请求头加密–》x-client-id、x-nonce、x-timestamp、X-Authentication-Signature 分析参数 x-client-id我们分析知道是写死的：）

## 代码/算法线索
- 片段1：

```text
iv = ''.join(random.sample('qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM', 16)) key = 'kEUrAT0ppPXByzCPw35WY3I44NP6n8Jo' clientIdentifier = ''.join(random.sample('qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM', 16)) nonce = ''.join(random.sample('qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM', random.randint(21,22))) def getPwd(pwd): return base64.b64encode(iv.encode('utf-8') + encrypt(pwd)).decode() def encrypt(text): ciphe
```
- 片段2：

```text
iv = ''.join(random.sample('qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM', 16)) key = 'kEUrAT0ppPXByzCPw35WY3I44NP6n8Jo' clientIdentifier = ''.join(random.sample('qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM', 16)) nonce = ''.join(random.sample('qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM', random.randint(21,22))) def getPwd(pwd): return base64.b64encode(iv.encode('utf-8') + encrypt(pwd)).decode() def encrypt(text): ciphe
```
- 片段3：

```text
kEUrAT0ppPXByzCPw35WY3I44NP6n8Jo AI写代码python运行1
```
- 片段4：

```text
kEUrAT0ppPXByzCPw35WY3I44NP6n8Jo
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。