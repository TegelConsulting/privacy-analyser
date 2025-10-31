"use Client";
import { summary, issues,  reports, mockList} from "@/lib/mock";
import "../../app/styles/analysis/Report.css"
import { useParams, useSearchParams } from "next/navigation";
import { ReportProps } from "@/lib/Props";
import { useId, useRef, useState } from "react";

export function Report<T>(props: ReportProps<T>) {
    
    return (
        <section className="Report">
            
        </section>   
    )
}