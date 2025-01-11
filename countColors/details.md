## Benchmark details for `countColors`

## First Run

```
JavaScript, Deno 2.1.5: 155ms
AssemblyScript 0.27.31 (Wrap): 321ms
AssemblyScript 0.27.31 (Shift): 325ms
AssemblyScript 0.27.31 (DataView): 323ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Pointer): 211ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Box): 272ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Vec): 280ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Uint32): 276ms
Go, 1.23.4, TinyGo 0.35.0 GC=leaking (Simple): 225ms
Go, 1.23.4, TinyGo 0.35.0 GC=conservative (Simple): 29834ms
Go, 1.23.4, TinyGo 0.35.0 GC=precise (Simple): 302ms
Go, 1.23.4, TinyGo 0.35.0 GC=leaking (Class): 3104ms
Go, 1.23.4, TinyGo 0.35.0 GC=precise (Class): 4156ms
C, emscripten 3.1.74 (Simple): 177ms
C, emscripten 3.1.74 (Struct): 185ms
C++, emscripten 3.1.74 (Simple): 186ms
C++, emscripten 3.1.74 (Class): 187ms
```

## Size

```
as-dataview/countup.wasm 3862
as-shift/countup.wasm 3522
as-wrap/countup.wasm 3799
c-simple/countup.wasm 7602
c-struct/countup.wasm 7653
cpp-class/countup.wasm 14089
cpp-simple/countup.wasm 12057
go-class/countup-conservative.wasm 175302
go-class/countup-leaking.wasm 157113
go-class/countup-precise.wasm 176911
go-simple/countup-conservative.wasm 109892
go-simple/countup-leaking.wasm 93169
go-simple/countup-precise.wasm 111309
rust-box/pkg/countup_bg.wasm 9410
rust-pointer/pkg/countup_bg.wasm 9343
rust-uint32/pkg/countup_bg.wasm 12639
rust-vec/pkg/countup_bg.wasm 9422
```
