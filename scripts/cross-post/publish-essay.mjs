#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

import { loadEssay, toAbsoluteLinks } from "./lib/parse-essay.mjs";
import { getMediumUserId, uploadMediumImage, createMediumDraft } from "./lib/medium.mjs";
import { buildSubstackHtml, sendSubstackDraft } from "./lib/substack.mjs";

const SITE_URL = (process.env.CROSSPOST_SITE_URL || "https://bodhiprotocol.com").replace(/\/$/, "");
const OUT_DIR = path.join(process.cwd(), ".crosspost-output");

const USAGE = `Usage: node scripts/cross-post/publish-essay.mjs <slug> [options]

Options:
  --medium-image <path-or-url>     Cover image for Medium (defaults to the essay's OG image)
  --substack-image <path-or-url>   Cover image for Substack (defaults to the essay's OG image)
  --medium-only                    Skip Substack
  --substack-only                  Skip Medium
  --dry-run                        Never call Medium/Substack — just write the generated
                                    payload/email to .crosspost-output/ for review

With no credentials configured, the script runs as if --dry-run were passed.
See scripts/cross-post/env.example for the environment variables it needs.`;

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

async function publishToMedium(essay, { markdown, canonicalUrl, mediumImage, dryRun }) {
  console.log("\n— Medium —");
  const token = process.env.MEDIUM_INTEGRATION_TOKEN;

  if (dryRun || !token) {
    if (!dryRun) console.warn("MEDIUM_INTEGRATION_TOKEN not set — falling back to dry run.");
    const preview = {
      title: essay.frontmatter.title,
      contentFormat: "markdown",
      canonicalUrl,
      tags: (essay.frontmatter.tags || []).slice(0, 5),
      coverImage: mediumImage,
      content: `![${essay.frontmatter.title}](${mediumImage})\n\n${markdown}`,
      publishStatus: "draft",
    };
    const outFile = path.join(OUT_DIR, `${essay.slug}.medium.json`);
    fs.writeFileSync(outFile, JSON.stringify(preview, null, 2));
    console.log(`Dry run — wrote Medium payload to ${path.relative(process.cwd(), outFile)}`);
    return;
  }

  const userId = process.env.MEDIUM_USER_ID || (await getMediumUserId(token));
  const imageUrl = await uploadMediumImage(token, mediumImage);
  const content = `![${essay.frontmatter.title}](${imageUrl})\n\n${markdown}`;

  const draft = await createMediumDraft(token, userId, {
    title: essay.frontmatter.title,
    markdown: content,
    canonicalUrl,
    tags: essay.frontmatter.tags || [],
  });
  console.log(`Medium draft created: ${draft.url}`);
  console.log("(It's a draft — review and hit Publish on Medium when ready.)");
}

async function publishToSubstack(essay, { markdown, canonicalUrl, substackImage, dryRun }) {
  console.log("\n— Substack —");
  const hasSmtpConfig =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SUBSTACK_POST_EMAIL;

  const isUrlImage = /^https?:\/\//.test(substackImage);
  const imgSrcForHtml = isUrlImage ? substackImage : "cid:cover-image";
  const html = buildSubstackHtml(essay.frontmatter.title, markdown, imgSrcForHtml, canonicalUrl);

  if (dryRun || !hasSmtpConfig) {
    if (!dryRun) console.warn("SMTP / SUBSTACK_POST_EMAIL not set — falling back to dry run.");
    const outFile = path.join(OUT_DIR, `${essay.slug}.substack.html`);
    fs.writeFileSync(outFile, html);
    console.log(`Dry run — wrote Substack email body to ${path.relative(process.cwd(), outFile)}`);
    if (!isUrlImage) {
      console.log(
        `(Preview references a local image via cid: — that only resolves once actually emailed.)`,
      );
    }
    return;
  }

  await sendSubstackDraft({
    smtp: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    },
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.SUBSTACK_POST_EMAIL,
    subject: essay.frontmatter.title,
    html,
    inlineImagePath: isUrlImage ? undefined : substackImage,
  });
  console.log(`Draft emailed to Substack (${process.env.SUBSTACK_POST_EMAIL}).`);
  console.log("Check your Substack dashboard's Drafts — review and hit Send when ready.");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const essay = loadEssay(opts.slug);

  const canonicalUrl = `${SITE_URL}/essays/${essay.slug}`;
  const defaultImage = `${SITE_URL}/essays/${essay.slug}/opengraph-image`;
  const mediumImage = opts.mediumImage || defaultImage;
  const substackImage = opts.substackImage || defaultImage;
  const markdown = toAbsoluteLinks(essay.body, SITE_URL);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  if (!opts.skipMedium) {
    await publishToMedium(essay, { markdown, canonicalUrl, mediumImage, dryRun: opts.dryRun });
  }
  if (!opts.skipSubstack) {
    await publishToSubstack(essay, { markdown, canonicalUrl, substackImage, dryRun: opts.dryRun });
  }

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  process.exit(1);
});
