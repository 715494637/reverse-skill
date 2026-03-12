# Minimal Environment Design

## Purpose

`运行态清单.md` is the canonical runtime artifact for the current chain.

The layout should feel like a compact engineering workboard, not a long environment memo.

Do not write full request-chain expansion, recovery notes, or broad progress summaries here.

## Visual Style

Use pure Markdown with light status markers:

- `✅ 已确认`
- `🟡 待确认`
- `⛔ 阻塞`
- `🔍 待验证`
- `➡️ 下一步`

## Writing Rules

- start with the target chain, not with a generic object dump
- keep `必需对象` and `必需状态` separate
- keep fixed time, random, and seed sources explicit
- write anti-debug, fingerprint, and risk sections only when they affect the current chain
- if `sdenv` or remote jsdom may apply, record the fit check before broad patch lists
- if state is produced by lifecycle or navigation, record exactly one execution mode
- every dependency item must answer `必要性 / 证据 / 去掉后现象`

## Runtime Skeleton

```markdown
# 运行态清单

- 当前状态：🟡 待确认（部分完成）
- 目标链路 / 函数：
- 浏览器现象：
- 本地现象：
- 适配检查：
- 执行模式：本地回放 / 远程被动 / 远程主动 / 不适用
- 浏览器画像：
- 注入时机：
- 状态闭合信号：
- 状态载体：
- ➡️ 下一步：

## 执行路线摘要
| 项目 | 内容 |
|---|---|
| 适配检查 |  |
| 执行模式 |  |
| 浏览器画像 |  |
| 注入时机 |  |
| 状态闭合信号 |  |
| 状态载体 |  |

## ✅ 必需对象
| 对象 | 必要性 | 证据 | 去掉后现象 |
|---|---|---|---|
| `对象1` |  |  |  |

## ✅ 必需状态
| 状态 | 状态标签 | 来源 | 证据 | 去掉后现象 |
|---|---|---|---|---|
| `状态1` | `["会话相关"]` |  |  |  |

## 固定源
| 项目 | 内容 |
|---|---|
| 时间源 |  |
| 随机源 |  |
| 种子 |  |

## 🔍 纯算迁移前检查
| 检查项 | 结论 | 证据 |
|---|---|---|
| 上游响应 |  |  |
| HttpOnly |  |  |
| 一次性 challenge / nonce / ticket |  |  |
| 浏览器内部状态 |  |  |
| 指纹采集 |  |  |
| 时间窗 / 序号 / 续期 |  |  |

## 🟡 反调试（按需）
| 点位 | 现象 | 最小处理 | 命中表面 | 证据 |
|---|---|---|---|---|
| 点1 |  |  |  |  |

## 🟡 指纹归因（按需）
| 表面 | 采集器 | 聚合点 | 消费点 | 是否必需 | 证据 |
|---|---|---|---|---|---|
| 表面1 |  |  |  |  |  |

## 🟡 风控分支（按需）
| 分支点 | 触发条件 | 结果 | 证据 |
|---|---|---|---|
| 分支点1 |  |  |  |

## 🔍 可移除项与验证联动
| 项目 | 去掉后现象 | 结论 | 证据 |
|---|---|---|---|
| 项1 |  |  |  |

- 验证记录引用：
- 固定输入要求：
- 二跳验证：
```

## Required Coverage

`运行态清单.md` must still cover:

- target chain, browser behavior, and local behavior
- fit check, execution mode, browser profile, injection point, state-close signal, and state carrier
- required objects
- required state
- fixed sources
- pure-compute precheck
- optional anti-debug, fingerprint, and risk sections when relevant
- removable items and validation linkage

## Quality Check

- the filename stays `运行态清单.md`
- `必需对象` and `必需状态` are not mixed
- each dependency item keeps `必要性 / 证据 / 去掉后现象`
- pure-compute migration is never claimed while a precheck class remains open
- runtime facts stay in `运行态清单.md`, not in `总览.md`
