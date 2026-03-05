# Trace Hook Playbook

## High-Frequency Coverage from 66 Cases
- Hook cases: 34/66
- Token or cookie cases: 35/66
- AES-involved cases: 28/66
- Env-shim overlap: 26/66
- Deobfuscation overlap: 19/66

## Full Case Coverage (Not Representative Only)
- Hook full set: 11, 13, 14, 15, 16, 22, 24, 25, 27, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 41, 42, 43, 44, 45, 49, 51, 53, 54, 55, 56, 57, 59, 62, 64
- Token/cookie full set: 1, 2, 6, 10, 11, 14, 19, 26, 28, 29, 33, 34, 36, 38, 39, 41, 42, 43, 44, 45, 46, 48, 50, 52, 53, 54, 55, 57, 59, 60, 61, 63, 64, 65, 66
- Deobfuscation full set: 12, 24, 25, 27, 28, 29, 30, 32, 33, 39, 41, 43, 45, 48, 53, 54, 57, 63, 65

## Fast Representative Cases
- Hook-oriented login and trace: 11, 13, 14, 15, 16
- Mixed hook + obfuscation: 24, 25, 27, 29, 30, 32
- Hook + token/cookie chains: 33, 34, 41, 42, 44, 45, 57
- Hook + risk-control context: 48, 54, 55, 64

## Breakpoint Priority
1. Request sending APIs (`fetch`, `XMLHttpRequest.send`, axios adapter)
2. Parameter assembly points (`Object.assign`, `qs.stringify`, custom serializer)
3. Crypto/sign wrappers (`encrypt`, `sign`, `getToken`, `h5st`, `Acs-Token`-like names)
4. Bundle loader boundaries (`__webpack_require__`, dynamic import wrappers)

## Hook Decision Rules
- Hook request layer first when endpoint and payload are unclear.
- Hook builder layer first when endpoint is known but one dynamic field is unknown.
- Hook crypto layer first when builder fields are known and only final encoding is unclear.
- Hook module loader when symbols are mangled and call chain is hard to follow directly.

## Minimal Trace Checklist
- Capture one successful baseline request.
- Freeze input text or payload for deterministic replay.
- Record exactly which fields change per request.
- Confirm timestamp/random/device fields and their generators.
- Confirm any pre-hash normalization (sort order, URL encoding, lower/upper casing).

## Common Failure Patterns
- Tracing only the final encrypt function but missing upstream string normalization.
- Ignoring retry/interceptor branches and reading the wrong request copy.
- Keeping hooks too broad and flooding logs, which hides the real chain.
- Losing deterministic state between runs (timestamp/random not frozen).
