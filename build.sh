# Rust
cd rust
wasm-pack build --target web --release
cd ..

# AssemblyScript (wrap)
cd as-wrap
asc countup.ts -o countup.wasm --bindings esm \
  --runtime minimal --exportRuntime \
  -O3 --converge --noAssert --uncheckedBehavior always
cd ..

# AssemblyScript (Shift)
cd as-shift
asc countup.ts -o countup.wasm --bindings esm \
  --runtime minimal --exportRuntime \
  -O3 --converge --noAssert --uncheckedBehavior always
cd ..

# AssemblyScript (DataView)
cd as-dataview
asc countup.ts -o countup.wasm --bindings esm \
  --runtime minimal --exportRuntime \
  -O3 --converge --noAssert --uncheckedBehavior always
cd ..

# C
cd c
emcc countup.c -o countup.js -O3 \
  -s MODULARIZE \
  -s EXPORT_ES6=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS='["_malloc", "_free"]'
cd ..
