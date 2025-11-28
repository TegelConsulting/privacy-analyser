type Keys = "gdpr" | "w3c" | "accessibility";

type StatsAdapter = Partial<Record<Keys, number>> | null;
type Stats = Record<Keys, number>;

export function mapStats(stats: StatsAdapter): Stats {
  const s = stats ?? {};

  return {
    gdpr: Number(s.gdpr ?? 0),
    w3c: Number(s.w3c ?? 0),
    accessibility: Number(s.accessibility ?? 0),
  };
}
