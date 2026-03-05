# Sign Replay Playbook

## Scope
- Rebuild and verify deterministic generation of sign, token, cookie, and header parameters.
- Support crypto chains and protocol-encoded payload chains in one replay model.
- Deliver regression-safe replay that survives target-side iteration.

## Core Discipline
- Preserve byte semantics across every stage.
- Isolate deterministic transforms from runtime providers and server-coupled values.
- Validate stage outputs, not only final output.
- Keep replay code auditable and easy to diff on updates.

## Stage Model
Use this strict chain:
1. Canonicalization
2. Seed composition
3. Crypto/hash transform
4. Output wrapping and encoding
5. Injection into request or frame

Each stage must expose explicit input, output, and dependency contracts.

## Field Classification
Classify every dynamic field before implementation:
- Deterministic local field.
- Runtime-dependent field (`time`, `random`, device/env).
- Session-coupled field.
- Server-coupled field (challenge/captcha/voucher/token-return dependent).

Do not merge classes in one function.

## Chain Families To Handle Explicitly
- Body/query sign chains.
- Header families (`traceparent`-style and custom multi-header families).
- Cookie-derived parameter chains.
- Async sign providers (for example promise-based global sign APIs).
- Protocol payload fields (protobuf/base64/binary frame payloads).

## Canonicalization Rules
- Freeze key order, delimiter policy, whitespace policy, and null policy.
- Define exact encoding boundaries (string, UTF-8 bytes, hex bytes).
- Separate business payload normalization from anti-bot context normalization.
- Track URL/header casing requirements explicitly.

## Algorithm Engineering Notes
- AES: verify mode, padding, iv source, and key byte interpretation.
- RSA: verify key format and padding mode.
- MD5/SHA: verify preimage order, delimiters, and casing.
- Mixed chains: confirm hash reuse as key/iv/seed.
- National crypto variants: isolate adapters and dependency boundaries.

## Async and VM-Affected Sign Paths
- Treat async sign providers as awaited stage boundaries with timeout control.
- Snapshot inputs and outputs around VM-interpreted functions.
- Use instrumentation checkpoints when direct deobfuscation is costly.
- Keep fallback path: RPC/online call only when offline replay is provably infeasible.

## Protocol-Aware Replay
- WebSocket: separate handshake metadata from encrypted application frame content.
- Binary message chains: decode framing before replaying sign logic.
- Protobuf-style payloads: validate serialization schema before crypto stage comparisons.

## Determinism Contract
- Inject clock and random providers.
- Freeze locale and timezone-sensitive formatters.
- Avoid hidden global reads.
- Keep serializer and encoder implementations pinned.

## Failure Diagnosis Tree
- Mismatch at stage 1: canonicalization or encoding policy drift.
- Mismatch at stage 2: seed composition or source-field mapping error.
- Mismatch at stage 3: crypto params/provider drift.
- Mismatch at stage 4: wrapping or casing/padding mismatch.
- Mismatch at stage 5: wrong injection location or transport encoding mismatch.
- Intermittent mismatch: unstable runtime/session context.

## Output Contract
- `input_contract`: fixed replay input and runtime context.
- `stages`: deterministic stage functions with checkpoints.
- `dependency_matrix`: field-to-source classification.
- `final_sign`: generated final target value(s).
- `request_builder`: assembly or frame-construction function.
- `regression_report`: baseline plus controlled variant comparison.

## Quality Gate
Accept only when all are true:
- Stage-level checkpoints match expected values.
- Final outputs are reproducible under deterministic providers.
- Variant diffs are explainable by declared dependencies.
