export default function ReportList() {
    const reports = [
      { name: "example.com", date: "2025-10-18", score: "82%" },
      { name: "mysite.se", date: "2025-10-19", score: "74%" },
    ];
  
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <ul className="space-y-2">
          {reports.map((report, i) => (
            <li
              key={i}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <span className="font-medium">{report.name}</span>
              <span className="text-gray-500 text-sm">{report.date}</span>
              <span className="font-semibold">{report.score}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  