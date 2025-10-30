// src/app/betalmodeller/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPlanBySlug } from "@/lib/paymentModels"; // ✅ korrekt path
import robot from "@/app/assets/logo/robot.svg";
import PlanActions from "./PlanActions"; // klientkomponent för knappar

// ✅ Static paths
export function generateStaticParams() {
  return [{ slug: "free" }, { slug: "medium" }, { slug: "pro" }];
}

// ⬇️ Nytt: params är en Promise → vänta in dem
export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;           // 👈 det här tar bort terminal-felet
  const plan = getPlanBySlug(slug);

  if (!plan) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[80vh] bg-white text-slate-900">
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

  // ⭐ Samma UI som du visade upp – endast param-fix ovan
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      <main className="flex-1 overflow-y-auto">
        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">{plan.title}</h1>
          <p className="text-slate-600 mb-10">{plan.description}</p>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-md">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <div className="text-sm text-slate-500">Pris</div>
                <div className="text-lg font-medium">{plan.priceLabel}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Analyskvot</div>
                <div className="text-lg font-medium">{plan.analysesLabel}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Image
              src={robot}
              alt="Privacy Analyser robot"
              width={120}
              height={120}
              className="opacity-80 hover:opacity-100 transition"
            />
          </div>

          <div className="mt-10 flex justify-center">
            <PlanActions slug={plan.slug} />
          </div>
        </section>
      </main>

      <footer className="bg-black text-white text-center py-4 mt-auto">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Privacy Analyser
        </p>
      </footer>
    </div>
  );
}
