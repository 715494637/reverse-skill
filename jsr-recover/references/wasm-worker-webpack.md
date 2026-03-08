# WASM, Worker, and Webpack

## 1. Confirm the Bridge Layer Before Entering Internals

These three classes share one property:

- the real logic is not necessarily exposed in the main thread or visible source
- but the input/output boundary always exists

So the first step is always:

- find the entry
- find the bridge
- find the input
- find the output

## 2. Worker

Confirm first:

- whether the worker is a separate file, `blob`, or string assembly
- what the main thread sends
- what the worker returns
- whether one-time challenge, device seed, or session state is carried through the bridge

Default recording format:

```markdown
worker 入口：
主线程入参：
worker 回参：
共享状态：
最终写回位置：
```

Bridge-contract card:

```markdown
桥接类型：worker
入口：new Worker / blob / 字符串拼装
主线程 -> worker：
worker -> 主线程：
共享状态：cookie / storage / challenge / device seed / session
写回位置：
是否适合黑盒复用：是 / 否
```

## 3. WASM

Confirm first:

- what `imports` are required
- what `exports` are exposed
- how the JS wrapper packs parameters
- whether the result is returned directly or wrapped by another shell

Conclusion:

- If the bridge layer is already enough to explain input and output, full disassembly is not required.

Bridge-contract card:

```markdown
桥接类型：wasm
加载入口：instantiate / instantiateStreaming
imports：
exports：
参数打包方式：
返回值回收方式：
二次包装层：
是否适合黑盒复用：是 / 否
```

## 4. Webpack / Runtime

Confirm first:

- module loading entry
- lazy-loading points
- the real target module
- the boundary between runtime shell and business module

Common misjudgment:

- staying in the runtime shell for too long without entering the business module

Module-closure record:

```markdown
目标模块：
直接依赖模块：
runtime helper：
需要导出的入口：
环境桩：
最小可运行闭包：
版本锚点（bundle/hash/moduleId）：
```

## 5. When the Bridge Layer Is the Real Difficulty

- The main thread sees only a shell, while the real value appears in a callback, message, memory area, or lazy module.
- Modifying the outer wrapper does not explain how the final value is formed.
- Downstream locate or replay work cannot continue without a clear bridge contract.

## 6. Completion Standard

- A bridge contract exists.
- Input, output, and write-back point are known.
- For `webpack`, the module-closure boundary is known.
- Container layer, bridge layer, and business layer are separated.

