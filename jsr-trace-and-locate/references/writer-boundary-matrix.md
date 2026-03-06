# Writer Boundary Matrix

| Sink Class | First Anchor | Proves | Common Misread |
|---|---|---|---|
| JSON body | `JSON.stringify` | Canonical object before transport wrappers | Treating the serializer itself as the builder |
| Multipart form | `FormData.prototype.append` | Field-by-field assembly order and already-transformed entries | Searching crypto before naming which field is transformed |
| Query or URL-encoded body | `URLSearchParams.prototype.append` or pair builder | Canonical key-value map before final join | Reversing final query text instead of pair construction |
| Header | `XMLHttpRequest.prototype.setRequestHeader`, `Headers.prototype.set`, or fetch header builder | True header writer, often later than body assembly | Trusting network panel snapshots without proving who wrote the header |
| Cookie | `document.cookie` setter | Value birth before request send path | Tracing from request headers instead of cookie writer |
| Storage relay | `localStorage.setItem` or `sessionStorage.setItem` | Earlier cached state that later gets relayed into requests | Reversing the later read before proving the earlier write |
| WebSocket or binary frame | `WebSocket.send`, protobuf encode boundary, or buffer wrapper | Envelope boundary before business payload is buried | Decoding the whole frame before naming the envelope builder |
| Worker-returned value | `postMessage` sender or worker response receiver | Whether the value is born inside the worker or only routed through it | Lifting worker internals before capturing the message contract |

## Observation Priority
- Hook the nearest writer boundary before helper-name search.
- Prefer hook or trace over breakpoint until hidden locals become the only missing evidence.
- If DevTools changes timing, stay in injected or remote-style observation.
