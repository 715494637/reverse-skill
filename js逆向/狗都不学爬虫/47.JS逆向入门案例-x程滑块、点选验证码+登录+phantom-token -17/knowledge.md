# JS逆向入门案例-x程滑块、点选验证码+登录+phantom-token -17

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/146088077
- 序号：47
- 标签：补环境、Cookie、签名参数、滑块/验证码、指纹
- 页面信息：原创 已于 2025-03-07 21:54:27 修改 · 3.4k 阅读 · 31 · 20 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #开发语言 #ecmascript 于 2025-03-07 11:28:30 首次发布 原创 已于 2025-03-07 21:54:27 修改 · 3.4k 阅读 · 31 · 20 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 小结

## 逆向目标
- 目标围绕「JS逆向入门案例-x程滑块、点选验证码+登录+phantom-token -17」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`phantom-token`、`set_cookie_success`、`sfp`、`guid`、`Aes`、`key`、`encrypt_aes_hex_iv`、`AES`、`cipher`、`ciphertext`、`extend_param`、`aes`、`sign`、`shape`、`token`、`aesEncrypt`、`aesDecrypt`

## 核心链路（提纯）
1. 逆向：x程滑块、点选验证码+登录+phantom-token
2. 1、验证码：携程v4，获取滑块图片接口-captcha/v4/risk_inspect
3. 这里r = dimensions;_0x311148_(“0x72”) = '{“rt”:“fp=BAD79A-C7B9F1-28AE3E&vid=1741310313314.d34dAGplAZnm&pageId=153001&r=set_cookie_success&ip=14.216.139.115&rg=undefined&kpData=0_0_0&kpControl=0_0_0-0_0_0&kpEmp=0_0_0_0_0_0_0_0_0_0-0_0_0_0_0_0_0_0_0_0-0_0_0_0_0_0_0_0_0_0&screen=1536x864&tz=+8&blang=zh-CN&oslang=zh-CN&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20JiSu)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F118.3.1.7%20Safari%2F537.36&d=xxx.com&v=25&kpg=0_4_0_0_13662_13_4_0_0_0&adblock=F&cck=T”,“ua”:“Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36”,“p”:“pc”,“fp”:“BAD79A-C7B9F1-28AE3E”,“vid”:“1741310313314.d34dAGplAZnm”,“sfp”:undefined,“identify”:“aBAD79A-C7B9F1-28AE3E”,“svid”:undefined,“guid”:“09031053217969500223”,“h5_duid”:null,“pc_duid”:null,“hb_uid”:null,“pc_uid”:null,“h5_uid”:null,“infosec_openid”:null,“device_id”:“824c80bc7d9f0ee6eb23287ae62996b8”,“client_id”:“NCsRIqkEaOup1BOYcp0PQ6COuJxUpfs2”,“pid”:“8904266218468852”,“sid”:“UYgjreThrBcGTHaI”,“login_uid”:“0828121099”,“client_type”:“PC”,“site”:{“type”:“PC”,“url”:“https://xxx.com/h5Login/login_ctrip?sibling=T”,“ref”:"",“title”:“x程旅行-登录”,“keywords”:""},“device”:{“width”:1536,“height”:864,“os”:"",“pixelRatio”:1.25,“did”:""},“user”:{“tid”:"",“uid”:"",“vid”:""}}'进行加密得到
4. 很明显这里是Aes加密，ECB模式，key和iv贴上：
5. 观察发现它是其他body参数拼接而成，然后进行加密的，我们再看需要返回的值，哪些需要用到：
6. 接下来就是分析验证接口：captcha/v4/verify_jigsaw，先观察参数
7. 这里直接全部拿下来_0xb24c2dx(“0x128”)就行，它是不校验轨迹的，直接将滑动距离替换一下即可
8. 同样还是AES加密，这里说一下，怎样才算验证成功呢
9. 这里我们还是一样轨迹不用管，直接拿坐标替换一下自己得到的就可以
10. 2、登录：pwdLogin,接口：aHR0cHM6Ly9tLmN0cmlwLmNvbS9yZXN0YXBpL3NvYTIvMjIxNjAvcHdkTG9naW4=
11. 3、查询酒店：phantom-token之前的文章有说过怎么逆向，这个也差不多，跟着那个补环境就🆗了
12. 风控问题：设备ID问题，然后dimensions里面的参数随机，user-agent，IP随机

## 关键文字线索
- 概要整体架构流程技术名词解释小结
- 逆向：x程滑块、点选验证码+登录+phantom-token
- URL：aHR0cHM6Ly9hY2NvdW50cy5jdHJpcC5jb20vaDVMb2dpbi9sb2dpbl9jdHJpcD9zaWJsaW5nPVQ=
- 接口：aHR0cHM6Ly9pYy5jdHJpcC5jb20vY2FwdGNoYS92NC9yaXNrX2luc3BlY3Q=
- 1、验证码：携程v4，获取滑块图片接口-captcha/v4/risk_inspect
- 这里r = dimensions;_0x311148_(“0x72”) = '{“rt”:“fp=BAD79A-C7B9F1-28AE3E&vid=1741310313314.d34dAGplAZnm&pageId=153001&r=set_cookie_success&ip=14.216.139.115&rg=undefined&kpData=0_0_0&kpControl=0_0_0-0_0_0&kpEmp=0_0_0_0_0_0_0_0_0_0-0_0_0_0_0_0_0_0_0_0-0_0_0_0_0_0_0_0_0_0&screen=1536x864&tz=+8&blang=zh-CN&oslang=zh-CN&ua=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20JiSu)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F118.3.1.7%20Safari%2F537.36&d=xxx.com&v=25&kpg=0_4_0_0_13662_13_4_0_0_0&adblock=F&cck=T”,“ua”:“Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36”,“p”:“pc”,“fp”:“BAD79A-C7B9F1-28AE3E”,“vid”:“1741310313314.d34dAGplAZnm”,“sfp”:undefined,“identify”:“aBAD79A-C7B9F1-28AE3E”,“svid”:undefined,“guid”:“09031053217969500223”,“h5_duid”:null,“pc_duid”:null,“hb_uid”:null,“pc_uid”:null,“h5_uid”:null,“infosec_openid”:null,“device_id”:“824c80bc7d9f0ee6eb23287ae62996b8”,“client_id”:“NCsRIqkEaOup1BOYcp0PQ6COuJxUpfs2”,“pid”:“8904266218468852”,“sid”:“UYgjreThrBcGTHaI”,“login_uid”:“0828121099”,“client_type”:“PC”,“site”:{“type”:“PC”,“url”:“https://xxx.com/h5Login/login_ctrip?sibling=T”,“ref”:"",“title”:“x程旅行-登录”,“keywords”:""},“device”:{“width”:1536,“height”:864,“os”:"",“pixelRatio”:1.25,“did”:""},“user”:{“tid”:"",“uid”:"",“vid”:""}}'进行加密得到
- 很明显这里是Aes加密，ECB模式，key和iv贴上：
- 观察发现它是其他body参数拼接而成，然后进行加密的，我们再看需要返回的值，哪些需要用到：
- 接下来就是分析验证接口：captcha/v4/verify_jigsaw，先观察参数
- 这里直接全部拿下来_0xb24c2dx(“0x128”)就行，它是不校验轨迹的，直接将滑动距离替换一下即可
- 同样还是AES加密，这里说一下，怎样才算验证成功呢
- 如果返回NONE则表示验证成功，然后拿到token就可以了，返回JIGSAW表示验证失败，返回ICON表示验证成功，但是出现二次验证
- 继续分析当出现二次验证，点选验证码ICON应该怎么解决：
- 点选验证接口：captcha/v4/verify_icon
- 这里我们还是一样轨迹不用管，直接拿坐标替换一下自己得到的就可以
- 2、登录：pwdLogin,接口：aHR0cHM6Ly9tLmN0cmlwLmNvbS9yZXN0YXBpL3NvYTIvMjIxNjAvcHdkTG9naW4=
- 3、查询酒店：phantom-token之前的文章有说过怎么逆向，这个也差不多，跟着那个补环境就🆗了
- 风控问题：设备ID问题，然后dimensions里面的参数随机，user-agent，IP随机
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：获取滑块图片信息接口-逆向参数-验证滑块-风控-出现二次验证点选-验证点选

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/4422a558998e4778b9bd960cfdf3e508.png（上下文：一、滑块 二、点选）
- 图2：https://i-blog.csdnimg.cn/direct/c843f18848884ce68fd092f4d07483dc.png（上下文：一、滑块 二、点选）
- 图3：https://i-blog.csdnimg.cn/direct/03f6ea0ca80c417b99d01caca9b7b367.png（上下文：直接打开堆栈，在加密的地方进行断点，这里直接展示）
- 图4：https://i-blog.csdnimg.cn/direct/fefc83d33cb946218e1b2ec50351dda3.png（上下文：直接打开堆栈，在加密的地方进行断点，这里直接展示）
- 图5：https://i-blog.csdnimg.cn/direct/a7b9965a17b34036b742ba9ec9554054.png
- 图7：https://i-blog.csdnimg.cn/direct/5a789301c5a1413b80b0ef28c4999d49.png（上下文：最后就是分析我们的sign值：）
- 图8：https://i-blog.csdnimg.cn/direct/7a48470266574b1d8ee184ded25be336.png
- 图9：https://i-blog.csdnimg.cn/direct/a3d9f909334f4582a8e46c7fb62ce5fb.png（上下文：这里我们发现背景和滑块图片是base64的，所以我们解码：）
- 图11：https://i-blog.csdnimg.cn/direct/8386ded6227347a5b36112794a82d99e.png（上下文：这里还是一样堆栈断点：）
- 图12：https://i-blog.csdnimg.cn/direct/997a4c5fe2924c439813f7f7ae7fb9f3.png（上下文：这里还是一样堆栈断点：）
- 图13：https://i-blog.csdnimg.cn/direct/ef937e1bf4d54728abd8fc73bc15cc84.png（上下文：这里还是一样堆栈断点：）
- 图14：https://i-blog.csdnimg.cn/direct/a73042df74a9466cb6f63c94e6eb70dc.png

## 代码/算法线索
- 片段1：

```text
def encrypt_aes_hex_iv(plaintext): # 将十六进制格式的密钥和初始化向量转换为字节串 key = binascii.unhexlify('8f235bc1cac17a46530c616ff234be78') iv = binascii.unhexlify('69783956775867344e5853626b645431') # 创建AES加密对象，使用CBC模式 cipher = AES.new(key, AES.MODE_CBC, iv) # 对明文进行填充（因为AES加密要求数据长度是块大小的整数倍） padded_plaintext = pad(plaintext.encode('utf-8'), AES.block_size) # 进行加密 ciphertext = cipher.encrypt(padded_plaintext) # 将加密后的字节串转换为Base64编码的字符串 return binascii.b2a_base64(ciphertext).decode('utf-8') 运行项目并下
```
- 片段2：

```text
def encrypt_aes_hex_iv(plaintext): # 将十六进制格式的密钥和初始化向量转换为字节串 key = binascii.unhexlify('8f235bc1cac17a46530c616ff234be78') iv = binascii.unhexlify('69783956775867344e5853626b645431') # 创建AES加密对象，使用CBC模式 cipher = AES.new(key, AES.MODE_CBC, iv) # 对明文进行填充（因为AES加密要求数据长度是块大小的整数倍） padded_plaintext = pad(plaintext.encode('utf-8'), AES.block_size) # 进行加密 ciphertext = cipher.encrypt(padded_plaintext) # 将加密后的字节串转换为Base64编码的字符串 return binascii.b2a_base64(ciphertext).decode('utf-8')
```
- 片段3：

```text
jigsaw_image = base64.urlsafe_b64decode(response['result']['risk_info']['process_value']['jigsaw_image']) processed_image = base64.urlsafe_b64decode(response['result']['risk_info']['process_value']['processed_image']) 运行项目并下载源码python运行12
```
- 片段4：

```text
jigsaw_image = base64.urlsafe_b64decode(response['result']['risk_info']['process_value']['jigsaw_image']) processed_image = base64.urlsafe_b64decode(response['result']['risk_info']['process_value']['processed_image'])
```
- 片段5：

```text
import cv2,numpy as np # 获取滑块距离 def identify_gap(bg, tp): """ bg: 背景图片 tp: 缺口图片 out: 输出图片 """ # 读取背景图片和缺口图片 bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE) tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE) # 缺口图片 yy = [] xx = [] for y in range(tp_img.shape[0]): for x in range(tp_img.shape[1]): r = tp_img[y, x] if r < 200: yy.append(y) xx.append(x) tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)] # 识别图片边缘 bg_edge = cv2.Canny(bg_
```
- 片段6：

```text
import cv2,numpy as np # 获取滑块距离 def identify_gap(bg, tp): """ bg: 背景图片 tp: 缺口图片 out: 输出图片 """ # 读取背景图片和缺口图片 bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE) tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE) # 缺口图片 yy = [] xx = [] for y in range(tp_img.shape[0]): for x in range(tp_img.shape[1]): r = tp_img[y, x] if r < 200: yy.append(y) xx.append(x) tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)] # 识别图片边缘 bg_edge = cv2.Canny(bg_
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。