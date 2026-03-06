# 22. [Web逆向] 某鹅滑块验证码破解笔记

## 原文链接
https://www.52pojie.cn/thread-1521480-1-1.html

## 逆向目标
很久之前就听说过VM加密，但一直对VM概念很模糊，于是最近便想去下VM壳相关的技术，但在网上各种帖子学习到的知识有限，不能很好的去了解VM壳的一些原理和机制，于是就在想去找个VM壳进行逆向，看看能不能去学习到些什么东西。

## 关键流程
- 0.5371786118718886
- 0.6474871625616907
- 2) Apple
- 37.36 (K
- 17.0.0",

## 关键图片线索
- 图1: https://attach.52pojie.cn/forum/202110/18/135340tnokj11cxg1kixkg.png
- 图2: https://attach.52pojie.cn/forum/202110/18/135417lf3n4sosen9cqqg9.png
- 图3: https://attach.52pojie.cn/forum/202112/22/195648uq5brbbddyky6dqh.png
- 图4: https://attach.52pojie.cn/forum/202112/22/195727b7hfffvhr7ikh884.png
- 图5: https://attach.52pojie.cn/forum/202112/22/195742t864ellaqil0im8a.png
- 图6: https://attach.52pojie.cn/forum/202112/22/195910jtakxu5ax5a5ggfs.png
- 图7: https://attach.52pojie.cn/forum/202112/22/195914ihvr1hyflwlwyqop.png
- 图8: https://attach.52pojie.cn/forum/202110/18/135704vrq11zseneo9krjs.png
- 图9: https://attach.52pojie.cn/forum/202110/18/135803kjyf4b4812fjm2ur.png
- 图10: https://attach.52pojie.cn/forum/202110/18/135832ll31ee81en7lbv73.png
- 图11: https://attach.52pojie.cn/forum/202110/18/135848kaaiqgkxsqplx6ki.png
- 图12: https://attach.52pojie.cn/forum/202110/18/135913olcc6imlllyd3kmm.png

## 落地复现要点
- 先完整抓包一轮业务流程，按“初始化-挑战-校验-提交”拆分请求链。
- 标注关键参数来源：接口回包、前端计算、环境指纹、时间戳/随机数。
- 在关键接口处做 xhr/fetch/JSON/crypto hook，结合调用栈定位参数生成函数。
- 将核心算法最小迁移到 Node/Python，使用固定输入做回归校验，确保输出稳定。
- VMP/JSVMP 场景先还原调度器与字节码执行流，再抽离真实算子逻辑。
- AST 场景建议先做格式化和常量折叠，再进行控制流与对象访问还原。

## 常见坑与规避
- 只盯单个 sign 而忽略前置接口回包，会导致复现参数不全。
- 直接复制浏览器代码到 Node 运行，常因 window/document/navigator/crypto 缺失报错。
- 请求时间窗或随机种子处理不一致，会出现“偶现通过、批量失败”。
- 只验证一次成功样本，缺少多组回归用例，后续页面小改动就会失效。

## 提取备注
- 主贴文本长度：114356
- 主贴图片数量：35
