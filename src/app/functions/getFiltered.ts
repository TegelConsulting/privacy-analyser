import { FilterList } from "@/lib/mock/sum-cat/FilterLabels";
import { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import { IssueAdapter } from "@/lib/types/Result/IssueAdapter";
import { NormalizeScanResult } from "../../../utils/normalizeScanResult";

export const ALL_FILTERS = ["gdpr","w3c","accessibility"] as const;


export function getFiltered(
  scan: NormalizeScanResult | null, 
  selected: readonly Filter_Label[]) {
 
    const selectedOrAll: readonly Filter_Label[] = 
      selected.length ? selected : ALL_FILTERS;

    // summaries
  if (!scan || !scan.stats) {
    const filteredSummaries = selectedOrAll.map((c) => ({
      cat: c,
      label: FilterList[c],
      value: 0,
    }));

    return {
      filteredIssues: [],
      filteredSummaries
    }
  }

  const filteredSummaries = selectedOrAll.map((c) => ({
      cat: c,
      label: FilterList[c],
      value: scan.stats[c] ?? 0,
   }));


  // issues (demo: make an issue per nonzero)
  const issues: IssueAdapter[] = ALL_FILTERS.flatMap((c) => {
    const score = scan.stats[c] ?? 0;
    
    return score > 0
      ? [
        { 
          id: `${scan.id}-${c}`, 
          title: FilterList[c], 
          categories: [c], 
          score: score 
        },
      ]
      : []
    }
  );

  const filteredIssues = issues.filter((it) =>
    it.categories.some((c) => selectedOrAll.includes(c))
  );

  return { filteredIssues, filteredSummaries };
}

