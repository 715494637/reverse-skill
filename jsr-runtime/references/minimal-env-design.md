# Minimal Environment Design

## 1. Goal of a Minimal Environment

The goal is singular:

stabilize the current execution chain and explain why every dependency exists.

It is not:

- patching more for safety
- simulating the entire browser locally
- calling it done as soon as code runs once

## Record Paths

Write records under the current task working directory:

```text
reverse-records/总览.md
reverse-records/运行时依赖.md
reverse-records/验证记录.md
```

- `总览.md`: current phase, blocker, next step, and risk
- `运行时依赖.md`: minimal environment, required objects, required state, anti-debug points, and risk branches
- `验证记录.md`: patch on/off comparisons, fixed-source comparisons, and stability validation

## 2. Five Parts of a Minimal Environment

1. required objects
2. required state
3. fixed time sources
4. fixed random sources
5. switchable patches

## 3. Patch Only Objects Touched by the Current Chain

```markdown
| Object or property | Required | Why | Effect when removed | Note |
|---|---|---|---|---|
| `window.navigator.userAgent` | yes | branch dependency | enters risk branch | full navigator not needed |
| `crypto.subtle` | yes | builder calls it | immediate error | patch only the used method |
| `document` | no / partial | current chain does not touch DOM | no effect | do not patch by default |
```

## 4. State Has Priority Over Objects

The most common gaps are state gaps:

- `cookie`
- `HttpOnly cookie`
- `localStorage`
- `sessionStorage`
- upstream response values
- challenge results
- device identifiers returned by initialization requests

If state is not closed, adding more objects only moves execution deeper into a risk branch.

## 5. Pure-Compute Pre-Migration Check

Before declaring that the current chain can be migrated as pure computation, check these six items:

1. upstream response fields
2. `HttpOnly cookie`
3. one-time challenge, nonce, or ticket
4. browser-internal state
5. fingerprint collection result
6. time window, sequence, or renewal dependency

Recording template:

```markdown
| Check item | Depends | Current evidence | Conclusion | Next step |
|---|---|---|---|---|
| Upstream response field | yes | token comes from request B.response | cannot migrate as pure computation | close state chain first |
| HttpOnly cookie | yes | guest_id only exists in capture | cannot migrate as pure computation | close cookie chain first |
| One-time challenge | no | sample can be replayed repeatedly | may continue | keep observing |
| Browser-internal state | yes | depends on device_seed in storage | not pure computation yet | restore state first |
| Fingerprint collection | unknown | browser works, local replay unstable | pending | collect fingerprint evidence |
| Time window | yes | server rejects after expiry | not pure computation yet | fix time and validate |
```

Rule:

- If any of the six items is dependency-present and still unclosed, do not treat the chain as pure computation.

## 6. Fingerprint Attribution Matrix

For `deviceId`, `blackbox`, `sensor_data`, challenge, slider, or risk-cookie tasks, add a fingerprint-attribution matrix:

```markdown
| Surface | Collector | Aggregator | Consumer | Target impact | Required | Evidence | Removable |
|---|---|---|---|---|---|---|---|
| canvas | collectCanvas() | buildProfile() | riskGate() | challenge branch | yes | removing it enters risk state | no |
| webgl | collectWebGL() | buildProfile() | buildBlackbox() | blackbox | yes | intermediate value changes | no |
| fonts | collectFonts() | buildProfile() | riskGate() | risk cookie | unknown | pending | pending |
| audio | collectAudio() | buildProfile() | no direct consumer | none | no | removing it changes nothing | yes |
```

Rules:

- Surfaces that never reach a consumer are removable by default.
- Do not patch the whole `navigator`, `canvas`, or `webgl` surface set just to “look like a browser”.

## 7. Time and Random Sources Must Be Explicitly Recorded

```markdown
固定时间：1710000000000
固定随机种子：seed-001
固定性能时间：0 起点偏移
固定设备种子：device-seed-01
```

Without explicit recording, later regression checks are unreliable.

## 8. Patches Must Be Switchable

Each patch should have an on/off check:

```markdown
| Patch | On | Off | Conclusion |
|---|---|---|---|
| Fix Date.now | intermediate values stable | intermediate values drift | required |
| Import HttpOnly cookie | request succeeds | risk state | required |
| Simulate canvas | no change | no change | removable |
```

This prevents uncontrolled patch accumulation.

## 9. Minimal Environment Template

```markdown
目标链路：

### 必需对象
- 

### 必需状态
- 

### 指纹归因矩阵
- 

### 固定源
- 时间：
- 随机：
- 种子：

### 可移除项
- 

### 当前结论
- 
```

Write this block into `reverse-records/运行时依赖.md`.

## 10. Completion Standard

- Only required items remain for the current chain.
- Removing non-required items does not change the result.
- Intermediate values become stable under fixed input and fixed sources.
- The six pure-compute prechecks are complete and the blocking item is known if migration is still blocked.
- For fingerprint tasks, truly required surfaces and removable surfaces are known.

