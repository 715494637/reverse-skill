---
name: jsr-locate
description: Use when a dynamic request field, header, cookie, websocket frame, worker message, challenge token, or RS/瑞数-style two-hop artifact chain must be traced to its real write boundary and upstream state dependencies.
---

# JSR Locate

## Overview

Use this skill to prove the real source chain of a dynamic field and close the locate stage at the real write boundary.

Locate is complete only when you can answer:

- where the value is finally written
- where the value comes from
- which upstream state closes the chain
- whether normal-state and risk-state flows use the same or different builders

## Self-Contained Rule

- Assume only this `SKILL.md` is guaranteed to be loaded.
- Do not block on opening `references/` before acting.
- The record skeletons below are canonical even if no other file is opened.
- All execution records must be written in Chinese directly under `reverse-records/`.
- Do not create per-session subfolders; update the current task files in place.

## Minimum Input

Start from this intake block:

```text
Target request:
Target field:
Final sink (if known):
Trigger action:
Current state: normal / risk / unknown
Known evidence:
Constraints:
```

Required:

- `Target request`
- `Target field`
- `Current state`
- `Known evidence`
- `Constraints`

Add these when relevant:

- `Connection family`
- `Message type`
- `Current connection state`
- `First-hop URL or 204 page`
- `RS indicators`
- `Second-hop evidence`

## Core Working Order

1. Capture one browser normal-state sample before discussing risk-state or replay.
2. Classify the sink: `query / body / header / cookie / storage / WebSocket frame / worker reply / hidden DOM field`.
3. Classify the trigger and mutation model.
4. For sign, token, header, or encrypted-parameter entry work, start from `live request -> initiator stack -> candidate frame -> argument proof`, not broad text grep.
5. For RS/瑞数-style tasks, capture `204 or landing page -> inline $_ts -> meta[r=m] -> external r2mKa -> $_ts.l__ appcode -> second hop` as one locate chain.
6. If first-hop output is consumed later, do not accept one-hop closure; collect produced cookie, redirect target, or route clue and treat second-hop evidence as mandatory.
7. As soon as response fields, `Set-Cookie`, `HttpOnly`, challenge, session state, or device state matter, start `请求链路.md` and expand the state chain before deeper code reading.
8. Find the nearest sink first; then separate `entry -> builder -> writer`.
9. Label each field as fixed, dynamic, encrypted, locally computed, response-derived, or environment-derived.
10. Expand upstream until the chain reaches the request that produces a normal response.
11. Record the normal path, risk fallback path, fork point, and missing state when risk branching exists.
12. If semantics are hidden behind `jsvmp`, `worker`, `wasm`, flattening, or wrappers, hand off to `$jsr-recover`.
13. If the sink is known but browser and local execution diverge, or debugging destabilizes the result, hand off to `$jsr-runtime`.

## Required Record Files

### 总览.md

Use this exact shape:

```markdown
# 总览

- 当前阶段：定位
- 当前状态：🟡 待确认（部分完成） / ✅ 已确认 / ⛔ 阻塞
- 目标请求：
- 目标字段：
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

## 正常态 / 风控态对比（按需）
| 项目 | 正常态 | 风控态 | 是否同链 |
|---|---|---|---|
| 触发动作 |  |  |  |
| 上游请求 |  |  |  |
| 写点 |  |  |  |
| 组装链 |  |  |  |
| Cookie / 状态依赖 |  |  |  |
```

### 请求链路.md

Use one request per section:

```markdown
# 请求链路

- 目标请求：
- 目标对象：
- 当前样本状态：🟡 待确认（正常态 / 风控态 / 未知）
- 关键未闭环：
- 样本编号：
- 证据编号：

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
| `头1` | `["动态","响应获取","会话相关"]` | `请求B.response.token -> 请求A.header.头1` | `发送前对照` |

### Query 参数
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| `参数1` | `["固定","明文"]` | `页面固定值 -> 请求A.query.参数1` | `抓包` |

### Body 参数
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| `参数2` | `["动态","响应获取","一次性"]` | `请求C.response.ticket -> 请求A.body.参数2` | `响应包` |

### Cookie
| 字段 | 状态 | 来源 | 证据 |
|---|---|---|---|
| `cookie1` | `["动态","响应获取","HttpOnly","会话相关"]` | `请求B.Set-Cookie.cookie1 -> 请求A.cookie.cookie1` | `Set-Cookie` |

### 响应输出
| 字段 | 状态 | 去向 | 证据 |
|---|---|---|---|
| `response.field1` | `["动态","响应获取","可复用"]` | `请求A.response.field1 -> 请求D.header.头2` | `响应包` |
```

### 验证记录.md

Start this as soon as a sink hypothesis, state-chain closure, or fork claim needs proof:

```markdown
# 验证记录

## 验证项1｜名称
- 触发阶段：定位 / 验证
- 归属阶段：验证
- 当前结果：🔍 待验证 / ✅ 一致 / 🟡 部分一致 / ⛔ 不一致
- 验证目标：

### 固定输入
| 项目 | 内容 |
|---|---|
| 输入样本 |  |
| 会话状态 |  |
| 页面动作 |  |

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

## Deliverables

- proven final sink of the target field
- `entry -> builder -> writer` relation
- state chain for response fields, `HttpOnly`, challenge, session state, or device state when relevant
- first-hop / second-hop route note for RS/瑞数 tasks
- prerequisite requests, response fields, state carriers, and triggers
- normal/risk fork map when risk branching matters
- connection state chain and message-family map for protocol tasks

## Failure Output

When locate work is incomplete, record:

```yaml
状态: 就绪 | 部分完成 | 阻塞
阶段: 定位
代码:
摘要:
证据:
  - ...
影响:
下一动作:
```

Use `部分完成` when there is a candidate chain but sink proof, source proof, fork proof, or RS second-hop closure is still open.
Use `阻塞` when no usable normal sample, no sink candidate, or no upstream state closure exists.

## Optional Extensions

If `references/` are available, use them only to deepen the current work, not to decide the base workflow:

- `references/locate-workflow.md`
- `references/request-chain-recording.md`
- `references/hook-and-boundary-patterns.md`
- `references/crypto-entry-locating.md`
- `references/rs-collection-and-two-hop-routing.md`
- `references/record-overview-and-validation.md`

## Completion Criteria

- the final sink is proven
- the source class is proven as local, upstream, environment, or mixed
- upstream dependencies are expanded until the normal response is reached
- the next stage can proceed without repeating locate work
