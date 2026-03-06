---
name: jsr-deobfuscation-and-lifting
description: Use when obfuscated JavaScript, AST transforms, JSVMP, or WASM blocks direct understanding and logic must be lifted into readable semantics.
---

# JSR Deobfuscation and Lifting

## Overview
Turn unreadable obfuscation, AST tricks, VM dispatch, worker packing, and WASM bridges into readable semantic stages on the critical analysis path.

## Scope Boundary
This skill owns execution-container recovery, transform planning, VM or WASM semantic recovery, and equivalence checks on the critical path.
It does not own end-to-end automation delivery or broad cosmetic cleanup that does not improve recoverable semantics.

## Workflow
1. Recover the outer execution container first: webpack loader, worker bootstrap, VM shell, or JS-WASM bridge.
2. Isolate the business-critical path before broad cleanup.
3. Apply small, reversible transforms or opcode-mapping steps.
4. Lift critical logic into named semantic stages.
5. Validate lifted stages against original runtime outputs.

## Preferred JSReverser-MCP Path
- Default entry: use `collect_code`, `search_in_sources`, `get_script_source`, and `understand_code` to recover the outer execution container before touching inner logic.
- Escalate: use `collection_diff` when challenge state, lazy chunks, or worker startup may change the loaded script set. Use `deobfuscate_code`, `trace_function`, `hook_function`, or `inspect_object` only after the outer container is narrowed. Move to breakpoints only when opcode state, bridge values, or dispatch locals remain hidden from static and hook views. Use `inject_preload_script` only when early bootstrap behavior must be observed before normal hooks.
- Valuable add-ons: use `record_reverse_evidence` to capture transform steps and semantic checkpoints, and `export_session_report` when lifted logic should be handed to later locate, signature, or protocol work.
- Avoid first: do not start with `deobfuscate_code`, breakpoint tools, or crypto classification before the outer container and critical entry are explicit.
- Required evidence: the actual execution entry is explicit, critical logic is lifted into named semantic stages, and original versus lifted outputs still match on the critical analysis path.

## Exit Gate
- The critical path is explainable in semantic stages.
- The actual execution entry is explicit.
- Pre-transform and post-transform outputs still match.
- Recovered logic can feed later locate, stage-analysis, or protocol work directly.

## Output Contract
- Execution-container diagnosis
- Transform or lift log
- Opcode, bridge, or AST rule table when relevant
- Semantic-equivalence evidence

## Read Next
- Read [../jsr-shared-references/jsr-mcp-routing.md](../jsr-shared-references/jsr-mcp-routing.md).
- Read [references/playbook.md](references/playbook.md).
- Read [references/entry-recovery-matrix.md](references/entry-recovery-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).
