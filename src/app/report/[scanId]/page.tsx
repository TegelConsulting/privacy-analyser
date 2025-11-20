import ReportPageClient from "./ReportPageClient";

type PageProps = {
  params: { scanId: string };
};

export default function ReportPage({ params }: PageProps) {
  return <ReportPageClient scanId={params.scanId} />;
}
