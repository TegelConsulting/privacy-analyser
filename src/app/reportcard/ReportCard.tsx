type ReportCardProps = {
  category: string;
  score: number;
  tags: { type: "critical" | "major" | "minor"; text: string }[];
};

export default function ReportCard({ category, score, tags }: ReportCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col gap-3">
      <h2 className="text-xl font-semibold">{category}</h2>
      <p className="text-lg font-bold">{score}/100</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`text-xs font-bold px-2 py-1 rounded ${
              tag.type === "critical"
                ? "bg-red-600 text-white"
                : tag.type === "major"
                ? "bg-yellow-400 text-black"
                : "bg-green-200 text-black"
            }`}
          >
            {tag.type.toUpperCase()} {tag.text}
          </span>
        ))}
      </div>
    </div>
  );
}
