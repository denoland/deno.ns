import { readSync } from "fs";

export function readlineSync() {
  let line = "";
  let char = "";
  const buf = Buffer.alloc(1);
  while (char !== "\r" && char !== "\n") {
    line += char;
    try {
      const bytesRead = readSync(process.stdin.fd, buf, 0, 1, 0);
      if (bytesRead === 0) {
        return line;
      }
    } catch (err: any) {
      if (err.code === "EOF") {
        return line;
      }
      continue;
    }
    char = String(buf);
  }
  if (char === "\r") {
    readSync(process.stdin.fd, buf, 0, 1, 0);
  }
  return line;
}
