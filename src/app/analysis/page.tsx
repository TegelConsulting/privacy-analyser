"use client"
import "../styles/analysis/AnalysisView.css"
import { getReportByUrl } from "@/app/service/reportService";;
import React, { useState } from "react"
import { ReportCard } from "@/components/analysis/ReportCard";
import { IssueRow } from "@/components/analysis/IssueRow";
import { ChartLine } from "@/components/analysis/ChartLine";
import Modal from "@/components/analysis/Modal";
import { Issue } from "@/lib/types/Issue";
import { MockData } from "@/lib/types/MockData";
import { Category } from "@/lib/types/Category";
import { Category_Label } from "@/lib/mock/sum-cat/Category_Label";
import { FilteredData } from "@/lib/types/FilteredData";
import { Summary } from "@/lib/types/Summary";

export const AnalysisView: React.FC<{id: Issue["id"], issue: Issue}> = () => {
    const [url, setUrl] = useState("https://exempel.se");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<MockData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [filter, setFilter] = useState<Category[]>([]);

    const toggleFilter = (cat: Category) => {
        setFilter(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }

    const CATEGORY_LABEL: Record<Category, string> = {
        GDPR: "GDPR",
        W3C: "W3C",
        Accessibility: "Tillgänglighet",
    };

    const SUMMARY_BY_CATEGORY = (summary: Summary): Record<Category, number> => ({
      GDPR: summary.gdpr,
      W3C: summary.w3c,
      Accessibility: summary.accessibility,
    });

    const getFiltered = (data: MockData, selected: Category[]): FilteredData => {
        const selectedOrAll: Category[] =
          selected.length ? selected : ["GDPR", "W3C", "Accessibility"];
    
        const filteredIssues = data.issues.filter(issue =>
          issue.categories.some(c => selectedOrAll.includes(c))
        );
    
        const summaryMap = SUMMARY_BY_CATEGORY(data.summary);
    
        const filteredSummaries = selectedOrAll.map(c => ({
          cat: c,
          label: CATEGORY_LABEL[c],
          value: summaryMap[c],
        }));
    
        const filteredReports = data.reports.filter(r =>
            r.tags.some(t => selectedOrAll.includes(t))
        )
    
        return { filteredIssues, filteredSummaries, filteredReports };
    };

    const filtered = data ? getFiltered(data, filter) : null;

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault();
        setLoading(true);
        setError(null); 
        
        const result = await getReportByUrl(url);

        console.log("getReportByUrl result:", result);
        

        if (!result) {
            setData(null);
            setError(`Ingen rapport hittades för ${url}`)
        } else {
            setData(result);
            setShowResult(true);
            console.log("setShowResult(true) körd");
            
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
            <section className="filter flex items-center gap-4 mt-3">
                <label className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        checked={filter.includes("GDPR")}
                        onChange={() => toggleFilter("GDPR")}
                    />
                    {Category_Label.GDPR}
                </label>
                <label className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        checked={filter.includes("W3C")}
                        onChange={() => toggleFilter("W3C")}
                    />
                    {Category_Label.W3C}
                </label>
                <label className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        checked={filter.includes("Accessibility")}
                        onChange={() => toggleFilter("Accessibility")}
                    />
                    {Category_Label.Accessibility}    
                </label>
                <button type="button" onClick={() => setFilter([])} className="text-sm underline">
                    Rensa filter
                </button>
            </section>
            {/* Modal */}
            {data && (
                <Modal open={showResult} 
                       onClose={() => setShowResult(false)}
                       title="Sammanfattning av analys" 
                >
                    <section className="bg-white p-4 border rounded">
                        <h2 className="text-xl ml-1 mb-5"><b>Url:</b> {url}</h2>
                        <section className="chart-container grid grid-cols-2 w-1/2">
                            <section className="label-container grid gap-1 font-semibold">
                               {filtered?.filteredSummaries.map(s => (
                                    <ReportCard key={s.cat} label={s.label} value={s.value}/>
                               ))}
                             </section>
                             <section className="chart grid gap-1 ml-[-45px]">
                                {filtered?.filteredIssues.map(c => (
                                    <ChartLine id={c.id} key={c.id} issue={c}/>
                                ))}
                             </section>
                             <ul className="issues list-[circle] pl-6 marker:text-gray-400 mt-4">
                                {filtered?.filteredIssues.map(i => (
                                    <IssueRow key={i.id} issue={i}/>
                                ))}
                             </ul>
                        </section>
                    </section>
                    </Modal>
            )}
            </section>
        </section>
        
    )
}
export default AnalysisView 