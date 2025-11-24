// lib/mock/sum-cat/buildSummary.ts
import type { SummaryStr } from "@/lib/types/Filter/Category";
import type { ScanResult } from "@/lib/types/ScanResult";

type Keys = "gdpr" | "w3c" | "accessibility";

export function buildSummary(scan: ScanResult): SummaryStr<Keys> {
  const s = scan?.stats ?? {};
  const gdpr = Number(s.gdpr ?? 0);
  const w3c = Number(s.w3c ?? 0);
  const accessibility = Number(s.accessibility ?? 0);
  return { gdpr: String(gdpr), w3c: String(w3c), accessibility: String(accessibility) };
}
