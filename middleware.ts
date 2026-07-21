import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/auth/admin";

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login", "/api/admin/login"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = await verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);

  if (!PUBLIC_ADMIN_PATHS.has(pathname)) {
    if (!isAuthed) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      return withNoIndex(NextResponse.redirect(loginUrl));
    }
  } else if (pathname === "/admin/login" && isAuthed) {
    return withNoIndex(NextResponse.redirect(new URL("/admin", request.url)));
  }

  return withNoIndex(NextResponse.next());
}

// Belt-and-suspenders alongside the /admin, /api disallow rules in robots.ts --
// a header-level noindex survives even if a crawler ignores robots.txt.
function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
