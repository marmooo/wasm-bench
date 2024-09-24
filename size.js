import { expandGlob } from "@std/fs";

const cwd = Deno.cwd();
for await (const file of expandGlob("./**/*.wasm", { globStar: true })) {
  const fileInfo = await Deno.stat(file.path);
  console.log(file.path.slice(cwd.length + 1), fileInfo.size);
}
