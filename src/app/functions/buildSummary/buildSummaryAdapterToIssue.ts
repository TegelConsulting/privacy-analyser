import { Issue } from "@/lib/types";
import { IssueAdapter } from "@/lib/types/Result/IssueAdapter";

export function buildSummaryAdapterToIssue(src: IssueAdapter): Issue {
    return {
        id: src.id,
        title: src.title,
        percent: src.percent ?? 0,
        severity: src.severity ?? "low",
    }
}