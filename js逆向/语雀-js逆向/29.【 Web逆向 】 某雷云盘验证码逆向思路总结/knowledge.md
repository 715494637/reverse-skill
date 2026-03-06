# [ Web逆向 ] 某雷云盘验证码逆向思路总结

## 原文链接
- https://www.52pojie.cn/thread-2088578-1-1.html

## 逆向目标
- 0x1无感验证码逆向可行性分析

## 关键流程
1. 通过浏览器调试，获得文件预览请求接口，该接口大概率可用于下载文件，便于后续直链解析。
2. -H 'x-captcha-token: ck0.Gyo17t681jDpvftFs5p4Prm4GceGeVQ9tHCEqfrOy1EyybSPpo-T-ja5luvS8R7WvBLeI6L7HSBcoVQz8sC4u5gqMgk8MzLHJ5Tsl1Cn_cVScMSr1Vv6gTgkfNE_q-iTmJAgCXRCyK1Jl6nDnP2l3o72RIcmEd85wiOnJ4glvEzOJKcvC3C4uDIQQkek7byqEDq7OlnEsWnGULSu3k0RyjgwElI5nlySlirHXuB06rUPVPVqnZZRZtPDFgEjBAD6o7S3GiUi1mDzTy99ZIb7u9SJvABQKIWeU32hHHuvDBlpd_MGxAVR_DsrGNeb5zjf84hF5g43jkOTA8Dtb6T3147se3oEzoTJTgYHoOETen67-LpQrGyAhOPI0MDqhnuAkG8CGydEiFsyEluLzBBDUDZd4FWpvWEgu9FFLpFXD9rcK-W4dkauQm2yL-oEXeNU.ClQIluvbmL8zEhBYcXAwa0pCWFdod2FUcEI2GgcxLjkyLjMzIg5wYW4ueHVubGVpLmNvbSogYTI3NzQ5ZjU4MDc4MGMxZDNiNTRhMzljYTBkY2Q3ZDYSgAEGGCmLAVNDS0uba8-nVFI2F4aeEgjg1PpRK8Vo4bx7ufSqjMIczX2mnBHU1isKwk3VbMKVybb8r5tPecIP1C3G75bkPpXyxxG3pSftiRqVvJ0j-oAMcivX05-8m8wa2T0R8ayGvyJGrzVHR78Z6nm8qLIZF4U9hI3ypxEbDBdYRA' \
3. 这几个参数比较关键，后续用于验证码生成：
4. -H 'x-captcha-token:
5. x-captcha-token
6. 参数：
7. Token 结构分析
8. 这个token分为两部分，用
9. Part 1 - 加密数据
10. 的加密数据（注意使用
11. signature: [二进制签名数据]
12. Token 生成原理

## 关键图片线索
1. 主贴未提取到可直接访问的图片 URL（可能为登录可见图或防盗链资源），建议手动在页面截图对照流程节点。

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 先定位 wasm 加载入口（instantiate/instantiateStreaming），记录 import/export 映射。
- 必要时 wasm2wat 对照分析，重点看参数打包与返回值校验位置。
- 验证码场景先确认服务端真正校验字段，避免只在前端做无效模拟。
- 轨迹/点击类参数要和时间序列、坐标噪声策略一起复现。

## 常见坑与规避
- 的加密数据（注意使用
- 环境检测
- # 使用真实浏览器环境
- 在Node.js环境复现
- 终极方案：浏览器环境注入
- : 使用 Selenium/Puppeteer 在真实浏览器环境运行

## 主贴关键摘录
- 本帖最后由 qaiu 于 2026-1-25 12:00 编辑
- 0x0打开某雷分享链接
- 链接：https://pan.xunlei.com/s/VOg7*bA1提取码：xxx
- 通过浏览器调试，获得文件预览请求接口，该接口大概率可用于下载文件，便于后续直链解析。
- curl -X GET 'https://api-pan.xunlei.com/drive/v1/files/文件id?space=&usage=CONSUME' \
- -H 'Content-Type: application/json' \
- -H 'x-device-id: 898c2cb6caf9af783bdc8b0fde3036ad' \
- -H 'x-client-id: Xqp0kJBXWhwaTpB6' \
- -H 'x-captcha-token: ck0.Gyo17t681jDpvftFs5p4Prm4GceGeVQ9tHCEqfrOy1EyybSPpo-T-ja5luvS8R7WvBLeI6L7HSBcoVQz8sC4u5gqMgk8MzLHJ5Tsl1Cn_cVScMSr1Vv6gTgkfNE_q-iTmJAgCXRCyK1Jl6nDnP2l3o72RIcmEd85wiOnJ4glvEzOJKcvC3C4uDIQQkek7byqEDq7OlnEsWnGULSu3k0RyjgwElI5nlySlirHXuB06rUPVPVqnZZRZtPDFgEjBAD6o7S3GiUi1mDzTy99ZIb7u9SJvABQKIWeU32hHHuvDBlpd_MGxAVR_DsrGNeb5zjf84hF5g43jkOTA8Dtb6T3147se3oEzoTJTgYHoOETen67-LpQrGyAhOPI0MDqhnuAkG8CGydEiFsyEluLzBBDUDZd4FWpvWEgu9FFLpFXD9rcK-W4dkauQm2yL-oEXeNU.ClQIluvbmL8zEhBYcXAwa0pCWFdod2FUcEI2GgcxLjkyLjMzIg5wYW4ueHVubGVpLmNvbSogYTI3NzQ5ZjU4MDc4MGMxZDNiNTRhMzljYTBkY2Q3ZDYSgAEGGCmLAVNDS0uba8-nVFI2F4aeEgjg1PpRK8Vo4bx7ufSqjMIczX2mnBHU1isKwk3VbMKVybb8r5tPecIP1C3G75bkPpXyxxG3pSftiRqVvJ0j-oAMcivX05-8m8wa2T0R8ayGvyJGrzVHR78Z6nm8qLIZF4U9hI3ypxEbDBdYRA' \
- -H 'Authorization: Bearer 隐藏'

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
