export function ToolShell({ children }: { children: React.ReactNode }) {
  return <div className="border border-white/10 bg-ink-3/80 p-5 md:p-6">{children}</div>;
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm text-bone-dim">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full border border-white/15 bg-ink px-3 py-2.5 text-bone outline-none focus:border-phosphor";

export function ResultBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-6 border-t border-white/10 pt-5">
      <p className="font-mono text-[10px] tracking-[0.2em] text-bone-faint">{eyebrow}</p>
      <p className="mt-2 font-display text-3xl font-bold text-phosphor">{title}</p>
      {children}
    </div>
  );
}

export function parseNum(v: string) {
  return Number.parseFloat(v.replace(",", ".").replace(/\s/g, ""));
}

export function money(n: number, locale: "en" | "es") {
  return new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-EU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}

export function moneyFx(
  n: number,
  currency: "PKR" | "USD" | "AED" | "EUR",
  locale: "en" | "es" = "en",
) {
  const tag =
    currency === "PKR" ? "en-PK" : currency === "AED" ? "en-AE" : locale === "es" ? "es-ES" : "en-US";
  return new Intl.NumberFormat(tag, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "PKR" ? 0 : 2,
  }).format(n);
}
