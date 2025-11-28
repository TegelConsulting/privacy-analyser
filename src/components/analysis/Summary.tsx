"use client";

import React, { useMemo } from "react";
import { ALL_FILTERS, getFiltered } from "@/app/functions/getFiltered";
import type { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import type { NormalizeScanResult } from "../../../utils/normalizeScanResult";
import { ReportCard } from "./ReportCard";
import { FilterList } from "@/lib/mock/sum-cat/FilterLabels";
import { ChartLine } from "./ChartLine";
import { IssueRow } from "./IssueRow";
import { isValidUrl } from "@/app/functions/isValidUrl";
import { useAppStore } from "@/hooks/useAppStore";

type SummaryProps = {
  scan: NormalizeScanResult | null;
  selected: Filter_Label[];
  onSelectedChange: (next: Filter_Label[]) => void;
};

export const Summary: React.FC<SummaryProps> = ({
  scan,
  selected,
  onSelectedChange,
}) => {
  const { targetUrl } = useAppStore();

  const selectedOrAll: readonly Filter_Label[] =
    selected.length > 0 ? selected : (ALL_FILTERS as readonly Filter_Label[]);

  // ✅ stats är redan normaliserade (gdpr/w3c/accessibility som number)
  const stats =
    scan?.stats ?? { gdpr: 0, w3c: 0, accessibility: 0 };

  const { filteredIssues, filteredSummaries } = useMemo(() => {
    if (!scan) return { filteredIssues: [], filteredSummaries: [] };
    return getFiltered(scan, selectedOrAll);
  }, [scan, selectedOrAll]);

  console.log("SUMMARY debug", {
    scan,
    stats,
    filteredSummaries,
    filteredIssues,
    selectedOrAll,
  });

  return (
    <section className="flex flex-col bg-white p-2 rounded gap-4">
      {/* URL-rad */}
      <p className="text-m font-semibold text-slate-600">
        URL:{" "}
        <span
          className={
            !isValidUrl(targetUrl)
              ? "text-red-600"
              : "text-slate-800"
          }
        >
          {targetUrl || "- ingen URL vald"}
        </span>
      </p>

      <section className="flex gap-5">
        {/* Kortsiffror */}
        <section className="reportCards">
          {selectedOrAll.map((cat) => {
            const item = filteredSummaries.find((s) => s.cat === cat);
            const value = item?.value ?? stats[cat] ?? 0; // 👈 lowercase funkar här

            return (
              <ReportCard
                key={cat}
                label={FilterList[cat]}
                value={value}
              />
            );
          })}
        </section>

        {/* Procentlinjer */}
        <section className="chart-container">
          {(() => {
            const map = new Map(
              filteredSummaries.map((s) => [s.cat, s.value])
            );
            const total = Array.from(map.values()).reduce(
              (a, b) => a + b,
              0
            );

            return selectedOrAll.map((cat) => {
              const value = map.get(cat) ?? stats[cat] ?? 0;
              const percent =
                value > 100
                  ? Math.min(100, value)
                  : total
                  ? Math.round((value / total) * 100)
                  : 0;

              return (
                <ChartLine key={cat} cat={cat} percent={percent} />
              );
            });
          })()}
        </section>
      </section>

      {/* Ärenden-lista */}
      <section className="issuesSection">
        <h3 className="text-xl font-semibold">
          Identifierade ärenden
        </h3>
        {filteredIssues.length === 0 ? (
          <p>Inga ärenden hittades för valda filter.</p>
        ) : (
          <ul className="issuesList">
            {filteredIssues.map((it) => (
              <IssueRow key={it.id} issue={it} />
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};
