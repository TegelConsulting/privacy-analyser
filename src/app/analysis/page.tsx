"use client"
import "../styles/analysis/AnalysisView.css"
import { getReportByUrl } from "@/app/service/reportService";
import { MockData } from "@/lib/types";
import React, { useState } from "react"
import { Loader } from "@/components/analysis/Loader";
import { ReportCard } from "@/components/analysis/ReportCard";
import { da } from "zod/locales";
import { IssueRow } from "@/components/analysis/IssueRow";
import { ChartLine } from "@/components/analysis/ChartLine";
import Modal from "@/components/analysis/Modal";


export const AnalysisView: React.FC = () => {
    const [url, setUrl] = useState("https://exempel.se");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<MockData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);

    async function handleSubmit(e: React.FormEvent) { 
        e.preventDefault();
        setLoading(true);
        setError(null); 
        
        const result = await getReportByUrl(url);

        if (!result) {
            setData(null);
            setError(`Ingen rapport hittades för ${url}`)
        } else {
            setData(result);
            setShowResult(true);
        }
        setLoading(false)
    }

    return ( 
        <section className="analysisView"> 
            <h1>Ny Analys</h1>
            <section className="formContainer">
            <form onSubmit={handleSubmit} className="analysisForm">
                <input value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://url.se"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  >
                    Starta analys
                  </button>
                   </form>
            {error && (
                <p>{error}</p>
            )}

            {data && (
                <section className="Overview">
                        <h2 className="text-black">Sammanfattning av analys</h2>
    
                        <section className="chart-container">
                            <section className="label-container">
                                <ReportCard label="GDPR" value={data.summary.gdpr}/>
                                <ReportCard label="W3C" value={data.summary.w3c}/>
                                <ReportCard label="Tillgänglighet" value={data.summary.accessibility}/>
                            </section>
                            <section className="chart">
                                {data.issues.map((c) => 
                                    <ChartLine key={c.id} issue={c}/>)}
                            </section>
                        </section>
                        <ul className="issues list-[circle] pl-6 marker:text-gray-400">
                            {data.issues.map((i) => (
                                <IssueRow key={i.id} issue={i}/>
                            ))}
                        </ul>
                    </section>
            )}
            </section>
        </section>
    )
}
export default AnalysisView