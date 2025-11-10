"use client";
import { Card } from "@/components/ui/Card";
import { AlertTriangle } from "lucide-react";
import { issues } from "@/lib/mock";

export function TopIssuesCard() {
  return (
    <Card title="Top 3 issues">
      <ul className="pa-issues">
        {issues.slice(0, 3).map((i) => (
          <li key={i.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle size={14} className="text-rose-500 shrink-0" />
              <span className="truncate text-gray-700">{i.title}</span>
            </div>
            <span className="tabular-nums font-semibold text-rose-600">{i.percent}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
