import "./details.css";

export default function ReportDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main className="report-details">
      <h1>Rapportdetaljer för ID: {params.id}</h1>
    </main>
  );
}
