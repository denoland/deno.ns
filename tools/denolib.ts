if (!Deno.version.deno.startsWith("1.16")) {
  console.error("Wrong Deno version: " + Deno.version.deno);
  Deno.exit(1);
}

const stableTypes = await run("deno types");
const unstableTypes = (await run("deno types --unstable"))
  .replace(stableTypes, "")
  .trimStart();
const version = (await run("deno --version")).trim().split("\n").map((line) =>
  line.split(" ")
).reduce(
  (acc, curr) => ({ ...acc, [curr[0]]: curr[1] }),
  {} as { [k: string]: string },
);

await Deno.writeTextFile(
  "src/deno/internal/version.ts",
  [
    `export const deno = "${version.deno}";\n`,
    `export const typescript = "${version.typescript}";\n`,
  ].join(""),
);

await Deno.writeTextFile(
  "src/deno/stable/lib.deno.d.ts",
  processDeclarationFileText(stableTypes),
);
await Deno.writeTextFile(
  "src/deno/unstable/lib.deno.unstable.d.ts",
  processDeclarationFileText(unstableTypes),
);

async function run(cmd: string) {
  return new TextDecoder().decode(
    await Deno.run({
      cmd: cmd.split(" "),
      stdout: "piped",
    }).output(),
  );
}

function processDeclarationFileText(text: string) {
  return text.replace('/// <reference lib="deno.net" />\n', "").replace(
    `/** A controller object that allows you to abort one or more DOM requests as and
 * when desired. */
declare class AbortController {
  /** Returns the AbortSignal object associated with this object. */
  readonly signal: AbortSignal;
  /** Invoking this method will set this object's AbortSignal's aborted flag and
   * signal to any observers that the associated activity is to be aborted. */
  abort(): void;
}

`,
    "",
  ).replace(
    `/// <reference lib="deno.ns" />`,
    `/// <reference path="../stable/lib.deno.d.ts" />`,
  );
}
