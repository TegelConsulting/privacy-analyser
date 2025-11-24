"use client";

import React from "react";
import RecieptPage, { getPaymentPlanMethod } from "@/components/Orders/RecieptPage";
import { getPaymentPlanBySlug } from "../page";

type PageProps = { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ method?: string }>; // t.ex. /orderbekraftelse?method=Swish
};

export default function Page({ params, searchParams }: PageProps) {
  const { slug } = React.use(params);
  const { method } = React.use(searchParams);

  console.log("orderbekraftelse params.slug:", slug);
  console.log("orderbekraftelse searchParams.method:", method);

  const plan = getPaymentPlanBySlug(slug);

  if (!plan) {
    return <section>Planen hittades inte</section>;
  }

  // Om du inte skickar med method ännu → visa en enkel sida
  if (!method) {
    return (
      <section className="order-confirmation">
        <h1 className="text-3xl mt-2 ml-4 mb-4">Tack för din beställning!</h1>
        <p className="ml-4">Betalningsmetod saknas (ingen method-param skickades).</p>
      </section>
    );
  }

  const payMethod = getPaymentPlanMethod(method);
  console.log("payMethod:", payMethod);

  if (!payMethod) {
    return <p>Betalningsmetod saknas</p>;
  }

  return (
    <RecieptPage
      slug={slug}
      plan={plan}
      method={payMethod}          // ⬅ här skickas ett Method-objekt
    />
  );
}
