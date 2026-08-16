// Decorative, geometry-only motif — a charkha: a large hand-turned wheel
// linked by a drive band to a small spindle, with loose thread trailing off
// it, evoking the spinning wheel without reproducing the widening-wheel
// diagram itself. This SVG is full-bleed across the entire hero (both the
// text column and the diagram column), so every coordinate is kept left of
// x=380 in the 800-wide viewBox — comfortably inside the text column — to
// avoid overlapping the actual diagram, which renders in the right half.
function GandhiHeroBackground() {
  const spokeAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="150" cy="330" r="78" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="150" cy="330" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
      {spokeAngles.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 150 + 9 * Math.cos(rad);
        const y1 = 330 + 9 * Math.sin(rad);
        const x2 = 150 + 78 * Math.cos(rad);
        const y2 = 330 + 78 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />;
      })}

      <line x1="224" y1="310" x2="320" y2="280" stroke="currentColor" strokeWidth="1" />
      <line x1="224" y1="345" x2="320" y2="310" stroke="currentColor" strokeWidth="1" />
      <circle cx="335" cy="295" r="13" fill="none" stroke="currentColor" strokeWidth="1" />

      <path
        d="M340 308 C 345 340, 330 375, 300 400 C 275 420, 250 430, 220 435"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="220" cy="435" r="1.5" fill="currentColor" />
      <circle cx="265" cy="410" r="1" fill="currentColor" />
      <circle cx="310" cy="380" r="1" fill="currentColor" />
    </svg>
  );
}

export { GandhiHeroBackground };
