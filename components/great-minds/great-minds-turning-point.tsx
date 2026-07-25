"use client";

import { motion } from "framer-motion";
import { ArrowRight, Ban, Trophy } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import { GreatMindsTakeaway } from "@/components/great-minds/great-minds-takeaway";
import { Eyebrow, H2 } from "@/components/ui/typography";
import type { GreatMindTurningPoint } from "@/types/content";

// Generic reusable "before vs. after" comparison — not tied to any one
// figure's story. Two visual panels instead of narrative paragraphs, and the
// whole section only animates once it enters the viewport (useRevealOnScroll,
// same hook every bespoke diagram already uses). Renders nothing when a
// mind's frontmatter doesn't define turningPoint.
function GreatMindsTurningPoint({ point }: { point?: GreatMindTurningPoint }) {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  if (!point) return null;

  return (
    <section id="turning-point" className="scroll-mt-24 flex flex-col gap-8" ref={ref}>
      <div className="flex flex-col gap-3">
        <Eyebrow className="text-brand">{point.eyebrow}</Eyebrow>
        <H2>{point.heading}</H2>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
          className="flex flex-col gap-2.5 rounded-2xl border border-dashed border-muted-foreground/30 p-6"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-muted-foreground/30 text-muted-foreground">
            <Ban className="size-4" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            {point.before.year}
          </span>
          <h3 className="font-heading text-base font-semibold">{point.before.label}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{point.before.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={played ? { opacity: 1 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.2 }}
          className="flex items-center justify-center text-brand"
        >
          <motion.div
            animate={played && !reducedMotion ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="size-6 rotate-90 sm:rotate-0" aria-hidden="true" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={played ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.3 }}
          className="flex flex-col gap-2.5 rounded-2xl border border-brand/25 bg-brand/[0.05] p-6"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-brand bg-brand text-brand-foreground shadow-md shadow-brand/25">
            <Trophy className="size-4" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-[0.1em] text-brand uppercase">
            {point.after.year}
          </span>
          <h3 className="font-heading text-base font-semibold">{point.after.label}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{point.after.description}</p>
        </motion.div>
      </div>

      <GreatMindsTakeaway text={point.insight} />
    </section>
  );
}

export { GreatMindsTurningPoint };
