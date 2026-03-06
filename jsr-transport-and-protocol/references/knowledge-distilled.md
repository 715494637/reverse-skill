# Distilled Reverse Knowledge: Transport and Protocol

## Fifteen Core Principles
1. When the server still rejects correct-looking fields, suspect protocol before crypto.
2. Model the system by layers: connection, session, envelope, payload.
3. Recover handshake contracts before business message details.
4. Separate envelope fields from payload fields immediately.
5. Recover sequencing rules: heartbeat, retry, reconnect, renewal, idempotency.
6. Locate serialization and deserialization boundaries precisely.
7. Rebuild protocol-correct order before field-level fine tuning.
8. Treat header choreography as part of protocol state, not decoration.
9. For protobuf, trust field numbers and types over display names.
10. Validate session continuity, not just single-message acceptance.
11. Distinguish transport encryption from business-field encryption.
12. Reject replay attempts that ignore server-side sequence expectations.
13. Localize every failure to one layer before patching anything.
14. Keep transport parsers and business handlers separate.
15. Protocol reverse is incomplete until sustained interaction works, not just handshake success.

## Protocol Probe Anchors
- Handshake URL, query, headers, cookies, and negotiated ids
- `WebSocket.send` and receive wrappers
- Protobuf serialize and parse boundaries
- Envelope builders distinct from business payload builders
- Heartbeat, renewal, reconnect, and counter logic

## Protocol Exit Gate
- Handshake passes.
- Sustained business messages pass.
- Failures can be mapped back to a single layer.