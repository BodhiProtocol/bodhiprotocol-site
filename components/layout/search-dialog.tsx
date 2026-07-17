"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Fuse, { type FuseResultMatch } from "fuse.js";
import { BookOpen, Compass, FlaskConical, Library, Sparkles, Users } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { HighlightedText } from "@/components/shared/highlighted-text";
import { navLinks } from "@/lib/nav-links";
import type { SearchItem, SearchItemType } from "@/lib/search-index";

const GROUP_CONFIG: Record<SearchItemType, { label: string; icon: typeof BookOpen }> = {
  essay: { label: "Essays", icon: BookOpen },
  invisibleBusiness: { label: "Invisible Businesses", icon: Sparkles },
  greatMind: { label: "Great Minds", icon: Users },
  blueprint: { label: "Project Lighthouse", icon: Compass },
  tool: { label: "Tools", icon: FlaskConical },
  resource: { label: "Library", icon: Library },
};

function matchFor(matches: readonly FuseResultMatch[] | undefined, key: string) {
  return matches?.find((match) => match.key === key)?.indices;
}

interface SearchDialogProps {
  items: SearchItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SearchDialog({ items, open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const fuse = React.useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "description", weight: 0.25 },
          { name: "category", weight: 0.15 },
          { name: "tags", weight: 0.15 },
          { name: "content", weight: 0.05 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
        includeMatches: true,
      }),
    [items],
  );

  const results = React.useMemo(
    () => (query.trim() ? fuse.search(query).slice(0, 8) : []),
    [fuse, query],
  );

  const grouped = React.useMemo(() => {
    const groups: Record<SearchItemType, typeof results> = {
      essay: [],
      invisibleBusiness: [],
      greatMind: [],
      blueprint: [],
      tool: [],
      resource: [],
    };
    for (const result of results) groups[result.item.type].push(result);
    return groups;
  }, [results]);

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) setQuery("");
  }

  function runCommand(command: () => void) {
    handleOpenChange(false);
    command();
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Search BodhiProtocol"
      description="Search essays, blueprints, and labs, or jump to a page"
      shouldFilter={false}
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search essays, blueprints, labs..."
      />
      <CommandList>
        <CommandEmpty>
          {query ? "No results found." : "Type to search, or jump to a page below."}
        </CommandEmpty>

        {query ? (
          (Object.keys(GROUP_CONFIG) as SearchItemType[]).map((type) => {
            const groupResults = grouped[type];
            if (groupResults.length === 0) return null;
            const { label, icon: Icon } = GROUP_CONFIG[type];

            return (
              <CommandGroup key={type} heading={label}>
                {groupResults.map(({ item, matches }) => (
                  <CommandItem
                    key={`${item.type}-${item.href}-${item.title}`}
                    value={item.title}
                    onSelect={() => runCommand(() => router.push(item.href))}
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate">
                        <HighlightedText
                          text={item.title}
                          indices={matchFor(matches, "title")}
                        />
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        <HighlightedText
                          text={item.description}
                          indices={matchFor(matches, "description")}
                        />
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })
        ) : (
          <CommandGroup heading="Navigate">
            {navLinks.map((link) => (
              <CommandItem
                key={link.href}
                value={link.label}
                onSelect={() => runCommand(() => router.push(link.href))}
              >
                {link.label}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}

export { SearchDialog };
