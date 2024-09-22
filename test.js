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
import { assertEquals } from "@std/assert";

await initRust();
const c = await initC();

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
Deno.test("C, emscripten 3.1.67", () => {
  const dataPtr = c._malloc(data.length);
  c.HEAPU8.set(data, dataPtr);
  const resultPtr = c._countColors(dataPtr, data.length);
  const countC = new Uint32Array(c.HEAPU32.buffer, resultPtr, 16777216);
  assertEquals(countJs.length, countC.length);
  for (let i = 0; i < countJs.length; i++) {
    assertEquals(countJs[i], countC[i]);
  }
  c._free(dataPtr);
  c._free(resultPtr);
});
