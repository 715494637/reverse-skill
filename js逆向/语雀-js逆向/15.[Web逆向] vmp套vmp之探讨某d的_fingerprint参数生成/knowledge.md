# 15. [Web逆向] vmp套vmp之探讨某d的_fingerprint参数生成

## 原文链接
https://www.52pojie.cn/thread-2030247-1-1.html

## 逆向目标
后面就简单了，其实你解开上面这段就基本上完成这个逆向了。

## 关键流程
- vmp套vmp之探讨某d的_fingerprint参数生成
- 直接搜索this._fingerprint = _$XS.get(this._version, this._appId),便可快速定位到这个参数的生成位置。
- 传入两个参数this._version = '5.1'和this._appId = '73806'。简单记一下，打上断点，步入进去。
- }) // 这里去取了一些浏览器的值 但是我们在这里看到一个 v = "dw3gwggga2hpa338" 很像我们的_fingerprint我们直接步出这个函数，看看结果是不是
- 我们步出这个函数发现this._fingerprint = "dw3gwggga2hpa338"说明这个并且我们多次运行后面方法发现这个是不变的。但是它真的是不变的吗。
- 如果你详细跟了上面这个函数你就知道，这个_fingerprint会被存储在本地存储的WQ_dy1_vk中。
- 我们还是观察这个代码。这个v是我们的_fingerprint，向下看看发现。讲解如下：
- var _$VC = _$Xu(); // 说明这个是_fingerprint生成的地方（2）
- 还是一样，打上断点步入进去，发现。好家伙，一眼vmp,而且还是vmp套vmp。但是不要慌。还记得我之前文章写的巧用ai和vmp插桩的几点吗。我们将代码扣下来将需要插桩的分支发给ai让他给我们插好桩。这样我们就得到一份完美的插桩代码。这里还要提醒一下，需要把每个vmp的栈和执行分支也打出来。会方便很多。这个插好的代码我会放到附录供大家学习。
- 执行完这个函数，我们得到一份粗略的日志。我们先简单浏览一下。我们发现一个很奇怪的字符串 0jhqw3pa2m 后面操作都有它的身影。说明这个是个重要参数。

## 关键图片线索
- 图1: https://attach.52pojie.cn/forum/202505/09/163526dd9aen3tzyeutafo.png
- 图2: https://attach.52pojie.cn/forum/202505/09/163528e35ihixmewfx4vqc.png
- 图3: https://attach.52pojie.cn/forum/202505/09/163531jfbgs37uxxbbdsdf.png
- 图4: https://attach.52pojie.cn/forum/202505/09/163531sbv9g5f98oioeygb.png
- 图5: https://attach.52pojie.cn/forum/202505/09/163531b1hp1phhhiaah1ep.png
- 图6: https://attach.52pojie.cn/forum/202505/09/163531ln41tnbusiysoa1o.png
- 图7: https://attach.52pojie.cn/forum/202505/09/163532yr74orihr74zie3w.png
- 图8: https://attach.52pojie.cn/forum/202505/09/163532xehdjfkpf2858zld.png
- 图9: https://attach.52pojie.cn/forum/202505/09/163532vyidgrarivvddkj5.png
- 图10: https://attach.52pojie.cn/forum/202505/09/163532xnnd0ntnnjf333xn.png
- 图11: https://attach.52pojie.cn/forum/202505/09/163533j30vk911zp3uxvgg.png
- 图12: https://attach.52pojie.cn/forum/202505/09/163533mw5zuhf8z5evqjuh.png

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
- 主贴文本长度：32812
- 主贴图片数量：14
