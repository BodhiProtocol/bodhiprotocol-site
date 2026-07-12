import { ImageResponse } from "next/og";

import { getEssayBySlug } from "@/lib/essays";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a78bfa" }}>
          BodhiProtocol
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 600, lineHeight: 1.2 }}>
            {essay?.title ?? "BodhiProtocol"}
          </div>
          {essay ? (
            <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa" }}>
              {essay.category} · {essay.readingTime}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
