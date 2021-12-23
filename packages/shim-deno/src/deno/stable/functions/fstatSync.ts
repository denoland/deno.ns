///<reference path="../lib.deno.d.ts" />

import { fstatSync as nodeFstatSync } from "fs";
import { denoifyFileInfo } from "./stat.js";

export const fstatSync: typeof Deno.fstatSync = function fstatSync(fd) {
  return denoifyFileInfo(nodeFstatSync(fd));
};
