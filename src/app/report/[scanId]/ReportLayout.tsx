"use client";

import type { ScanReport } from "@/types/report";
import { AlertTriangle, Shield, Eye, Code2 } from "lucide-react";

type ReportLayoutProps = {
  report: ScanReport;
  errorMessage?: string;
};

export default function ReportLayout({ report, errorMessage }: ReportLayoutProps) {
  const createdAt = new Date(report.createdAt).toLocaleString("sv-SE");

  const scores = [
    report.gdprScore,
    report.accessibilityScore,
    report.w3cScore,
  ].filter((s): s is number => s !== null && s !== undefined);

  const avgScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : null;

  return (
    <div className="bg-white rounded-2xl p-10 shadow-[0_18px_45px_rgba(15,23,42,0.18)] max-w-5xl mx-auto border border-slate-100">
      {/* Alert-banner (demodata / fel) */}
      {errorMessage && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex items-center justify-between gap-4">
          <span>Visar demodata just nu (kunde inte läsa riktig rapport från servern).</span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium border border-amber-200">
            Demo data
          </span>
        </div>
      )}

      {/* HEADER */}
      <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Privacy Analyser · Rapport
            </p>

            {avgScore !== null && (
              <span className="rounded-full bg-slate-900 text-slate-50 px-3 py-0.5 text-[11px] font-medium">
                Total score {avgScore}/100
              </span>
            )}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            {report.url}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>
              Titel: <span className="font-medium text-slate-700">{report.title}</span>
            </span>
            <span className="h-3 w-px bg-slate-200" />
            <span>Skapad: {createdAt}</span>
          </div>
        </div>

        <div className="text-right space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
            Laddningstid
          </p>
          <p className="text-2xl font-semibold text-slate-900">
            {(report.durationMs / 1000).toFixed(1)}s
          </p>
          <p className="text-xs text-slate-400">inkl. nätverk &amp; render</p>
        </div>
      </header>

      {/* METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <MetricCard
          label="GDPR"
          value={report.gdprScore}
          icon={Shield}
          color="red"
        />
        <MetricCard
          label="Tillgänglighet"
          value={report.accessibilityScore}
          icon={Eye}
          color="blue"
        />
        <MetricCard
          label="Kodvalidering (W3C)"
          value={report.w3cScore}
          icon={Code2}
          color="green"
        />
      </section>

      {/* ISSUES */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Identifierade problem
          </h2>
          {report.issues?.length ? (
            <p className="text-xs text-slate-400">
              Visar {report.issues.length} viktigaste bristerna
            </p>
          ) : null}
        </div>

        {!(report.issues && report.issues.length) ? (
          <p className="text-sm text-slate-500">
            Inga problem identifierades i denna scan.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {report.issues.map((issue, index) => (
              <div
                key={issue.name}
                className={`flex items-center justify-between px-6 py-4 text-sm transition hover:bg-slate-50 ${
                  index !== report.issues.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <div className="flex items-center gap-3 text-slate-800">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <AlertTriangle className="h-4 w-4" />
                  </span>
                  <span>{issue.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 uppercase tracking-wide">
                    Påverkan
                  </span>
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 border border-rose-200">
                    {issue.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AI-SUMMARY */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          AI-genererad sammanfattning
        </h2>

        <div className="relative rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-slate-900/80" />
          <p className="text-sm leading-relaxed text-slate-700 pl-3">
            Här kan ni senare visa en AI-text som sammanfattar rapporten – de
            största riskerna, vad som är mest akut att åtgärda och hur
            webbplatsen står sig mot rekommenderade nivåer. Texten kan anpassas
            efter mottagare, till exempel en kort executive summary eller en mer
            teknisk genomgång.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ------------------------- helpers & subcomponents ------------------------- */

type MetricCardProps = {
  label: string;
  value: number | null;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: "red" | "blue" | "green";
};

function MetricCard({ label, value, icon: Icon, color }: MetricCardProps) {
  const score = value ?? 0;
  const { badgeLabel, badgeClass } = getRiskBadge(score);
  const bgMap: Record<MetricCardProps["color"], string> = {
    red: "from-rose-50 to-rose-100/70",
    blue: "from-sky-50 to-sky-100/70",
    green: "from-emerald-50 to-emerald-100/70",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br p-6 shadow-sm ${bgMap[color]}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="text-4xl font-semibold text-slate-900">
            {value ?? "–"}
            <span className="text-sm text-slate-500">/100</span>
          </p>
        </div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 shadow-sm border border-white/80">
          <Icon className="h-4 w-4 text-slate-700" />
        </div>
      </div>

      <span
        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
      >
        {badgeLabel}
      </span>
    </div>
  );
}

function getRiskBadge(score: number): { badgeLabel: string; badgeClass: string } {
  // Lågt score = hög risk
  if (score < 40) {
    return {
      badgeLabel: "Hög risk – åtgärda snarast",
      badgeClass: "bg-rose-600 text-white",
    };
  }
  if (score < 70) {
    return {
      badgeLabel: "Måttlig risk – planera åtgärder",
      badgeClass: "bg-amber-500 text-white",
    };
  }
  return {
    badgeLabel: "Låg risk – uppfyller det mesta",
    badgeClass: "bg-emerald-600 text-white",
  };
}
