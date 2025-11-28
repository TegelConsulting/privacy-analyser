// lib/api/getReportByUrl.ts
import type { ScanResult } from "@/lib/types/Result/ScanResult";
import { normalizeScanResult } from "../../../utils/normalizeScanResult";

export async function getReportByUrl(targetUrl: string): Promise<ScanResult> {
  const res = await fetch(`/api/scan?url=${encodeURIComponent(targetUrl)}`);
  if (!res.ok) throw new Error(`Scan misslyckades (${res.status})`);
  const raw = (await res.json()) as ScanResult;
  return normalizeScanResult(raw);
}
