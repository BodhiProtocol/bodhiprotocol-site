// Decorative, geometry-only motif (a faint horizontal line with rail-tie
// ticks and a leftward-pointing arrow) evoking the Pull System — the
// mirror image of Ford's hero background elsewhere in this series.
function OhnoHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="420" y1="290" x2="760" y2="290" stroke="currentColor" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => 440 + i * 28).map((x) => (
        <line key={x} x1={x} y1="280" x2={x} y2="300" stroke="currentColor" strokeWidth="1.5" />
      ))}
      <polygon points="420,290 440,278 440,302" fill="currentColor" />
    </svg>
  );
}

export { OhnoHeroBackground };
