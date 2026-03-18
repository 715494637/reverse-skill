# RS Recovery Anchors

## When to Use

本文件只能作为 RS / 瑞数类目标在 `recover` 阶段的 mounted reference 使用。

当当前 recover 阻塞是“RS 壳层仍遮住下游所需语义锚点”时，挂载它，例如：

- 已拿到 `r2mKa` dispatcher 文本
- 已拿到 `$_ts` 样本，且 `cp` 字段与恢复有关
- keys 路径被 `cp3`、dynamic task 或 offset 遮住
- 页面渲染或 app code 被包在 `$_ts.l__` 中

本文件是 recover 细化规则，不是跨阶段的 RS 工作流。

## Owns

本文件只负责下面这些 RS 专用 recover 工作：

- 推荐锚点顺序
- 各锚点对应的恢复规则
- 每个锚点恢复后的验证检查点

## Does Not Own

本文件不负责：

- RS locate 收集或二跳证明
- `hasDebug`、时间/随机源、二跳接受条件这类 RS runtime 拟合
- RS 之外的全局 recover 深度规则
- 超出锚点 readiness 范围的 validation 证明

## Method inside this stage

### 1. 使用推荐锚点顺序

除非证据表明依赖更紧，否则按这个顺序：

| 锚点 | 能证明什么 |
| --- | --- |
| `r2mKa` 文本 | dispatcher 树、任务族、子节点关系、稳定解析锚点 |
| `cp0 / cp2 / cp6` | 解码后的常量、表层字符串、控制相关值 |
| `cp3 -> dynamicTaskOffset -> keys` | 解密路径与 key material 推导关系 |
| `$_ts.l__` appcode | 真正参与下游工作的渲染 / 解密后代码 |

如果这些锚点已经存在，就不要从整份 beautify 后的大 bundle 硬抠起步。

### 2. 应用锚点专属恢复规则

- 优先把 `r2mKa` 当 dispatcher / task-tree 锚点恢复，不要误当成最终业务算子。
- 先解 `cp0 / cp2 / cp6`，再扩大算子分析；它们通常先给出稳定命名、常量或控制线索。
- 把 keys 路径看作 bridge：`cp3 -> task offset -> keys`，而不是孤立的字符串解密技巧。
- 把 `$_ts.l__` 当承载渲染后 / 解密后代码的 bridge 工件，不要当页面噪音处理。

### 3. 每拿下一层锚点就记录一个验证检查点

每完成一个锚点，都记录一条检查点：

- `r2mKa`：解析入口或任务关系已经稳定
- `cp` 层：解码输出已稳定到足以支撑命名或控制判断
- keys 路径：key material 推导路径已稳定到足以做下游验证
- `$_ts.l__`：解码 appcode 已达到稳定输出，或已有稳定停止原因

如果连检查点都写不出来，当前锚点就还不能交接。

## Stop / handoff rule

- 当一个或多个锚点已经稳定到足以支撑下游 runtime 或 validation 时，停止使用本文件。
- 如果没有稳定 `$_ts` 样本，也没有 `r2mKa` 或 appcode 锚点，应保持 recover 为 `blocked`。
- 如果锚点已存在，但 keys 路径或 appcode 语义仍不完整，应保持 recover 为 `partial`。
- 交给 `runtime` 时，用最小交接信号，例如：`anchor stable; remaining blocker is runtime fit or second-hop acceptance`。
- 交给 `locate` 时，用最小交接信号，例如：`anchor exists but hop ownership / upstream artifact ownership is still unclear`。
