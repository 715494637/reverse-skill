# Playbook

## Default MCP Chain
1. Use `collect_code` to gather only the scripts on the active execution path.
2. Use `search_in_sources` and `get_script_source` to recover the outer container: webpack loader, worker bootstrap, VM shell, or JS-WASM bridge.
3. Use `understand_code` on the bounded entry path before transforming anything.
4. Use `deobfuscate_code` only on replay-critical fragments, then verify live ownership with `trace_function` or `hook_function`.

## Entry Recovery Matrix
- Webpack: recover loader, module id, export surface, and chunk ownership.
- Worker: recover `new Worker`, blob URL creation, `importScripts`, `postMessage`, and `onmessage` schema.
- VM or JSVMP: recover dispatcher, bytecode source, opcode table, register or stack model, and host bridge.
- WASM: recover `instantiate` or `instantiateStreaming`, imports object, exported entry, and memory bridge.
- Mixed packing: recover the outermost owner first, then move one boundary inward.

## Escalation Rule
- Start from the outer container, not from obfuscated inner helpers.
- Apply one reversible transform step at a time.
- Use `trace_function` or `hook_function` to prove bridges before stepping through locals.
- Escalate to breakpoints only when dispatch state, bridge values, or opcode locals stay hidden from static and hook views.

## Done Criteria
- The true protected entry path is explicit.
- Critical logic is lifted into named semantic stages.
- Original and lifted outputs still match on the replay-critical path.
- Replay or locate work can continue without reopening the bundle shell.
