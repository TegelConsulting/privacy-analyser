export const ALL_FILTERS = ["gdpr","w3c","accessibility"] as const;
import { FilterList } from "@/lib/mock/sum-cat/FilterLabels";
import { Filter_Label } from "@/lib/types/Filter_Label";
import { IssueAdapter } from "@/lib/types/IssueAdapter";
import { ScanResult } from "@/lib/types/ScanResult";


export function getFiltered(scan: ScanResult, selected: Filter_Label[]) {
  const selectedOrAll = selected.length ? selected : ALL_FILTERS;

  // summaries
  const filteredSummaries = selectedOrAll.map((c) => ({
    cat: c,
    label: FilterList[c],
    value: scan.stats[c] ?? 0,
  }));

  // issues (demo: make an issue per nonzero)
  const issues: IssueAdapter[] = ALL_FILTERS.flatMap((c) =>
    scan.stats[c] > 0
      ? [{ id: `${scan.id}-${c}`, title: FilterList[c], categories: [c], score: scan.stats[c] }]
      : []
  );

  const filteredIssues = issues.filter((it) =>
    it.categories.some((c) => selectedOrAll.includes(c))
  );

  return { filteredIssues, filteredSummaries };
}

