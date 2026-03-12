# JSVMP and AST Recovery

## 1. Select the VMP Recovery Level First

### Level A: extract only critical `opcode`

Suitable when:

- the target field闁炽儲鐛?write-back boundary is already known
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

Escalation rule:

- Start from `A` by default.
- Escalate only when evidence proves the current level is insufficient.

## 2. Basic Order for JSVMP

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

## 3. Basic Order for AST and Control-Flow Flattening

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

## 4. Common Misjudgments

- Treating the dispatcher as the core algorithm
- Treating string-table recovery as completion
- Treating one flattened case as the real main path
- Jumping directly to level `C`
- Skipping equivalence validation and judging only by appearance

## 5. Completion Standard

- Dispatcher entry is known.
- State carriers are known.
- Critical branches or `opcode` directly related to the target field are extracted.
- The stopping level among `A / B / C` is justified.
- The recovered result can explain the target field or support the next replay step.
