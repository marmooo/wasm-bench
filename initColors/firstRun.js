import { Quantizer as QuantizerJs } from "./js/init.js";
import {
  __collect as __collectAs,
  Quantizer as QuantizerAs,
} from "./as/init.js";
import initRust, { Quantizer as QuantizerRust } from "./rust/pkg/init.js";
import "@kitsonk/xhr";
import initCpp from "./cpp/init.js";

function check(name, callback) {
  console.time(name);
  callback();
  console.timeEnd(name);
}

const data = new Uint8Array(1024 * 1024);
for (let i = 0; i < data.length; i++) {
  data[i] = Math.floor(Math.random() * 256);
}

await initRust();
const cpp = await initCpp();

check("JavaScript, Deno 1.46.3", () => {
  new QuantizerJs(data, 1024, 1024);
});
check("AssemblyScript 0.27.30", () => {
  QuantizerAs(data, 1024, 1024);
  __collectAs(); // --runtime minimal --exportRuntime
});
check("Rust 1.81.0, wasm-bindgen 0.2.93", () => {
  new QuantizerRust(data, 1024, 1024);
});
check("C++, emscripten 3.1.68", () => {
  new cpp.Quantizer(data, 1024, 1024);
});
