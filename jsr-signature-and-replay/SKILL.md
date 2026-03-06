---
name: jsr-signature-and-replay
description: Use when dynamic request fields need stage-by-stage analysis, with clear separation between local computation, prior state dependencies, and reproducible verification evidence.
---

# JSR Signature and Replay

## Overview
Analyze dynamic request fields as deterministic stages, while explicitly separating locally reproducible logic from prior state dependencies and request-chain preconditions.

This skill is intended for authorized analysis, debugging, and dependency modeling. It prioritizes mechanism explanation, stage boundaries, and controlled verification notes over direct automation deliverables.

## Scope Boundary
This skill owns stage decomposition, dependency injection design, prior-state modeling, and reproducible evidence collection.
It does not own locating unknown generation paths, broad runtime patching beyond proven dependencies, or protocol-state maintenance outside the request builder boundary.

## Workflow
1. Fix one known sample chain when conclusions depend on earlier issue or verify stages.
2. Split the flow into prior-state preconditions and locally reproducible stages.
3. Separate prior-state dependencies from locally computable logic.
4. Express each local stage as a pure function with explicit inputs.
5. Compare baseline and variant samples to explain which fields are stable, which are stateful, and which are renewal-sensitive.

## Preferred JSReverser-MCP Path
- Default entry: use `analyze_target` to fix one known sample chain, then use `create_hook` + `inject_hook`, `hook_function`, `list_network_requests`, and `get_network_request` to separate prior-state inputs from local computation.
- Escalate: if the target depends on login, prior challenge, or renewal state, record browser state with `save_session_state` and `restore_session_state` before extracting local stages. Use breakpoints only when state dependencies and local stages remain entangled after sampling.
- Required evidence: the dependency list is explicit, local stages are callable with declared inputs, and baseline versus variant samples can be explained without hidden assumptions.

## Exit Gate
- Baseline and variant samples are both explained.
- Prior-state dependencies and renewal-sensitive fields are listed explicitly.
- Local stages can be described with explicit inputs and outputs.
- The resulting notes can be reused for controlled verification without hidden browser assumptions.

## Output Contract
- Stage pipeline and I/O
- Prior-state dependency list
- Local-stage descriptions or pseudocode
- Controlled verification notes
- Regression report

## Read Next
- Read [../jsr-shared-references/jsr-mcp-routing.md](../jsr-shared-references/jsr-mcp-routing.md).
- Read [references/playbook.md](references/playbook.md).
- Read [references/challenge-state-matrix.md](references/challenge-state-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).
