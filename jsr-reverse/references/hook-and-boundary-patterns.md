# Hook and Boundary Selection

## 1. Choose the Boundary Before Choosing the Tool

Tools are secondary. Boundary selection is the core of locate work.

Ask first:

- where the target value is finally written
- which layer is closest to the final write
- which layer is least likely to be disguised

## 2. Common Boundary Patterns

| Scenario | Preferred boundary | Why | Poor opening move |
|---|---|---|---|
| Dynamic request-body field | Final object before serialization | Shows the final value clearly | Search crypto first |
| Dynamic request-header field | Header-setting point or writer | Separates builder from writer | Search header name first |
| JS-written cookie | `cookie` write point | Shows who mutates the value | Only inspect `document.cookie` reads |
| Response `Set-Cookie` | Network response | Especially important for `HttpOnly` | Search cookie name in frontend code |
| `WebSocket` frame | Envelope layer before send | Reveals envelope, sequence, and heartbeat | Inspect one payload only |
| `worker`-generated value | `postMessage` contract | Input and output are clearer than internals | Enter worker internals first |
| Hidden DOM field | Assignment point plus submit action | Easy to trace from event chain | Search plain field text first |

## 3. When Hooking Is Appropriate

Appropriate when:

- the general sink is known but the real writer is unknown
- call order, arguments, or return values must be proven
- repeated requests must be compared under stable observation

Not appropriate when:

- the final sink is still unknown
- the current sample is already a risk-state decoy chain
- any hook immediately triggers obvious anti-debugging; in that case switch to `$jsr-runtime` first

## 4. When a Breakpoint Is Worth Using

Use a breakpoint only when all of the following are true:

- passive observation cannot reveal the required local variable
- a branch condition, closure variable, or temporary object must be inspected
- a same-named function contains multiple candidate paths and only one writes the value

Breakpointing is not the default opening move.

## 5. Preferred Observation Order by Scenario

### Request body or request header

```text
writer -> builder -> entry -> source
```

### `cookie`

```text
First separate JS-written cookies from response Set-Cookie
JS write: writer -> builder -> entry
Response write: response -> dependency request -> target request
```

### `WebSocket`

```text
send envelope -> message type -> state transition -> payload
```

### `worker`

```text
main-thread worker construction -> input -> worker output -> final write
```

## 6. Signals That the Boundary Is Wrong

- Only possible crypto functions are visible, but the final write point is still unexplained.
- A similar intermediate variable is found, but the request still depends on unexplained upstream responses.
- One field changes, but it is unclear whether the target request is written on the same layer.
- Observation points are too early and still far from actual network emission.

When these signals appear, step back to a boundary closer to the sink.

## 7. Minimal Output After Correct Boundary Selection

- One stable write point
- One repeatable call order
- One field status-label table
- One complete dependency-chain record
