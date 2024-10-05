## Benchmark details for `getColors`

## First Run

```
JavaScript, Deno 1.46.3: 282ms
AssemblyScript 0.27.30 (Number): 423ms
AssemblyScript 0.27.30 (Class): 460ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Simple): 2276ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Serde): 450ms
C++, emscripten 3.1.68 (Class): 515ms
```

## Size

```
as-class/color.wasm 5653
as-number/color.wasm 5193
cpp/color.wasm 15616
rust-serde/pkg/color_bg.wasm 15338
rust-simple/pkg/color_bg.wasm 15133
```
