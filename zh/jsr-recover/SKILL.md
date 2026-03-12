---
name: jsr-recover
description: Use when real business logic is hidden by jsvmp, AST transforms, control-flow flattening, worker, wasm, webpack/runtime loaders, protocol wrappers, or RS/瑞数-style r2mKa and cp/appcode shells.
---

# JSR Recover

## 概述

当真实业务逻辑被壳层、调度层或桥接层遮住，表面 beautify 已经无法支撑下游推进时，使用本 skill。

Recover 完成的标准不是“代码好看了”，而是当前层的职责、桥接边界、状态载体和关键算子已经清楚到足以支撑后续 locate、runtime 或重放工作继续推进。

## 自包含规则

- 默认只有这份 `SKILL.md` 会被实际读取。
- 不要因为没打开 `references/` 而停住。
- 下面给出的记录骨架就是权威格式，不依赖其他文件。
- 所有执行记录都直接写入工作目录下的 `reverse-records/`，并且使用中文。
- 不再创建会话子目录；当前任务的记录文件直接在该目录下持续更新。

## 最小输入

开始前先收齐这块输入：

```text
目标：
目标工件：
壳层类型（若已知）：
恢复目标：语义说明 / 关键算子提取 / 最小重建
已知锚点：
验证样本：
约束：
```

必填：

- `目标`
- `目标工件`

按需补充：

- `壳层类型`
- `恢复目标`
- `已知锚点`
- `验证样本`
- `$_ts 样本`
- `r2mKa 锚点`
- `Appcode 锚点`

## 恢复级别

- `A`：只提取当前必须的 opcode、算子或桥接事实
- `B`：恢复 dispatcher 和关键状态载体
- `C`：只有低级别不够时，才做最小反编译或最小解释器

不要默认往上爬级。只在当前级别不足以支撑目标时升级。

## 六层视角

1. `外层容器`：`webpack`、IIFE、loader、bootstrap、懒加载
2. `调度层`：dispatcher、状态机、字节码循环、flattening switch
3. `状态载体`：寄存器、栈、上下文对象、闭包池、表、内存区
4. `桥接层`：`worker` 合约、`wasm` imports/exports、协议编解码壳
5. `核心算子`：hash、签名、加密、指纹逻辑、序列化、挑战逻辑
6. `写回层`：结果最终写入请求、头、`cookie`、帧或存储的位置

## 核心顺序

1. 先判断当前是哪一层遮住了真实逻辑。
2. 先选最低可用的恢复级别 `A / B / C`。
3. 遇到 AST 重度遮蔽，先判混淆家族，再按保留证据的顺序做变换。
4. 遇到 `worker`、`wasm`、`webpack/runtime` 或协议壳，先写桥接合约卡片，再进内部实现。
5. 命中瑞数壳层时，优先沿 `r2mKa -> cp0/cp2/cp6 -> cp3 -> keys 路径 -> $_ts.l__ appcode` 走，不要先对大块 beautify 源码做盲猜。
6. 把 `$_ts.l__` 渲染层或 appcode 包装层当桥接工件，不当页面噪音。
7. 先确认当前层的入口、输入、输出，再决定是否扩范围。
8. 先证明桥接合约或 dispatcher 关系，再提炼核心算子。
9. 在把算子迁成纯算之前，重新检查上游响应、`HttpOnly`、challenge、浏览器状态、指纹和时间窗依赖。
10. 每恢复一层，补一个等价检查点。
11. 如果 sink 还不清楚，切回 `$jsr-locate`。
12. 如果结果仍受运行时状态影响，切 `$jsr-runtime`。

## 必交记录

### `总览.md`

```markdown
# 总览

- 当前阶段：恢复
- 当前状态：🟡 待确认（部分完成） / ✅ 已确认 / ⛔ 阻塞
- 目标：
- 目标工件：
- 当前结论：
- 关键证据：
- ➡️ 下一步：

## ✅ 已确认
- ...

## 🟡 待确认
- ...

## ⛔ 风险 / 阻塞
- ...

## 🔍 待验证
- ...
```

### `恢复记录.md`

```markdown
# 恢复记录

- 当前状态：🟡 待确认（部分完成）
- 目标：
- 目标工件：
- 遮蔽层类型：
- 恢复级别：A / B / C
- 当前结论：
- 入口锚点：
- ➡️ 下一恢复点：

## 层级摘要
| 项目 | 内容 |
|---|---|
| 停止理由 |  |
| 语义边界 |  |
| 桥接合约 |  |
| 状态载体 |  |
| 关键数据结构 |  |
| 协议语义 |  |
| 已确认映射 |  |

## ✅ 关键函数卡片

### 函数1｜名称
| 项目 | 内容 |
|---|---|
| 输入 |  |
| 输出 |  |
| 副作用 |  |
| 依赖 |  |
| 证据 |  |

## 🟡 未恢复缺口
- 缺口1：
- 缺口2：
```

### `验证记录.md`

```markdown
# 验证记录

## 验证项｜名称
- 触发阶段：恢复 / 验证
- 归属阶段：验证
- 当前结果：🔍 待验证 / ✅ 一致 / 🟡 部分一致 / ⛔ 不一致
- 验证目标：

### 固定输入
| 项目 | 内容 |
|---|---|
| 输入样本 |  |
| 时间源 |  |
| 随机源 |  |
| 会话状态 |  |

### 检查点
- `检查点1`
- `检查点2`
- `检查点3`

### 结果
| 项目 | 内容 |
|---|---|
| 浏览器侧输出 |  |
| 本地侧输出 |  |
| 失败样本 |  |
| 差异定位 |  |
| 验证结论 |  |
| ➡️ 后续动作 |  |
```

## 交付要求

- 说明当前遮蔽层属于 `jsvmp / ast / worker / wasm / 协议壳 / 容器壳`
- 说明为什么停在当前恢复级别 `A / B / C`
- 说明入口、桥接边界、状态载体和关键算子
- 瑞数任务补齐 `r2mKa`、`cp`、keys 路径、`$_ts.l__` 的可复用锚点
- `worker`、`wasm`、`webpack`、协议壳场景补桥接合约卡片
- 留下关键函数卡片和等价验证记录

## 失败输出

如果恢复停在半路，直接落这个状态块：

```yaml
状态: 就绪 | 部分完成 | 阻塞
阶段: 恢复
代码:
摘要:
证据:
  - ...
影响:
下一动作:
```

- 已经分清壳层，但桥接、状态载体、关键算子或瑞数锚点还不够时，用 `部分完成`
- 没有稳定入口、没有边界锚点或没有当前级别的验证样本时，用 `阻塞`

## 可选扩展

如果 `references/` 存在，只把它当扩展资料，不当作执行前提：

- `references/recover-strategy.md`
- `references/jsvmp-and-ast.md`
- `references/ast-deobfuscation-playbook.md`
- `references/wasm-worker-webpack.md`
- `references/protocol-and-long-connection.md`
- `references/rs-recovery-anchors.md`
- `references/equivalence-and-validation.md`
- `references/record-overview-and-validation.md`

## 结束条件

- 遮蔽层类型已经明确
- 关键桥接边界或 dispatcher 入口已经明确
- 已有关键函数卡片和等价检查点
- 下游可以直接继续，不必重新拆同一层壳
