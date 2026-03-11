# Request-Chain Recording

## Purpose

`请求链路.md` records only request structure, field status arrays, source proof, upstream expansion, and optional connection metadata.

This reference is the canonical schema for `请求链路.md`.

Do not write the following here:

- current stage, blocker, next step, or summary conclusion
- normal-state versus risk-state fork maps
- runtime patch decisions
- recovery conclusions or equivalence judgments

Those belong in the other record files.

## Record Path

Write records under the current task working directory:

```text
reverse-records/
├─ 会话1/
│  ├─ 总览.md
│  ├─ 请求链路.md
│  ├─ 运行态清单.md
│  ├─ 恢复记录.md
│  └─ 验证记录.md
├─ 会话2/
│  └─ ...
└─ ...
```

Session rules:

- one reverse session uses one `会话N/` folder only
- if the user specifies `会话N`, use only that folder
- if the user does not specify one, create the next unused `会话N/` folder
- never overwrite or edit another `会话N/` folder

## Status Tag Standard

Use arrays and keep the original status vocabulary:

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

## File Header

Start `请求链路.md` with the following top-level fields:

```markdown
# 请求链路

- 样本编号：
- 证据编号：
- 目标请求：
- 目标对象：
- 当前样本状态：正常态 / 风控态 / 未知
- 未闭环项：
```

## Writing Rules

- put the target request first
- expand upstream requests after the target request
- one request block per section
- within each request block, use only these parts: `请求头`, `Query 参数`, `Body 参数`, `Cookie`, `响应输出`
- every request-input field must include `状态`, `来源`, and `证据`
- every `响应输出` field must include `状态`, `去向`, and `证据`
- keep `状态` as an array, not prose
- write `来源` as `来源字段 -> 目标字段`
- write `去向` as `当前响应字段 -> 下游目标字段`
- if a request has no upstream request, write `上游请求：无`
- if a section has no fields, write `- 无`

Do not create separate sections for:

- dependency summaries
- current conclusion
- normal/risk comparison

Dependency is already expressed by per-field `来源/去向` and per-request `上游请求`.

## Request Block Example

```markdown
## 请求A
- 接口：
- 触发方式：
- 响应结果：
- 上游请求：`请求B`、`请求C`

### 请求头
- `头1`
  - 状态：`["动态","响应获取","会话相关"]`
  - 来源：`请求B.response.token -> 请求A.header.头1`
  - 证据：`发送前对照`

### Query 参数
- `参数1`
  - 状态：`["固定","明文"]`
  - 来源：`页面固定值 -> 请求A.query.参数1`
  - 证据：`抓包`

### Body 参数
- `参数2`
  - 状态：`["动态","响应获取","一次性"]`
  - 来源：`请求C.response.ticket -> 请求A.body.参数2`
  - 证据：`响应包`

### Cookie
- `cookie1`
  - 状态：`["动态","响应获取","HttpOnly","会话相关"]`
  - 来源：`请求B.Set-Cookie.cookie1 -> 请求A.cookie.cookie1`
  - 证据：`Set-Cookie`

### 响应输出
- `response.field1`
  - 状态：`["动态","响应获取","可复用"]`
  - 去向：`请求D.header.头2`
  - 证据：`响应包`
```

## Protocol and Long-Connection Addition

For `WebSocket`, `protobuf`, SSE, heartbeat, or renewal flows, keep the ordinary request blocks and add one optional connection section at the end.

```markdown
## 连接信息
- 连接：
- 当前状态：
- 会话标识：
- 序号规则：
- ack 规则：
- 续期条件：
```

## Quality Check

- the target request is first
- every field has a status array
- every field has a concrete source chain or downstream target
- every field has at least one evidence anchor
- upstream expansion is readable without adding separate summary sections
- progress, forks, runtime notes, and recovery notes are not mixed into this file
