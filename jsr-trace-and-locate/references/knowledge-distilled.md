# Distilled Reverse Knowledge: Trace and Locate

## Core Judgments
- If the sink class is known, the writer boundary outranks helper-name search.
- A network snapshot proves the field exists; it does not prove where it was born.
- The first function touching the final value is often a serializer or wrapper, not the builder.
- Header, cookie, and storage-backed fields are often materialized later than body fields.
- Cache, retry, and transport wrappers are noise until they change the dependency set.
- Worker-returned values should be traced from the message boundary inward, not from random worker internals.
- A chain map is incomplete until it names upstream dependencies, not just intermediate helpers.

## Common Misreads
- Searching `sign`, `encrypt`, or hash helpers before proving the writer surface.
- Treating `JSON.stringify`, `FormData`, or fetch wrappers as the source-of-truth function.
- Stopping at the request sender without naming the upstream builder.
- Accepting a one-off path that only works under one lucky page state.

## Evidence Standard
- One stable request fingerprint.
- One verified path: entry -> builder -> writer.
- One explicit dependency list.
- One minimal reproducible probe or locator snippet.
