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
- any hook immediately triggers obvious anti-debugging; in that case treat the blocker as `runtime` work first

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

## 8. Observation Hit: Judgment Flow

When an observation point (breakpoint, hook, trace) fires, follow this judgment sequence before taking the next action. This is about **thinking order**, not about any specific tool.

### Step 1: Am I on the target chain?

Read the call stack from top to bottom:

- Does the stack pass through the known trigger path (e.g., the button click handler, the form submit, the timer callback)?
- Does the stack reach the known sink or write boundary?
- If neither: this hit is likely noise. Record it as "off-chain" and move the observation point closer to the sink.

### Step 2: What role does this location play?

Classify the current pause location:

| Role | Signal | Next move |
|---|---|---|
| **Write point** (sink) | The target value is being assigned or sent here | Confirm the value matches the real request. This may be the boundary. |
| **Builder** | The target value is being assembled from parts | Identify which parts are already known and which need upstream tracing. |
| **Entry** | A caller dispatches into the target chain | Note the arguments passed in — they reveal what the caller already knows. |
| **Relay** | The value passes through unchanged | Skip this layer — move observation to the caller or the callee, not here. |
| **Irrelevant** | No visible connection to the target value | This hit is noise. Re-evaluate the observation point placement. |

### Step 3: What do the scope variables tell me?

At the current pause point, examine variables in scope:

- **Arguments**: What was passed in? Do any arguments match known upstream values (response fields, cookie values, timestamps)?
- **Local state**: Are there intermediate computation results? Do they correspond to known field formats (hex strings, base64, JSON structures)?
- **Closure variables**: Is there captured state from an outer scope? This often reveals environment-dependent values or cached results.
- **Return value** (if stepping out): Does the return value appear in the final request? If yes, this function is on the critical path.

Do not guess variable meaning from names in minified code. Determine role from **value and data flow**.

### Step 4: Decide the next direction

Based on Steps 1-3:

| Finding | Direction |
|---|---|
| At the write point, value is already complete | **Step out** — trace where the complete value came from |
| At a builder, some inputs are unknown | **Step into** the unknown input's source, or trace its upstream |
| At an entry, arguments reveal the full picture | **Record and move on** — this location is understood |
| At a relay, value passes through unchanged | **Move observation** to a more meaningful layer |
| The hit is off-chain or irrelevant | **Relocate** the observation point entirely |

### Step 5: Record the conclusion

After each meaningful hit, record:

```text
Location: {file/function or description}
Role: {write point / builder / entry / relay / irrelevant}
Key observation: {what was learned}
Next action: {step into X / step out / move observation to Y / record and continue}
```

This record feeds into the artifact update and prevents re-investigating the same location.

### Judgment Traps

- **Trap**: The first hit looks relevant because it contains a crypto function. But the crypto function is called from many paths — only one of them is the target chain. Always confirm via call stack, not via function name.
- **Trap**: A variable holds a value that looks like the target, but it was computed in a previous invocation and cached. Check whether the value is **fresh** (computed in this request cycle) or **stale** (leftover from a prior cycle).
- **Trap**: Stepping into a deep call chain and losing track of the original question. Before each step-into, state what you expect to learn. If the answer is vague ("maybe something useful"), step out instead.
