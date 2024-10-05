import { getColors as getColorsJs } from "./js/color.js";
import { getColors as getColorsNumber } from "./as-number/color.js";
import { getColors as getColorsClass } from "./as-class/color.js";
import { __collect as __collectNumber } from "./as-number/color.js";
import { __collect as __collectClass } from "./as-class/color.js";

function check(name, callback) {
  console.time(name);
  callback();
  console.timeEnd(name);
}

const data = new Uint8Array(2 ** 21);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}

check("JavaScript, Deno 1.46.3", () => {
  getColorsJs(data);
});
check("AssemblyScript 0.27.30 (Number)", () => {
  getColorsNumber(data);
  __collectNumber(); // --runtime minimal --exportRuntime
});
check("AssemblyScript 0.27.30 (Class)", () => {
  getColorsClass(data);
  __collectClass(); // --runtime minimal --exportRuntime
});
