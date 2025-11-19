import { FilterList } from "@/lib/mock/sum-cat/FilterLabels";
import type { Filter_Label } from "@/lib/types/Filter_Label";
import { IssueAdapter } from "@/lib/types/IssueAdapter";
import { SeverityBadge } from "./SeverityBadge";

export const IssueRow: React.FC<{ issue: IssueAdapter }> = ({ issue }) => {
  // Ta första kategorin, fall back till "gdpr"
  const cat: Filter_Label = (issue.categories?.[0] as Filter_Label) ?? "gdpr";
  const prefix = FilterList[cat] ?? cat.toUpperCase();

  // Basvärde: föredra value -> score -> 0
  const base =
    typeof issue.value === "number"
      ? issue.value
      : typeof issue.score === "number"
      ? issue.score
      : 0;

  // Severity: använd befintlig, annars trösklar på basvärdet
  const severity: "low" | "medium" | "high" =
    issue.severity ?? (base >= 10 ? "high" : base >= 5 ? "medium" : "low");

  // Höger-mått: om percent finns, visa procent; annars basvärde i "st"
  const rightMetric =
    typeof issue.percent === "number" ? `${issue.percent}%` : `${base} st`;

  return (
    <li className="issue list-item p-1">
      <section className="issue-container flex flex-wrap items-center gap-2">
        <label className="font-semibold">{prefix}</label>
        <label>{issue.title} ·</label>
        <label className="severity text-gray-500">
          Allvarsnivå: <SeverityBadge severity={severity} /> · {rightMetric}
        </label>
      </section>
    </li>
  );
};
