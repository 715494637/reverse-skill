# JS逆向 - 某住会同盾blackbox纯算分析

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/157980479
- 序号：1
- 标签：补环境、签名参数、指纹
- 页面信息：最新推荐文章于 2026-03-04 22:44:41 发布 原创 于 2026-02-11 23:31:48 发布 · 1.2k 阅读 · 10 · 7 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #javascript #网络爬虫 #爬虫 #python 原创 于 2026-02-11 23:31:48 发布 · 1.2k 阅读 · 10 · 7 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 某住会同盾blackbox纯算分析」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`blackbox`、`black_box`、`functiongetParameter`、`N1nyPKdX-1770822894576-9619e57598bdf692669836`、`SM4`、`key`

## 核心链路（提纯）
1. 逆向：JS逆向 - 某住会同盾blackbox纯算分析
2. 1、全局搜索black_box
3. 最后生成的位置，直接在此处下断点，然后往上跟一个站、
4. 所以我们需要找到t（全局搜索）是怎么来的，而v这里你多刷几次会知道是一个固定的值（版本）
5. 2、 这里有一堆参数，都是需要逆向分析的，直接通过断脚本，找到加载的位置
6. 3、初始化加载之后，继续往下跟栈
7. 4、跟到这里面，就是生成profile.json发包的那些参数了（可以AST代码还原代码，然后替换代码）
8. 可以看到fp文件也是动态的所以，我们也需要替换
9. 5、替换之后我们找到上面分析的那个位置进行断点
10. 6、这里我就不一步步跟着去分析了，直接上插装
11. 使用的是魔改的SM4加密,CBC模式
12. 指纹数组里面的32位字符串，其实是浏览器指纹进行Fingerprint2.x64hash128加密

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 某住会同盾blackbox纯算分析
- URL：aHR0cHM6Ly9zaWduaW4uaHdvcmxkLmNvbS9sb2dpbj9yZWRpcmVjdFVybD1odHRwcyUzQSUyRiUyRnd3dy5od29ybGQuY29tJTJG
- 1、全局搜索black_box
- 最后生成的位置，直接在此处下断点，然后往上跟一个站、
- Q0OoO()这个函数就是生成blackbox的位置，我们进去看一下return的情况
- 所以我们需要找到t（全局搜索）是怎么来的，而v这里你多刷几次会知道是一个固定的值（版本）
- 2、 这里有一堆参数，都是需要逆向分析的，直接通过断脚本，找到加载的位置
- 3、初始化加载之后，继续往下跟栈
- 4、跟到这里面，就是生成profile.json发包的那些参数了（可以AST代码还原代码，然后替换代码）
- 可以看到fp文件也是动态的所以，我们也需要替换
- 5、替换之后我们找到上面分析的那个位置进行断点
- 6、这里我就不一步步跟着去分析了，直接上插装
- 使用的是魔改的SM4加密,CBC模式
- 默认发IV值是：1234567812345678
- key是指纹里面的idf.substring(0, 16)
- 指纹数组里面的32位字符串，其实是浏览器指纹进行Fingerprint2.x64hash128加密
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 提示：分析参数及加密位置
- 这里我们看到QQoO0是有一个全局对象，ubid是一个时间戳+随机字符串,继续往下看

## 关键图片线索
- 图1：https://i-blog.csdnimg.cn/direct/1cdec06063cf4b2ba583832bb701057d.png
- 图2：https://i-blog.csdnimg.cn/direct/b3115dfee25c4e11aa2ccb163f5bbbda.png
- 图3：https://i-blog.csdnimg.cn/direct/9f7bc364b4044506b3ab9d73a8cab38e.png
- 图4：https://i-blog.csdnimg.cn/direct/aa50c96cad214cc8b3f9e0552ceb1079.png
- 图5：https://i-blog.csdnimg.cn/direct/2ecd0a8118d74007b778b51102ae6b8d.png
- 图6：https://i-blog.csdnimg.cn/direct/f890f3be119c45a88b2979fe56d8d318.png
- 图7：https://i-blog.csdnimg.cn/direct/41b289034a0f4b23a5c9f2c89d922af2.png
- 图8：https://i-blog.csdnimg.cn/direct/b918a733856a41308495b9cb1ee73bbe.png
- 图9：https://i-blog.csdnimg.cn/direct/60d2a0f05e3f4ea7885fce1632618ab4.png（上下文：这里我们看到QQoO0是有一个全局对象，ubid是一个时间戳+随机字符串,继续往下看）
- 图10：https://i-blog.csdnimg.cn/direct/3c96a39d94d14fcab9d7805d00911ba3.png（上下文：这里我们看到QQoO0是有一个全局对象，ubid是一个时间戳+随机字符串,继续往下看）
- 图11：https://i-blog.csdnimg.cn/direct/db152bc6eb0a4dd1be5b2d52fb1182a8.png（上下文：首先找到fm.js）
- 图12：https://i-blog.csdnimg.cn/direct/7e80a5c5ad3e462b83ddd138edd88f84.png（上下文：首先找到fm.js）

## 代码/算法线索
- 片段1：

```text
fm.js?ver=0.2&t=491895:3835 zhiw数组： 738 fm.js?ver=0.2&t=491895:3835 zhiw数组： 1536 fm.js?ver=0.2&t=491895:3835 zhiw数组： 11110 fm.js?ver=0.2&t=491895:3835 zhiw数组： 864 fm.js?ver=0.2&t=491895:3835 zhiw数组： 295 fm.js?ver=0.2&t=491895:3835 zhiw数组： 824 fm.js?ver=0.2&t=491895:3835 zhiw数组： d3a9f77bed605f4a9e2a782955b65f1a fm.js?ver=0.2&t=491895:3835 zhiw数组： zh-CN,zh fm.js?ver=0.2&t=491895:3835 zhiw数组： 1 fm.js?ver=0.2&t=491895:3835 zhiw数组： Google Inc. (Intel)-&-ANGLE (Intel, Intel(R) UHD 
```
- 片段2：

```text
fm.js?ver=0.2&t=491895:3835 zhiw数组： 738 fm.js?ver=0.2&t=491895:3835 zhiw数组： 1536 fm.js?ver=0.2&t=491895:3835 zhiw数组： 11110 fm.js?ver=0.2&t=491895:3835 zhiw数组： 864 fm.js?ver=0.2&t=491895:3835 zhiw数组： 295 fm.js?ver=0.2&t=491895:3835 zhiw数组： 824 fm.js?ver=0.2&t=491895:3835 zhiw数组： d3a9f77bed605f4a9e2a782955b65f1a fm.js?ver=0.2&t=491895:3835 zhiw数组： zh-CN,zh fm.js?ver=0.2&t=491895:3835 zhiw数组： 1 fm.js?ver=0.2&t=491895:3835 zhiw数组： Google Inc. (Intel)-&-ANGLE (Intel, Intel(R) UHD 
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。