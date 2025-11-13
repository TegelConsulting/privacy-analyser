"use client";

import "./details.css";

// ✅ Receive the dynamic "id" parameter from the URL
export default function ReportDetail({ params }: { params: { id: string } }) {
  return (
    <main>
      <section className="report-container">
        {/* Header */}
        <header className="report-header">
          <h1>Rapportdetaljer</h1>
          <p className="report-date">Datum: 2025-11-13</p>
          {/* Show which report ID is being viewed */}
          <p className="report-id">Visar analys-ID: {params.id}</p>
        </header>

        {/* Domain info */}
        <div className="domain-info">
          <h2>Domäninformation</h2>
          <p>www.example.com</p>
        </div>

        {/* Result summary */}
        <div className="result-summary">
          <h2>Resultatöversikt</h2>
          <ul>
            <li>Tillgänglighet: 87%</li>
            <li>Prestanda: 75%</li>
            <li>SEO: 90%</li>
          </ul>
        </div>

        {/* Risk level indicators */}
        <div className="risk-levels">
          <h2>Risknivåer</h2>
          <div className="risk-item low">Låg risk</div>
          <div className="risk-item medium">Medel risk</div>
          <div className="risk-item high">Hög risk</div>
        </div>

        {/* Message area */}
        <div className="message-area">
          <p>⚠️ Ingen data hittades för denna domän.</p>
        </div>
      </section>
    </main>
  );
}
