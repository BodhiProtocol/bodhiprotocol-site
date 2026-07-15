import { ImageResponse } from "next/og";

import { categoryColors, defaultCategoryColor } from "@/lib/category-colors";
import { getEssayBySlug } from "@/lib/essays";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  const accent = (essay && categoryColors[essay.category]) || defaultCategoryColor;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", width: 10, height: "100%", backgroundColor: accent }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "80px",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: "#a78bfa" }}>
            BodhiProtocol
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {essay ? (
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: 22,
                  fontWeight: 600,
                  color: accent,
                  padding: "6px 18px",
                  borderRadius: 999,
                  border: `2px solid ${accent}`,
                }}
              >
                {essay.category}
              </div>
            ) : null}
            <div style={{ display: "flex", fontSize: 56, fontWeight: 600, lineHeight: 1.2 }}>
              {essay?.title ?? "BodhiProtocol"}
            </div>
            {essay ? (
              <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa" }}>
                {essay.author} · {essay.readingTime}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
