# [ Web逆向 ] 某老板直聘四层switch反混淆

## 原文链接
- https://www.52pojie.cn/thread-2073419-1-1.html

## 逆向目标
- 将js文件复制出来就可以看到整个混淆过后的js代码了。初步分析整个代码，选每一层的第一个switch和第一个case展开后开始分析,最内层的case代码运行后会一层一层的break返回最外层，而不会在中间的某一层停留，同样的如果最内层有return，那么也会一层一层的返回到最外层，而不会在中间层处理。

## 关键流程
1. 老板直聘作为另一类型的多层switch混淆的代表还是很有研究价值的，主要的特点就是switch起始index是不固定的，是调用的时候传参确定的，传不同的index，那么就运行不同的代码。
2. 先上链接：aHR0cHM6Ly93d3cuemhpcGluLmNvbS93dWhhbi8/a2E9Y2l0eS1zaXRlcy0xMDEyMDAxMDA=，这个站chrome是抓不到包的，需要用fiddler抓包，先开启fiddler,然后打开网页直接找security-check.html这里是调用ABC生成cookie __zp_stoken__的地方，先用fidder替换掉这个文件，然后在调用处加上debugger。
3. 将js文件复制出来就可以看到整个混淆过后的js代码了。初步分析整个代码，选每一层的第一个switch和第一个case展开后开始分析,最内层的case代码运行后会一层一层的break返回最外层，而不会在中间的某一层停留，同样的如果最内层有return，那么也会一层一层的返回到最外层，而不会在中间层处理。
4. 那么可以认定整个switch由最外层的参数控制，可以将整个switch处理成只有最外层参数的一层switch.
5. 根据映射结果将switch还原为一个switch.
6. 删掉插入的代码，并将switch还原成顺序代码。
7. 这只是还原了部分代码，后面还有一个函数也是同样的结构，当然也可以用同样的方法还原，需要注意的是后面函数的部分case index的值是在函数的call中的，只单纯收集函数内case index的值是不够的。
8. 将函数内的swtich还原成一层switch后代码是没法运行的，替换原网页的代码后也会报错，原因也很简单，原来的多层switch将变量隔离的，当还原后变量的作用域提升了，导致变量污染。
9. 当然解决这个问题也很简单，这样的多入口的switch本质是将多个函数融合在了一个函数中，然后用多层的switch将变量隔离开，要彻底还原这个switch只需要以每个入口的index作为起始值，用ast将switch遍历一遍，把每个经过的case取出来然后生成一个新的函数就可以了。

## 关键图片线索
1. https://attach.52pojie.cn/forum/202511/17/094752p777hhzhj3wnp77q.png
2. https://attach.52pojie.cn/forum/202511/17/094851vw4rppsxxbp34y8i.png
3. https://attach.52pojie.cn/forum/202511/17/094928fmctxeatp76jxep6.png
4. https://attach.52pojie.cn/forum/202511/17/094948qlpq4sqj4s9pj40o.png
5. https://attach.52pojie.cn/forum/202511/17/095128fw1l74k4x4f4w9xy.png
6. https://attach.52pojie.cn/forum/202511/17/095309ezn5t5mzhpzn0wh5.png
7. https://attach.52pojie.cn/forum/202511/17/095023irdllr9hhhu0tq27.png
8. https://attach.52pojie.cn/forum/202511/17/095401cniis4jij7s7chww.png
9. https://attach.52pojie.cn/forum/202511/17/095444qi6easw68556556l.png
10. https://attach.52pojie.cn/forum/202511/17/095513rp2izsnj00ttj12o.png
11. https://attach.52pojie.cn/forum/202511/17/095608o2b0u90usczuvsu0.png
12. https://attach.52pojie.cn/forum/202511/17/095630n55y2mg525qo3gon.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 优先把混淆代码做 AST 预处理（格式化、常量折叠、控制流平坦化还原）后再定位核心函数。
- 对关键节点做自动化遍历与替换，保持可重复构建（parse/traverse/generate 流程）。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- 这只是还原了部分代码，后面还有一个函数也是同样的结构，当然也可以用同样的方法还原，需要注意的是后面函数的部分case index的值是在函数的call中的，只单纯收集函数内case index的值是不够的。
- 将函数内的swtich还原成一层switch后代码是没法运行的，替换原网页的代码后也会报错，原因也很简单，原来的多层switch将变量隔离的，当还原后变量的作用域提升了，导致变量污染。
- 页面代码经常按版本变动，先比对 bundle/hash 再复用旧脚本。
- 不要只看单个接口参数，很多校验依赖多请求之间的字段关联（如 requestId、token、nonce）。
- 浏览器环境与 Node 环境差异会导致结果不一致，必要时补齐 window/document/navigator/crypto。
- 截图中的中间变量名称可能已混淆，建议以调用关系和数据流而非变量名为准。

## 主贴关键摘录
- 老板直聘作为另一类型的多层switch混淆的代表还是很有研究价值的，主要的特点就是switch起始index是不固定的，是调用的时候传参确定的，传不同的index，那么就运行不同的代码。
- 先上链接：aHR0cHM6Ly93d3cuemhpcGluLmNvbS93dWhhbi8/a2E9Y2l0eS1zaXRlcy0xMDEyMDAxMDA=，这个站chrome是抓不到包的，需要用fiddler抓包，先开启fiddler,然后打开网页直接找security-check.html这里是调用ABC生成cookie __zp_stoken__的地方，先用fidder替换掉这个文件，然后在调用处加上debugger。
- 屏幕截图 2025-11-15 133131.png
- (44.24 KB, 下载次数: 1)
- 下载附件
- 2025-11-17 09:47 上传
- 接着要找的第二个文件就是security-js文件夹下的js文件。后面的js文件名是一个随机的字符串，每天会变。
- 屏幕截图 2025-11-15 133332.png
- (6.99 KB, 下载次数: 1)
- 2025-11-17 09:48 上传

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
