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
    <div className="bg-white text-slate-900 min-h-screen pt-20 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Topp: logga + infobox */}
        <IntroBanner />

        {/* 12-kolumners grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Vänster 8 kol */}
          <div className="lg:col-span-8 space-y-6">
            {/* Lägg INTE extra border/padding här om dina komponenter redan har card-stil */}
            <QuickScanCard />
            <SummaryCard />
            <AIAnalysisCard />
          </div>

          {/* Höger 4 kol */}
          <aside className="lg:col-span-4 space-y-6">
            {/* INTE h-full här – annars blir det en gigantisk låda */}
            <PricingCTA />
            <TopIssuesCard />
            <RecentReportsCard />
          </aside>
        </div>
      </div>
    </div>
  );
}
