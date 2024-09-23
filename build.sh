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

# C/C++ useful options
# https://emscripten.org/docs/optimizing/Optimizing-Code.html
# -s DISABLE_EXCEPTION_CATCHING=0
#   printf() --> console.log()
#   std::cout --> console.log()

# C (Simple)
cd c-simple
emcc countup.c -o countup.js -O3 -flto --closure 1 \
  -s MODULARIZE \
  -s EXPORT_ES6=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS=_malloc,_free
cd ..

# C (Struct)
cd c-struct
emcc countup.c -o countup.js -O3 -flto --closure 1 \
  -s MODULARIZE \
  -s EXPORT_ES6=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS=_malloc,_free
cd ..

# C++
cd cpp
emcc countup.cpp -o countup.js -O3 -flto --closure 1 \
  -s MODULARIZE \
  -s EXPORT_ES6=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS=_malloc,_free
cd ..
