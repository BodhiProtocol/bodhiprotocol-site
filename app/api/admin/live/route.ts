import { NextResponse } from "next/server";
import { getLiveVisitors } from "@/lib/analytics/queries";
import { AnalyticsNotConfiguredError } from "@/lib/analytics/db";

// Gated by middleware.ts (matches /api/admin/:path*) -- only a valid admin
// session cookie reaches this handler.
export async function GET() {
  try {
    const visitors = await getLiveVisitors();
    return NextResponse.json({ visitors });
  } catch (error) {
    if (error instanceof AnalyticsNotConfiguredError) {
      return NextResponse.json({ visitors: [] });
    }
    throw error;
  }
}
