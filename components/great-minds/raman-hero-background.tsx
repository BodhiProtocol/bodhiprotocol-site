// Decorative, geometry-only motif — a faint spectral-line bar code and a
// scatter of light rays radiating from a point, evoking a spectroscope
// without reproducing the scatter diagram itself.
function RamanHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="600" y1="90" x2="600" y2="130" />
        <line x1="616" y1="70" x2="616" y2="150" />
        <line x1="632" y1="100" x2="632" y2="120" />
        <line x1="648" y1="60" x2="648" y2="160" />
        <line x1="664" y1="95" x2="664" y2="125" />
        <line x1="680" y1="80" x2="680" y2="140" />
        <line x1="696" y1="105" x2="696" y2="115" />
      </g>

      <g stroke="currentColor" strokeWidth="0.75">
        <line x1="120" y1="430" x2="220" y2="430" />
        <line x1="120" y1="430" x2="210" y2="390" strokeDasharray="2 3" />
        <line x1="120" y1="430" x2="200" y2="460" strokeDasharray="1 3" />
      </g>
      <circle cx="120" cy="430" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export { RamanHeroBackground };
