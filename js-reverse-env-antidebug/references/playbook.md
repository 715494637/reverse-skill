# Env and Antidebug Playbook

## High-Frequency Coverage from 66 Cases
- Env-shim overlap: 26/66
- Anti-debug overlap: 14/66
- Risk-control overlap: 9/66
- Strong overlap with hook and token/cookie chains.

## Full Case Coverage (Not Representative Only)
- Anti-debug full set: 11, 15, 30, 31, 32, 33, 35, 38, 43, 45, 54, 55, 62, 64
- Environment replay full set: 6, 7, 12, 17, 25, 28, 29, 30, 33, 37, 38, 39, 42, 43, 44, 45, 51, 52, 53, 54, 55, 56, 58, 64, 65, 66
- Risk-control/captcha full set: 12, 13, 36, 48, 53, 54, 55, 60, 64

## Fast Representative Cases
- Anti-debug focus: 11, 15, 30, 31, 32, 35
- Environment-heavy replay: 33, 39, 42, 44, 52, 56, 58
- Risk-control and captcha overlap: 48, 53, 54, 55, 60, 64

## Anti-Debug Pattern Table
- Dynamic debugger payload: `Function('debugger')()` or constructor variants.
- Timer loop traps: repetitive checks in `setTimeout`/`setInterval` branches.
- DevTools detection: viewport gap checks, `toString` traps, console getter traps.
- Integrity checks: function source checksum or native-string checks.

## Environment Shim Checklist
1. Record the first runtime exception stack.
2. Add only the exact missing symbol or property.
3. Match value type and object shape, not just key existence.
4. Re-run and repeat until the target chain passes.
5. Remove unused shims and verify output remains stable.

## Risk-Control Focus
- Validate device id / fingerprint fields are consistent during one run.
- Keep session-bound identifiers stable when replaying requests.
- Separate captcha/token acquisition from core signature replay.

## Common Failure Patterns
- Overwriting global prototypes permanently and breaking unrelated logic.
- Mocking fields with wrong type (string vs function/object).
- Solving anti-debug but ignoring subsequent risk-control token steps.
- Building huge all-in-one shims instead of minimal, testable patches.
