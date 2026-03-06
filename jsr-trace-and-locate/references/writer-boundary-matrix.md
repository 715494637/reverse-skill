# Writer Boundary Matrix

## JSON Body
- First writer: `JSON.stringify`
- Why it is high value: it captures the canonical object before encryption or transport wrappers.
- Escalate inward only if the object is already pre-encrypted.

## Multipart Form
- First writer: `FormData.prototype.append`
- Why it is high value: it reveals field-by-field assembly order and which entries are already transformed.
- Escalate inward only for fields appended in already-encrypted form.

## Query String or URL-Encoded Body
- First writer: `URLSearchParams.prototype.append` or the helper building query pairs.
- Why it is high value: it exposes the canonical key-value map before final join or encoding.

## Header
- First writer: `XMLHttpRequest.prototype.setRequestHeader`, `Headers.prototype.set`, or the fetch-wrapper header builder.
- Why it is high value: header targets are often invisible if you only inspect body serializers.
- Common mistake: reading the network panel snapshot without proving who wrote the header.

## Cookie
- First writer: `document.cookie` setter via `Object.defineProperty`
- Why it is high value: cookie values are often assembled far from the final request send path.
- Common mistake: tracing from request headers instead of the cookie writer.

## Storage Relay
- First writer: `localStorage.setItem` or `sessionStorage.setItem`
- Why it is high value: many later request fields are just relays from cached state.
- Common mistake: reverse-engineering the later read before proving the earlier write.

## WebSocket or Binary Frame
- First writer: `WebSocket.send`, protobuf encode boundary, or buffer wrapper.
- Why it is high value: framed payloads often hide business data inside envelope builders.
- Common mistake: decoding the whole frame before naming the envelope boundary.

## Worker-Returned Value
- First writer: main-thread `postMessage` sender or worker response receiver.
- Why it is high value: it proves whether the field is born in the worker or just routed through it.
- Common mistake: lifting worker code before capturing the message contract.

## Observation Mode Ladder
- Local breakpoint: best when you need local variables and DevTools does not alter behavior.
- Injected hook: best when you need lightweight logging at a stable writer boundary.
- Early injection: best when initialization runs before you can interact manually.
- Remote CDP-style observation: best when DevTools presence, stepping, or timing traps corrupt the result.