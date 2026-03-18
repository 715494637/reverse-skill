# reverse-skill

面向 Web JS 逆向分析的技能仓库，覆盖请求链定位、运行时诊断、AST 混淆恢复、JSVMP、worker、WASM、webpack/runtime 与协议语义分析。

## 安装

1. 接入 [js-reverse-mcp](https://github.com/zhizhuodemao/js-reverse-mcp)
2. 将 `jsr-reverse` 目录复制到技能根目录

安装位置：

| 环境 | 路径 |
| --- | --- |
| `Codex` | `%USERPROFILE%\.codex\skills\` |
| `Claude Code` | `%USERPROFILE%\.claude\skills\` |

![示例](image.png)

## 使用

推荐最小输入：

- `URL`
- `接口 / 字段 / 消息对象`
- `触发方式`
- `当前现象`
- `已知约束`：例如 `cookie`、是否允许补环境、是否要求纯算法

唯一入口：

- `jsr-reverse`：统一 intake、判题、阶段路由，并点名当前必须继续读取的最小 reference 集合

阶段路由：

- `locate`：证明动态字段、请求头、`cookie`、消息对象的真实写边界，展开来源链、依赖链与上游状态
- `recover`：穿透 `JSVMP`、`AST`、`worker`、`WASM`、`webpack/runtime`、协议壳，恢复桥接契约与真实算法边界
- `runtime`：诊断浏览器正常、本地异常时的真实运行时分歧，收敛到最小运行时清单
- `validation`：在链路、恢复和运行时假设已经具备后，做等价性、一致性与交付前校验

关键知识放在 `jsr-reverse/references/`，由 `jsr-reverse/SKILL.md` 按阶段和症状路由到最小必读集合；`reverse-records/` 仅作为可选输出层，不主导技能结构。

全自动调用示例：

```text
使用：Jsreverser Mcp
方式：在真实浏览器插桩采集输入输出及中间态数据，与本地算法进行逻辑一致性和结果正确性对比分析。
URL: 【https://example.com】
目标：【接口 / 需要的数据】
触发方式: 【刷新页面】
cookie：【使用现有cookie / 优先不使用，必须则模拟完整链路生成游客态】
约束：不使用playwright等自动化工具、不联网搜索公开案例
必须纯算法实现，【能/不能】依赖补环境
交付：Node.js 生成加密参数，Python 负责调度和发送请求，运行后打印响应数据
```

显式调用示例：

```text
$jsr-reverse 先判断当前任务属于 locate、recover、runtime 还是 validation，再按阶段读取最小 reference 集合推进。
$jsr-reverse 先证明请求 A 的真实写边界、参数来源、上游依赖和 HttpOnly cookie 链路，再决定是否进入 recover 或 runtime。
$jsr-reverse 判断当前问题属于缺状态、缺对象、反调试还是风控分支，并输出最小运行时清单与验证步骤。
$jsr-reverse 恢复当前 jsvmp + worker + wasm 组合壳，明确桥接边界、关键算子和后续 validation 检查点。
```

按问题类型选择首阶段：

| 首阶段 | 负责什么 | 首读内容 |
| --- | --- | --- |
| `locate` | 处理动态字段、请求头、`cookie`、消息对象的写边界、来源链、依赖链 | `jsr-reverse/SKILL.md`，再读 `locate-workflow.md` + `request-chain-recording.md`，按症状补 `crypto-entry` / `rs-two-hop` / `hook-boundary` |
| `runtime` | 处理浏览器正常、本地异常、反调试、状态缺口、时序随机源、指纹面、风控分支 | `jsr-reverse/SKILL.md`，再读 `runtime-diagnosis.md` + `minimal-env-design.md`，按症状补 `anti-debug` / `sdenv` / `rs-runtime` |
| `recover` | 处理 `JSVMP`、`AST`、`worker`、`WASM`、`webpack/runtime`、协议壳遮蔽 | `jsr-reverse/SKILL.md`，再读 `recover-strategy.md`，按壳层补 `jsvmp-ast` / `wasm-worker-webpack` / `protocol` / `rs-anchors` |
| `validation` | 处理等价性校验、结果一致性、交付前验证与回归检查 | `jsr-reverse/SKILL.md`，再读 `equivalence-and-validation.md`，必要时回看当前阶段 reference |

常见切换路径：

- `Locate -> Runtime`：写点已知，但浏览器与本地执行分叉
- `Locate -> Recover`：写点接近，但中间逻辑被遮蔽层包裹
- `Runtime -> Recover`：已排除简单缺对象 / 缺状态，需要进入壳层恢复
- `Recover -> Locate / Runtime`：恢复桥接边界或状态载体后，回到链路证明或运行时验证
- `Recover / Runtime -> Validation`：关键假设闭合后进入一致性和交付验证

## 阶段说明

### `locate`

适合当前任务首先要解决来源链和写边界问题时进入。

- 证明目标字段、请求头、`cookie`、消息字段的真实写边界
- 建立 `entry -> builder -> writer` 关系，展开前置请求、响应依赖和状态链
- 处理 `HttpOnly cookie`、`WebSocket`、`protobuf`、长连接场景的消息与连接状态

典型进入条件：

- 不清楚 `sign`、`token`、`cookie`、请求头、请求体字段从何处写入
- 已知目标请求，但不清楚其依赖的前置请求、响应字段或状态
- 需要将链路展开到可获得正常响应的闭合状态

### `runtime`

适合当前任务首先要解决运行时分叉时进入。

- 区分对象缺失、状态缺失、反调试、时间随机源、指纹面和风控分支
- 设计最小运行时清单，说明每项依赖的必要性和可移除性
- 建立执行模式、纯算迁移前检查和运行时验证联动

典型进入条件：

- 浏览器内正常，本地执行异常
- 调试后值变化、执行卡死、链路跳入风控分支
- 不清楚问题属于环境对象、会话状态、指纹消费还是风险校验

### `recover`

适合当前任务首先要解决壳层穿透或桥接语义恢复时进入。

- 判定遮蔽层类型与最低必要恢复级别
- 恢复 `JSVMP`、`AST`、控制流平坦化、`worker`、`WASM`、`webpack/runtime`、协议壳
- 提取桥接契约、状态载体、关键算子和等价性检查点

典型进入条件：

- 已定位写回边界，但中间语义被多层壳遮蔽
- 需要先恢复桥接层、调度层或状态载体，才能继续定位或复现
- 需要判断当前任务应停留在 `A / B / C` 哪一级恢复深度

### `validation`

适合当前任务首先要解决一致性校验或交付前验证时进入。

- 对齐浏览器、本地脚本、抓包结果与中间态产物
- 校验输入、输出、关键中间态和状态依赖是否一致
- 明确哪些偏差来自链路未闭合、壳未打穿或运行时缺口未收敛

典型进入条件：

- 链路、恢复和运行时方案已具备，需要验证等价性
- 需要整理交付前检查项、回归检查项或失败归因
- 需要判断当前差异属于 locate / recover / runtime 的哪一类残留问题

## 可选记录

`reverse-records/` 只在需要长期留痕、跨阶段协作或显式交付记录时使用，不作为 skill 的中心结构。默认推进顺序仍然是：先用 `jsr-reverse` 判题和路由，再继续读取当前阶段所需 reference。

需要留痕时，在当前任务工作目录维护：

```text
<当前任务工作目录>/reverse-records/
├─ 总览.md
├─ 请求链路.md
├─ 运行态清单.md
├─ 恢复记录.md
└─ 验证记录.md
```

- 只维护一个 `reverse-records/` 目录
- 已有记录直接续写，不再创建会话子目录
- records 是输出层，不替代阶段判题和 reference 路由

## 适用与边界

适用：

- Web 端动态参数、登录链路、挑战链路、指纹链路、风控链路分析
- 请求重放前的来源证明、状态证明、依赖闭合和运行时闭合
- `jsvmp`、AST、`worker`、`wasm`、`webpack/runtime`、协议封装等典型遮蔽层恢复
