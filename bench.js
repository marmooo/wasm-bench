import { countColors as countColorsJs } from "./js/countup.js";
import { countColors as countColorsAsWrap } from "./as-wrap/countup.js";
import { countColors as countColorsAsShift } from "./as-shift/countup.js";
import { countColors as countColorsAsDataView } from "./as-dataview/countup.js";
import initRust, {
  count_colors as countColorsRust,
} from "./rust/pkg/countup.js";
import "@kitsonk/xhr";
import initC from "./c/countup.js";
import { __collect as __collectWrap } from "./as-wrap/countup.js";
import { __collect as __collectShift } from "./as-shift/countup.js";
import { __collect as __collectDataView } from "./as-dataview/countup.js";

await initRust();
const c = await initC();

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
Deno.bench("C, emscripten 3.1.67", () => {
  const dataPtr = c._malloc(data.length);
  c.HEAPU8.set(data, dataPtr);
  const resultPtr = c._countColors(dataPtr, data.length);
  new Uint32Array(c.HEAPU32.buffer, resultPtr, 16777216);
  c._free(dataPtr);
  c._free(resultPtr);
});
