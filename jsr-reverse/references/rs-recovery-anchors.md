# RS Recovery Anchors

## When to Use

Use this reference when the RS shell is present and downstream work needs stronger semantic anchors than raw beautified source:

- `r2mKa` dispatcher text is available
- `$_ts` samples are available and `cp` fields matter
- the keys path is hidden behind `cp3`, dynamic tasks, or offsets
- page render or app code is wrapped by `$_ts.l__`

Stay inside recover scope:

- choose RS-specific anchors
- recover only enough structure for downstream work
- stop before broad, undirected source beautification

## Preferred Anchor Order

Use this order unless evidence shows a tighter dependency:

| Anchor | What it proves |
| --- | --- |
| `r2mKa` text | dispatcher tree, task families, child relations, stable parser anchor |
| `cp0 / cp2 / cp6` | decoded constants, surface strings, and control-facing values |
| `cp3 -> dynamicTaskOffset -> keys` | decryption path and key-material derivation |
| `$_ts.l__` appcode | rendered or decrypted page code that matters to downstream work |

Do not start from the whole beautified main bundle if these anchors already exist.

## Anchor-Specific Recovery Rules

- Recover `r2mKa` as a dispatcher or task-tree anchor first; do not confuse it with the final business operator.
- Decode `cp0 / cp2 / cp6` before expanding operator details; they often reveal stable names, constants, or control cues.
- Treat the keys path as a bridge: `cp3 -> task offset -> keys`, not as an isolated string-decryption trick.
- Treat `$_ts.l__` as a bridge artifact carrying rendered or decrypted code, not as disposable page noise.

## Validation Checkpoints

After each anchor, record one checkpoint:

- `r2mKa`: parser anchor or task relation is stable
- `cp` layer: decoded output is stable enough to support naming or control judgment
- keys path: key-material derivation path is stable enough for downstream validation
- `$_ts.l__`: decoded appcode reaches stable output or a stable stop reason

If no checkpoint can be stated, the current anchor is not ready to hand off.

## Stop Conditions

- no stable `$_ts` sample, no `r2mKa`, and no appcode anchor: `blocked`
- anchors are known but keys path or appcode meaning is still incomplete: `partial`
- runtime closure such as `hasDebug`, fixed time/randomness, or second-hop acceptance is the real blocker: switch to `$jsr-runtime`
- first-hop versus second-hop artifact ownership is still unclear: switch to `$jsr-locate`
