"use Client"
import { Issue } from "@/lib/types/Issue"
import "../../app/styles/analysis/ChartLine.css"

export const ChartLine: React.FC<{id: Issue["id"], issue: Issue}> = ({id, issue}) => {
    const background =
       id === "i2"
       ? "bg-[#34D399]"
       : id === "i1"
       ? "bg-[#F87171]"
       : id === "i3" 
       ? "bg-[#60A5FA]"
       : "" 

    return (
    <section className="line-container flex">
        <section className="line rounded-md border mr-2">
            <section className={`${background} content h-full rounded border`} style={{width: issue.percent}}/>
        </section>
        <label className="font-semibold">{issue.percent}%</label>    </section>
 )   
}