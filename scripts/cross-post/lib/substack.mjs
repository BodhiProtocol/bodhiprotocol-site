import { marked } from "marked";

/**
 * Renders the essay as plain HTML for copy-paste into Substack's own editor.
 * Substack has no public API and no post-by-email feature — this manual-paste
 * path is the only one that exists, for any account.
 * Open the file in a browser, select all, copy, paste into a new Substack post.
 */
export function buildSubstackHtml(title, markdown, imageSrc, sourceUrl) {
  const bodyHtml = marked.parse(markdown);
  return `
<div style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; line-height: 1.65; max-width: 680px; margin: 60px auto; color: #0a0a0a;">
  <img src="${imageSrc}" alt="${title}" style="width: 100%; height: auto; margin-bottom: 32px;" />
  <h1 style="font-size: 38px; line-height: 1.25; margin-bottom: 32px;">${title}</h1>
  ${bodyHtml}
  <p style="margin-top: 32px; font-size: 14px; color: #52525b;">
    Originally published at <a href="${sourceUrl}" style="color: #7c3aed;">bodhiprotocol.com</a>.
  </p>
</div>
`.trim();
}
