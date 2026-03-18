# RS Recovery Anchors

## When to Use

Use this file only as a `recover` mount for RS-style targets.

Mount it when the current recover blocker is that the RS shell still hides the semantic anchor needed for downstream work, for example:

- `r2mKa` dispatcher text is available
- `$_ts` samples are available and `cp` fields matter
- the keys path is hidden behind `cp3`, dynamic tasks, or offsets
- page render or app code is wrapped by `$_ts.l__`

This file is a recover refinement, not a cross-stage RS workflow.

## Owns

This file owns only the RS-specific recover work below:

- preferred anchor order
- anchor-specific recovery rules
- validation checkpoints for each recovered anchor

## Does Not Own

This file does not own:

- RS locate collection or two-hop proof
- RS runtime fitting such as `hasDebug`, time/randomness, or second-hop acceptance
- global recover depth rules outside RS-specific anchors
- validation proof beyond anchor readiness

## Method inside this stage

### 1. Use the preferred anchor order

Use this order unless evidence shows a tighter dependency:

| Anchor | What it proves |
| --- | --- |
| `r2mKa` text | dispatcher tree, task families, child relations, stable parser anchor |
| `cp0 / cp2 / cp6` | decoded constants, surface strings, and control-facing values |
| `cp3 -> dynamicTaskOffset -> keys` | decryption path and key-material derivation |
| `$_ts.l__` appcode | rendered or decrypted page code that matters to downstream work |

Do not start from the whole beautified main bundle if these anchors already exist.

### 2. Apply anchor-specific recovery rules

- Recover `r2mKa` as a dispatcher or task-tree anchor first; do not confuse it with the final business operator.
- Decode `cp0 / cp2 / cp6` before expanding operator details; they often reveal stable names, constants, or control cues.
- Treat the keys path as a bridge: `cp3 -> task offset -> keys`, not as an isolated string-decryption trick.
- Treat `$_ts.l__` as a bridge artifact carrying rendered or decrypted code, not as disposable page noise.

### 3. Record a validation checkpoint after each anchor

After each anchor, record one checkpoint:

- `r2mKa`: parser anchor or task relation is stable
- `cp` layer: decoded output is stable enough to support naming or control judgment
- keys path: key-material derivation path is stable enough for downstream validation
- `$_ts.l__`: decoded appcode reaches stable output or a stable stop reason

If no checkpoint can be stated, the current anchor is not ready to hand off.

## Stop / handoff rule

- Stop using this file when one or more anchors are stable enough to support downstream runtime or validation work.
- Keep recover at `blocked` when there is no stable `$_ts` sample, no `r2mKa`, and no appcode anchor.
- Keep recover at `partial` when anchors exist but the keys path or appcode meaning is still incomplete.
- Hand off to `runtime` with a minimal signal such as `anchor stable; remaining blocker is runtime fit or second-hop acceptance`.
- Hand off to `locate` with a minimal signal such as `anchor exists but hop ownership / upstream artifact ownership is still unclear`.
