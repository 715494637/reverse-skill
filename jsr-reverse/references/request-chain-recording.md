## Purpose

`请求链路.md` is the standard evidence artifact used by `jsr-reverse` for the evidence gate and early locate work. Keep it compact, artifact-first, and handoff-ready.

This file records only:

- request blocks
- field status arrays
- source and downstream proof
- upstream expansion
- optional connection metadata
- current sample state and handoff-ready closure state

Use it when the target request is still not confirmed from a real sample, the upstream chain is still partly guessed, normal and risk chains are still mixed, or the current evidence is not yet concrete enough to start locate as a method task.

This artifact does not own stage routing, runtime fit, recovery conclusions, or final equivalence proof.

A record is ready to hand off into locate when the target request is real, request metadata is concrete, upstream has been expanded or explicitly marked as none, evidence is verifiable, and the current sample state plus key open gaps are stated clearly.

## Record Lifecycle

`请求链路.md` progresses through a defined lifecycle. Each state has entry conditions and required fields. Use this to judge "what is still missing" at any point.

### State Machine

```text
draft → evidence-partial → evidence-complete → recover-annotated → runtime-fitted → validated → handoff-ready
```

### State Definitions

| State | Entry condition | Required content |
|---|---|---|
| `draft` | Intake done, target request stated but not yet captured | Header skeleton only; `当前样本状态` = `🟡 待确认` |
| `evidence-partial` | At least one real request sample captured, but upstream chain or field status is incomplete | Header skeleton + at least one request block with partial field tables; open gaps listed in `关键未闭环` |
| `evidence-complete` | Target request confirmed from real sample, all field statuses filled, upstream expanded or marked `无` | All request blocks complete; `当前样本状态` updated to `正常态` or `风控态`; `关键未闭环` is either empty or lists only non-evidence items |
| `recover-annotated` | Recovery conclusions appended (layer cards, boundary cards, key-function cards) | `恢复补充` section present with at least one contract card |
| `runtime-fitted` | Runtime dependency set recorded | `运行时补充` section present with `必需对象` and `必需状态` lists |
| `validated` | Checkpoint comparison completed | `验证补充` section present with checkpoint table; all checkpoints have conclusions |
| `handoff-ready` | All sections consistent, no contradictions between sections, residual gaps explicitly named | `交接块` filled; another reader can verify what is solved vs. open |

### Transition Rules

- Transitions are **forward-only** under normal flow. A record at `runtime-fitted` does not go back to `evidence-partial`.
- **Exception — invalidation**: If a later stage disproves a prior conclusion (e.g., runtime reveals the write boundary was wrong), the record regresses to the earliest affected state. The invalidated fact must be struck through or removed, and the regression must be noted in `关键未闭环`.
- Not every record reaches `handoff-ready`. Simple tasks (L1/L2) may go `draft → evidence-complete → validated → handoff-ready`, skipping recover and runtime annotations.
- The current state should be inferable from which sections are present and complete. No explicit state field is needed in the artifact — the state machine is a judgment tool, not a metadata field.

## Record Path

Write records under the current task working directory:

```text
reverse-records/
└─ 请求链路.md
```

Keep a single `reverse-records/` directory per task and keep updating this one file in place.

## Header Skeleton

Start `请求链路.md` with a short summary block:

```markdown
# 请求链路

- 目标请求：
- 目标对象：
- 当前样本状态：🟡 待确认（正常态 / 风控态 / 未知）
- 关键未闭环：
- 样本编号：
- 证据编号：
```

## Request Block Skeleton

### Status Vocabulary

Keep `状态` as an array and use the original vocabulary:

- `未知`
- `已知`
- `固定`
- `动态`
- `明文`
- `加密`
- `本地计算`
- `响应获取`
- `环境产生`
- `会话相关`
- `风控相关`
- `时序相关`
- `一次性`
- `可复用`
- `HttpOnly`

Example:

```json
["动态", "响应获取", "HttpOnly", "会话相关"]
```

### Field & Formatting Rules

- Input fields use `状态 / 来源 / 证据`.
- Response fields use `状态 / 去向 / 证据`.
- Keep `来源` and `去向` concrete enough to show real upstream or downstream linkage; do not collapse them into vague labels.
- If a field table has no fields, insert a single row: `| - 无 | - | - | - |`.
- If there is no upstream request, write `无` in the request metadata row for upstream.
- Evidence must be verifiable (packet capture / response body / pre-send comparison); do not record guesses as evidence.
- If upstream is still being expanded, record the last proven boundary and the next unproven hop explicitly.
- If normal and risk samples diverge, keep that split visible in request metadata or field evidence instead of merging them into one conclusion.

### Request Block Skeleton (tables are fixed)

```markdown
## 请求A｜目标请求

| 项目 | 内容 |
|---|---|
| 接口 |  |
| 触发方式 |  |
| 上游请求 | `请求B`、`请求C` / 无 |
| 响应结果 |  |

### 请求头
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|

### Query 参数
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|

### Body 参数
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|

### Cookie
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|

### 响应输出
| 字段 | 状态 | 去向 | 证据 |
|---|---|---|---|
```

### Example (minimal)

```markdown
# 请求链路

- 目标请求：/api/verify
- 目标对象：登录校验
- 当前样本状态：🟡 待确认（正常态 / 风控态 / 未知）
- 关键未闭环：x-token 来源未闭环
- 样本编号：S-001
- 证据编号：E-001

## 请求A｜目标请求

| 项目 | 内容 |
|---|---|
| 接口 | /api/verify |
| 触发方式 | 提交登录表单 |
| 上游请求 | 无 |
| 响应结果 | 200 |

### 请求头
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| `x-token` | `["动态","响应获取","会话相关"]` | `请求A.response.token -> 请求A.header.x-token` | `响应包` |

### Query 参数
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| - 无 | - | - | - |

### Body 参数
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| `payload` | `["动态","响应获取","一次性"]` | `请求A.response.ticket -> 请求A.body.payload` | `响应包` |

### Cookie
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| - 无 | - | - | - |

### 响应输出
| 字段 | 状态 | 去向 | 证据 |
|---|---|---|---|
| `token` | `["动态","响应获取","可复用"]` | `请求A.response.token -> 请求B.header.x-token` | `响应包` |
```

### Evidence Reminder

- Every request field entry must include status, source/target, and evidence.
- The artifact is sufficient only when another reader can verify what is real now, what remains open, and whether the current sample is normal, risk, or still unresolved.

## Handoff Block

```markdown
## 交接块

- 当前阶段：
- 最后更新时间：
- 目标请求与关键字段：
- 已确认链路：
- 未闭环点：
- 下一步建议：
```

If runtime, recovery, or validation facts matter for handoff, append them here as compact supplements.

## Connection Info (Optional)

For `WebSocket`, `protobuf`, SSE, heartbeat, or renewal flows, add one compact connection section at the end:

```markdown
## 连接信息

| 项目 | 内容 |
|---|---|
| 连接 |  |
| 当前状态 |  |
| 会话标识 |  |
| 序号规则 |  |
| ack 规则 |  |
| 续期条件 |  |
```
