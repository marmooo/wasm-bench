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

# C/C++ useful options
# https://emscripten.org/docs/optimizing/Optimizing-Code.html
# -s DISABLE_EXCEPTION_CATCHING=0
#   printf() --> console.log()
#   std::cout --> console.log()

# C++
cd cpp
emcc color.cpp -o color.js --bind \
  -O3 -flto -funroll-loops --closure 1 \
  -s MODULARIZE \
  -s EXPORT_ES6=1 \
  -s ALLOW_MEMORY_GROWTH=1
cd ..
