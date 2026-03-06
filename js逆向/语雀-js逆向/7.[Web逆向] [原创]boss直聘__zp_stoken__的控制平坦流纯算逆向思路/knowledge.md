# 7. [Web逆向] [原创]boss直聘__zp_stoken__的控制平坦流纯算逆向思路

## 原文链接
https://www.52pojie.cn/thread-2058603-1-1.html

## 逆向目标
答:这个是首次自执行该js时拿到的一个时间戳,会保存到window['s']中,后续计算会用到,作用我猜测是计算本js从开始执行到最后生成参数,相隔了多长时间.作用大概是判断你是正常用户(执行时间应该在1秒内)还是搞断点的.如果搞断点逆向的话,可能最后发生出去的时候这个时间已经过了几十分钟.不过实际上似乎并没有什么后果.

## 关键流程
- 先看该token哪里来的.
- 注意到下面的请求cookie才第一次使用到__zp_stoken__,推断出是在这个0f35c990.js里生成的.注意该文件以及文件名会在每天晚上0点-1点之间变动一次,固定为每天一次.
- 下面部分依然大同小异,只是控制变量不再为常量,而是由传入的参数决定.
- 可能的传入参数,即下图示例中的10768 诸如此类.
- 现在进行第一步,使用ast构建出一个map印射表,使每一个be值对应的执行内容印射出来.
- 下一步就是给定指定的入口参数,然后我们模拟这个流程,以return和be=undefined未界,标记一整个函数的执行过程.
- 'if(be===14700);be = 14700;d = a;x = p[m];z = x["call"](p, S);w = d["call"](a, z);S = j;n = S < t;j = S + q;be = n ? 14700 : 73;be = n ? 14700 : 73;',
- 剩下的就是找到token生成的入口位置,然后使用我们自己构建的代码,依次调用即可.
- 可以看到第一个参数5553,即be=5553是关键入口,第二个第三个是前面请求或者token已过期时系统返回的种子参数.
- 值得一提的是,部分参数的构成方式,靠肉眼就能看出规律,没事背一下ascii码表是真的有用家人们,比如这里我当时就肉眼看出端倪,a=97总知道的吧,那b自然是98,包括后面俩一样的.这段长度50的代码计算逻辑是这样的.首先是字符串的长度,然后跟字符串对应的ascii码.

## 关键图片线索
- 图1: https://attach.52pojie.cn/forum/202509/08/000643u0mv6gsdjy0vjvhj.png
- 图2: https://attach.52pojie.cn/forum/202509/08/000703sx5a8ta5ml8ln185.png
- 图3: https://attach.52pojie.cn/forum/202509/08/000706d5h9zz5tb7555bbi.png
- 图4: https://attach.52pojie.cn/forum/202509/08/000708ep88ba8cfrm6a51e.png
- 图5: https://attach.52pojie.cn/forum/202509/08/000710fvyavy81yvyz6vz6.png
- 图6: https://attach.52pojie.cn/forum/202509/08/000712h9vajve7apy95auu.png
- 图7: https://attach.52pojie.cn/forum/202509/08/000715ujfljnl424g2jfkd.png
- 图8: https://attach.52pojie.cn/forum/202509/08/000717nh2ds5vvtjj133m3.png
- 图9: https://attach.52pojie.cn/forum/202509/08/000719kbigmmqz4lc4omqz.png
- 图10: https://attach.52pojie.cn/forum/202509/08/000721cnr39y0tc21x0y9s.png
- 图11: https://attach.52pojie.cn/forum/202509/08/000723qkbsplkhaqt5rtrx.png
- 图12: https://attach.52pojie.cn/forum/202509/08/000725mcqnlncp2vq2vvf2.png

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
- 主贴文本长度：2034
- 主贴图片数量：22
