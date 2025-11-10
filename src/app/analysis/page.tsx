"use client";

import React, { useMemo, useState } from "react";
import "@/app/styles/analysis/AnalysisView.css";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { ChartLine } from "@/components/analysis/ChartLine";
import { ReportCard } from "@/components/analysis/ReportCard";
import { IssueRow } from "@/components/analysis/IssueRow";
import Modal from "@/components/analysis/Modal";
import { Loader } from "@/components/analysis/Loader";
import type { Filter_Label } from "@/lib/types/Filter_Label";
import type { ScanResult } from "@/lib/types/ScanResult";
import { FilterList } from "@/lib/mock/sum-cat/FilterLabels";
import { getReportByUrl } from "@/app/service/reportService";
import { getFiltered, ALL_FILTERS } from "@/app/functions/getFiltered";

export default function Page() {
  const [url, setUrl] = useState<string>("https://exempel.se");
  const [selected, setSelected] = useState<Filter_Label[]>([]);
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const onToggle = (f: Filter_Label) => {
    setSelected((prev) => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const selectedOrAll: Filter_Label[] = selected.length ? selected : (ALL_FILTERS as unknown as Filter_Label[]);

  const stats = scan?.stats ?? { gdpr: 0, w3c: 0, accessibility: 0 };

  const { filteredIssues, filteredSummaries } = useMemo(() => {
    if (!scan) return { filteredIssues: [], filteredSummaries: [] };
    return getFiltered(scan, selectedOrAll);
  }, [scan, selectedOrAll]);

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (!/^https?:\/\//i.test(url)) {
      setError("Ange en giltig URL som börjar med http(s)://");
      return;
    }

    setLoading(true);
    try {
      const res = await getReportByUrl(url);
      setScan(res);
      setOpen(true); // öppna modal med resultat
    } catch (err: any) {
      console.error(err);
      setScan(null);
      setError(err?.message ?? "Kunde inte hämta analys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="analysisView-container">
      <section className="analysisView">
        <header className="analysisViewHeader">
          <h1>Analys</h1>
          <p className="analysisViewDate">{new Date().toLocaleString()}</p>
        </header>

        <form onSubmit={onSubmit} className="form-container">
          <section className="input-container gap-2">
          <input
            className="urlInput bg-white rounded text-black p-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://dinsajt.se"
          />
          
          <button type="submit" className="submit bg-white text-black rounded" disabled={loading}>
            Starta analys
          </button>
          {error && <p className="errorText">{error}</p>}
          </section>
       
          <div className="label-container">
            <div className="labels">
              {(ALL_FILTERS as unknown as Filter_Label[]).map((f) => (
                <Checkbox
                  key={f}
                  checked={selected.includes(f)}
                  onChange={() => onToggle(f)}
                  label={FilterList[f]}
                />
              ))}
            </div>
            </div>
        </form>
                {loading && <Loader />} 

        {/* Modal som visar resultatet */}
        <Modal open={open} onClose={() => setOpen(false)} title="Sammanfattning av analys">
          <section className="reportResult bg-white p-2 rounded" >
            <section className="flex gap-5">
              {/* Kortsiffror */}
              <section className="reportCards ">
                {selectedOrAll.map((cat) => {
                  const item = filteredSummaries.find(s => s.cat === cat);
                  const value = item?.value ?? stats[cat] ?? 0;
                  return <ReportCard key={cat} label={FilterList[cat]} value={value}  />;
                })}
              </section>


              {/* Procentlinjer */}
              <section className="chart-container">
                {(() => {
                  const map = new Map(filteredSummaries.map(s => [s.cat, s.value]));
                  const total = Array.from(map.values()).reduce((a,b)=>a+b,0);
                  return selectedOrAll.map((cat) => {
                    const value = map.get(cat) ?? stats[cat] ?? 0;
                    const percent = value > 100 ? Math.min(100, value) : (total ? Math.round((value/total)*100) : 0);
                    return <ChartLine key={cat} cat={cat} percent={percent} />;
                 });
                })()}
              </section>
            </section>
            {/* Ärenden-lista */}
            <section className="issuesSection">
              <h3>Identifierade ärenden</h3>
              {filteredIssues.length === 0 ? (
                <p>Inga ärenden hittades för valda filter.</p>
              ) : (
                <ul className="issuesList">
                  {filteredIssues.map((it) => (
                    <li key={it.id}><IssueRow issue={it} /></li>
                  ))}
                </ul>
              )}
            </section>
          </section>
        </Modal>
      </section>
    </section>
  );
}
