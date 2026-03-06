# Playbook

## Entry Recovery Matrix
- Webpack or bundled loaders: recover the loader, target module id, export surface, and chunk ownership before reading unrelated bundle code.
- Worker-packed logic: recover `new Worker`, blob URL creation, `importScripts`, `postMessage`, and `onmessage` schema before lifting worker internals.
- VM or JSVMP flows: find the dispatcher loop, bytecode source, opcode table, register or stack model, and host-call bridge first.
- WASM bridges: map `instantiate` or `instantiateStreaming`, imports object, exported entry, memory writes, and text or byte wrappers before internal disassembly.
- Mixed VM plus WASM flows: recover the outermost owner first, then the next boundary inward.

## Lift Discipline
1. Isolate the smallest high-value block.
2. Apply one reversible transform step.
3. Re-run or compare outputs after each meaningful lift.
4. Rename recovered semantics only after behavior is proven.
5. Stop once replay-critical semantics are readable and checkable.

## Failure Smells
- Pretty code without stable equivalence is a failed lift.
- Whole-bundle cleanup before critical-path recovery wastes time.
- Worker bytecode or wasm bytes without recovered boundary ownership usually means you started too deep.