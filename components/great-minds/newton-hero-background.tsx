// Decorative, geometry-only motif (projectile arc, orbital ellipses, construction
// lines) evoking gravitation and motion without reproducing any specific diagram.
function NewtonHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <ellipse cx="650" cy="130" rx="150" ry="60" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse
        cx="650"
        cy="130"
        rx="104"
        ry="42"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 4"
      />
      <circle cx="650" cy="130" r="6" fill="currentColor" />
      <line x1="650" y1="60" x2="650" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />

      <path
        d="M40 440 Q 90 340 150 440"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 3"
      />
      <circle cx="40" cy="440" r="4" fill="currentColor" />
      <circle cx="150" cy="440" r="4" fill="currentColor" />
      <line x1="10" y1="440" x2="190" y2="440" stroke="currentColor" strokeWidth="0.5" />

      <rect x="600" y="380" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="600" y1="450" x2="740" y2="450" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="670" y1="380" x2="670" y2="520" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

      <path
        d="M220 60 Q 260 20 310 55 T 400 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1 3"
      />
    </svg>
  );
}

export { NewtonHeroBackground };
