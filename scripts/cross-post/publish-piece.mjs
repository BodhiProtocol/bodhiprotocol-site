#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

import { loadEssay, toAbsoluteLinks } from "./lib/parse-essay.mjs";
import { loadGreatMind } from "./lib/parse-great-mind.mjs";
import { getMediumUserId, uploadMediumImage, createMediumDraft, buildMediumHtml } from "./lib/medium.mjs";
import { buildSubstackHtml } from "./lib/substack.mjs";
import { resolveImageSrc } from "./lib/image.mjs";

const SITE_URL = (process.env.CROSSPOST_SITE_URL || "https://bodhiprotocol.com").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), ".crosspost-output");

// Slug is looked up in each directory in turn -- first match wins.
const CONTENT_TYPES = [
  { urlSegment: "essays", dir: "content/essays", load: loadEssay },
  { urlSegment: "great-minds", dir: "content/great-minds", load: loadGreatMind },
];

function resolvePiece(slug) {
  for (const type of CONTENT_TYPES) {
    if (fs.existsSync(path.join(process.cwd(), type.dir, `${slug}.mdx`))) {
      return { piece: type.load(slug), urlSegment: type.urlSegment };
    }
  }
  throw new Error(
    `No content found for slug "${slug}" in ${CONTENT_TYPES.map((t) => t.dir).join(" or ")}.`,
  );
}

const USAGE = `Usage: node scripts/cross-post/publish-piece.mjs <slug> [options]

Looks up <slug> in content/essays/ and content/great-minds/ (first match wins).
For a Great Minds entry, only its flowing-prose body is cross-posted -- the
wheel/timeline/diagram data that drives the interactive page is left out.

Options:
  --medium-image <path-or-url>     Cover image for Medium (defaults to the essay's OG image)
  --substack-image <path-or-url>   Cover image for Substack (defaults to the essay's OG image)
  --medium-only                    Skip Substack
  --substack-only                  Skip Medium
  --dry-run                        Force the Medium paste-ready file even if a working
                                    MEDIUM_INTEGRATION_TOKEN is set (for testing)

Substack has no API of its own, so it always gets a paste-ready HTML file.
Medium creates a real draft via its API only if MEDIUM_INTEGRATION_TOKEN is
set and valid (Medium stopped issuing new tokens in 2025 — most accounts
won't have one, and get a paste-ready file too). See env.example.`;

function parseArgs(argv) {
  if (argv.length === 0 || argv[0] === "--help" || argv[0] === "-h") {
    console.log(USAGE);
    process.exit(argv.length === 0 ? 1 : 0);
  }

  const [slug, ...rest] = argv;
  const opts = { slug, dryRun: false, skipMedium: false, skipSubstack: false };

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--medium-only") opts.skipSubstack = true;
    else if (arg === "--substack-only") opts.skipMedium = true;
    else if (arg === "--medium-image") opts.mediumImage = rest[++i];
    else if (arg === "--substack-image") opts.substackImage = rest[++i];
    else {
      console.error(`Unknown argument: ${arg}\n`);
      console.log(USAGE);
      process.exit(1);
    }
  }
  return opts;
}

async function publishToMedium(piece, { markdown, canonicalUrl, mediumImage, dryRun }) {
  console.log("\n— Medium —");
  const token = process.env.MEDIUM_INTEGRATION_TOKEN;

  if (dryRun || !token) {
    if (!dryRun) {
      console.warn(
        "No MEDIUM_INTEGRATION_TOKEN — Medium stopped issuing new ones in 2025, so this is " +
          "expected for most accounts. Writing a paste-ready file instead.",
      );
    }
    const html = buildMediumHtml(
      piece.frontmatter.title,
      markdown,
      resolveImageSrc(mediumImage),
      canonicalUrl,
      piece.frontmatter.tags || [],
    );
    const outFile = path.join(OUT_DIR, `${piece.slug}.medium.html`);
    fs.writeFileSync(outFile, html);
    console.log(`Wrote ${path.relative(process.cwd(), outFile)}`);
    console.log("Open it in a browser, select all, copy, and paste into a new Medium story.");
    return;
  }

  const userId = process.env.MEDIUM_USER_ID || (await getMediumUserId(token));
  const imageUrl = await uploadMediumImage(token, mediumImage);
  const content = `![${piece.frontmatter.title}](${imageUrl})\n\n${markdown}`;

  const draft = await createMediumDraft(token, userId, {
    title: piece.frontmatter.title,
    markdown: content,
    canonicalUrl,
    tags: piece.frontmatter.tags || [],
  });
  console.log(`Medium draft created: ${draft.url}`);
  console.log("(It's a draft — review and hit Publish on Medium when ready.)");
}

async function publishToSubstack(piece, { markdown, canonicalUrl, substackImage }) {
  // Substack has no public API and no post-by-email feature — manual paste
  // into its editor is the only path there is, for anyone's account.
  console.log("\n— Substack —");
  const html = buildSubstackHtml(piece.frontmatter.title, markdown, resolveImageSrc(substackImage), canonicalUrl);

  const outFile = path.join(OUT_DIR, `${piece.slug}.substack.html`);
  fs.writeFileSync(outFile, html);
  console.log(`Wrote ${path.relative(process.cwd(), outFile)}`);
  console.log("Open it in a browser, select all, copy, and paste into a new Substack post.");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const { piece, urlSegment } = resolvePiece(opts.slug);
  console.log(`Found "${piece.frontmatter.title}" in content/${urlSegment}/`);

  const canonicalUrl = `${SITE_URL}/${urlSegment}/${piece.slug}`;
  const defaultImage = `${SITE_URL}/${urlSegment}/${piece.slug}/opengraph-image`;
  const mediumImage = opts.mediumImage || defaultImage;
  const substackImage = opts.substackImage || defaultImage;
  const markdown = toAbsoluteLinks(piece.body, SITE_URL);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  if (!opts.skipMedium) {
    await publishToMedium(piece, { markdown, canonicalUrl, mediumImage, dryRun: opts.dryRun });
  }
  if (!opts.skipSubstack) {
    await publishToSubstack(piece, { markdown, canonicalUrl, substackImage });
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
