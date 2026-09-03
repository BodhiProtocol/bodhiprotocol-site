// Decorative, geometry-only motif (two faint lopsided pie wedges sharing a
// center) evoking the Rose Diagram without duplicating the interactive
// hero diagram's detail.
function NightingaleHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M 620,270 L 690,270 A 70,70 0 0 1 620,340 Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M 620,270 L 620,255 A 15,15 0 0 0 605,270 Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="620" cy="270" r="2.5" fill="currentColor" />
    </svg>
  );
}

export { NightingaleHeroBackground };
