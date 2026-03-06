---
name: jsr-trace-and-locate
description: Use when the formation path of dynamic request fields is unclear and you need low-distortion observation, call-path mapping, and evidence for where values are assigned.
---

# JSR Trace and Locate

## Overview
Find where dynamic fields are formed. Classify the sink, choose the least-distorting observation mode, and map the real parameter path from write boundary back to builder cause.

This skill focuses on authorized analysis and debugging. It prioritizes observable evidence, repeatable call-path summaries, and boundary identification over automation-oriented outputs.

## Scope Boundary
This skill owns discovery of the request trigger path, write boundary, assignment point, builder path, and crypto boundary.
It does not own runtime patching, large-scale deobfuscation, direct automation delivery, or protocol maintenance after the source-of-truth function is proven.

## Workflow
1. Classify the target field by sink class: body, header, cookie, storage, frame, or worker-returned value.
2. Choose the observation mode: local breakpoint, injected observation, or remote CDP-style instrumentation.
3. Observe the nearest write boundary before diving into crypto internals.
4. Walk the stack upward until the builder and dependency sources are explicit.
5. Confirm the source-of-truth function with minimal reproducible evidence.

## Preferred JSReverser-MCP Path
- Default entry: use `analyze_target` when page state is still unclear, then prefer `create_hook` + `inject_hook` + `get_hook_data` on the nearest request write surface such as `fetch`, `xhr`, `websocket`, header setters, or known sink helpers.
- Escalate: use `hook_function`, `trace_function`, or `inspect_object` before breakpoints. Move to `break_on_xhr`, `get_request_initiator`, `set_breakpoint_on_text`, or `evaluate_on_callframe` only when observation evidence still cannot prove the builder-to-writer chain. Use `inject_preload_script` only when the observation point appears before normal page hooks can be installed.
- Valuable add-ons: use `record_reverse_evidence` to save stable builder and writer findings, and `export_session_report` when the locate result should be handed to another skill.
- Avoid first: do not start with crypto keyword search, `detect_crypto`, or breakpoint tools before proving the write boundary.
- Required evidence: one stable request fingerprint, one verified stack from trigger to writer, and one named builder function that survives rerun.

## Exit Gate
- The final write boundary and builder function are both proven.
- The call chain from request entry to assignment is mapped.
- The chosen observation mode no longer changes conclusions.
- The next skill can start from named target functions without redoing locate work.

## Output Contract
- Call-chain map: entry -> builder -> writer
- Verified function signatures
- Write-boundary choice with reason
- Minimal reproducible trace evidence

## Read Next
- Read [../jsr-shared-references/jsr-mcp-routing.md](../jsr-shared-references/jsr-mcp-routing.md).
- Read [references/playbook.md](references/playbook.md).
- Read [references/writer-boundary-matrix.md](references/writer-boundary-matrix.md).
- Read [references/knowledge-distilled.md](references/knowledge-distilled.md).
