export default function ShieldCheck({
  className = "w-6 h-6",
  color = "currentColor",
  strokeWidth = 2,
}: {
  className?: string;
  color?: string;       // t.ex. "var(--brand-primary)" eller "#2F80ED"
  strokeWidth?: number; // 1.5–2.5 beroende på storlek
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2.5l7 3v6c0 6-4.5 9.5-7 10.8C9.5 21 5 17.5 5 11.5v-6l7-3z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.5l2.2 2.2 4.8-4.8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
