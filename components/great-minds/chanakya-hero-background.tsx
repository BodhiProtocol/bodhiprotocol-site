// Decorative, geometry-only motif (faint concentric rings) evoking the
// Raja-mandala without duplicating the interactive hero diagram's detail.
function ChanakyaHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="620" cy="260" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="620" cy="260" r="105" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      <circle cx="620" cy="260" r="150" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="620" cy="260" r="195" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
      <circle cx="620" cy="260" r="4" fill="currentColor" />
    </svg>
  );
}

export { ChanakyaHeroBackground };
