import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";

function BriefingMark() {
  return (
    <svg width="44" height="38" viewBox="0 0 44 38" aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="42" height="28" rx="2.5" className="fill-none stroke-border" strokeWidth="1.5" />
      <path d="M2 2 L22 18 L42 2" className="fill-none stroke-brand" strokeWidth="2" />
      <line x1="8" y1="34" x2="36" y2="34" className="stroke-border" strokeWidth="1.5" />
      <line x1="8" y1="38" x2="26" y2="38" className="stroke-border" strokeWidth="1.5" />
    </svg>
  );
}

function NewsletterSignup() {
  return (
    <Section className="bg-brand/5 py-16 sm:py-20">
      <Container className="flex max-w-2xl flex-col items-start gap-5">
        <BriefingMark />
        <div>
          <p className="font-serif text-xl leading-snug text-balance sm:text-2xl">
            A five-minute weekly briefing for people learning capital markets,
            business analysis, and financial systems.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            For students, freshers, business analysts, QA professionals, and
            developers working their way into financial services.
          </p>
        </div>
        <NewsletterForm source="homepage" className="w-full max-w-md" />
      </Container>
    </Section>
  );
}

export { NewsletterSignup };
