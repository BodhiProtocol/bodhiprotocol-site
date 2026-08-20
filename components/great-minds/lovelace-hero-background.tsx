// Decorative, geometry-only motif (a faint woven crosshatch, evoking cloth
// on a loom) without reproducing the hero diagram itself.
function LovelaceHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.07]"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="currentColor" strokeWidth="1">
        <line x1="560" y1="0" x2="800" y2="240" />
        <line x1="620" y1="0" x2="800" y2="180" />
        <line x1="680" y1="0" x2="800" y2="120" />
        <line x1="740" y1="0" x2="800" y2="60" />
        <line x1="500" y1="0" x2="740" y2="240" />
        <line x1="440" y1="0" x2="680" y2="240" />
      </g>
      <g stroke="currentColor" strokeWidth="1">
        <line x1="800" y1="0" x2="560" y2="240" />
        <line x1="800" y1="60" x2="620" y2="240" />
        <line x1="800" y1="120" x2="680" y2="240" />
        <line x1="800" y1="180" x2="740" y2="240" />
        <line x1="740" y1="0" x2="500" y2="240" />
        <line x1="680" y1="0" x2="440" y2="240" />
      </g>

      <circle cx="110" cy="440" r="1.5" fill="currentColor" />
      <circle cx="150" cy="460" r="1" fill="currentColor" />
      <circle cx="80" cy="470" r="1" fill="currentColor" />
      <circle cx="190" cy="430" r="1.5" fill="currentColor" />
    </svg>
  );
}

export { LovelaceHeroBackground };
