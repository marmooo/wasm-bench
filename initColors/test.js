import { Quantizer as QuantizerJs } from "./js/init.js";
import {
  __collect as __collectAs,
  getBitCount as getBitCountAs,
  getColorCount as getColorCountAs,
  Quantizer as QuantizerAs,
} from "./as/init.js";
import initRust, { Quantizer as QuantizerRust } from "./rust/pkg/color.js";
import "@kitsonk/xhr";
import initCpp from "./cpp/init.js";
import { assertEquals } from "@std/assert";

const data = new Uint8Array(1024 * 1024);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}
const quantizerJs = new QuantizerJs(data, 1024, 1024);

await initRust();
const cpp = await initCpp();

Deno.test("AssemblyScript 0.27.30", () => {
  const quantizer = QuantizerAs(data, 1024, 1024);
  assertEquals(quantizerJs.getBitCount(), getBitCountAs(quantizer));
  assertEquals(quantizerJs.getColorCount(), getColorCountAs(quantizer));
  __collectAs(); // --runtime minimal --exportRuntime
});
Deno.test("Rust 1.81.0, wasm-bindgen 0.2.93", () => {
  const quantizer = new QuantizerRust(data, 1024, 1024);
  assertEquals(quantizerJs.getBitCount(), quantizer.get_bit_count());
  assertEquals(quantizerJs.getColorCount(), quantizer.get_color_count());
});
Deno.test("C++, emscripten 3.1.68", () => {
  const quantizer = new cpp.Quantizer(data, 1024, 1024);
  assertEquals(quantizerJs.getBitCount(), quantizer.getBitCount());
  assertEquals(quantizerJs.getColorCount(), quantizer.getColorCount());
});
