"use Client"

import { Issue } from "@/lib/types"
import React from "react"

export const SeverityBadge: React.FC<{ severity: Issue["severity"]}> = ({severity}) => {
    const label = 
        severity === "high"
        ? "Hög"
        : severity === "medium"
        ? "Medel"
        : "Låg"

    const color = 
        severity === "high" 
        ? "text-red-800"
        : severity === "medium"
        ? "text-yelloe-800"
        : "text-green-800"

    return (
        <span className={`${color}`}>
            {label}
        </span>
    )
}