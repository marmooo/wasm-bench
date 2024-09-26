import { getColors as getColorsJs } from "./js/color.js";
import { getColors as getColorsNumber } from "./as-number/color.js";
import { getColors as getColorsClass } from "./as-class/color.js";
import { __collect as __collectNumber } from "./as-number/color.js";
import { __collect as __collectClass } from "./as-class/color.js";

const data = new Uint8Array(2097152);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}

Deno.bench("JavaScript, Deno 1.46.3", () => {
  getColorsJs(data);
});
Deno.bench("AssemblyScript 0.27.29 (Number)", () => {
  getColorsNumber(data);
  __collectNumber(); // --runtime minimal --exportRuntime
});
Deno.bench("AssemblyScript 0.27.29 (Class)", () => {
  getColorsClass(data);
  __collectClass(); // --runtime minimal --exportRuntime
});
