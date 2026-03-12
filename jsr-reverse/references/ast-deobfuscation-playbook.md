# AST Deobfuscation Playbook

## When to Use

Use this reference when the main shell is AST-obfuscated code: string tables, helper proxies, control-flow flattening, packed bundles, or heavily wrapped business operators.

Stay inside recover scope:

- recover semantic anchors
- choose transform order
- keep a transform ledger
- stop once downstream work can continue

## Fingerprint First

Identify the dominant shell before choosing transforms.

| Signal | Likely shell | First move |
| --- | --- | --- |
| large string table plus accessor helper | string-table obfuscation | recover literals first |
| small helper functions wrapping operators | helper proxy or object dictionary | inline helpers after literal recovery |
| `while` plus `switch` dispatcher | control-flow flattening | recover jump order after constants stabilize |
| packed module bootstrap | bundle wrapper | unpack modules before deep operator recovery |

Do not batch-transform before the shell family is identified.

## Ordered Transform Path

Use this order unless evidence shows a different dependency:

1. recover readable anchors: literals, keys, call relations
2. unpack bundles when wrapper structure blocks local reasoning
3. inline trivial helper proxies and object dictionaries
4. normalize property access and simple expressions
5. unflatten real execution order
6. remove dead or decoy branches only after the live path is proven

Each step must preserve one explicit invariant before the next step begins.

## Bundle-Unpack Decision

Unpack first when:

- the operator is hidden behind module bootstrap or lazy-load wrappers
- the current bundle prevents stable function boundaries
- module extraction is cheaper than whole-bundle reasoning

Do not unpack by default when the current shell is already local and readable enough for the task.

## Transform Ledger

Record every transform step with:

- input artifact
- output artifact
- transform applied
- preserved invariant
- validation evidence

If a step cannot state its preserved invariant, it is not ready to run.

## Completion Standard

AST recovery is complete only when:

- the shell family is identified
- the transform order is justified
- semantic anchors are recovered enough for the next locate or replay step
- every transform step has validation evidence

## Common Missteps

- beautifying source and calling it recovery
- mixing bundle unpack, helper inlining, and unflattening without a ledger
- removing dead code before the live path is proven
- using source readability as proof instead of validation evidence
