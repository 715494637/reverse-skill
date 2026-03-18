# Protocol and Long-Connection Recovery

## When to Use

Use this topic only after the current stage is already chosen in `jsr-reverse/SKILL.md`.

It is a cross-stage refinement for targets involving WebSocket, SSE, protobuf-like envelopes, heartbeat, ack, renewal, or other long-connection state.

- Mount it under `locate` when the current blocker is proving the connection state chain, message families, or the boundary of the target message.
- Mount it under `recover` when the current blocker is separating envelope from payload, or recovering the protocol shell / semantic meaning around a proven target boundary.

Do not use this file as a standalone reverse workflow.

## Owns

### Under `locate`

This file owns only the protocol-specific locate refinements below:

- connection state chain: handshake -> authenticated -> heartbeat / ack -> renewal -> invalidation
- message-family separation: handshake, auth, heartbeat, business, ack / retry / error, renewal
- target-message boundary: which message is the real target and which prior connection state it consumes

### Under `recover`

This file owns only the protocol-specific recover refinements below:

- envelope-payload separation
- protocol shell reduction that is needed to read type, length, seq, ack, flags, or payload encoding
- semantic recovery of the target message once the boundary is already known

## Does Not Own

This file does not own:

- global stage selection
- the full request-chain artifact contract
- generic locate workflow outside protocol-specific boundaries
- generic recover depth or deobfuscation strategy
- runtime environment fitting or validation proof

Do not let a protocol clue turn this file into a separate record system or a second main narrative.

## Method inside this stage

### If mounted under `locate`

1. Capture more than the first packet. At minimum inspect:
   - handshake
   - first business packet
   - heartbeat
   - sequence / ack behavior
   - renewal or refresh
   - error / retry packet when it exists
2. Record the connection state chain as a traceable dependency chain, for example:

```text
handshake -> handshake response(session) -> authenticated
authenticated -> heartbeat(seq) -> ack
ack timeout -> retry / downgrade
token near expiry -> renewal -> new session
renewal failure -> invalid / risk / reconnect
```

3. Separate message families before naming the target protocol path:
   - handshake / authentication
   - heartbeat / keepalive
   - business request
   - ack / retry / error
   - renewal / refresh
4. State the target-message boundary explicitly:
   - target message type
   - prior state it consumes (`session`, seq, ack window, renewal result, route token, etc.)
   - whether replaying the target packet alone is invalid
5. Keep recording minimal and stage-bound: update the current request-chain artifact only with the connection state chain, message families, and target-message dependency notes that the current stage needs.

### If mounted under `recover`

1. Split envelope from payload before reading business semantics.
2. Recover the envelope contract first:
   - message type
   - length
   - sequence
   - time window
   - session identifier
   - compression / encryption flags
3. Recover the payload contract only after the envelope is stable:
   - field order
   - encoding method
   - protobuf mapping when relevant
   - decompressed body
   - business fields that matter to the target message
4. Treat the protocol shell as a bridge around the proven target boundary, not as a reason to decompile the whole transport stack.
5. If recovery shows the real blocker is still missing connection-state evidence, hand off back to `locate` with the exact missing state.

## Stop / handoff rule

- Stop `locate` use of this file when the connection state chain, message families, and target-message boundary are concrete enough for downstream recovery or runtime work.
- Stop `recover` use of this file when envelope-payload separation and the required protocol shell / semantics are already clear enough for runtime fitting or validation.
- Hand off to `locate` if the target still lacks handshake / ack / renewal dependency proof.
- Hand off to `recover` if the boundary is known but the protocol shell still hides the usable message contract.
- Do not keep this file mounted once the remaining blocker is generic runtime divergence or proof-only validation.
