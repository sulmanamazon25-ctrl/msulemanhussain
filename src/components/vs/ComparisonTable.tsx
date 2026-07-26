import type { FeatureCategory, FeatureValue } from "@/types/comparison";

function CellValue({ value }: { value: FeatureValue }) {
  if (typeof value === "boolean") {
    return (
      <span
        className={
          value
            ? "font-mono text-sm font-semibold text-phosphor"
            : "font-mono text-sm text-bone-dim/70"
        }
        aria-label={value ? "Yes" : "No"}
      >
        {value ? "✓" : "✗"}
      </span>
    );
  }
  return <span className="text-sm leading-snug text-bone">{value}</span>;
}

type Props = {
  categories: FeatureCategory[];
  ourName: string;
  competitorName: string;
  accent: string;
};

export function ComparisonTable({ categories, ourName, competitorName, accent }: Props) {
  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat.id}>
          <h3 className="font-mono text-[11px] tracking-[0.22em] text-phosphor uppercase">
            {cat.name}
          </h3>
          <div className="mt-3 overflow-x-auto border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th scope="col" className="px-4 py-3 text-xs font-semibold text-bone-dim">
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold"
                    style={{ color: accent }}
                  >
                    {ourName}
                  </th>
                  <th scope="col" className="px-4 py-3 text-xs font-semibold text-bone-dim">
                    {competitorName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {cat.rows.map((row) => (
                  <tr
                    key={row.id}
                    className={
                      row.highlight
                        ? "border-b border-white/10 bg-white/[0.04]"
                        : "border-b border-white/5"
                    }
                  >
                    <th
                      scope="row"
                      className="px-4 py-3.5 text-sm font-medium text-bone align-top"
                    >
                      {row.name}
                      {row.note ? (
                        <p className="mt-1 text-xs font-normal text-bone-dim">{row.note}</p>
                      ) : null}
                    </th>
                    <td className="px-4 py-3.5 align-top">
                      <CellValue value={row.ourValue} />
                    </td>
                    <td className="px-4 py-3.5 align-top">
                      <CellValue value={row.competitorValue} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
