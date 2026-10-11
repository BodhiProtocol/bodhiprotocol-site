// Decorative, geometry-only motif (a short chain of boxes joined by arrows,
// like pieces passing through a production line) evoking the Rule Engine
// without duplicating the interactive hero diagram's detail.
function PaniniHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="520" y="430" width="50" height="34" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M 580 447 H 610 M 600 439 L 610 447 L 600 455" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="620" y="430" width="50" height="34" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M 680 447 H 710 M 700 439 L 710 447 L 700 455" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="720" y="430" width="60" height="34" rx="6" fill="currentColor" />
    </svg>
  );
}

export { PaniniHeroBackground };
