## Benchmark details for `countColors`

## First Run

```
JavaScript, Deno 1.46.3: 155ms
AssemblyScript 0.27.29 (Wrap): 323ms
AssemblyScript 0.27.29 (Shift): 322ms
AssemblyScript 0.27.29 (DataView): 325ms
Rust 1.81.0, wasm-bindgen 0.2.93: 312ms
Go, 1.23.1, TinyGo 0.33.0 GC=conservative: 30692ms
Go, 1.23.1, TinyGo 0.33.0 GC=leaking: 239ms
Go, 1.23.1, TinyGo 0.33.0 GC=precise: 360ms
C, emscripten 3.1.67 (Simple): 190ms
C, emscripten 3.1.67 (Struct): 188ms
C++, emscripten 3.1.67 (Simple): 202ms
C++, emscripten 3.1.67 (Class): 225ms
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
rust/pkg/countup_bg.wasm 8253
```
