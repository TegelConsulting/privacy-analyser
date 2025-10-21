"use client";

import { QuickScanCard } from "@/components/dashboard/QuickScanCard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { TopIssuesCard } from "@/components/dashboard/TopIssuesCard";
import { RecentReportsCard } from "@/components/dashboard/RecentReportsCard";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Vänster kolumn */}
      <div className="lg:col-span-2 space-y-6">
        <QuickScanCard />
        <SummaryCard />
      </div>

      {/* Höger kolumn */}
      <aside className="space-y-6">
        <TopIssuesCard />
        <RecentReportsCard />
      </aside>
    </div>
  );
}
