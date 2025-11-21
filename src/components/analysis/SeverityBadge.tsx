"use Client"
import React from "react"


export const SeverityBadge: React.FC<{ severity: "low" | "medium" | "high" }> = ({ severity }) => {
  const cls =
    severity === "high"
      ? "bg-red-100 text-red-800 border-red-300"
      : severity === "medium"
      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
      : "bg-green-100 text-green-800 border-green-300";
  return (
    <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {severity}
    </span>
  );
};
