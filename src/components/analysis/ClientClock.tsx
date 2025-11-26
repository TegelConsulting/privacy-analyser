"use client";
import { useEffect, useState } from "react";

export default function ClientClock() {
    const [now, setNow] = useState<number | Date | undefined>();

    useEffect(() => {
      setNow(new Date());
      const id = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(id);
    }, [])

    return (
          <p className="analysisViewDate">
            {new Intl.DateTimeFormat("sv-SE", {
              dateStyle: "short",
              timeStyle: "medium",
              timeZone: "Europe/Stockholm"
            }).format(now).replace(",", "")}
          </p>
    )
}