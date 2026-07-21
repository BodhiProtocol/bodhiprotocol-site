import type { Metadata } from "next";

// Belt-and-suspenders alongside middleware.ts's X-Robots-Tag header and the
// /admin disallow rule in robots.ts.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
