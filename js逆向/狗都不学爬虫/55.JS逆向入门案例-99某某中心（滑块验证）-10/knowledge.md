# JS逆向入门案例-99某某中心（滑块验证）-10

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/143850474
- 序号：55
- 标签：补环境、签名参数、滑块/验证码、指纹
- 页面信息：原创 已于 2025-04-08 20:51:31 修改 · 802 阅读 · 6 · 7 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #scrapy #爬虫 于 2024-11-18 12:06:57 首次发布 原创 已于 2025-04-08 20:51:31 修改 · 802 阅读 · 6 · 7 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-99某某中心（滑块验证）-10」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`headers`、`aes`、`Cipher`、`AES`、`RSA`、`Aes`、`aesEncrypt`、`key`、`cipher`、`md5`、`md5Encrypt`、`fpHash`、`shape`、`RsaEncrypt`、`ciphertext`

## 核心链路（提纯）
1. 逆向：99某某中心（滑块验证）
2. 三、验证滑块接口，通过启动器断点，往上找，会找到这个位置：
3. challenge：上个接口的 k:通过上个接口返回的secretKey对随机生成的16位字符串进行aes加密 i:通过上个接口返回的secretKey对随机生成的16位字符串进行aes加密
4. 提示：获取配置参数接口，获取滑块背景图片接口，验证滑块接口
5. 1、Default接口：Data参数相当于appid，写死即可
6. 返回响应参数（Message下个接口的请求参数challenge）： 二、slide接口： 请求参数：challenge上个接口返回值，ts是时间戳 观察发现背景图片是乱的，所以我们得还原背景图片，我们可以通过事件监听器进行断点，也就是画布断点： 响应参数： imageRandomPos：底图还原的数组 originalImageBase64：乱的背景图片 secretKey：加密密钥（后面验证接口的参数会用到） sliderImageBase64：滑块图片 这里我就不说怎么还原了，直接帖代码：
7. 那么c就是我们验证接口的参数：
8. 最后就是w参数的生成,先看s生成：
9. RSA加密：

## 关键文字线索
- 逆向：99某某中心（滑块验证）
- URL：aHR0cHM6Ly9hcS45OS5jb20vVjMvTkRVc2VyX0xvZ2luLmh0bQ==
- 一、点击登录按钮，出现俩个接口（一个是配置接口，一个是获取滑块背景图片接口）：
- 三、验证滑块接口，通过启动器断点，往上找，会找到这个位置：
- challenge：上个接口的 k:通过上个接口返回的secretKey对随机生成的16位字符串进行aes加密 i:通过上个接口返回的secretKey对随机生成的16位字符串进行aes加密
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系v:wzwzwz0613
- 提示：获取配置参数接口，获取滑块背景图片接口，验证滑块接口
- 1、Default接口：Data参数相当于appid，写死即可
- 返回响应参数（Message下个接口的请求参数challenge）： 二、slide接口： 请求参数：challenge上个接口返回值，ts是时间戳 观察发现背景图片是乱的，所以我们得还原背景图片，我们可以通过事件监听器进行断点，也就是画布断点： 响应参数： imageRandomPos：底图还原的数组 originalImageBase64：乱的背景图片 secretKey：加密密钥（后面验证接口的参数会用到） sliderImageBase64：滑块图片 这里我就不说怎么还原了，直接帖代码：
- 那么c就是我们验证接口的参数：
- 最后就是w参数的生成,先看s生成：
- 提示：学习交流群：v:wzwzwz0613

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/7839bbb87aaf48ffaf7bdeb9457d9ac5.png
- 图2：https://i-blog.csdnimg.cn/direct/f4590c49beae4812bb4919ae486c7bbd.png（上下文：1、Default接口：Data参数相当于appid，写死即可）
- 图3：https://i-blog.csdnimg.cn/direct/42470125289d4a518b4b2c2ac66c4dad.png（上下文：返回响应参数（Message下个接口的请求参数challenge）： 二、slide接口： 请求参数：challenge上个接口返回值，ts是时间戳 观察发现背景图片是乱的，所以我们得还原背景图片，我们可以通过事件监听器进行断点，也就是画布）
- 图4：https://i-blog.csdnimg.cn/direct/5c97a8b78611436ca38ce336fcf30871.png（上下文：返回响应参数（Message下个接口的请求参数challenge）： 二、slide接口： 请求参数：challenge上个接口返回值，ts是时间戳 观察发现背景图片是乱的，所以我们得还原背景图片，我们可以通过事件监听器进行断点，也就是画布）
- 图5：https://i-blog.csdnimg.cn/direct/f403606d258b4010979da5fc9ea1625f.png（上下文：返回响应参数（Message下个接口的请求参数challenge）： 二、slide接口： 请求参数：challenge上个接口返回值，ts是时间戳 观察发现背景图片是乱的，所以我们得还原背景图片，我们可以通过事件监听器进行断点，也就是画布）
- 图6：https://i-blog.csdnimg.cn/direct/171d8bc3752645008b6f491724b73134.png（上下文：返回响应参数（Message下个接口的请求参数challenge）： 二、slide接口： 请求参数：challenge上个接口返回值，ts是时间戳 观察发现背景图片是乱的，所以我们得还原背景图片，我们可以通过事件监听器进行断点，也就是画布）
- 图7：https://i-blog.csdnimg.cn/direct/1f2a6a79c84c4b9ba1fede37e4ac93d3.png（上下文：返回响应参数（Message下个接口的请求参数challenge）： 二、slide接口： 请求参数：challenge上个接口返回值，ts是时间戳 观察发现背景图片是乱的，所以我们得还原背景图片，我们可以通过事件监听器进行断点，也就是画布）
- 图9：https://i-blog.csdnimg.cn/direct/24a9cbde7b0f41ee811e10f95816850d.png
- 图10：https://i-blog.csdnimg.cn/direct/69ab4864d8204dcb98970d07ba57af31.png（上下文：那么c就是我们验证接口的参数：）
- 图12：https://i-blog.csdnimg.cn/direct/d88ea47290c449baad341d6574228fba.png（上下文：获取滑动距离代码：）
- 图16：https://i-blog.csdnimg.cn/direct/477ce017635e4d3cb7ac0dfb0b388420.png

## 代码/算法线索
- 片段1：

```text
url = "https://xxx/Default.ashx" data = { "Action": "checkcodeinit", "Data": "xxx", "Business": "common" } response = requests.post(url, headers=headers, data=data).json() AI写代码python运行1234567
```
- 片段2：

```text
url = "https://xxx/Default.ashx" data = { "Action": "checkcodeinit", "Data": "xxx", "Business": "common" } response = requests.post(url, headers=headers, data=data).json()
```
- 片段3：

```text
# order：还原数组，img_data：originalImageBase64，_img：还原的图片地址 # 底图还原 def huanyuan(order, img_data, _img): img_data = base64.b64decode(img_data) # 创建图像对象 img = Image.open(io.BytesIO(img_data)) a = img.width # 宽度 s = img.height # 高度 i = a // len(order) # 每个块的宽度 # 创建新的空白图像 new_img = Image.new('RGB', (a, s)) d = 0 # 当前位置 for v in range(len(order)): h = order[v] y = i if h != len(order) - 1 else a - i * (len(order) - 1) # 获取拼图块 l = img.crop((d, 0, d + y, s)) # 粘贴到新图像中 new_img.paste(l, (h
```
- 片段4：

```text
# order：还原数组，img_data：originalImageBase64，_img：还原的图片地址 # 底图还原 def huanyuan(order, img_data, _img): img_data = base64.b64decode(img_data) # 创建图像对象 img = Image.open(io.BytesIO(img_data)) a = img.width # 宽度 s = img.height # 高度 i = a // len(order) # 每个块的宽度 # 创建新的空白图像 new_img = Image.new('RGB', (a, s)) d = 0 # 当前位置 for v in range(len(order)): h = order[v] y = i if h != len(order) - 1 else a - i * (len(order) - 1) # 获取拼图块 l = img.crop((d, 0, d + y, s)) # 粘贴到新图像中 new_img.paste(l, (h
```
- 片段5：

```text
from Crypto.Cipher import PKCS1_v1_5,AES from Crypto.PublicKey import RSA # Aes加密 Utf def aesEncrypt(text,key=None,iv=None): cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv.encode('utf-8')) pad = 16 - len(text) % 16 text = text + pad * chr(pad) encrypted_text = cipher.encrypt(text.encode('utf-8')) return base64.b64encode(encrypted_text).decode('utf-8') AI写代码python运行123456789
```
- 片段6：

```text
from Crypto.Cipher import PKCS1_v1_5,AES from Crypto.PublicKey import RSA # Aes加密 Utf def aesEncrypt(text,key=None,iv=None): cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv.encode('utf-8')) pad = 16 - len(text) % 16 text = text + pad * chr(pad) encrypted_text = cipher.encrypt(text.encode('utf-8')) return base64.b64encode(encrypted_text).decode('utf-8')
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。