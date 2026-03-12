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
worker 闁稿繈鍎辫ぐ娑㈡晬?濞戞捁宕甸崵搴ｇ矙鐎ｎ亜寮抽柛娆忓亰缁?worker 闁搞儳鍋涘顒勬晬?闁稿繐褰夐棅鈺呮偐閼哥鍋撴笟濠勭獥
闁哄牃鍋撶紓浣哥墕閸熸捇宕堕悙鎵Т缂傚喚鍣槐?```

Bridge-contract card:

```markdown
婵℃ぜ鍎茬敮瀵哥尵鐠囪尙鈧兘鏁嶅绔渞ker
闁稿繈鍎辫ぐ娑㈡晬濮濈棜w Worker / blob / 閻庢稒顨堥浣圭▔閸欏顏婚悷?濞戞捁宕甸崵搴ｇ矙?-> worker闁?worker -> 濞戞捁宕甸崵搴ｇ矙鐎ｅ墎绐?闁稿繐褰夐棅鈺呮偐閼哥鍋撴笟濠勭獥cookie / storage / challenge / device seed / session
闁告劖鐟ュú鏍ㄦ媴瀹ュ洨鏋傞柨?闁哄嫷鍨伴幆渚€鏌呴崒姘€ゅ娑欏灩濞插懏寰勫鍥ㄦ殢闁挎稒纰嶅Σ?/ 闁?```

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
婵℃ぜ鍎茬敮瀵哥尵鐠囪尙鈧兘鏁嶅绔宻m
闁告梻濮惧ù鍥礂閵夈儱缍撻柨娑欘劉nstantiate / instantiateStreaming
imports闁?exports闁?闁告瑥鍊归弳鐔煎箥閹惧啿鐦堕柡鍌滄嚀缁憋繝鏁?閺夆晜鏌ㄥú鏍磹閻撳孩绀€闁衡偓閼稿灚鐓欑€殿喖楠忕槐?濞存粌鏈濂稿礌閸涢偊妫呴悘鐐插亰缁?闁哄嫷鍨伴幆渚€鏌呴崒姘€ゅ娑欏灩濞插懏寰勫鍥ㄦ殢闁挎稒纰嶅Σ?/ 闁?```

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
闁烩晩鍠楅悥锝呂熼垾铏仴闁?闁烩晛鐡ㄧ敮瀛樼瑹濠靛﹦顩俊顖椻偓铏仴闁?runtime helper闁?闂傚洠鍋撻悷鏇氱椤曢亶宕欓搹瑙勭暠闁稿繈鍎辫ぐ娑㈡晬?闁绘粠鍨伴。銊ヮ浖閳哄绐?闁哄牃鍋撻悘蹇撶箰瑜板弶娼婚幇顖ｆ斀闂傚偆鍘肩€垫﹢鏁?闁绘鐗婂﹢浼存煥濮樺崬浠柨娑樻綄undle/hash/moduleId闁挎稑顧€缁?```

## 5. When the Bridge Layer Is the Real Difficulty

- The main thread sees only a shell, while the real value appears in a callback, message, memory area, or lazy module.
- Modifying the outer wrapper does not explain how the final value is formed.
- Downstream locate or replay work cannot continue without a clear bridge contract.

## 6. Completion Standard

- A bridge contract exists.
- Input, output, and write-back point are known.
- For `webpack`, the module-closure boundary is known.
- Container layer, bridge layer, and business layer are separated.
