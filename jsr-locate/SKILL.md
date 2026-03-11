---
name: jsr-locate
description: Use when a dynamic request field, header, cookie, websocket frame, worker message, or challenge token must be traced to its real write boundary and upstream state dependencies.
---

# JSR Locate

## Overview

This skill reconstructs a provable source chain for dynamic fields and establishes the final write boundary, triggering action, upstream dependency chain, and the relation between normal-state and risk-state execution.

Locate work is complete only when it can answer all of the following:

- where the value is finally written
- where the value comes from
- which upstream state closes the chain
- whether normal-state and risk-state requests follow the same or different builders

## Core Principles

- Define the target as `field + sink + trigger + current state`, not as a function name.
- Start from the nearest write boundary, then walk backward through `builder` and `entry`.
- For signature, token, header, or encrypted-parameter entry tasks, start from a live request and its initiator stack before doing broad text search.
- Capture a normal-state sample before analyzing risk-state divergence.
- If the target depends on response fields, `Set-Cookie`, `HttpOnly` cookies, challenge tokens, session state, or device state, build the state chain before discussing pure computation.
- If the entrypoint is only reachable through a dynamic alias or resolver, record the wrapper chain, trigger condition, minimum runtime preconditions, and residual risk before accepting it as the working entry.
- A normal-state versus risk-state fork map is mandatory output whenever the task touches risk branching.
- For `WebSocket`, `protobuf`, long connections, heartbeats, or renewal flows, build the connection state chain and message-family map before analyzing a single packet payload.
- Expand every upstream dependency until the chain reaches the request that produces a normal response.
- If the boundary is hidden by `jsvmp`, `worker`, `wasm`, or control-flow flattening, switch to `$jsr-recover`.
- If the sink is known but local execution diverges from browser execution, or debugging destabilizes the result, switch to `$jsr-runtime`.

## Required Reference Loading

- Never stop at `SKILL.md`. Before substantial analysis, code reading, hook placement, or replay design, load at least one matching reference file.
- Read `references/locate-workflow.md` for any source-tracing task.
- Read `references/request-chain-recording.md` whenever request parameters, headers, cookies, `HttpOnly` cookies, upstream responses, dependency expansion, or connection metadata are involved.
- Read `references/hook-and-boundary-patterns.md` whenever the main question is where to observe, where to hook, or whether a breakpoint is justified.
- Read `references/crypto-entry-locating.md` when the task is to prove where a live request's signature, token, header, or encrypted parameter is generated.
- Read `references/record-overview-and-validation.md` before creating or refreshing `总览.md` or `验证记录.md`.
- When task scope expands, load the newly relevant reference before continuing.

## Minimum Input

Provide the smallest usable intake block before starting:

```text
Target request:
Target field:
Final sink (if known):
Trigger action:
Current state: normal / risk / unknown
Known evidence:
Constraints:
```

Required fields:

- `Target request`
- `Target field`
- `Current state` (use `unknown` if not yet known)
- `Known evidence` (use `none` if nothing is known yet)
- `Constraints` (use `none` if there are no extra constraints)

For protocol or long-connection tasks, also add:

- `Connection family`
- `Message type`
- `Current connection state`

## Preflight Classification

1. Identify the final sink: `query`, `body`, `header`, `cookie`, `storage`, `WebSocket` frame, `worker` reply, or hidden DOM field.
2. Identify the trigger: initialization, click, form submit, response arrival, challenge pass, heartbeat, or renewal.
3. Identify the mutation model: fixed, per-request dynamic, session-level, challenge-level, risk-level, or response-driven.
4. Identify the current sample state: normal state, risk state, partially closed state, or unknown state.

## Operating Order

1. Capture one complete normal-state sample with request order, response summaries, page actions, and timing.
2. For signature, token, header, or encrypted-parameter entry tasks, follow `request -> initiator -> candidate frame -> argument proof` from `references/crypto-entry-locating.md` before broad source search.
3. As soon as response fields, `Set-Cookie`, `HttpOnly` cookies, challenge state, session state, or device state becomes relevant, open the current session `请求链路.md` and write the state chain before deeper code reading.
4. Find the nearest write boundary instead of starting with `md5`, `aes`, `sign`, or generic crypto searches.
5. Walk upward from the sink and separate who triggers execution, who assembles the value, and who performs the final write.
6. Label every field as fixed, dynamic, encrypted, locally computed, response-derived, or environment-derived.
7. When a field comes from an upstream response or `Set-Cookie`, expand the full dependency chain immediately.
8. For protocol and long-connection tasks, separate envelope layer, message families, and connection state before payload logic.
9. Record the normal-state builder path, the risk-state fallback path, the fork point, and the missing state for the same target.
10. If the chain is clear but internal semantics remain hidden, switch to `$jsr-recover`; if the chain is clear but replay is unstable, switch to `$jsr-runtime`.

## Deliverables

- The proven final write boundary of the target field.
- The `entry -> builder -> writer` relation.
- For resolver-based entries, a record of the wrapper chain, resolver trigger, minimum runtime preconditions, and residual risk.
- A state chain proving whether the target depends on upstream responses, `HttpOnly` cookies, challenge state, session state, or device state.
- The full set of prerequisite requests, response fields, state carriers, and triggering actions.
- A normal-state versus risk-state fork map with fork point, normal path, fallback path, and missing state.
- For protocol and long-connection tasks, a connection state chain, message-family map, and target-message envelope boundary.
- Chinese reverse records that let downstream work continue without repeating locate work.

## Failure Output

If locate work stops, stays partial, or cannot yet prove the sink, return and record a flat status block:

```yaml
status: ready | partial | blocked
stage: locate
code:
summary:
evidence:
  - ...
impact:
next_action:
```

Use `partial` when there is a candidate chain but sink proof, source proof, or fork proof is still incomplete.
Use `blocked` when no usable normal-state sample, no sink candidate, or no upstream state closure exists yet.
Do not claim locate closure until the sink is proven and risk branching is either ruled out or mapped.

## Record Files

All reverse records must be written in Chinese under the current task working directory `reverse-records/`.

- One reverse session must use exactly one `会话N/` folder.
- If the user names a session folder, read and write only that folder.
- If the user does not name one, create the next unused `会话N/` folder and use only that folder.
- Never overwrite, merge, rename, or clean another `会话N/` folder.
- Use `references/request-chain-recording.md` as the canonical schema for `请求链路.md`, and use `references/record-overview-and-validation.md` as the canonical schema for `总览.md` and `验证记录.md`.
- `总览.md` stores stage snapshot, blockers, next action, risk notes, validation backlog, and the normal/risk comparison plus fork map.
- `请求链路.md` stores request blocks, status arrays, `来源/去向`, upstream expansion, and protocol connection metadata only.
- `验证记录.md` stores proof checks once a sink hypothesis, state-chain closure, or fork hypothesis must be verified.
- Refresh `总览.md` before the first substantial action, `请求链路.md` as soon as dependency expansion starts, and `验证记录.md` when validation begins.

## Completion Criteria

- The final write boundary is proven.
- The source class is proven as local computation, upstream response, environment state, or mixed dependency.
- If upstream dependencies exist, the chain has been expanded until the normal response is obtained.
- The next stage can continue without repeating locate work.
