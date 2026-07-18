"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useMindGraph } from "@/components/great-minds/mind-graph-context";
import { usePrefersReducedMotion } from "@/components/great-minds/use-prefers-reduced-motion";
import { Eyebrow } from "@/components/ui/typography";

function HeroSecondaryQuote({ defaultQuote }: { defaultQuote?: string }) {
  const { active } = useMindGraph();
  const reducedMotion = usePrefersReducedMotion();
  const quote = active?.quote ?? defaultQuote;

  if (!quote) return null;

  return (
    <div className="relative hidden min-h-16 max-w-52 text-center sm:block">
      <AnimatePresence>
        <motion.div
          key={quote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Eyebrow className="font-serif text-base tracking-normal text-muted-foreground normal-case italic">
            &ldquo;{quote}&rdquo;
          </Eyebrow>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { HeroSecondaryQuote };
