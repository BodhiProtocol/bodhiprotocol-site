import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600 }}>
          Bodhi<span style={{ color: "#a78bfa" }}>Protocol</span>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 800,
            textAlign: "center",
            fontSize: 28,
            color: "#a1a1aa",
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
