# Equivalence Validation and Recovery Records

## Purpose / Use Boundary

`validation` owns proof, not stage discovery.

Use this reference when the main work is to prove checkpoints, record residual gaps, and separate validated conclusions from still-open recovery work.

Keep recovery and validation content as compact, structural supplements inside `请求链路.md`.

## What Validation Owns

`validation` owns only:

- define concrete checkpoints
- state what proof confirms or rejects each checkpoint
- record residual gaps explicitly
- keep recovery supplements separate from validation supplements
- state the stop condition for a defensible proof claim

## Recovery Record Contract

The `恢复补充` section inside `请求链路.md` is the recovery-side contract. It should contain only the recovered structure needed for later proof:

- layer cards
- boundary cards
- recovery level
- stop reason
- state carriers
- key-function cards

Keep layer names explicit, such as `外层容器`, `调度层`, `状态载体`, `桥接层`, `核心算子`, `写回层`.

Every key-function card must state `输入 / 输出 / 副作用 / 依赖 / 证据`.

Suggested skeleton when only `请求链路.md` is writable:

```markdown
## 恢复补充

- 当前状态：🟡 待确认（部分完成）
- 目标：
- 目标工件：
- 遮蔽层类型：
- 恢复级别：A级 / B级 / C级
- 当前结论：
- 入口锚点：
- ➡️ 下一恢复点：

## 层级摘要
| 项目 | 内容 |
|---|---|
| 停止理由 |  |
| 语义边界 |  |
| 桥接契约 |  |
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

## Validation Proof Contract

The `验证补充` section inside `请求链路.md` is the proof-side contract. Each equivalence check must answer:

- which input sample is fixed
- which checkpoint is being compared
- which evidence proves the checkpoint, not just the final output
- which gap remains if the result is only partially equivalent

Typical checkpoints include:

- bridge contract input and output
- recovered operator input and output
- dispatcher or state-carrier transitions
- extracted result before write-back

Suggested skeleton when only `请求链路.md` is writable:

```markdown
## 验证补充

- 当前状态：🔍 待验证 / ✅ 已确认 / ⛔ 阻塞
- 验证目标：
- 固定输入：
- 对比范围：
- 当前结论：
- 剩余缺口：
- ➡️ 下一验证点：

## 检查点对比
| 检查点 | 浏览器侧 | 本地/恢复侧 | 结果 | 证据 | 剩余缺口 |
|---|---|---|---|---|---|
| 检查点1 |  |  |  |  |  |

## 结论
- 已确认：
- 未确认：
- 需要补充的证据：
```

## Stop / Completion Standard

Validation can stop only when all of the following are explicit:

- checkpoints are concrete rather than “final output looks close”
- fixed input is stated
- each confirmed checkpoint has direct evidence
- residual gaps are named instead of hidden in prose
- recovery conclusions and validation conclusions remain separated

A proof is sufficient only if the next reader can see exactly what is equivalent, what is not yet equivalent, and what evidence supports each statement.

## Does Not Own

`validation` does not own:

- request-chain capture guidance
- runtime divergence classification
- runtime artifact formatting
- global workflow routing
- deeper recovery work that still lacks a readable contract
