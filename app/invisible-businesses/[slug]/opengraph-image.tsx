import { ImageResponse } from "next/og";

import { getInvisibleBusinessBySlug } from "@/lib/invisible-businesses";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getInvisibleBusinessBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f0a1f",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(139,92,246,0.35), transparent 55%)",
          color: "#fafafa",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#c4b5fd" }}>
          BodhiProtocol · Invisible Businesses
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {episode ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 22,
                fontWeight: 600,
                color: "#c4b5fd",
                padding: "6px 18px",
                borderRadius: 999,
                border: "2px solid #7c3aed",
              }}
            >
              Episode {String(episode.episode).padStart(2, "0")}
            </div>
          ) : null}
          <div style={{ display: "flex", fontSize: 56, fontWeight: 600, lineHeight: 1.2 }}>
            {episode?.title ?? "Invisible Businesses"}
          </div>
          {episode ? (
            <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>
              {episode.tagline}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
