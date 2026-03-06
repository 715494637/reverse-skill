# [ Web逆向 ] 某验3AST分析及实现

## 原文链接
- https://www.52pojie.cn/thread-2055730-1-1.html

## 逆向目标
- 某验系列一直是经典案例，很多大佬做逆向分析教程，做一期ast教程辅助分析。

## 关键流程
1. 本文章中所有内容仅供学习交流使用，不用于其他任何目的，不提供完整代码，抓包内容、敏感网址、数据接口等均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关.本文章未经许可禁止转载，禁止任何修改后二次传播，擅自使用本文讲解的技术而导致的任何意外，作者均不负责
2. 某验系列一直是经典案例，很多大佬做逆向分析教程，做一期ast教程辅助分析。
3. 在线ast解析：
4. https://astexplorer.net/
5. 解混淆文件：fullpage.9.2.0-guwyxh.js 和 slide.7.9.3.js
6. let code = generator(ast).code;
7. fs.writeFileSync("./解混淆后.js", code)
8. 整体来说就两个部分，定义了一个对象Vwtrj，同时设置了Vwtrj的一些函数方法，接着就是核心逻辑是一个大的自执行函数。很有可能是通过前面定义的对象和函数来进行混淆，我们一次对四个函数方法进行检索，看看是怎么使用的来进行混淆。
9. 可以从搜索结果看出来，前两个函数是用来实现两个函数，后面两个函数应该是混淆的核心。所以我们有了第一部的思路，将前面的对象和函数存进内存，方便直接调用。
10. 然后最熟悉的就是编码的混淆，很多教程也是从编码直接搜索w入手
11. 第二步就是来处理这些编码，接下来就是分析第三步的逻辑。既然前面的函数有调用，就要分析怎么实现混淆，怎么去还原，先随便找一组调用分析一下逻辑。
12. 是$_CJDb = Vwtrj.$_CV，$_CJET = Vwtrj.$_CV，所以这应该是我们最后解混淆出来的结果，然后我们搜一下这些最后的结果是怎么被调用的

## 关键图片线索
1. https://attach.52pojie.cn/forum/202508/25/153333chif55vx5c5kyotf.png
2. https://attach.52pojie.cn/forum/202508/25/153401jx9vfravyrucrvc9.png
3. https://attach.52pojie.cn/forum/202508/25/153427f1tq2zbrts2b4phh.png
4. https://attach.52pojie.cn/forum/202508/25/153458lziwtfa722h2xaer.png
5. https://attach.52pojie.cn/forum/202508/25/153527f9xopvsrsv3l4vir.png
6. https://attach.52pojie.cn/forum/202508/25/153606do7vbhedkbzke0po.png
7. https://attach.52pojie.cn/forum/202508/25/153640mao3xx81x8qq0c1o.png
8. https://attach.52pojie.cn/forum/202508/25/153831crfgru0lffyqrzu6.png
9. https://attach.52pojie.cn/forum/202508/25/153918svedpkqtqbfqvvuz.png
10. https://attach.52pojie.cn/forum/202508/25/153951qivpuhxpv1tk1pr2.png
11. https://attach.52pojie.cn/forum/202508/25/154059yn9682zxur7cstus.png
12. https://attach.52pojie.cn/forum/202508/25/154200fvlknwffovvs7wzf.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 如果模板文件运行有报错就安装环境，缺啥补啥
- 可以看到所有的控制流代码丢在case里面，我们需要一个数组，依次将他们取出来，并按照顺序存储，有一点需要注意，case中有一个固定的beark方法，需要利用切片处理一下
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 本帖最后由 buluo533 于 2025-8-26 08:34 编辑
- 本文章中所有内容仅供学习交流使用，不用于其他任何目的，不提供完整代码，抓包内容、敏感网址、数据接口等均已做脱敏处理，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关.本文章未经许可禁止转载，禁止任何修改后二次传播，擅自使用本文讲解的技术而导致的任何意外，作者均不负责
- 某验系列一直是经典案例，很多大佬做逆向分析教程，做一期ast教程辅助分析。
- 工具站：
- batel中文文档：
- https://babel.nodejs.cn/docs/babel-core/
- 在线ast解析：
- https://astexplorer.net/
- demo站点：
- https://demos.geetest.com/slide-float.html

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
