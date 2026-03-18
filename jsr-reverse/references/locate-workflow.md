# Locate Workflow

## Purpose / Use Boundary

Locate is the main method file for the locate phase.

Its job is to prove the real write boundary, sink, trigger path, and upstream dependency chain for the target request, field, cookie, or message.

Start locate only after the evidence gate has produced a real sample-backed request chain. If the target request is still guessed, the current chain is still mixed across hypotheses, or normal and risk paths are not yet separated, go back to `reverse-records/请求链路.md` and close the evidence artifact first.

## What Locate Owns

Locate owns these questions:

- what the real target request or target message is
- where the target value is finally written
- what action, event, or response triggers that write
- which upstream requests, responses, cookies, state carriers, or environment facts feed the write
- where normal-state and risk-state chains fork

The core locate model is:

```text
writer <- builder <- entry <- source
```

Keep these layers separate:

- `writer`: final write into request, header, query, body, cookie, frame, storage, or message envelope
- `builder`: logic that assembles, transforms, encrypts, signs, or packages the value
- `entry`: action, event, callback, or response that starts the builder path
- `source`: true input of the builder, including responses, cookies, storage, memory state, environment facts, time, randomness, or user input

## Default Working Model

Default order:

1. define the target unit from a real sample
2. observe the sink first
3. walk backward through `writer <- builder <- entry <- source`
4. expand upstream whenever source depends on prior state
5. keep normal and risk chains separate

Useful first observation points:

| Sink | First observation point |
|---|---|
| `body` field | final serialization or pre-submit write point |
| `header` field | header-setting point or final request construction |
| JS-written `cookie` | setter or final write point |
| Response `Set-Cookie` dependency | response packet plus first dependent request |
| `WebSocket` frame | envelope layer before `send` |
| `worker` reply | `postMessage` contract |
| Hidden DOM field | assignment point plus submit action |

Search helps only as support. It does not prove origin by itself.

Expand upstream immediately when the target depends on response fields, `Set-Cookie`, challenge results, session bootstrap, or any state that is missing at the current boundary.

When normal and risk samples diverge, record the fork explicitly: same trigger does not mean same chain.

For protocol or long-connection tasks, keep only boundary-level locate requirements:

- connection state chain relevant to the target message
- message family of the target traffic
- target message boundary: envelope fields, payload fields, and any encryption or compression edge

Do not expand locate into a full protocol workflow unless that is the actual blocker for the boundary.

## Required Proof

A locate result is usable only when it proves at least these items:

- real target request or message from a captured sample
- final sink or write boundary
- concrete `writer`, `builder`, and `entry`
- true `source` categories, separated into local computation, upstream response/state, environment fact, or mixed dependency
- upstream expansion to the request or state transition that actually feeds the normal chain, or a clear statement that no upstream request exists
- normal-state versus risk-state separation when both appear in evidence

Search hits, guessed function names, or one isolated payload do not count as proof by themselves.

## Stop / Completion Standard

Stop locate when the request or message boundary is real enough that the next blocker is no longer request discovery.

That usually means:

- the target sample is real and repeatable enough for downstream work
- the sink and trigger path are known
- `writer <- builder <- entry <- source` is concrete enough to continue
- upstream dependencies that matter have been expanded or excluded
- the remaining blocker is shell readability, runtime divergence, or final proof rather than boundary discovery

At that point, hand off with a clear statement of what is proven, what remains open, and which downstream blocker is next.

## Does Not Own

Locate does not own:

- evidence-gate recording when the real request chain is still unconfirmed
- runtime patching or browser/local fit work
- full shell recovery, decompilation, or broad deobfuscation beyond what is needed to prove the boundary
- global routing rules or stage matrix decisions already defined in `jsr-reverse`
- final equivalence proof, checkpoint proof, or end-state validation
