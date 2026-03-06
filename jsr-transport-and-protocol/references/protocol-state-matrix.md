# Protocol State Matrix

| Layer | First Anchor | Proves | Common Misread |
|---|---|---|---|
| Handshake | URL, query, headers, cookies, negotiated ids, subprotocol | Entry contract before business messages exist | Calling handshake success full protocol understanding |
| Connection state | Heartbeat, renewal, reconnect, expiry, counter drift | Why first-frame success does not sustain | Blaming crypto when the break is sequence or renewal |
| Envelope | Opcode, type id, wrapper fields, compression, checksum, outer sign | Boundary between transport wrapper and business payload | Reading payload bytes before naming the envelope |
| Payload | Protobuf field numbers, wire types, decoded body schema | Business meaning after transport rules are separated | Trusting display names over field numbers and types |
| Hidden owner | Bundled module, worker, parser, serializer | Where frame semantics are actually materialized | Inspecting raw frames without recovering parser ownership |

## Consistency Rule
- Classify message families before full payload inspection.
- Name serializer and parser boundaries before stepping through locals.
- Do not accept one first frame as protocol completion.
