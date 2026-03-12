---
name: jsr-locate
description: Use when a dynamic request field, sign, token, header, cookie, websocket frame, worker message, or RS/瑞数 two-hop artifact source is unknown and must be traced to a real write boundary and upstream state chain.
---

# JSR Locate

## 角色

只有当前卡点明确属于“来源证明”时才用这个 skill。

适用场景：

- 最终写入边界还没证实
- 字段来源还在猜
- 上游响应或状态依赖还没闭合
- 首跳 / 二跳链路还没闭合

不适用场景：

- sink 已证实，真正卡点是壳层恢复
- sink 已证实，真正卡点是浏览器与本地执行分叉

如果当前阶段还不明确，先走 `$jsr-reverse`。

## 输入块

先收这块输入：

```text
URL 或目标页面：
目标请求：
目标字段 / cookie / 消息：
触发动作：
当前现象：
已有证据：
目标：
约束：
```

## 读取顺序

### 1. 先固定读这两份

- `references/locate-workflow.md`
- `references/request-chain-recording.md`

### 2. 再按症状补一份定向 locate reference

- `references/crypto-entry-locating.md`：`sign`、`token`、动态 header、加密参数、请求侧 crypto 入口
- `references/rs-collection-and-two-hop-routing.md`：`412`、`403`、挑战页、`204` 落地页、内联 `$_ts`、`meta[r=m]`、`r2mKa`、`$_ts.l__`、首跳 / 二跳 cookie 行为
- `references/hook-and-boundary-patterns.md`：hook、断点、initiator tracing、边界观察

### 3. locate 不再是主问题时立刻切换

- 写入边界已经接近，但真实逻辑被 `JSVMP`、AST 壳、`worker`、`wasm`、`webpack/runtime`、协议包裹挡住时，切 `$jsr-recover`
- sink 已证实，但浏览器和本地执行分叉时，切 `$jsr-runtime`

## Locate 必须证明

- 最终 sink 真实存在
- `entry -> builder -> writer`
- 上游响应和状态依赖
- 正常态 / 风控态分叉
- 瑞数场景下首跳产物是否被二跳真实消费

## 护栏

- 已经有真实请求和 initiator 链时，不要先做大范围 grep。
- 真实 writer 还没证实时，不要停在 wrapper、SDK 层或 alias 层。
- 瑞数首跳材料没有经过二跳消费验证前，不算闭合。
- sink 和依赖链没闭合前，不要提前跳到 runtime 补环境。

## 退出条件

只有下游推进已经不再依赖来源证明时，才离开 locate。
