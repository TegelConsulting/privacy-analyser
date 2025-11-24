"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PaymentPlan } from "@/lib/paymentModels";
import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Filter_Label } from "@/lib/types/Filter/Filter_Label";

type PricingCardProps = { 
  plan: PaymentPlan;
  title: string;
  price: string;
  setPrice: (price: string) => void;
};

export const PricingCard: React.FC<PricingCardProps> = ({ 
  plan,
  price, 
  setPrice 
}) => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const url = searchParams.get("url") ?? "";
  const filterParam = searchParams.get("filter") ?? ""; 

  const filters: Filter_Label[] = filterParam
    ? (filterParam.split(",").filter(Boolean) as Filter_Label[])
    : [];

  const handleChoosePrice = () => {
    setPrice(price);


    router.push(`/betalmodeller/${plan.slug}`)
  }

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-xl border bg-slate-100 px-8 py-8 shadow-sm text-center transition-all duration-200",
        "min-h-[440px]", // jämna höjder
        plan.recommended
          ? "border-blue-400 ring-2 ring-blue-400/40 bg-blue-50/40"
          : "border-slate-300 hover:border-blue-200"
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
          {price}
        </span>
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
          <Button
            variant="primary"
            className={cn(
              "rounded-md bg-slate-900 text-white hover:bg-black",
              plan.recommended && "bg-blue-600 hover:bg-blue-700"
            )}
            onClick={handleChoosePrice}
          >
            Välj abonnemang
          </Button>
      </div>
    </article>
  );
}
