///<reference path="../lib.deno.d.ts" />

import { readFileSync as nodeReadFile } from "fs";
import mapError from "../../internal/errorMap.js";

export const readFileSync: typeof Deno.readFileSync = function readFileSync(
  path,
) {
  try {
    return new Uint8Array(nodeReadFile(path));
  } catch (e) {
    throw mapError(e);
  }
};
