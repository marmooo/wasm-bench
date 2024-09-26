import { countColors as countColorsJs } from "./js/countup.js";
import { countColors as countColorsAsWrap } from "./as-wrap/countup.js";
import { countColors as countColorsAsShift } from "./as-shift/countup.js";
import { countColors as countColorsAsDataView } from "./as-dataview/countup.js";
import initRust, {
  count_colors as countColorsRust,
} from "./rust/pkg/countup.js";
import "./go/wasm_exec.js";
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

await initRust();
const cSimple = await initCSimple();
const cStruct = await initCStruct();
const cppSimple = await initCppSimple();
const cppClass = await initCppClass();

const go = new Go();
const goConservative = await initGoInstance("./go/countup-conservative.wasm");
const goLeaking = await initGoInstance("./go/countup-leaking.wasm");
const goPrecise = await initGoInstance("./go/countup-precise.wasm");

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
check("AssemblyScript 0.27.29 (Wrap)", () => {
  countColorsAsWrap(data);
  __collectWrap(); // --runtime minimal --exportRuntime
});
check("AssemblyScript 0.27.29 (Shift)", () => {
  countColorsAsShift(data);
  __collectShift(); // --runtime minimal --exportRuntime
});
check("AssemblyScript 0.27.29 (DataView)", () => {
  countColorsAsDataView(data);
  __collectDataView(); // --runtime minimal --exportRuntime
});
check("Rust 1.81.0, wasm-bindgen 0.2.93", () => {
  countColorsRust(data);
});
check("Go, 1.23.1, TinyGo 0.33.0 GC=conservative", () => {
  go.run(goConservative);
  const { countColors, malloc, memory } = goConservative.exports;
  const dataPtr = malloc(data.length);
  const copiedData = new Uint8Array(memory.buffer, dataPtr, data.length);
  copiedData.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  new Uint32Array(memory.buffer, resultPtr, 16777216);
});
check("Go, 1.23.1, TinyGo 0.33.0 GC=leaking", () => {
  go.run(goLeaking);
  const { countColors, malloc, memory } = goLeaking.exports;
  const dataPtr = malloc(data.length);
  const copiedData = new Uint8Array(memory.buffer, dataPtr, data.length);
  copiedData.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  new Uint32Array(memory.buffer, resultPtr, 16777216);
});
check("Go, 1.23.1, TinyGo 0.33.0 GC=precise", () => {
  go.run(goPrecise);
  const { countColors, malloc, memory } = goPrecise.exports;
  const dataPtr = malloc(data.length);
  const copiedData = new Uint8Array(memory.buffer, dataPtr, data.length);
  copiedData.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  new Uint32Array(memory.buffer, resultPtr, 16777216);
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
