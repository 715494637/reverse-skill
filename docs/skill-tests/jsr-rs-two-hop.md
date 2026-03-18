# jsr-rs Two-Hop

## 目的

验证前门 skill 面对瑞数场景时，是否会把任务识别成 `首跳挑战 -> cookie/state 产出 -> 二跳消费` 的两阶段链路，先路由到 `locate` 阶段并读取瑞数专用 reference，而不是把首跳脚本或首个 cookie 写入当成完成。

## Baseline

### Prompt

```text
这个站点第一次请求 412，过一会带上新 cookie 就 200。帮我把它做成本地可复现。
```

### 预期错误行为

- 把第一次 412 页面的脚本当成全部目标
- 只关注首个 cookie 写入，不追二跳消费
- 忽略 `204/落地页/内联 $_ts/外链 r2mKa/$_ts.l__`
- 直接跳去 runtime 或大范围环境模拟

## Skilled Run

### Prompt

```text
$jsr-reverse 这是一个 RS/瑞数风格的 412 -> cookie/state -> 200 两跳链路。先路由到 locate 阶段，按瑞数路线定位首跳产物和二跳消费，再决定是否进入 recover 或 runtime。
```

### 预期读取

- `jsr-reverse/SKILL.md`
- `jsr-reverse/references/locate-workflow.md`
- `jsr-reverse/references/rs-collection-and-two-hop-routing.md`
- `jsr-reverse/references/request-chain-recording.md`
- 如果首跳脚本被壳包裹，再读 `jsr-reverse/references/rs-recovery-anchors.md`
- 如果本地/浏览器仍分歧，再读 `jsr-reverse/references/rs-runtime-and-basearr-fit.md`

### 预期正确行为

- 明确首阶段是 `locate`
- 明确拆成 `首跳产出` 和 `二跳消费`
- 要求采集 `204/落地页/内联 $_ts/外链 r2mKa/$_ts.l__/meta[r=m]`
- 要求证明 cookie key、state 产物和二跳请求的消费关系
- 只有首跳和二跳都闭合后，才进入 recover 或 runtime

## 失败判据

- 没继续读瑞数专用 reference
- 首阶段不是 `locate`
- 把首跳脚本下载下来就算 locate 完成
- 没有二跳消费证明
- 没有识别 `RS/瑞数` 两跳结构

## 通过判据

- 输出里明确首阶段是 `locate`
- 输出里明确 `首跳 / 二跳`
- 输出里要求 `二跳消费证明`
- 能看到 `jsr-reverse/SKILL.md` 和瑞数专用 reference 被实际读取
