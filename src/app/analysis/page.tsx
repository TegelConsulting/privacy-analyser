"use client"
import { Loader } from "@/components/analysis/Loader"
import "../styles/analysis/AnalysisView.css"
import { useState } from "react"
import { mockList, reports } from "@/lib/mock"
import { section } from "framer-motion/client"
import { mockData } from "@/lib/types"
import { useParams, usePathname, useSearchParams } from "next/navigation"


export const AnalysisView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");    
    const [result, setResult] = useState<mockData>()
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useParams();


    const getReport = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathName} ? ${params.toString()}}`);
    }

    return ( 
        <section className="analysisView">
            <h1>Ny Analys</h1>
            <section className="formContainer">
                <form className="analysisForm">
                    <input type="text" placeholder="Analysera url" value={value} onChange={(e) => getReport(e.target.value)} />
                    <button>Starta Analys</button>
                </form>
                <section className="checkboxes">
                    <section>
                        <input type="checkbox"/>
                        <label>GDPR</label>
                    </section>
                    <section>
                        <input type="checkbox"/>
                        <label>W3C</label>
                    </section>
                    <section>
                        <input type="checkbox"/>
                        <label>Accessabillity</label>
                    </section>
                </section>
            </section>
            {isLoading && (
                <section>
                    <Loader/>                
                </section>
            )}
            
        </section>       
    )
        }

export default AnalysisView









