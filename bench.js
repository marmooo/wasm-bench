import { countColors as countColorsJs } from "./js/countup.js";
import { countColors as countColorsAsWrap } from "./as-wrap/countup.js";
import { countColors as countColorsAsShift } from "./as-shift/countup.js";
import { countColors as countColorsAsDataView } from "./as-dataview/countup.js";
import initRust, {
  count_colors as countColorsRust,
} from "./rust/pkg/countup.js";
import "@kitsonk/xhr";
import initCSimple from "./c-simple/countup.js";
import initCStruct from "./c-struct/countup.js";
import initCpp from "./cpp/countup.js";
import { createStruct, createTypedArray } from "./c-struct/util.js";
import { __collect as __collectWrap } from "./as-wrap/countup.js";
import { __collect as __collectShift } from "./as-shift/countup.js";
import { __collect as __collectDataView } from "./as-dataview/countup.js";

await initRust();
const cSimple = await initCSimple();
const cStruct = await initCStruct();
const cpp = await initCpp();

const data = new Uint8Array(16777216);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}

Deno.bench("JavaScript, Deno 1.46.3", () => {
  countColorsJs(data);
});
Deno.bench("AssemblyScript 0.27.29 (Wrap)", () => {
  countColorsAsWrap(data);
  __collectWrap(); // --runtime minimal --exportRuntime
});
Deno.bench("AssemblyScript 0.27.29 (Shift)", () => {
  countColorsAsShift(data);
  __collectShift(); // --runtime minimal --exportRuntime
});
Deno.bench("AssemblyScript 0.27.29 (DataView)", () => {
  countColorsAsDataView(data);
  __collectDataView(); // --runtime minimal --exportRuntime
});
Deno.bench("Rust 1.81.0, wasm-bindgen 0.2.93", () => {
  countColorsRust(data);
});
Deno.bench("C, emscripten 3.1.67 (Simple)", () => {
  const dataPtr = cSimple._malloc(data.length);
  cSimple.HEAPU8.set(data, dataPtr);
  const resultPtr = cSimple._countColors(dataPtr, data.length);
  new Uint32Array(cSimple.HEAPU32.buffer, resultPtr, 16777216);
  cSimple._free(dataPtr);
  cSimple._free(resultPtr);
});
Deno.bench("C, emscripten 3.1.67 (Struct)", () => {
  const dataPtr = createStruct(cStruct, data);
  const resultPtr = cStruct._countColors(dataPtr);
  const colorCountPtr = cStruct.HEAP32[resultPtr / 4];
  createTypedArray(cStruct, resultPtr);
  cStruct._free(dataPtr);
  cStruct._free(resultPtr);
  cStruct._free(colorCountPtr);
});
Deno.bench("C++, emscripten 3.1.67", () => {
  const dataPtr = cpp._malloc(data.length);
  cpp.HEAPU8.set(data, dataPtr);
  const resultPtr = cpp._countColors(dataPtr, data.length);
  new Uint32Array(cpp.HEAPU32.buffer, resultPtr, 16777216);
  cpp._free(dataPtr);
  cpp._free(resultPtr);
});
