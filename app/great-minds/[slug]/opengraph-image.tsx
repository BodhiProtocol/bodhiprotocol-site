import { ImageResponse } from "next/og";

import { getGreatMindBySlug } from "@/lib/great-minds";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mind = getGreatMindBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fafafa",
          color: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#7c3aed" }}>
          BodhiProtocol · Great Minds
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {mind ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 22,
                fontWeight: 600,
                color: "#7c3aed",
                padding: "6px 18px",
                borderRadius: 999,
                border: "2px solid #7c3aed",
              }}
            >
              {mind.era}
            </div>
          ) : null}
          <div style={{ display: "flex", fontSize: 56, fontWeight: 600, lineHeight: 1.2 }}>
            {mind?.name ?? "Great Minds"}
          </div>
          {mind ? (
            <div style={{ display: "flex", fontSize: 26, color: "#52525b" }}>{mind.positioning}</div>
          ) : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
