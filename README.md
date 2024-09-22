# wasm-bench

A benchmark of JavaScript and Wasm written in various languages (AssemblyScript,
Rust, C).

## Benchmark

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                    163.1 ms           6.1 (159.8 ms … 170.8 ms) 163.1 ms 170.8 ms 170.8 ms
AssemblyScript 0.27.29 (Wrap)              150.9 ms           6.6 (146.8 ms … 154.3 ms) 151.4 ms 154.3 ms 154.3 ms
AssemblyScript 0.27.29 (Shift)             174.8 ms           5.7 (173.7 ms … 175.6 ms) 174.9 ms 175.6 ms 175.6 ms
AssemblyScript 0.27.29 (DataView)          156.1 ms           6.4 (155.9 ms … 156.4 ms) 156.1 ms 156.4 ms 156.4 ms
Rust 1.81.0, wasm-bindgen 0.2.93           145.8 ms           6.9 (130.3 ms … 147.8 ms) 147.1 ms 147.8 ms 147.8 ms
C, emscripten 3.1.67 (Simple)              100.6 ms           9.9 (100.2 ms … 101.0 ms) 100.7 ms 101.0 ms 101.0 ms
C, emscripten 3.1.67 (Struct)               97.6 ms          10.3 ( 96.5 ms … 100.6 ms)  97.8 ms 100.6 ms 100.6 ms
```

## Requirements

- [Deno](https://github.com/denoland/deno)
- [AssemblyScript](https://github.com/AssemblyScript/assemblyscript)
- [Rust](https://github.com/rust-lang/rust) &
  [wasm-pack](https://github.com/rustwasm/wasm-pack)
- [emscripten](https://github.com/emscripten-core/emscripten)

## Build

```
bash build.sh
```

## Test

```
deno bench --allow-read
deno test --allow-read
```

## License

MIT
