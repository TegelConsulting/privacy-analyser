import Link from "next/link";
import Image from "next/image";
import { getPlanBySlug } from "@/lib/paymentModels";
import robot from "@/app/assets/logo/robot.svg";
import PlanActions from "./PlanActions";
import PaymentOptions from "./PaymentOptions";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return [{ slug: "free" }, { slug: "medium" }, { slug: "pro" }];
}

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);

  if (!plan) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-900">
        <h1 className="text-2xl font-semibold mb-2">Plan hittades inte</h1>
        <p className="text-slate-600 mb-6">Kontrollera URL:en.</p>
        <Link
          href="/betalmodeller"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Tillbaka
        </Link>
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE — plan info */}
          <section className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-md p-8">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">{plan.title}</h1>
            <p className="text-slate-600 mb-6 text-[15px]">{plan.description}</p>

            <div className="space-y-3">
              <h2 className="text-base font-semibold text-slate-800 mb-2">
                Vad ingår i {plan.title}?
              </h2>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>Full analysrapport med datainsamling och rekommendationer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>Automatiska integritetskontroller varje månad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>Prioriterad support via e-post & chatt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>Export av resultat i PDF och CSV-format.</span>
                </li>
                {slug === "pro" && (
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span>Avancerade API-integrationer och rapportautomatisering.</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <Image
                src={robot}
                alt="Privacy Analyser robot"
                width={90}
                height={90}
                className="opacity-80 hover:opacity-100 transition mb-4"
              />
              <PlanActions slug={plan.slug} />
            </div>
          </section>

          {/* RIGHT SIDE — payment section */}
          <aside className="border border-slate-200 rounded-3xl bg-slate-50 p-6 shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-4">Betalningsalternativ</h2>
            <PaymentOptions plan={plan} />
            <p className="mt-6 text-center text-xs text-slate-500">
              🔒 Säker betalning via SSL & krypterade anslutningar
            </p>
          </aside>
        </div>
      </main>

      <footer className="bg-black text-white text-center py-3 mt-auto">
        <p className="text-xs opacity-80">© {new Date().getFullYear()} Privacy Analyser</p>
      </footer>
    </div>
  );
}
