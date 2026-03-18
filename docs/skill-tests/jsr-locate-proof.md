# jsr-locate Proof

## 目的

验证 `jsr-reverse` 是否会把“找到候选函数”继续推进成“证明真实写边界”，并先路由到 `locate` 阶段，继续读取 locate 侧 reference，而不是停在 wrapper、SDK 或 hash 函数附近。

## Baseline

### Prompt

```text
帮我找这个请求里 x-sign 和 challenge cookie 是从哪来的，目标是后面能本地复现。
```

### 预期错误行为

- 停在 `md5/sha/aes` 候选函数
- 只给出几个 grep 命中点
- 没有区分 `builder`、`writer`、`sender`
- 没有追 `upstream response` 和 `cookie/state`

## Skilled Run

### Prompt

```text
$jsr-reverse 先把 x-sign 和 challenge cookie 路由到 locate 阶段，追到真实写边界，证明 sender 前的 builder/writer，以及上游响应和状态依赖。不要提前做 recover 或 runtime。
```

### 预期读取

- `jsr-reverse/SKILL.md`
- `jsr-reverse/references/locate-workflow.md`
- `jsr-reverse/references/request-chain-recording.md`
- `jsr-reverse/references/hook-and-boundary-patterns.md`
- 如果像签名入口，再读 `jsr-reverse/references/crypto-entry-locating.md`
- 如果像瑞数两跳，再读 `jsr-reverse/references/rs-collection-and-two-hop-routing.md`

### 预期正确行为

- 先明确首阶段是 `locate`
- 先定义目标 `sink`
- 区分 `sender`、`builder`、`writer`
- 要求用 call stack、hook、发送前对照等证据闭环
- 明确哪些字段来自上游响应、哪些来自本地状态
- 在 locate 未完成前，不提前切到 `recover` 或 `runtime`

## 失败判据

- 没继续读 locate 阶段所需 reference
- 首阶段不是 `locate`
- 只输出“可能在某个函数里”
- 没有 `sender -> builder -> writer` 区分
- 没有要求证明字段来源

## 通过判据

- 输出里明确首阶段是 `locate`
- 输出里出现 `真实写边界`
- 输出里出现 `上游响应/状态依赖`
- 能看到 `jsr-reverse/SKILL.md` 和 locate 相关 reference 被实际读取
