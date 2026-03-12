# Anti-Debugging and Risk Branches

## 1. Separate Debug Friction from Real Risk Control

Not every “it breaks when I debug” symptom is anti-debugging, and not every abnormal result is a risk branch.

Start by separating:

- `debug friction`: makes observation harder but does not necessarily change business values
- `real risk branch`: changes the chain, intermediate values, or final response

## 2. Common Anti-Debug Surfaces

| Type | Symptom | Handling principle |
|---|---|---|
| Endless `debugger` | execution stops every step | remove only that friction point, not business logic |
| Stack checks | local replay always takes fallback | preserve stack shape or bypass the check |
| Console bait | value changes when console opens | do not treat bait values as real values |
| Performance probe | debug mode changes timing significantly | fix time and performance sources |
| Source integrity | one-line edit breaks execution | first prove whether it affects business values |

## 3. How to Recognize a Risk Branch

The following signals mean the chain is not in normal state:

- it enters fallback before the target request is even sent
- same input, browser is normal, local replay always follows another path
- missing one upstream request immediately causes 403, empty payload, challenge, or escalation
- the target value is computed, but the server never accepts it

At that point, stop going deeper into the algorithm and prove which state normal execution requires.

For `deviceId`, `blackbox`, `sensor_data`, challenge, or slider tasks, continue tracing:

- which fingerprint surface diverges first
- which aggregator consumes that surface
- which `riskGate`, challenge, or fallback point starts the fork

Do not conclude from “one fingerprint value differs” alone; the consumer must be identified.

## 4. Normal/Risk Fork Map Is Mandatory

In addition to a comparison table, create a fork map. It must state:

- which request, response, state gap, or debug event starts the fork
- which path the normal-state builder and writer follow
- which path the risk-state fallback or challenge follows
- which specific state is missing instead of a vague “environment mismatch”

Fork-map template:

```markdown
分叉起点：请求 B 未返回 token / guest_id(HttpOnly) 缺失 / 调试触发风险探针

正常态路径：
请求 B 正常响应 -> builder_main() -> writer -> 正常响应

风控态路径：
请求 B 失败 / 调试触发 -> sign_fallback() -> challenge / 风控页

缺失状态：
- token
- guest_id(HttpOnly)
- 指纹快照
```

Comparison template:

```markdown
| 项目 | 正常态 | 风控态 | 差异解释 |
|---|---|---|---|
| 上游请求 B | 返回 token 与 cookie | 返回空 / 403 | 会话未闭合 |
| builder 路径 | sign_main() | sign_fallback() | 已分叉 |
| 最终响应 | 正常数据 | 风控页 / challenge | 非同链 |
```

Without the fork point and missing state, normal/risk separation is incomplete.

## 5. Handling Principles

- Remove only debug friction that blocks observation. Do not rewrite broad business logic.
- Choose the narrowest matching anti-debug rule that actually changes the investigation path.
- As soon as a risk branch is confirmed, return to state closure and normal-state sampling.
- Do not classify navigation or exit listeners as anti-debug by default; if they produce state, record them as the runtime state-close signal.
- If navigation or lifecycle patches were required, record that they changed page state and re-validate the request chain without them when feasible.
- If real logic sits inside a shell layer, stop burning time at runtime level and switch to `$jsr-recover`.

## 6. Fingerprint-Induced Risk Template

```markdown
指纹表面差异：
采集器：
聚合器：
消费点：
分叉起点：
正常态路径：
风控态路径：
是否影响目标字段：是 / 否
```

## 7. Record Template

```markdown
反调试点：
规则选择：
命中表面：
是否属于状态闭合信号：是 / 否
现象：
是否影响业务值：是 / 否
最小处理：
处理后变化：
移除 patch 后复验：

风控分支触发条件：
正常态需要的状态：
当前缺口：
下一步：
```

## 8. Completion Standard

- Debug friction and real risk control are separated.
- The exact fork starting point is known.
- For fingerprint tasks, the real consumer that triggers risk control is known.
- The chosen anti-debug rule is minimal enough to justify itself.
- State-close signals and anti-debug points are not mixed into one conclusion block.
- It is clear whether the next step is patching state, patching objects, or switching skills.
