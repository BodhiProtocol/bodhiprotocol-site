import { ImageResponse } from "next/og";

import { getConceptMapData } from "@/lib/concept-map";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const { arcs, totals } = getConceptMapData();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fafafa",
        color: "#0a0a0a",
        padding: 72,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#7c3aed" }}>
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
          ESSAYS
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 650, lineHeight: 1.05 }}>
          The Concept Map
        </div>

        {/* The lines themselves, at a glance. */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
          {arcs.map((arc) => (
            <div key={arc.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {arc.essays.map((essay, index) => (
                <div
                  key={essay.slug}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 14,
                      height: 14,
                      borderRadius: 999,
                      border: `3px solid ${arc.color}`,
                      backgroundColor: "#fafafa",
                    }}
                  />
                  {index < arc.essays.length - 1 ? (
                    <div
                      style={{
                        display: "flex",
                        width: 68,
                        height: 4,
                        borderRadius: 999,
                        backgroundColor: arc.color,
                        opacity: 0.55,
                      }}
                    />
                  ) : null}
                </div>
              ))}
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
          {totals.essays} essays · {totals.arcs} reading lines
        </div>
        <div style={{ display: "flex", color: "#7c3aed" }}>
          {totals.bridges} interchanges
        </div>
      </div>
    </div>,
    { ...size },
  );
}
