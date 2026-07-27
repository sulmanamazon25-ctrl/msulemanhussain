"use client";

import { useMemo, useState } from "react";
import { Field, ToolShell, inputClass } from "./tool-ui";

export function CvBuilder({ locale }: { locale: "en" | "es" }) {
  const [name, setName] = useState("Alex Rivera");
  const [title, setTitle] = useState(locale === "es" ? "Product Manager" : "Product Manager");
  const [email, setEmail] = useState("alex@email.com");
  const [phone, setPhone] = useState("+34 600 000 000");
  const [city, setCity] = useState(locale === "es" ? "Madrid, España" : "Madrid, Spain");
  const [summary, setSummary] = useState(
    locale === "es"
      ? "Product builder con foco en SaaS B2B, growth y entrega."
      : "Product builder focused on B2B SaaS, growth, and shipping.",
  );
  const [experience, setExperience] = useState(
    locale === "es"
      ? "Empresa X — Product Manager (2022–actual)\n- Lanzamiento de feature que +18% retención\n- Coordinación squad de 6 personas"
      : "Company X — Product Manager (2022–present)\n- Shipped feature that lifted retention +18%\n- Led a 6-person squad",
  );
  const [education, setEducation] = useState(
    locale === "es" ? "Grado en ADE — Universidad Complutense" : "BBA — Complutense University",
  );
  const [skills, setSkills] = useState("Product, SQL, Figma, Growth, Español/English");
  const es = locale === "es";

  const preview = useMemo(() => {
    return { name, title, email, phone, city, summary, experience, education, skills };
  }, [name, title, email, phone, city, summary, experience, education, skills]);

  function downloadTxt() {
    const body = [
      preview.name,
      preview.title,
      `${preview.email} · ${preview.phone} · ${preview.city}`,
      "",
      es ? "PERFIL" : "SUMMARY",
      preview.summary,
      "",
      es ? "EXPERIENCIA" : "EXPERIENCE",
      preview.experience,
      "",
      es ? "FORMACIÓN" : "EDUCATION",
      preview.education,
      "",
      es ? "SKILLS" : "SKILLS",
      preview.skills,
    ].join("\n");
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${preview.name.replace(/\s+/g, "_")}_CV.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Field label={es ? "Nombre" : "Name"}>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </Field>
          <Field label={es ? "Titular" : "Headline"}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Email">
              <input value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            </Field>
            <Field label={es ? "Teléfono" : "Phone"}>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
            </Field>
          </div>
          <Field label={es ? "Ciudad" : "City"}>
            <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
          </Field>
          <Field label={es ? "Perfil" : "Summary"}>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className={inputClass} />
          </Field>
          <Field label={es ? "Experiencia" : "Experience"}>
            <textarea value={experience} onChange={(e) => setExperience(e.target.value)} rows={5} className={inputClass} />
          </Field>
          <Field label={es ? "Formación" : "Education"}>
            <textarea value={education} onChange={(e) => setEducation(e.target.value)} rows={2} className={inputClass} />
          </Field>
          <Field label="Skills">
            <input value={skills} onChange={(e) => setSkills(e.target.value)} className={inputClass} />
          </Field>
          <div className="flex flex-wrap gap-2 pt-2">
            <button type="button" onClick={() => window.print()} className="bg-signal px-4 py-2 text-sm font-semibold text-ink hover:bg-signal-hot">
              {es ? "Imprimir / PDF" : "Print / PDF"}
            </button>
            <button type="button" onClick={downloadTxt} className="border border-white/20 px-4 py-2 text-sm font-semibold hover:border-phosphor hover:text-phosphor">
              {es ? "Descargar .txt" : "Download .txt"}
            </button>
          </div>
        </div>
        <div id="cv-preview" className="border border-white/15 bg-bone p-5 text-ink print:border-0">
          <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
            <div>
              <h2 className="font-display text-2xl font-bold">{preview.name}</h2>
              <p className="mt-1 text-sm font-semibold text-ink/70">{preview.title}</p>
              <p className="mt-2 text-xs text-ink/60">
                {preview.email} · {preview.phone} · {preview.city}
              </p>
            </div>
            <div className="border-l border-ink/10 pl-3 text-xs text-ink/70">
              <p className="font-semibold uppercase tracking-wider">{es ? "Skills" : "Skills"}</p>
              <p className="mt-1 whitespace-pre-wrap">{preview.skills}</p>
            </div>
          </div>
          <section className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">{es ? "Perfil" : "Summary"}</h3>
            <p className="mt-1 text-sm leading-relaxed">{preview.summary}</p>
          </section>
          <section className="mt-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">{es ? "Experiencia" : "Experience"}</h3>
            <pre className="mt-1 whitespace-pre-wrap font-sans text-sm leading-relaxed">{preview.experience}</pre>
          </section>
          <section className="mt-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">{es ? "Formación" : "Education"}</h3>
            <pre className="mt-1 whitespace-pre-wrap font-sans text-sm leading-relaxed">{preview.education}</pre>
          </section>
          <p className="mt-6 text-[10px] text-ink/40">{es ? "Plantilla ATS · dos columnas · gratis" : "ATS-friendly · two-column · free"}</p>
        </div>
      </div>
    </ToolShell>
  );
}
