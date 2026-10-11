// Decorative, geometry-only motif (a small boat on a river line with a few
// fixed stars above it) evoking the Boat and the Shore without duplicating the
// interactive hero diagram's detail.
function AryabhataHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="520" y1="460" x2="780" y2="460" stroke="currentColor" strokeWidth="3" strokeDasharray="12 10" />
      <path d="M 610 448 H 670 L 660 460 H 620 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 640 448 V 410 L 662 440 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="560" cy="390" r="4" fill="currentColor" />
      <circle cx="700" cy="370" r="3" fill="currentColor" />
      <circle cx="760" cy="410" r="4" fill="currentColor" />
    </svg>
  );
}

export { AryabhataHeroBackground };
