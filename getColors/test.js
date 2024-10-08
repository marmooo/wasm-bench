import { getColors as getColorsJs } from "./js/color.js";
import { getColors as getColorsAsNumber } from "./as-number/color.js";
import { getColors as getColorsAsClass } from "./as-class/color.js";
import initRustSimple, {
  get_colors as get_colors_simple,
} from "./rust-simple/pkg/color.js";
import initRustSerde, {
  get_colors as get_colors_serde,
} from "./rust-serde/pkg/color.js";
import { __collect as __collectNumber } from "./as-number/color.js";
import { __collect as __collectClass } from "./as-class/color.js";
import "@kitsonk/xhr";
import initCpp from "./cpp/color.js";
import { assertEquals } from "@std/assert";

const data = new Uint8Array(2 ** 21);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}
const colorsJs = getColorsJs(data);

await initRustSimple();
await initRustSerde();
const cpp = await initCpp();

Deno.test("AssemblyScript 0.27.30 (Number)", () => {
  const colorsAs = getColorsAsNumber(data);
  assertEquals(colorsJs.length, colorsAs.length);
  for (let i = 0; i < colorsJs.length; i++) {
    for (let j = 0; j < colorsJs[i].length; j++) {
      assertEquals(colorsJs[i][j], colorsAs[i][j]);
    }
  }
  __collectNumber(); // --runtime minimal --exportRuntime
});
Deno.test("AssemblyScript 0.27.30 (Class)", () => {
  const colorsAs = getColorsAsClass(data);
  assertEquals(colorsJs.length, colorsAs.length);
  for (let i = 0; i < colorsJs.length; i++) {
    for (let j = 0; j < colorsJs[i].length; j++) {
      assertEquals(colorsJs[i][j], colorsAs[i][j]);
    }
  }
  __collectClass(); // --runtime minimal --exportRuntime
});
Deno.test("Rust 1.81.0, wasm-bindgen 0.2.93 (Simple)", () => {
  const colorsRust = get_colors_simple(data);
  assertEquals(colorsJs.length, colorsRust.length);
  for (let i = 0; i < colorsJs.length; i++) {
    assertEquals(colorsJs[i][0], colorsRust[i].r);
    assertEquals(colorsJs[i][1], colorsRust[i].g);
    assertEquals(colorsJs[i][2], colorsRust[i].b);
    assertEquals(colorsJs[i][3], colorsRust[i].total);
  }
});
Deno.test("Rust 1.81.0, wasm-bindgen 0.2.93 (Serde)", () => {
  const colorsRust = get_colors_serde(data);
  assertEquals(colorsJs.length, colorsRust.length);
  for (let i = 0; i < colorsJs.length; i++) {
    assertEquals(colorsJs[i][0], colorsRust[i].r);
    assertEquals(colorsJs[i][1], colorsRust[i].g);
    assertEquals(colorsJs[i][2], colorsRust[i].b);
    assertEquals(colorsJs[i][3], colorsRust[i].total);
  }
});
Deno.test("C++, emscripten 3.1.68", () => {
  const colorsCpp = cpp.getColors(data);
  assertEquals(colorsJs.length, colorsCpp.length);
  for (let i = 0; i < colorsJs.length; i++) {
    assertEquals(colorsJs[i][0], colorsCpp[i][0]);
    assertEquals(colorsJs[i][1], colorsCpp[i][1]);
    assertEquals(colorsJs[i][2], colorsCpp[i][2]);
    assertEquals(colorsJs[i][3], colorsCpp[i][3]);
  }
});
