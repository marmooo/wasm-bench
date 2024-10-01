import { countColors as countColorsJs } from "./js/countup.js";
import { countColors as countColorsAsWrap } from "./as-wrap/countup.js";
import { countColors as countColorsAsShift } from "./as-shift/countup.js";
import { countColors as countColorsAsDataView } from "./as-dataview/countup.js";
import initRustPointer, {
  count_colors as count_colors_pointer,
  free as free_pointer,
} from "./rust-pointer/pkg/countup.js";
import initRustBox, {
  count_colors as count_colors_box,
} from "./rust-box/pkg/countup.js";
import initRustVec, {
  count_colors as count_colors_vec,
} from "./rust-vec/pkg/countup.js";
import initRustUint32, {
  count_colors as count_colors_uint32,
} from "./rust-uint32/pkg/countup.js";
import "./go-simple/wasm_exec.js";
import "@kitsonk/xhr";
import initCSimple from "./c-simple/countup.js";
import initCStruct from "./c-struct/countup.js";
import initCppSimple from "./cpp-simple/countup.js";
import initCppClass from "./cpp-class/countup.js";
import { createStruct, createTypedArray, freeStruct } from "./c-struct/util.js";
import { __collect as __collectWrap } from "./as-wrap/countup.js";
import { __collect as __collectShift } from "./as-shift/countup.js";
import { __collect as __collectDataView } from "./as-dataview/countup.js";

async function initGoInstance(path) {
  const wasmCode = await Deno.readFile(path);
  const wasmModule = await WebAssembly.compile(wasmCode);
  const instance = await WebAssembly.instantiate(wasmModule, go.importObject);
  return instance;
}

const rustPointer = await initRustPointer();
await initRustBox();
await initRustVec();
await initRustUint32();
const cSimple = await initCSimple();
const cStruct = await initCStruct();
const cppSimple = await initCppSimple();
const cppClass = await initCppClass();

const go = new Go();
const goSimpleLeaking = await initGoInstance(
  "./go-simple/countup-leaking.wasm",
);
const goSimpleConservative = await initGoInstance(
  "./go-simple/countup-conservative.wasm",
);
const goSimplePrecise = await initGoInstance(
  "./go-simple/countup-precise.wasm",
);
const goClassLeaking = await initGoInstance(
  "./go-class/countup-leaking.wasm",
);
// const goClassConservative = await initGoInstance(
//   "./go-class/countup-conservative.wasm",
// );
const goClassPrecise = await initGoInstance("./go-class/countup-precise.wasm");

function check(name, callback) {
  console.time(name);
  callback();
  console.timeEnd(name);
}

const data = new Uint8Array(16777216);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}

check("JavaScript, Deno 1.46.3", () => {
  countColorsJs(data);
});
check("AssemblyScript 0.27.30 (Wrap)", () => {
  countColorsAsWrap(data);
  __collectWrap(); // --runtime minimal --exportRuntime
});
check("AssemblyScript 0.27.30 (Shift)", () => {
  countColorsAsShift(data);
  __collectShift(); // --runtime minimal --exportRuntime
});
check("AssemblyScript 0.27.30 (DataView)", () => {
  countColorsAsDataView(data);
  __collectDataView(); // --runtime minimal --exportRuntime
});
check("Rust 1.81.0, wasm-bindgen 0.2.93 (Pointer)", () => {
  const resultPtr = count_colors_pointer(data);
  new Uint32Array(rustPointer.memory.buffer, resultPtr, 16777216);
  free_pointer(resultPtr, 16777216);
});
check("Rust 1.81.0, wasm-bindgen 0.2.93 (Box)", () => {
  count_colors_box(data);
});
check("Rust 1.81.0, wasm-bindgen 0.2.93 (Vec)", () => {
  count_colors_vec(data);
});
check("Rust 1.81.0, wasm-bindgen 0.2.93 (Uint32)", () => {
  count_colors_uint32(data);
});
check("Go, 1.23.1, TinyGo 0.33.0 GC=leaking (Simple)", () => {
  go.run(goSimpleLeaking);
  const { countColors, malloc, memory } = goSimpleLeaking.exports;
  const dataPtr = malloc(data.length);
  const copiedData = new Uint8Array(memory.buffer, dataPtr, data.length);
  copiedData.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  new Uint32Array(memory.buffer, resultPtr, 16777216);
});
check("Go, 1.23.1, TinyGo 0.33.0 GC=conservative (Simple)", () => {
  go.run(goSimpleConservative);
  const { countColors, malloc, memory } = goSimpleConservative.exports;
  const dataPtr = malloc(data.length);
  const copiedData = new Uint8Array(memory.buffer, dataPtr, data.length);
  copiedData.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  new Uint32Array(memory.buffer, resultPtr, 16777216);
});
check("Go, 1.23.1, TinyGo 0.33.0 GC=precise (Simple)", () => {
  go.run(goSimplePrecise);
  const { countColors, malloc, memory } = goSimplePrecise.exports;
  const dataPtr = malloc(data.length);
  const copiedData = new Uint8Array(memory.buffer, dataPtr, data.length);
  copiedData.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  new Uint32Array(memory.buffer, resultPtr, 16777216);
});
// TODO: memory leak
go.run(goClassLeaking);
check("Go, 1.23.1, TinyGo 0.33.0 GC=leaking (Class)", () => {
  countup.countColors(data);
});
// // TODO: not work
// go.run(goClassConservative);
// check("Go, 1.23.1, TinyGo 0.33.0 GC=conservative (Class)", () => {
//   countup.countColors(data);
// });
// TODO: memory leak
go.run(goClassPrecise);
check("Go, 1.23.1, TinyGo 0.33.0 GC=precise (Class)", () => {
  countup.countColors(data);
});
check("C, emscripten 3.1.67 (Simple)", () => {
  const dataPtr = cSimple._malloc(data.length);
  cSimple.HEAPU8.set(data, dataPtr);
  const resultPtr = cSimple._countColors(dataPtr, data.length);
  new Uint32Array(cSimple.HEAPU32.buffer, resultPtr, 16777216);
  cSimple._free(dataPtr);
  cSimple._free(resultPtr);
});
check("C, emscripten 3.1.67 (Struct)", () => {
  const dataPtr = createStruct(cStruct, data);
  const resultPtr = cStruct._countColors(dataPtr);
  createTypedArray(cStruct, resultPtr, Uint32Array);
  freeStruct(cStruct, dataPtr);
  freeStruct(cStruct, resultPtr);
});
check("C++, emscripten 3.1.67 (Simple)", () => {
  const dataPtr = cppSimple._malloc(data.length);
  cppSimple.HEAPU8.set(data, dataPtr);
  const resultPtr = cppSimple._countColors(dataPtr, data.length);
  new Uint32Array(cppSimple.HEAPU32.buffer, resultPtr, 16777216);
  cppSimple._free(dataPtr);
  cppSimple._free(resultPtr);
});
check("C++, emscripten 3.1.67 (Class)", () => {
  cppClass.countColors(data);
});
