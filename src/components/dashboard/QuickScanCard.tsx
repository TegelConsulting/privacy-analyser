"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";

export function QuickScanCard() {
  const [url, setUrl] = useState("");

  return (
    <Card title="Snabbanalys av URL">
      <div className="grid gap-4">
        {/* lite större, lugnare input */}
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://dinhemsida.se"
          className="pa-input pa-input--lg"
        />

        {/* vänster: kryss, höger: knapp – robust även responsivt */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-center gap-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Checkbox label="GDPR" />
            <Checkbox label="W3C" />
            <Checkbox label="Accessibility" />
          </div>
          <Button variant="primary" size="sm" className="justify-self-start sm:justify-self-end">
            Starta analys
          </Button>
        </div>
      </div>
    </Card>
  );
}
