import { getAllEssays } from "@/lib/essays";

const SITE_URL = "https://bodhiprotocol.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const essays = getAllEssays();

  const items = essays
    .map(
      (essay) => `
    <item>
      <title>${escapeXml(essay.title)}</title>
      <link>${SITE_URL}/essays/${essay.slug}</link>
      <guid>${SITE_URL}/essays/${essay.slug}</guid>
      <description>${escapeXml(essay.description)}</description>
      <author>${escapeXml(essay.author)}</author>
      <category>${escapeXml(essay.category)}</category>
      <pubDate>${new Date(essay.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>BodhiProtocol Essays</title>
    <link>${SITE_URL}/essays</link>
    <description>Essays on AI, capital markets, business analysis, decision making, and economics.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
