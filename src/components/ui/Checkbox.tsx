"use client";
import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export function Checkbox({ label, ...rest }: Props){
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none text-sm text-gray-800">
      <input
        type="checkbox"
        className="h-4 w-4 rounded-sm border-2 border-black text-black "
        {...rest}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
