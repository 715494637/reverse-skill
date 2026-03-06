# Distilled Reverse Knowledge: Runtime Stabilization

## Core Judgments
- Browser success plus local failure usually means runtime mismatch before it means crypto failure.
- Blocking debug friction should be isolated before environment patching can be trusted.
- Session or challenge state is a different problem from missing globals or headless markers.
- Overpatching hides the true dependency set and creates fake success.
- Time, random, and device-like values belong in deterministic providers, not scattered patches.
- Prototype-level reads should be fixed at the prototype boundary only when the stack proves that path.
- A stabilization result is not reliable until the core chain reruns under fixed inputs.

## Common Misreads
- Patching `window`, `document`, and `navigator` in bulk before locating the first blocking read.
- Mixing debug-branch isolation, fingerprint correction, and session restoration into one undifferentiated patch pile.
- Treating one successful run under uncontrolled inputs as stable.
- Restoring login state and calling that a runtime fix when the real issue is elsewhere.

## Evidence Standard
- One blocking path is named and isolated.
- One minimal environment manifest is explicit.
- Fixed inputs now reproduce stable intermediate outputs.
- Removing non-critical patches does not break the core path.
