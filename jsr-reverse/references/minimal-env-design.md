# Minimal Environment Design

## Purpose

Keep runtime facts under a `## 运行时补充` section inside `请求链路.md`.

Use it to record only the runtime facts that must be fitted, fixed, or ruled out for the current execution path. It should read like an execution-oriented workboard, not a routing memo or a generic reverse notebook.

## Artifact Boundary

The `运行时补充` section inside `请求链路.md` owns only runtime-fit facts for the current chain, including:

- target chain and observed browser/local behavior
- execution mode and fit check
- browser profile, injection point, state-close signal, and state carrier
- `必需对象`
- `必需状态`
- fixed time, random, and seed sources
- pure-compute precheck
- optional anti-debug, fingerprint, and risk sections when they materially affect the current chain
- removable items and linkage to later validation

It does not own request-chain expansion, recovery notes, or generic reverse reasoning.

## Writing Rules

- start from one concrete target chain, not from a generic environment dump
- keep `必需对象` and `必需状态` separate
- for every dependency item, state `必要性 / 证据 / 去掉后现象`
- write only the sections that affect the current chain; optional sections stay omitted if irrelevant
- keep fixed time, random, and seed sources explicit before later comparison
- if `sdenv` or remote jsdom may apply, record the fit check before listing broad patches
- if state is produced by lifecycle or navigation, record exactly one execution mode
- keep entries concrete enough that another operator can execute the next fit step directly

## Runtime Skeleton

When only `请求链路.md` is writable, embed the skeleton below as a `## 运行时补充` section inside that file.

```markdown
## 运行时补充

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
| 状态 | 状态标签 | 来源 | 必要性 | 证据 | 去掉后现象 |
|---|---|---|---|---|---|
| `状态1` | `["会话相关"]` |  |  |  |  |

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

The `运行时补充` section inside `请求链路.md` must cover, when applicable:

- target chain, browser behavior, and local behavior
- fit check, execution mode, browser profile, injection point, state-close signal, and state carrier
- `必需对象` needed by the current chain
- `必需状态` needed by the current chain
- fixed sources for stable comparison
- pure-compute precheck status
- anti-debug, fingerprint, and risk sections only when they affect the current chain
- removable items and validation linkage

The `必需对象` / `必需状态` split is mandatory:

- `必需对象` = surfaces the current chain directly touches, such as `window`, `document`, `navigator`, `crypto`, DOM APIs, or runtime helpers
- `必需状态` = values produced or carried by lifecycle, navigation, upstream response, cookie, storage, challenge flow, or browser-internal progression

Do not merge these two lists.

## Quality Check

- the section heading stays `## 运行时补充`
- the section remains the canonical runtime workboard for the current chain
- `必需对象` and `必需状态` are not mixed
- each dependency item keeps executable evidence and removal symptoms
- pure-compute migration is never claimed while a precheck class remains open
- runtime facts stay in this section rather than being scattered elsewhere
