# Playbook

## Hook Surface Matrix
- JSON body object before encoding: probe `JSON.stringify`.
- Multipart form assembly: probe `FormData.prototype.append`.
- Query or x-www-form-urlencoded assembly: probe `URLSearchParams.prototype.append`.
- Header value: probe `XMLHttpRequest.prototype.setRequestHeader`, `Headers.prototype.set`, or the fetch wrapper that builds `init.headers`.
- Cookie value: intercept the `document.cookie` setter with `Object.defineProperty`.
- Storage relay: probe `localStorage.setItem` and `sessionStorage.setItem` when the final field is read from cached state.
- Binary or framed payload: probe `WebSocket.send`, protobuf encode or decode boundaries, and buffer-to-text encoders.
- Silent main thread: inspect `Worker`, `postMessage`, `importScripts`, and blob-backed worker bootstrap.

## Observation Mode Ladder
1. Use a local breakpoint when you need paused local scope and DevTools does not perturb behavior.
2. Use an injected logging hook when pausing changes timing or the hook surface is stable.
3. Use early injection through extension, proxy, or preload when the target initializes before manual interaction.
4. Use remote CDP-style breakpoints and `Runtime.evaluate` when local DevTools presence itself changes execution.

## Tracing Order
1. Start at the request sink, not at random crypto helpers.
2. Pick the writer boundary closest to the target field class.
3. Capture arguments plus a short stack.
4. Walk upward until one builder function explains the field with explicit dependencies.
5. Stop when one minimal snippet can reproduce the target value or assignment.

## Escalation Rules
- If a crypto hook fires too often, move outward to serialization or assignment.
- If you only see final values, hook the writer boundary instead of the primitive.
- If hooks perturb timing, replace pauses with logging or remote instrumentation.
- If the target lives inside a bundle loader, recover the webpack module entry before broad deobfuscation.
- If DevTools itself trips anti-debug, switch to remote CDP-style instrumentation instead of forcing local stepping.