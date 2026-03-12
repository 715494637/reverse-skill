# RS Collection and Two-Hop Routing

## When to Use

Use this reference when the target shows one or more of the following RS indicators:

- a `204` landing or challenge page
- inline `$_ts.nsd` and `$_ts.cd`
- an external `r2mKa` script
- page code generated through `$_ts.l__`
- `meta[r=m]` values that influence route or state
- a first-hop cookie or redirect that must be consumed on a second hop

Stay inside locate scope:

- prove the RS artifact chain
- prove first-hop and second-hop relation
- state which hop is canonical for downstream work
- stop before runtime patching or deep shell recovery

## Mandatory Capture Set

Capture and record the following as one artifact group:

- first-hop URL or landing-page URL
- first-hop HTML
- inline `$_ts` block carrying `nsd` and `cd`
- external scripts separated into `r2mKa` candidate and `$_ts.l__` appcode candidates
- every `meta[r=m]` content value
- produced cookie, redirect target, or other state carrier after hop one
- second-hop URL, response status, and second-hop `html/js/ts` artifacts when they exist

Do not call the chain “collected” from one JS file alone.

## Two-Hop Routing Rules

| Condition | Action |
| --- | --- |
| first hop produces a cookie, redirect, or route clue that is consumed later | capture second-hop request and response with that produced state |
| second hop returns a new `html/js/ts` set | treat second-hop artifacts as canonical for replay or recovery |
| second hop reuses the first-hop artifact set | record first hop as canonical and second hop as validated |
| no second-hop evidence exists while produced state is consumed later | keep locate at `partial` |

## Meta-Content Rule

If `meta[r=m]` exists:

- parse and record each content value
- state whether it resolves to a redirect, route clue, or still-unresolved state clue
- do not leave it as page noise in `总览.md` or `请求链路.md`

## Stop Conditions

- no inline `$_ts.nsd/cd`: RS collection route is not yet proven
- only first-hop artifacts exist while target state is consumed on the second hop: `partial`
- `r2mKa` script and `$_ts.l__` appcode are not separated: `partial`
- `meta[r=m]` exists but is not recorded or classified: `partial`

## Completion Standard

RS artifact locating is complete only when:

- first-hop artifacts are complete
- second-hop relation is known whenever produced state is consumed later
- the canonical hop for downstream runtime or recovery work is stated
- locate can hand off without reopening basic RS artifact collection
