"use client";

import React from "react";
import { Filter_Label } from "@/lib/types/Filter_Label";
import { FilterList } from "@/lib/mock/sum-cat/FilterLabels";
import "../../app/styles/analysis/ChartLine.css";

type Props = {
  cat: Filter_Label;     // "gdpr" | "w3c" | "accessibility"
  percent: number;       // 0–100
};

export const ChartLine: React.FC<Props> = ({ cat, percent }) => {
  const background =
    cat === "gdpr" ? "bg-[#F87171]"
    : cat === "w3c" ? "bg-[#34D399]"
    : /* accessibility */  "bg-[#60A5FA]";

  // skydda UI om procent blir konstig
  const pct = Math.max(0, Math.min(100, Number.isFinite(percent) ? percent : 0));

  return (
    <section className="line-container flex items-center gap-3 pt-2">
     
      <section className="line flex-1 rounded-md border relative h-6 overflow-hidden">
        <section
          className={`${background} content h-full rounded`}
          style={{ width: `${pct}%` }}
        />
      </section>
        <label className="right-2 text-xs">
          {pct}%
        </label>
   
    </section>
  );
};
