# Challenge and Issued-State Matrix

| Flow Shape | Typical Issued State | Local Stage | Common Misread |
|---|---|---|---|
| Issued public key or timestamp login | Public key, `rsatimestamp`, nonce, login session id | Plaintext normalization, hybrid crypto, final assembly | Replaying crypto without refreshing the issued key or timestamp |
| Captcha or verify-then-submit | `challenge`, `verifyId`, request id, shuffle, asset metadata, verify token | Trajectory pack, collect data, encrypt or sign payload, submit assembly | Treating submit parameters as standalone |
| WAF or sensor token | Issue id, challenge output, renewal cookie, dynamic iv or etag-like value | Sensor collection, compression, encoding, signing, final header or cookie write | Cloning the current token without modeling refresh |
| Blackbox or fingerprint header | Bootstrap config, profile id, version, partner id, challenge-bound nonce | Profile collection, hash or encode stage, final write | Assuming one crypto helper owns the whole output |
| Multi-request header or nonce coupling | Request id, anti-replay nonce, one-time token, per-request iv | Canonicalization, concat, sign, final header write | Replaying the same header across requests |

## Renewal Standard
- Baseline request passes.
- Variant request passes.
- Expiry, reuse, or renewal behavior is explained.
- Refresh path is explicit when required.
