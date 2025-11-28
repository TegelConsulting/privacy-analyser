"use client";

import { useAppStore } from "@/hooks/useAppStore";
import { Summary } from "../analysis/Summary";
import { useEffect, useState } from "react";
import { ScanResult } from "@/lib/types/Result/ScanResult";
import { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import { ALL_FILTERS } from "@/app/functions/getFiltered";
import { getReportByUrl } from "@/app/service/reportService";

type ScanStatusProps = {
    className: string;
}

export const ScanStatus = ({className}: ScanStatusProps) => {
    const { scan, scanCount, pendingCount, successCount, failCount, scannedUrl} = useAppStore();
    const [scanResult, setScanResult] = useState<ScanResult| null>(null);

    if (!scanResult) {
         return ( 
            <section className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className ?? ""}`}>
                <h2 className="text-lg font-semibold mb-2">Skanningstatus</h2>
                {scan.status === "pending" && (
                    <p className="text-sm text-amber-700 mb-2">Skanning pågår...</p>
                )}
                
                {scan.status === "failed" && (
                    <p className="text-sm text-slate-600">
                        Skanning för "{scannedUrl}" misslyckades
                    </p>
                )}
                
                {scan.status === "completed" && (
                    <p className="text-sm text-green-700">
                        Skanning för "{scannedUrl}" lyckades
                    </p>
                )}
                
                {scan.status === "idle" && (
                    <p className="text-sm text-slate-600">
                        Ingen aktiv skanning just nu.
                    </p>  
                )}

                <p className="text-xs text-slate-500 mt-2">Lyckade skanningar {successCount}</p>
                <p className="text-xs text-slate-500 mt-2">Väntande skanningar: {pendingCount}</p>
                <p className="text-xs text-slate-600 mt-2">Misslyckade skanningar: {failCount}</p>
                <p className="text-xs text-slate-500 mt-2">
                   Totalt antal skanningar: {scanCount}
                   
                </p>     
            </section>
         )
    } 

    useEffect(() => {
        const stored = localStorage.getItem("scan");

        if (stored) {
            setScanResult(JSON.parse(stored))
        }
    }, []);


    return (
               <section className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm ${className ?? ""}`}>
            <h2 className="text-lg font-semibold mb-2">Skanningstatus</h2>
            
            {scan.status === "pending" && (
                <p className="text-sm text-amber-700 mb-2">Skanning pågår...</p>
            )} 
            {scan.status === "failed" && (
              <p className="text-sm text-slate-600">
                Skanning för "{scannedUrl}" misslyckades
                               </p>
            )}
            
            {scan.status !== "pending" && scan.status !== "failed" && (
               <p className="text-sm text-slate-600">Ingen aktiv skanning just nu.</p>        
            )}
            <p className="text-sm text-slate-500 mt-2">
               Totalt antal skanningar: {scanCount}
            </p>     
            
        </section>
 
    )

}