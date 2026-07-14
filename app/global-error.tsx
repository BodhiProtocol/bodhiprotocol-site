"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 text-center text-white">
        <p className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
          Critical Error
        </p>
        <h1 className="text-4xl font-medium">The site hit a critical error.</h1>
        <p className="max-w-md text-zinc-400">
          Something went wrong at a level this page can&apos;t recover from on its
          own. Reloading usually fixes it.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
