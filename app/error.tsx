"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, H1, Lead } from "@/components/ui/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center gap-6 py-32 text-center">
      <Eyebrow>Error</Eyebrow>
      <H1>Something went wrong.</H1>
      <Lead className="max-w-md">
        An unexpected error occurred loading this page. You can try again, or head
        back to the homepage.
      </Lead>
      <Button onClick={reset}>Try again</Button>
    </Container>
  );
}
