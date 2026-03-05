# Env and Antidebug Playbook

## Scope
- Neutralize anti-debug blockers without breaking business logic.
- Rebuild only the runtime surface actually touched by the target chain.
- Keep risk-control, token lifecycle, and replay context consistent.

## Core Discipline
- Patch predicates first, not whole subsystems.
- Add shims from first-fault evidence, never from speculation.
- Keep every hook reversible with explicit toggle flags.
- Prove minimality by removing non-essential patches after success.

## Triage Matrix
Classify blockers before patching:
1. Execution blockers: infinite `debugger`, timer traps, dead loops.
2. Integrity blockers: native checks, source hash checks, descriptor checks.
3. Environment blockers: missing browser APIs or wrong object shape.
4. Risk blockers: cookie/token acquisition, captcha voucher coupling, fingerprint drift.

## Patch Order
1. Stop hard execution blockers (`Function` constructor payloads, timer traps).
2. Stabilize call-chain visibility (controlled logging and breakpoint gates).
3. Patch integrity checks with narrow branch-level edits.
4. Add minimal environment shims.
5. Validate risk-token flow and session consistency.

## Practical Hook Anchors
- `Function.prototype.constructor` and dynamic `debugger` payload generation.
- `setTimeout` and `setInterval` trap callbacks with suspicious cadence.
- `Object.defineProperty(document, 'cookie', ...)` for cookie lineage capture.
- `JSON.stringify` or serializer hooks when body signing happens pre-transport.

## Injection Channels
- Browser extension content scripts.
- Userscript managers (for page-context hooks).
- Proxy/plugin injection (for pre-page script insertion).

Choose the least invasive channel that still gives deterministic execution control.

## Environment Reconstruction Rules
- Start from minimum browser set: `window`, `document`, `navigator`, `location`, `screen`, storage, `atob`/`btoa`, crypto adapter.
- Match descriptors and value types, not only property names.
- Keep deterministic providers injectable (`Date.now`, random source, timezone/locale formatting).
- Avoid broad `window = global` style rewrites unless target loader requires it.

## JSVMP and VM-Like Targets
- Inspect VM code touchpoints first; do not start with full proxy environment.
- Prefer instrumentation of VM boundary values over blind global patching.
- Gate logs by request condition or token marker to prevent console floods and hangs.
- Keep XHR/fetch breakpoints active while instrumenting VM internals to preserve call-chain alignment.

## Risk-Control Integration
- Separate `core_sign_lane` and `risk_token_lane`.
- Treat captcha outputs (for example voucher-like fields) as independent state artifacts.
- Keep session-bound identifiers stable within one replay run.
- Record token validity boundaries: ttl, binding fields, origin scope.

## RS-Style Defensive Stacks (Heuristic Only)
- Cookie prefix patterns and port-derived hints can suggest generation family.
- Entry tuple markers in obfuscated dispatchers can accelerate navigation.
- These are acceleration hints, not proof; always confirm with runtime call-chain evidence.

## Failure Diagnostics
- Correct hook, wrong output: upstream normalization or descriptor mismatch.
- Intermittent pass/fail: unstable timestamp/random/session context.
- Hook works but downstream rejects: risk-token lane not synchronized.
- Page runs slower or breaks globally: overpatching or broad prototype mutation.

## Output Contract
- `patch_inventory`: hook, intent, toggle, blast radius.
- `environment_manifest`: mocked fields, types, descriptors, and rationale.
- `evidence_log`: stack trace or runtime symptom that justified each patch.
- `risk_state_notes`: token lifecycle and coupling assumptions.
- `replay_proof`: deterministic parameter output under minimal patch set.

## Quality Gate
Accept only when all are true:
- Minimal patch set reproduces target output.
- Removing any non-essential patch keeps correctness unchanged.
- Risk-token state assumptions are explicit and verified.
