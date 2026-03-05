# 【JS 逆向百例】WebSocket 协议爬虫，智慧树扫码登录案例分析

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500522&idx=1&sn=33e47d80bdda5213d4b278716fc1052f&chksm=c1e26400f695ed16b77d070184e9de8555feeb6cd1cd3d9319ca1ecbbfeb3014df6a94714d11#rd
- 发布信息：2021年12月7日 17:00 | 作者：K哥爬虫

## 一、问题画像
主页：aHR0cHM6Ly9wYXNzcG9ydC56aGlodWlzaHUuY29tL2xvZ2luI3FyQ29kZUxvZ2lu

## 二、关键文字要点
- 要点1：WebSocket 协议简称为 WS 或者 WSS（WebSocket Secure），其发送请求的 URL 以 ws:// 或者 wss:// 开头，WSS 是 WS 的加密版本，类似于 HTTP 与 HTTPS。
- 要点2：其中有一些比较特别的参数，是 HTTP/ HTTPS 请求中没有的：
- 要点3：Upgrade: websocket：表明这是 WebSocket 类型请求；
- 要点4：Sec-WebSocket-Key：是 WebSocket 客户端发送的一个 base64 编码的密文，是浏览器随机生成的，要求服务端必须返回一个对应加密的 Sec-WebSocket-Accept 应答，否则客户端会抛出 Error during WebSocket handshake 错误，并关闭连接。
- 要点5：在 Python 中应该如何实现 WebSocket 请求？
- 要点6：首先解决第一个问题，客户端发送的那串字符串是怎么来的，这里寻找加密字符串的方式和 HTTP/HTTPS 请求是一样的，在本例中，我们可以直接搜索这个字符串，发现是通过一个接口传过来的，其中 img 就是二维码图片的 base64 值，qrToken 就是客户端发送的那串字符串，如下图所示：

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LSlgcyicchwNsADGJ0Gf9jUAibRKFnwoibGdYrfuTIuxgsPfWRpBOOAcZicY1rqia13ZUetbWoA297Xag/640?wx_fmt=png
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Is3egGia2o5mClhyic3hicMHq9tULt2B8lKLU2g5WiaAvA9XBvF0X1ciaPtmITnN64vbBRcAERS11U2vw/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Is3egGia2o5mClhyic3hicMHq3nvyWxbKZ2VnFAPibjzRsrcstP7ABbrW0yl8P4dic8LKYQrT1wGb4RSg/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Is3egGia2o5mClhyic3hicMHqFntdF3QTo3Fr8YTic5A3OooVicyLXcia0OmVh6MZmTWib5Ua7uQUGoZhZg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Is3egGia2o5mClhyic3hicMHqrVXGHoxgtoIMSJXq0pMSxu7rXkjAu6rzx4aFxnCGvdicoyE4TUfqVgQ/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4Is3egGia2o5mClhyic3hicMHqv4Fywy9pGQVo0eavICkBpACwbMSy0ecXe8eumIkaODd679lzKgh8FQ/640?wx_fmt=png

## 四、精华技能
- 技能定位：WebSocket + Cookie/Token + 协议分析
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- Sec-WebSocket-Key：是 WebSocket 客户端发送的一个 base64 编码的密文，是浏览器随机生成的，要求服务端必须返回一个对应加密的 Sec-WebSocket-Accept 应答，否则客户端会抛出 Error du...
- 这里需要注意的是，并不是所有的 WebSocket 请求都是如此的简单的，有的客户端发送的数据是 Binary Message（二进制数据）、或者更复杂的加密参数，直接搜索无法获取，针对这种情况，我们也有解决方法：

## 七、迁移关键词
- WebSocket
- Cookie/Token
- 协议分析
