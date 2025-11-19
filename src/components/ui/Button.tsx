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
  const base =
    "inline-flex items-center justify-center select-none font-semibold " +
    "transition-transform duration-500 ease-in-out transition-shadow " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none will-change-transform";

  const sizeCls =
    size === "sm"
      ? "h-9 px-4 text-sm rounded-md"
      : size === "lg"
      ? "h-11 px-6 text-base rounded-lg"
      : "h-10 px-5 text-sm rounded-md";

  const variantCls =
    variant === "primary"
      ? "pa-btn pa-btn--primary shadow-sm hover:shadow-md hover:scale-102 active:scale-100 rounded-xl"
      : variant === "ghost"
      ? "pa-btn pa-btn--ghost hover:bg-gray-100 hover:scale-101"
      : "pa-btn bg-white border-2 border-black text-gray-900 hover:bg-gray-50 hover:scale-101";

  return (
    <button
      {...props}
      className={`${base} ${sizeCls} ${variantCls} ${className}`}
      type={props.type ?? "button"}
    />
  );
}
