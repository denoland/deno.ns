///<reference path="../lib.deno.d.ts" />

import { fdatasync as nodefdatasync } from "fs";
import { promisify } from "util";

const _fdatasync = promisify(nodefdatasync);

export const fdatasync: typeof Deno.fdatasync = _fdatasync;
