---
name: jsr-signature-and-replay
description: Use when reconstructing deterministic sign/token/cookie/header algorithms and shipping stable offline replay scripts with input-output verification.
---

# JSR Signature and Replay

## Overview
Rebuild sign, token, cookie, and header algorithms as deterministic stages, while explicitly separating pure local computation from server-issued state and request-chain preconditions.

## Scope Boundary
This skill owns algorithm staging, deterministic dependency injection, chain-coupled precondition modeling, replay reconstruction, and output verification.
It does not own locating unknown generation paths, broad runtime patching beyond proven dependencies, or transport-state machines outside the request builder boundary.

## Workflow
1. Freeze one known-good request chain, not just one final token, when acceptance depends on prior issue or verify steps.
2. Split the flow into preconditions and pure local stages.
3. Separate server-issued state from locally computable logic.
4. Rebuild each local stage as a pure function with explicit inputs.
5. Verify baseline, variant, and renewal-sensitive vectors against the full chain.

## Preferred JSReverser-MCP Path
- Default entry: use `analyze_target` to freeze one known-good chain, then use `create_hook` + `inject_hook`, `hook_function`, `list_network_requests`, and `get_network_request` to separate issued state from local computation.
- Escalate: if the target is gated by login, challenge, or renewal state, persist browser state with `save_session_state` and `restore_session_state` before extracting pure local stages. Use breakpoints only when issued state and local stages are still entangled after hook sampling.
- Required evidence: the issued-state dependency list is explicit, pure local stages are callable with declared inputs, and a replay script can pass a baseline vector plus at least one variant vector.

## Exit Gate
- Baseline vector passes.
- At least one variant vector passes.
- Replay explicitly models issued state and renewal-sensitive fields.
- Request assembly can consume replay output without hidden browser state.

## Output Contract
- Stage pipeline and I/O
- Issued-state dependency list
- Final replay function
- Request builder integration
- Regression report

## Read Next
- Read [../jsr-shared-references/jsreverser-mcp-routing.md](../jsr-shared-references/jsreverser-mcp-routing.md).
- Read [references/playbook.md](references/playbook.md).
- Read [references/challenge-state-matrix.md](references/challenge-state-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).