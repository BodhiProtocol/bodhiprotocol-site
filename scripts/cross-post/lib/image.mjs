import fs from "node:fs";
import path from "node:path";

const MIME_BY_EXT = { jpg: "jpeg", jpeg: "jpeg", png: "png", gif: "gif", webp: "webp", svg: "svg+xml" };

/** Resolves an image argument (URL or local path) to something an <img src> can always load. */
export function resolveImageSrc(pathOrUrl) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;

  if (!fs.existsSync(pathOrUrl)) {
    throw new Error(`Image not found: ${pathOrUrl}`);
  }
  const ext = path.extname(pathOrUrl).slice(1).toLowerCase();
  const mime = MIME_BY_EXT[ext] || "png";
  const buffer = fs.readFileSync(pathOrUrl);
  return `data:image/${mime};base64,${buffer.toString("base64")}`;
}
