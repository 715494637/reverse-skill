# JS逆向 - 丁丁（新版某里 **_rand** 参数） 补环境

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/151749790
- 序号：13
- 标签：补环境、滑块/验证码
- 页面信息：原创 已于 2025-09-16 10:33:57 修改 · 2k 阅读 · 6 · 13 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #网络爬虫 #爬虫 #javascript #wasm #python 于 2025-09-16 10:27:32 首次发布 原创 已于 2025-09-16 10:33:57 修改 · 2k 阅读 · 6 · 13 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 丁丁（新版某里 **_rand** 参数） 补环境」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：需结合正文定位。

## 核心链路（提纯）
1. 逆向：JS逆向 - 丁丁（新版某里 _rand 参数） 补环境
2. 1、搜索关键字：_rand
3. 2、从这里直接观察到，是由window.crypto.genRandomValues函数加密生成，但是我们知道下面这俩个函数是非常像的，一个的crypto自带的，另外一个是新增的函数
4. 3、直接在刚刚搜索那个地方下断点，然后滑动滑块断住：
5. 4、接下来就是全部复制，然后补环境了！！！
6. 这里我只说几个插装点，对照插装吐出来的东西，自己去补吧
7. 提示：分析_rand的加密位置
8. 提示：补环境

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 丁丁（新版某里 _rand 参数） 补环境
- URL：aHR0cHM6Ly9sb2dpbi5kaW5ndGFsay5jb20vb2F1dGgyL3NlbmRfdmVyaWZ5X2NvZGU=
- 1、搜索关键字：_rand
- 2、从这里直接观察到，是由window.crypto.genRandomValues函数加密生成，但是我们知道下面这俩个函数是非常像的，一个的crypto自带的，另外一个是新增的函数
- 3、直接在刚刚搜索那个地方下断点，然后滑动滑块断住：
- 4、接下来就是全部复制，然后补环境了！！！
- 这里我只说几个插装点，对照插装吐出来的东西，自己去补吧
- 不用我多说了吧，这里是描述符！！！直接看结果
- 这里轨迹有点拉跨，成功率有点拉；轨迹我都是找SH哥要的，等他更新吧！！！
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：分析_rand的加密位置
- 提示：如果不带上这个_rand是过不了的，返回九宫格
- 提示：学习交流主页，星球持续更新中：（＋星球主页+v）

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/952cdb8b7e0b4c3893347aae95314674.png
- 图2：https://i-blog.csdnimg.cn/direct/17bf6da1ba8449fc9fcc0186619f9abd.png
- 图3：https://i-blog.csdnimg.cn/direct/c17c90e829ba40c9acc654922958fb5a.png
- 图4：https://i-blog.csdnimg.cn/direct/3a89f4b3cce54c3f87705f75b074462e.png
- 图5：https://i-blog.csdnimg.cn/direct/10ea22af21da464489765eae8a3e80f7.png
- 图6：https://i-blog.csdnimg.cn/direct/cfb403b88bb64726a61ef7cf4c093b7c.png
- 图7：https://i-blog.csdnimg.cn/direct/4bc8b55490024e7bbcb578787f1cd6e7.png（上下文：日志：）
- 图8：https://i-blog.csdnimg.cn/direct/89208dcac27e4c6f9ff12c9ef8be3769.png
- 图9：https://i-blog.csdnimg.cn/direct/8ad452b39af34042a355520eacdd6c2a.png
- 图10：https://i-blog.csdnimg.cn/direct/7675083a2fe04ea79b489632ddeddf9d.png（上下文：提示：py调用）

## 代码/算法线索
- 片段1：

```text
function te(r, n) { // dtavm.log('ju::',ju,'r::',r,'n::',n+'') return (0, ju[r])(n) } 运行项目并下载源码javascript运行12345
```
- 片段2：

```text
function te(r, n) { // dtavm.log('ju::',ju,'r::',r,'n::',n+'') return (0, ju[r])(n) }
```
- 片段3：

```text
function Zf(r) { for (var n, f = ""; 0 !== (n = Ce[r++]); ) f += pu(n); // dtavm.log('strc::',f) return f } 运行项目并下载源码javascript运行123456
```
- 片段4：

```text
function Zf(r) { for (var n, f = ""; 0 !== (n = Ce[r++]); ) f += pu(n); // dtavm.log('strc::',f) return f }
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。