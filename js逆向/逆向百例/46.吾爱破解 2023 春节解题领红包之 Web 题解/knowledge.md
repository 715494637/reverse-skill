# 吾爱破解 2023 春节解题领红包之 Web 题解

- 原文链接：https://mp.weixin.qq.com/s?__biz=MzkyMzcxMDM0MQ==&mid=2247500579&idx=1&sn=14a5e2135d7ef9e2b02ddec127312bfd&chksm=c1e265c9f695ecdf3a3965e6728da7743d4459e8d767ad5f468993e66d09f09ca8422a153db4#rd
- 发布信息：2023年2月6日 00:47 | 作者：K哥爬虫

## 一、问题画像
吾爱破解每年都有个解题领红包活动，今年也不例外，需要我们使出看家逆向本领来分析内容获得口令红包，根据难度等级不同会获得不同数量的吾爱币，活动持续到元宵节结束。活动一共有十个题，本文仅分享 Web 初级、中级、高级三个题的逆向思路。

## 二、关键文字要点
- 要点1：吾爱破解每年都有个解题领红包活动，今年也不例外，需要我们使出看家逆向本领来分析内容获得口令红包，根据难度等级不同会获得不同数量的吾爱币，活动持续到元宵节结束。活动一共有十个题，本文仅分享 Web 初级、中级、高级三个题的逆向思路。
- 要点2：活动地址：https://www.52pojie.cn/thread-1738015-1-1.html
- 要点3：在视频 25 秒左右，右下角会出现一串字符 iodj3{06i95dig}，这里肯定是一个 flag，注意观察 flag 是四个字母，iodj 也是四个字母，可以大胆猜测这就是 flag3，在字母上动了手脚，数字和括号没变，极大可能是恺撒密码，恺撒密码是一种替换加密的技术，明文中的所有字母都在字母表上向后（或向前）按照一个固定数目进行偏移后被替换成密文，例如，当偏移量是3的时候，所有的字母A将被替换成D，B变成E。这里 iodj 每个字...
- 要点4：flag4 比较鸡贼，没在视频里，而是藏在视频作者的签名里（鼠标无意间瞎晃找到的），解密发现是 Base64，最终结果为 flag4{9cb91117}。
- 要点5：既然是动态的，那就不可能直接是 flagA{Header X-52PoJie-Uid Not Found}，很明显给的提示是 Header 里缺少了 X-52PoJie-Uid，所以我们在请求的时候 Header 里加上这个字段试试，Python 代码如下：
- 要点6：flagB 在前面推理 flagA 的时候已经遇到了，线索在 2023challenge.52pojie.cn 的域名解析，TXT 记录里，计算方法就是自己的 uid 加上字符串 _happy_new_year_ 加上时间戳除以 600 并向下取整后的值，经过 md5 加密后，取前八位即可。

## 三、关键图片要点
- 图1：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_gif/kicB09lvgibnnRjv0AAqQxyBODIttZXnQqcTPoF4Pt8tJmnia4CHaYUS3zqicFfKZTWibXTAew2ibFHDjy5Pf8nDnVEQ/640?wx_fmt=gif
- 图2：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/kLQoJJzjYaicxneNzbOg7ynx3TfnIwmNTpJQ7orkaUNrJIV4u7PNdSJ25Mtn6XdRQTamLDDicHnYfdic2bsiaNQjCw/640?wx_fmt=png
- 图3：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_jpg/iabtD4jabia4LZMKq7P6YM0SIiaFMZWzPRuNSDORibUrAfoUtvopicZcnb3J3V1RSBViaZSEUZ2ybRC5X7RUcU6NeKNw/640?wx_fmt=jpeg
- 图4：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LZMKq7P6YM0SIiaFMZWzPRuJ1RYibPTZqibEVSiaybJgALY0cgsYBGEkiaZrnLCq6FZIzpibic8pib91HTXA/640?wx_fmt=png
- 图5：抓包结果或请求字段示意图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LZMKq7P6YM0SIiaFMZWzPRunqQPYSy5oibQQJmicofL6hIBjhOZOec4kONia2vjhrOyaTuXiaDReY4fuA/640?wx_fmt=png
- 图6：加密/签名调用链定位截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LZMKq7P6YM0SIiaFMZWzPRuj3AEpWwn4w6zFfNRXRnNzCR8a5GMSias6SZw3icYazLgC03DFVYYarcg/640?wx_fmt=png
- 图7：关键代码片段或断点位置截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LZMKq7P6YM0SIiaFMZWzPRujHwzRBsTUX0TKibyfO9umG88zc7M7cqe1CpuQhKu1TbJ4FAFE6uR6Iw/640?wx_fmt=png
- 图8：复现结果与对照验证截图
  - 链接：https://mmbiz.qpic.cn/mmbiz_png/iabtD4jabia4LZMKq7P6YM0SIiaFMZWzPRuiaOricj1faKvvFy8o4oVrOlzseCFSKSbHuHkmglE1HicGE4CLiczyqkWOg/640?wx_fmt=png

## 四、精华技能
- 技能定位：MD5 + Cookie/Token
- 核心方法：定位调用链 -> 拆解参数构造 -> 还原算法/环境 -> 最小脚本复现 -> 回归验证。
- 可迁移策略：将本篇思路抽象为“入口定位、算法定位、环境定位、验证定位”四段式流程，适配同类站点。

## 五、落地步骤（可复用）
- 先抓包锁定目标接口，标出必要请求头、动态参数和触发条件。
- 以请求发起位置为入口断点，回溯到参数组装、加密和签名函数。
- 构造最小可用复现脚本，只保留必须环境和必要字段。
- 建立固定样例回归，持续比对线上请求与本地复现结果。

## 六、排错清单
- 在视频 25 秒左右，右下角会出现一串字符 iodj3{06i95dig}，这里肯定是一个 flag，注意观察 flag 是四个字母，iodj 也是四个字母，可以大胆猜测这就是 flag3，在字母上动了手脚，数字和括号没变，极大可能是恺撒密...

## 七、迁移关键词
- MD5
- Cookie/Token
- 2023
- Web
