# Rust options
# https://rustwasm.github.io/docs/book/reference/code-size.html

# Rust
cd rust
wasm-pack build --target web --release
cd ..

# AssemblyScript
cd as
asc init.ts -o init.wasm --bindings esm \
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
emcc init.cpp -o init.js --bind \
  -O3 -flto -funroll-loops --closure 1 \
  -s MODULARIZE \
  -s EXPORT_ES6=1 \
  -s ALLOW_MEMORY_GROWTH=1
cd ..
