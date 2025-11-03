import { Card } from "@/components/ui/Card";

export function ScanState({ state }:{ state:"idle"|"loading"|"success"|"error" }) {
  if (state==="loading") return <Card><p>Analysen pågår…</p></Card>;
  if (state==="success") return <Card><p>Analysen klar ✅</p></Card>;
  if (state==="error") return <Card><p>Något gick fel. Försök igen.</p></Card>;
  return <Card><p>Kör en snabbanalys för att se resultat.</p></Card>;
}
