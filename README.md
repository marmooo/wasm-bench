# wasm-bench

A benchmark of JavaScript and Wasm written in various languages.

## Benchmark

### countColors ([details](countColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                                            time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------------------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                                     164.1 ms           6.1 (159.8 ms … 171.0 ms) 165.0 ms 171.0 ms 171.0 ms
AssemblyScript 0.27.30 (Wrap)                               150.4 ms           6.7 (150.1 ms … 150.8 ms) 150.5 ms 150.8 ms 150.8 ms
AssemblyScript 0.27.30 (Shift)                              173.9 ms           5.8 (173.7 ms … 174.2 ms) 174.0 ms 174.2 ms 174.2 ms
AssemblyScript 0.27.30 (DataView)                           155.4 ms           6.4 (155.2 ms … 155.6 ms) 155.5 ms 155.6 ms 155.6 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Pointer)                  104.5 ms           9.6 (104.0 ms … 105.0 ms) 104.8 ms 105.0 ms 105.0 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Box)                      153.2 ms           6.5 (152.5 ms … 154.3 ms) 153.2 ms 154.3 ms 154.3 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Vec)                      151.5 ms           6.6 (149.1 ms … 153.3 ms) 151.7 ms 153.3 ms 153.3 ms
Rust 1.81.0, wasm-bindgen 0.2.93 (Uint32)                   102.2 ms           9.8 (101.8 ms … 103.4 ms) 102.3 ms 103.4 ms 103.4 ms
Go, 1.23.2, TinyGo 0.33.0 GC=leaking (Simple)                99.6 ms          10.0 ( 93.4 ms … 101.8 ms) 100.8 ms 101.8 ms 101.8 ms
Go, 1.23.2, TinyGo 0.33.0 GC=conservative (Simple)          138.5 ms           7.2 (137.9 ms … 138.8 ms) 138.7 ms 138.8 ms 138.8 ms
Go, 1.23.2, TinyGo 0.33.0 GC=precise (Simple)               138.2 ms           7.2 (135.3 ms … 139.3 ms) 138.6 ms 139.3 ms 139.3 ms
C, emscripten 3.1.68 (Simple)                               102.3 ms           9.8 (101.2 ms … 102.9 ms) 102.5 ms 102.9 ms 102.9 ms
C, emscripten 3.1.68 (Struct)                                98.5 ms          10.2 ( 92.7 ms …  99.9 ms)  99.5 ms  99.9 ms  99.9 ms
C++, emscripten 3.1.68 (Simple)                             100.3 ms          10.0 ( 99.8 ms … 101.4 ms) 100.4 ms 101.4 ms 101.4 ms
C++, emscripten 3.1.68 (Class)                               98.6 ms          10.1 ( 85.5 ms … 104.2 ms) 102.3 ms 104.2 ms 104.2 ms
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

### initColors ([details](initColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                          time/iter (avg)        iter/s      (min … max)           p75      p99     p995
---------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                   188.9 ms           5.3 (173.5 ms … 213.0 ms) 194.7 ms 213.0 ms 213.0 ms
AssemblyScript 0.27.30                    148.8 ms           6.7 (123.7 ms … 187.2 ms) 160.3 ms 187.2 ms 187.2 ms
Rust 1.81.0, wasm-bindgen 0.2.93           70.3 ms          14.2 ( 63.0 ms … 104.4 ms)  74.9 ms 104.4 ms 104.4 ms
C++, emscripten 3.1.68                     43.7 ms          22.9 ( 42.4 ms …  48.8 ms)  44.0 ms  48.8 ms  48.8 ms
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
