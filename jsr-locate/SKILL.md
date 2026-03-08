---
name: jsr-locate
description: Use when a dynamic request field, header, cookie, websocket frame, worker message, or challenge token must be traced back to its real write boundary, triggering action, upstream response dependency, or state source before discussing pure computation, replay, or environment patching. Use for locating sinks, hooks, request chains, HttpOnly cookie dependencies, upstream expansion, and source proof.
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
- Capture a normal-state sample before analyzing risk-state divergence.
- If the target depends on response fields, `Set-Cookie`, `HttpOnly` cookies, challenge tokens, session state, or device state, build the state chain before discussing pure computation.
- A normal-state versus risk-state fork map is mandatory output.
- For `WebSocket`, `protobuf`, long connections, heartbeats, or renewal flows, build the connection state chain and message-family map before analyzing a single packet payload.
- Expand every upstream dependency until the chain reaches the request that produces a normal response.
- If the boundary is hidden by `jsvmp`, `worker`, `wasm`, or control-flow flattening, switch to `$jsr-recover`.
- If the sink is known but local execution diverges from browser execution, or debugging destabilizes the result, switch to `$jsr-runtime`.

## Required Reference Loading

- Never stop at `SKILL.md`. Before substantial analysis, code reading, hook placement, or replay design, load at least one matching reference file.
- Read `references/locate-workflow.md` for any source-tracing task.
- Read `references/request-chain-recording.md` whenever request parameters, headers, cookies, `HttpOnly` cookies, upstream responses, dependency expansion, or progress records are involved.
- Read `references/hook-and-boundary-patterns.md` whenever the main question is where to observe, where to hook, or whether a breakpoint is justified.
- When task scope expands, load the newly relevant reference before continuing.

## Preflight Classification

1. Identify the final sink: `query`, `body`, `header`, `cookie`, `storage`, `WebSocket` frame, `worker` reply, or hidden DOM field.
2. Identify the trigger: initialization, click, form submit, response arrival, challenge pass, heartbeat, or renewal.
3. Identify the mutation model: fixed, per-request dynamic, session-level, challenge-level, risk-level, or response-driven.
4. Identify the current sample state: normal state, risk state, partially closed state, or unknown state.

## Operating Order

1. Capture one complete normal-state sample with request order, response summaries, page actions, and timing.
2. As soon as response fields, `Set-Cookie`, `HttpOnly` cookies, challenge state, session state, or device state becomes relevant, open `请求链路.md` and write the state chain before deeper code reading.
3. Find the nearest write boundary instead of starting with `md5`, `aes`, `sign`, or generic crypto searches.
4. Walk upward from the sink and separate who triggers execution, who assembles the value, and who performs the final write.
5. Label every field as fixed, dynamic, encrypted, locally computed, response-derived, or environment-derived.
6. When a field comes from an upstream response or `Set-Cookie`, expand the full dependency chain immediately.
7. For protocol and long-connection tasks, separate envelope layer, message families, and connection state before payload logic.
8. Record the normal-state builder path, the risk-state fallback path, the fork point, and the missing state for the same target.
9. If the chain is clear but internal semantics remain hidden, switch to `$jsr-recover`; if the chain is clear but replay is unstable, switch to `$jsr-runtime`.

## Deliverables

- The proven final write boundary of the target field.
- The `entry -> builder -> writer` relation.
- A state chain proving whether the target depends on upstream responses, `HttpOnly` cookies, challenge state, session state, or device state.
- The full set of prerequisite requests, response fields, state carriers, and triggering actions.
- A normal-state versus risk-state fork map with fork point, normal path, fallback path, and missing state.
- For protocol and long-connection tasks, a connection state chain, message-family map, and target-message envelope boundary.
- Chinese reverse records that let downstream work continue without repeating locate work.

## Record Files

All reverse records must be written in Chinese under the current task working directory `reverse-records/`.

- Required: `reverse-records/总览.md`
- Required: `reverse-records/请求链路.md`
- Add when validating: `reverse-records/验证记录.md`
- Required for protocol or long-connection tasks: `reverse-records/协议状态.md`

Update rules:

- Create or refresh `总览.md` before the first substantial action.
- Create or refresh `请求链路.md` as soon as dependency expansion starts.
- Refresh records immediately after any phase change, upstream dependency discovery, state-chain closure change, normal/risk fork confirmation, sink confirmation, blocker change, next-step change, or validation result.
- Rewrite `当前阶段 / 已确认 / 当前卡点 / 下一步 / 风险 / 待验证` on every record refresh.
- Do not continue long analysis on a branch while `总览.md` or `请求链路.md` is stale.
- For protocol and long-connection tasks, maintain `协议状态.md` in parallel with connection state, message families, and sequence/ack/renewal rules.

## Completion Criteria

- The final write boundary is proven.
- The source class is proven as local computation, upstream response, environment state, or mixed dependency.
- If upstream dependencies exist, the chain has been expanded until the normal response is obtained.
- The next stage can continue without repeating locate work.

