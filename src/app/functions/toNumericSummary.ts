import type { Category_Label, SummaryNum, SummaryStr } from "@/lib/types/Filter/Category";

// Generisk sträng→nummer-konverterare som bevarar nycklarna
export const toNumericSummary = <K extends Category_Label>(
  s: SummaryStr<K>
): SummaryNum<K> => {
  const out = {} as SummaryNum<K>;
  (Object.keys(s) as K[]).forEach((k) => {
    out[k] = Number(s[k]) || 0;
  });
  return out;
};
