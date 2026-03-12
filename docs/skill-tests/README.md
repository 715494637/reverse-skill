# Skill Tests

这组资产用于验证新的 `1+3` skill 架构是否真的改变 agent 行为，而不是只读命中的 `SKILL.md` 后停住。

## 验证目标

- 先跑一轮 `无 skill baseline`
- 再跑一轮 `显式 skill`
- 重点观察 `phase 选择` 和 `reference 路由`
- 不用“回答看起来更完整”当通过标准，必须看实际读了哪些文件

## 通用执行顺序

1. 在同一仓库状态下先跑 baseline，不显式提任何 skill。
2. 记录 agent 打开的文件、选择的阶段、是否过早切到 recover 或 runtime。
3. 再跑 skilled run，显式点名对应 skill。
4. 记录 agent 是否先读命中的 `SKILL.md`，然后继续读对的 `references/*.md`。
5. 对比 baseline 和 skilled run 的路由差异。

## 必收集证据

- 打开的文件列表
- 首次 phase 选择
- 是否读取预期 `references/*.md`
- 是否出现错误分流
- 最终产物是否符合该阶段目标

## 通过标准

- baseline 能暴露当前 skill 解决的典型失败模式
- skilled run 至少读到目标 skill 的 `SKILL.md`
- skilled run 继续读到场景要求的 `references/*.md`
- skilled run 的阶段选择和停止条件正确
- 没有把 locate 问题提前做成 runtime 补环境，也没有把 runtime 问题退回大范围 grep

## 场景列表

| 文件 | 验证点 | 目标 skill |
| --- | --- | --- |
| `jsr-reverse-routing.md` | 前门 skill 是否先判题再路由 | `jsr-reverse` |
| `jsr-locate-proof.md` | locate 是否证明真实写边界而不是停在候选函数 | `jsr-locate` |
| `jsr-recover-shell.md` | recover 是否先打穿 shell 而不是先补环境 | `jsr-recover` |
| `jsr-runtime-divergence.md` | runtime 是否只处理真正的本地/浏览器分歧 | `jsr-runtime` |
| `jsr-rs-two-hop.md` | 瑞数两跳链路是否被正确识别和分阶段处理 | `jsr-reverse` |

## 结果记录建议

每次执行至少记 4 行：

- `Baseline opened:` 实际打开的文件
- `Skilled opened:` 实际打开的文件
- `Baseline route:` baseline 首次 phase 判断
- `Skilled route:` skilled run 首次 phase 判断

如果 skilled run 没有继续打开预期 reference，就判定为 `路由未落地`，不能算通过。
