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
| `本地回放` | captured `html/js/ts` comes from the same trusted sample and the goal is to reproduce state offline | exact artifact source, injection point, state-close signal, second-hop validation | artifacts are stale, entry script is missing, or second hop cannot be validated |
| `远程被动` | the page naturally reaches the target request or state production and only observation is needed | target request or state-close callback appears without active triggering | the target never reaches the needed request or state-production signal |
| `远程主动` | passive execution cannot reach the target and an explicit trigger is required | why passive is insufficient, what active trigger is used, and second-hop validation result | the route depends on uncontrolled broad patching or the active trigger changes the chain beyond diagnosis |

Do not combine multiple modes in one diagnosis block.

## 4. Required Runtime Facts

When this route is used, the `运行时补充` / `验证补充` sections inside `请求链路.md` must capture:

- fit-check conclusion
- chosen execution mode
- chosen browser profile
- injection point
- state-close signal
- produced state carrier
- second-hop validation result

If any item is unknown, the route is still `部分完成`.

## 5. Patch Quality Rules

- prefer one high-fidelity browser profile instead of abstracting multiple profiles
- treat browser-surface patches as surface contracts, not just object existence
- when a patched API is part of the target chain, record any fidelity requirement that matters for the chain, such as function signature or native-shape expectations
- do not classify navigation or exit listeners as anti-debug by default; if they produce state, record them as the state-close signal

## 6. Acceptance Rules

- no `sdenv` route without a recorded fit check
- no `远程主动` route without a written reason that `远程被动` is insufficient
- no `sdenv`-based delivery without second-hop validation using the produced state
- no broad lifecycle patching accepted without re-validating the request chain when feasible
- a jsdom page finishing execution is not validation by itself
