import { ImageResponse } from "next/og";

import { getInvisibleBusinessBySlug } from "@/lib/invisible-businesses";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The OG renderer's bundled font has no ₹ glyph (it draws an empty box), so any
// text containing ₹ is laid out word by word with the symbol drawn as an SVG.
// Text without ₹ is returned untouched, so other episodes render exactly as before.
function RupeeSign({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size * 0.62}
      height={size * 0.8}
      viewBox="4 2 16 20"
      fill="none"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: size * 0.02 }}
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m6 13 8.5 8" />
      <path d="M6 13h3" />
      <path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  );
}

function withRupee(text: string, size: number, color: string) {
  if (!text.includes("₹")) return text;
  return text.split(" ").map((word, index) => (
    <div
      key={index}
      style={{ display: "flex", alignItems: "center", marginRight: size * 0.26 }}
    >
      {word.split("₹").flatMap((part, partIndex) =>
        partIndex === 0
          ? [part]
          : [<RupeeSign key={partIndex} size={size} color={color} />, part],
      )}
    </div>
  ));
}

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
          backgroundColor: "#fafafa",
          color: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#7c3aed" }}>
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
                color: "#7c3aed",
                padding: "6px 18px",
                borderRadius: 999,
                border: "2px solid #7c3aed",
              }}
            >
              Episode {String(episode.episode).padStart(2, "0")}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {withRupee(episode?.title ?? "Invisible Businesses", 56, "#0a0a0a")}
          </div>
          {episode ? (
            <div style={{ display: "flex", flexWrap: "wrap", fontSize: 26, color: "#52525b" }}>
              {withRupee(episode.tagline, 26, "#52525b")}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
