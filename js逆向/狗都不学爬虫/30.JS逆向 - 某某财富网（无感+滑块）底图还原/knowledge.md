# JS逆向 - 某某财富网（无感+滑块）底图还原

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/149216131
- 序号：30
- 标签：Cookie、滑块/验证码
- 页面信息：原创 已于 2025-07-09 10:44:05 修改 · 2.2k 阅读 · 13 · 17 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #python #爬虫 #网络爬虫 于 2025-07-09 10:40:02 首次发布 原创 已于 2025-07-09 10:44:05 修改 · 2.2k 阅读 · 13 · 17 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 某某财富网（无感+滑块）底图还原」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`cookie`

## 核心链路（提纯）
1. 逆向：JS逆向 - 某某财富网（无感+滑块）底图还原
2. 1、第一次会发送home/Login4的接口的HTML
3. 2、第二次输入账号后会发送api/captcha/get的接口，相当于初始化无感的
4. 请求载荷： ctxid:第一次接口拿到的hdMobCaptContextId request：变化的，需要逆向 _:时间戳
5. 响应内容: 没什么参数，后续不需要用到
6. 3、第三次点击验证会发送captcha/Validate接口进行无感验证
7. 请求载荷：request是需要逆向的
8. 4、第四次是无感验证成功后进行发送api/captcha/get接口
9. 请求载荷：与上次请求这个接口的请求载荷一致
10. 响应内容： 这里咱们响应拿到背景图片和按钮图片以及图片路径 提示：这里发送接口的时候得带上一个cookie值，不然就会出现文字验证码，带上之后便会一直出现滑块，qgqp_b_id参数
11. 5、第5次滑块验证会发送captcha/Validate接口：
12. 1、这里咱直接就分析验证滑块时的request参数，其他接口加密是一致的，只不过明文参数不一样而已，直接通过堆栈断点

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 某某财富网（无感+滑块）底图还原
- URL：aHR0cHM6Ly9wYXNzcG9ydDIuZWFzdG1vbmV5LmNvbS9wdWIvbG9naW4/YmFja3VybD1odHRwcyUzQSUyRiUyRnd3dy5lYXN0bW9uZXkuY29tJTJG
- 1、第一次会发送home/Login4的接口的HTML
- 2、第二次输入账号后会发送api/captcha/get的接口，相当于初始化无感的
- 请求载荷： ctxid:第一次接口拿到的hdMobCaptContextId request：变化的，需要逆向 _:时间戳
- 响应内容: 没什么参数，后续不需要用到
- 3、第三次点击验证会发送captcha/Validate接口进行无感验证
- 请求载荷：request是需要逆向的
- 4、第四次是无感验证成功后进行发送api/captcha/get接口
- 请求载荷：与上次请求这个接口的请求载荷一致
- 响应内容： 这里咱们响应拿到背景图片和按钮图片以及图片路径 提示：这里发送接口的时候得带上一个cookie值，不然就会出现文字验证码，带上之后便会一直出现滑块，qgqp_b_id参数
- 5、第5次滑块验证会发送captcha/Validate接口：
- 响应内容： 响应返回有validate则表明验证成功！！！
- 1、这里咱直接就分析验证滑块时的request参数，其他接口加密是一致的，只不过明文参数不一样而已，直接通过堆栈断点
- 2、这里说一下无感的轨迹可写死，滑块轨迹咱们可以收集一组完整浏览器轨迹，然后通过相似度进行计算，最后将距离替换上即可
- 识别不是很准，想识别准一点需要自己训练模型或者走接码平台
- 3、继续回到request加密的位置：a.base64Encode(a.encrypt(o))
- 4、说一下图片还原的位置：注意这里画布断点断不住，说明肯定还原的数组肯定是固定，肯定是js还原的
- 观察发现是通过片段进行位置排序组成em_cut_bg

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/2ab3d623099548329869dee6c0b6309b.png
- 图2：https://i-blog.csdnimg.cn/direct/ee75075a70a348808aab9f6b3c29df0d.png
- 图3：https://i-blog.csdnimg.cn/direct/72ca2d5d6b654b5cb101d394dcbe69a8.png（上下文：这里的CaptAppId、hdMobCaptContextId后面接口回用到）
- 图4：https://i-blog.csdnimg.cn/direct/52c4c58f75dd4a7c9d6dcdd50ffa4ecc.png（上下文：请求载荷： ctxid:第一次接口拿到的hdMobCaptContextId request：变化的，需要逆向 _:时间戳）
- 图5：https://i-blog.csdnimg.cn/direct/fe766eab3fd8416da42e989fef17c7df.png（上下文：响应内容: 没什么参数，后续不需要用到）
- 图6：https://i-blog.csdnimg.cn/direct/4df30477223f4117a8c579bab50182e7.png
- 图7：https://i-blog.csdnimg.cn/direct/b0baaaaebb244e1fb7214358044b65e3.png（上下文：响应内容：）
- 图8：https://i-blog.csdnimg.cn/direct/62c5d37eae45473fb62923fcb77ced79.png（上下文：请求载荷：与上次请求这个接口的请求载荷一致）
- 图9：https://i-blog.csdnimg.cn/direct/74292037070f4c8eadbcdc8190f27783.png（上下文：响应内容： 这里咱们响应拿到背景图片和按钮图片以及图片路径 提示：这里发送接口的时候得带上一个cookie值，不然就会出现文字验证码，带上之后便会一直出现滑块，qgqp_b_id参数）
- 图10：https://i-blog.csdnimg.cn/direct/d23c3bc6ebdb4dd88efd5b16aa783237.png（上下文：响应内容： 这里咱们响应拿到背景图片和按钮图片以及图片路径 提示：这里发送接口的时候得带上一个cookie值，不然就会出现文字验证码，带上之后便会一直出现滑块，qgqp_b_id参数）
- 图11：https://i-blog.csdnimg.cn/direct/fcd2d48f20a642ce8e2ad59b557b8c4e.png（上下文：请求载荷：）
- 图12：https://i-blog.csdnimg.cn/direct/f19b6fa0e7f4425f80b6ea9f518b34e5.png（上下文：响应内容： 响应返回有validate则表明验证成功！！！）

## 代码/算法线索
- 片段1：

```text
//滑块距离 import ddddocr det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False) gay = det.slide_match(open('./背景图片.jpg','rb').read(),open('./按钮图片.png','rb').read(),simple_target=True)['target'][0] AI写代码python运行1234
```
- 片段2：

```text
//滑块距离 import ddddocr det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False) gay = det.slide_match(open('./背景图片.jpg','rb').read(),open('./按钮图片.png','rb').read(),simple_target=True)['target'][0]
```
- 片段3：

```text
//滑块轨迹模拟 def guiji(distance): trackList = 完整轨迹（包含x,y,t） # 检查value是否在轨迹的x值中 for trajectory in trackList: if int(trajectory['x']) == distance: # 如果找到，截取从轨迹开始到该点的子数组 return [t for t in trackList if int(t['x']) <= distance] # 如果value不在x值中，找到最接近value的x值 closest_x = None min_diff = float('inf') for trajectory in trackList: if abs(int(trajectory['x']) - distance) < min_diff: min_diff = abs(int(trajectory['x']) - distance) closest_x = int(trajectory['x']) # 截取从轨迹开始到最接近的x值的子数组 result 
```
- 片段4：

```text
//滑块轨迹模拟 def guiji(distance): trackList = 完整轨迹（包含x,y,t） # 检查value是否在轨迹的x值中 for trajectory in trackList: if int(trajectory['x']) == distance: # 如果找到，截取从轨迹开始到该点的子数组 return [t for t in trackList if int(t['x']) <= distance] # 如果value不在x值中，找到最接近value的x值 closest_x = None min_diff = float('inf') for trajectory in trackList: if abs(int(trajectory['x']) - distance) < min_diff: min_diff = abs(int(trajectory['x']) - distance) closest_x = int(trajectory['x']) # 截取从轨迹开始到最接近的x值的子数组 result 
```
- 片段5：

```text
encrypt = function (n) { var e, t = "e98ae8878c264a7e"; function r(n) { if (/^[\x00-\x7f]*$/.test(n)) return n; for (var e = [], t = n.length, r = 0, i = 0; r < t; ++r, ++i) { var o = n.charCodeAt(r); if (o < 128) e[i] = n.charAt(r); else if (o < 2048) e[i] = String.fromCharCode(192 | o >> 6, 128 | 63 & o); else { if (!(o < 55296 || o > 57343)) { if (r + 1 < t) { var a = n.charCodeAt(r + 1); if (o < 56320 && 56320 <= a && a <= 57343) { var s = 65536 + ((1023 & o) << 10 | 1023
```
- 片段6：

```text
encrypt = function (n) { var e, t = "e98ae8878c264a7e"; function r(n) { if (/^[\x00-\x7f]*$/.test(n)) return n; for (var e = [], t = n.length, r = 0, i = 0; r < t; ++r, ++i) { var o = n.charCodeAt(r); if (o < 128) e[i] = n.charAt(r); else if (o < 2048) e[i] = String.fromCharCode(192 | o >> 6, 128 | 63 & o); else { if (!(o < 55296 || o > 57343)) { if (r + 1 < t) { var a = n.charCodeAt(r + 1); if (o < 56320 && 56320 <= a && a <= 57343) { var s = 65536 + ((1023 & o) << 10 | 1023
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。