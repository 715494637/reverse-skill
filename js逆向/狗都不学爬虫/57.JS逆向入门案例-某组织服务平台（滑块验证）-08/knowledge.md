# JS逆向入门案例-某组织服务平台（滑块验证）-08

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/143146279
- 序号：57
- 标签：补环境、签名参数、滑块/验证码
- 页面信息：原创 已于 2025-04-08 20:51:12 修改 · 578 阅读 · 11 · 7 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2024-10-22 12:07:08 首次发布 原创 已于 2025-04-08 20:51:12 修改 · 578 阅读 · 11 · 7 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-某组织服务平台（滑块验证）-08」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`shape`、`rsa`、`RSA`、`Cipher`、`RsaEncrypt`、`key`、`cipher`、`ciphertext`

## 核心链路（提纯）
1. 逆向：某组织服务平台（滑块验证）
2. 点击搜索，触发滑块验证
3. 二、逆向加密参数
4. 这里a的值是通过滑块滑动距离进行的rsa加密
5. this.encodedata加密我们直接跳进去看看发现就是一段自写的js
6. 将a,b参数 提取 出来，后面需要用到
7. 通过启动器断点，然后往上跟栈，找到加密参数：

## 关键文字线索
- 逆向：某组织服务平台（滑块验证）
- URL：aHR0cHM6Ly94eGdzLmNoaW5hbnBvLm1jYS5nb3YuY24vZ3N4dC9uZXdMaXN0
- 这里a的值是通过滑块滑动距离进行的rsa加密
- this.encodedata加密我们直接跳进去看看发现就是一段自写的js
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：分析-调试-猜想-实现-执行
- 由于图片是base64形式，所以我们需要通过base64将图片 转换 ：
- 关于 识别 滑块滑动的距离，直接上代码：
- 将a,b参数 提取 出来，后面需要用到
- 通过启动器断点，然后往上跟栈，找到加密参数：
- 提示：学习交流群：v:wzwzwz0613拉进群

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/7b4bb69ddeb749bca95300ead67800e8.png
- 图2：https://i-blog.csdnimg.cn/direct/5943ea58f9b541639581c84bc61a155d.png（上下文：由于图片是base64形式，所以我们需要通过base64将图片 转换 ：）
- 图4：https://i-blog.csdnimg.cn/direct/a478b70188f64b73a86acb26a2cca922.png
- 图5：https://i-blog.csdnimg.cn/direct/3b7a407d16c8483d8a3325bfc1d0f1db.png（上下文：通过启动器断点，然后往上跟栈，找到加密参数：）
- 图7：https://i-blog.csdnimg.cn/direct/f70696a20c4d4a88bc29de775db2f15c.png
- 图9：https://i-blog.csdnimg.cn/direct/b7bf4e094542432fb6b0a45ec60ed20e.png（上下文：最后赋上结果图：）

## 代码/算法线索
- 片段1：

```text
bgImgBs64 = base64.urlsafe_b64decode(bgImgBs64) slImgBs64 = base64.urlsafe_b64decode(slImgBs64) AI写代码python运行12
```
- 片段2：

```text
bgImgBs64 = base64.urlsafe_b64decode(bgImgBs64) slImgBs64 = base64.urlsafe_b64decode(slImgBs64)
```
- 片段3：

```text
import requests,cv2 import numpy as np def identify_gap(bg, tp): """ bg: 背景图片 tp: 缺口图片 out: 输出图片 """ # 读取背景图片和缺口图片 bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE) tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE) # 缺口图片 yy = [] xx = [] for y in range(tp_img.shape[0]): for x in range(tp_img.shape[1]): r = tp_img[y, x] if r < 200: yy.append(y) xx.append(x) tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)] # 识别图片边缘 bg_edge = cv2.Ca
```
- 片段4：

```text
import requests,cv2 import numpy as np def identify_gap(bg, tp): """ bg: 背景图片 tp: 缺口图片 out: 输出图片 """ # 读取背景图片和缺口图片 bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE) tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE) # 缺口图片 yy = [] xx = [] for y in range(tp_img.shape[0]): for x in range(tp_img.shape[1]): r = tp_img[y, x] if r < 200: yy.append(y) xx.append(x) tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)] # 识别图片边缘 bg_edge = cv2.Ca
```
- 片段5：

```text
from Crypto.PublicKey import RSA from Crypto.Cipher import PKCS1_v1_5 import base64 def RsaEncrypt(plaintext): key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCsYUGHMhjSzdMqn9JzPfKs9JbxXTPtHofTv7reV0HrEz4brnE6ZJpNn5s934KO3L4QDF7ELHysIiounhhpF1bewW9jKdcpZA5M1CkGHKcwpLA2liaqOlt/0Mf3ui9jxR9AHxUMFVGfJ6Q4+cEmDBUAEOXlxqk4ZjGpubwGNk9XQIDAQAB" key_bytes = base64.b64decode(key) public_key = RSA.importKey(key_bytes) cipher = PKCS1_v1_5.new(public_key) bits_len = int(public_key.size_in_bi
```
- 片段6：

```text
from Crypto.PublicKey import RSA from Crypto.Cipher import PKCS1_v1_5 import base64 def RsaEncrypt(plaintext): key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCsYUGHMhjSzdMqn9JzPfKs9JbxXTPtHofTv7reV0HrEz4brnE6ZJpNn5s934KO3L4QDF7ELHysIiounhhpF1bewW9jKdcpZA5M1CkGHKcwpLA2liaqOlt/0Mf3ui9jxR9AHxUMFVGfJ6Q4+cEmDBUAEOXlxqk4ZjGpubwGNk9XQIDAQAB" key_bytes = base64.b64decode(key) public_key = RSA.importKey(key_bytes) cipher = PKCS1_v1_5.new(public_key) bits_len = int(public_key.size_in_bi
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。