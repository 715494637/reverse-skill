# Anti-Bot Surface Matrix

| Surface | First Anchor | Proves | Common Misread |
|---|---|---|---|
| Slider or point-select captcha | Challenge bootstrap, verify request, trajectory packer | Whether success depends on timing and lineage, not only payload bytes | Reusing final payload bytes without modeling challenge state |
| Device fingerprint or blackbox | Bootstrap config, profile request, final `blackbox` writer | Whether output is collected profile plus encoding, not one crypto helper | Treating blackbox as a standalone encryption routine |
| WAF token or sensor data | Challenge script loader, sensor builder, cookie or header setter, renewal trigger | Whether token validity depends on page lifecycle and refresh sequence | Reusing one token without modeling renewal |
| Worker-backed risk logic | `new Worker`, blob bootstrap, `postMessage`, worker response writer | Whether decisive reads occur inside the worker realm | Patching main-thread globals while missing worker-side reads |

## Patch Order
- Isolate blocking debug or runtime-difference surfaces before broad environment simulation.
- Restore session or challenge state before inventing browser patches.
- Patch only the surface that the stack or probe proves is decisive.
