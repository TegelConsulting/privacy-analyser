"use client";
import { PAYMENT_PLANS, PaymentPlan } from "@/lib/paymentModels";
import PaymentOptions from "./PaymentOptions";
import { useState } from "react";
import { methods } from "@/lib/mock/methods";
import { useAppStore } from "@/hooks/useAppStore";
import { isValidUrl } from "@/app/functions/isValidUrl";

type PageProps = {
  params: {
    slug: string;
  }
}

export function getPaymentPlanBySlug(slug: string):PaymentPlan | undefined {
  return PAYMENT_PLANS.find((p) => p.slug === slug) 
}

export default function Page({params}: PageProps) {
  const { targetUrl, startPaymentPending} = useAppStore(); 
  const [loadingMethod, setLoadingMethod] = useState<string | null>(null);
  const plan = getPaymentPlanBySlug(params.slug);


  if (!plan) return <section>Planen hittades inte</section>

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">Välj betalningsmetod för {plan.title}</h1>
      <section className="space-y-4">
            <section className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">{plan.title }</h2>
              <p className="text-2xl font-bold">{plan.priceLabel}</p>
            </section>
      
            <p className="text-sm text-slate-600">
              URL för analys: {""}
              <span className={!isValidUrl(targetUrl) ? "text-red-600" : "text-slate-800"}>
                {targetUrl || "-ingn URL vald"}
              </span>
            </p>
            {methods.map((m) => (
              <PaymentOptions key={m.id} plan={plan} method={m} setMethod={setLoadingMethod}/>
            ))}      
                  </section>
    </main>
  )
}