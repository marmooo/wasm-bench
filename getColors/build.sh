# AssemblyScript (Number)
cd as-number
asc color.ts -o color.wasm --bindings esm \
  --runtime minimal --exportRuntime \
  -O3 --converge --noAssert --uncheckedBehavior always
cd ..

# TODO: not work
# AssemblyScript (Class)
cd as-class
asc color.ts -o color.wasm --bindings esm \
  --runtime minimal --exportRuntime \
  -O3 --converge --noAssert --uncheckedBehavior always
cd ..
