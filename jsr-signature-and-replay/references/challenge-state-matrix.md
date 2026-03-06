# Challenge and Issued-State Matrix

## Issued Public Key or Timestamp Login
- Typical issued state: public key, `rsatimestamp`, nonce, login session id.
- Local stage: plaintext normalization, hybrid crypto, final assembly.
- Common mistake: replaying the encryption routine without refreshing the issued key or timestamp.

## Captcha or Verify-Then-Submit Flow
- Typical issued state: `challenge`, `verifyId`, request id, shuffle, image or asset metadata, verify token.
- Local stage: trajectory pack, collect data, encrypt or sign payload, submit assembly.
- Common mistake: treating submit parameters as standalone when the server validates prior challenge lineage.

## WAF or Sensor Token Flow
- Typical issued state: issue id, challenge script output, renewal cookie, dynamic iv or etag-like value.
- Local stage: sensor collection, compression, encoding, signing, final header or cookie write.
- Common mistake: cloning the current token without modeling how it is refreshed or contextualized.

## Blackbox or Fingerprint Header Flow
- Typical issued state: bootstrap config, profile id, version, partner id, challenge-bound nonce.
- Local stage: profile collection, hash or encode stage, final header, cookie, or hidden-field write.
- Common mistake: assuming one crypto function owns the whole output instead of a collected profile plus encoding stage.

## Multi-Request Header or Nonce Coupling
- Typical issued state: request id, anti-replay nonce, one-time token, per-request iv.
- Local stage: request-body canonicalization, concat, sign, final header write.
- Common mistake: replaying the same header across requests when the server validates sequence or freshness.

## Renewal Tests
- Baseline request passes.
- Variant input request passes.
- Repeated request after expiry or reuse is explained.
- Refresh path or reissue path is explicit.