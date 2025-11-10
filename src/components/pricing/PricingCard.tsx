"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PaymentPlan } from "@/lib/paymentModels";
import { Button } from "@/components/ui/Button";

type Props = { plan: PaymentPlan; className?: string };

export default function PricingCard({ plan, className }: Props) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-xl border bg-slate-100 px-8 py-8 shadow-sm text-center transition-all duration-200",
        "min-h-[440px]", // jämna höjder
        plan.recommended
          ? "border-blue-400 ring-2 ring-blue-400/40 bg-blue-50/40"
          : "border-slate-300 hover:border-blue-200",
        className
      )}
    >
      {/* Blå badge upptill om rekommenderad */}
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
          REKOMMENDERAD
        </div>
      )}

      <h3 className="mt-2 text-xl font-bold tracking-wide text-slate-900 uppercase">
        {plan.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {plan.description}
      </p>

      <div className="mt-6">
        <span className="text-3xl font-semibold text-slate-900">
          {plan.priceLabel.replace("/mån", "")}
        </span>
        <span className="ml-1 align-top text-[11px] text-slate-500">/mån</span>
      </div>

      {/* Blå pilla */}
      <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-slate-800">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-600"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span className="text-[12px]">{plan.analysesLabel}</span>
      </div>

      {/* CTA-knapp längst ner */}
      <div className="mt-auto pt-6">
        <Link href={`/betalmodeller/${plan.slug}`}>
          <Button
            variant="primary"
            className={cn(
              "rounded-md bg-slate-900 text-white hover:bg-black",
              plan.recommended && "bg-blue-600 hover:bg-blue-700"
            )}
          >
            Välj abonnemang
          </Button>
        </Link>
      </div>
    </article>
  );
}
