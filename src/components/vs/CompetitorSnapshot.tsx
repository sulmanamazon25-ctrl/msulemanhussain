import type { Competitor } from "@/types/comparison";

type Meta = {
  audience: string;
  pricingModel: string;
  pros: string[];
  cons: string[];
};

type Props = {
  our: Competitor;
  competitor: Competitor;
  ourMeta: Meta;
  competitorMeta: Meta;
  accent: string;
  labels: {
    forWhom: string;
    pricing: string;
    pros: string;
    cons: string;
  };
};

function SnapshotCard({
  name,
  meta,
  accent,
  labels,
  highlight,
}: {
  name: string;
  meta: Meta;
  accent?: string;
  labels: Props["labels"];
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "border border-white/15 bg-white/[0.04] p-5 md:p-6"
          : "border border-white/10 bg-ink-3/40 p-5 md:p-6"
      }
      style={highlight && accent ? { borderColor: `${accent}66` } : undefined}
    >
      <p
        className="font-display text-lg font-bold"
        style={highlight && accent ? { color: accent } : undefined}
      >
        {name}
      </p>
      <p className="mt-3 text-xs font-mono tracking-[0.16em] text-phosphor">{labels.forWhom}</p>
      <p className="mt-1 text-sm leading-relaxed text-bone-dim">{meta.audience}</p>
      <p className="mt-4 text-xs font-mono tracking-[0.16em] text-phosphor">{labels.pricing}</p>
      <p className="mt-1 text-sm leading-relaxed text-bone">{meta.pricingModel}</p>
      <p className="mt-4 text-xs font-mono tracking-[0.16em] text-phosphor">{labels.pros}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-bone">
        {meta.pros.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="text-phosphor" aria-hidden>
              ✓
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs font-mono tracking-[0.16em] text-bone-dim">{labels.cons}</p>
      <ul className="mt-2 space-y-1.5 text-sm text-bone-dim">
        {meta.cons.map((c) => (
          <li key={c} className="flex gap-2">
            <span aria-hidden>—</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CompetitorSnapshot({
  our,
  competitor,
  ourMeta,
  competitorMeta,
  accent,
  labels,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SnapshotCard name={our.name} meta={ourMeta} accent={accent} labels={labels} highlight />
      <SnapshotCard name={competitor.name} meta={competitorMeta} labels={labels} />
    </div>
  );
}
