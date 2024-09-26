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
import { createStruct, createTypedArray } from "./c-struct/util.js";
import { __collect as __collectWrap } from "./as-wrap/countup.js";
import { __collect as __collectShift } from "./as-shift/countup.js";
import { __collect as __collectDataView } from "./as-dataview/countup.js";
import { assertEquals } from "@std/assert";

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

const data = new Uint8Array(16777216);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}
const countJs = countColorsJs(data);

Deno.test("AssemblyScript 0.27.29 (Wrap)", () => {
  const countAs = countColorsAsWrap(data);
  assertEquals(countJs.length, countAs.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countAs[i]);
  }
  __collectWrap(); // --runtime minimal --exportRuntime
});
Deno.test("AssemblyScript 0.27.29 (Shift)", () => {
  const countAs = countColorsAsShift(data);
  assertEquals(countJs.length, countAs.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countAs[i]);
  }
  __collectShift(); // --runtime minimal --exportRuntime
});
Deno.test("AssemblyScript 0.27.29 (DataView)", () => {
  const countAs = countColorsAsDataView(data);
  assertEquals(countJs.length, countAs.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countAs[i]);
  }
  __collectDataView(); // --runtime minimal --exportRuntime
});
Deno.test("Rust 1.81.0, wasm-bindgen 0.2.93", () => {
  const countRust = countColorsRust(data);
  assertEquals(countJs.length, countRust.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countRust[i]);
  }
});
Deno.test("Go, 1.23.1, TinyGo 0.33.0 GC=conservative", () => {
  go.run(goConservative);
  const { countColors, malloc, memory } = goConservative.exports;
  const dataPtr = malloc(data.length);
  const copied = new Uint8Array(memory.buffer, dataPtr, data.length);
  copied.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  const countGo = new Uint32Array(memory.buffer, resultPtr, 16777216);
  assertEquals(countJs.length, countGo.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countGo[i]);
  }
});
Deno.test("Go, 1.23.1, TinyGo 0.33.0 GC=leaking", () => {
  go.run(goLeaking);
  const { countColors, malloc, memory } = goLeaking.exports;
  const dataPtr = malloc(data.length);
  const copied = new Uint8Array(memory.buffer, dataPtr, data.length);
  copied.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  const countGo = new Uint32Array(memory.buffer, resultPtr, 16777216);
  assertEquals(countJs.length, countGo.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countGo[i]);
  }
});
Deno.test("Go, 1.23.1, TinyGo 0.33.0 GC=precise", () => {
  go.run(goPrecise);
  const { countColors, malloc, memory } = goPrecise.exports;
  const dataPtr = malloc(data.length);
  const copied = new Uint8Array(memory.buffer, dataPtr, data.length);
  copied.set(data);
  const resultPtr = countColors(dataPtr, data.length);
  const countGo = new Uint32Array(memory.buffer, resultPtr, 16777216);
  assertEquals(countJs.length, countGo.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countGo[i]);
  }
});
Deno.test("C, emscripten 3.1.67 (Simple)", () => {
  const dataPtr = cSimple._malloc(data.length);
  cSimple.HEAPU8.set(data, dataPtr);
  const resultPtr = cSimple._countColors(dataPtr, data.length);
  const countC = new Uint32Array(cSimple.HEAPU32.buffer, resultPtr, 16777216);
  assertEquals(countJs.length, countC.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countC[i]);
  }
  cSimple._free(dataPtr);
  cSimple._free(resultPtr);
});
Deno.test("C, emscripten 3.1.67 (Struct)", () => {
  const dataPtr = createStruct(cStruct, data);
  const resultPtr = cStruct._countColors(dataPtr);
  const colorCountPtr = cStruct.HEAP32[resultPtr / 4];
  const countC = createTypedArray(cStruct, resultPtr, Uint32Array);
  assertEquals(countJs.length, countC.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countC[i]);
  }
  cStruct._free(dataPtr);
  cStruct._free(resultPtr);
  cStruct._free(colorCountPtr);
});
Deno.test("C++, emscripten 3.1.67 (Simple)", () => {
  const dataPtr = cppSimple._malloc(data.length);
  cppSimple.HEAPU8.set(data, dataPtr);
  const resultPtr = cppSimple._countColors(dataPtr, data.length);
  const countCpp = new Uint32Array(
    cppSimple.HEAPU32.buffer,
    resultPtr,
    16777216,
  );
  assertEquals(countJs.length, countCpp.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countCpp[i]);
  }
  cppSimple._free(dataPtr);
  cppSimple._free(resultPtr);
});
Deno.test("C++, emscripten 3.1.67 (Class)", () => {
  const countCpp = cppClass.countColors(data);
  assertEquals(countJs.length, countCpp.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countCpp[i]);
  }
});
