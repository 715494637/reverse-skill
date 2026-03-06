# 26. [Web逆向] wasm转c调用与封装至dll案例

## 原文链接
https://www.52pojie.cn/thread-1556027-1-1.html

## 逆向目标
1.某德地图矢量瓦片逆向(快速wasm逆向)，执行wasm2c翻译出来的c代码一

## 关键流程
- 1.某德地图矢量瓦片逆向(快速wasm逆向)，执行wasm2c翻译出来的c代码一
- 2.执行wasm2c翻译出来的c代码二

## 关键图片线索
- 图1: https://attach.52pojie.cn/forum/202410/11/173335sopceu888pz3e0tc.jpg
- 图2: https://attach.52pojie.cn/forum/202410/11/173337gwof8o3rt93oa59a.jpg
- 图3: https://attach.52pojie.cn/forum/202410/11/173340folvpgtvrgl3pklx.jpg
- 图4: https://attach.52pojie.cn/forum/202410/11/173341soce554auabucco7.jpg
- 图5: https://attach.52pojie.cn/forum/202410/11/173344fjlixdlljhejlelk.jpg
- 图6: https://attach.52pojie.cn/forum/202410/11/173346qz9jb9a3xijzaqx1.jpg
- 图7: https://attach.52pojie.cn/forum/202410/11/173348rrnj1okkf1qnjrkr.jpg
- 图8: https://attach.52pojie.cn/forum/202410/11/173350s87duorbfdjluk8f.jpg
- 图9: https://attach.52pojie.cn/forum/202410/11/173352xp494l31vuvcjy4l.jpg
- 图10: https://attach.52pojie.cn/forum/202410/11/173354o8igz6ww6wuwz86s.jpg
- 图11: https://attach.52pojie.cn/forum/202410/11/173356fjtifyi8fztxqyfy.jpg
- 图12: https://attach.52pojie.cn/forum/202410/11/173358bvzkqwqop0e6nngv.jpg

## 落地复现要点
- 先完整抓包一轮业务流程，按“初始化-挑战-校验-提交”拆分请求链。
- 标注关键参数来源：接口回包、前端计算、环境指纹、时间戳/随机数。
- 在关键接口处做 xhr/fetch/JSON/crypto hook，结合调用栈定位参数生成函数。
- 将核心算法最小迁移到 Node/Python，使用固定输入做回归校验，确保输出稳定。
- wasm 场景优先分析 JS 与 wasm 的边界函数、导入导出表与内存读写偏移。

## 常见坑与规避
- 只盯单个 sign 而忽略前置接口回包，会导致复现参数不全。
- 直接复制浏览器代码到 Node 运行，常因 window/document/navigator/crypto 缺失报错。
- 请求时间窗或随机种子处理不一致，会出现“偶现通过、批量失败”。
- 只验证一次成功样本，缺少多组回归用例，后续页面小改动就会失效。

## 提取备注
- 主贴文本长度：6877
- 主贴图片数量：16
