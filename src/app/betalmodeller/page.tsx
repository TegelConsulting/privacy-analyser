// src/app/betalmodeller/page.tsx
import PricingCard from "@/components/pricing/PricingCard";
import { PAYMENT_PLANS } from "@/lib/paymentModels";
import Image from "next/image";
import robot from "@/app/assets/logo/robot.svg";

export const metadata = { title: "Betalmodeller" };

export default function PricingPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-center text-[13px] text-slate-600 max-w-2xl mx-auto">
          Vi erbjuder tre flexibla nivåer för att passa alla behov från små webbplatser till stora organisationer.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PAYMENT_PLANS.map((p) => (
            <PricingCard key={p.slug} plan={p} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Image
            src={robot}
            alt="Nova – vår lilla hjälprobot"
            width={130}
            height={130}
            className="opacity-90 hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-[12px] text-slate-500 text-center">
            Vet du inte var du ska börja? Låt oss guida dig!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="rounded-md border border-slate-300 px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
              Börja här
            </a>
            <a className="rounded-md bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-black">
              Chatta med oss
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
