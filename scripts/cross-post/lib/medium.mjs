import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const MEDIUM_API = "https://api.medium.com/v1";

async function mediumRequest(token, pathname, options = {}) {
  const response = await fetch(`${MEDIUM_API}${pathname}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Accept-Charset": "utf-8",
      ...options.headers,
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(`Medium API error (${response.status}): ${JSON.stringify(body)}`);
  }
  return body.data;
}

/** Resolves the integration token to the author's userId. */
export async function getMediumUserId(token) {
  const data = await mediumRequest(token, "/me");
  return data.id;
}

/**
 * Returns a Medium-hosted image URL. Uploads a local file; passes an
 * existing http(s) URL straight through.
 */
export async function uploadMediumImage(token, imagePathOrUrl) {
  if (/^https?:\/\//.test(imagePathOrUrl)) return imagePathOrUrl;

  const buffer = fs.readFileSync(imagePathOrUrl);
  const ext = path.extname(imagePathOrUrl).slice(1) || "png";
  const form = new FormData();
  form.append("image", new Blob([buffer], { type: `image/${ext}` }), path.basename(imagePathOrUrl));

  const data = await mediumRequest(token, "/images", { method: "POST", body: form });
  return data.url;
}

/**
 * Renders the essay as plain HTML for copy-paste into Medium's own editor —
 * Medium has issued no new API integration tokens since 2025, so for most
 * accounts this manual-paste path is the only one that actually works.
 * Open the file in a browser, select all, copy, paste into a new Medium story.
 */
export function buildMediumHtml(title, markdown, imageSrc, canonicalUrl, tags) {
  const bodyHtml = marked.parse(markdown);
  const tagLine = tags.length ? tags.slice(0, 5).join(", ") : "(none)";
  return `
<div style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; line-height: 1.65; max-width: 680px; margin: 60px auto; color: #0a0a0a;">
  <img src="${imageSrc}" alt="${title}" style="width: 100%; height: auto; margin-bottom: 32px;" />
  <h1 style="font-size: 38px; line-height: 1.25; margin-bottom: 32px;">${title}</h1>
  ${bodyHtml}
</div>
<hr style="max-width: 680px; margin: 0 auto;" />
<p style="font-family: sans-serif; font-size: 13px; color: #52525b; max-width: 680px; margin: 16px auto;">
  Not part of the story — for you, before you paste this in:<br />
  Tags to add on Medium's publish screen: ${tagLine}<br />
  Canonical link to set (Medium story menu "..." → "Change settings" → "Add canonical link"): ${canonicalUrl}
</p>
`.trim();
}

/** Creates a draft post (never auto-publishes) with a canonical link back to the site. */
export async function createMediumDraft(token, userId, { title, markdown, canonicalUrl, tags }) {
  return mediumRequest(token, `/users/${userId}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      contentFormat: "markdown",
      content: markdown,
      canonicalUrl,
      tags: tags.slice(0, 5),
      publishStatus: "draft",
    }),
  });
}
