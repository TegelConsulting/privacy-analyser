"use client";
import * as React from "react";

type Tone = "ok" | "warn" | "bad" | "info" | "neutral";
type Props = { value: number; tone?: Tone; className?: string; "aria-label"?: string };

export function ProgressBar({ value, tone = "neutral", className = "", ...rest }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  const barColor =
    tone === "ok"   ? "bg-green-500" :
    tone === "warn" ? "bg-amber-500" :
    tone === "bad"  ? "bg-red-500"   :
    tone === "info" ? "bg-blue-500"  :
                      "bg-gray-500";

  return (
    <div
      className={`h-3 rounded-md border-2 border-black bg-gray-300 overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div
        className={`h-full ${barColor} transition-[width] duration-300 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
