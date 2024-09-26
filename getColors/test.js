import { getColors as getColorsJs } from "./js/color.js";
import { getColors as getColorsAsNumber } from "./as-number/color.js";
import { getColors as getColorsAsClass } from "./as-class/color.js";
import { __collect as __collectNumber } from "./as-number/color.js";
import { __collect as __collectClass } from "./as-class/color.js";
import { assertEquals } from "@std/assert";

const data = new Uint8Array(16777216);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}
const colorsJs = getColorsJs(data);

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
  //   console.log(colorsJs[i][0], colorsAs[i].r);
  //   console.log(colorsJs[i][1], colorsAs[i].g);
  //   console.log(colorsJs[i][2], colorsAs[i].b);
  //   console.log(colorsJs[i][3], colorsAs[i].total);
  // }
  __collectClass(); // --runtime minimal --exportRuntime
});
