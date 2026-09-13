// Decorative, geometry-only motif (a faint hill silhouette with a narrow
// gap cut through its base) evoking the Cut Through the Mountain without
// duplicating the interactive hero diagram's detail.
function ManjhiHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M 480 380 L 620 200 L 760 380" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="480" y1="380" x2="560" y2="380" stroke="currentColor" strokeWidth="3" />
      <line x1="680" y1="380" x2="760" y2="380" stroke="currentColor" strokeWidth="3" />
      <line x1="560" y1="380" x2="680" y2="380" stroke="currentColor" strokeWidth="4" strokeDasharray="6 8" />
    </svg>
  );
}

export { ManjhiHeroBackground };
