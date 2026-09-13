import path from "node:path";
import nodemailer from "nodemailer";
import { marked } from "marked";

/** Builds the HTML body emailed to Substack's posting address. `imageSrc` is either a URL or "cid:cover-image". */
export function buildSubstackHtml(title, markdown, imageSrc, sourceUrl) {
  const bodyHtml = marked.parse(markdown);
  return `
<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 640px; margin: 0 auto; color: #0a0a0a;">
  <img src="${imageSrc}" alt="${title}" style="width: 100%; height: auto; margin-bottom: 24px;" />
  <h1 style="font-size: 32px; line-height: 1.2; margin-bottom: 24px;">${title}</h1>
  ${bodyHtml}
  <p style="margin-top: 32px; font-size: 14px; color: #52525b;">
    Originally published at <a href="${sourceUrl}" style="color: #7c3aed;">bodhiprotocol.com</a>.
  </p>
</div>
`.trim();
}

/**
 * Emails the post to Substack's hidden posting address, where it lands as a
 * draft — Substack gives no way to skip the human review/send step.
 */
export async function sendSubstackDraft({ smtp, from, to, subject, html, inlineImagePath }) {
  const transporter = nodemailer.createTransport(smtp);
  const attachments = inlineImagePath
    ? [{ filename: path.basename(inlineImagePath), path: inlineImagePath, cid: "cover-image" }]
    : [];

  return transporter.sendMail({ from, to, subject, html, attachments });
}
