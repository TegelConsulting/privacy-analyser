// src/components/ui/Button.tsx
"use client";
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Button({
  variant = "default",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  // Bas: lite tyngre interaktion (ring, transition, disabled-state)
  const base =
    "inline-flex items-center justify-center select-none font-semibold " +
    "transition-all duration-150 focus-visible:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none";

  // Storlekar (behåller dina rundningar)
  const sizeCls =
    size === "sm"
      ? "h-9 px-4 text-sm rounded-md"
      : size === "lg"
      ? "h-11 px-6 text-base rounded-lg"
      : "h-10 px-5 text-sm rounded-md";

  // Varianter: använder dina pa-klasser men lägger till tydlig hover/active
  const variantCls =
    variant === "primary"
      ? // svart knapp – tydlig hover (färg, skugga, litet lyft och lite rundare)
        "pa-btn pa-btn--primary shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:rounded-xl active:translate-y-0"
      : variant === "ghost"
      ? // ghost – diskret hover
        "pa-btn pa-btn--ghost hover:bg-gray-100"
      : // default – vit knapp
        "pa-btn bg-white border-2 border-black text-gray-900 hover:bg-gray-50";

  return (
    <button
      {...props}
      className={`${base} ${sizeCls} ${variantCls} ${className}`}
      type={props.type ?? "button"}
    />
  );
}
