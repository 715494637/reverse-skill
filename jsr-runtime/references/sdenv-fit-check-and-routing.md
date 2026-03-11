# Sdenv Fit Check and Routing

## 1. Use Boundary

This reference is only for runtime tasks that match one or more of the following:

- page state is produced only after lifecycle or navigation events
- cookies or tokens are produced and then consumed on a second hop
- the task has captured `html/js/ts` artifacts for local replay
- remote jsdom execution is being considered
- the target is fingerprint-sensitive and needs one high-fidelity browser profile

Do not route here just because the task uses jsdom.

## 2. Fit Check First

Before selecting any `sdenv` route, record whether the target actually fits:

- the produced state has a visible completion signal such as `location.replace`, `location.assign`, exit, or a request callback
- the produced state has a carrier such as `cookieJar`, redirect URL, response body, or a page-owned state bag
- there is a defensible injection point before page code executes
- the route still depends on browser-shaped state after pure-compute precheck
- a single browser profile is acceptable for the target

If these conditions are not met, do not force the route.

## 3. Route Selection

Choose exactly one execution mode:

| Mode | Use when | Required proof | Stop condition |
|---|---|---|---|
| `local` | captured `html/js/ts` comes from the same trusted sample and the goal is to reproduce state offline | exact artifact source, injection point, state-close signal, second-hop validation | artifacts are stale, entry script is missing, or second hop cannot be validated |
| `remote-passive` | the page naturally reaches the target request or state production and only observation is needed | target request or state-close callback appears without active triggering | the target never reaches the needed request or state-production signal |
| `remote-active` | passive execution cannot reach the target and an explicit trigger is required | why passive is insufficient, what active trigger is used, and second-hop validation result | the route depends on uncontrolled broad patching or the active trigger changes the chain beyond diagnosis |

Do not combine multiple modes in one diagnosis block.

## 4. Required Runtime Facts

When this route is used, `运行时依赖.md` must contain:

- fit-check conclusion
- chosen execution mode
- chosen browser profile
- injection point
- state-close signal
- produced state carrier
- second-hop validation result

If any item is unknown, the route is still `partial`.

## 5. Patch Quality Rules

- Prefer one high-fidelity browser profile instead of abstracting multiple profiles.
- Treat browser-surface patches as surface contracts, not just object existence.
- When a patched API is part of the target chain, record any fidelity requirement that matters for the chain, such as function signature or native-shape expectations.
- Do not classify navigation or exit listeners as anti-debug by default; if they produce state, record them as the state-close signal.

## 6. Acceptance Rules

- No `sdenv` route without a recorded fit check.
- No `remote-active` route without a written reason that `remote-passive` is insufficient.
- No `sdenv`-based delivery without second-hop validation using the produced state.
- No broad lifecycle patching accepted without re-validating the request chain when feasible.
- A jsdom page finishing execution is not validation by itself.

## 7. Record Template

```markdown
适配检查：
- 结论：
- 观测信号：
- 证据：

执行模式：
- mode：`local / remote-passive / remote-active`
- 选择原因：
- 证据：

浏览器画像：
- profile：
- 证据：

注入时机：
- 位置：
- 证据：

状态闭合信号：
- 信号：
- 载体：
- 证据：

二跳验证：
- 输入状态：
- 验证动作：
- 结果：
- 证据：
```
