"use client"
import { Loader } from "@/components/analysis/Loader"
import "../styles/analysis/AnalysisView.css"
import { useState } from "react"

export const AnalysisView = () => {
    const [isLoading, setIsLoading] = useState(false)
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
    }

    return ( 
        <section className="analysisView">
            <h1>Ny Analys</h1>
            <section className="formContainer">
                <form className="analysisForm">
                    <input type="text" placeholder="Analysera url" />
                    <button onClick={handleSubmit}>Starta Analys</button>
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