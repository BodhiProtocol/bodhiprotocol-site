// Decorative, geometry-only motif (a faint winding street ending at a small
// schoolhouse outline) evoking the Walk to School without duplicating the
// interactive hero diagram's detail.
function PhuleHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M 60 470 C 140 420 200 480 280 430 S 380 400 420 380"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="10 10"
      />
      <path d="M 410 390 V 350 L 440 324 L 470 350 V 390 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export { PhuleHeroBackground };
