"use client";

import { useMemo, useState } from "react";
import { Field, ResultBlock, ToolShell, inputClass } from "./tool-ui";

const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

function normalize(raw: string) {
  return raw.trim().toUpperCase().replace(/[\s.-]/g, "");
}

function validateDniNie(raw: string): { ok: boolean; kind: "DNI" | "NIE" | null; letter: string; messageEn: string; messageEs: string } {
  const v = normalize(raw);
  if (!v) {
    return { ok: false, kind: null, letter: "", messageEn: "Enter a DNI or NIE.", messageEs: "Introduce un DNI o NIE." };
  }

  // NIE: X/Y/Z + 7 digits + letter
  const nie = /^([XYZ])(\d{7})([A-Z])?$/.exec(v);
  if (nie) {
    const prefix = { X: "0", Y: "1", Z: "2" }[nie[1] as "X" | "Y" | "Z"];
    const num = Number(`${prefix}${nie[2]}`);
    const expected = DNI_LETTERS[num % 23];
    const provided = nie[3];
    if (!provided) {
      return {
        ok: true,
        kind: "NIE",
        letter: expected,
        messageEn: `Valid NIE number. Control letter should be ${expected}.`,
        messageEs: `Número NIE válido. La letra de control debe ser ${expected}.`,
      };
    }
    const ok = provided === expected;
    return {
      ok,
      kind: "NIE",
      letter: expected,
      messageEn: ok ? `Valid NIE (${nie[1]}${nie[2]}${expected}).` : `Invalid letter. Expected ${expected}, got ${provided}.`,
      messageEs: ok ? `NIE válido (${nie[1]}${nie[2]}${expected}).` : `Letra incorrecta. Debe ser ${expected}, no ${provided}.`,
    };
  }

  // DNI: 8 digits + optional letter
  const dni = /^(\d{8})([A-Z])?$/.exec(v);
  if (dni) {
    const num = Number(dni[1]);
    const expected = DNI_LETTERS[num % 23];
    const provided = dni[2];
    if (!provided) {
      return {
        ok: true,
        kind: "DNI",
        letter: expected,
        messageEn: `Valid DNI number. Control letter should be ${expected}.`,
        messageEs: `Número DNI válido. La letra de control debe ser ${expected}.`,
      };
    }
    const ok = provided === expected;
    return {
      ok,
      kind: "DNI",
      letter: expected,
      messageEn: ok ? `Valid DNI (${dni[1]}${expected}).` : `Invalid letter. Expected ${expected}, got ${provided}.`,
      messageEs: ok ? `DNI válido (${dni[1]}${expected}).` : `Letra incorrecta. Debe ser ${expected}, no ${provided}.`,
    };
  }

  return {
    ok: false,
    kind: null,
    letter: "",
    messageEn: "Format not recognized. Use 8 digits (+ letter) for DNI or X/Y/Z + 7 digits (+ letter) for NIE.",
    messageEs: "Formato no reconocido. Usa 8 dígitos (+ letra) para DNI o X/Y/Z + 7 dígitos (+ letra) para NIE.",
  };
}

export function DniNieValidator({ locale }: { locale: "en" | "es" }) {
  const [value, setValue] = useState("");
  const es = locale === "es";
  const result = useMemo(() => validateDniNie(value), [value]);

  return (
    <ToolShell>
      <Field label={es ? "DNI o NIE" : "DNI or NIE"}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={es ? "12345678Z o X1234567L" : "12345678Z or X1234567L"}
          className={inputClass}
          autoComplete="off"
          spellCheck={false}
        />
      </Field>
      <ResultBlock
        eyebrow={es ? "RESULTADO (LOCAL)" : "RESULT (ON-DEVICE)"}
        title={result.ok ? (es ? "Válido" : "Valid") : es ? "Revisar" : "Check format"}
      >
        <p className={`mt-2 text-sm ${result.ok ? "text-phosphor" : "text-amber"}`}>
          {es ? result.messageEs : result.messageEn}
        </p>
        {result.letter ? (
          <p className="mt-2 text-sm text-bone-dim">
            {es ? "Letra de control" : "Control letter"}: <span className="font-semibold text-bone">{result.letter}</span>
            {result.kind ? ` · ${result.kind}` : null}
          </p>
        ) : null}
        <p className="mt-4 text-xs text-bone-faint">
          {es
            ? "Se calcula en tu navegador. No se envía a ningún servidor."
            : "Checked in your browser. Nothing is sent to a server."}
        </p>
      </ResultBlock>
    </ToolShell>
  );
}
