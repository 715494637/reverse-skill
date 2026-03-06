# JS逆向入门案例-某美世界无感滑块验证 （单图片底图还原）- 15

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/145573612
- 序号：50
- 标签：补环境、签名参数、滑块/验证码
- 页面信息：原创 已于 2025-04-08 20:52:23 修改 · 2.6k 阅读 · 21 · 17 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2025-02-11 16:45:09 首次发布 原创 已于 2025-04-08 20:52:23 修改 · 2.6k 阅读 · 21 · 17 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-某美世界无感滑块验证 （单图片底图还原）- 15」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`aHR0cHM6Ly9jYXB0Y2hhcy53YW5tZWkuY29tL2FpY2FwdGNoYS9maXJzdFRlc3Q`、`headers`、`AES`、`key`、`Cipher`、`Aes`、`aesEncrypt`、`cipher`、`box1`、`box2`、`shape`

## 核心链路（提纯）
1. 逆向：某美世界无感滑块验证-单图片底图还原
2. 分析一下响应参数： capKey：验证滑块接口需要的表单数据和作为AES加密的key,iv data：滑块底图的还原顺序 imgUrl：滑块背景图片和按钮图片（组合一起的） validateUrl：滑块的验证接口
3. 三、需要解决的问题： 1、将滑块背景图片和按钮图片拆分。 2、还原底图。 3、获取滑块滑动距离。
4. 首先我们需要将图片拆分下来，观察保存下来的图片分析，宽为310，高160，再看浏览器中还原后的滑块背景图片宽为260，所以我们需要将拿到的图片进行垂直拆分，并且左边的图片宽为260. 然后我们观察data参数，对照图片发现整个背景图片分成了2行20列，也就是图片被分成了40个小图片，所以我们需要将图片拆分成40个小图，最后通过data底图还原顺序将图片还原。
5. 1、capTicket、appId：访问首页返回的值 2、op:参数为标准AES加密，对滑块轨迹进行加密，key、iv为capKey分段拼接合并而成 3、validData:validate = { "length":gan + 5, "validateTimeMilSec":random.randint(1100, 3100), }gen:滑动距离 4、_：13位时间戳
6. 提示：过无感-获取滑块图片-还原滑块底图-轨迹-加密-验证滑块
7. 2.op:参数为 标准 AES加密，key、iv为capTicke分段拼接合并而成
8. 3、_:13为时间戳 f"{int(round(1000*time.time()))}"

## 关键文字线索
- 概要整体架构流程技术细节小结
- 逆向：某美世界无感滑块验证-单图片底图还原
- URL：aHR0cHM6Ly9pZC53YW5tZWkuY29tL2xvZ2luIw==
- 接口：aHR0cHM6Ly9jYXB0Y2hhcy53YW5tZWkuY29tL2FpY2FwdGNoYS9maXJzdFRlc3Q=
- 一、点击按钮进行认证-无感：
- capTicket、appId：访问首页返回的值
- 二、获取滑块背景图片接口：
- 分析一下响应参数： capKey：验证滑块接口需要的表单数据和作为AES加密的key,iv data：滑块底图的还原顺序 imgUrl：滑块背景图片和按钮图片（组合一起的） validateUrl：滑块的验证接口
- 三、需要解决的问题： 1、将滑块背景图片和按钮图片拆分。 2、还原底图。 3、获取滑块滑动距离。
- 首先我们需要将图片拆分下来，观察保存下来的图片分析，宽为310，高160，再看浏览器中还原后的滑块背景图片宽为260，所以我们需要将拿到的图片进行垂直拆分，并且左边的图片宽为260. 然后我们观察data参数，对照图片发现整个背景图片分成了2行20列，也就是图片被分成了40个小图片，所以我们需要将图片拆分成40个小图，最后通过data底图还原顺序将图片还原。
- 这里废话不多说，直接放代码吧！！！
- 接下来就是获取滑块的滑动距离：你们可以使用ddddocr，这里贴一下我自己的opencv识别
- 1、capTicket、appId：访问首页返回的值 2、op:参数为标准AES加密，对滑块轨迹进行加密，key、iv为capKey分段拼接合并而成 3、validData:validate = { "length":gan + 5, "validateTimeMilSec":random.randint(1100, 3100), }gen:滑动距离 4、_：13位时间戳
- 注意重点，length的值加5，轨迹的话随便模拟一下就得
- 五、验证python实现：
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：过无感-获取滑块图片-还原滑块底图-轨迹-加密-验证滑块
- 2.op:参数为 标准 AES加密，key、iv为capTicke分段拼接合并而成
- 3、_:13为时间戳 f"{int(round(1000*time.time()))}"
- 提示：学习交流+v看主页

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/70e556bf072f4d23be52d57c78ce5875.png
- 图2：https://i-blog.csdnimg.cn/direct/782d0e97adc84727abdf2a2d3eea42be.png
- 图3：https://i-blog.csdnimg.cn/direct/1e8fee5d72c04dae88591c93b9e3a2d1.png（上下文：参数分析：）
- 图4：https://i-blog.csdnimg.cn/direct/549d16ea6499409dbd8753adc6181385.png（上下文：capTicket、appId：访问首页返回的值）
- 图5：https://i-blog.csdnimg.cn/direct/c109981a7f234570856d4e9d536a13ef.png（上下文：2.op:参数为 标准 AES加密，key、iv为capTicke分段拼接合并而成）
- 图6：https://i-blog.csdnimg.cn/direct/45c2505e9f5d44f5b577fa3ead250d4f.png（上下文：2.op:参数为 标准 AES加密，key、iv为capTicke分段拼接合并而成）
- 图8：https://i-blog.csdnimg.cn/direct/f0bb41c3106f41f18feb0072aa3c2b6a.png
- 图9：https://i-blog.csdnimg.cn/direct/3bfc6db5e54e4ab1ac319da160b3f16a.png
- 图11：https://i-blog.csdnimg.cn/direct/f840bfd5ed094ec59fa9bcf89d201156.png
- 图13：https://i-blog.csdnimg.cn/direct/dec97fcca8e148809b247e9f8afe35aa.png
- 图14：https://i-blog.csdnimg.cn/direct/069719ce94cc4ef7bb4a0be0381afdfa.png
- 图15：https://i-blog.csdnimg.cn/direct/f999107db0b24449827a65477402271c.png

## 代码/算法线索
- 片段1：

```text
url = 'https://xxx/login' response = requests.get(url, headers=headers).content.decode() capTicket = re.findall("var capTicket = '(.*?)',", response)[0] capAppId = re.findall(", capAppId = '(.*?)';", response)[0] AI写代码python运行1234
```
- 片段2：

```text
url = 'https://xxx/login' response = requests.get(url, headers=headers).content.decode() capTicket = re.findall("var capTicket = '(.*?)',", response)[0] capAppId = re.findall(", capAppId = '(.*?)';", response)[0]
```
- 片段3：

```text
import requests,base64 from Crypto.Cipher import AES key = iv = capTicket[1:3] + capTicket[10:13] + capTicket[20:22] + capTicket[26:31] + capTicket[21:25] # Aes加密 Utf def aesEncrypt(text,key=None,iv=None): cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv.encode('utf-8')) pad = 16 - len(text) % 16 text = text + pad * chr(pad) encrypted_text = cipher.encrypt(text.encode('utf-8')) return base64.b64encode(encrypted_text).decode('utf-8') AI写代码python运行12345678910
```
- 片段4：

```text
import requests,base64 from Crypto.Cipher import AES key = iv = capTicket[1:3] + capTicket[10:13] + capTicket[20:22] + capTicket[26:31] + capTicket[21:25] # Aes加密 Utf def aesEncrypt(text,key=None,iv=None): cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv.encode('utf-8')) pad = 16 - len(text) % 16 text = text + pad * chr(pad) encrypted_text = cipher.encrypt(text.encode('utf-8')) return base64.b64encode(encrypted_text).decode('utf-8')
```
- 片段5：

```text
from PIL import Image import os,json import math from loguru import logger # 分割滑块图片和按钮图片 def split_image(image_path, output_dir='output', overlap=0, vertical=True): """ 智能图片分割器（支持重叠区域和方向选择） 参数： image_path: str - 原始图片路径 output_dir: str - 输出目录（默认'output'） overlap: int - 分割重叠像素数（默认0） vertical: bool - 分割方向（True为垂直，False为水平） 返回： tuple - 左右/上下分割后的文件路径 """ try: # 创建输出目录 os.makedirs(output_dir, exist_ok=True) with Image.open(image_path) as img: # 获取图片元数据 width, height = img.size form
```
- 片段6：

```text
from PIL import Image import os,json import math from loguru import logger # 分割滑块图片和按钮图片 def split_image(image_path, output_dir='output', overlap=0, vertical=True): """ 智能图片分割器（支持重叠区域和方向选择） 参数： image_path: str - 原始图片路径 output_dir: str - 输出目录（默认'output'） overlap: int - 分割重叠像素数（默认0） vertical: bool - 分割方向（True为垂直，False为水平） 返回： tuple - 左右/上下分割后的文件路径 """ try: # 创建输出目录 os.makedirs(output_dir, exist_ok=True) with Image.open(image_path) as img: # 获取图片元数据 width, height = img.size form
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。