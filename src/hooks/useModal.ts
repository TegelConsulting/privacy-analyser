// useAnalysisForm.ts
"use client";
import { useState, useMemo } from "react";
import type { ScanResult } from "@/lib/types/Result/ScanResult";
import { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import { ALL_FILTERS, getFiltered } from "@/app/functions/getFiltered";
import { useAppStore } from "./useAppStore";
import { getReportByUrl } from "@/app/service/reportService";

export function useModal() {
  const { targetUrl, setTargetUrl } = useAppStore();
  const [selected, setSelected] = useState<Filter_Label[]>([]);
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const onToggle = (f: Filter_Label) => {
    setSelected(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );
  };

  const selectedOrAll: Filter_Label[] = selected.length
    ? selected
    : (ALL_FILTERS as unknown as Filter_Label[]);

  const stats = scan?.stats ?? { gdpr: 0, w3c: 0, accessibility: 0 };

  const { filteredIssues, filteredSummaries } = useMemo(() => {
    if (!scan) return { filteredIssues: [], filteredSummaries: [] };
    return getFiltered(scan, selectedOrAll);
  }, [scan, selectedOrAll]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);

    if (!/^https?:\/\//i.test(targetUrl)) {
      setError("Ange en giltig URL som börjar med http(s)://");
      return;
    }

    try {
      setLoading(true);
      const res = await getReportByUrl(targetUrl);
      setScan(res);
      setOpen(true);
    } catch (err: any) {
      console.error(err);
      setScan(null);
      setError(err?.message ?? "Kunde inte hämta analys.");
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
    scan,
    stats,
    filteredIssues,
    filteredSummaries,

    // UI state
    loading,
    error,
    open,
    setOpen,
  };
}
