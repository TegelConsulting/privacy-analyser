"use Client"
import { Issue } from "@/lib/types";
import "../../app/styles/analysis/ChartLine.css"

export const ChartLine: React.FC<{issue: Issue}> = ({issue}) => {
 return (
    <section className="line-container">
        <section className="line">
            <section className="content bg-blue-500 h-full" style={{width: `${issue.percent}%`}}/>
        </section>
    </section>
 )   
}