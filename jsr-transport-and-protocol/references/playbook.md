# Playbook

## Probe Matrix
- Handshake rejection: capture URL, query, headers, cookies, subprotocol, and any negotiated ids.
- Frame rejection: probe `WebSocket.send`, receive wrappers, protobuf serialize or parse boundaries, and envelope builders.
- Session drift: track heartbeat, renewals, counters, reconnect rules, and idempotency markers.
- Mixed transport and business crypto: separate envelope signing from payload encryption before patching anything.
- Hidden parser or builder inside bundle or worker: recover the module or worker entry before inferring protocol semantics.

## Protocol Recovery Order
1. Reconstruct handshake rules.
2. Separate connection, session, envelope, and business payload layers.
3. Recover field numbers and types before trusting display names in protobuf flows.
4. Rebuild parser and builder against captured traffic.
5. Validate sustained interaction, not just the first accepted frame.

## Failure Smells
- One accepted frame followed by rejection usually means sequence, counter, or renewal drift.
- Correct payload with wrong envelope usually means a protocol-layer bug, not a business-field bug.
- Replaying captured frames verbatim without session-state repair rarely scales.