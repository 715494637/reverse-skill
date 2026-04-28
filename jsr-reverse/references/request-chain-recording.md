# Request Chain Recording

## Purpose

`请求链路.md` is the **single consolidated artifact** for the entire reverse task lifecycle. It absorbs evidence, recovery, runtime, validation, and handoff records into one file with clearly separated sections.

This file defines the recording format, lifecycle states, and quality rules. Use it when the evidence gate runs, when stage conclusions must be persisted, or when any material change needs to be recorded.

## Record Lifecycle

### State Machine

```text
draft → evidence-partial → evidence-complete → recover-annotated → runtime-fitted → validated → handoff-ready
```

### State Definitions

| State | Entry condition | What must be present |
|---|---|---|
| `draft` | Intake done; target stated but not captured | Header skeleton; `当前样本状态` = `待确认` |
| `evidence-partial` | At least one real sample captured; chain incomplete | Header + at least one request block with partial fields; gaps in `关键未闭环` |
| `evidence-complete` | Target confirmed from real sample; all fields filled; upstream expanded or marked `无` | All request blocks complete; sample state updated; `关键未闭环` has only non-evidence items |
| `recover-annotated` | Recovery conclusions appended | `恢复补充` section with at least one contract card |
| `runtime-fitted` | Runtime dependency set recorded | `运行时补充` section with `必需对象` and `必需状态` |
| `validated` | Checkpoint comparison completed | `验证补充` section with checkpoint table; all checkpoints concluded |
| `handoff-ready` | All sections consistent; residual gaps named | `交接块` filled; next reader can verify solved vs. open |

### Transition Rules

- Forward-only under normal flow. A record at `runtime-fitted` does not go back to `evidence-partial`.
- **Exception — invalidation**: If a later stage disproves a prior conclusion, the record regresses to the earliest affected state. The invalidated fact must be struck through, and the regression noted in `关键未闭环`.
- Not every record reaches `handoff-ready`. L1/L2 tasks may skip recover and runtime annotations.
- The current state is inferred from which sections exist and are complete — no explicit state field needed.

## Record Path

```text
reverse-records/
├── 请求链路.md          ← single consolidated artifact
└── session-state.json   ← machine-readable state (see Session Recovery Protocol)
```

## File Structure Overview

The artifact is organized into **clearly separated zones**. Each zone has a single owner and a defined purpose:

```text
┌─────────────────────────────────────────────┐
│  HEADER — 全局摘要与样本状态                    │
├─────────────────────────────────────────────┤
│  EVIDENCE ZONE — 请求区块（可多个）              │
│  ├── 请求A｜目标请求                           │
│  ├── 请求B｜上游请求                           │
│  └── ...                                    │
├─────────────────────────────────────────────┤
│  RECOVERY ZONE — 恢复补充（按需）               │
├─────────────────────────────────────────────┤
│  RUNTIME ZONE — 运行时补充（按需）              │
├─────────────────────────────────────────────┤
│  VALIDATION ZONE — 验证补充（按需）             │
├─────────────────────────────────────────────┤
│  HANDOFF ZONE — 交接块                        │
├─────────────────────────────────────────────┤
│  CONNECTION ZONE — 连接信息（按需）             │
└─────────────────────────────────────────────┘
```

---

## Zone 1: Header

```markdown
# 请求链路

> **目标请求**：`POST /api/xxx`
> **目标对象**：登录校验 / token 生成 / cookie 链路 / ...
> **复杂度**：L1 / L2 / L3 / L4
> **当前样本状态**：待确认 / 正常态 / 风控态
> **关键未闭环**：x-token 来源未闭环 / 无
> **样本编号**：S-001
> **证据编号**：E-001
```

Rules:
- `目标请求` must be the actual HTTP method + path, not a description.
- `复杂度` is set at intake and only revised upward.
- `关键未闭环` lists the most critical unresolved items. Empty = `无`.

---

## Zone 2: Evidence — Request Blocks

Each request gets one block. The target request must come first.

### Status Vocabulary

Field `状态` is always an array. Use these terms:

| Category | Terms |
|---|---|
| Visibility | `未知` `已知` `固定` `动态` |
| Encoding | `明文` `加密` |
| Origin | `本地计算` `响应获取` `环境产生` |
| Lifecycle | `会话相关` `风控相关` `时序相关` `一次性` `可复用` |
| Cookie | `HttpOnly` |

Example: `["动态", "响应获取", "HttpOnly", "会话相关"]`

### Request Block Template

```markdown
---

## 请求A｜目标请求

| 项目 | 内容 |
|---|---|
| **接口** | `POST /api/verify` |
| **触发方式** | 提交登录表单 |
| **上游请求** | `请求B`、`请求C` / 无 |
| **响应结果** | 200 OK / 412 Challenge / ... |

### 输入字段

> 每个输入字段必须有 `状态` + `来源` + `证据`

**请求头**
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| `x-token` | `["动态","响应获取","会话相关"]` | `请求B.response.token → 请求A.header.x-token` | 响应包对照 |

**Query 参数**
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| — 无 | — | — | — |

**Body 参数**
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| `payload` | `["动态","本地计算","一次性"]` | `concat(uid, ts, nonce) → encrypt → 请求A.body.payload` | 发送前断点 |

**Cookie**
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| `session_id` | `["动态","响应获取","HttpOnly"]` | `请求B.Set-Cookie → 请求A.cookie.session_id` | Set-Cookie 头 |

### 响应输出

> 每个输出字段必须有 `状态` + `去向` + `证据`

| 字段 | 状态 | 去向 | 证据 |
|---|---|---|---|
| `token` | `["动态","响应获取","可复用"]` | `→ 请求C.header.Authorization` | 响应包 |
```

### Field & Formatting Rules

- Input fields: `状态 / 来源 / 证据`
- Response fields: `状态 / 去向 / 证据`
- `来源` and `去向` must show real linkage: `请求B.response.field → 请求A.header.field`
- If no fields exist, use: `| — 无 | — | — | — |`
- If no upstream request exists, write `无` in the metadata row
- Evidence must be verifiable (packet capture / response body / pre-send comparison)
- If normal and risk samples diverge, keep the split visible in field evidence
- If upstream is still being expanded, record the last proven boundary and the next unproven hop

---

## Zone 3: Recovery Supplement

Added when `recover` produces conclusions. This zone absorbs what would otherwise go in a separate `恢复记录.md`.

```markdown
---

## 恢复补充

> **当前状态**：部分完成 / 已确认
> **遮蔽层类型**：JSVMP / AST / worker / WASM / webpack / 协议封装
> **恢复级别**：A / B / C
> **停止理由**：当前级别已足够支撑下游 runtime/validation
> **入口锚点**：`函数名 / 位置 / 证据`

### 层级摘要

| 项目 | 内容 |
|---|---|
| 语义边界 | |
| 桥接契约 | |
| 状态载体 | |
| 关键数据结构 | |
| 协议语义 | 无 / 具体内容 |
| 已确认映射 | `_$a3 → sign builder` / ... |

### 关键函数卡片

#### `buildSign()` — 签名构造器

| 项目 | 内容 |
|---|---|
| **输入** | `(uid, timestamp, nonce)` |
| **输出** | `hex string 32 chars` |
| **副作用** | 写入 `window._cache` |
| **依赖** | `constantPool[3]` |
| **证据** | 断点 + 输入输出对照 |

### 未恢复缺口

- 缺口1：dispatcher 内部 opcode 7-12 语义未确认
- 缺口2：...
```

---

## Zone 4: Runtime Supplement

Added when `runtime` diagnoses divergence. Absorbs what would otherwise go in `运行态清单.md`.

```markdown
---

## 运行时补充

> **当前状态**：部分完成 / 已确认
> **目标链路**：`buildSign() → encrypt() → serialize()`
> **浏览器现象**：正常返回 200
> **本地现象**：返回 412 / 值不一致

### 执行路线

| 项目 | 内容 |
|---|---|
| 适配检查 | 通过 / 不通过 / 不适用 |
| 执行模式 | 本地回放 / 远程被动 / 远程主动 / 不适用 |
| 浏览器画像 | Chrome 120 Windows |
| 注入时机 | DOM ready 前 |
| 状态闭合信号 | `location.replace` / 请求回调 / 不适用 |
| 状态载体 | `cookieJar` / redirect URL / 不适用 |

### 必需对象

| 对象 | 必要性 | 证据 | 去掉后现象 |
|---|---|---|---|
| `window.crypto` | 链路直接调用 | 调用栈 | TypeError |
| `navigator.userAgent` | 指纹分支 | 条件断点 | 风控态 |

### 必需状态

| 状态 | 标签 | 来源 | 必要性 | 证据 | 去掉后现象 |
|---|---|---|---|---|---|
| `session_cookie` | `["会话相关","HttpOnly"]` | 请求B Set-Cookie | 链路前置 | 响应包 | 401 |

### 固定源

| 项目 | 内容 |
|---|---|
| 时间源 | `Date.now()` 固定为 1714300000000 |
| 随机源 | `Math.random()` 固定为 0.5 |
| 种子 | 无 / 具体值 |

### 纯算迁移前检查

| 检查项 | 结论 | 证据 |
|---|---|---|
| 上游响应 | 依赖 / 无依赖 | |
| HttpOnly | 依赖 / 无依赖 | |
| 一次性 challenge | 依赖 / 无依赖 | |
| 浏览器内部状态 | 依赖 / 无依赖 | |
| 指纹采集 | 依赖 / 无依赖 | |
| 时间窗 / 序号 / 续期 | 依赖 / 无依赖 | |

### 反调试（仅在影响链路时填写）

| 点位 | 现象 | 最小处理 | 命中表面 | 证据 |
|---|---|---|---|---|

### 指纹归因（仅在影响链路时填写）

| 表面 | 采集器 | 聚合点 | 消费点 | 是否必需 | 证据 |
|---|---|---|---|---|---|

### 风控分支（仅在影响链路时填写）

| 分支点 | 触发条件 | 结果 | 证据 |
|---|---|---|---|

### 可移除项

| 项目 | 去掉后现象 | 结论 | 证据 |
|---|---|---|---|
```

---

## Zone 5: Validation Supplement

Added when `validation` runs checkpoint comparisons. Absorbs what would otherwise go in `验证记录.md`.

```markdown
---

## 验证补充

> **当前状态**：待验证 / 已确认 / 阻塞
> **验证目标**：签名值一致性 / cookie 链路完整性 / ...
> **固定输入**：S-001 样本 + 固定时间 + 固定随机

### 检查点对比

| # | 检查点 | 浏览器侧 | 本地/恢复侧 | 结果 | 证据 | 剩余缺口 |
|---|---|---|---|---|---|---|
| 1 | buildSign 输入 | `(uid, 1714300000, "abc")` | 同左 | 一致 | 断点 | — |
| 2 | encrypt 输出 | `a3f2...` (32 hex) | `a3f2...` (32 hex) | 一致 | 对比 | — |
| 3 | 最终请求 payload | `{"sign":"a3f2..."}` | `{"sign":"a3f2..."}` | 一致 | 抓包 | — |

### 结论

- **已确认**：检查点 1-3 全部一致
- **未确认**：风控态路径未测试
- **需要补充的证据**：风控态样本
```

---

## Zone 6: Handoff Block

Always present when handing off to the next reader or session.

```markdown
---

## 交接块

> **当前阶段**：recover
> **最后更新**：2026-04-28
> **复杂度**：L3

| 项目 | 内容 |
|---|---|
| 目标请求 | `POST /api/verify` — `payload` 字段 |
| 已确认链路 | 请求B → 请求A，token 来源已闭环 |
| 写入边界 | `buildSign()` at main.js:1234 |
| 已恢复契约 | A 级 — 关键 opcode 已提取 |
| 运行时分歧点 | N/A（未进入 runtime）|
| 未闭环点 | dispatcher opcode 7-12 语义 |
| 下一步建议 | 继续 recover B 级，恢复 dispatcher 状态载体 |
```

---

## Zone 7: Connection Info (Optional)

For WebSocket, protobuf, SSE, heartbeat, or renewal flows.

```markdown
---

## 连接信息

| 项目 | 内容 |
|---|---|
| 连接 | `wss://example.com/ws` |
| 当前状态 | authenticated |
| 会话标识 | `session_id` from handshake response |
| 序号规则 | 递增整数，从 1 开始 |
| ack 规则 | 每个 business 消息需要 ack |
| 续期条件 | token 过期前 60s 发送 renewal |
```

---

## Dynamic Entry Stability (Optional)

When a located entry is a dynamic alias or resolver, record its stability:

```markdown
---

## 动态入口稳定性

| 项目 | 内容 |
|---|---|
| 包装链 | `resolver → alias → real entry` |
| 触发条件 | 页面加载后 2s 内 |
| 最小运行时前置 | DOM ready + session cookie |
| 残余风险 | alias 可能因版本更新变化 |
```

---

## Evidence Quality Rules

- Every request field entry must include `状态` + `来源/去向` + `证据`
- Evidence must be verifiable: packet capture, response body, pre-send comparison, breakpoint observation
- Guesses are not evidence — record them in `关键未闭环` instead
- The artifact is sufficient when another reader can verify: what is real now, what remains open, and whether the sample is normal, risk, or unresolved
- When recording `来源`, show the complete data flow path: `请求B.response.token → 请求A.header.x-token`
- When normal and risk paths diverge, keep both visible — do not merge into one ambiguous conclusion
