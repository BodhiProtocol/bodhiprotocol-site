// Decorative, geometry-only motif (two lanes merging into one line) evoking
// Two Queues, One Line without duplicating the interactive hero diagram.
function VenkataswamyHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M 520 400 C 580 400 590 440 640 440" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 8" />
      <path d="M 520 480 C 580 480 590 440 640 440" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 8" />
      <line x1="640" y1="440" x2="780" y2="440" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

export { VenkataswamyHeroBackground };
