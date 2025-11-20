// src/app/reportcard/ReportList.tsx
import ReportCard from "./ReportCard";

const data: {
  category: string;
  score: number;
  tags: { type: "critical" | "major" | "minor"; text: string }[];
}[] = [
  {
    category: "GDPR",
    score: 70,
    tags: [
      { type: "major", text: "Samtycke till cookies saknas" },
      { type: "minor", text: "Inaktiv problem" },
    ],
  },
  {
    category: "W3C",
    score: 85,
    tags: [
      { type: "critical", text: "Text med låg kontrast" },
      { type: "major", text: "3 bilder saknas" },
    ],
  },
  {
    category: "Accessibility",
    score: 85,
    tags: [
      { type: "critical", text: "5 HTML varningar" },
      { type: "minor", text: "Bra färgkontrast" },
    ],
  },
];

export default function ReportList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
      {data.map((item) => (
        <ReportCard
          key={item.category}
          category={item.category}
          score={item.score}
          tags={item.tags}
        />
      ))}
    </div>
  );
}
