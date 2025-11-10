import type { SummaryNum } from "@/lib/types/Category";
import type { IssueAdapter } from "@/lib/types/IssueAdapter";

export function toIssueFromSummary(
  host: string,
  s: SummaryNum<"gdpr" | "w3c" | "accessibility">
): IssueAdapter[] {
  const out: IssueAdapter[] = [];
  if (s.gdpr > 0) out.push({ id: `${host}-gdpr`, title: "GDPR", categories: ["gdpr"], value: s.gdpr });
  if (s.w3c > 0) out.push({ id: `${host}-w3c`, title: "W3C", categories: ["w3c"], value: s.w3c });
  if (s.accessibility > 0) out.push({
    id: `${host}-accessibility`,
    title: "Accessibility",
    categories: ["accessibility"],
    value: s.accessibility,
  });
  return out;
}
