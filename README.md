# wasm-bench

A benchmark of JavaScript and Wasm written in various languages.

## Benchmark

### countColors ([details](countColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                                            time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------------------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 2.1.5                                      163.5 ms           6.1 (163.0 ms … 164.6 ms) 163.7 ms 164.6 ms 164.6 ms
AssemblyScript 0.27.31 (Wrap)                               152.4 ms           6.6 (151.8 ms … 152.9 ms) 152.7 ms 152.9 ms 152.9 ms
AssemblyScript 0.27.31 (Shift)                              176.3 ms           5.7 (176.0 ms … 176.9 ms) 176.4 ms 176.9 ms 176.9 ms
AssemblyScript 0.27.31 (DataView)                           156.7 ms           6.4 (156.5 ms … 157.0 ms) 156.9 ms 157.0 ms 157.0 ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Pointer)                  105.4 ms           9.5 (105.0 ms … 105.8 ms) 105.6 ms 105.8 ms 105.8 ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Box)                      151.6 ms           6.6 (150.9 ms … 152.2 ms) 151.8 ms 152.2 ms 152.2 ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Vec)                      150.9 ms           6.6 (144.4 ms … 156.1 ms) 153.4 ms 156.1 ms 156.1 ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Uint32)                   147.9 ms           6.8 (147.4 ms … 150.1 ms) 147.9 ms 150.1 ms 150.1 ms
Go, 1.23.4, TinyGo 0.35.0 GC=leaking (Simple)               103.8 ms           9.6 (102.9 ms … 104.2 ms) 104.0 ms 104.2 ms 104.2 ms
Go, 1.23.4, TinyGo 0.35.0 GC=conservative (Simple)          136.2 ms           7.3 (135.4 ms … 136.6 ms) 136.4 ms 136.6 ms 136.6 ms
Go, 1.23.4, TinyGo 0.35.0 GC=precise (Simple)               132.3 ms           7.6 (131.7 ms … 132.9 ms) 132.3 ms 132.9 ms 132.9 ms
C, emscripten 3.1.74 (Simple)                               100.5 ms           9.9 ( 99.9 ms … 101.0 ms) 100.8 ms 101.0 ms 101.0 ms
C, emscripten 3.1.74 (Struct)                                99.2 ms          10.1 ( 98.1 ms …  99.7 ms)  99.5 ms  99.7 ms  99.7 ms
C++, emscripten 3.1.74 (Simple)                             101.8 ms           9.8 (101.1 ms … 102.4 ms) 102.2 ms 102.4 ms 102.4 ms
C++, emscripten 3.1.74 (Class)                              101.2 ms           9.9 (100.4 ms … 102.7 ms) 101.5 ms 102.7 ms 102.7 ms
```

### getColors ([details](getColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                                   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 2.1.5                             192.8 ms           5.2 (158.8 ms … 223.5 ms) 221.8 ms 223.5 ms 223.5 ms
AssemblyScript 0.27.31 (Number)                    260.9 ms           3.8 (235.2 ms … 297.7 ms) 261.9 ms 297.7 ms 297.7 ms
AssemblyScript 0.27.31 (Class)                     304.9 ms           3.3 (290.5 ms … 347.9 ms) 305.1 ms 347.9 ms 347.9 ms
Rust 1.84.0, wasm-bindgen 0.2.99 (Simple)             2.4 s           0.4 (   2.3 s …    2.4 s)    2.4 s    2.4 s    2.4 s
Rust 1.84.0, wasm-bindgen 0.2.99 (Serde)           402.9 ms           2.5 (377.5 ms … 440.9 ms) 412.5 ms 440.9 ms 440.9 ms
C++, emscripten 3.1.74                             376.3 ms           2.7 (364.6 ms … 405.6 ms) 372.8 ms 405.6 ms 405.6 ms
```

### initColors ([details](initColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                          time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 2.1.5                    155.9 ms           6.4 (153.8 ms … 157.6 ms) 156.6 ms 157.6 ms 157.6 ms
AssemblyScript 0.27.31                    148.7 ms           6.7 (124.1 ms … 191.0 ms) 161.0 ms 191.0 ms 191.0 ms
Rust 1.84.0, wasm-bindgen 0.2.99           71.2 ms          14.0 ( 63.4 ms … 106.6 ms)  76.1 ms 106.6 ms 106.6 ms
C++, emscripten 3.1.74                     37.7 ms          26.6 ( 36.3 ms …  43.1 ms)  38.0 ms  43.1 ms  43.1 ms
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
