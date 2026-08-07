// Decorative, geometry-only motif: a faint horizontal chain of linked
// segments running right to left with a few oil-derrick-like verticals,
// evoking a supply chain read in reverse without reproducing the
// interactive chain diagram itself.
function AmbaniHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <line x1="140" y1="210" x2="700" y2="210" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 0" />

      <circle cx="680" cy="210" r="16" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="500" cy="210" r="16" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="320" cy="210" r="16" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="160" cy="210" r="16" fill="none" stroke="currentColor" strokeWidth="0.75" />

      <path d="M600 210 L570 210 M580 205 L570 210 L580 215" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <path d="M420 210 L390 210 M400 205 L390 210 L400 215" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <path d="M240 210 L210 210 M220 205 L210 210 L220 215" fill="none" stroke="currentColor" strokeWidth="0.6" />

      <line x1="160" y1="194" x2="160" y2="120" stroke="currentColor" strokeWidth="0.6" />
      <path d="M148 120 L172 120 L160 96 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />

      <line x1="80" y1="380" x2="230" y2="380" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" />
      <line x1="90" y1="380" x2="90" y2="340" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="90" cy="332" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export { AmbaniHeroBackground };
