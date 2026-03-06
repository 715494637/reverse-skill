# Distilled Reverse Knowledge: Deobfuscation and Lifting

## Core Judgments
- Recover the outer execution container before touching inner transforms.
- Readability without behavioral equivalence is cosmetic, not reverse progress.
- Webpack, worker, VM, and WASM are boundary problems before they are cleanup problems.
- Lift only the critical analysis path; whole-bundle beautification is usually waste.
- Reversible transforms beat large irreversible rewrites.
- Recovered names are justified only after behavior is proven.
- Full opcode or full bundle coverage is unnecessary when the critical path is already explicit.

## Common Misreads
- Starting inside obfuscated helpers before recovering who owns execution.
- Spending time on pretty-print cleanup that does not improve later analysis or tracing.
- Treating worker bytes, VM bytecode, or wasm exports as self-explanatory without bridge recovery.
- Assuming the deepest layer is the most valuable layer.

## Evidence Standard
- One explicit execution entry path.
- One semantic stage map on the critical path.
- One equivalence check between original and lifted behavior.
- One recovered analysis artifact that later locate, stage-analysis, or protocol work can reuse.
