import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LighthouseGlyph } from "@/components/shared/lighthouse-glyph";
import { Eyebrow, H1, Lead } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-6 py-32 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-brand/10">
        <LighthouseGlyph className="size-10" />
      </div>
      <Eyebrow>404</Eyebrow>
      <H1>The light doesn&apos;t reach this page.</H1>
      <Lead className="max-w-md">
        The essay, blueprint, or page you&apos;re looking for isn&apos;t here — it may
        have moved or never existed.
      </Lead>
      <Button nativeButton={false} render={<Link href="/" />}>
        Back to home
      </Button>
    </Container>
  );
}
