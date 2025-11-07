"use client"
import "../styles/analysis/AnalysisView.css"
import { getReportByUrl} from "@/app/service/reportService";
import React, { useEffect, useState } from "react"
import { ReportCard } from "@/components/analysis/ReportCard";
import { IssueRow } from "@/components/analysis/IssueRow";
import { ChartLine } from "@/components/analysis/ChartLine";
import Modal from "@/components/analysis/Modal";
import { Issue } from "@/lib/types/Issue";
import { MockData } from "@/lib/types/MockData";
import { Category_Label } from "@/lib/types/Category";
import { FilteredData } from "@/lib/types/FilteredData";
import { Summary } from "@/lib/types/Summary";
import { AsyncModal } from "@/components/analysis/AsyncModal";
import { tr } from "zod/locales";

export const AnalysisView: React.FC<{id: Issue["id"], issue: Issue}> = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<MockData | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [filter, setFilter] = useState<Category_Label[]>([]);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [now, setNow] = useState(new Date());

    const toggleFilter = (cat: Category_Label) => {
        setFilter(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }

    const CategoryList: Record<Category_Label, string> = {
        GDPR: "GDPR",
        W3C: "W3C",
        Accessibility: "Tillgänglighet",
    };

    const SUMMARY_BY_CATEGORY = (summary: Summary): Record<Category_Label, number> => ({
      GDPR: summary.gdpr,
      W3C: summary.w3c,
      Accessibility: summary.accessibility,
    });

    const getFiltered = (data: MockData, selected: Category_Label[]): FilteredData => {
        const selectedOrAll: Category_Label[] =
          selected.length ? selected : ["GDPR", "W3C", "Accessibility"];
    
        const filteredIssues = data.issues.filter(issue =>
          issue.categories.some(c => selectedOrAll.includes(c))
        );
    
        const summaryMap = SUMMARY_BY_CATEGORY(data.summary);
    
        const filteredSummaries = selectedOrAll.map(c => ({
          cat: c,
          label: CategoryList[c],
          value: summaryMap[c],
        }));
    
        const filteredReports = data.reports.filter(r =>
            r.tags.some(t => selectedOrAll.includes(t))
        )
    
        return { filteredIssues, filteredSummaries, filteredReports };
    };

    const filtered = data ? getFiltered(data, filter) : null;

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault();
        setLoading(true);
        
        try {
            const trimmed = url.trim();
            
            if (!trimmed) {
                setData(null);
                setErrorMsg("Du måste ange en URL.");
                setErrorOpen(true);

                return;
            }  

            const result = await getReportByUrl(trimmed);
            console.log("getReportByUrl result:", result);
           
            if (!result) {
                setData(null);
                setErrorMsg(`Ingen rapport hittades för ${trimmed}`)
                setErrorOpen(true);
                return;
            }
            
            setData(result);
            setShowResult(true);

        } catch (err) {
            console.error(err);
            setData(null);
            setErrorMsg("Ett oväntat fel inträffade. Försök igen.")
            setErrorOpen(true);
        } finally {
            setLoading(false);
        }
    }

    return ( 
        <section className="analysisView-container">
        <section className="analysisView"> 
            <h1>Ny Analys</h1>
            <section className="formContainer">
            <form onSubmit={handleSubmit} className="analysisForm">
                {/* Testa input med "https://exempel.se" */}
                <input value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://url.se"
                        minLength={10}
                        maxLength={30}
                        type="url"
                        required
                />
                <button 
                  type="submit"
                  disabled={loading}
                  >
                    Starta analys
                  </button>
                </form>
            <AsyncModal 
                open={errorOpen}
                onClose={() => setErrorOpen(false)}
                title="Fel"
                delayMs={2000}
            >{errorMsg}</AsyncModal>
            <section className="check-container flex absoulute">
                <section className="checkboxes">    
                    <section className="labels flex absolute gap-2">
                    <label className="flex items-center gap-1">
                        <input 
                            type="checkbox" 
                            checked={filter.includes("GDPR")}
                            onChange={() => toggleFilter("GDPR")}
                        />
                        {CategoryList.GDPR}
                    </label>
                    <label className="flex items-center gap-1">
                        <input 
                            type="checkbox" 
                            checked={filter.includes("W3C")}
                            onChange={() => toggleFilter("W3C")}
                        />
                        {CategoryList.W3C}
                    </label>
                    <label className="flex items-center gap-1">
                        <input 
                            type="checkbox" 
                            checked={filter.includes("Accessibility")}
                            onChange={() => toggleFilter("Accessibility")}
                        />
                        {CategoryList.Accessibility}    
                    </label>
                    <button type="button" onClick={() => setFilter([])} className="clear-btn text-sm underline">
                        Rensa filter
                    </button>
                    </section>
                </section>
            </section>
          
            </section>
            {/* Modal */}
            {data && (
                <AsyncModal open={showResult} 
                       onClose={() => setShowResult(false)}
                       title="Sammanfattning av analys"
                       delayMs={2000} 
                >
                    <section className="bg-white p-4 border rounded">
                        <h2 className="url text-xl mb-5"><b>Url:</b> {url}</h2>
                       <section className="chart-container">
                            <section className="flex gap-15">
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
                             </section>
                             <ul className="issues list-[circle] pl-6 marker:text-gray-400 mt-4 mb-4">
                                {filtered?.filteredIssues.map(i => (
                                    <IssueRow key={i.id} issue={i}/>
                                ))}
                             </ul>
                        </section>
                        <p>Hämtad: {now.toISOString().slice(0, 10)} {now.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}</p>
 
                    </section>
                    </AsyncModal>
            )}
            </section>
        </section>
        
    )
}
export default AnalysisView 