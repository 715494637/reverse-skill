# Distilled Reverse Knowledge: Deobfuscation and Lifting

## Fifteen Core Principles
1. Recover semantics on the critical path, not beauty across the whole bundle.
2. Identify the obfuscation family before transforming anything.
3. Recover the owning execution container before inner transforms.
4. Treat webpack, worker, VM, and WASM as boundary problems before they are code-cleanup problems.
5. Isolate target-related blocks before low-value cleanup.
6. Use small, reversible transform steps with rollback points.
7. Validate behavioral equivalence after every meaningful transform.
8. Name recovered semantics only after behavior is proven.
9. For worker flows, recover bootstrap, message schema, and transfer boundary first.
10. For VM flows, map dispatcher, bytecode source, and host-call bridge before deep opcode coverage.
11. For WASM flows, recover JS-WASM imports, exports, and memory bridge before internal disassembly.
12. Preserve byte-level behavior while improving readability.
13. Reject transforms that improve appearance but weaken replay fidelity.
14. Stop lifting once replay-critical semantics are recoverable.
15. Output must be consumable by replay or tracing workflows, or the lift is unfinished.

## Entry Recovery Priorities
- Webpack loader and module ownership
- Worker bootstrap and message boundary
- VM dispatcher and host bridge
- JS-WASM wrapper and import-export surface

## Semantic Exit Gate
- Critical path is explainable.
- Protected entry path is explicit.
- Pre-transform and post-transform outputs match.
- Recovered logic can feed the next skill directly.