
const DATE_KEY = "Orderdatum";

export function getOrderDate() {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.localStorage.getItem(DATE_KEY);
  if (existing) {
    // Om det ser ut som en gammal timestamp (bara siffror och ganska lång)
    if (/^\d{11,}$/.test(existing)) {
      const millis = Number(existing);
      const formatted = new Date(millis).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      window.localStorage.setItem(DATE_KEY, formatted);
      return formatted;
    }

    // Annars antar vi att det redan är ett “fint” datum
    return existing;
  }

  // Första gången: skapa nytt datum
  const now = new Date();
  const todaysDate = now.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  window.localStorage.setItem(DATE_KEY, todaysDate);
  return todaysDate;
}
