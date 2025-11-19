"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PlanActions({ slug }: { slug: string }) {
  return (
    <div className="flex gap-3">
      <Button
        variant="primary"
        onClick={() => {
          // TODO: koppla till checkout/aktivering
          console.log("Välj plan:", slug);
        }}
      >
        Välj plan
      </Button>

      <Link href="/betalmodeller">
        <Button variant="ghost">Tillbaka</Button>
      </Link>
    </div>
  );
}
