"use client";
import { useState, useMemo } from "react";
import type { ScanResult } from "@/lib/types/Result/ScanResult";
import { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import { ALL_FILTERS, getFiltered } from "@/app/functions/getFiltered";
import { useAppStore } from "./useAppStore";
import { getReportByUrl } from "@/app/service/reportService";
import { normalizeScanResult,  type NormalizeScanResult } from "../../utils/normalizeScanResult";
import { buildSummaryFromStats } from "@/app/functions/buildSummary/buildSummaryFromStats";
import { mockScans } from "@/lib/mock/mockList";

type ScanStatus = "idle"  | "pending" | "completed" | "failed";

export function useModal() {
  const { targetUrl, 
          setTargetUrl,
          scan,
          startScan,
          setScanSuccess,
          setScanError,
          resetScan 
        } = useAppStore();
  const [selected, setSelected] = useState<Filter_Label[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult[]>([]);

  console.log("MODAL props", {
  scan,
  issues: scan?.result?.issues,
  stats: scan?.result?.stats,
});

  const status: ScanStatus = scan.status as ScanStatus;

  const normalizedScan = useMemo<NormalizeScanResult | null>(() => {
    if (!scan.result) return null;
    return normalizeScanResult(scan.result);
  }, [scan.result])


  const onToggle = (f: Filter_Label) => {
    setSelected(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    ); 
  };

  
  const selectedOrAll: readonly Filter_Label[] = 
     selected.length ? selected
    : ALL_FILTERS ;


  const stats = 
    normalizedScan?.stats ?? { gdpr: 0, w3c: 0, accessibility: 0 };

  const summary = buildSummaryFromStats(stats);

  const { filteredIssues, filteredSummaries } = useMemo(() => {
    if (!normalizeScanResult) {
       return { filteredIssues: [], filteredSummaries: [] };
    }

    return getFiltered(normalizedScan, selectedOrAll);
  }, [normalizedScan, selectedOrAll]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (!/^https?:\/\//i.test(targetUrl)) {
      setError("Ange en giltig URL som börjar med http(s)://");
      resetScan();
      return;
    }

    try {
      startScan();
      setLoading(true);

      const res: ScanResult = await getReportByUrl(targetUrl);

      let finalResult: ScanResult = res;

      if (res.scanStatus === "failed" || !res.stats) {
        const mock = mockScans.find((m) => m.url === targetUrl)

        if (mock) {
          finalResult = {
            ...mock,
            scanStatus: "completed",
            error: null,
          }
        }
      }
      
      console.log("Final result to modal", finalResult);
      
      setScanSuccess(finalResult);
      setOpen(true);
    } catch (err: any) {
      console.error(err);

      const msg = err?.message ?? "Kunde inte hämta analys";

      setScanError(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    // form
    targetUrl,
    setTargetUrl,
    onSubmit,

    // filter
    selected,
    onToggle,
    selectedOrAll,

    // data
    stats,
    filteredIssues,
    filteredSummaries,

    // UI state
    loading,
    error,
    open,
    setOpen,
    status,
    summary
  };
}
