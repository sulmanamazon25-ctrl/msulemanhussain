"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass } from "./tool-ui";

function mod97(iban: string) {
  let remainder = "";
  for (const ch of iban) {
    const next = remainder + ch;
    remainder = String(Number(BigInt(next) % BigInt(97)));
  }
  return Number(remainder);
}

function validateIbanEs(raw: string): { ok: boolean; formatted: string; messageEn: string; messageEs: string } {
  const compact = raw.replace(/[\s-]/g, "").toUpperCase();
  if (!compact) {
    return { ok: false, formatted: "", messageEn: "Enter an IBAN.", messageEs: "Introduce un IBAN." };
  }
  if (!/^ES\d{22}$/.test(compact)) {
    return {
      ok: false,
      formatted: compact,
      messageEn: "Spanish IBAN must be ES + 22 digits (24 chars total).",
      messageEs: "El IBAN español debe ser ES + 22 dígitos (24 caracteres).",
    };
  }
  const rearranged = compact.slice(4) + compact.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  const ok = mod97(numeric) === 1;
  const formatted = compact.replace(/(.{4})/g, "$1 ").trim();
  return {
    ok,
    formatted,
    messageEn: ok ? `Valid Spanish IBAN: ${formatted}` : "Checksum failed — check digits carefully.",
    messageEs: ok ? `IBAN español válido: ${formatted}` : "Fallo de control — revisa los dígitos.",
  };
}

/** Build ES IBAN from CCC (20 digits: bank+branch+check+account) using ISO 13616. */
function buildEsIban(ccc: string): { ok: boolean; iban: string; messageEn: string; messageEs: string } {
  const digits = ccc.replace(/\D/g, "");
  if (digits.length !== 20) {
    return {
      ok: false,
      iban: "",
      messageEn: "CCC must be 20 digits (bank + branch + check + account).",
      messageEs: "El CCC debe tener 20 dígitos (entidad + oficina + DC + cuenta).",
    };
  }
  const bban = digits;
  const checkInput = bban + "142800"; // E=14 S=28 00
  const check = String(98 - Number(BigInt(checkInput) % BigInt(97))).padStart(2, "0");
  const iban = `ES${check}${bban}`;
  const formatted = iban.replace(/(.{4})/g, "$1 ").trim();
  return {
    ok: true,
    iban: formatted,
    messageEn: `Generated IBAN: ${formatted}`,
    messageEs: `IBAN generado: ${formatted}`,
  };
}

export function IbanEsTool({ locale }: { locale: "en" | "es" }) {
  const [mode, setMode] = useState<"validate" | "generate">("validate");
  const [iban, setIban] = useState("ES9121000418450200051332");
  const [ccc, setCcc] = useState("210004180200051332");
  const es = locale === "es";

  const result = useMemo(() => {
    if (mode === "validate") return validateIbanEs(iban);
    return buildEsIban(ccc);
  }, [mode, iban, ccc]);

  return (
    <ToolShell>
      <Field label={es ? "Modo" : "Mode"}>
        <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)} className={inputClass}>
          <option value="validate">{es ? "Validar IBAN" : "Validate IBAN"}</option>
          <option value="generate">{es ? "Generar desde CCC" : "Generate from CCC"}</option>
        </select>
      </Field>
      {mode === "validate" ? (
        <Field label="IBAN ES">
          <input value={iban} onChange={(e) => setIban(e.target.value)} className={inputClass} spellCheck={false} autoComplete="off" />
        </Field>
      ) : (
        <Field label={es ? "CCC (20 dígitos)" : "CCC (20 digits)"}>
          <input value={ccc} onChange={(e) => setCcc(e.target.value)} className={inputClass} spellCheck={false} autoComplete="off" />
        </Field>
      )}
      <ResultBlock
        eyebrow={es ? "RESULTADO (LOCAL)" : "RESULT (ON-DEVICE)"}
        title={result.ok ? (es ? "OK" : "OK") : es ? "Revisar" : "Check"}
      >
        <p className={`mt-2 text-sm ${result.ok ? "text-phosphor" : "text-amber"}`}>
          {es ? result.messageEs : result.messageEn}
        </p>
        <p className="mt-4 text-xs text-bone-faint">
          {es ? "Cálculo ISO 13616 en tu navegador. No se envía a ningún servidor." : "ISO 13616 check in your browser. Nothing is uploaded."}
        </p>
      </ResultBlock>
    </ToolShell>
  );
}
