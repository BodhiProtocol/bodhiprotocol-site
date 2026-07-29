// Decorative geometry evoking a lamp, a horizon line, and radiating attention:
// enough visual atmosphere for Vivekananda's page without competing with the
// portrait-led hero diagram.
function VivekanandaHeroBackground() {
  return (
    <svg
      viewBox="0 0 800 500"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-brand/[0.08]"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M80 390 C210 340 330 340 470 390 S690 440 760 360" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="168" cy="166" r="44" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M168 96 V34" stroke="currentColor" strokeWidth="1" />
      <path d="M168 298 v-58" stroke="currentColor" strokeWidth="1" />
      <path d="M238 166 h62" stroke="currentColor" strokeWidth="1" />
      <path d="M36 166 h62" stroke="currentColor" strokeWidth="1" />
      <path d="M218 116 l44 -44" stroke="currentColor" strokeWidth="1" />
      <path d="M118 216 l-44 44" stroke="currentColor" strokeWidth="1" />
      <path d="M218 216 l44 44" stroke="currentColor" strokeWidth="1" />
      <path d="M118 116 74 72" stroke="currentColor" strokeWidth="1" />
      <path d="M610 118 c24 28 24 70 0 98 c-24 -28 -24 -70 0 -98Z" fill="currentColor" opacity="0.55" />
      <path d="M610 216 c-18 26 -18 58 0 84 c18 -26 18 -58 0 -84Z" fill="currentColor" opacity="0.32" />
      <circle cx="700" cy="86" r="1.5" fill="currentColor" />
      <circle cx="724" cy="178" r="1" fill="currentColor" />
      <circle cx="520" cy="76" r="1" fill="currentColor" />
    </svg>
  );
}

export { VivekanandaHeroBackground };
