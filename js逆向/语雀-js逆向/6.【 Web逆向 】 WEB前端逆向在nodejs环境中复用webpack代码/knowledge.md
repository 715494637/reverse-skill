# [ Web逆向 ] WEB前端逆向在nodejs环境中复用webpack代码

## 原文链接
- https://www.52pojie.cn/thread-2031316-1-1.html

## 逆向目标
- WEB前端逆向中会遭遇webpack处理过的js代码，这种代码不是给人类阅读的，所以没什么可读性。有些生成关键字段的函数位于其中，不想调试分析算法逻辑，想视之为黑盒函数，给in，返回out；想在nodejs环境中复用本来在browser环境中运行的webpack代码；此过程俗称「webpack代码抠取」。

## 关键流程
1. 1) hello.js
2. 2) webpack配置文件
3. 3) webpack打包
4. 4) hello.html
5. 1) 全局导出__webpack_require__函数
6. 2) run_webpack_code_1.js
7. 3) 生产模式webpack打包结果复用
8. 3.1) 全局导出__webpack_require__函数
9. 3.2) run_webpack_code_1.js
10. 3.3) 半自动收集245模块所有依赖模块
11. 1) 识别webpack
12. 2) __webpack_require__/__webpack_module_cache__/__webpack_modules__

## 关键图片线索
1. 主贴未提取到可直接访问的图片 URL（可能为登录可见图或防盗链资源），建议手动在页面截图对照流程节点。

## 落地复现要点
- 先固定请求上下文：UA、Cookie、Referer、时间戳与页面版本，避免样本漂移。
- 先抓一条成功样本，再按‘入口请求 -> 参数构造 -> 校验请求’逆序回溯调用链。
- 把关键函数沉淀为离线脚本，并用固定输入输出做回归测试，防止站点小改导致静默失效。

## 常见坑与规避
- ☆ nodejs环境完整实验用例
- ☆ 安装webpack开发环境
- ☆ 在nodejs环境中使用browser环境代码
- 5) 补环境
- WEB前端逆向中会遭遇webpack处理过的js代码，这种代码不是给人类阅读的，所以没什么可读性。有些生成关键字段的函数位于其中，不想调试分析算法逻辑，想视之为黑盒函数，给in，返回out；想在nodejs环境中复用本来在browser环境中运行的webpack代码；此过程俗称「webpack代码抠取」。
- 简单点说，webpack是一种工具，可将本来在nodejs环境中运行的js处理一下，生成可在browser环境中运行的js。对WEB前端逆向人员，没必要往更复杂理解。学习思路如下

## 主贴关键摘录
- 创建: 2025-05-13 09:33
- 更新: 2025-05-14 08:32
- 目录:
- ☆ 背景介绍
- ☆ nodejs环境完整实验用例
- ☆ 安装webpack开发环境
- ☆ 用webpack打包成browser可用代码
- 1) hello.js
- 2) webpack配置文件
- 3) webpack打包

## 提炼结论
- 这篇文章的核心价值在于：把‘抓包定位 -> 关键参数链路还原 -> 离线复现’串成可执行流程。
- 复现时优先保证输入上下文一致，再追求算法细节完全还原，可显著提高成功率。
