import { ImageResponse } from "next/og";

import { getBlueprintBySlug } from "@/lib/blueprints";
import { categoryColors, defaultCategoryColor } from "@/lib/category-colors";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);
  const accent = (blueprint && categoryColors[blueprint.module]) || defaultCategoryColor;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#fafafa",
          color: "#0a0a0a",
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
          <div style={{ display: "flex", fontSize: 28, color: "#7c3aed" }}>
            Project Lighthouse
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {blueprint ? (
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
                {blueprint.module}
              </div>
            ) : null}
            <div style={{ display: "flex", fontSize: 56, fontWeight: 600, lineHeight: 1.2 }}>
              {blueprint?.title ?? "BodhiProtocol"}
            </div>
            {blueprint ? (
              <div style={{ display: "flex", fontSize: 24, color: "#52525b" }}>
                {blueprint.season} · {blueprint.readingTime}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
