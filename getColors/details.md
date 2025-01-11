## Benchmark details for `getColors`

## First Run

```
JavaScript, Deno 2.1.5: 295ms
AssemblyScript 0.27.31 (Number): 385ms
AssemblyScript 0.27.31 (Class): 427ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Simple): 2359ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Serde): 539ms
C++, emscripten 3.1.74: 506ms
```

## Size

```
as-class/color.wasm 5653
as-number/color.wasm 5193
cpp/color.wasm 15462
rust-serde/pkg/color_bg.wasm 18739
rust-simple/pkg/color_bg.wasm 18082
```
