// based on https://github.com/node-fetch/fetch-blob/blob/46476faf498dec035ab91b5a2d0fccd279629bce/streams.cjs

/* c8 ignore start */
// 64 KiB (same size chrome slice theirs blob into Uint8array's)
const POOL_SIZE = 65536;

try {
  if (!globalThis.ReadableStream) {
    Object.assign(globalThis, require("stream/web"));
  }
  const { Blob } = require("buffer");
  if (Blob && !Blob.prototype.stream) {
    Blob.prototype.stream = function name() {
      let position = 0;
      //deno-lint-ignore no-this-alias
      const blob = this;

      return new ReadableStream({
        type: "bytes",
        async pull(ctrl) {
          const chunk = blob.slice(
            position,
            Math.min(blob.size, position + POOL_SIZE),
          );
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));

          if (position === blob.size) {
            ctrl.close();
          }
        },
      });
    };
  }
} catch {
  // ignore failures
}
/* c8 ignore end */
