"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Fuse, { type FuseResultMatch } from "fuse.js";
import { BookOpen, Compass, FlaskConical, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  blueprint: { label: "Project Lighthouse", icon: Compass },
  lab: { label: "Labs", icon: FlaskConical },
};

function matchFor(matches: readonly FuseResultMatch[] | undefined, key: string) {
  return matches?.find((match) => match.key === key)?.indices;
}

function CommandMenu({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = React.useState(false);
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
      blueprint: [],
      lab: [],
    };
    for (const result of results) groups[result.item.type].push(result);
    return groups;
  }, [results]);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
  }

  function runCommand(command: () => void) {
    handleOpenChange(false);
    command();
  }

  return (
    <>
      <Button
        variant="outline"
        className="h-9 w-9 justify-center p-0 sm:h-8 sm:w-40 sm:justify-between sm:px-3"
        onClick={() => setOpen(true)}
      >
        <span className="flex items-center gap-2 text-muted-foreground">
          <Search className="size-4" />
          <span className="hidden sm:inline">Search</span>
        </span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          ⌘K
        </kbd>
      </Button>
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
    </>
  );
}

export { CommandMenu };
