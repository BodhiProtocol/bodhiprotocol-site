"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { H2, Muted } from "@/components/ui/typography";

function NewsletterCta() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-muted/30 px-6 py-16 text-center">
          <H2>Stay in the loop</H2>
          <Muted className="max-w-md">
            New essays and Lighthouse blueprints, sent occasionally. No spam.
          </Muted>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex w-full max-w-sm flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}

export { NewsletterCta };
