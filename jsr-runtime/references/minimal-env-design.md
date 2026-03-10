# Minimal Environment Design

## Purpose

`运行时依赖.md` records only the minimal runtime manifest for the current chain.

Do not write the following here:

- full request-chain expansion
- broad recovery notes
- general progress summaries

This file should explain only what the current chain needs to run and why.

## Record Path

Write records under the current task working directory:

```text
reverse-records/
├─ 会话1/
│  ├─ 总览.md
│  ├─ 请求链路.md
│  ├─ 运行时依赖.md
│  ├─ 恢复记录.md
│  └─ 验证记录.md
├─ 会话2/
│  └─ ...
└─ ...
```

Session rules:

- One reverse session uses one `会话N/` folder only.
- If the user specifies `会话N`, use only that folder.
- If the user does not specify one, create the next unused `会话N/` folder.
- Never overwrite or edit another `会话N/` folder.

## Writing Rules

- Start with the target chain, not with a list of browser objects.
- Separate `必需对象` from `必需状态`.
- Record fixed time, random, and seed sources explicitly.
- Record anti-debug points only if they affect the current chain.
- Record fingerprint surfaces only if a consumer uses them.
- Record risk branches only if they affect the current chain.
- Every dependency item must answer `必要性`, `证据`, and `去掉后现象`.

## Runtime Skeleton

```markdown
# 运行时依赖

## 目标链路
- 目标请求 / 函数：
- 浏览器现象：
- 本地现象：

## 必需对象
- `对象1`
  - 必要性：
  - 证据：
  - 去掉后现象：

## 必需状态
- `状态1`
  - 状态：`["动态","响应获取","HttpOnly","会话相关"]`
  - 来源：
  - 证据：
  - 去掉后现象：

## 固定源
- 时间：
- 随机：
- 种子：

## 纯算迁移前检查
- 上游响应：
  - 结论：
  - 证据：
- HttpOnly：
  - 结论：
  - 证据：
- 一次性 challenge / nonce / ticket：
  - 结论：
  - 证据：
- 浏览器内部状态：
  - 结论：
  - 证据：
- 指纹采集：
  - 结论：
  - 证据：
- 时间窗 / 序号 / 续期：
  - 结论：
  - 证据：

## 反调试（按需）
- `点1`
  - 现象：
  - 是否影响业务值：
  - 最小处理：

## 指纹归因（按需）
- `表面1`
  - 采集器：
  - 消费点：
  - 是否必需：
  - 证据：

## 风控分支（按需）
- `分支点1`
  - 触发条件：
  - 结果：
  - 证据：

## 可移除项
- `项1`
  - 去掉后现象：
  - 结论：

## 验证点
- `验证1`
  - 开关：
  - 结果：
```

## Quality Check

- Objects and state are separated.
- Fixed sources are explicit.
- Pure-compute migration checks are explicit.
- Anti-debug, fingerprint, and risk sections are present only when needed.
- Every dependency item states necessity and evidence.
- Non-runtime content is not mixed into this file.
