"use client";

import React, { useState } from "react";
import { ChartLine } from "./ChartLine";
import { Filter_Label } from "@/lib/types/Filter_Label";

type ScanResultMock = {
  stats: { gdpr: number; w3c: number; accessibility: number }; // 0–100
};

const ALL: Filter_Label[] = ["gdpr", "w3c", "accessibility"];

export default function ChartDemo() {
  // MOCK: byt mot ditt riktiga API-svar när det finns
  const [scan] = useState<ScanResultMock>({
    stats: { gdpr: 45, w3c: 20, accessibility: 90 },
  });

  return (
    <section className="space-y-3">
      {ALL.map((cat) => (
        <ChartLine key={cat} cat={cat} percent={scan.stats[cat]} />
      ))}
    </section>
  );
}
