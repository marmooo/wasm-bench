## Benchmark details for `countColors`

## First Run

```
JavaScript, Deno 1.46.3: 151ms
AssemblyScript 0.27.29 (Wrap): 329ms
AssemblyScript 0.27.29 (Shift): 319ms
AssemblyScript 0.27.29 (DataView): 336ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Pointer): 223ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Box): 292ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Vec): 293ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Uint32): 288ms
Go, 1.23.1, TinyGo 0.33.0 GC=conservative: 29138ms
Go, 1.23.1, TinyGo 0.33.0 GC=leaking: 226ms
Go, 1.23.1, TinyGo 0.33.0 GC=precise: 309ms
C, emscripten 3.1.67 (Simple): 185ms
C, emscripten 3.1.67 (Struct): 185ms
C++, emscripten 3.1.67 (Simple): 185ms
C++, emscripten 3.1.67 (Class): 198ms
```

## Size

```
as-dataview/countup.wasm 3862
as-shift/countup.wasm 3522
as-wrap/countup.wasm 3799
c-simple/countup.wasm 7559
c-struct/countup.wasm 7610
cpp-class/countup.wasm 14162
cpp-simple/countup.wasm 7554
go/countup-conservative.wasm 90496
go/countup-leaking.wasm 74300
go/countup-precise.wasm 91887
rust-box/pkg/countup_bg.wasm 8254
rust-pointer/pkg/countup_bg.wasm 8184
rust-uint32/pkg/countup_bg.wasm 10111
rust-vec/pkg/countup_bg.wasm 8253
```
