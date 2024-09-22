# wasm-bench

A benchmark of JavaScript and Wasm written in various languages (AssemblyScript,
Rust, C).

## Benchmark

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                    164.3 ms           6.1 (163.5 ms … 166.1 ms) 164.5 ms 166.1 ms 166.1 ms
AssemblyScript 0.27.29 (Wrap)              153.0 ms           6.5 (146.1 ms … 155.7 ms) 153.5 ms 155.7 ms 155.7 ms
AssemblyScript 0.27.29 (Shift)             177.5 ms           5.6 (176.6 ms … 178.5 ms) 177.6 ms 178.5 ms 178.5 ms
AssemblyScript 0.27.29 (DataView)          157.8 ms           6.3 (157.4 ms … 158.4 ms) 158.0 ms 158.4 ms 158.4 ms
Rust 1.81.0, wasm-bindgen 0.2.93           149.3 ms           6.7 (144.7 ms … 152.5 ms) 150.3 ms 152.5 ms 152.5 ms
C, emscripten 3.1.67 (Simple)              101.3 ms           9.9 ( 96.8 ms … 102.3 ms) 102.1 ms 102.3 ms 102.3 ms
C, emscripten 3.1.67 (Struct)               98.9 ms          10.1 ( 92.9 ms … 100.0 ms)  99.7 ms 100.0 ms 100.0 ms
C++, emscripten 3.1.67                     101.5 ms           9.9 (100.9 ms … 101.9 ms) 101.7 ms 101.9 ms 101.9 ms
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
