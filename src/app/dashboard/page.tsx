"use client";

import IntroBanner from "@/components/dashboard/IntroBanner";
import { QuickScanCard } from "@/components/dashboard/QuickScanCard";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { TopIssuesCard } from "@/components/dashboard/TopIssuesCard";
import { RecentReportsCard } from "@/components/dashboard/RecentReportsCard";
import { AIAnalysisCard } from "@/components/dashboard/AIAnalysisCard";
import PricingCTA from "@/components/ui/PricingCTA";

export default function DashboardPage() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-6xl px-6 space-y-8">
        {/* Header / Intro – är redan ett “kort” i själva komponenten */}
        <IntroBanner />

        {/* 12-kolumners layout för resten av dashboarden */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Vänster kolumn: snabbanalys + översikt */}
          <div className="lg:col-span-8 space-y-8">
            <QuickScanCard />
            <SummaryCard />
            <AIAnalysisCard />
          </div>

          {/* Höger kolumn: abonnemang + issues + senaste rapporter */}
          <aside className="lg:col-span-4 space-y-8">
            <PricingCTA />
            <TopIssuesCard />
            <RecentReportsCard />
          </aside>
        </div>
      </div>
    </div>
  );
}
