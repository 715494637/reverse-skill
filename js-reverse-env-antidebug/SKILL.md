---
name: js-reverse-env-antidebug
description: Handle anti-debugging, environment simulation, and risk-control checks in JavaScript reverse engineering. Use when target code breaks under DevTools, headless/browser mismatch, or missing runtime objects such as window/document/navigator/crypto.
---

# JS Reverse Env Antidebug

## Workflow
1. Classify blockers. Distinguish anti-debug logic, missing APIs, and risk-control fingerprint checks.
2. Neutralize anti-debug loops first. Patch `constructor('debugger')`, timer traps, and DevTools-size detectors.
3. Build a minimal environment shim. Implement only required objects/functions touched by the target chain.
4. Stabilize execution context. Freeze time/random where needed and preserve expected object shapes.
5. Re-run the target path incrementally. Add patches only when stack traces prove necessity.
6. Validate no overpatching. Confirm target parameter remains correct when non-essential patches are removed.
7. Package a reversible patch set. Provide clear on/off switches for every hook and shim.

## Priority Patch Targets
- `Function.prototype.constructor` and dynamic `debugger` payloads.
- `setTimeout`/`setInterval` traps with fixed suspicious intervals.
- DevTools/window-size checks and visibility-state checks.
- Headless probes (`navigator.webdriver`, plugins, languages, UA hints).

## Environment Minimum Set
Start from this set and extend only when needed:
- `window`, `document`, `navigator`
- `location`, `history`, `screen`
- `localStorage` / `sessionStorage`
- `atob` / `btoa`
- `crypto` (or the crypto shim used by target)

## Output Contract
Always provide:
- Patch inventory: each hook name, intent, and toggle flag.
- Environment manifest: mocked objects and fields.
- Evidence log: which stack/error required each patch.
- Final replay proof: parameter correctness after applying minimal patch set.

## Read Next
Read [references/playbook.md](references/playbook.md) for anti-debug and env rules. Read [references/case-corpus.md](references/case-corpus.md) for bundled 66-case examples and full ID coverage.

