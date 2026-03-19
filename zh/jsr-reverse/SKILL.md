---
name: jsr-reverse
description: Use when a Web JS reverse task has unclear phase selection, mixed source-chain and shell blockers, runtime divergence, validation-only work, or RS/瑞数 clues such as 412, cookie hops, sign, token, JSVMP, worker, wasm, hasDebug, or basearr.
---

# JSR Reverse

## 角色与任务

`jsr-reverse` 是中文侧 Web JS 逆向的默认唯一入口 skill。

它负责维护这一条工作主干：

`intake -> evidence -> locate -> recover -> runtime -> validation -> handoff`

使用它时要做到：

- 依据当前工程状态决定下一步，而不是只看线索词
- 把 `evidence` 与 `handoff` 保留在 `jsr-reverse` 内，不拆成独立 skill
- 只把任务路由到 `locate`、`recover`、`runtime`、`validation`
- 只指向当前最小必要 reference 集合

`412`、`token`、`worker`、`basearr`、`protobuf`、`JSVMP`、`wasm`、`hasDebug` 这类线索只能帮助挑选辅助 reference，不能代替阶段选择。

## Workflow Spine

1. `intake`：归一化目标请求、触发动作、目标、约束。
2. `evidence`：在阶段路由前先证明真实请求链，并更新项目记录。
3. `locate`：证明真实写入边界、sink 与上游依赖链。
4. `recover`：压缩壳层，直到后续所需的逻辑契约可读、可跟、可调用。
5. `runtime`：解释浏览器执行与本地/受控执行的首个真实分叉，并拟合最小运行时依赖集。
6. `validation`：证明等价性、检查点与最终一致性。
7. `handoff`：输出当前阶段判断，以及下一份必须更新的工件。

允许快速分诊，但它只能用于加速这条主干中的阶段选择，不能替代主干本身。

## Intake Contract

从这个输入块开始：

```text
URL 或目标页面：
目标请求 / 字段 / cookie / 消息：
触发动作：
当前现象：
已有证据：
目标：
约束：
```

完成 intake 后，用工程语言总结现状：

- 目标请求已经由真实样本证实，还是仍在猜测？
- 上游依赖链是真实、部分已知，还是未知？
- 写入边界已经坐实、接近但被遮蔽，还是尚未找到？
- 当前主阻塞是壳层压缩、运行时分叉，还是检查点证明？
- 下一份必须更新的工件是什么？

## Evidence Gate

只要满足下面任一条件，就要先经过这个 gate，再做阶段路由：

- 目标请求还没有从真实样本中识别出来
- 上游依赖链仍然停留在猜测
- 已知触发动作，但请求证据还没有形成记录
- 当前任务混杂了多个假设，且还没有请求链记录将它们分开

这个 gate 仍属于 `jsr-reverse`，不是独立 skill。

当 gate 触发时，必须先更新 `reverse-records/请求链路.md`，再选择后续阶段。

请求链判断格式与记录细节见 `references/request-chain-recording.md`。

## Stage Contracts

### `locate`

**目的**

证明目标请求、字段、cookie 或消息的真实写入边界、sink 与上游状态链。

**进入条件**

- 目标请求或 sink 还未被证明
- 上游依赖链不完整
- 写入边界仍靠猜，而非观察所得
- 当前证据还停留在“我们不知道值究竟在哪里、如何写入”

**应做**

- 确认真正的请求链和 initiator 路径
- 缩小到实际写入目标值的最小边界
- 分清哪些上游状态转移重要，哪些不重要
- 当请求链更加清晰时，更新 `reverse-records/请求链路.md`

**产出**

- 真实目标请求样本
- 已证明的 sink 或写入边界
- 足以支撑下游工作的具体上游依赖链

**退出条件**

sink 与上游链已经真实到足以让下一个阻塞变成壳层压缩，而不是继续找请求。

**不要进入当**

- sink/壳层边界已经清楚，且主阻塞已明确是运行时分叉
- 工作已经只剩等价性证明

**不要做**

- 在写入边界仍不真实时做大范围去混淆
- 在 sink 仍靠猜时先补环境

### `recover`

**目的**

围绕已证明的边界压缩壳层，直到后续工作所需的逻辑契约足够可读、可追踪或可调用。

**进入条件**

- sink 或写入边界已经真实且接近
- 下一个阻塞是混淆、dispatcher 结构、打包 helper、`worker`、`wasm`、webpack bootstrap、协议包络等壳层逻辑
- 当前任务已不再需要先做请求发现

**应做**

- 只剥离阻挡下游理解的壳层
- 恢复继续推进所需的 helper、dispatcher、bridge、protocol 或 loader 契约
- 始终围绕已证明边界做最小化恢复

**产出**

- 已压缩的壳层或已恢复的契约
- runtime 或 validation 所需的最小可调用 / 可观测逻辑切片

**退出条件**

壳层已经压缩到足以让下一个阻塞变成环境拟合或一致性证明，而不再是代码遮蔽。

**不要进入当**

- 真实写入边界仍未证明
- 任务的核心问题其实是浏览器/本地首个分叉

**不要做**

- 当 bridge 契约或算子切片已足够时做全量反编译
- 做与当前边界无关的主题式恢复

### `runtime`

**目的**

解释并缩小浏览器执行与本地/受控执行之间的首个有意义分叉。

**进入条件**

- sink 与壳层边界已经足够清楚
- 浏览器执行与本地执行在状态、时序、分支或环境事实层面发生分叉
- 当前问题已经变成“最小需要拟合哪些运行时事实”

**应做**

- 找到第一个真实分叉点
- 判定保持执行对齐所需的最小依赖集合
- 区分生命周期产出的事实与可 patch 的表层对象
- 当用户希望避免重环境补全时，把 runtime 视为末端拟合工作

**产出**

- 首个分叉点解释
- 最小运行时依赖集合
- 对 replay、patch、浏览器辅助执行或分阶段验证的合理路线说明

**退出条件**

运行时分叉已经解释清楚，剩余工作变成等价性证明或最终一致性检查。

**不要进入当**

- sink 或壳层边界仍靠猜
- 当前任务还需要先补请求链证明或壳层压缩

**不要做**

- 在未证明首个分叉前盲目叠 patch
- 当更小的拟合已足够时，把 runtime 扩成泛化逆向

### `validation`

**目的**

证明恢复路径、运行时拟合或复现输出在检查点和最终输出两个层面上都可辩护。

**进入条件**

- 主阻塞已不再是发现、壳层压缩或运行时拟合
- 工作已经转为检查点证明、等价性证明或最终一致性证明
- 当前任务本身就是验证型任务

**应做**

- 比较具体检查点，而不是只比较最终输出
- 证明哪些输出一致、哪里分叉、哪里仍未证实
- 定义还需要哪份工件或证据来补足剩余证明缺口

**产出**

- 可辩护的等价 / 不等价结论
- 供交接使用的具体检查点与结论

**退出条件**

证明已经具体到让下一位接手者能看清：哪些已解决，哪些仍未解决。

**不要进入当**

- 项目仍缺少真实请求链、sink、壳层压缩或运行时解释

**不要做**

- 中间检查点不一致却只接受最终输出相似
- 在证据不完整时隐藏不确定性

## Routing Rules

路由永远分两步。

### Step 1：先根据工程状态选择阶段

从当前工程状态选阶段：

- 当请求真实性、sink 或上游链仍未证实时，选 `locate`
- 当边界已证实，但壳层仍遮住可用逻辑契约时，选 `recover`
- 当边界和壳层都足够清楚，但跨环境执行出现分叉时，选 `runtime`
- 当剩余工作主要是证明、比较或检查点闭合时，选 `validation`

快速示例：

- 即使出现 `412`、`403`、cookie hop、`token`，只要真实链路还没证实，仍然先路由到 `locate`
- `worker`、`wasm`、`protobuf`、`JSVMP` 只有在 locate 边界已经跨过后，才支持路由到 `recover`
- `basearr`、`hasDebug` 只有在边界已清楚且问题确实是环境分叉时，才支持路由到 `runtime`

### Step 2：再挑该阶段的最小 reference 集合

阶段选定后，读取：

- 恰好 1 份该阶段 core reference
- 再加至多 1-2 份与当前阻塞匹配的 topic reference

不要反过来。不要先选 reference 再倒推阶段。

## Topic Mount Rules

topic reference 必须在阶段确定后再挂载。evidence artifact reference 只在 evidence gate 触发时单独使用。

### 各阶段核心 reference

- `locate` core：`references/locate-workflow.md`
- `recover` core：`references/recover-strategy.md`
- `runtime` core：`references/runtime-diagnosis.md`
- `validation` core：`references/equivalence-and-validation.md`

### Evidence artifact support

- 当 evidence gate 触发，或必须更新 `reverse-records/请求链路.md` 时，使用 `references/request-chain-recording.md`。它是证据工件 reference，不是 topic mount。

### Topic mount policy

先读 core，再补最多 1-2 份与当前阻塞匹配的 topic reference：

- `references/crypto-entry-locating.md`：`locate` 阶段中与 `sign`、`token`、动态 header、加密请求字段相关
- `references/hook-and-boundary-patterns.md`：`locate` 阶段中的 hook、断点、initiator、边界观察
- `references/jsvmp-and-ast.md`：`recover` 阶段中的 `JSVMP`、dispatcher loop、flattening、AST 重壳
- `references/ast-deobfuscation-playbook.md`：`recover` 阶段中的字符串表恢复、helper inline、AST 变换、bundle 拆包
- `references/wasm-worker-webpack.md`：`recover` 阶段中的 `worker`、`wasm`、`webpack/runtime`、bootstrap、loader
- `references/protocol-and-long-connection.md`：在阶段选定后，作为跨阶段 topic 处理 WebSocket、protobuf、SSE、heartbeat、ack、renewal
- `references/anti-debug-and-risk-branches.md`：`runtime` 阶段中的反调试或分支翻转
- `references/minimal-env-design.md`：`runtime` 阶段中的最小环境设计
- `references/sdenv-fit-check-and-routing.md`：`runtime` 阶段中的生命周期状态、导航状态、回放路径

### RS / 瑞数 mount policy

RS 线索不能代替阶段选择。

- `412`、`403`、挑战页、`meta[r=m]`、`r2mKa`、`$_ts`、`$_ts.l__`、首跳/二跳 cookie、`hasDebug`、`basearr` 只用于帮助挑选辅助 reference
- 阶段选定后，再添加该阶段最小的 RS reference：
  - `references/rs-collection-and-two-hop-routing.md`：`locate`
  - `references/rs-recovery-anchors.md`：`recover`
  - `references/rs-runtime-and-basearr-fit.md`：`runtime`

协议类问题可能跨多个阶段出现。只有在阶段已经选定后，才挂协议 reference。

## Record & Handoff Rules

- evidence gate 触发时，必须先更新 `reverse-records/请求链路.md`，再输出路由阶段。
- 只有阶段变化，或请求证据发生实质变化时，才重复输出阶段块。
- 如果 topic mount 改变了当前调查路径，交接前要重复阶段输出并更新当前工件。
- 当前工件：`reverse-records/请求链路.md`。
- handoff 必须绑定到当前工件，而不是绑定到线索词列表。
- 只引用 `jsr-reverse/references/*`。

## Output Contract

每次完成路由后，始终输出下面这个块：

```text
Current stage:
Why this stage now:
Read now:
Required artifact:
Exit condition:
```

要求：

- `Why this stage now` 必须解释工程状态，不能只重复线索词。
- `Read now` 必须包含恰好 1 份 core reference，再加至多 1-2 份 topic reference。
- `Required artifact` 必须指出下一份必须更新的工件或阶段产出。
- 如果 evidence gate 触发了，`Required artifact` 保持 `reverse-records/请求链路.md`，并在其中追加当前阶段结论。

## Examples

```text
Current stage: locate
Why this stage now: 目标请求仍有一部分停留在猜测，上游 cookie 依赖还没有被真实抓包证实，团队也还没有稳定的 token 写入边界。
Read now: references/locate-workflow.md + references/request-chain-recording.md + references/crypto-entry-locating.md
Required artifact: reverse-records/请求链路.md
Exit condition: 目标请求、上游依赖链与 token 写入边界都已由真实证据证实。
```

```text
Current stage: recover
Why this stage now: 请求链与写入边界都已真实，但可用逻辑仍被 worker bootstrap 与打包 helper 层遮住，因此当前阻塞是壳层压缩而不是 runtime 拟合。
Read now: references/recover-strategy.md + references/wasm-worker-webpack.md
Required artifact: 面向目标边界的 worker/bootstrap 恢复契约
Exit condition: 壳层已压缩到足以让下一个阻塞变成 runtime 拟合或 validation，而不是隐藏控制流。
```

```text
Current stage: runtime
Why this stage now: sink 与壳层边界已清楚，但本地执行在消费浏览器生命周期状态后，于一个固定环境依赖分支发生分叉。
Read now: references/runtime-diagnosis.md + references/minimal-env-design.md + references/rs-runtime-and-basearr-fit.md
Required artifact: 首个分叉点说明与最小运行时依赖集合
Exit condition: 首个分叉与最小拟合集合已经具体到足以进入 validation。
```

## Guardrails

- 已有真实请求与 initiator 链时，不要先做大范围源码 grep。
- 真实请求链还停留在猜测时，不要跳过 evidence gate。
- 不要让 `412`、`token`、`worker`、`basearr`、`protobuf` 等线索词直接决定阶段。
- 写入边界还没证实时，不要先跳入 runtime patch。
- 当 bridge 契约或算子切片已足够时，不要全量反编译壳层。
- 瑞数首跳材料没有确认二跳消费前，不要把它当成完整闭环。
- 中间检查点不一致时，不要只凭最终输出相等就判为成功。
- 每次请求链抓取或实质变化后，立刻更新 `reverse-records/请求链路.md`。
- topic reference 要保持最小，不要把这个 skill 变成 reference 百科。
