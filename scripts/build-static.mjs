// Builds the site as plain files in out/ for a static host (Cloudflare Pages).
//
// Next's static export refuses to build server-only code, so the admin area,
// the /api routes and middleware are moved aside for the duration of the build
// and always put back afterwards. The normal `npm run build` (Vercel) is untouched.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";

const SERVER_ONLY = ["app/api", "app/admin", "middleware.ts"];
const STASH = ".static-export-stash";

const moved = [];
mkdirSync(STASH, { recursive: true });
let status = 1;
try {
  for (const path of SERVER_ONLY) {
    if (!existsSync(path)) continue;
    const target = `${STASH}/${path.replaceAll("/", "__")}`;
    renameSync(path, target);
    moved.push([path, target]);
  }

  const result = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: {
      // Canonical/OG URLs must be absolute; Vercel supplies this via its own env vars.
      NEXT_PUBLIC_SITE_URL: "https://bodhiprotocol.com",
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_STATIC_EXPORT: "1",
    },
  });
  status = result.status ?? 1;
} finally {
  for (const [path, target] of moved) renameSync(target, path);
}

if (status === 0) {
  // Mirrors redirects() in next.config.ts, in Cloudflare Pages' _redirects format.
  writeFileSync(
    "out/_redirects",
    ["/labs /tools 301", "/navigator /lighthouse#suggested-path 301", ""].join("\n"),
  );
  // OG images are exported as extension-less `opengraph-image` files; without an
  // explicit type, link-preview bots (WhatsApp, LinkedIn) may refuse them.
  writeFileSync(
    "out/_headers",
    [
      "/opengraph-image",
      "  Content-Type: image/png",
      "/*/opengraph-image",
      "  Content-Type: image/png",
      "",
    ].join("\n"),
  );
}
process.exit(status);
