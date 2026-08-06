// Decorative, geometry-only motif: a faint warehouse-shelf grid plus a
// receding horizon-line echo, evoking scale and distance without
// reproducing the hero diagram itself.
function BezosHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <pattern id="bezos-shelf-grid" width="36" height="26" patternUnits="userSpaceOnUse">
        <path d="M36 0 L0 0 0 26" fill="none" stroke="currentColor" strokeWidth="0.4" />
      </pattern>
      <rect x="520" y="70" width="220" height="208" fill="url(#bezos-shelf-grid)" opacity="0.5" />
      <rect x="520" y="70" width="220" height="208" fill="none" stroke="currentColor" strokeWidth="0.6" />

      <line x1="60" y1="420" x2="70" y2="420" stroke="currentColor" strokeWidth="0.5" />
      <line x1="100" y1="420" x2="180" y2="420" stroke="currentColor" strokeWidth="0.5" />
      <line x1="220" y1="420" x2="380" y2="420" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="410" cy="420" r="7" fill="none" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export { BezosHeroBackground };
