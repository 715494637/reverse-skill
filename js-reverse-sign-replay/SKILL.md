---
name: js-reverse-sign-replay
description: Rebuild and replay JavaScript signature and encryption parameters such as AES, RSA, MD5, and token/cookie sign chains. Use when tasks require converting traced code into stable offline reproduction scripts with regression checks.
---

# JS Reverse Sign Replay

## Specialized Triggers
Use this skill with priority when tasks involve:
- Mixed parameter chains across query, body, header, and cookie.
- Async sign providers or VM-interpreted signing boundaries.
- Protocol-encoded fields (protobuf/binary frame payloads) before or after crypto.
- Fast-changing token families that require robust regression and diff diagnostics.

## Workflow
1. Lock a reproducible sample. Save one known-good request input/output pair.
2. Split field sources. Classify fields as static, deterministic dynamic, random, and server-coupled.
3. Isolate the algorithm chain. Extract `normalize -> concat -> hash/encrypt -> encode`.
4. Build pure replay functions. Wrap each stage as independent functions with explicit arguments.
5. Reconstruct minimal runtime only. Add only required globals/polyfills for the target chain.
6. Validate against baseline. Compare every intermediate stage and final parameter string.
7. Ship a regression harness. Provide repeatable test vectors for future site updates.

## Advanced Notes
- Stage checkpoints are mandatory for diagnosis; final-value-only checks are insufficient.
- Keep async boundaries explicit (`await`/callback stage output snapshots).
- Separate offline-replay-capable fields from server-coupled challenge fields.

## Preferred Deliverable Structure
- `input_contract`: fixed payload and context values.
- `stages`: list of transformation functions and outputs.
- `final_sign`: final token/cookie/header value.
- `request_builder`: code that assembles the request from replay outputs.
- `regression`: pass/fail report for baseline and one controlled variation input.

## Replay Rules
- Keep algorithm code unchanged unless deobfuscation is required for readability.
- Preserve byte-level behavior (UTF-8, hex/base64 casing, padding mode, iv handling).
- Separate deterministic transforms from time/random providers.
- Inject clock/random providers so tests can freeze values.

## Read Next
Read [references/playbook.md](references/playbook.md) for replay rules.


