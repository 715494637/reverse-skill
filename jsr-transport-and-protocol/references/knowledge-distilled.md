# Distilled Reverse Knowledge: Transport and Protocol

## Core Judgments
- Correct-looking business fields can still fail when the protocol layer is wrong.
- Handshake, heartbeat, renewal, and sequence rules are protocol state, not request noise.
- Envelope fields must be separated from payload fields immediately.
- For protobuf flows, field numbers and wire types outrank display names.
- One accepted first frame proves almost nothing about sustained protocol consistency.
- Serialization and deserialization boundaries are more valuable than raw payload dumps.
- Transport encryption and business-field encryption should be treated as separate problems.

## Common Misreads
- Blaming crypto when the real break is heartbeat, reconnect, counter drift, or renewal.
- Inspecting raw WebSocket payloads before grouping message families.
- Trusting decoded field names without proving schema position and type.
- Calling handshake success a protocol win before sustained business traffic is explained.

## Evidence Standard
- One explicit handshake contract.
- One classified set of frame or message families.
- One mapped serializer or parser boundary.
- One sustained-behavior note set beyond the first accepted message.
