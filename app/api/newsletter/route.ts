import { NextResponse, type NextRequest } from "next/server";

import { NewsletterNotConfiguredError, subscribeToNewsletter } from "@/lib/newsletter/db";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  // Honeypot: real users never fill in a field named "website" that's
  // hidden via CSS -- bots filling every field will trip it.
  const honeypot = typeof body?.website === "string" ? body.website : "";
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const source = typeof body?.source === "string" ? body.source.slice(0, 100) : null;

  try {
    await subscribeToNewsletter(email, source);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof NewsletterNotConfiguredError) {
      return NextResponse.json({ error: "Newsletter signup isn't set up yet." }, { status: 503 });
    }
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
