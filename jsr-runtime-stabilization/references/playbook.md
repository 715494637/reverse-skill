# Playbook

## Anti-Debug Matrix
- Dynamic `debugger` construction through `Function` or `constructor`: intercept the dynamic-function path rather than patching unrelated logic.
- Timer traps through `setInterval` or `setTimeout`: neutralize the proven callback path, not global timing behavior.
- DevTools open-state checks through viewport or outer and inner size mismatches: patch only the observed dimensions.
- `toString`, console, or performance probes: preserve native-looking behavior before spoofing returned values.
- Main-thread lockout with usable browser traffic: move observation to remote CDP control or early injected hooks.

## Environment Patch Triage
- Missing global object: create the smallest shell that satisfies the stack.
- Missing prototype method or getter: patch the prototype, not one instance.
- Fingerprint reads: satisfy only touched properties such as navigator, screen, canvas, storage, or timing.
- Headless markers: patch only fields proven by logs or proxy traces.

## Stabilization Loop
1. Capture the first failing stack or access trace.
2. Bypass blocking anti-debug logic.
3. Add one minimal patch for one observed failure.
4. Freeze time, random, and device-like IDs before comparing outputs.
5. Remove non-critical patches after success to detect overpatching.