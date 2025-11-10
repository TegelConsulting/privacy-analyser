// paymentModels.ts

export type PlanSlug = "free" | "medium" | "pro";

export type PaymentPlan = {
  slug: PlanSlug;
  title: string;
  description: string;
  priceLabel: string;     // t.ex. "199 sek/mån"
  analysesLabel: string;  // t.ex. "10 analyser per månad"
  badgeLabel: string;     // kort blå pilla
  recommended?: boolean;
};

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    slug: "free",
    title: "FREE",
    description:
      "För dig som vill testa grunderna. Analysera enstaka domäner, få en överblick av din GDPR-status och upptäck potentiella förbättringar.",
    priceLabel: "0 sek/mån",
    analysesLabel: "En analys per webbplats",
    badgeLabel: "En analys per webbplats",
  },
  {
    slug: "medium",
    title: "MEDIUM",
    description:
      "Få tillgång till djupare analyser, detaljerade rapporter, automatiska uppföljningar och varningar när din webbplats inte längre uppfyller kraven.",
    priceLabel: "199 sek/mån",
    analysesLabel: "10 analyser per månad",
    badgeLabel: "10 analyser per månad",
    recommended: true,
  },
  {
    slug: "pro",
    title: "PRO",
    description:
      "För större organisationer med höga krav. Skräddarsydda analyser, API-integrationer, teamhantering och prioriterad support – full efterlevnad i skala.",
    priceLabel: "299 sek/mån",
    analysesLabel: "Obegränsade analyser",
    badgeLabel: "Obegränsade analyser",
  },
];

export const getPlanBySlug = (slug: string) =>
  PAYMENT_PLANS.find((p) => p.slug === slug) ?? null;
