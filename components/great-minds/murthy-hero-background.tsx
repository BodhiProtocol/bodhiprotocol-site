// Decorative, geometry-only motif: a faint clock dial with radiating hour
// ticks and a thin great-circle arc suggesting a globe crossed by time
// zones, without reproducing the interactive follow-the-sun diagram itself.
function MurthyHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="620" cy="210" r="150" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <ellipse cx="620" cy="210" rx="150" ry="55" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <ellipse cx="620" cy="210" rx="65" ry="150" fill="none" stroke="currentColor" strokeWidth="0.5" />

      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
        const inner = { x: 620 + 140 * Math.cos(angle), y: 210 + 140 * Math.sin(angle) };
        const outer = { x: 620 + 160 * Math.cos(angle), y: 210 + 160 * Math.sin(angle) };
        return (
          <line
            key={i}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="currentColor"
            strokeWidth={i % 6 === 0 ? 0.75 : 0.4}
          />
        );
      })}

      <line x1="80" y1="400" x2="230" y2="400" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
      <circle cx="90" cy="400" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="220" cy="400" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export { MurthyHeroBackground };
