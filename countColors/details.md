## Benchmark details for `countColors`

## First Run

```
JavaScript, Deno 1.46.3: 152ms
AssemblyScript 0.27.30 (Wrap): 334ms
AssemblyScript 0.27.30 (Shift): 321ms
AssemblyScript 0.27.30 (DataView): 327ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Pointer): 226ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Box): 296ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Vec): 301ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Uint32): 230ms
Go, 1.23.2, TinyGo 0.33.0 GC=leaking (Simple): 236ms
Go, 1.23.2, TinyGo 0.33.0 GC=conservative (Simple): 29263ms
Go, 1.23.2, TinyGo 0.33.0 GC=precise (Simple): 312ms
Go, 1.23.2, TinyGo 0.33.0 GC=leaking (Class): 3148ms
Go, 1.23.2, TinyGo 0.33.0 GC=precise (Class): 3602ms
C, emscripten 3.1.67 (Simple): 176ms
C, emscripten 3.1.68 (Struct): 186ms
C++, emscripten 3.1.68 (Simple): 186ms
C++, emscripten 3.1.68 (Class): 186ms
```

## Size

```
as-dataview/countup.wasm 3862
as-shift/countup.wasm 3522
as-wrap/countup.wasm 3799
c-simple/countup.wasm 7607
c-struct/countup.wasm 7658
cpp-class/countup.wasm 14210
cpp-simple/countup.wasm 12173
go-class/countup-conservative.wasm 156054
go-class/countup-leaking.wasm 138397
go-class/countup-precise.wasm 157669
go-simple/countup-conservative.wasm 90488
go-simple/countup-leaking.wasm 74292
go-simple/countup-precise.wasm 91879
rust-box/pkg/countup_bg.wasm 8242
rust-pointer/pkg/countup_bg.wasm 8172
rust-uint32/pkg/countup_bg.wasm 10047
rust-vec/pkg/countup_bg.wasm 8241
```
