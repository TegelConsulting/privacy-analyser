"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import klarnaLogo from "@/app/assets/payments/klarna.svg";
import paypalLogo from "@/app/assets/payments/paypal.svg";
import applePayLogo from "@/app/assets/payments/applepay.svg";
import swishLogo from "@/app/assets/payments/swish.svg";

export default function PaymentOptions({ plan }: { plan: any }) {
  const handlePayment = (method: string) => {
    console.log(`Betala med ${method} för plan:`, plan.slug);
  };

  const methods = [
    { name: "Klarna", logo: klarnaLogo },
    { name: "PayPal", logo: paypalLogo },
    { name: "Apple Pay", logo: applePayLogo },
    { name: "Swish", logo: swishLogo },
  ];

  return (
    <div className="space-y-4">
      {methods.map((m) => (
        <div
          key={m.name}
          className="flex items-center justify-between border border-slate-200 p-3 rounded-lg hover:bg-slate-100 transition"
        >
          <div className="flex items-center gap-3">
            <Image src={m.logo} alt={m.name} width={32} height={32} />
            <span className="font-medium text-slate-800">{m.name}</span>
          </div>
          <Button variant="primary" size="sm" onClick={() => handlePayment(m.name)}>
            Betala
          </Button>
        </div>
      ))}

      <p className="mt-6 text-center text-sm text-slate-500">
        Din betalning hanteras säkert via våra betalpartners.
      </p>
    </div>
  );
}
