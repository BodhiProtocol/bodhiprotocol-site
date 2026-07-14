import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, H1, Lead } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-6 py-32 text-center">
      <Eyebrow>404</Eyebrow>
      <H1>This page doesn&apos;t exist.</H1>
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
