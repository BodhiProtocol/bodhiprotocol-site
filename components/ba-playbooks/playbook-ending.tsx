import { CopyTemplate } from "@/components/ba-playbooks/copy-template";
import { SavePlaybookButton } from "@/components/ba-playbooks/save-playbook-button";
import { ShareButton } from "@/components/ba-playbooks/share-button";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Eyebrow, H3 } from "@/components/ui/typography";
import type { Playbook } from "@/types/content";

interface PlaybookEndingProps {
  guide: Playbook;
  url: string;
}

// Closing tagline + quick actions, then (if the playbook has one) a featured
// "take this with you" template block, then the newsletter capture.
function PlaybookEnding({ guide, url }: PlaybookEndingProps) {
  if (!guide.closingHeading && !guide.closingBody && !guide.closingTemplate) return null;

  return (
    <div className="not-prose flex flex-col gap-10 border-t border-border py-10">
      {guide.closingHeading || guide.closingBody ? (
        <div className="flex flex-col items-center gap-4 text-center">
          {guide.closingHeading ? (
            <div className="flex flex-col">
              {guide.closingHeading.map((line, index) => (
                <p
                  key={line}
                  className={
                    index === guide.closingHeading!.length - 1
                      ? "font-heading text-2xl font-medium text-foreground sm:text-3xl"
                      : "font-heading text-2xl font-medium text-muted-foreground sm:text-3xl"
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          ) : null}
          {guide.closingBody ? (
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              {guide.closingBody}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <SavePlaybookButton />
            <ShareButton title={guide.title} url={url} />
          </div>
        </div>
      ) : null}

      {guide.closingTemplate ? (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <div className="flex flex-col gap-1.5">
            <Eyebrow className="text-brand">Take this with you</Eyebrow>
            <H3>{guide.closingTemplateName ?? "Reusable template"}</H3>
          </div>
          <CopyTemplate template={guide.closingTemplate} label="Copy template" scrollable />
        </div>
      ) : null}

      <div className="flex w-full max-w-xs flex-col items-center gap-2 self-center border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">Get new playbooks first.</p>
        <NewsletterForm source="ba-playbook" className="w-full" />
      </div>
    </div>
  );
}

export { PlaybookEnding };
