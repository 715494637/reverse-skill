# Request-Chain Recording Refactor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `jsr-reverse/references/request-chain-recording.md` into a handoff-first, traceable, low-noise spec that keeps only information useful to reverse work and handoff continuity.

**Architecture:** Single-file documentation refactor. Keep a single canonical record file at `reverse-records/请求链路.md`. Rebuild the document into six top-level blocks (Purpose, Record Path, Header Skeleton, Request Block Skeleton, Handoff Block, Connection Info optional), with status vocabulary, field rules, and example nested under Request Block Skeleton.

**Tech Stack:** Markdown documentation

---

## File Structure (locked before tasks)

**Modify:**
- `jsr-reverse/references/request-chain-recording.md`

**Do not modify:**
- Any other references or skills
- Chinese version under `zh/`

---

## Chunk 1: Rebuild document structure and core blocks

### Task 1: Rewrite top-level sections and required blocks

**Files:**
- Modify: `jsr-reverse/references/request-chain-recording.md`

- [ ] **Step 1: Snapshot current content**

Run: `git diff jsr-reverse/references/request-chain-recording.md`
Expected: baseline reference only.

- [ ] **Step 2: Replace top-level structure**

Ensure the document uses exactly these top-level sections in this order:
1. `## Purpose`
2. `## Record Path`
3. `## Header Skeleton`
4. `## Request Block Skeleton`
5. `## Handoff Block`
6. `## Connection Info (Optional)`

No other top-level sections are allowed.

- [ ] **Step 3: Fill the Purpose + Record Path blocks (verbatim)**

```markdown
## Purpose

`请求链路.md` is the canonical request-structure artifact for handoff and traceability. Keep it compact and scan-friendly.

This file records only:

- request blocks
- field status arrays
- source and downstream proof
- upstream expansion
- optional connection metadata

Do not mix in stage summaries, runtime decisions, or recovery conclusions.

## Record Path

Write records under the current task working directory:

```text
reverse-records/
└─ 请求链路.md
```

Keep a single `reverse-records/` directory per task. Keep updating the file in place and do not create per-session subfolders.
```

- [ ] **Step 4: Insert Header Skeleton block (verbatim)**

```markdown
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
```

- [ ] **Step 5: Insert Request Block Skeleton and nested rules**

```markdown
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
- If a field table has no fields, insert a single row: `| - 无 | - | - | - |`.
- If there is no upstream request, write `无` in the request metadata row for upstream.
- Evidence must be verifiable (packet capture / response body / pre-send comparison); do not record guesses as evidence.

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
```

- [ ] **Step 6: Insert Handoff Block (verbatim)**

```markdown
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
```

- [ ] **Step 7: Insert Connection Info (Optional) block**

```markdown
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
```

- [ ] **Step 8: Remove low-value sections**

Delete these legacy sections if present:
- Visual Style
- Multi-file record path list (总览/运行态清单/恢复记录/验证记录)
- Long quality checklist (replace with the short Evidence Reminder above)

- [ ] **Step 9: Run targeted diff**

Run: `git diff jsr-reverse/references/request-chain-recording.md`
Expected: only restructuring, section removal, and insertion of the defined blocks above.

---

## Chunk 2: Consistency verification

### Task 2: Verify formatting and example compliance

**Files:**
- Verify: `jsr-reverse/references/request-chain-recording.md`

- [ ] **Step 1: Top-level section check**

Verify in the final document that:
- Only these six top-level sections exist: Purpose, Record Path, Header Skeleton, Request Block Skeleton, Handoff Block, Connection Info (Optional)
- No additional top-level sections remain
- Record Path only lists `reverse-records/请求链路.md` (no multi-file list; no 总览/运行态清单/恢复记录/验证记录)
- Connection Info block is explicitly scoped to protocol flows only (WebSocket/protobuf/SSE/heartbeat/renewal)
- Summary content appears only in Header Skeleton (no stage summaries elsewhere)
- Closure status is only `当前样本状态` + `关键未闭环` (no other summary fields)

- [ ] **Step 2: Example checks**

Confirm the example includes:
- Only one minimal example
- Header summary block
- One target request block (target request appears before any upstream request; combined with closed upstream chain check)
- Verifiable source/evidence in the example fields (no guesses)
- Header/query/body/cookie/response tables (if a category is absent in the example, the table contains a single `| - 无 | - | - | - |` row; the same `| - 无 | - | - | - |` format applies to response tables)
- Closed upstream chain (every upstream reference in the target request has a concrete source in an earlier request or is marked `无`)
- Handoff block

- [ ] **Step 3: Vocabulary and field rules**

Confirm:
- Status vocabulary list is present and unchanged (match tokens and order exactly)
- Status vocabulary example JSON is present and unchanged (`["动态", "响应获取", "HttpOnly", "会话相关"]`, exact text)
- Table headers match the fixed skeleton in the spec
- Input tables use `状态 / 来源 / 证据` and response tables use `状态 / 去向 / 证据`
- Request metadata table does not require status/evidence columns
- Empty table row format is exactly `| - 无 | - | - | - |` (applies to all field tables including response)
- Upstream is `无` in the request metadata row when there is no upstream request
- Evidence is verifiable (packet capture / response body / pre-send comparison) and does not record guesses

---

## Chunk 3: Final review & optional commit

### Task 3: Final checks

**Files:**
- Modify: none

- [ ] **Step 1: Diff review**

Run: `git diff jsr-reverse/references/request-chain-recording.md`
Expected: only the spec changes described above.

- [ ] **Step 2: Status check**

Run: `git status -s`
Expected: only `jsr-reverse/references/request-chain-recording.md` modified.

- [ ] **Step 3: Commit (optional, after verification)**

```bash
git add jsr-reverse/references/request-chain-recording.md
git commit -m "docs: refactor request-chain recording spec"
```

---

## Test Plan

- No automated tests (documentation-only change).
- Manual verification via section order and example checks.
