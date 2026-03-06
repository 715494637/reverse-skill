# 28. [Web逆向] Tbooking验证码逆向分析

## 原文链接
https://www.52pojie.cn/thread-2080682-1-1.html

## 逆向目标
// _0xf740d4 = 0x7c425（目标值：508965）

## 关键流程
- 对混淆代码用ast进行解混淆，代码每次进入行数解混淆函数都会做赋值操作
- ast代码
- traverse(ast, {
- 经分析，指纹脏了之后总共有两次验证码，第一次过了之后返回第二个验证码(可能是滑块，可能是点选)的信息，后面流程都一样，第一次验证码获取的接口参数不变直接固定，verify_msg参数携带了部分浏览器指纹校验信息，也有其他接口会校验指纹信息(新的指纹只需要过一次验证码)，不方便写，就写verify_msg参数与部分指纹分析。
- // 三元运算符：根据模式参数决定加密还是解密
- function encryptAES(plaintext, keyHex, ivHex) {
- const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
- return encryptAES(_0x478d1c, keyHex, ivHex);
- 'flashState': _0x571647["flaState"],
- 'mediaStreamTrack': _0x571647['mediaStreamTrack'],

## 关键图片线索
- 图1: https://attach.52pojie.cn/forum/202512/17/211307vhdh3553d543wdz7.png
- 图2: https://attach.52pojie.cn/forum/202512/17/211331vyl6brrgfzhyh66j.png
- 图3: https://attach.52pojie.cn/forum/202512/17/211350uz2z2lxpbbh9n85b.png
- 图4: https://attach.52pojie.cn/forum/202512/17/211413cwc0tizg88bbi8gw.png
- 图5: https://attach.52pojie.cn/forum/202512/17/211428n7vt51to4z7zy264.png
- 图6: https://attach.52pojie.cn/forum/202512/17/211441pbha4bbmp4h6biat.png
- 图7: https://attach.52pojie.cn/forum/202512/17/211457yvuwvksdy206u25u.png
- 图8: https://attach.52pojie.cn/forum/202512/17/211511qg8ygxy2g8689iag.png
- 图9: https://attach.52pojie.cn/forum/202512/17/211531hu53twko5vlluevg.png
- 图10: https://attach.52pojie.cn/forum/202512/17/211545eremmoh2moamhxdd.png
- 图11: https://attach.52pojie.cn/forum/202512/17/211604k2qls0db92c3v900.png
- 图12: https://attach.52pojie.cn/forum/202512/17/211616nxow7a7m71h1miq5.png

## 落地复现要点
- 先完整抓包一轮业务流程，按“初始化-挑战-校验-提交”拆分请求链。
- 标注关键参数来源：接口回包、前端计算、环境指纹、时间戳/随机数。
- 在关键接口处做 xhr/fetch/JSON/crypto hook，结合调用栈定位参数生成函数。
- 将核心算法最小迁移到 Node/Python，使用固定输入做回归校验，确保输出稳定。
- AST 场景建议先做格式化和常量折叠，再进行控制流与对象访问还原。

## 常见坑与规避
- 只盯单个 sign 而忽略前置接口回包，会导致复现参数不全。
- 直接复制浏览器代码到 Node 运行，常因 window/document/navigator/crypto 缺失报错。
- 请求时间窗或随机种子处理不一致，会出现“偶现通过、批量失败”。
- 只验证一次成功样本，缺少多组回归用例，后续页面小改动就会失效。
- cookie 链路常有写入时序要求，需复现设置顺序与作用域。

## 提取备注
- 主贴文本长度：21625
- 主贴图片数量：34
