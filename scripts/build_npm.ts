import { build, emptyDir } from "https://deno.land/x/dnt@0.33.1/mod.ts";
import { copy } from "https://deno.land/std@0.178.0/fs/mod.ts";

await emptyDir("./npm");
await emptyDir("./npm/esm");

await copy("test_data", "npm/esm/test_data", { overwrite: true });

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: "dev",
    undici: true,
  },
  package: {
    name: "jsrwrap",
    version: Deno.args[0],
    description: "TypeScript API wrapper for Reddit",
    license: "MIT",
  },
  scriptModule: false,
});

await Deno.writeTextFile("npm/.npmignore", "esm/test_data/", {
  append: true,
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
