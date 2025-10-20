interface SummaryCardProps {
    title: string;
    percentage: number;
  }
  
  export default function SummaryCard({ title, percentage }: SummaryCardProps) {
    return (
      <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div
            className="bg-black h-3 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-gray-700 font-medium">{percentage}%</p>
      </div>
    );
  }
  