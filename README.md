# wasm-bench

A benchmark of JavaScript and Wasm written in various languages (AssemblyScript,
Rust, C).

## Benchmark

```
    CPU | Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz
Runtime | Deno 1.46.3 (x86_64-unknown-linux-gnu)

benchmark                           time/iter (avg)        iter/s      (min … max)           p75      p99     p995
----------------------------------- ----------------------------- --------------------- --------------------------
JavaScript, Deno 1.46.3                    162.9 ms           6.1 (157.0 ms … 170.0 ms) 163.0 ms 170.0 ms 170.0 ms
AssemblyScript 0.27.29 (Wrap)              151.3 ms           6.6 (147.0 ms … 154.9 ms) 152.9 ms 154.9 ms 154.9 ms
AssemblyScript 0.27.29 (Shift)             180.8 ms           5.5 (172.5 ms … 208.5 ms) 180.7 ms 208.5 ms 208.5 ms
AssemblyScript 0.27.29 (DataView)          158.6 ms           6.3 (152.3 ms … 161.5 ms) 158.8 ms 161.5 ms 161.5 ms
Rust 1.81.0, wasm-bindgen 0.2.93           149.6 ms           6.7 (149.0 ms … 152.0 ms) 149.6 ms 152.0 ms 152.0 ms
C, emscripten 3.1.67                        97.1 ms          10.3 ( 93.3 ms …  99.4 ms)  98.3 ms  99.4 ms  99.4 ms
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
