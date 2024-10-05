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
import { assertEquals } from "@std/assert";

const data = new Uint8Array(16777216);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}
const colorsJs = getColorsJs(data);

await initRustSimple();
await initRustSerde();

Deno.test("AssemblyScript 0.27.29 (Number)", () => {
  const colorsAs = getColorsAsNumber(data);
  assertEquals(colorsJs.length, colorsAs.length);
  for (let i = 0; i < colorsJs.length; i++) {
    for (let j = 0; j < colorsJs[i].length; j++) {
      assertEquals(colorsJs[i][j], colorsAs[i][j]);
    }
  }
  __collectNumber(); // --runtime minimal --exportRuntime
});
Deno.test("AssemblyScript 0.27.29 (Class)", () => {
  const colorsAs = getColorsAsClass(data);
  assertEquals(colorsJs.length, colorsAs.length);
  // for (let i = 0; i < colorsJs.length; i++) {
  //   assertEquals(colorsJs[i][0], colorsAs[i].r);
  //   assertEquals(colorsJs[i][1], colorsAs[i].g);
  //   assertEquals(colorsJs[i][2], colorsAs[i].b);
  //   assertEquals(colorsJs[i][3], colorsAs[i].total);
  // }
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
