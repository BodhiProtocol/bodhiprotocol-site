// Decorative, geometry-only motif (a grid of wall segments with gaps knocked
// out of it) evoking the Mind Without Walls without duplicating the
// interactive hero diagram's detail.
function TagoreHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M 520 470 H 600 M 640 470 H 700 V 430 M 700 400 V 370 H 770" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M 520 470 V 440 M 520 410 V 390 H 580" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export { TagoreHeroBackground };
