"use client";
import "../../app/styles/order/Receipt.css"
import React, { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@/hooks/useAppStore";
import { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import { ScanResult } from "@/lib/types/Result/ScanResult";
import { getReportByUrl } from "@/app/service/reportService";
import Modal from "@/components/analysis/Modal";
import { ALL_FILTERS, getFiltered } from "@/app/functions/getFiltered";
import { Summary } from "@/components/analysis/Summary";
import { Loader } from "@/components/analysis/Loader";
import { Button } from "@/components/ui/Button";
import { PaymentPlan } from "@/lib/paymentModels";
import { Method } from "@/lib/types/Payment/Method";
import { methods } from "@/lib/mock/methods";
import { getStableId } from "@/app/functions/getStableId";
import { getOrderDate } from "@/app/functions/getOrderDate";

/**
 * Hjälpfunktion: hitta betalmetod utifrån namn (används i Page-komponenten).
 */
export function getPaymentPlanMethod(methodName: string): Method | undefined {  
  const key = methodName.toLowerCase();
  return methods.find((m) => m.name.toLowerCase() === key);
}

type Props = {
  slug: string;
  plan: PaymentPlan;
  className?: string;
  method: Method; // <-- nu förväntar vi oss en Method, inte en string
};

export default function RecieptPage({ plan, method }: Props) {
  const { targetUrl, selectedFilters, setSelectedFilters, slug} = useAppStore();
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [randomDigits, setRandomDigits] = useState("");
  const [orderDate, setOrderDate] = useState("");

  if (!plan) {
    console.error("Planen hittades ej");
  }
  if (!method) {
    console.error("Metod saknas");
  }

  const selected = selectedFilters;

  const selectedOrAll: Filter_Label[] = selected.length
    ? selected
    : (ALL_FILTERS as unknown as Filter_Label[]);

  const handleSelectChange: React.Dispatch<React.SetStateAction<Filter_Label[]>> =
    (valueOrUpdater) => {
      setSelectedFilters((prev) =>
        typeof valueOrUpdater === "function"
          ? (valueOrUpdater as (p: Filter_Label[]) => Filter_Label[])(prev)
          : valueOrUpdater
    )
    }


  const stats = scan?.stats ?? { gdpr: 0, w3c: 0, accessibility: 0 };

  const { filteredIssues, filteredSummaries } = useMemo(() => {
    if (!scan) return { filteredIssues: [], filteredSummaries: [] };
    return getFiltered(scan, selectedOrAll);
  }, [scan, selectedOrAll]);

  // Hämta en första scan baserat på planens slug
  useEffect(() => {
    const fetchScan = async () => {
      try {
        const res = await getReportByUrl(plan.slug);
        setScan(res);
      } catch (err) {
        console.error("Kunde inte hämta rapport", err);
      }
    };

    fetchScan();
  }, [plan.slug]);

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    console.log("Submit triggered");
    setError(null);

    if (!/^https?:\/\//i.test(targetUrl)) {
      setError("Ange en giltig URL som börjar med http(s)://");
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching report for:", targetUrl);
      const res = await getReportByUrl(targetUrl);
      console.log("Got response:", res);
      setScan(res);
      setOpen(true);
      console.log("Modal should open, open:", open);
    } catch (err: any) {
      console.error(err);
      setScan(null);
      setError(err?.message ?? "Kunde inte hämta analys.");
    } finally {
      setLoading(false);
    }
  };

  // Generera ordernummer EN gång och spara även i localStorage
  useEffect(() => {
    const digits = getStableId();
    setRandomDigits(digits);
    localStorage.setItem("Ordernummer", JSON.stringify(digits));
  }, []);

  const order = localStorage.getItem("Ordernummer") ?? "";
  const parsedOrder = JSON.parse(order)

  useEffect(() => {
    const date = getOrderDate();
    setOrderDate(date);
  }, [])

  const date = localStorage.getItem("Orderdatum") ?? "";
 
  return (
    <section className="order-confirmation ">
      <section className="relative w-3/4">
        <h1 className="text-3xl relative mt-2 mb-4 w-fit">Tack för din beställning!</h1>
        <section className="border rounded p-3 mb-2 bg-[#ddd] plan">
          <h1 className="font-bold text-xl ">Plan</h1>
          <section className="bg-[#d4ebf2] border rounded  p-2">
            <h1 className="font-bold">{plan.title}</h1> 
            <span className="text-sm">{plan.priceLabel}</span>
            <ul className="bg-white p-1 rounded border">
              <li className="w-fit desc">{plan.description}</li>
            </ul>
          </section>
          <p><b>Ordernummer:</b> {parsedOrder}</p>
          <p><b>Pris:</b> {plan.priceLabel}</p>
          <section className="flex">
            <p className="mr-1"><b>Betalsätt:</b> {method.name}</p>

        </section>
        <p><b>Orderdatum:</b>	{orderDate}</p>
      </section>

      <Button
        variant="primary"
        onClick={onSubmit}
        type="submit"
        className="bg-slate-900 text-white hover:bg-black"
        size="md"
      >
        Hämta analys
      </Button>
      </section>
      {loading && <Loader />}

      <Modal open={open} onClose={() => setOpen(false)} title="Sammanfattning av analys">
        <Summary
          scan={scan}
          selected={selected}
          onSelectedChange={handleSelectChange}
        />
      </Modal>
    </section>
  );
}
