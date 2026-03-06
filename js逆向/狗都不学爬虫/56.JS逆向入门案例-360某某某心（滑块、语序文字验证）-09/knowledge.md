# JS逆向入门案例-360某某某心（滑块、语序文字验证）-09

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/143799975
- 序号：56
- 标签：签名参数、滑块/验证码
- 页面信息：原创 已于 2025-04-08 20:51:22 修改 · 718 阅读 · 8 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #爬虫 #爬山算法 于 2024-11-15 15:59:55 首次发布 原创 已于 2025-04-08 20:51:22 修改 · 718 阅读 · 8 · 14 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-360某某某心（滑块、语序文字验证）-09」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`token---`、`token`、`params`、`headers`、`ftoken`、`shape`

## 核心链路（提纯）
1. 逆向：360某某某心（滑块、语序文字验证）
2. 经过观察，只有这个d参数是加密的，我们可以通过启动器断点去分析参数是怎么生成的：这里我们先分析***滑块的d***是什么生成
3. 那么怎么获取滑块滑动距离呢直接用cv2:
4. 下面分析一下轨迹生成，通过浏览器的一组完整的轨迹，然后使用识别出来的距离做相似距离处理(自己去断点拿到trackList)：
5. 三、verify接口，验证接口，url：aHR0cHM6Ly9jYXB0Y2hhLmJwZC4zNjAuY24vdjEvdmVyaWZ5，先看加密参数：

## 关键文字线索
- 逆向：360某某某心（滑块、语序文字验证）
- URL：aHR0cHM6Ly9pLjM2MC5jbi9sb2dpbi8=
- 目的：滑块、语序文字验证
- 一、config接口获取token,url：aHR0cHM6Ly9jYXB0Y2hhLmJwZC4zNjAuY24vdjEvZ2V0Y29uZmln
- 二、get接口，获取背景图片以及ftoken,url：aHR0cHM6Ly9jYXB0Y2hhLmJwZC4zNjAuY24vdjEvZ2V0
- 经过观察，只有这个d参数是加密的，我们可以通过启动器断点去分析参数是怎么生成的：这里我们先分析***滑块的d***是什么生成
- 那么怎么获取滑块滑动距离呢直接用cv2:
- 下面分析一下轨迹生成，通过浏览器的一组完整的轨迹，然后使用识别出来的距离做相似距离处理(自己去断点拿到trackList)：
- 继续我们看下一***文字点选的d***怎么生成的：
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：获取token---获取背景图片----验证
- 三、verify接口，验证接口，url：aHR0cHM6Ly9jYXB0Y2hhLmJwZC4zNjAuY24vdjEvdmVyaWZ5，先看加密参数：
- 至于语序文字的坐标 识别 我们可以使用：ddddocr/ 模型 训练/打码平台
- 提示：学习交流群：v:wzwzwz0613

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/d0205d242ba4424fb7b195bfb85251a0.png
- 图2：https://i-blog.csdnimg.cn/direct/94f48ab854644716ab18f6375aec355e.png（上下文：三、verify接口，验证接口，url：aHR0cHM6Ly9jYXB0Y2hhLmJwZC4zNjAuY24vdjEvdmVyaWZ5，先看加密参数：）
- 图3：https://i-blog.csdnimg.cn/direct/4633e49c90bf4f4d8b4c776039428532.png（上下文：三、verify接口，验证接口，url：aHR0cHM6Ly9jYXB0Y2hhLmJwZC4zNjAuY24vdjEvdmVyaWZ5，先看加密参数：）
- 图4：https://i-blog.csdnimg.cn/direct/6c7c9fbb71eb40a9b6ab91a1261a1eb9.png
- 图7：https://i-blog.csdnimg.cn/direct/7baacc40e37e46d7ae3903e6b00d2f47.png（上下文：至于语序文字的坐标 识别 我们可以使用：ddddocr/ 模型 训练/打码平台）
- 图8：https://i-blog.csdnimg.cn/direct/c9707dbf940147838f3aa2c921fb87f8.png

## 代码/算法线索
- 片段1：

```text
url = "https://xxx/getconfig" params = { "appid": "xxx" } config = requests.get(url, headers=headers, params=params).json() token = config["data"]['token'] logger.info(f"获取token: {token}") return token AI写代码python运行123456789
```
- 片段2：

```text
url = "https://xxx/getconfig" params = { "appid": "xxx" } config = requests.get(url, headers=headers, params=params).json() token = config["data"]['token'] logger.info(f"获取token: {token}") return token
```
- 片段3：

```text
url = "https://xxx/get" params = { "appid": "xxx", "token": token, "ty": "1" } captcha = requests.get(url, headers=headers, params=params).json() AI写代码python运行1234567
```
- 片段4：

```text
url = "https://xxx/get" params = { "appid": "xxx", "token": token, "ty": "1" } captcha = requests.get(url, headers=headers, params=params).json()
```
- 片段5：

```text
import numpy as np,cv2 # 获取滑块距离 def identify_gap(bg, tp): """ bg: 背景图片 tp: 缺口图片 out: 输出图片 """ # 读取背景图片和缺口图片 bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE) tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE) # 缺口图片 yy = [] xx = [] for y in range(tp_img.shape[0]): for x in range(tp_img.shape[1]): r = tp_img[y, x] if r < 200: yy.append(y) xx.append(x) tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)] # 识别图片边缘 bg_edge = cv2.Canny(bg_
```
- 片段6：

```text
import numpy as np,cv2 # 获取滑块距离 def identify_gap(bg, tp): """ bg: 背景图片 tp: 缺口图片 out: 输出图片 """ # 读取背景图片和缺口图片 bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE) tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE) # 缺口图片 yy = [] xx = [] for y in range(tp_img.shape[0]): for x in range(tp_img.shape[1]): r = tp_img[y, x] if r < 200: yy.append(y) xx.append(x) tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)] # 识别图片边缘 bg_edge = cv2.Canny(bg_
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。