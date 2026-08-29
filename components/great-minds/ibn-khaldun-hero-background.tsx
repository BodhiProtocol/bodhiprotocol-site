// Decorative, geometry-only motif: a desert fortress silhouette over dune
// lines, evoking Qal'at Ibn Salama — the retreat where the Muqaddimah was
// written — without reproducing the hero diagram.
function IbnKhaldunHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="0" y1="360" x2="800" y2="360" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M480 360 L480 240 L520 240 L520 260 L560 260 L560 240 L600 240 L600 260 L640 260 L640 240 L680 240 L680 360 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect x="560" y="290" width="30" height="70" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <line x1="500" y1="280" x2="500" y2="360" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="660" y1="280" x2="660" y2="360" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

      {Array.from({ length: 6 }, (_, i) => (
        <path
          key={`dune-${i}`}
          d={`M0 ${400 + i * 15} Q 200 ${385 + i * 15} 400 ${400 + i * 15} T 800 ${400 + i * 15}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity={0.5 - i * 0.06}
        />
      ))}

      <circle cx="130" cy="120" r="34" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 5" opacity="0.6" />
      <circle cx="130" cy="120" r="22" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
    </svg>
  );
}

export { IbnKhaldunHeroBackground };
