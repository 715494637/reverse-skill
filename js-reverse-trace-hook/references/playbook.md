# Trace Hook Playbook

## Scope
- Locate the true parameter-generation path from request trigger to final assignment.
- Build a verifiable dependency map for dynamic request fields.
- Produce minimal extraction boundaries for replay handoff.

## Core Discipline
- Use hypothesis-driven hooks with explicit evidence goals.
- Start narrow, widen only when evidence is insufficient.
- Prefer transport-to-builder tracing before deep crypto tracing.
- Remove broad probes after chain confirmation.

## Entry Strategy Ladder
Use this order when locating the first stable breakpoint:
1. Transport entry breakpoints (`fetch`, XHR, websocket send wrappers).
2. DOM event breakpoints for click/submit-triggered flows when search fails.
3. Serializer hooks (`JSON.stringify`, query builders, payload encoders).
4. Cookie setter hooks for token/cookie chains.
5. Crypto/sign wrapper hooks after builder path is confirmed.

## Trace Architecture
- Layer 1: request transport.
- Layer 2: request builder and serializer.
- Layer 3: sign/encrypt wrappers.
- Layer 4: upstream providers (`time`, random, token, fingerprint, storage).

## Loader and Bundle Navigation
- Detect module-loader patterns (`IIFE`, `.call/.apply`, `exports` usage).
- For split bundles, recover loader first, then target module boundaries.
- For jsonp-style loaders, hook loader registration path to capture module ids.
- Avoid full-bundle blind scanning once loader entry is identified.

## WebSocket and Protocol Flows
- Separate handshake validation from application-frame encryption flow.
- Record frame direction, format, and decode prerequisites.
- Mark binary-message flows early; do not assume string payloads.
- For protobuf-like fields, identify serialize/encode boundary before signing stage.

## JSVMP and Obfuscated Targets
- Combine request breakpoints with controlled instrumentation probes.
- Gate probe output by target URL/marker to avoid log storms.
- Track VM boundary data (input snapshot, output snapshot, call-site context).
- Keep a stop condition: once target field lineage is proven, stop VM-wide probing.

## Header and Multi-Field Families
- Group correlated headers as one chain (`traceparent`-style + custom headers).
- Track generation order and shared seeds across fields.
- Distinguish truly independent fields from same-timestamp siblings.

## Logging Contract
- `request_id`: correlation id across all hooks.
- `request_context`: url, method, headers, payload digest.
- `field_lineage`: source function, upstream inputs, transform order.
- `runtime_dependencies`: timestamp/random/token/fingerprint sources.

Use structured logs; avoid free-form debug spam.

## Failure Diagnostics
- Wrong function, right layer: branch confusion (retry/interceptor path).
- Right function, wrong value: missing upstream normalization stage.
- Too many candidate chains: hook scope too broad.
- Non-reproducible capture: unstable runtime context.

## Output Contract
- `target_request_table`: endpoint and target dynamic fields.
- `dependency_map`: dynamic field to upstream source map.
- `call_chain`: request entry -> builder -> sign/encrypt -> assignment.
- `verified_boundary`: function/module boundary for extraction or replay.
- `proof_snippet`: minimal runnable capture or reproduction probe.

## Quality Gate
Accept only when all are true:
- Same dynamic field can be reproduced from the verified chain.
- Upstream dependencies are explicit and testable.
- Hook scope is minimal and operationally safe.
