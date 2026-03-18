# RS Collection and Two-Hop Routing

## When to Use

Use this file only as a `locate` mount for RS-style targets.

Mount it when the current locate blocker involves one or more of the following:

- a `204` landing or challenge page
- inline `$_ts.nsd` / `$_ts.cd`
- an external `r2mKa` script
- page code generated through `$_ts.l__`
- `meta[r=m]` values that influence route or state
- a first-hop cookie, redirect, or state carrier that must be consumed on a second hop

This file is a locate refinement, not the main RS narrative.

## Owns

This file owns only the RS-specific locate work below:

- the mandatory capture set for RS evidence
- first-hop / second-hop collection rules
- `meta[r=m]` parsing and classification
- deciding which hop is canonical for downstream recover or runtime work

## Does Not Own

This file does not own:

- RS shell recovery
- RS runtime fitting such as `hasDebug`, `basearr`, or fixed runtime facts
- the global locate workflow outside RS-specific evidence
- validation proof

Do not let this file expand into general RS methodology.

## Method inside this stage

### 1. Capture the mandatory set as one locate artifact group

Capture and record:

- first-hop URL or landing-page URL
- first-hop HTML
- inline `$_ts` block carrying `nsd` and `cd`
- external scripts separated into `r2mKa` candidate and `$_ts.l__` appcode candidates
- every `meta[r=m]` content value
- produced cookie, redirect target, or other state carrier after hop one
- second-hop URL, response status, and second-hop `html/js/ts` artifacts when they exist

Do not call the chain collected from one JS file alone.

### 2. Apply the two-hop rules

| Condition | Action |
| --- | --- |
| first hop produces a cookie, redirect, or route clue that is consumed later | capture second-hop request and response with that produced state |
| second hop returns a new `html/js/ts` set | treat second-hop artifacts as canonical for downstream work |
| second hop reuses the first-hop artifact set | record first hop as canonical and second hop as validated |
| no second-hop evidence exists while produced state is consumed later | keep locate at `partial` |

### 3. Apply the meta-content rule

If `meta[r=m]` exists:

- parse and record each content value
- state whether it resolves to a redirect, route clue, or still-unresolved state clue
- do not leave it as page noise in overview notes or request-chain notes

### 4. State the canonical hop explicitly

Before handing off, state:

- whether first hop or second hop is canonical
- what state carrier bridges the two hops
- whether downstream work should start from `r2mKa`, `$_ts.l__`, or another separated artifact

## Stop / handoff rule

- Stop using this file when the mandatory capture set is complete and the canonical hop is stated.
- Keep locate at `partial` when produced state is consumed later but second-hop evidence is still missing.
- Hand off to `recover` when RS artifacts are separated and the next blocker is shell / semantic recovery.
- Hand off to `runtime` when the RS boundary is clear but browser/local divergence such as `hasDebug`, `basearr`, or fixed runtime facts becomes the real blocker.
