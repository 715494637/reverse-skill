# JS逆向入门案例-某狐x电邮xiang（JSFuck+MD5）-04

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/141567717
- 序号：61
- 标签：补环境、Cookie、指纹
- 页面信息：原创 已于 2025-04-08 20:50:34 修改 · 1.2k 阅读 · 18 · 6 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #java #redis #爬虫 #python #scrapy 于 2024-08-26 17:29:20 首次发布 原创 已于 2025-04-08 20:50:34 修改 · 1.2k 阅读 · 18 · 6 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体 架构 流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-某狐x电邮xiang（JSFuck+MD5）-04」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookies`、`cookie`、`_dfp`、`MD5`、`dfp`、`params`、`headers`、`md5`

## 核心链路（提纯）
1. 逆向：某狐x电邮xiang（JSFuck）
2. 密码输入：123456,结果发现确实是MD5加密
3. 我们发现每个接口都有一个"_"参数:13位时间戳
4. 1、首页将代码复制到py中执行
5. 2、我们就需要去分析这三个cookie是怎么来的 观察发现，每次点击登录，都会发送这个请求包，观察代码，看代码形式是一个JSFuck混淆，它是一种将代码使用特殊符号来进行表示的混淆方式，而使用**[]!**这种方式的混淆，我们也叫它JSFuck混淆！ 3、复制括号内的代码，我们到 控制 台去执行它，发现出值了！
6. 4、所以jv参数是通过后端返回回来js代码,将一组 数组 通过String.fromcharcode转换得到的！ 5、继续复制curl生成py代码,得到这个JSFuck代码，我们发现请求它也是需要gidinf、_dfp这俩个cookie值的
7. 发现没有这俩个cookie值是获取不到的，继续分析这俩个cookie是怎么来的，我们通过搜索值发现： 通过该接口获得，所以我们继续使用curl复制py代码：
8. 6、最后我们就需要解决password这个参数了，我们去验证我们刚开始的猜想，因为它的值长度为32位，所以我们使用spidertools中的加密去验证！
9. 7、python代码实现
10. 9、运行结果：
11. 提示：快速定位方式，猜想是何加密，验证猜想

## 关键文字线索
- 概要整体架构流程技术细节小结
- 逆向：某狐x电邮xiang（JSFuck）
- URL：aHR0cHM6Ly9tYWlsLnNvaHUuY29tL2ZlLyMvbG9naW4=
- 目的：登录（password和cookies）
- 生成py工具：spidertools.cn
- 那么我们如何去得到他原来的代码是什么样的？ 我们看一般象这种混淆它都是一个方法，那么它去执行一个方法的时候都会带上** () **去执行,那么我们可以将代码最后面的那个括号进行去掉，然后再加上一个空字符串就能得到原来的代码形式。
- 密码输入：123456,结果发现确实是MD5加密
- 我们发现每个接口都有一个"_"参数:13位时间戳
- password:为32位字符串（小写），猜测md5
- []!格式代码，猜测JSFuck
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系！
- 提示：分析-调试-猜想-实现-执行
- 1、首页将代码复制到py中执行
- 2、我们就需要去分析这三个cookie是怎么来的 观察发现，每次点击登录，都会发送这个请求包，观察代码，看代码形式是一个JSFuck混淆，它是一种将代码使用特殊符号来进行表示的混淆方式，而使用**[]!**这种方式的混淆，我们也叫它JSFuck混淆！ 3、复制括号内的代码，我们到 控制 台去执行它，发现出值了！
- 4、所以jv参数是通过后端返回回来js代码,将一组 数组 通过String.fromcharcode转换得到的！ 5、继续复制curl生成py代码,得到这个JSFuck代码，我们发现请求它也是需要gidinf、_dfp这俩个cookie值的
- 发现没有这俩个cookie值是获取不到的，继续分析这俩个cookie是怎么来的，我们通过搜索值发现： 通过该接口获得，所以我们继续使用curl复制py代码：
- 6、最后我们就需要解决password这个参数了，我们去验证我们刚开始的猜想，因为它的值长度为32位，所以我们使用spidertools中的加密去验证！
- 7、python代码实现
- 提示：快速定位方式，猜想是何加密，验证猜想
- 提示：学习交流群：v:wzwzwz0613拉进群

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/1e217d0c46ec4e4f941cde858d82a434.png
- 图2：https://i-blog.csdnimg.cn/direct/cd1726d6f5214a189402f15be4d5ad36.png
- 图3：https://i-blog.csdnimg.cn/direct/f4eca05de2644d71b02084dbc1c415a4.png（上下文：1、首页将代码复制到py中执行）
- 图4：https://i-blog.csdnimg.cn/direct/516c76a8c1ba4e8b8efcc514287196fc.png
- 图5：https://i-blog.csdnimg.cn/direct/4acc00c99819421b82f1ecee723cd648.png（上下文：2、我们就需要去分析这三个cookie是怎么来的 观察发现，每次点击登录，都会发送这个请求包，观察代码，看代码形式是一个JSFuck混淆，它是一种将代码使用特殊符号来进行表示的混淆方式，而使用**[]!**这种方式的混淆，我们也叫它JSFu）
- 图6：https://i-blog.csdnimg.cn/direct/354a5f6ee8ab41ac81e6f5c7cce9bedf.png（上下文：2、我们就需要去分析这三个cookie是怎么来的 观察发现，每次点击登录，都会发送这个请求包，观察代码，看代码形式是一个JSFuck混淆，它是一种将代码使用特殊符号来进行表示的混淆方式，而使用**[]!**这种方式的混淆，我们也叫它JSFu）
- 图7：https://i-blog.csdnimg.cn/direct/a91bc70c5d584f22a2f448a8a2f61766.png（上下文：4、所以jv参数是通过后端返回回来js代码,将一组 数组 通过String.fromcharcode转换得到的！ 5、继续复制curl生成py代码,得到这个JSFuck代码，我们发现请求它也是需要gidinf、_dfp这俩个cookie值的）
- 图8：https://i-blog.csdnimg.cn/direct/5c0fde0824bd41c698085662d771c408.png（上下文：4、所以jv参数是通过后端返回回来js代码,将一组 数组 通过String.fromcharcode转换得到的！ 5、继续复制curl生成py代码,得到这个JSFuck代码，我们发现请求它也是需要gidinf、_dfp这俩个cookie值的）
- 图9：https://i-blog.csdnimg.cn/direct/0f0e78f1bee440aba55c0f43c0d2feb8.png（上下文：发现没有这俩个cookie值是获取不到的，继续分析这俩个cookie是怎么来的，我们通过搜索值发现： 通过该接口获得，所以我们继续使用curl复制py代码：）
- 图10：https://i-blog.csdnimg.cn/direct/ba3bde8c99c84bb1891aba070328e286.png（上下文：发现没有这俩个cookie值是获取不到的，继续分析这俩个cookie是怎么来的，我们通过搜索值发现： 通过该接口获得，所以我们继续使用curl复制py代码：）
- 图11：https://i-blog.csdnimg.cn/direct/bd2e09dc9a1b406ba631f02bc99a11b6.png（上下文：密码输入：123456,结果发现确实是MD5加密）
- 图13：https://i-blog.csdnimg.cn/direct/03572aa9fbd8451db2681f9960006f14.png（上下文：9、运行结果：）

## 代码/算法线索
- 片段1：

```text
import requests import time import execjs import hashlib # 请求该接口获取cookies - gidinf -dfp def getCommon(): url = "https://xxx/common" params = { "callback": "passport4014_cb1724658961362", "_": f"{time.time() *1e3}" } response = requests.get(url, headers=headers, params=params) cookies = response.cookies.get_dict() print('首先访问common接口，cookie值为：',cookies) # jsfuck --- 获取cookie jv url = "https://xxx/code" params = { "callback": "passport4014_cb1724658961364", "type": "0", "_": f"
```
- 片段2：

```text
import requests import time import execjs import hashlib # 请求该接口获取cookies - gidinf -dfp def getCommon(): url = "https://xxx/common" params = { "callback": "passport4014_cb1724658961362", "_": f"{time.time() *1e3}" } response = requests.get(url, headers=headers, params=params) cookies = response.cookies.get_dict() print('首先访问common接口，cookie值为：',cookies) # jsfuck --- 获取cookie jv url = "https://xxx/code" params = { "callback": "passport4014_cb1724658961364", "type": "0", "_": f"
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。