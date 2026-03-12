# Request-Chain Recording

## Purpose

`请求链路.md` is the canonical request-structure artifact. Keep it compact and scan-friendly.

This file records only:

- request blocks
- field status arrays
- source and downstream proof
- upstream expansion
- optional connection metadata

Do not mix in stage summaries, runtime decisions, or recovery conclusions.

## Visual Style

Use pure Markdown with light status markers:

- `✅ 已确认` for proven facts
- `🟡 待确认` for open closure items
- `⛔ 阻塞` for a missing prerequisite
- `🔍 待验证` for proof that belongs in `验证记录.md`

## Record Path

Write records under the current task working directory:

```text
reverse-records/
├─ 总览.md
├─ 请求链路.md
├─ 运行态清单.md
├─ 恢复记录.md
└─ 验证记录.md
```

Use one flat `reverse-records/` directory per task. Keep updating those files in place and do not create per-session subfolders.

## Status Tags

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

## Writing Rules

- put the target request first
- expand upstream requests after the target request
- one request per section
- keep request metadata in a compact table
- keep field sections in compact tables
- input fields use `状态 / 来源 / 证据`
- response fields use `状态 / 去向 / 证据`
- if a section has no fields, write `- 无`
- if there is no upstream request, write `无`

Do not add separate sections for dependency summary, progress, or final conclusions.

## Request Block Skeleton

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

## Protocol Addition

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

## Quality Check

- the target request is first
- every field keeps a status array
- every field has a concrete source chain or downstream target
- every field has at least one evidence anchor
- the file stays readable without extra summary prose
- progress, forks, runtime notes, and recovery notes are not mixed into this file
