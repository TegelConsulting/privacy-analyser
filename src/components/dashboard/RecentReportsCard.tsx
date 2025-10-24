"use client";
import { Card } from "@/components/ui/Card";
import { Download } from "lucide-react";
import { reports } from "@/lib/mock";

function domainOf(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}

export function RecentReportsCard() {
  const items = reports.slice(0, 3);

  return (
    <Card title="Senaste rapporter">
      <ul className="pa-compact-list pa-compact-divider">
        {items.map((r) => (
          <li key={r.url} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-medium text-gray-900 truncate">{domainOf(r.url)}</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {r.tags.map((t: string) => (
                  <span key={t} className="pa-chip">{t}</span>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-[11px] text-gray-500">{r.date}</div>
              <a href="#" className="pa-dlbtn mt-1" aria-label="Ladda ner PDF" title="Ladda ner">
                <Download size={14} strokeWidth={1.6} className="text-gray-700" />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-1 text-right">
        <a href="#" className="pa-link-cta text-sm">Visa alla</a>
      </div>
    </Card>
  );
}
