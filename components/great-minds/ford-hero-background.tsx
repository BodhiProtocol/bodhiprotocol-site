// Decorative, geometry-only motif: a faint factory-floor grid plus a row of
// gear teeth, evoking Highland Park without reproducing the hero diagram.
function FordHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <pattern id="ford-floor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0 L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.4" />
      </pattern>
      <rect x="0" y="260" width="800" height="240" fill="url(#ford-floor-grid)" opacity="0.4" />

      <circle cx="640" cy="150" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="640" cy="150" r="10" fill="none" stroke="currentColor" strokeWidth="0.75" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 640 + 46 * Math.cos(angle);
        const y1 = 150 + 46 * Math.sin(angle);
        const x2 = 640 + 56 * Math.cos(angle);
        const y2 = 150 + 56 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />;
      })}

      <line x1="60" y1="200" x2="300" y2="200" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" />
      {[80, 140, 200, 260].map((x) => (
        <line key={x} x1={x} y1="196" x2={x} y2="204" stroke="currentColor" strokeWidth="0.5" />
      ))}
    </svg>
  );
}

export { FordHeroBackground };
