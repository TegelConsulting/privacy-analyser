import type { Category_Label, ByCat } from "@/lib/types/Category";

/**
 * Gör funktionen generisk så att in-typ = ut-typ.
 * Då kan du skicka in number och få number tillbaka, eller string→string.
 */
export function Summary_By_Label<T, K extends Category_Label = Category_Label>(
  s: ByCat<T, K>
): ByCat<T, K> {
  // Lägg ev. logik här (t.ex. re-map/aliasering). Exemplet returnerar som det är.
  return s;
}
