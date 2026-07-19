// Decorative, geometry-only motif (blueprint grid, dimension brackets, tick
// marks) evoking technical drafting without reproducing the hero diagram itself.
function TeslaHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="tesla-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="800" height="500" fill="url(#tesla-grid)" opacity="0.6" />

      <circle cx="640" cy="150" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="640" cy="150" r="52" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <line x1="640" y1="60" x2="640" y2="240" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
      <line x1="550" y1="150" x2="730" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />

      <path
        d="M40 420 L40 460 L200 460 L200 420"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 3"
      />
      <line x1="120" y1="440" x2="120" y2="460" stroke="currentColor" strokeWidth="0.75" />

      <rect
        x="600"
        y="360"
        width="120"
        height="120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

export { TeslaHeroBackground };
