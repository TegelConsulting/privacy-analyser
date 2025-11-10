"use Client"
import "../../app/styles/analysis/AnalysisView.css"
import React from "react";

type ReportCardProps = {
    label: string;
    value: number;
}

export const ReportCard: React.FC<ReportCardProps> = ({label, value}) => {
    return (
        <section className="reportCard pt-2">
            <label>{label}</label>
        </section>
    )
}