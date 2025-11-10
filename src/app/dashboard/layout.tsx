// src/app/dashboard/layout.tsx
import React from "react";

export const metadata = {
  title: "Dashboard – Privacy Analyser",
};

/**
 * Viktigt:
 * - Ingen egen header/footer här (de finns redan i app/layout.tsx).
 * - Ingen "hero-rad" här heller. Lägg ev. intro-komponent som ett vanligt card
 *   i /dashboard/page.tsx om du vill visa något överst i innehållet.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Låt root-layoutens <main> sköta scroll och bakgrund.
  return <>{children}</>;
}
