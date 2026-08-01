import { ImageResponse } from "next/og";

import { categoryColors, defaultCategoryColor } from "@/lib/category-colors";
import { getEssayBySlug } from "@/lib/essays";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  const accent = (essay && categoryColors[essay.category]) || defaultCategoryColor;

  if (slug === "shiv-pressed-buy-trade-execution") {
    const marketEvents = [
      "Broker validation",
      "Order book",
      "Priority rules",
      "Partial fills",
      "Settlement",
    ];

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#fafafa",
          color: "#0a0a0a",
          padding: 56,
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid #e5e5e5",
            borderRadius: 36,
            padding: 48,
            background:
              "radial-gradient(circle at 16% 18%, rgba(124, 58, 237, 0.16), transparent 34%), linear-gradient(135deg, #ffffff, #f4f4f5)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#7c3aed" }}
            >
              BodhiProtocol
            </div>
            <div
              style={{
                display: "flex",
                padding: "10px 18px",
                border: "2px solid #7c3aed",
                borderRadius: 999,
                color: "#7c3aed",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              CAPITAL MARKETS
            </div>
          </div>

          <div style={{ display: "flex", gap: 44, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", width: 560 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 72,
                  lineHeight: 1.02,
                  fontWeight: 750,
                }}
              >
                Shiv pressed Buy.
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 22,
                  fontSize: 32,
                  lineHeight: 1.25,
                  color: "#3f3f46",
                  fontWeight: 600,
                }}
              >
                Then an entire market went to work.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                width: 420,
                padding: 24,
                border: "1px solid #e5e5e5",
                borderRadius: 28,
                backgroundColor: "rgba(255,255,255,0.86)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#71717a",
                  }}
                >
                  BUY
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#7c3aed",
                  }}
                >
                  ENTIRE MARKET
                </div>
              </div>
              {marketEvents.map((event, index) => (
                <div
                  key={event}
                  style={{ display: "flex", gap: 12, alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#7c3aed",
                      color: "white",
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      padding: "12px 16px",
                      borderRadius: 16,
                      border: "1px solid #e5e5e5",
                      backgroundColor: "#fafafa",
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#52525b",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            <div style={{ display: "flex" }}>
              One order. Two markets. Fictional educational examples.
            </div>
            <div style={{ display: "flex", color: "#7c3aed" }}>₹ Reliance · $ Apple</div>
          </div>
        </div>
      </div>,
      { ...size },
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#fafafa",
        color: "#0a0a0a",
      }}
    >
      <div
        style={{ display: "flex", width: 10, height: "100%", backgroundColor: accent }}
      />
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
          <div
            style={{ display: "flex", fontSize: 56, fontWeight: 600, lineHeight: 1.2 }}
          >
            {essay?.title ?? "BodhiProtocol"}
          </div>
          {essay ? (
            <div style={{ display: "flex", fontSize: 24, color: "#52525b" }}>
              {essay.author} · {essay.readingTime}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
