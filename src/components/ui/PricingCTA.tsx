"use client";

import Link from "next/link";

export default function PricingCTA() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">
        Olika abonnemang
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Välj en plan som passar din användning. Du kan alltid uppgradera senare.
      </p>

      <div className="mt-4">
        <Link
          href="/betalmodeller"
          className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          Se betalplaner
        </Link>
      </div>
    </div>
  );
}
