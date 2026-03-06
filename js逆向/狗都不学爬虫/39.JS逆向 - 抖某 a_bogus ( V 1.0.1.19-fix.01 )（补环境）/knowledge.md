# JS逆向 - 抖某 a_bogus (/* V 1.0.1.19-fix.01 */)（补环境）

- 原文链接：https://blog.csdn.net/qq_53444631/article/details/147816393
- 序号：39
- 标签：补环境、签名参数、滑块/验证码
- 页面信息：原创 已于 2025-05-09 16:46:10 修改 · 3.4k 阅读 · 7 · 17 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。 文章标签： #爬虫 #网络爬虫 于 2025-05-09 11:44:37 首次发布 原创 已于 2025-05-09 16:46:10 修改 · 3.4k 阅读 · 7 · 17 · CC 4.0 BY-SA版权 版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

## 章节结构
- 文章目录
- 概要
- 整体架构流程
- 技术名词解释
- 技术细节
- 小结

## 逆向目标
- 目标围绕「JS逆向 - 抖某 a_bogus (/* V 1.0.1.19-fix.01 */)（补环境）」展开，重点定位请求关键参数/校验链路并复现。
- 涉及关键字段：`a_bogus`、`DOMTokenList`

## 核心链路（提纯）
1. 逆向：JS逆向 - 抖某 a_bogus (/* V 1.0.1.19-fix.01 */)（补环境）
2. 调用参考大佬-代码敲得好外卖送到老的文章：搜索var m = n.apply(d, e);v[++p] = m中间插入
3. 提示：全扣补环境
4. 1、找到bdms文件全扣，初始化
5. 2、分析入口-断点 3、找加载位置—xhr 4、插装 5、调值

## 关键文字线索
- 概要整体架构流程技术名词解释技术细节小结
- 逆向：JS逆向 - 抖某 a_bogus (/* V 1.0.1.19-fix.01 */)（补环境）
- URL:aHR0cHM6Ly93d3cuZG91eWluLmNvbS8/cmVjb21tZW5kPTE=
- 目标：二级评论中a_bogus
- 参考文章：aHR0cHM6Ly9qdWVqaW4uY24vcG9zdC83NDQ3Nzk3MDAzMDUwOTU4ODg0
- 调用参考大佬-代码敲得好外卖送到老的文章：搜索var m = n.apply(d, e);v[++p] = m中间插入
- window不存在的属性 require_ = require; process_ = process; delete global; delete Buffer; delete process; delete require; delete module; delete exports; delete __filename; delete __dirname;
- dom中的span的classList的原型DOMTokenList，以及all
- Symbol.toStringTag
- XMLHttpRequest/Image补充
- navigator.storage的estimate补充
- window、globalThis下的属性及方法
- 提示：仅供学习，不得用做商业交易，如有侵权请及时联系
- 1、找到bdms文件全扣，初始化
- 2、分析入口-断点 3、找加载位置—xhr 4、插装 5、调值
- 提示：学习交流群+v主页（+知识星球交流学习）

## 关键图片线索
- 图2：https://i-blog.csdnimg.cn/direct/98b93a0ae77942ca905c1c31e55471cf.png（上下文：2、分析入口-断点 3、找加载位置—xhr 4、插装 5、调值）
- 图3：https://i-blog.csdnimg.cn/direct/aba258c151f94976ae3f3d107ae17814.png（上下文：2、分析入口-断点 3、找加载位置—xhr 4、插装 5、调值）
- 图4：https://i-blog.csdnimg.cn/direct/129049045af74c97afd66ef9e6c49615.png（上下文：2、分析入口-断点 3、找加载位置—xhr 4、插装 5、调值）
- 图5：https://i-blog.csdnimg.cn/direct/79edc63968e44c50b5c6ab54922c1c00.png（上下文：2、分析入口-断点 3、找加载位置—xhr 4、插装 5、调值）
- 图6：https://i-blog.csdnimg.cn/direct/6079303f7b0e42609733221a68277821.png（上下文：2、分析入口-断点 3、找加载位置—xhr 4、插装 5、调值）
- 图7：https://i-blog.csdnimg.cn/direct/d5146dea85f848eba26cc6a08c842055.png
- 图9：https://i-blog.csdnimg.cn/direct/0156559d058a4774972897c18c8b02c8.png（上下文：提示：结果）

## 代码/算法线索
- 片段1：

```text
t = { "aid": 6383, "pageId": 6241, "paths": [ "^/webcast/", "^/aweme/v1/", "^/aweme/v2/", "/v1/message/send", "^/live/", "^/captcha/", "^/ecom/" ], "boe": false, "ddrt": 8.5, "ic": 8.5 } window.bdms.init(t); AI写代码javascript运行1234567891011121314151617
```
- 片段2：

```text
t = { "aid": 6383, "pageId": 6241, "paths": [ "^/webcast/", "^/aweme/v1/", "^/aweme/v2/", "/v1/message/send", "^/live/", "^/captcha/", "^/ecom/" ], "boe": false, "ddrt": 8.5, "ic": 8.5 } window.bdms.init(t);
```
- 片段3：

```text
if (e.length == 2 && e[0] === 'a_bogus') { window.a_bogus = e[1]; } AI写代码javascript运行123
```
- 片段4：

```text
if (e.length == 2 && e[0] === 'a_bogus') { window.a_bogus = e[1]; }
```
- 片段5：

```text
Promise2 = { then: function () { return this; }, catch: function (){}, }; storage = { estimate: function estimate() { return Promise2 }, }; AI写代码javascript运行1234567891011
```
- 片段6：

```text
Promise2 = { then: function () { return this; }, catch: function (){}, }; storage = { estimate: function estimate() { return Promise2 }, };
```

## 复现建议
1. 把核心生成函数最小化抽离，保留入参与返回值一致性。
2. 对环境依赖（window/document/navigator/crypto/wasm）做补齐或代理。
3. 用固定测试向量做回归，确保每次输出符合预期。