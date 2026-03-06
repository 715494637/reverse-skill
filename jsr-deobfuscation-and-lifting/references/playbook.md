# Playbook

## Default MCP Chain
1. Use `collect_code` to gather only the scripts on the active execution path.
2. Use `search_in_sources` and `get_script_source` to recover the outer container: webpack loader, worker bootstrap, VM shell, or JS-WASM bridge.
3. Use `collection_diff` when actions, worker startup, or lazy chunks may change the loaded script set.
4. Use `understand_code` on the bounded entry path before transforming anything.
5. Use `deobfuscate_code` only on critical analysis fragments, then verify live ownership with `trace_function`, `hook_function`, or `inspect_object`.
6. Use `record_reverse_evidence` to capture transform checkpoints that later skills should reuse.

## Entry Recovery Matrix
- Webpack: recover loader, module id, export surface, and chunk ownership.
- Worker: recover `new Worker`, blob URL creation, `importScripts`, `postMessage`, and `onmessage` schema.
- VM or JSVMP: recover dispatcher, bytecode source, opcode table, register or stack model, and host bridge.
- WASM: recover `instantiate` or `instantiateStreaming`, imports object, exported entry, and memory bridge.
- Mixed packing: recover the outermost owner first, then move one boundary inward.

## Escalation Rule
- Start from the outer container, not from obfuscated inner helpers.
- Apply one reversible transform step at a time.
- Use `trace_function`, `hook_function`, or `inspect_object` to prove bridges before stepping through locals.
- Use `inject_preload_script` only when early bootstrap behavior must be observed before normal hooks.
- Escalate to breakpoints only when dispatch state, bridge values, or opcode locals stay hidden from static and hook views.

## Done Criteria
- The actual execution entry is explicit.
- Critical logic is lifted into named semantic stages.
- Original and lifted outputs still match on the critical analysis path.
- Later locate, stage-analysis, or protocol work can continue without reopening the bundle shell.
