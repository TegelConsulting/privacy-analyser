import type { Issue } from "@/lib/types/Issue";
import { SeverityBadge } from "./SeverityBadge";
import "../../app/styles/analysis/Issues.css"

export const IssueRow: React.FC<{issue: Issue }> = ({issue}) => {
    return (
            <li className="issue list-item">
                <section className="issue-container">
                    <label className="font-semibold">{
                        issue.id === "i1"
                        ? "GDPR:"                    
                         : issue.id === "i2"
                        ? "W3C:"
                        : "Tillgänglighet:"
                    }</label>
                    <label>{issue.title} ·</label>
                    <label className="severity text-gray-500">
                        Allvarsnivå: <SeverityBadge severity={issue.severity}/> · {issue.percent}%
                    </label>
                </section>

            </li>
        
    )
}