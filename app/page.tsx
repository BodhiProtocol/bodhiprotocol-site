export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Project scaffold — Phase 1
      </p>
      <h1 className="font-serif text-5xl font-medium tracking-tight text-balance sm:text-6xl">
        Bodhi<span className="text-brand">Protocol</span>
      </h1>
      <p className="max-w-md text-base text-muted-foreground">
        Understand complex systems through essays, visual explanations, and
        interactive learning.
      </p>
    </main>
  );
}
