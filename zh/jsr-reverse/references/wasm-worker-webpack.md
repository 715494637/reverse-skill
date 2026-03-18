# WASM, Worker, and Webpack

## 1. 进入内部前，先确认桥接层

这三类壳层有一个共同点：

- 真实逻辑不一定暴露在主线程或可见源码里
- 但输入 / 输出边界一定存在

因此第一步永远是：

- 找入口
- 找 bridge
- 找输入
- 找输出

## 2. Worker

先确认：

- worker 是独立文件、`blob`，还是字符串拼装出来的
- 主线程向 worker 发了什么
- worker 返回了什么
- 一次性 challenge、device seed、session state 是否跨 bridge 传递

默认记录格式：

```markdown
worker 类型：独立文件 / blob / 字符串组装
主线程入口：
worker 入口：
主线程 -> worker 输入：
worker -> 主线程输出：
```

Bridge-contract 卡片：

```markdown
桥接层卡片｜worker
入口形式：new Worker / blob / 字符串构造
主线程输入 -> worker：
worker -> 主线程输出：
跨桥状态：cookie / storage / challenge / device seed / session
写回点：
是否足以支撑下游：是 / 否
```

## 3. WASM

先确认：

- 需要哪些 `imports`
- 暴露了哪些 `exports`
- JS wrapper 如何组包参数
- 结果是直接返回，还是又被另一层壳包装

结论规则：

- 如果 bridge 层已经足够解释输入和输出，就不需要全量反汇编

Bridge-contract 卡片：

```markdown
桥接层卡片｜wasm
实例化入口：instantiate / instantiateStreaming
imports：
exports：
参数打包方式：
返回方式：直接返回 / 二次包装
是否足以支撑下游：是 / 否
```

## 4. Webpack / Runtime

先确认：

- module loading 入口
- lazy-loading 点
- 真实目标模块
- runtime shell 与业务模块的边界

常见误判：

- 长时间停留在 runtime shell，迟迟没有进入真实业务模块

Module-closure 记录：

```markdown
模块闭合记录
加载入口：
真实目标模块：
runtime helper：
懒加载点：
业务边界：
bundle/hash/moduleId：
```

## 5. 什么时候桥接层才是真正难点

- 主线程看到的只有壳，而真实值出现在 callback、message、memory 区或 lazy module 中
- 修改外层 wrapper 仍解释不了最终值如何形成
- 如果没有清晰的 bridge contract，下游 locate 或 replay 无法继续

## 6. 完成标准

- 已有 bridge contract
- 输入、输出与写回点已知
- 对 `webpack`，模块闭合边界已知
- 容器层、bridge 层与业务层已经分开
