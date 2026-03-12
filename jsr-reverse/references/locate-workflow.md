# Locate Workflow

## 1. Target of Locate Work: Exact Source Proof

A locate task must answer at least five questions:

1. What is the target request?
2. Where is the target field finally written?
3. After which action is it formed?
4. Which parts come from local computation, upstream responses, or environment state?
5. Is the current chain a normal-state chain or a risk-state chain?

Saying only that 闁炽儲娑猦is value is computed by some function闁?is not sufficient.

## 2. Define the Target Unit First

Do not define the task as 闁炽儲绔緄nd the sign algorithm闁?

Define it like this instead:

```markdown
Target request: A
Target field: header.x-sign
Final sink: request header
Trigger action: click submit
Current state: normal state
```

If these items cannot be written yet, the context is still incomplete.

## 3. Walk Backward from the Write Boundary

The default locate path is:

```text
writer <- builder <- entry <- source
```

- `writer`: the place that finally writes the value into a request, header, `cookie`, frame, or storage
- `builder`: the logic layer that actually assembles or computes the value
- `entry`: the action, event, or response that triggers the builder
- `source`: the true input of the builder, often from responses, state, environment, time, randomness, or user input

Keep these layers separate.

## 4. Common Sinks and Best First Observation Points

| Sink | First observation point | What not to do first |
|---|---|---|
| `body` field | Final serialization or write point before submit | Search hash functions first |
| `header` field | Header-setting point or final request-construction point | Search token names first |
| JS-written `cookie` | `cookie` setter or write point | Only observe `document.cookie` reads |
| Response `Set-Cookie` | Network response and dependency request | Search the cookie name in frontend first |
| `WebSocket` frame | Envelope layer before `send` | Start from one plaintext payload |
| `worker` reply | `postMessage` contract | Dive into internal operators first |
| Hidden DOM field | Assignment point and submit action | Search the plain field name globally |

## 5. When Global Search Helps and When It Hurts

### Helpful

- The field name is distinctive.
- The code is not heavily obfuscated.
- The chain is already known to be normal state.

### Harmful

- The field name appears too many times.
- Strings are unreadable after obfuscation.
- The real write point and compute point are separated by wrappers.
- The current sample is already in a risk-state decoy branch.

Conclusion:

- Search is auxiliary, not the workflow itself.
- Failing to find a string does not prove absence.
- Finding a string does not prove origin.

## 6. When Upstream Expansion Is Mandatory

Expand upstream immediately when any of the following is true:

- The field comes from a response field.
- The target request depends on upstream `Set-Cookie`, especially `HttpOnly`.
- The field appears only after a challenge.
- The field changes after refresh but stays constant during repeated clicks in one page session.
- Removing one initialization request moves the target request directly into a risk state.

When this happens, stop diving into builder internals and build the state chain first:

```text
upstream response / Set-Cookie / challenge / session / device state
-> current state carrier (cookie / storage / memory / worker / wasm)
-> builder input
-> writer output
```

If the state chain is not closed, do not classify the result as pure computation.

## 7. Record Normal State and Risk State Separately

The most common locate mistake is to treat a risk-state chain as the main chain.

At minimum, create the following comparison and a fork map. The fork map must state:

- where the fork starts
- which chain normal-state `builder` and `writer` follow
- which chain risk-state `fallback` and challenge logic follow
- which exact state is missing, instead of a vague statement such as 闁炽儲绔糿vironment is wrong闁?
Comparison table:

```markdown
| Item | Normal state | Risk state | Same chain |
|---|---|---|---|
| Trigger action | click submit | click submit | yes |
| Upstream request B | valid response | 403 / empty response | no |
| x-sign write point | builder.sign() | fallback.sign() | no |
| Cookie dependency | has HttpOnly cookie | missing | no |
```

If any row says `no`, do not treat the risk-state result as the final conclusion.

## 8. When to Switch Skills

### Switch to `$jsr-runtime`

- Values are stable in browser normal state but unstable locally.
- Values change as soon as debugging starts.
- The write boundary is clear but missing state or objects makes replay fail.

### Switch to `$jsr-recover`

- The write boundary is clear but the builder is hidden inside `jsvmp`, `worker`, `wasm`, or control-flow flattening.
- Dispatcher, bridge, or bytecode logic must be recovered before locate work can continue.

## 9. Extra Requirements for Protocol Tasks

If the target is not ordinary `XHR/fetch` but `WebSocket`, `protobuf`, long connection, heartbeat, or renewal traffic, include at least three layers:

1. Connection state chain: handshake -> authenticated -> heartbeat maintained -> renewed -> invalid
2. Message families: handshake, control, business, ack, error, renewal
3. Target message boundary: envelope fields, payload fields, and encryption or compression layer

Do not use one packet payload or one field name as the main basis.

## 10. Completion Standard

- Final sink is known.
- Trigger action is known.
- `writer`, `builder`, and `entry` are known.
- Local computation, response-derived state, environment-derived state, and mixed dependencies are distinguished.
- For protocol tasks, connection state chain, message families, and target message boundary are known.
- If upstream dependencies exist, expansion has reached the request that produces the normal response.
