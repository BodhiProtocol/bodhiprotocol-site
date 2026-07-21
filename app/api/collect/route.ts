import { NextResponse, type NextRequest } from "next/server";
import { recordPageview, recordHeartbeat } from "@/lib/analytics/ingest";
import { markSessionLive } from "@/lib/analytics/kv";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth/admin";

const VISITOR_COOKIE = "bp_vid";
const SESSION_COOKIE = "bp_sid";
const SESSION_MAX_AGE_SECONDS = 30 * 60; // sliding 30-minute idle timeout
const VISITOR_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const BOT_UA_PATTERN = /bot|spider|crawl|slurp|facebookexternalhit|preview|lighthouse|headless/i;

/**
 * First-party beacon endpoint the site's own pages call -- not a documented public
 * API. Silently no-ops (204, no body) for admins, bots, and misconfigured/missing
 * backends so a tracking hiccup can never affect what a real visitor sees.
 */
export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminSessionToken(
    request.cookies.get(ADMIN_COOKIE_NAME)?.value,
  );
  const userAgent = request.headers.get("user-agent");
  if (isAdmin || !userAgent || BOT_UA_PATTERN.test(userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.type !== "string") {
    return new NextResponse(null, { status: 204 });
  }

  try {
    if (body.type === "pageview") {
      if (typeof body.path !== "string") return new NextResponse(null, { status: 204 });

      const result = await recordPageview({
        visitorIdCookie: request.cookies.get(VISITOR_COOKIE)?.value ?? null,
        sessionIdCookie: request.cookies.get(SESSION_COOKIE)?.value ?? null,
        path: body.path,
        referrerRaw: typeof body.referrer === "string" ? body.referrer : null,
        screenSize: typeof body.screenSize === "string" ? body.screenSize : null,
        requestHost: request.headers.get("host") ?? "",
        userAgent,
        headers: request.headers,
      });

      await markSessionLive(result.sessionId, {
        path: body.path,
        country: request.headers.get("x-vercel-ip-country"),
      }).catch(() => undefined);

      const response = NextResponse.json({ pageViewId: result.pageViewId });
      setCookie(response, VISITOR_COOKIE, result.visitorId, VISITOR_MAX_AGE_SECONDS);
      setCookie(response, SESSION_COOKIE, result.sessionId, SESSION_MAX_AGE_SECONDS);
      return response;
    }

    if (body.type === "heartbeat") {
      const sessionId = request.cookies.get(SESSION_COOKIE)?.value;
      if (!sessionId || typeof body.pageViewId !== "string") {
        return new NextResponse(null, { status: 204 });
      }

      await recordHeartbeat({
        sessionId,
        pageViewId: body.pageViewId,
        scrollDepth: typeof body.scrollDepth === "number" ? body.scrollDepth : 0,
      });
      await markSessionLive(sessionId, {
        path: typeof body.path === "string" ? body.path : "",
        country: request.headers.get("x-vercel-ip-country"),
      }).catch(() => undefined);

      const response = new NextResponse(null, { status: 204 });
      setCookie(response, SESSION_COOKIE, sessionId, SESSION_MAX_AGE_SECONDS);
      return response;
    }
  } catch {
    // Analytics not configured yet (no DATABASE_URL) or a transient DB error --
    // never let this surface to a real visitor.
    return new NextResponse(null, { status: 204 });
  }

  return new NextResponse(null, { status: 204 });
}

function setCookie(response: NextResponse, name: string, value: string, maxAgeSeconds: number) {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}
