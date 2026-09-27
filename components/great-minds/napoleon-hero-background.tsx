// Decorative, geometry-only motif echoing the Ascent diagram's shape — a
// rising staircase to a peak, then a dashed line doubling back down and to
// the left — without duplicating the interactive hero diagram's detail.
function NapoleonHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <polyline
        points="460,400 530,340 600,280 670,220 740,160"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <line x1="740" y1="160" x2="580" y2="330" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" />
    </svg>
  );
}

export { NapoleonHeroBackground };
