# wasm-bench

A benchmark of JavaScript and Wasm written in various languages.

## Benchmark

### countColors ([details](countColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                                    time/iter (avg)        iter/s      (min … max)           p75      p99     p995
-------------------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                             164.5 ms           6.1 (158.8 ms … 170.6 ms) 165.8 ms 170.6 ms 170.6 ms
AssemblyScript 0.27.29 (Wrap)                       151.4 ms           6.6 (150.4 ms … 152.6 ms) 151.6 ms 152.6 ms 152.6 ms
AssemblyScript 0.27.29 (Shift)                      174.3 ms           5.7 (170.4 ms … 177.6 ms) 174.7 ms 177.6 ms 177.6 ms
AssemblyScript 0.27.29 (DataView)                   155.9 ms           6.4 (155.5 ms … 156.8 ms) 156.0 ms 156.8 ms 156.8 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Pointer)          104.4 ms           9.6 (103.8 ms … 104.8 ms) 104.5 ms 104.8 ms 104.8 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Box)              153.2 ms           6.5 (147.9 ms … 177.3 ms) 151.9 ms 177.3 ms 177.3 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Vec)              149.9 ms           6.7 (145.8 ms … 153.8 ms) 150.0 ms 153.8 ms 153.8 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Uint32)           147.2 ms           6.8 (141.3 ms … 149.5 ms) 147.8 ms 149.5 ms 149.5 ms
Go, 1.23.1, TinyGo 0.33.0 GC=conservative           138.9 ms           7.2 (138.2 ms … 139.2 ms) 139.1 ms 139.2 ms 139.2 ms
Go, 1.23.1, TinyGo 0.33.0 GC=leaking                 98.5 ms          10.2 ( 80.0 ms … 101.6 ms) 101.0 ms 101.6 ms 101.6 ms
Go, 1.23.1, TinyGo 0.33.0 GC=precise                135.3 ms           7.4 (134.5 ms … 135.7 ms) 135.5 ms 135.7 ms 135.7 ms
C, emscripten 3.1.67 (Simple)                       102.2 ms           9.8 (101.3 ms … 102.9 ms) 102.5 ms 102.9 ms 102.9 ms
C, emscripten 3.1.67 (Struct)                       101.0 ms           9.9 (100.5 ms … 101.5 ms) 101.3 ms 101.5 ms 101.5 ms
C++, emscripten 3.1.67 (Simple)                     101.0 ms           9.9 (100.6 ms … 101.3 ms) 101.2 ms 101.3 ms 101.3 ms
C++, emscripten 3.1.67 (Class)                      105.5 ms           9.5 (102.6 ms … 107.5 ms) 105.7 ms 107.5 ms 107.5 ms
```

### getColors ([details](getColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                         time/iter (avg)        iter/s      (min … max)           p75      p99     p995
--------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                  194.3 ms           5.1 (192.4 ms … 199.0 ms) 194.2 ms 199.0 ms 199.0 ms
AssemblyScript 0.27.29 (Number)          277.1 ms           3.6 (245.9 ms … 331.5 ms) 272.0 ms 331.5 ms 331.5 ms
AssemblyScript 0.27.29 (Class)           error
```

## Requirements

- [Deno](https://github.com/denoland/deno)
- [AssemblyScript](https://github.com/AssemblyScript/assemblyscript)
- [Rust](https://github.com/rust-lang/rust) &
  [wasm-pack](https://github.com/rustwasm/wasm-pack)
- [Go](https://github.com/golang/go) &
  [TinyGo](https://github.com/tinygo-org/tinygo)
- [emscripten](https://github.com/emscripten-core/emscripten)

## Build

```
cd [task]  # countColors, getColors, etc.
bash build.sh
```

## Test

```
cd [task]  # countColors, getColors, etc.
deno bench --allow-read
deno test --allow-read
deno run --allow-read size.js
deno run --allow-read firstRun.js
```

## License

MIT
