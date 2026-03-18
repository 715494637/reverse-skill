# jsr-runtime Divergence

## 目的

验证 `jsr-reverse` 只在“链路已知、算法边界已知、但浏览器与本地仍分歧”时路由到 `runtime` 阶段，并继续读取 runtime 侧 reference 诊断真实缺口，而不是回退成大范围 locate 或 recover。

## Baseline

### Prompt

```text
浏览器里请求 200，本地同样输入只能拿到 412。帮我把它弄通。
```

### 预期错误行为

- 重新从全局找 sign/cookie
- 把问题重新做成 recover
- 一次性补大量浏览器对象
- 没有判断是缺对象、缺状态、风险分支还是时间/随机源问题

## Skilled Run

### Prompt

```text
$jsr-reverse 已知 sink、写边界和本地算法入口，当前浏览器 200、本地 412。请先路由到 runtime 阶段，只诊断真实 runtime 分歧，做最小运行时清单，不要回退成 locate 或 recover。
```

### 预期读取

- `jsr-reverse/SKILL.md`
- `jsr-reverse/references/runtime-diagnosis.md`
- `jsr-reverse/references/minimal-env-design.md`
- `jsr-reverse/references/anti-debug-and-risk-branches.md`
- 如果是瑞数，再读 `jsr-reverse/references/rs-runtime-and-basearr-fit.md`
- 如果要评估 sdenv，再读 `jsr-reverse/references/sdenv-fit-check-and-routing.md`

### 预期正确行为

- 先明确首阶段是 `runtime`
- 先分类 `缺对象 / 缺状态 / 风险分支 / 不稳定源`
- 列出最小运行时缺口，而不是一次性补全浏览器
- 要求用对照实验验证每个缺口
- 只有在新证据推翻已有定位或恢复时才允许回退阶段

## 失败判据

- 没继续读 runtime 阶段所需 reference
- 首阶段不是 `runtime`
- 直接构建大而全环境
- 不做分歧分类
- 输出里没有“最小运行时清单”或“对照验证”

## 通过判据

- 输出里明确首阶段是 `runtime`
- 输出里明确 runtime 只处理 `分歧`
- 输出里出现最小缺口和验证方式
- 能看到 `jsr-reverse/SKILL.md` 和 runtime 相关 reference 被实际读取
