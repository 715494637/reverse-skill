# 20. [Web逆向] 【JS逆向】某Q音乐VMP纯算

## 原文链接
https://www.52pojie.cn/thread-1983577-1-1.html

## 逆向目标
逆向目标

## 关键流程
- 目标：歌曲列表查询参数sign
- 抓包分析
- 直接在搜索框中搜索某个歌手，会发送一个请求，其中查询参数sign就是我们要逆向的参数。
- 首先要找到参数生成的位置，我一般的做法是，能搜索就搜索，能hook就hook，实在不行再跟栈。
- 那就直接全局搜索sign，在某个文件中有三个可疑的地方，把断点都打上，重新发请求（一定要确保请求发出去，不然你会以为不是在这几个断点中生成的），成功断住。
- 我们要知道的就是i的生成逻辑，调用o函数，传入了请求体。
- 直接开搞，跟进去，一进去就是一个大的for循环，经常搞VMP的朋友知道，这大概率就是一个VMP了。
- 搞VMP的一般做法：
- 将代码拿下来，补足里面缺失的环境，生成关键参数
- 直接插桩，通过插桩日志分析参数生成的过程

## 关键图片线索
- 图1: https://attach.52pojie.cn/forum/202411/19/201823gw11x38xdfngf33n.png
- 图2: https://attach.52pojie.cn/forum/202411/19/201825ggaosomxy3mcp2cu.png
- 图3: https://attach.52pojie.cn/forum/202411/19/201827fsjht787pshenkep.png
- 图4: https://attach.52pojie.cn/forum/202411/19/201829d5jgztj5g7zbeke5.png
- 图5: https://attach.52pojie.cn/forum/202411/19/201831gbfoo8b8esltzfme.png
- 图6: https://attach.52pojie.cn/forum/202411/19/201833sffm5auqtlzn5i6z.png
- 图7: https://attach.52pojie.cn/forum/202411/19/201835r72lnau7luv0l7nf.png
- 图8: https://attach.52pojie.cn/forum/202411/19/201837t5ej5e5ayvl5e4vu.png
- 图9: https://attach.52pojie.cn/forum/202411/19/201839p49pz9qp4cxt944q.png
- 图10: https://attach.52pojie.cn/forum/202411/19/201842e6vevclbbnnfsfxt.png
- 图11: https://attach.52pojie.cn/forum/202411/19/201844r8fdf5qm86vxrkud.png

## 落地复现要点
- 先完整抓包一轮业务流程，按“初始化-挑战-校验-提交”拆分请求链。
- 标注关键参数来源：接口回包、前端计算、环境指纹、时间戳/随机数。
- 在关键接口处做 xhr/fetch/JSON/crypto hook，结合调用栈定位参数生成函数。
- 将核心算法最小迁移到 Node/Python，使用固定输入做回归校验，确保输出稳定。
- VMP/JSVMP 场景先还原调度器与字节码执行流，再抽离真实算子逻辑。

## 常见坑与规避
- 只盯单个 sign 而忽略前置接口回包，会导致复现参数不全。
- 直接复制浏览器代码到 Node 运行，常因 window/document/navigator/crypto 缺失报错。
- 请求时间窗或随机种子处理不一致，会出现“偶现通过、批量失败”。
- 只验证一次成功样本，缺少多组回归用例，后续页面小改动就会失效。

## 提取备注
- 主贴文本长度：1504
- 主贴图片数量：11
