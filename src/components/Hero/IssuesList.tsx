// src/components/Hero/IssuesList.tsx
export default function IssuesList() {
    const issues = [
      "Missing cookie consent banner",
      "Images missing alt attributes",
      "Invalid HTML tag nesting",
    ];
  
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {issues.map((issue, i) => (
            <li key={i}>{issue}</li>
          ))}
        </ol>
      </div>
    );
  }
  