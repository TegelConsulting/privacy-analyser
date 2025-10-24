"use client";
import * as React from "react";

export function Table({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <table className={`pa-table ${className}`}>{children}</table>;
}
