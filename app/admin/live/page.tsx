import { getLiveVisitors } from "@/lib/analytics/queries";
import { AnalyticsNotConfiguredError } from "@/lib/analytics/db";
import { AdminHeader } from "@/components/admin/admin-header";
import { LiveVisitorsTable } from "@/components/admin/live-visitors-table";

export const dynamic = "force-dynamic";

export default async function AdminLivePage() {
  let notConfigured = false;
  let initialVisitors: Awaited<ReturnType<typeof getLiveVisitors>> = [];

  try {
    initialVisitors = await getLiveVisitors();
  } catch (error) {
    if (error instanceof AnalyticsNotConfiguredError) {
      notConfigured = true;
    } else {
      throw error;
    }
  }

  return (
    <>
      <AdminHeader />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-heading text-lg font-medium">Live Visitors</h2>
          <p className="text-sm text-muted-foreground">Updates every 10s</p>
        </div>

        {notConfigured ? (
          <div className="rounded-xl border border-dashed border-foreground/20 p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Analytics isn&apos;t fully connected yet.</p>
            <p className="mt-1">Set DATABASE_URL in your environment, then reload this page.</p>
          </div>
        ) : (
          <LiveVisitorsTable initialVisitors={initialVisitors} />
        )}
      </main>
    </>
  );
}
