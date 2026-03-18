# jsr-reverse Routing

## 目的

验证前门 skill 是否会先判题，再把动态字段任务正确路由到 `locate` 阶段，并继续读取 locate 侧 reference，而不是只读 `jsr-reverse/SKILL.md` 后直接开搜或误切到 runtime。

## Baseline

### Prompt

```text
我要把一个动态 sign 请求头做成本地生成器。先看仓库和现有脚本，帮我继续推进，重点是找到 sign 的真实来源并说明下一步。
```

### 预期错误行为

- 直接全仓库 `rg sign`
- 还没证明写边界就开始猜算法
- 过早切到 `runtime`
- 只说“先 locate 再 recover”，但没有继续读对应 reference

## Skilled Run

### Prompt

```text
$jsr-reverse 这个任务的第一目标是定位动态 sign 请求头的真实写边界和上游状态依赖。先判题并路由到 locate 阶段，再按正确 reference 推进，不要直接补环境。
```

### 预期读取

- `jsr-reverse/SKILL.md`
- `jsr-reverse/references/locate-workflow.md`
- `jsr-reverse/references/request-chain-recording.md`
- 如果任务表述接近签名/加密入口，再读 `jsr-reverse/references/crypto-entry-locating.md`

### 预期正确行为

- 明确宣布首阶段是 `locate`
- 把目标拆成 `sink -> builder -> writer -> upstream state`
- 先要求真实写边界证据，再决定是否进入 `recover`
- 在 locate 未完成前，不把任务变成 runtime 补环境

## 失败判据

- 只打开 `jsr-reverse/SKILL.md`，没有继续读 locate reference
- 首阶段不是 `locate`
- 把“候选函数”当“真实写边界”
- 没有要求上游响应或 cookie/state 依赖证据

## 通过判据

- 能看到前门 skill 先判题
- 能看到首阶段是 `locate`
- 能看到它继续打开 locate 相关 reference
- 输出里明确要求 `真实写边界` 和 `上游状态依赖`
