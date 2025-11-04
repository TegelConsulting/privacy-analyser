import type { Issue } from "@/lib/types";
import { SeverityBadge } from "./SeverityBadge";
import "../../app/styles/analysis/Issues.css"

export const IssueRow: React.FC<{issue: Issue}> = ({issue}) => {
    return (
            <li className="issue list-item">
                <label>{issue.title}</label>
                <label className="severity text-gray-500">
                    Allvarsnivå: <SeverityBadge severity={issue.severity}/> · {issue.percent}%
                </label>
            </li>
        
    )
}