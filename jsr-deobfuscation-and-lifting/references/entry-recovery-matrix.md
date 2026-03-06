# Entry Recovery Matrix

| Container | First Anchor | Proves | Common Misread |
|---|---|---|---|
| Webpack | Bootstrap loader, chunk push, module cache, module id resolution | Which module actually owns the protected path | Reading helper modules before proving ownership |
| Worker | `new Worker`, blob URL creation, worker script URL, `importScripts`, `postMessage` shape | Whether the protected logic lives in the worker or only receives built data | Lifting worker internals before capturing the thread boundary |
| JSVMP or VM | Dispatcher loop, bytecode source, opcode fetch, handler table, host bridge | How business inputs enter the VM and how usable outputs come back | Chasing all handlers before isolating the target opcode path |
| WASM | `WebAssembly.instantiate` or `instantiateStreaming`, imports object, exported entries, memory wrappers | The JS-WASM contract before internal disassembly | Disassembling wasm before recovering JS-side normalization and decoding |
| Combined stack | Outermost owner first, then one boundary inward | Which layer actually owns control | Assuming the deepest layer is automatically the right starting point |

## Lift Discipline
- Recover ownership before cleanup.
- Apply reversible transforms only on the replay-critical path.
- Stop once lifted semantics can feed replay, locate, or protocol work directly.
