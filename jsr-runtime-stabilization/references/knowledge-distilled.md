# Distilled Reverse Knowledge: Runtime Stabilization

## Fifteen Core Principles
1. Assume execution-semantic mismatch before assuming crypto failure.
2. Classify failures first: anti-debug, missing API, fingerprint mismatch, or non-determinism.
3. Neutralize blocking anti-debug loops before adding environment shims.
4. Build the smallest runtime that satisfies the proven call stack.
5. Link every patch to one observed failure or stack frame.
6. Freeze time, random, and device identifiers before comparing outputs.
7. Prefer structural fidelity over cosmetic browser imitation.
8. Never patch fields you cannot justify with evidence.
9. Remove non-essential patches after success to detect overpatching.
10. Validate intermediate stages, not only final sign or token output.
11. Keep all patches reversible and separately switchable.
12. Treat environment snapshots and live runtime values as different classes of data.
13. Separate anti-debug bypass from fingerprint spoofing in your reasoning.
14. Reject one-off success that cannot be reproduced under fixed inputs.
15. End stabilization only when the core chain survives with minimal patches.

## High-Value Runtime Signals
- Dynamic `debugger` generation through `Function` or `constructor`
- Timer traps through `setInterval` or `setTimeout`
- DevTools detection through viewport or outer and inner size checks
- Tamper probes using `toString`, console behavior, or performance APIs
- Fingerprint surfaces under navigator, screen, canvas, storage, time, and random providers
- Remote CDP instrumentation when local stepping triggers anti-debug

## Stable Runtime Gate
- Same input gives the same intermediate outputs.
- Patch inventory maps one-to-one to failures.
- Removing non-critical patches does not break the core path.