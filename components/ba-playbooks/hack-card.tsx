import { ArrowDown, ChevronDown } from "lucide-react";

import { BeforeAfter } from "@/components/ba-playbooks/before-after";
import { BulletList } from "@/components/ba-playbooks/bullet-list";
import { Checklist } from "@/components/ba-playbooks/checklist";
import { CopyTemplate } from "@/components/ba-playbooks/copy-template";
import { MiniDiagram } from "@/components/ba-playbooks/mini-diagram";
import { ProTip } from "@/components/ba-playbooks/pro-tip";
import { SideBySide } from "@/components/ba-playbooks/side-by-side";
import { TemplateList } from "@/components/ba-playbooks/template-list";
import { WhyItHelps, WhenToUse } from "@/components/ba-playbooks/example-panel";
import type { PlaybookHack } from "@/types/content";

const LONG_TEMPLATE_LINE_THRESHOLD = 10;

// Uses a native <details>/<summary> disclosure — free keyboard support and no
// client-side state, matching the same pattern used for Great Minds timeline entries.
function HackCard({ hack, itemLabel = "Hack" }: { hack: PlaybookHack; itemLabel?: string }) {
  const paddedNumber = String(hack.number).padStart(2, "0");

  return (
    <details
      id={`hack-${hack.number}`}
      className="group scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-card transition-shadow open:shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 transition-colors hover:bg-muted/30 sm:px-6 sm:py-6 [&::-webkit-details-marker]:hidden">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-semibold text-brand">
          {paddedNumber}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="font-mono text-[0.65rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {itemLabel} {paddedNumber}
          </p>
          <h3 className="font-heading text-lg leading-snug font-medium text-balance sm:text-xl">
            {hack.title}
          </h3>
          <p className="text-sm leading-relaxed text-pretty text-foreground/80">{hack.insight}</p>
        </div>
        <ChevronDown className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="flex flex-col gap-5 border-t border-border px-5 pt-5 pb-6 sm:px-6">
        {hack.explanation ? (
          <p className="text-sm leading-relaxed text-foreground/85">{hack.explanation}</p>
        ) : null}
        {hack.visual ? <MiniDiagram steps={hack.visual.steps} /> : null}
        {hack.before && hack.after ? (
          <BeforeAfter before={hack.before} after={hack.after} label={hack.shiftLabel} />
        ) : null}
        {hack.compare ? <SideBySide {...hack.compare} /> : null}
        {hack.list ? <BulletList items={hack.list} /> : null}
        {hack.checklist ? <Checklist items={hack.checklist} /> : null}
        {hack.whenToUse ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <WhyItHelps>{hack.whyItHelps}</WhyItHelps>
            <WhenToUse>{hack.whenToUse}</WhenToUse>
          </div>
        ) : (
          <WhyItHelps>{hack.whyItHelps}</WhyItHelps>
        )}
        {hack.template ? (
          <CopyTemplate
            template={hack.template}
            label={hack.templateLabel}
            scrollable={hack.template.split("\n").length > LONG_TEMPLATE_LINE_THRESHOLD}
          />
        ) : null}
        {hack.templates?.length ? <TemplateList templates={hack.templates} /> : null}
        {hack.proTip ? <ProTip>{hack.proTip}</ProTip> : null}
        {hack.anchorLink ? (
          <a
            href={hack.anchorLink.href}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            {hack.anchorLink.label}
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </details>
  );
}

export { HackCard };
