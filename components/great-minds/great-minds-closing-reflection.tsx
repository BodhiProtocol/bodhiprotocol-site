// Renders nothing when a mind's frontmatter doesn't define closingReflection.
function GreatMindsClosingReflection({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <section id="closing-reflection" className="scroll-mt-24 flex flex-col items-center gap-4 text-center">
      <div className="h-px w-16 bg-border" />
      <div className="flex flex-col gap-3 font-serif text-xl leading-snug text-balance sm:text-2xl">
        {text.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export { GreatMindsClosingReflection };
