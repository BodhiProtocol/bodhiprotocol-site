// Decorative, geometry-only motif — a charkha: a large hand-turned wheel
// linked by a drive band to a small spindle, with loose thread trailing off
// it, evoking the spinning wheel without reproducing the widening-wheel
// diagram itself.
function GandhiHeroBackground() {
  const spokeAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="190" cy="290" r="92" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="190" cy="290" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
      {spokeAngles.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 190 + 10 * Math.cos(rad);
        const y1 = 290 + 10 * Math.sin(rad);
        const x2 = 190 + 92 * Math.cos(rad);
        const y2 = 290 + 92 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />;
      })}

      <line x1="278" y1="270" x2="470" y2="215" stroke="currentColor" strokeWidth="1" />
      <line x1="278" y1="310" x2="470" y2="245" stroke="currentColor" strokeWidth="1" />
      <circle cx="490" cy="230" r="16" fill="none" stroke="currentColor" strokeWidth="1" />

      <path
        d="M505 228 C 560 220, 600 190, 650 150 C 680 125, 700 100, 715 75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="715" cy="75" r="1.5" fill="currentColor" />
      <circle cx="670" cy="130" r="1" fill="currentColor" />
      <circle cx="625" cy="175" r="1" fill="currentColor" />
    </svg>
  );
}

export { GandhiHeroBackground };
