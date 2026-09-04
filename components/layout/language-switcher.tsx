"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getEnSlugForPtBrSlug, getPtBrSlugForEnSlug } from "@/lib/ba-playbooks-i18n";
import { cn } from "@/lib/utils";

const PT_BR_PLAYBOOKS_PREFIX = "/pt-br/ba-playbooks";
const EN_PLAYBOOKS_PREFIX = "/ba-playbooks";

// Resolves where each language option should point from the current page —
// straight to the translated article when one exists, otherwise to that
// language's BA Playbooks hub (never a broken URL). BA Playbooks is the only
// section with any Portuguese content today.
export function useLanguageTargets() {
  const pathname = usePathname() ?? "/";
  const isPtBr = pathname.startsWith(PT_BR_PLAYBOOKS_PREFIX);

  let enHref = "/";
  let ptBrHref = PT_BR_PLAYBOOKS_PREFIX;

  if (isPtBr) {
    const slug = pathname.slice(PT_BR_PLAYBOOKS_PREFIX.length).replace(/^\//, "");
    const enSlug = slug ? getEnSlugForPtBrSlug(slug) : undefined;
    enHref = enSlug ? `${EN_PLAYBOOKS_PREFIX}/${enSlug}` : EN_PLAYBOOKS_PREFIX;
    ptBrHref = pathname;
  } else if (pathname.startsWith(EN_PLAYBOOKS_PREFIX)) {
    const slug = pathname.slice(EN_PLAYBOOKS_PREFIX.length).replace(/^\//, "");
    const ptSlug = slug ? getPtBrSlugForEnSlug(slug) : undefined;
    enHref = pathname;
    ptBrHref = ptSlug ? `${PT_BR_PLAYBOOKS_PREFIX}/${ptSlug}` : PT_BR_PLAYBOOKS_PREFIX;
  } else {
    enHref = pathname;
  }

  return { isPtBr, enHref, ptBrHref };
}

function LanguageSwitcher({ className }: { className?: string }) {
  const { isPtBr, enHref, ptBrHref } = useLanguageTargets();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change language"
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors duration-200 hover:bg-muted hover:text-foreground",
          className,
        )}
      >
        <Globe className="size-3.5" />
        {isPtBr ? "PT" : "EN"}
        <ChevronDownIcon className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLinkItem render={<Link href={enHref} />} aria-current={!isPtBr ? "page" : undefined}>
          English
        </DropdownMenuLinkItem>
        <DropdownMenuLinkItem render={<Link href={ptBrHref} />} aria-current={isPtBr ? "page" : undefined}>
          Português (Brasil)
        </DropdownMenuLinkItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LanguageSwitcher };
