# Rust options
# https://rustwasm.github.io/docs/book/reference/code-size.html

# Rust (Simple)
cd rust-simple
wasm-pack build --target web --release
cd ..

# Rust (Serde)
cd rust-serde
wasm-pack build --target web --release
cd ..

# AssemblyScript (Number)
cd as-number
asc color.ts -o color.wasm --bindings esm \
  --runtime minimal --exportRuntime \
  -O3 --converge --noAssert --uncheckedBehavior always
cd ..

# AssemblyScript (Class)
cd as-class
asc color.ts -o color.wasm --bindings esm \
  --runtime minimal --exportRuntime \
  -O3 --converge --noAssert --uncheckedBehavior always
cd ..

# C++
cd cpp
emcc color.cpp -o color.js -O3 -flto --closure 1 \
  --bind \
  -s MODULARIZE \
  -s EXPORT_ES6=1 \
  -s ALLOW_MEMORY_GROWTH=1
cd ..
