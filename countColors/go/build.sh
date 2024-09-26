GOOS=js GOARCH=wasm tinygo build -o countup.wasm countup.go
cp "$(tinygo env TINYGOROOT)/targets/wasm_exec.js" .
