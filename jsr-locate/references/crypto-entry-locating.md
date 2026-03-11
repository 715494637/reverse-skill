# Crypto Entry Locating

## When to Use

Use this reference when the immediate task is to prove where a live request's signature, token, header, or encrypted parameter is generated.

Stay inside locate scope:

- prove the entry frame
- prove the writer
- prove the argument relation
- stop before full algorithm recovery

## Preferred Path

Use this order whenever a live request already exists:

```text
request -> request detail -> initiator stack -> candidate frame -> argument proof
```

### Step 1: Start from the request

Capture:

- the exact request carrying the target value
- where the target sits: URL, header, body, or message payload
- one normal-state sample before risk-state probing

### Step 2: Pull the initiator stack

Prefer the request's own initiator or paused call stack over broad source search.

Goal:

- find the first business-relevant frame that is still close to the final write
- separate framework transport from business assembly

### Step 3: Triage the stack

| Frame class | Typical signal | Action |
| --- | --- | --- |
| Framework noise | transport client, UI framework, bundle runtime | skip |
| Security SDK shell | auth, security, fingerprint, risk SDK wrapper | inspect |
| Business frame | project source, request builder, field assembler | prioritize |

Do not stop at the first frame that merely forwards the request.

### Step 4: Prove the candidate frame

A candidate frame is valid only when it can prove at least one of:

- it receives the target value directly
- it assembles the target from stable local inputs
- it calls the final writer with the target argument

The proof must use arguments, local variables, or writer-side observation, not name similarity.

## Fallback Path

Use this order when the initiator is missing or unhelpful:

```text
target field text -> narrow assignment search -> targeted breakpoint -> hook confirmation
```

Fallback rules:

- search for the write pattern before searching generic crypto names
- place breakpoints only where local variables or branch conditions must be proven
- use hooks only after the sink or near-sink writer is known

## Completion Standard

Entry locating is complete only when all of the following are true:

- the request carrying the target is identified
- one candidate frame is proven as business-relevant
- the relation between candidate frame and final writer is clear
- the task can continue with locate, not guesswork

## Common Missteps

- searching `md5`, `aes`, or `sign` before proving the writer
- stopping at framework transport frames
- treating a security SDK wrapper as the final entry without argument proof
- drifting into algorithm restoration before the write chain is closed
