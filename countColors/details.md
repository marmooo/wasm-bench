## Benchmark details for `countColors`

## First Run

```
JavaScript, Deno 1.46.3: 158ms
AssemblyScript 0.27.30 (Wrap): 347ms
AssemblyScript 0.27.30 (Shift): 336ms
AssemblyScript 0.27.30 (DataView): 337ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Pointer): 233ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Box): 299ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Vec): 300ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Uint32): 295ms
Go, 1.23.1, TinyGo 0.33.0 GC=leaking (Simple): 241ms
Go, 1.23.1, TinyGo 0.33.0 GC=conservative (Simple): 29954ms
Go, 1.23.1, TinyGo 0.33.0 GC=precise (Simple): 315ms
Go, 1.23.1, TinyGo 0.33.0 GC=leaking (Class): 3287ms
Go, 1.23.1, TinyGo 0.33.0 GC=precise (Class): 3759ms
C, emscripten 3.1.67 (Simple): 174ms
C, emscripten 3.1.67 (Struct): 186ms
C++, emscripten 3.1.67 (Simple): 186ms
C++, emscripten 3.1.67 (Class): 183ms
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
go-class/countup-conservative.wasm 156099
go-class/countup-leaking.wasm 138442
go-class/countup-precise.wasm 157714
go-simple/countup-conservative.wasm 90503
go-simple/countup-leaking.wasm 74307
go-simple/countup-precise.wasm 91894
rust-box/pkg/countup_bg.wasm 8254
rust-pointer/pkg/countup_bg.wasm 8184
rust-uint32/pkg/countup_bg.wasm 10111
rust-vec/pkg/countup_bg.wasm 8253
```
