///<reference path="../lib.deno.d.ts" />

import * as fs from "fs/promises";

export const readLink: typeof Deno.readLink = fs.readlink;
