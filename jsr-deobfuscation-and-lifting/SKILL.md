---
name: jsr-deobfuscation-and-lifting
description: Use when obfuscated JavaScript, AST transforms, JSVMP, or WASM blocks direct understanding and logic must be lifted into readable semantics.
---

# JSR Deobfuscation and Lifting

## Overview
Turn unreadable obfuscation, AST tricks, VM dispatch, worker packing, and WASM bridges into readable semantic stages on the replay-critical path.

## Scope Boundary
This skill owns execution-container recovery, transform planning, VM or WASM semantic recovery, and equivalence checks on the critical path.
It does not own end-to-end replay delivery or broad cosmetic cleanup that does not improve recoverable semantics.

## Workflow
1. Recover the outer execution container first: webpack loader, worker bootstrap, VM shell, or JS-WASM bridge.
2. Isolate the business-critical path before broad cleanup.
3. Apply small, reversible transforms or opcode-mapping steps.
4. Lift critical logic into named semantic stages.
5. Validate lifted stages against original runtime outputs.

## Preferred JSReverser-MCP Path
- Default entry: use `collect_code`, `search_in_sources`, `get_script_source`, and `understand_code` to recover the outer execution container before touching inner logic.
- Escalate: use `deobfuscate_code`, `trace_function`, and `hook_function` to confirm live bridges across webpack loaders, workers, VM shells, or JS-WASM boundaries. Move to breakpoints only when opcode state, bridge values, or dispatch locals remain hidden from static and hook views.
- Required evidence: the true protected entry path is explicit, critical logic is lifted into named semantic stages, and original versus lifted outputs still match on the replay-critical path.

## Exit Gate
- The critical path is explainable in semantic stages.
- The true protected entry path is explicit.
- Pre-transform and post-transform outputs still match.
- Recovered logic can feed replay, tracing, or protocol work directly.

## Output Contract
- Execution-container diagnosis
- Transform or lift log
- Opcode, bridge, or AST rule table when relevant
- Semantic-equivalence evidence

## Read Next
- Read [../shared-references/jsreverser-mcp-routing.md](../shared-references/jsreverser-mcp-routing.md).
- Read [references/playbook.md](references/playbook.md).
- Read [references/entry-recovery-matrix.md](references/entry-recovery-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).