// Decorative, geometry-only motif: faint graph-paper grid plus a orbital
// ellipse, evoking hand-computed trajectory sheets without reproducing the
// hero diagram itself.
function JohnsonHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <pattern id="johnson-graph-grid" width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0 L0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </pattern>
      <rect x="480" y="60" width="260" height="220" fill="url(#johnson-graph-grid)" opacity="0.6" />
      <rect x="480" y="60" width="260" height="220" fill="none" stroke="currentColor" strokeWidth="0.6" />

      <ellipse cx="150" cy="380" rx="140" ry="60" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
      <circle cx="150" cy="380" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="290" cy="380" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export { JohnsonHeroBackground };
