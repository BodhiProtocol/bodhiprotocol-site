import { BookOpen, FileText, ListChecks } from "lucide-react";

import { CopyTemplate } from "@/components/ba-playbooks/copy-template";
import { DownloadCard } from "@/components/ba-playbooks/download-card";
import { SavePlaybookButton } from "@/components/ba-playbooks/save-playbook-button";
import { ShareButton } from "@/components/ba-playbooks/share-button";
import { ToolkitCard } from "@/components/ba-playbooks/toolkit-card";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Eyebrow, H3 } from "@/components/ui/typography";
import type { Playbook } from "@/types/content";

const DOWNLOAD_ICONS = {
  checklist: <ListChecks className="size-4.5" aria-hidden="true" />,
  template: <FileText className="size-4.5" aria-hidden="true" />,
  examples: <BookOpen className="size-4.5" aria-hidden="true" />,
} as const;

interface PlaybookEndingLabels {
  eyebrow?: string;
  reusableTemplate?: string;
  copyTemplate?: string;
  newsletterCta?: string;
  saveButton?: string;
  shareLabel?: string;
  copiedLabel?: string;
  copiedSrLabel?: string;
  hideNewsletter?: boolean;
  newsletterPlaceholder?: string;
  newsletterAriaLabel?: string;
  newsletterButtonLabel?: string;
  newsletterLoadingLabel?: string;
  newsletterSuccessMessage?: string;
  newsletterErrorFallback?: string;
}

interface PlaybookEndingProps {
  guide: Playbook;
  url: string;
  labels?: PlaybookEndingLabels;
}

// Closing tagline + quick actions, then (if the playbook has one) a featured
// "take this with you" template block, then the newsletter capture.
function PlaybookEnding({ guide, url, labels = {} }: PlaybookEndingProps) {
  const {
    eyebrow = "Take this with you",
    reusableTemplate = "Reusable template",
    copyTemplate = "Copy template",
    newsletterCta = "Get new playbooks first.",
    saveButton,
    shareLabel,
    copiedLabel,
    copiedSrLabel,
    hideNewsletter = false,
    newsletterPlaceholder,
    newsletterAriaLabel,
    newsletterButtonLabel,
    newsletterLoadingLabel,
    newsletterSuccessMessage,
    newsletterErrorFallback,
  } = labels;
  if (!guide.closingHeading && !guide.closingBody && !guide.closingTemplate && !guide.toolkit && !guide.download)
    return null;

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
            <SavePlaybookButton {...(saveButton ? { label: saveButton } : {})} />
            <ShareButton
              title={guide.title}
              url={url}
              {...(shareLabel ? { shareLabel } : {})}
              {...(copiedLabel ? { copiedLabel } : {})}
              {...(copiedSrLabel ? { copiedSrLabel } : {})}
            />
          </div>
        </div>
      ) : null}

      {guide.toolkit ? <ToolkitCard toolkit={guide.toolkit} /> : null}

      {guide.closingTemplate ? (
        <div
          id="closing-template"
          className="flex scroll-mt-28 flex-col gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-1.5">
            <Eyebrow className="text-brand">{eyebrow}</Eyebrow>
            <H3>{guide.closingTemplateName ?? reusableTemplate}</H3>
          </div>
          <CopyTemplate template={guide.closingTemplate} label={copyTemplate} scrollable />
          {guide.download && !guide.toolkit ? (
            <div className="sm:max-w-xs">
              <DownloadCard
                icon={DOWNLOAD_ICONS[guide.download.icon]}
                title={guide.download.title}
                description={guide.download.description}
                href={guide.download.href}
                filename={guide.download.filename}
                meta={guide.download.meta}
                cta={guide.download.cta}
                analyticsEvent={guide.download.analyticsEvent}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {!hideNewsletter ? (
        <div className="flex w-full max-w-xs flex-col items-center gap-2 self-center border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">{newsletterCta}</p>
          <NewsletterForm
            source="ba-playbook"
            className="w-full"
            {...(newsletterPlaceholder ? { placeholder: newsletterPlaceholder } : {})}
            {...(newsletterAriaLabel ? { ariaLabel: newsletterAriaLabel } : {})}
            {...(newsletterButtonLabel ? { buttonLabel: newsletterButtonLabel } : {})}
            {...(newsletterLoadingLabel ? { loadingLabel: newsletterLoadingLabel } : {})}
            {...(newsletterSuccessMessage ? { successMessage: newsletterSuccessMessage } : {})}
            {...(newsletterErrorFallback ? { errorFallback: newsletterErrorFallback } : {})}
          />
        </div>
      ) : null}
    </div>
  );
}

export { PlaybookEnding };
