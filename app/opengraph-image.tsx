import { ImageResponse } from "next/og";

import { categoryColors } from "@/lib/category-colors";
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
          backgroundImage: "radial-gradient(circle at 50% 45%, #2e1f52 0%, #0a0a0a 65%)",
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
        <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
          {Object.values(categoryColors).map((color) => (
            <div
              key={color}
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
