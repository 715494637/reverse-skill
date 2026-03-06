# 21. [Web逆向] 如何使用AST还原某音的jsvmp

## 原文链接
https://www.52pojie.cn/thread-1752755-1-1.html

## 逆向目标
vmp简单来说就是将一些高级语言的代码通过自己实现的编译器进行编译得到字节码，这样就可以更有效的保护原有代码，而jsvmp自然就是对JS代码的编译保护，具体的可以看看H5应用加固防破解-JS虚拟机保护方案。

## 关键流程
- 1. 什么是JSVMP
- 2. 如何去还原JSVMP
- 3. 分析具体网站
- 4. 开始编写AST代码
- 5. 分析生成后的代码
- 6. 参考文章

## 关键图片线索
- 图1: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228140826220.png
- 图2: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228152035413.png
- 图3: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228152122811.png
- 图4: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228152702801.png
- 图5: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228165426165.png
- 图6: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228170124168.png
- 图7: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228171030473.png
- 图8: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228205932340.png
- 图9: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228210029184.png
- 图10: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228210241897.png
- 图11: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228210552953.png
- 图12: https://sergiojune.oss-cn-guangzhou.aliyuncs.com//img/image-20230228210744705.png

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
- 主贴文本长度：20168
- 主贴图片数量：35
