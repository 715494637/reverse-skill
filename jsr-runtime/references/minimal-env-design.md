# Minimal Environment Design

## Purpose

`运行态清单.md` is the canonical runtime artifact for the current chain.

This reference is the canonical schema for `运行态清单.md`.

Do not write the following here:

- full request-chain expansion
- broad recovery notes
- general progress summaries

## Writing Rules

- start with the target chain, not with a generic browser-object list
- separate `必需对象` from `必需状态`
- record fixed time, random, and seed sources explicitly
- record anti-debug points only if they affect the current chain
- record fingerprint surfaces only if a consumer uses them
- record risk branches only if they affect the current chain
- if the chain may fit `sdenv` or remote jsdom, record the fit check before broad patch lists
- if the chain depends on page lifecycle or navigation-produced state, record exactly one execution mode
- record the injection point, state-close signal, and produced state carrier whenever runtime state is produced by lifecycle or navigation
- if a high-fidelity browser profile is required, record which profile was chosen and why
- every dependency item must answer `必要性 / 证据 / 去掉后现象`

## Runtime Skeleton

```markdown
# 运行态清单

- 样本编号：
- 证据编号：
- 目标链路 / 函数：
- 浏览器现象：
- 本地现象：
- 适配检查：
- 执行模式：本地回放 / 远程被动 / 远程主动 / 不适用
- 浏览器画像：
- 注入时机：
- 状态闭合信号：
- 状态载体：

## 必需对象
- 对象1：
  - 必要性：
  - 证据：
  - 去掉后现象：

## 必需状态
- 状态1：
  - 状态标签：
  - 来源：
  - 证据：
  - 去掉后现象：

## 固定源
- 时间源：
- 随机源：
- 种子：

## 纯算迁移前检查
- 上游响应：
- HttpOnly：
- 一次性 challenge / nonce / ticket：
- 浏览器内部状态：
- 指纹采集：
- 时间窗 / 序号 / 续期：

## 反调试（按需）
- 点1：
  - 现象：
  - 是否影响业务值：
  - 最小处理：
  - 命中表面：
  - 证据：

## 指纹归因（按需）
- 表面1：
  - 采集器：
  - 聚合点：
  - 消费点：
  - 是否必需：
  - 证据：

## 风控分支（按需）
- 分支点1：
  - 触发条件：
  - 结果：
  - 证据：

## 可移除项
- 项1：
  - 去掉后现象：
  - 结论：
  - 证据：

## 验证联动（按需）
- 验证记录引用：
- 需要验证的补项：
- 二跳验证：
- 固定输入要求：
```

## Required Sections

`运行态清单.md` must be able to record all of the following:

- target chain, browser behavior, and local behavior
- fit check, execution mode, browser profile, injection point, and state-close signal
- required objects
- required state
- fixed time, random, and seed sources
- pure-compute precheck
- anti-debug points when relevant
- fingerprint attribution when relevant
- risk branches when relevant
- removable items
- validation linkage

## Quality Check

- no runtime artifact may use the old filename `运行时依赖.md`
- `必需对象` and `必需状态` are not mixed together
- each dependency item has `必要性 / 证据 / 去掉后现象`
- pure-compute migration is never claimed while any precheck class remains open
- runtime facts stay in `运行态清单.md`, not in `总览.md`
- detailed validation still lives in `验证记录.md`
