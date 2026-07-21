import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSessionToken, verifyAdminPassword } from "@/lib/auth/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  const valid = password.length > 0 && (await verifyAdminPassword(password));
  if (!valid) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "ADMIN_SESSION_SECRET is not set on the server" },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
