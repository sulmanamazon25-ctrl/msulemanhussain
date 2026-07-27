"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass, money, parseNum } from "./tool-ui";

type Country = "mx" | "co" | "ar";

const PACK: Record<
  Country,
  {
    currency: string;
    localeTag: string;
    labelEn: string;
    labelEs: string;
    ssRate: number;
    estimateTax: (gross: number) => number;
  }
> = {
  mx: {
    currency: "MXN",
    localeTag: "es-MX",
    labelEn: "Mexico",
    labelEs: "México",
    ssRate: 0.0275,
    estimateTax: (g) => Math.max(0, g * 0.15 - 3000),
  },
  co: {
    currency: "COP",
    localeTag: "es-CO",
    labelEn: "Colombia",
    labelEs: "Colombia",
    ssRate: 0.08,
    estimateTax: (g) => Math.max(0, g * 0.1),
  },
  ar: {
    currency: "ARS",
    localeTag: "es-AR",
    labelEn: "Argentina",
    labelEs: "Argentina",
    ssRate: 0.17,
    estimateTax: (g) => Math.max(0, g * 0.12),
  },
};

function fmt(n: number, country: Country) {
  const p = PACK[country];
  return new Intl.NumberFormat(p.localeTag, {
    style: "currency",
    currency: p.currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function LatAmSalaryCalculator({ locale, country }: { locale: "en" | "es"; country: Country }) {
  const [gross, setGross] = useState(country === "co" ? "4500000" : country === "ar" ? "1200000" : "35000");
  const es = locale === "es";
  const pack = PACK[country];

  const result = useMemo(() => {
    const g = parseNum(gross);
    if (!Number.isFinite(g) || g < 0) return null;
    const ss = g * pack.ssRate;
    const tax = pack.estimateTax(g);
    const net = g - ss - tax;
    return { ss, tax, net, g };
  }, [gross, pack]);

  return (
    <ToolShell>
      <Field label={es ? `Bruto mensual (${pack.currency})` : `Monthly gross (${pack.currency})`}>
        <input type="number" value={gross} onChange={(e) => setGross(e.target.value)} className={inputClass} />
      </Field>
      {result ? (
        <ResultBlock eyebrow={es ? "NETO ESTIMADO" : "ESTIMATED NET"} title={fmt(result.net, country)}>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            <li>
              {es ? "Aportaciones / SS est." : "Contributions / SS est."}: <span className="text-bone">{fmt(result.ss, country)}</span>
            </li>
            <li>
              {es ? "Impuesto est." : "Tax est."}: <span className="text-bone">{fmt(result.tax, country)}</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-faint">
            {es
              ? `Modelo simplificado ${pack.labelEs}. No sustituye un contador local.`
              : `Simplified ${pack.labelEn} model. Does not replace a local accountant.`}
          </p>
        </ResultBlock>
      ) : null}
    </ToolShell>
  );
}

function onlyDigits(s: string) {
  return s.replace(/\D/g, "");
}

export function LatAmIdValidator({
  locale,
  country,
}: {
  locale: "en" | "es";
  country: Country;
}) {
  const [value, setValue] = useState("");
  const es = locale === "es";

  const result = useMemo(() => {
    const v = value.trim().toUpperCase().replace(/[\s-]/g, "");
    if (!v) return { ok: false, msgEn: "Enter an ID.", msgEs: "Introduce un documento." };

    if (country === "mx") {
      // RFC persona física rough: 4 letters + 6 digits + 3 alnum
      const ok = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(v);
      return {
        ok,
        msgEn: ok ? "RFC format looks valid." : "Expected RFC like ABCD010203XXX.",
        msgEs: ok ? "Formato RFC válido." : "Se espera RFC tipo ABCD010203XXX.",
      };
    }
    if (country === "co") {
      const d = onlyDigits(v);
      const ok = d.length >= 6 && d.length <= 10;
      return {
        ok,
        msgEn: ok ? "RUT/NIT digit length looks plausible (format check only)." : "Enter 6–10 digits for a basic RUT check.",
        msgEs: ok ? "Longitud RUT/NIT plausible (solo formato)." : "Introduce 6–10 dígitos para un chequeo básico.",
      };
    }
    // AR CUIT: 11 digits with checksum
    const d = onlyDigits(v);
    if (d.length !== 11) {
      return { ok: false, msgEn: "CUIT must be 11 digits.", msgEs: "El CUIT debe tener 11 dígitos." };
    }
    const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, w, i) => acc + w * Number(d[i]), 0);
    const mod = 11 - (sum % 11);
    const check = mod === 11 ? 0 : mod === 10 ? 9 : mod;
    const ok = check === Number(d[10]);
    return {
      ok,
      msgEn: ok ? "Valid CUIT checksum." : "CUIT checksum failed.",
      msgEs: ok ? "CUIT con dígito verificador válido." : "Fallo en el dígito verificador del CUIT.",
    };
  }, [value, country]);

  const label =
    country === "mx" ? "RFC" : country === "co" ? "RUT / NIT" : "CUIT";

  return (
    <ToolShell>
      <Field label={label}>
        <input value={value} onChange={(e) => setValue(e.target.value)} className={inputClass} spellCheck={false} autoComplete="off" />
      </Field>
      <ResultBlock eyebrow={es ? "RESULTADO" : "RESULT"} title={result.ok ? "OK" : es ? "Revisar" : "Check"}>
        <p className={`mt-2 text-sm ${result.ok ? "text-phosphor" : "text-amber"}`}>{es ? result.msgEs : result.msgEn}</p>
        <p className="mt-4 text-xs text-bone-faint">
          {es ? "Validación local de formato/checksum. No consulta bases oficiales." : "Local format/checksum only. No official database lookup."}
        </p>
      </ResultBlock>
    </ToolShell>
  );
}
