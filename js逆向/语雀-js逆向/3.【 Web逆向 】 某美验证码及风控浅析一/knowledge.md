# [ Web逆向 ] 某美验证码及风控浅析一

## 原文链接
- https://www.52pojie.cn/thread-2069214-1-1.html

## 逆向目标
- 记录一下逆向某登陆的总结!关键部分已做打码处理，网址敏感，暂不分享(笔者可不想再来一发！)，后续会提供分析样本，感谢理解。emmm，这次登录总共遇到了某美滑块验证码,某美指纹风控。接下来就进入正题吧老铁们！

## 关键流程
1. 接口分析
2. 提交登录触发事件之后总共出现n个数据包。其中有用的就是验证码接口，风控接口和校验接口。先简单说一下吧，接口返回的顺序就是首先就是register接口，web接口，fverify接口，最后是verify接口。
3. register接口
4. 其他：都是固定的，不过有些值后续加密的时候会使用到。但是是固定的没必要深究，不过后续会稍微说一下的勒。
5. web接口
6. 指纹的第一个加密的接口。
7. smdata：指纹加密
8. 返回值是一个JSONP，看着参数不咋多勒，smCB_*` 函数后续会被调用，并且接收相应的 JSON 数据，完成跨域数据获取。换句话说就是这些返回值后续会直接当作指纹第二次加密的值。为什么前面接口的jsonp不说，这个接口的JSONP我会专门拿来说，就是因为遇到坑了后续会细说，特别是sign跟timestamp和len这三个值特别重要，卡了我很久。
9. fverify接口
10. fverify接口就是验证码校验接口
11. verify接口是校验接口
12. 携带的参数有account，clientId，deviceId，keyPairId，pageToken，password，promotionId，rid，smDeviceId，state，type，uiaType。

## 关键图片线索
1. https://attach.52pojie.cn/forum/202510/31/194921qderw57wedlw0x48.png
2. https://attach.52pojie.cn/forum/202510/31/195106s878s0778dm0ts6d.png
3. https://attach.52pojie.cn/forum/202510/31/195129y7dm1447060ygp4c.png
4. https://attach.52pojie.cn/forum/202510/31/195150j3f7esk6anfnn9d0.png
5. https://attach.52pojie.cn/forum/202510/31/195239g2eoh6yzx0bbqnze.png
6. https://attach.52pojie.cn/forum/202510/31/195311nraaee0x1ye8bm89.png
7. https://attach.52pojie.cn/forum/202510/31/195332fjvbi2rj2wrmgmmk.png
8. https://attach.52pojie.cn/forum/202510/31/195419q0kctm8rcz98pbcz.png
9. https://attach.52pojie.cn/forum/202510/31/195437muxxhg7ekypvvhpx.png
10. https://attach.52pojie.cn/forum/202510/31/195448kik5sjcajafjjdib.png
11. https://attach.52pojie.cn/forum/202510/31/195514hj3jh3tq7c3qlnll.png
12. https://attach.52pojie.cn/forum/202510/31/195534un7rmwn8zlv72gwv.png

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 验证码场景先确认服务端真正校验字段，避免只在前端做无效模拟。
- 轨迹/点击类参数要和时间序列、坐标噪声策略一起复现。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- sdkver：标识版本
- version：版本
- 返回值是一个JSONP，看着参数不咋多勒，smCB_*` 函数后续会被调用，并且接收相应的 JSON 数据，完成跨域数据获取。换句话说就是这些返回值后续会直接当作指纹第二次加密的值。为什么前面接口的jsonp不说，这个接口的JSONP我会专门拿来说，就是因为遇到坑了后续会细说，特别是sign跟timestamp和len这三个值特别重要，卡了我很久。
- // __webdriver_evaluate: 这是一个用于检测 WebDriver 环境的标识符。在一些情况下，网站会检查这个标识符来判断是否通过 WebDriver 进行访问。
- // __selenium_evaluate: 与 WebDriver 相似，这个标识符用于检测 Selenium 环境。
- // __selenium_unwrapped: 检测当前 Selenium 环境的状态。

## 主贴关键摘录
- 本帖最后由 wangguang 于 2025-11-1 20:21 编辑
- 声明
- 本文章中所有内容仅供学习交流使用，不用于其他任何目的，严禁用于商业用途和非法用途，否则由此产生的一切后果均与作者无关！若有侵权，请联系作者删除。
- 前言
- 记录一下逆向某登陆的总结!关键部分已做打码处理，网址敏感，暂不分享(笔者可不想再来一发！)，后续会提供分析样本，感谢理解。emmm，这次登录总共遇到了某美滑块验证码,某美指纹风控。接下来就进入正题吧老铁们！
- 接口分析
- 提交登录触发事件之后总共出现n个数据包。其中有用的就是验证码接口，风控接口和校验接口。先简单说一下吧，接口返回的顺序就是首先就是register接口，web接口，fverify接口，最后是verify接口。
- register接口
- organization：某美产品唯一标识
- callback：回调ID

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
