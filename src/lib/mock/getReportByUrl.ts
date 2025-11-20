// lib/api/getReportByUrl.ts
import type { ScanResult } from "@/lib/types/ScanResult";
import { normalizeScanResult } from "../../../utils/normalizeScanResult"; 

export async function getReportByUrl(targetUrl: string): Promise<ScanResult> {
  const res = await fetch(`/api/scan?url=${encodeURIComponent(targetUrl)}`);
  if (!res.ok) throw new Error(`Scan misslyckades (${res.status})`);
  const raw = (await res.json()) as Partial<ScanResult> | null;
  return normalizeScanResult(raw, targetUrl);
}
