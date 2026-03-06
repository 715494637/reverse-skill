# Entry Recovery Matrix

## Webpack
- First anchor: bootstrap loader, chunk push, module cache, module id resolution.
- Goal: name the module that owns the target field or protected routine.
- Common mistake: reading helper modules before proving ownership.

## Worker
- First anchor: `new Worker`, blob URL creation, worker script URL, `importScripts`, `postMessage` payload shape.
- Goal: prove whether the protected logic lives in the worker or only receives already-built data.
- Common mistake: lifting worker internals before capturing the main-thread to worker contract.

## JSVMP or VM
- First anchor: dispatcher loop, bytecode array source, opcode fetch, handler table, host-call bridge.
- Goal: explain how business inputs enter the VM and how the VM returns usable outputs.
- Common mistake: chasing all handlers before identifying the few opcodes on the target path.

## WASM
- First anchor: `WebAssembly.instantiate` or `instantiateStreaming`, imports object, exported function names, memory and buffer wrappers.
- Goal: prove the JS wrapper contract before touching wasm internals.
- Common mistake: disassembling wasm before recovering input normalization and output decoding in JS.

## Combined Stacks
- If worker owns wasm: recover worker bootstrap before wasm bridge.
- If VM feeds wasm: recover VM host bridge before wasm internals.
- If webpack hides worker or VM creation: recover module ownership before all three.