import fs from "node:fs";
import path from "node:path";

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
