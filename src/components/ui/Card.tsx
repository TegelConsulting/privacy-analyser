"use client";
import * as React from "react";

type CardProps = { title?: string; className?: string; children: React.ReactNode };

export function Card({ title, className = "", children }: CardProps) {
  return (
    <div className={`pa-card ${className}`}>
      {title ? <div className="pa-card-header">{title}</div> : null}
      <div className="pa-card-content">{children}</div>
    </div>
  );
}
