# JSVMP and AST Recovery

## Purpose / Use Boundary

Use this reference only to decide and document how far JSVMP / AST recovery must go for the current target. It is a mounted topic reference under `recover`, not a second recover core reference.

Keep the file focused on:

- choosing the JSVMP recovery depth
- defining the required recovery artifacts
- deciding when `recover` should hand off to `locate`, `runtime`, or `validation`
- preserving the AST / control-flow flattening guidance that follows

Do not expand this file into the full recover spine. The single entry remains `jsr-reverse`, and the spine remains `intake -> evidence -> locate -> recover -> runtime -> validation -> handoff`.

## Recovery Levels

### Level A: extract only critical `opcode`

Suitable when:

- the target field write-back boundary is already known
- only a small set of `opcode` semantics is required to explain the field

Focus:

- extract only the `opcode` that touches the target field
- prove only input, output, and state change
- stop as soon as the target field is explained

### Level B: recover dispatcher plus critical state carriers

Suitable when:

- `opcode` cannot be understood without dispatcher recovery
- key branches depend on registers, stack, context object, or constant pool

Focus:

- recover the dispatcher loop first
- then recover critical state carriers
- finally group the critical `opcode` family

### Level C: minimal decompilation or minimal interpreter

Suitable when:

- multiple paths must be replayed
- protocol rebuild or batch execution is required
- levels `A` and `B` cannot support downstream work

Focus:

- only a minimal verifiable decompilation or interpreted execution
- no low-value full beautification

Hard escalation rules:

- Start from `A`; never jump to `C` just because code is ugly, flattened, or string-table-heavy.
- `A -> B` only when one or more of the following is proven:
  - a critical `opcode` cannot be interpreted without dispatcher semantics
  - target-field explanation depends on register / stack / context flow
  - key branches cannot be judged without state-carrier recovery
- `B -> C` only when one or more of the following is proven:
  - downstream work requires replay of multiple execution paths
  - protocol rebuild or batch execution requires a minimal executable fragment
  - levels `A` and `B` still cannot support runtime fit or validation checkpoints

## JSVMP Artifact Contract

### Entry Card

Required fields:

- target field or target effect
- VM entry function / closure
- bytecode source or bytecode loader
- dispatcher entry location
- interpreter / execution function
- relation to the target field or target write-back path
- strongest observed anchor or evidence
- entry call chain from observable trigger
- entry input sample used for proof
- browser-side evidence for entry
- local recovered interpretation of entry
- confidence and remaining unknowns

### State Carrier Card

Required fields:

- state carrier name
- carrier type: register array / stack object / context object / constant pool / string table / other
- register arrays
- stack objects
- context objects
- constant pool / string table
- initialization site
- read sites relevant to the target
- write sites relevant to the target
- transition rule or update rule
- which carriers materially affect the target field
- which carriers only transport state without affecting the decision
- browser-side evidence for the carrier state
- local recovered mapping of the carrier
- why this carrier is critical to the target field
- remaining gap

### Critical Opcode / Branch Card

Required fields:

- opcode or branch identifier
- dispatcher position or reachability condition
- input
- output
- state mutation
- dependency
- evidence
- relation to target field / hashing / encryption / serialization / packet assembly
- local recovered semantics
- equivalence result: match / diverge / unproven
- remaining blocker

### Recovery-Level Decision Card

Required fields:

- current chosen level: `A` / `B` / `C`
- why the current level is sufficient
- why a shallower stop depth is insufficient
- why deeper opening is not yet justified, or why it has become necessary
- proof that triggered escalation, if any
- checkpoints already closed
- checkpoints still open
- next required handoff: `locate` / `runtime` / `validation` / stop
- explicit stop depth

## Stage Transition Criteria

### `recover -> locate`

Return to `locate` when one or more of the following remains true:

- dispatcher entry relevance is still unproven
- the supposed VM entry is still guessed rather than observed
- the recovered VM slice still cannot be tied to the real target write-back path
- deeper VM work would continue on an unproven boundary instead of closing evidence

If the current blocker is still boundary identification rather than VM semantics, fall back to `locate` instead of extending VM recovery.

### `recover -> runtime`

Move to `runtime` only when one or more of the following is already true:

- the bridge contract is already clear
- the critical operator / `opcode` family already explains the algorithm boundary
- the remaining divergence is caused by environment facts, lifecycle state, timing, or risk branches
- deeper VM work would add code volume without explaining the execution divergence

Only hand off to `runtime` after the proved link from VM behavior to the target field is already clear enough for the named checkpoints.

### `recover -> validation`

Move to `validation` only when all of the following are already true:

- dispatcher entry is known
- state carriers are known
- critical `opcode` / branches related to the target field are extracted
- the chosen stop level is justified
- fixed samples exist for checkpoint comparison

If the cards or checkpoints are still incomplete, do not hand off to `validation`; either stay in `recover` for the missing checkpoint or fall back to `locate` / forward to `runtime` based on the actual blocker.

## Checkpoint Contract

Required checkpoints:

- dispatcher entry state
- critical state-carrier transition
- critical opcode input/output
- pre-write-back intermediate result
- final target field

For each checkpoint, record:

- fixed input sample
- browser-side evidence
- recovered/local-side evidence
- conclusion: match / diverge / unproven
- remaining gap

## Common Misjudgments

- treating dispatcher recovery as completion by itself
- treating string-table recovery as algorithm recovery
- selecting level `C` because the code style is unpleasant
- continuing deeper VM recovery when the remaining blocker is clearly runtime divergence
- claiming “pure algorithm” before state and runtime dependencies are actually excluded

## Completion Standard

Recovery is complete only when all of the following are explicit:

- the stop depth at `A`, `B`, or `C` is justified by evidence
- the required cards and checkpoints are recorded as artifacts, not implied by prose alone
- the recovered result explains the target field, or clearly states the remaining gap
- the next handoff is explicit: back to `locate`, forward to `runtime`, forward to `validation`, or stop
- the handoff reason matches the actual blocker rather than preference for deeper VM expansion

## Basic Order for JSVMP

### Step 1: locate the entry

Find:

- where bytecode comes from
- where the dispatcher loop starts
- which function performs interpretation

### Step 2: identify the state carriers

Prioritize:

- register arrays
- stack objects
- context objects
- constant pools and string tables

### Step 3: extract critical `opcode`

Do not rebuild the entire virtual machine at the start.

Answer instead:

- which `opcode` touches the target field
- which `opcode` performs hashing, encryption, serialization, or packet assembly
- which `opcode` only transports state

### Step 4: run equivalence checks

After extracting each slice, compare input and output. Do not judge by appearance.

## Basic Order for AST and Control-Flow Flattening

Do not rewrite or normalize the whole AST just for readability. Recover only the anchors, execution order, and side-effect-bearing branches needed for the current target and checkpoints.

### Step 1: recover readable anchors

Recover first:

- literals
- string tables
- object keys
- call relations

### Step 2: identify the flattening dispatcher

Focus on:

- top-level `switch`
- jump-state variables
- dead branches and decoy branches

### Step 3: recover the real execution order

Judge by execution order, not by beautified source order.

### Step 4: separate side effects

Separate:

- control-flow wrapping only
- branches that really mutate state, request data, or return values
