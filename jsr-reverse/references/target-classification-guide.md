# Target Classification Guide

## Purpose

Rapid lookup for complexity grading and first-stage selection during intake. Use this at the start of a task when the user provides a URL, target field, or scenario description.

This file does not replace the full intake process. It accelerates the initial complexity estimate so that the Evidence Gate and stage routing can start faster.

## Classification Table

| Target Type | Typical Signals | Initial Grade | Expected First Stage | Key References |
|---|---|---|---|---|
| **Simple parameter concatenation** | URL/body field = visible `concat(a, b, timestamp)`, no encryption | L1 | locate | `locate-workflow.md` |
| **Single hash/HMAC signature** | Field looks like MD5/SHA hex, one crypto call visible in stack | L2 | locate | `locate-workflow.md` + `crypto-entry-locating.md` |
| **Encrypted request body** | AES/DES/RSA wrapped payload, key location unknown | L2 | locate | `locate-workflow.md` + `crypto-entry-locating.md` |
| **JS-written cookie chain** | `document.cookie` writes with multi-step builder | L2 | locate | `locate-workflow.md` + `hook-and-boundary-patterns.md` |
| **Response-dependent token** | Token from response A used in request B header/body | L2 | locate (upstream expansion) | `locate-workflow.md` + `request-chain-recording.md` |
| **Webpack-bundled logic** | Target function hidden inside webpack module; loader shell | L2-L3 | locate → recover | `recover-strategy.md` + `wasm-worker-webpack.md` |
| **Worker-generated value** | Value arrives via `postMessage` from Web Worker | L2-L3 | locate → recover | `recover-strategy.md` + `wasm-worker-webpack.md` |
| **WASM computation** | Critical function is a WASM export | L3 | locate → recover | `recover-strategy.md` + `wasm-worker-webpack.md` |
| **AST-obfuscated code** | Control-flow flattening, string tables, proxy helpers | L3 | locate → recover | `recover-strategy.md` + `ast-deobfuscation-playbook.md` |
| **JSVMP-protected logic** | Dispatcher loop, bytecode array, virtual registers | L3-L4 | locate → recover | `recover-strategy.md` + `jsvmp-and-ast.md` |
| **Environment-dependent branching** | Different results in browser vs. Node.js; fingerprint checks | L3 | locate → recover → runtime | `runtime-diagnosis.md` + `minimal-env-design.md` |
| **Anti-debug protected** | Infinite debugger loops, timing checks, stack probes | L3 | locate → runtime | `runtime-diagnosis.md` + `anti-debug-and-risk-branches.md` |
| **WebSocket/protobuf protocol** | Binary frames, heartbeat, sequence numbers, renewal | L2-L3 | locate | `locate-workflow.md` + `protocol-and-long-connection.md` |
| **Cookie challenge (non-RS)** | 403/challenge page → cookie → retry | L2-L3 | locate | `locate-workflow.md` + `request-chain-recording.md` |
| **RS/瑞数 protection** | 412 response, `$_ts`, `r2mKa`, `meta[r=m]`, two-hop cookies | L4 | locate | `rs-collection-and-two-hop-routing.md` |
| **RS + JSVMP** | RS shell with basearr, dispatcher, hasDebug variant | L4 | locate → recover → runtime | Full RS reference chain |
| **Fingerprint SDK** | deviceId, blackbox, sensor_data, slider challenge | L3-L4 | locate → runtime | `runtime-diagnosis.md` + `anti-debug-and-risk-branches.md` |
| **sdenv/jsdom replay** | Need to replay page in local jsdom; lifecycle-produced state | L3-L4 | locate → runtime | `runtime-diagnosis.md` + `sdenv-fit-check-and-routing.md` |

## How to Use

1. Match the user's description to the closest row(s) above
2. Assign the initial complexity grade
3. Note the expected first stage — this is a hint, not an override
4. The Evidence Gate still runs before stage routing
5. Revise the grade upward if evidence reveals hidden complexity

## Compound Targets

Real targets often combine multiple types. For compound targets:

- Start with the **outermost blocker** (usually the first unknown in the request chain)
- The initial grade should reflect the **hardest known component**
- As you progress through stages, the grade may reveal itself to be higher

Example: "Login API with encrypted body + JSVMP + anti-debug"
- Initial grade: L3 (JSVMP + anti-debug signals)
- May escalate to L4 if environment-dependent risk branches are discovered
- First stage: `locate` (prove which request, which field, what the write boundary is)

## Grade Revision Rules

| Discovery | Grade change |
|---|---|
| What looked like simple concat has a hidden crypto layer | L1 → L2 |
| Single crypto call is inside a JSVMP dispatcher | L2 → L3 |
| JSVMP has environment-dependent risk branches | L3 → L4 |
| RS-style two-hop with hasDebug variant | L3 → L4 |
| No hidden complexity found after evidence gate | Keep current grade |

Never revise downward without proof that the previously suspected complexity does not exist.
