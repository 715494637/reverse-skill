---
name: jsr-recover
description: Use when real business logic is hidden by JSVMP, AST transforms, control-flow flattening, worker, wasm, webpack/runtime bootstrap shells, protocol wrappers, or RS/瑞数 r2mKa and cp/appcode shells.
---

# JSR Recover

## 角色

只有写入边界已经接近，但真实逻辑仍被壳层挡住时才用这个 skill。

适用场景：

- `JSVMP`、控制流平坦化、dispatcher 循环、AST 重混淆
- `worker`、`wasm`、`webpack/runtime`、loader 壳
- 协议包络、WebSocket codec、长连接续期状态
- 瑞数锚点 `r2mKa`、`cp0/cp2/cp6`、`cp3 -> keys`、`$_ts.l__`

不适用场景：

- sink 或上游依赖链还在猜
- 主要问题其实是运行时状态分叉

如果当前阶段还不明确，先走 `$jsr-reverse`。

## 输入块

先收这块输入：

```text
目标：
目标工件或文件：
已知 sink 或桥接边界：
观察到的壳层类型：
当前卡点：
已知锚点：
验证样本：
目标：
约束：
```

## 读取顺序

### 1. 先固定读这份

- `references/recover-strategy.md`

### 2. 再按壳层类型补最小匹配 reference

- `references/jsvmp-and-ast.md`：`JSVMP`、flattening、dispatcher 循环、AST 驱动壳层
- `references/ast-deobfuscation-playbook.md`：字符串表恢复、helper inline、AST 变换、bundle 拆包
- `references/wasm-worker-webpack.md`：`worker`、`wasm`、`webpack/runtime`、bootstrap、loader 逻辑
- `references/protocol-and-long-connection.md`：协议包络、ack、heartbeat、renewal、SSE、WebSocket 状态
- `references/rs-recovery-anchors.md`：`r2mKa`、`cp0/cp2/cp6`、`cp3 -> keys`、`$_ts.l__ appcode`

### 3. 一旦出现桥接候选或算子候选，就补验证 reference

- `references/equivalence-and-validation.md`

### 4. recover 不再是主问题时立刻切换

- sink 或上游依赖链仍在猜时，切回 `$jsr-locate`
- 算子已经看见，但本地执行仍受运行时状态、反调试或分支条件影响时，切 `$jsr-runtime`

## Recover 必须证明

- 遮蔽层类型
- 桥接边界
- 状态载体
- 关键算子或最小可用算子切片
- 最小充分恢复深度，而不是最大化去混淆

## 护栏

- 只要桥接合约或算子切片就能解决时，不要直接做完整反编译。
- 当前深度还能支撑任务时，不要从 A 级直接升到 B / C 级。
- 瑞数场景里，不要把整页代码当主目标；优先抓 `r2mKa`、`cp`、keys 路径、`$_ts.l__`。
- 上游响应、浏览器状态、时间窗依赖没复核前，不要宣称可以纯算法迁移。

## 退出条件

只有 locate、replay 或 validation 已经能继续，而不必重新拆同一层壳时，才离开 recover。
