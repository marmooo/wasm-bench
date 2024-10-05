import { getColors as getColorsJs } from "./js/color.js";
import { getColors as getColorsNumber } from "./as-number/color.js";
import { getColors as getColorsClass } from "./as-class/color.js";
import initRustSimple, {
  get_colors as get_colors_simple,
} from "./rust-simple/pkg/color.js";
import initRustSerde, {
  get_colors as get_colors_serde,
} from "./rust-serde/pkg/color.js";
import "@kitsonk/xhr";
import initCpp from "./cpp/color.js";
import { __collect as __collectNumber } from "./as-number/color.js";
import { __collect as __collectClass } from "./as-class/color.js";

const data = new Uint8Array(2 ** 21);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}

await initRustSimple();
await initRustSerde();
const cpp = await initCpp();

Deno.bench("JavaScript, Deno 1.46.3", () => {
  getColorsJs(data);
});
Deno.bench("AssemblyScript 0.27.30 (Number)", () => {
  getColorsNumber(data);
  __collectNumber(); // --runtime minimal --exportRuntime
});
Deno.bench("AssemblyScript 0.27.30 (Class)", () => {
  getColorsClass(data);
  __collectClass(); // --runtime minimal --exportRuntime
});
Deno.bench("Rust 1.81.0, wasm-bindgen 0.2.93 (Simple)", () => {
  get_colors_simple(data);
});
Deno.bench("Rust 1.81.0, wasm-bindgen 0.2.93 (Serde)", () => {
  get_colors_serde(data);
});
Deno.bench("C++, emscripten 3.1.68", () => {
  cpp.getColors(data);
});
