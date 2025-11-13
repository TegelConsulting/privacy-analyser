// src/app/reportcard/ReportButtons.tsx
export default function ReportButtons() {
  const handleDownload = () => {
    alert("PDF laddas ner!");
  };

  const handleNewAnalysis = () => {
    alert("Ny analys startad!");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button
        className="bg-black text-white px-6 py-2 rounded hover:opacity-90 transition"
        onClick={handleDownload}
      >
        Ladda ner fullständig PDF-rapport
      </button>
      <button
        className="bg-white text-black border-2 border-black px-6 py-2 rounded hover:bg-gray-100 transition"
        onClick={handleNewAnalysis}
      >
        Starta ny analys
      </button>
    </div>
  );
}
