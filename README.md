# wasm-bench

A benchmark of JavaScript and Wasm written in various languages.

## Benchmark

### countColors ([details](countColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                                    time/iter (avg)        iter/s      (min … max)           p75      p99     p995
-------------------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                                     163.9 ms           6.1 (157.0 ms … 169.1 ms) 166.7 ms 169.1 ms 169.1 ms
AssemblyScript 0.27.30 (Wrap)                               151.0 ms           6.6 (150.5 ms … 151.9 ms) 151.1 ms 151.9 ms 151.9 ms
AssemblyScript 0.27.30 (Shift)                              175.2 ms           5.7 (174.2 ms … 177.1 ms) 175.7 ms 177.1 ms 177.1 ms
AssemblyScript 0.27.30 (DataView)                           155.8 ms           6.4 (152.3 ms … 156.9 ms) 156.2 ms 156.9 ms 156.9 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Pointer)                  104.0 ms           9.6 (102.5 ms … 104.7 ms) 104.5 ms 104.7 ms 104.7 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Box)                      148.4 ms           6.7 (147.5 ms … 149.4 ms) 148.7 ms 149.4 ms 149.4 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Vec)                      150.2 ms           6.7 (149.4 ms … 150.9 ms) 150.7 ms 150.9 ms 150.9 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Uint32)                   147.6 ms           6.8 (143.3 ms … 150.0 ms) 148.4 ms 150.0 ms 150.0 ms
Go, 1.23.1, TinyGo 0.33.0 GC=leaking (Simple)                99.5 ms          10.1 ( 94.6 ms … 101.8 ms) 101.0 ms 101.8 ms 101.8 ms
Go, 1.23.1, TinyGo 0.33.0 GC=conservative (Simple)          141.5 ms           7.1 (137.6 ms … 151.9 ms) 141.7 ms 151.9 ms 151.9 ms
Go, 1.23.1, TinyGo 0.33.0 GC=precise (Simple)               139.4 ms           7.2 (133.4 ms … 142.9 ms) 141.3 ms 142.9 ms 142.9 ms
C, emscripten 3.1.67 (Simple)                               104.3 ms           9.6 ( 96.8 ms … 107.1 ms) 106.8 ms 107.1 ms 107.1 ms
C, emscripten 3.1.67 (Struct)                                97.2 ms          10.3 ( 94.0 ms …  99.7 ms)  98.6 ms  99.7 ms  99.7 ms
C++, emscripten 3.1.67 (Simple)                             110.8 ms           9.0 ( 99.4 ms … 119.8 ms) 115.9 ms 119.8 ms 119.8 ms
C++, emscripten 3.1.67 (Class)                              111.8 ms           8.9 (103.4 ms … 119.0 ms) 115.3 ms 119.0 ms 119.0 ms
```

### getColors ([details](getColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                                   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                            192.0 ms           5.2 (189.7 ms … 201.7 ms) 192.0 ms 201.7 ms 201.7 ms
AssemblyScript 0.27.30 (Number)                    286.1 ms           3.5 (233.6 ms … 322.7 ms) 307.5 ms 322.7 ms 322.7 ms
AssemblyScript 0.27.30 (Class)                     319.3 ms           3.1 (279.6 ms … 370.7 ms) 334.2 ms 370.7 ms 370.7 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Simple)             2.2 s           0.5 (   2.2 s …    2.2 s)    2.2 s    2.2 s    2.2 s
Rust 1.81.0, wasm-bindgen 0.2.93 (Serde)           337.3 ms           3.0 (316.3 ms … 355.4 ms) 351.8 ms 355.4 ms 355.4 ms
C++, emscripten 3.1.68                             390.2 ms           2.6 (368.9 ms … 401.8 ms) 398.0 ms 401.8 ms 401.8 ms
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
