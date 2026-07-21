import { getDashboardStats, type DashboardStats } from "@/lib/analytics/queries";
import { getLiveCount, AnalyticsKvNotConfiguredError } from "@/lib/analytics/kv";
import { AnalyticsNotConfiguredError } from "@/lib/analytics/db";
import { REFERRER_LABELS } from "@/lib/analytics/referrer";
import { formatDuration } from "@/lib/analytics/format";
import { StatCard } from "@/components/admin/stat-card";
import { AdminHeader } from "@/components/admin/admin-header";

// The dashboard reads live data on every request -- never statically cached.
export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  let stats: DashboardStats | null = null;
  let liveCount: number | null = null;
  const setupNeeded: string[] = [];

  try {
    stats = await getDashboardStats();
  } catch (error) {
    if (error instanceof AnalyticsNotConfiguredError) {
      setupNeeded.push("DATABASE_URL");
    } else {
      throw error;
    }
  }

  try {
    liveCount = await getLiveCount();
  } catch (error) {
    if (error instanceof AnalyticsKvNotConfiguredError) {
      setupNeeded.push("KV_REST_API_URL / KV_REST_API_TOKEN");
    } else {
      throw error;
    }
  }

  return (
    <>
      <AdminHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {setupNeeded.length > 0 && (
          <div className="mb-8 rounded-xl border border-dashed border-foreground/20 p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Analytics isn&apos;t fully connected yet.</p>
            <p className="mt-1">
              Set {setupNeeded.join(" and ")} in your environment, then reload this page.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Visitors Today"
            value={stats ? String(stats.visitorsToday) : "—"}
            delay={0}
          />
          <StatCard
            label="Visitors Online"
            value={liveCount != null ? String(liveCount) : "—"}
            delay={1}
          />
          <StatCard
            label="Weekly Visitors"
            value={stats ? String(stats.visitorsWeek) : "—"}
            subtitle="Last 7 days"
            delay={2}
          />
          <StatCard
            label="Monthly Visitors"
            value={stats ? String(stats.visitorsMonth) : "—"}
            subtitle="Last 30 days"
            delay={3}
          />
          <StatCard
            label="Average Reading Time"
            value={stats ? formatDuration(stats.avgReadingTimeMs) : "—"}
            delay={4}
          />
          <StatCard
            label="Bounce Rate"
            value={stats?.bounceRatePct != null ? `${stats.bounceRatePct}%` : "—"}
            delay={5}
          />
          <StatCard
            label="Top Article"
            value={stats?.topArticle?.title ?? "No data yet"}
            subtitle={stats?.topArticle ? `${stats.topArticle.views} views` : undefined}
            delay={6}
          />
          <StatCard
            label="Top Learning Path"
            value={stats?.topLearningPath?.title ?? "No data yet"}
            subtitle={stats?.topLearningPath ? `${stats.topLearningPath.views} views` : undefined}
            delay={7}
          />
          <StatCard
            label="Top Country"
            value={stats?.topCountry?.name ?? "No data yet"}
            subtitle={stats?.topCountry ? `${stats.topCountry.visitors} visitors` : undefined}
            delay={8}
          />
          <StatCard
            label="Top Referrer"
            value={
              stats?.topReferrer
                ? REFERRER_LABELS[stats.topReferrer.source]
                : "No data yet"
            }
            subtitle={stats?.topReferrer ? `${stats.topReferrer.count} sessions` : undefined}
            delay={9}
          />
        </div>
      </main>
    </>
  );
}
