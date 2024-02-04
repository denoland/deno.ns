///<reference path="../lib.deno.d.ts" />

import { tmpdir } from "os";
import { join } from "path";
import { randomId } from "../../internal/random_id.js";
import { writeTextFile } from "./writeTextFile.js";

export const makeTempFile: typeof Deno.makeTempFile =
  async function makeTempFile(
    { prefix = "" } = {},
  ) {
    const name = join(tmpdir(), prefix, randomId());
    await writeTextFile(name, "");
    return name;
  };
