# wasm-bench

A benchmark of JavaScript and Wasm written in various languages (AssemblyScript,
Rust, C/C++).

## Benchmark

### countColors ([details](countColors/details.md))

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                                   time/iter (avg)        iter/s      (min … max)           p75      p99     p995
------------------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                            166.3 ms           6.0 (160.8 ms … 174.1 ms) 166.5 ms 174.1 ms 174.1 ms
AssemblyScript 0.27.29 (Wrap)                      152.5 ms           6.6 (151.4 ms … 155.7 ms) 153.0 ms 155.7 ms 155.7 ms
AssemblyScript 0.27.29 (Shift)                     177.8 ms           5.6 (177.0 ms … 178.8 ms) 178.3 ms 178.8 ms 178.8 ms
AssemblyScript 0.27.29 (DataView)                  158.3 ms           6.3 (157.5 ms … 160.1 ms) 158.3 ms 160.1 ms 160.1 ms
Rust 1.81.0, wasm-bindgen 0.2.93                   150.1 ms           6.7 (149.7 ms … 151.0 ms) 150.4 ms 151.0 ms 151.0 ms
Go, 1.23.1, TinyGo 0.33.0 GC=conservative          141.0 ms           7.1 (125.9 ms … 178.1 ms) 139.1 ms 178.1 ms 178.1 ms
Go, 1.23.1, TinyGo 0.33.0 GC=leaking               100.8 ms           9.9 ( 98.4 ms … 102.7 ms) 101.6 ms 102.7 ms 102.7 ms
Go, 1.23.1, TinyGo 0.33.0 GC=precise               140.2 ms           7.1 (139.0 ms … 144.1 ms) 140.1 ms 144.1 ms 144.1 ms
C, emscripten 3.1.67 (Simple)                      101.5 ms           9.9 (100.7 ms … 102.2 ms) 101.7 ms 102.2 ms 102.2 ms
C, emscripten 3.1.67 (Struct)                       97.4 ms          10.3 ( 87.1 ms …  98.9 ms)  98.5 ms  98.9 ms  98.9 ms
C++, emscripten 3.1.67 (Simple)                    100.4 ms          10.0 ( 96.0 ms … 101.3 ms) 100.9 ms 101.3 ms 101.3 ms
C++, emscripten 3.1.67 (Class)                     103.6 ms           9.7 (102.4 ms … 105.8 ms) 103.8 ms 105.8 ms 105.8 ms
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
