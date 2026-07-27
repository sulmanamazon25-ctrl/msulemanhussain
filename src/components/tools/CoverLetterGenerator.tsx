"use client";

import { useMemo, useState } from "react";
import { Field, ToolShell, inputClass } from "./tool-ui";

export function CoverLetterGenerator({ locale }: { locale: "en" | "es" }) {
  const [name, setName] = useState(locale === "es" ? "Alex Rivera" : "Alex Rivera");
  const [role, setRole] = useState(locale === "es" ? "Product Manager" : "Product Manager");
  const [company, setCompany] = useState(locale === "es" ? "Empresa Ejemplo" : "Example Co");
  const [hook, setHook] = useState(
    locale === "es"
      ? "he lanzado productos B2B que mejoraron retención un 18%"
      : "I've shipped B2B products that lifted retention 18%",
  );
  const [why, setWhy] = useState(
    locale === "es"
      ? "vuestra visión de producto y el impacto en el mercado español"
      : "your product vision and impact in the Spanish market",
  );
  const es = locale === "es";

  const letter = useMemo(() => {
    if (es) {
      return `Estimado equipo de ${company},

Me presento: soy ${name}, ${role}. Escribo porque ${why}.

En mi trayectoria reciente, ${hook}. Busco aportar ese mismo foco en ejecución y métricas a ${company}.

Quedo a disposición para una conversación. Gracias por su tiempo.

Un cordial saludo,
${name}`;
    }
    return `Dear ${company} team,

My name is ${name}, ${role}. I'm writing because ${why}.

Recently, ${hook}. I'd like to bring that same shipping focus and metrics discipline to ${company}.

I'm available for a conversation. Thank you for your time.

Best regards,
${name}`;
  }, [name, role, company, hook, why, es]);

  function copy() {
    void navigator.clipboard.writeText(letter);
  }

  function download() {
    const blob = new Blob([letter], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover_letter_${company.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Field label={es ? "Tu nombre" : "Your name"}>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </Field>
          <Field label={es ? "Puesto" : "Role"}>
            <input value={role} onChange={(e) => setRole(e.target.value)} className={inputClass} />
          </Field>
          <Field label={es ? "Empresa" : "Company"}>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
          </Field>
          <Field label={es ? "Logro / gancho" : "Achievement hook"}>
            <textarea value={hook} onChange={(e) => setHook(e.target.value)} rows={2} className={inputClass} />
          </Field>
          <Field label={es ? "Por qué esta empresa" : "Why this company"}>
            <textarea value={why} onChange={(e) => setWhy(e.target.value)} rows={2} className={inputClass} />
          </Field>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copy} className="bg-signal px-4 py-2 text-sm font-semibold text-bone hover:bg-signal-hot">
              {es ? "Copiar" : "Copy"}
            </button>
            <button type="button" onClick={download} className="border border-white/20 px-4 py-2 text-sm font-semibold text-bone hover:border-phosphor hover:text-phosphor">
              {es ? "Descargar .txt" : "Download .txt"}
            </button>
          </div>
        </div>
        <pre className="whitespace-pre-wrap border border-white/15 bg-ink p-4 text-sm leading-relaxed text-bone">{letter}</pre>
      </div>
    </ToolShell>
  );
}
