# Sign Replay Playbook

## High-Frequency Coverage from 66 Cases
- AES-involved cases: 28/66
- RSA-involved cases: 14/66
- MD5-involved cases: 14/66
- Token/cookie chain cases: 35/66
- SM2/SM4 cases: 1/66 (low frequency, high friction)

## Full Case Coverage (Not Representative Only)
- AES full set: 3, 9, 11, 12, 14, 20, 21, 22, 25, 30, 31, 35, 37, 38, 42, 43, 44, 48, 49, 50, 52, 56, 58, 59, 60, 61, 62, 66
- RSA full set: 4, 5, 6, 7, 10, 13, 17, 18, 22, 36, 38, 47, 60, 63
- MD5 full set: 2, 8, 14, 15, 20, 35, 39, 44, 46, 50, 51, 54, 57, 60
- Token/cookie full set: 1, 2, 6, 10, 11, 14, 19, 26, 28, 29, 33, 34, 36, 38, 39, 41, 42, 43, 44, 45, 46, 48, 50, 52, 53, 54, 55, 57, 59, 60, 61, 63, 64, 65, 66
- SM2/SM4 full set: 19

## Fast Representative Cases
- Core translation/sign cases: 1, 2, 20, 21, 50, 66
- RSA-heavy login chains: 4, 5, 6, 10, 13, 17, 36, 47
- Multi-stage mixed sign: 38, 42, 44, 52, 60
- Risk-token oriented: 33, 41, 63, 64, 65

## Stage Template
Use this fixed stage model:
1. Canonicalize input (sort, trim, encode, join)
2. Compose sign seed string
3. Apply crypto/hash transform
4. Encode output format (hex/base64/custom map)
5. Inject into request header/cookie/body

## Algorithm Pitfalls
- AES: verify mode/padding/iv source and whether key/iv are utf8 bytes or hex bytes.
- RSA: verify padding style and pubkey format (PEM/raw/modulus+exp).
- MD5: verify source string exact order and casing before digest.
- Mixed chains: check whether MD5 output is reused as AES key/iv seed.
- Token chains: verify whether output is wrapped by URL encoding or custom alphabet mapping.

## Regression Template
For each target parameter, report:
- `baseline_input`
- `baseline_intermediate_values`
- `baseline_output`
- `variant_input`
- `variant_output`
- `diff_reason` (if mismatch)

## Fallback Strategy
- If full replay fails, lock one stage at a time and compare intermediate outputs.
- If stage mismatch persists, check encoding and normalization before crypto logic.
- If runtime noise is high, force deterministic time/random providers and replay offline.
