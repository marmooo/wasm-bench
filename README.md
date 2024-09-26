# wasm-bench

A benchmark of JavaScript and Wasm written in various languages (AssemblyScript,
Rust, C/C++).

## Benchmark

### countColors

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                    166.8 ms           6.0 (164.1 ms … 171.8 ms) 169.6 ms 171.8 ms 171.8 ms
AssemblyScript 0.27.29 (Wrap)              153.8 ms           6.5 (150.1 ms … 155.0 ms) 154.4 ms 155.0 ms 155.0 ms
AssemblyScript 0.27.29 (Shift)             175.2 ms           5.7 (174.1 ms … 175.8 ms) 175.4 ms 175.8 ms 175.8 ms
AssemblyScript 0.27.29 (DataView)          156.5 ms           6.4 (156.0 ms … 157.8 ms) 156.5 ms 157.8 ms 157.8 ms
Rust 1.81.0, wasm-bindgen 0.2.93           147.4 ms           6.8 (142.9 ms … 154.1 ms) 147.4 ms 154.1 ms 154.1 ms
C, emscripten 3.1.67 (Simple)              100.7 ms           9.9 ( 99.7 ms … 101.5 ms) 100.9 ms 101.5 ms 101.5 ms
C, emscripten 3.1.67 (Struct)              100.0 ms          10.0 ( 93.0 ms … 101.5 ms) 100.9 ms 101.5 ms 101.5 ms
C++, emscripten 3.1.67 (Simple)            102.6 ms           9.7 (100.5 ms … 103.3 ms) 103.0 ms 103.3 ms 103.3 ms
C++, emscripten 3.1.67 (Class)             102.1 ms           9.8 (101.6 ms … 103.4 ms) 102.2 ms 103.4 ms 103.4 ms
```

### getColors

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
