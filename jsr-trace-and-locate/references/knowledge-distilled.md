# Distilled Reverse Knowledge: Trace and Locate

## Fifteen Core Principles
1. Begin from request sinks, not random utility functions.
2. Treat send-time values as symptoms; treat builder functions as causes.
3. When the sink class is known, probe the writer boundary before crypto internals.
4. Walk stacks upward until input constraints become explicit.
5. Trust dataflow over variable names and file names.
6. Probe minimally; every hook must answer a specific question.
7. Prefer deterministic input-output logging over broad console spam.
8. Choose the least-distorting observation mode that still answers the question.
9. If local stepping changes timing or triggers anti-debug, switch to injected logging or remote CDP-style observation.
10. For header and cookie targets, trust the writer more than the final request snapshot.
11. For worker-backed targets, recover the message boundary before worker internals.
12. Distinguish true source functions from wrapper, cache, and retry layers.
13. Do not accept a chain map that lacks upstream dependency fields.
14. Do not accept a source function that only works inside one page state by accident.
15. Deliver one chain map and one minimal locator snippet, or tracing is incomplete.

## High-Value Hook Priorities
- JSON body canonicalization: `JSON.stringify`
- Multipart body assembly: `FormData.prototype.append`
- Query or form encoding: `URLSearchParams.prototype.append`
- Header write: `XMLHttpRequest.prototype.setRequestHeader`, `Headers.prototype.set`
- Cookie write: `document.cookie` setter via `Object.defineProperty`
- Storage relay: `localStorage.setItem`, `sessionStorage.setItem`
- Framed or binary payload: `WebSocket.send`, protobuf encode or decode boundary
- Off-main-thread logic: `Worker`, `postMessage`, `importScripts`
- Hidden bundle entry: webpack loader or module export surface
- Remote observation: CDP breakpoint plus evaluate when DevTools stepping distorts behavior

## Exit Signals
- One verified chain: entry -> builder -> writer.
- One chosen writer boundary with justification.
- One minimal probe or snippet that reproduces the finding.
- One list of context-sensitive dependencies.