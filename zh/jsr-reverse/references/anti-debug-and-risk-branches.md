# Anti-Debugging and Risk Branches

## When to Use

本文件只能作为 `runtime` 阶段的 mounted refinement 使用。

当当前 runtime 阻塞属于以下情况之一时挂载它：

- 调试动作会改变观测到的路径或输出
- 怀疑风控分支改变了链路、中间值或最终响应
- 指纹差异可能已经被真实消费点使用
- 在继续做 first-divergence 对比前，需要做一次最小反调试处理决策

它不是第二套 runtime 工作流。

## Owns

本文件只负责下面这些 runtime 细化工作：

- 区分调试摩擦与真实风控分支
- 画出正常态 / 风控态分叉图
- 判断某个指纹差异是否真的存在消费点
- 贯彻最小处理原则，让观察得以继续而不是大改逻辑

## Does Not Own

本文件不负责：

- 全局 runtime 路由
- 通用请求链采集
- 壳层恢复或去混淆深度决策
- 完整环境工件设计
- validation 证明

如果真正阻塞是隐藏壳层逻辑，而不是 runtime 分叉，就应交回 recover，而不是继续扩展本文件。

## Method inside this stage

### 1. 先区分调试摩擦与真实风控分支

先把现象拆成两类：

- `debug friction`：让观察更难，但不一定改变业务值
- `real risk branch`：确实改变链路、中间值或最终响应

不要把所有 debugger 症状都叫反调试，也不要把所有异常结果都叫风控分支。

### 2. 不要只命名，要证明分叉

以下信号说明“真实风控分支”是合理假设：

- 目标请求发出前就已经发生 fallback
- 相同输入下，浏览器正常，本地回放稳定走另一条路径
- 缺一条上游请求就立刻出现 `403`、空 payload、challenge 或升级
- 目标值虽然算出来了，但服务端始终不接受

出现这些信号时，就不要继续扩 patch，而要先产出分叉图。

### 3. 分叉图是必需品

必须记录：

- 分叉起点：哪个请求、响应、状态缺口或调试事件开始分叉
- 正常态路径：正常执行走的是哪条 builder / writer / response 路径
- 风控态路径：fallback / challenge / degraded path 走的是哪条路
- 缺失状态：精确写出缺了什么，而不是笼统写“环境不一致”

最小模板：

```markdown
分叉起点：

正常态路径：

风控态路径：

缺失状态：
-
```

### 4. 指纹差异必须有真实消费点

对于 `deviceId`、`blackbox`、`sensor_data`、challenge、slider 等目标，只推进到能明确说出下面三点为止：

- 哪个指纹表面最先发生差异
- 哪个 collector 或 aggregator 消费了它
- 哪个 risk gate、challenge 点或 fallback 点开始分叉

不能只因为“某个指纹值不同”就下结论。

### 5. 使用最小处理原则

- 只移除阻碍观察的调试摩擦
- 不大范围重写业务逻辑
- 只选会改变调查路径的最窄反调试处理
- 如果 patch 改变了页面状态，要把这件事记下来，并在条件允许时去掉 patch 再复验
- 只有当导航监听或生命周期监听真实造成分叉时，才把它归为反调试

### 6. 最小交接信号

用简单交接语句替代旧式 skill 切换话术：

- 如果分叉由上游状态缺失造成，交接语句应是：`missing state proved; return to locate to close the chain`
- 如果真实逻辑仍藏在壳层中，交接语句应是：`risk consumer hidden by shell; continue in recover`
- 如果分叉与消费点都已知，则继续停留在 runtime，只拟合最小必要事实

## Stop / handoff rule

- 当调试摩擦与真实风控分支已经分开，就停止使用本文件。
- 当分叉起点与缺失状态已经具体到足以支撑下一步 runtime 动作，就停止使用本文件。
- 如果真正阻塞是上游请求 / cookie / 状态缺口，应交回 `locate`。
- 如果真正阻塞是隐藏消费点或壳层保护分支，应交回 `recover`。
- 只有在分叉与消费点都已知，且剩余工作只是最小事实拟合时，才继续留在 `runtime`。
