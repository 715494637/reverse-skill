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
- Read [references/playbook.md](references/playbook.md).
- Read [references/challenge-state-matrix.md](references/challenge-state-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).