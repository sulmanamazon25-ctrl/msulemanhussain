import type { Tool } from "./tools";

type ToolInput = Omit<
  Tool,
  "category" | "relatedProductSlug" | "relatedProductUrl" | "relatedProductLabel" | "processing"
> & { accent?: string };

function spainTool(partial: ToolInput): Tool {
  return {
    category: "spain",
    relatedProductSlug: "spain-eats",
    relatedProductUrl: "https://spaineats.info/",
    relatedProductLabel: "Spain Eats",
    processing: "local",
    accent: partial.accent ?? "#3dd6c6",
    slug: partial.slug,
    en: partial.en,
    es: partial.es,
  };
}

/** Free Spain life / finance / education tools — all client-side. */
export const spainLifeTools: Tool[] = [
  spainTool({
    slug: "crear-cv-profesional",
    accent: "#7dd3fc",
    en: {
      name: "Free professional CV builder",
      title: "Free Professional CV Builder for Spain — ATS Two-Column Resume",
      description:
        "Create a free ATS-friendly resume online with a modern two-column layout for Spanish job applications. Print to PDF in your browser.",
      h1: "Create a professional CV for free",
      intro:
        "Build a clean, ATS-oriented CV tailored for Spain hiring flows. Edit locally, preview a two-column layout, then print to PDF or download plain text — no signup.",
      benefit: "ATS-friendly two-column CV, free in your browser.",
      howTo: ["Fill name, role, experience, education, and skills.", "Preview the two-column layout.", "Print to PDF or download .txt."],
      whatItDoes: "Generates a printable CV structure optimized for clarity and ATS parsing.",
      whatItDoesNot: "It does not auto-submit to job boards or guarantee interview outcomes.",
      tips: ["Keep bullets results-first.", "Export PDF via the browser print dialog.", "Match keywords from the job post."],
      faq: [
        { q: "Is it really free?", a: "Yes. 100% free, runs in your browser, no account." },
        { q: "Is it ATS friendly?", a: "The layout stays text-based with clear headings — good for most ATS parsers." },
      ],
    },
    es: {
      name: "Crear CV profesional gratis",
      title: "Crear CV profesional gratis — Plantilla ATS dos columnas España",
      description:
        "Crea un currículum ATS gratis con diseño moderno de dos columnas para ofertas en España. Imprime a PDF desde el navegador.",
      h1: "Crear CV profesional gratis",
      intro:
        "Monta un CV limpio orientado a ATS para procesos de selección en España. Edita en local, previsualiza dos columnas e imprime a PDF o descarga texto — sin registro.",
      benefit: "CV ATS de dos columnas, gratis en el navegador.",
      howTo: ["Completa nombre, puesto, experiencia, formación y skills.", "Revisa la vista previa.", "Imprime a PDF o descarga .txt."],
      whatItDoes: "Genera una estructura de CV imprimible clara y compatible con ATS.",
      whatItDoesNot: "No envía candidaturas ni garantiza entrevistas.",
      tips: ["Viñetas con resultados.", "PDF desde imprimir del navegador.", "Alinea keywords de la oferta."],
      faq: [
        { q: "¿Es gratis?", a: "Sí. 100% gratis, en tu navegador, sin cuenta." },
        { q: "¿Vale para ATS?", a: "Es texto con encabezados claros — compatible con la mayoría de ATS." },
      ],
    },
  }),
  spainTool({
    slug: "calculadora-evau-2026",
    accent: "#a78bfa",
    en: {
      name: "EvAU 2026 score calculator",
      title: "EvAU 2026 Calculator — University Admission Score Simulator Spain",
      description:
        "Calculate your EvAU 2026 admission grade from Bachillerato, general phase, and specific subjects with university weights.",
      h1: "EvAU 2026 admission score calculator",
      intro:
        "Simulate your Spanish university access and admission grades for 2026 using the standard 0.6×Bach + 0.4×general formula plus specific-phase weights.",
      benefit: "Simulate EvAU access and admission scores instantly.",
      howTo: ["Enter Bachillerato average.", "Add general EvAU grade.", "Set specific subjects and 0.1/0.2 weights."],
      whatItDoes: "Computes access grade and admission grade up to 14.",
      whatItDoesNot: "Does not replace official university cut-offs or convocatoria rules.",
      tips: ["Confirm ponderaciones on your target degree page.", "Try multiple weight combinations."],
      faq: [
        { q: "What is the max score?", a: "Admission can reach 14 with two highly weighted specific subjects." },
        { q: "Is 2026 different?", a: "Core formula is stable; always verify weights for the convocatoria you sit." },
      ],
    },
    es: {
      name: "Calculadora EvAU 2026",
      title: "Calculadora EvAU 2026 — Simulador nota de admisión universidad",
      description:
        "Calcula tu nota de admisión EvAU 2026 con Bachillerato, fase obligatoria y específicas con ponderaciones universitarias.",
      h1: "Calculadora de nota EvAU 2026",
      intro:
        "Simula tu nota de acceso y admisión universitaria 2026 con la fórmula 0,6×Bach + 0,4×obligatoria más ponderaciones de la fase específica.",
      benefit: "Simula notas de acceso y admisión EvAU al instante.",
      howTo: ["Introduce la media de Bachillerato.", "Añade la fase obligatoria.", "Configura específicas y pesos 0,1/0,2."],
      whatItDoes: "Calcula nota de acceso y de admisión (hasta 14).",
      whatItDoesNot: "No sustituye notas de corte oficiales ni reglas de convocatoria.",
      tips: ["Confirma ponderaciones en la web de tu grado.", "Prueba varias combinaciones de pesos."],
      faq: [
        { q: "¿Cuál es la nota máxima?", a: "La admisión puede llegar a 14 con dos específicas bien ponderadas." },
        { q: "¿Cambia en 2026?", a: "La fórmula base es estable; verifica siempre los pesos de tu convocatoria." },
      ],
    },
  }),
  spainTool({
    slug: "calculadora-nota-media",
    accent: "#a78bfa",
    en: {
      name: "Grade average calculator",
      title: "Grade Average Calculator — ESO, Bachillerato, FP & University",
      description: "Calculate simple or weighted grade averages for ESO, Bachillerato, FP, or university courses — free and instant.",
      h1: "Grade average calculator",
      intro: "Paste your subject grades (and optional weights) to get an accurate arithmetic or weighted average for Spanish education tracks.",
      benefit: "Fast averages for school, FP, and university.",
      howTo: ["Enter grades separated by commas.", "Optionally add matching weights.", "Read the average."],
      whatItDoes: "Computes simple or weighted means from your list.",
      whatItDoesNot: "Does not certify official expediente grades.",
      tips: ["Use weights for créditos ECTS.", "Keep the same grade scale (usually 0–10)."],
      faq: [
        { q: "Can I weight by credits?", a: "Yes — provide one weight per grade." },
        { q: "Which levels?", a: "ESO, Bachillerato, FP, and university all work if grades share a scale." },
      ],
    },
    es: {
      name: "Calculadora de nota media",
      title: "Calculadora de nota media — ESO, Bachillerato, FP y universidad",
      description: "Calcula la media aritmética o ponderada para ESO, Bachillerato, FP o universidad — gratis e inmediata.",
      h1: "Calculadora de nota media",
      intro: "Pega tus notas (y pesos opcionales) para obtener la media aritmética o ponderada en itinerarios educativos españoles.",
      benefit: "Medias rápidas para colegio, FP y universidad.",
      howTo: ["Introduce notas separadas por comas.", "Opcionalmente añade pesos.", "Lee la media."],
      whatItDoes: "Calcula medias simples o ponderadas.",
      whatItDoesNot: "No certifica el expediente oficial.",
      tips: ["Usa pesos para créditos ECTS.", "Mantén la misma escala (normalmente 0–10)."],
      faq: [
        { q: "¿Puedo ponderar por créditos?", a: "Sí — un peso por cada nota." },
        { q: "¿Qué niveles cubre?", a: "ESO, Bachillerato, FP y universidad si comparten escala." },
      ],
    },
  }),
  spainTool({
    slug: "smart-deal-finder",
    accent: "#fbbf24",
    en: {
      name: "Smart Deal Finder",
      title: "Smart Deal Finder — Free Promo & Discount Store Directory Spain",
      description: "Find popular Spanish and EU stores for deals, discounts, and promo-code hunting — free curated directory.",
      h1: "Smart Deal Finder",
      intro: "Filter a curated list of stores that frequently run promos in Spain/EU. Jump out to the retailer — no signup, no scraping claims.",
      benefit: "Quick directory of deal-heavy stores.",
      howTo: ["Search by store or category.", "Filter tech, travel, codes, etc.", "Open the retailer."],
      whatItDoes: "Helps you discover where to look for offers.",
      whatItDoesNot: "Does not scrape live prices or guarantee active coupons.",
      tips: ["Pair with cashback apps carefully.", "Check shipping to islands."],
      faq: [
        { q: "Are coupons verified?", a: "No — this is a store directory, not a live coupon API." },
        { q: "Is it free?", a: "Yes, completely free." },
      ],
    },
    es: {
      name: "Smart Deal Finder",
      title: "Smart Deal Finder — Ofertas, descuentos y cupones (directorio gratis)",
      description: "Encuentra tiendas ES/UE con ofertas frecuentes, descuentos y cupones — directorio gratuito.",
      h1: "Smart Deal Finder",
      intro: "Filtra una lista curada de tiendas con promos habituales en España/UE. Salta al retailer — sin registro ni promesas de scraping.",
      benefit: "Directorio rápido de tiendas con ofertas.",
      howTo: ["Busca tienda o categoría.", "Filtra tech, viajes, cupones…", "Abre la tienda."],
      whatItDoes: "Te orienta dónde buscar ofertas.",
      whatItDoesNot: "No scrapea precios ni garantiza cupones activos.",
      tips: ["Combina con cashback con cuidado.", "Revisa envíos a islas."],
      faq: [
        { q: "¿Cupones verificados?", a: "No — es un directorio, no una API de cupones." },
        { q: "¿Es gratis?", a: "Sí, totalmente gratis." },
      ],
    },
  }),
  spainTool({
    slug: "planificador-de-dieta",
    accent: "#4ade80",
    en: {
      name: "Diet planner",
      title: "Free Diet Planner — Calories, Macros, BMI & Water Intake",
      description: "Plan daily calories and macros, estimate BMI and water needs with Mifflin–St Jeor — free browser diet planner.",
      h1: "Diet planner (calories & macros)",
      intro: "Estimate BMR, TDEE, target calories, protein/fat/carbs, BMI, and water intake for lose / maintain / gain goals.",
      benefit: "Calories, macros, BMI, and water in one tool.",
      howTo: ["Enter sex, age, height, weight.", "Pick activity and goal.", "Follow target kcal + macros."],
      whatItDoes: "Uses Mifflin–St Jeor with activity multipliers.",
      whatItDoesNot: "Not medical advice or a meal delivery plan.",
      tips: ["Recalculate after weight changes.", "Prioritize protein when cutting."],
      faq: [
        { q: "Which formula?", a: "Mifflin–St Jeor for BMR, then activity factor for TDEE." },
        { q: "Is data stored?", a: "No — everything stays in your browser session." },
      ],
    },
    es: {
      name: "Planificador de dieta",
      title: "Planificador de dieta gratis — Calorías, macros, IMC y agua",
      description: "Planifica calorías y macros, estima IMC y agua con Mifflin–St Jeor — planificador gratis en el navegador.",
      h1: "Planificador de dieta (calorías y macros)",
      intro: "Estima BMR, TDEE, calorías objetivo, proteínas/grasas/carbos, IMC y agua para perder / mantener / ganar.",
      benefit: "Calorías, macros, IMC y agua en una herramienta.",
      howTo: ["Introduce sexo, edad, altura y peso.", "Elige actividad y objetivo.", "Sigue kcal + macros."],
      whatItDoes: "Usa Mifflin–St Jeor con factores de actividad.",
      whatItDoesNot: "No es consejo médico ni un menú a domicilio.",
      tips: ["Recalcula si cambia el peso.", "Prioriza proteína en déficit."],
      faq: [
        { q: "¿Qué fórmula?", a: "Mifflin–St Jeor para BMR y factor de actividad para TDEE." },
        { q: "¿Se guardan datos?", a: "No — todo queda en tu sesión del navegador." },
      ],
    },
  }),
  spainTool({
    slug: "calculadora-de-salario",
    accent: "#34d399",
    en: {
      name: "Spain salary calculator",
      title: "Spain Net Salary Calculator 2026 — Gross to Net (12/14 Pagas)",
      description:
        "Turn a Spanish gross job offer into estimated net monthly and annual pay. Orientative IRPF brackets + employee Social Security — free, on-device.",
      h1: "Spain net salary calculator (bruto → neto)",
      intro:
        "Spanish offers are quoted in bruto. Before you negotiate rent or sign, convert gross annual pay into an estimated net monthly transfer — including whether the role uses 12 or 14 pagas. This is orientation for candidates and relocators, not a full payroll engine.",
      benefit: "See take-home before you accept the offer.",
      howTo: [
        "Enter the gross annual salary from the offer.",
        "Choose 12 or 14 payments to match the contract.",
        "Adjust employee SS % only if you know your exact rate.",
        "Read estimated net monthly and annual — then compare offers on net.",
      ],
      whatItDoes:
        "Applies simplified state IRPF brackets plus an employee Social Security share to estimate take-home.",
      whatItDoesNot:
        "Does not model every CCAA deduction, disability minimums, other payers, or company benefits in kind. Not AEAT software.",
      tips: [
        "Negotiate and budget on net, not only bruto.",
        "Ask HR whether pagas extras are prorated monthly or paid separately.",
        "If you already had another payer this year, expect different withholding — verify with payroll.",
      ],
      faq: [
        {
          q: "Why is my bank transfer lower than bruto / 12?",
          a: "IRPF withholding and employee Social Security come out before net. 14-paga contracts also change the monthly figure even when annual bruto is identical.",
        },
        {
          q: "Is this accurate for my comunidad autónoma?",
          a: "It is national-orientative. Regional IRPF scales and deductions can move the real number — use this to compare offers, then confirm with a payslip simulation or advisor.",
        },
        {
          q: "Does it include employer Social Security?",
          a: "No. Employer SS is a company cost, not employee take-home. This tool focuses on what you receive.",
        },
        {
          q: "Should I use 12 or 14 pagas?",
          a: "Match the contract. Many Spanish roles still use 14; using the wrong setting mis-prices your monthly rent budget.",
        },
        {
          q: "Is my salary uploaded?",
          a: "No. The calculation stays in your browser.",
        },
      ],
    },
    es: {
      name: "Calculadora de salario",
      title: "Calculadora salario neto España 2026 — Bruto a neto (12/14 pagas)",
      description:
        "Pasa una oferta en bruto a neto mensual y anual estimado. Tramos IRPF orientativos + SS del trabajador — gratis, en tu navegador.",
      h1: "Calculadora de salario neto (bruto → neto)",
      intro:
        "En España las ofertas van en bruto. Antes de negociar el alquiler o firmar, convierte el bruto anual en una transferencia neta mensual estimada — y mira si el puesto paga 12 o 14 pagas. Orientación para candidatos y relocados, no un motor de nómina completo.",
      benefit: "Ve el neto antes de aceptar la oferta.",
      howTo: [
        "Introduce el bruto anual de la oferta.",
        "Elige 12 o 14 pagas según el contrato.",
        "Ajusta el % de SS solo si conoces tu tipo exacto.",
        "Lee el neto mensual y anual — compara ofertas en neto.",
      ],
      whatItDoes:
        "Aplica tramos IRPF estatales simplificados y una parte de SS del trabajador para estimar el neto.",
      whatItDoesNot:
        "No modela todas las deducciones autonómicas, mínimos por discapacidad, otros pagadores ni retribución en especie. No es software de la AEAT.",
      tips: [
        "Negocia y presupuesta en neto, no solo en bruto.",
        "Pregunta si las pagas extras se prorratean o se cobran aparte.",
        "Si ya tuviste otro pagador este año, la retención puede cambiar — confírmalo con nómina o asesor.",
      ],
      faq: [
        {
          q: "¿Por qué el ingreso en cuenta es menor que bruto/12?",
          a: "Salen IRPF y SS del trabajador antes del neto. Con 14 pagas el mensual también cambia aunque el bruto anual sea el mismo.",
        },
        {
          q: "¿Vale para mi comunidad autónoma?",
          a: "Es orientativo estatal. Las escalas y deducciones autonómicas mueven el número real — úsalo para comparar ofertas y confirma con simulación de nómina o asesor.",
        },
        {
          q: "¿Incluye la SS de la empresa?",
          a: "No. La SS empresarial es coste de empresa, no neto del trabajador.",
        },
        {
          q: "¿12 o 14 pagas?",
          a: "Como diga el contrato. Usar el modo incorrecto tuerce el presupuesto mensual del alquiler.",
        },
        {
          q: "¿Se sube mi salario?",
          a: "No. El cálculo queda en tu navegador.",
        },
      ],
    },
  }),
  spainTool({
    slug: "planificador-de-presupuesto",
    accent: "#60a5fa",
    en: {
      name: "Budget planner",
      title: "Free Budget Planner — Income, Expenses & Savings Rate",
      description: "Manage monthly income and expenses, monitor spending categories, and calculate your savings rate — free.",
      h1: "Budget planner",
      intro: "Map income vs housing, food, transport, subscriptions, and other costs to see leftover cash and savings rate.",
      benefit: "See spending and savings rate clearly.",
      howTo: ["Enter net income.", "Fill expense categories.", "Read leftover + savings %."],
      whatItDoes: "Sums categories and computes savings rate.",
      whatItDoesNot: "Does not sync to banks.",
      tips: ["Aim for ≥20% savings when possible.", "Cut subscriptions first."],
      faq: [
        { q: "Is data uploaded?", a: "No — calculations stay on-device." },
        { q: "Currency?", a: "Euro-oriented formatting; amounts are whatever you enter." },
      ],
    },
    es: {
      name: "Planificador de presupuesto",
      title: "Planificador de presupuesto gratis — Ingresos, gastos y tasa de ahorro",
      description: "Gestiona ingresos y gastos mensuales, controla categorías y calcula tu tasa de ahorro — gratis.",
      h1: "Planificador de presupuesto",
      intro: "Compara ingresos con vivienda, comida, transporte, suscripciones y otros para ver el sobrante y la tasa de ahorro.",
      benefit: "Gastos y tasa de ahorro claros.",
      howTo: ["Introduce ingresos netos.", "Rellena categorías.", "Mira sobrante + % ahorro."],
      whatItDoes: "Suma categorías y calcula la tasa de ahorro.",
      whatItDoesNot: "No se conecta a bancos.",
      tips: ["Objetivo ≥20% si puedes.", "Recorta suscripciones primero."],
      faq: [
        { q: "¿Se suben datos?", a: "No — el cálculo es local." },
        { q: "¿Moneda?", a: "Formato en euros; los importes son los que introduzcas." },
      ],
    },
  }),
  spainTool({
    slug: "estimador-de-envios",
    accent: "#fb923c",
    en: {
      name: "Shipping cost estimator",
      title: "Shipping Cost Estimator — Spain, Islands, EU & International",
      description: "Estimate parcel shipping cost and delivery time for Spain mainland, islands, EU, and international lanes.",
      h1: "Shipping estimator",
      intro: "Get a quick orientative price and ETA based on weight, destination zone, and standard vs express service.",
      benefit: "Ballpark parcel cost and delivery window.",
      howTo: ["Enter weight in kg.", "Pick destination zone.", "Choose standard or express."],
      whatItDoes: "Applies a simple zone + weight pricing model.",
      whatItDoesNot: "Not a live carrier quote from Correos or private networks.",
      tips: ["Islands usually cost more.", "Compare at least two carriers."],
      faq: [
        { q: "Accurate quote?", a: "Orientation only — confirm with the carrier checkout." },
        { q: "Includes customs?", a: "No — international VAT/duties are excluded." },
      ],
    },
    es: {
      name: "Estimador de envíos",
      title: "Estimador de envíos — Península, islas, UE e internacional",
      description: "Estima coste y plazo de paquetería para península, islas, UE e internacional.",
      h1: "Estimador de envíos",
      intro: "Obtén un precio y plazo orientativos según peso, zona y servicio estándar o exprés.",
      benefit: "Orden de magnitud de coste y entrega.",
      howTo: ["Introduce peso en kg.", "Elige destino.", "Elige estándar o exprés."],
      whatItDoes: "Aplica un modelo simple de zona + peso.",
      whatItDoesNot: "No es una tarifa en vivo de Correos u otros.",
      tips: ["Las islas suelen costar más.", "Compara al menos dos operadores."],
      faq: [
        { q: "¿Es exacto?", a: "Orientativo — confirma en el checkout del carrier." },
        { q: "¿Aduanas?", a: "No — IVA/aranceles internacionales no incluidos." },
      ],
    },
  }),
  spainTool({
    slug: "calculadora-de-hipoteca",
    accent: "#f472b6",
    en: {
      name: "Mortgage calculator",
      title: "Spain Mortgage Calculator — Monthly Payment, Interest & Euribor",
      description: "Calculate monthly mortgage payments, total interest, and LTV for fixed or Euribor + spread variable loans in Spain.",
      h1: "Mortgage calculator",
      intro: "Estimate Spanish home-loan monthly payments for fixed rates or variable Euribor + differential, including total interest and LTV.",
      benefit: "Monthly quota, interest, and LTV in seconds.",
      howTo: ["Enter price and down payment.", "Set term years.", "Choose fixed or variable rate inputs."],
      whatItDoes: "Uses standard amortization math.",
      whatItDoesNot: "Excludes insurance, fees, and ITP/AJD taxes.",
      tips: ["Stress-test +1% rate.", "Keep LTV ≤80% when possible."],
      faq: [
        { q: "Variable formula?", a: "Annual rate ≈ Euribor + spread, then monthly amortization." },
        { q: "Includes bank fees?", a: "No — add opening fees separately." },
      ],
    },
    es: {
      name: "Calculadora de hipoteca",
      title: "Calculadora de hipoteca España — Cuota, intereses y Euribor",
      description: "Calcula la cuota mensual, intereses totales y LTV para hipoteca fija o variable Euribor + diferencial.",
      h1: "Calculadora de hipoteca",
      intro: "Estima la cuota de hipoteca en España a tipo fijo o variable (Euribor + diferencial), con intereses totales y LTV.",
      benefit: "Cuota, intereses y LTV en segundos.",
      howTo: ["Introduce precio y entrada.", "Define plazo.", "Elige fijo o variable."],
      whatItDoes: "Usa amortización francesa estándar.",
      whatItDoesNot: "No incluye seguros, comisiones ni ITP/AJD.",
      tips: ["Prueba +1% de tipo.", "Intenta LTV ≤80%."],
      faq: [
        { q: "¿Variable?", a: "Tipo anual ≈ Euribor + diferencial, luego cuota mensual." },
        { q: "¿Comisiones?", a: "No — súmalas aparte." },
      ],
    },
  }),
  spainTool({
    slug: "validador-dni-nie",
    accent: "#38bdf8",
    en: {
      name: "DNI / NIE validator",
      title: "Spanish DNI / NIE Validator — Check or Calculate Control Letter",
      description: "Validate Spanish DNI or NIE numbers or calculate the correct control letter securely in your browser — free.",
      h1: "DNI / NIE validator",
      intro: "Check DNI and NIE checksum letters locally using the official modulo-23 alphabet. Nothing is uploaded.",
      benefit: "Validate or compute the control letter on-device.",
      howTo: ["Paste DNI or NIE.", "See validity or expected letter.", "Fix typos before forms."],
      whatItDoes: "Implements the standard letter algorithm.",
      whatItDoesNot: "Does not verify identity with government databases.",
      tips: ["NIE starts with X, Y, or Z.", "Works offline after page load."],
      faq: [
        { q: "Is my ID sent anywhere?", a: "No — validation is 100% local." },
        { q: "Can it invent a valid ID?", a: "It only checks/format-completes letters; it cannot create legal IDs." },
      ],
    },
    es: {
      name: "Validador de DNI / NIE",
      title: "Validador DNI / NIE — Comprueba o calcula la letra de control",
      description: "Valida DNI o NIE españoles o calcula la letra correcta de forma segura en tu dispositivo — gratis.",
      h1: "Validador de DNI / NIE",
      intro: "Comprueba la letra de control de DNI y NIE en local con el alfabeto módulo 23 oficial. No se sube nada.",
      benefit: "Valida o calcula la letra en tu dispositivo.",
      howTo: ["Pega el DNI o NIE.", "Mira validez o letra esperada.", "Corrige typos antes de formularios."],
      whatItDoes: "Implementa el algoritmo estándar de letra.",
      whatItDoesNot: "No verifica identidad en bases gubernamentales.",
      tips: ["El NIE empieza por X, Y o Z.", "Funciona offline tras cargar."],
      faq: [
        { q: "¿Se envía mi documento?", a: "No — 100% local." },
        { q: "¿Puede inventar un DNI?", a: "Solo comprueba/completa la letra; no crea documentos legales." },
      ],
    },
  }),
  spainTool({
    slug: "calculadora-de-finiquito",
    accent: "#e879f9",
    en: {
      name: "Severance / finiquito calculator",
      title: "Spain Finiquito Calculator — Indemnity, Vacation & Pending Pay",
      description:
        "Estimate a Spanish employment exit settlement: dismissal indemnity days, unused vacation, and pending extras — free orientation before you sign.",
      h1: "Finiquito calculator (Spain)",
      intro:
        "A finiquito is not one number — it is usually pending salary, unused vacation (and often paga proration), plus indemnity that only applies to some exits. Use this to build an orientation total so you can ask HR or a labour lawyer to explain every line before you sign.",
      benefit: "Separate the pots before you sign a settlement.",
      howTo: [
        "Enter monthly salary and years/months of tenure.",
        "Pick the exit type that matches your letter (or ask HR which one they claim).",
        "Add unused vacation days and any pending extras.",
        "Read the orientation total — then demand a written breakdown.",
      ],
      whatItDoes: "Applies common statutory day tables (e.g. 20 vs 33 days/year patterns) with simple caps for orientation.",
      whatItDoesNot:
        "Does not replace your convenio, a labour lawyer, or the exact daily salary base from your payslips.",
      tips: [
        "Check whether your convenio improves on the statutory minimum.",
        "Keep the last payslips — daily base disputes are common.",
        "Temporary contract ends often lack statutory indemnity but still owe vacation/extras.",
      ],
      faq: [
        {
          q: "What is the difference between 20 and 33 days?",
          a: "As a rule of thumb, objective dismissals often use 20 days/year of service and unfair (improcedente) dismissals 33 — with legal caps. Your letter and convenio decide which path applies; do not guess when money is large.",
        },
        {
          q: "Does every exit include indemnity?",
          a: "No. Many end-of-temporary-contract situations do not carry the same statutory indemnity as a dismissal, but vacation and prorated extras can still be due.",
        },
        {
          q: "Can I rely on this number in court?",
          a: "No. It is an orientation tool. Contested exits need payslip math and professional advice.",
        },
        {
          q: "Should I sign the same day?",
          a: "If you do not understand a line, ask for time and a written breakdown. Signing under pressure is a common regret.",
        },
        {
          q: "Is data uploaded?",
          a: "No — everything stays on your device.",
        },
      ],
    },
    es: {
      name: "Calculadora de finiquito",
      title: "Calculadora de finiquito España — Indemnización, vacaciones y pagas",
      description:
        "Estima la liquidación al salir de un empleo: días de indemnización, vacaciones pendientes y extras — orientación gratis antes de firmar.",
      h1: "Calculadora de finiquito (España)",
      intro:
        "El finiquito no es un solo número: suele incluir salario pendiente, vacaciones (y a menudo prorrata de pagas) e indemnización que solo aplica en algunas salidas. Úsalo para montar un total orientativo y pedir a RR. HH. o a un laboralista el desglose línea a línea antes de firmar.",
      benefit: "Separa los conceptos antes de firmar la liquidación.",
      howTo: [
        "Introduce salario mensual y antigüedad.",
        "Elige el tipo de salida que indica la carta (o pregunta cuál reclaman).",
        "Añade vacaciones pendientes y extras.",
        "Lee el total orientativo — y exige el desglose por escrito.",
      ],
      whatItDoes: "Aplica tablas habituales de días (p. ej. patrones 20 vs 33 días/año) con topes simples para orientar.",
      whatItDoesNot:
        "No sustituye tu convenio, un laboralista ni la base diaria exacta de tus nóminas.",
      tips: [
        "Revisa si el convenio mejora el mínimo legal.",
        "Guarda las últimas nóminas — la base diaria se discute mucho.",
        "El fin de contrato temporal a menudo no lleva la misma indemnización, pero vacaciones/extras sí pueden deberse.",
      ],
      faq: [
        {
          q: "¿Qué cambia entre 20 y 33 días?",
          a: "Como regla orientativa, despido objetivo suele 20 días/año e improcedente 33 — con topes legales. Lo decide tu carta y convenio; no adivines si hay mucho dinero.",
        },
        {
          q: "¿Toda salida incluye indemnización?",
          a: "No. Muchos fines de contrato temporal no llevan la misma indemnización tipificada, pero vacaciones y prorratas sí pueden corresponder.",
        },
        {
          q: "¿Sirve este número ante un juez?",
          a: "No. Es orientación. Las salidas conflictivas necesitan nóminas y consejo profesional.",
        },
        {
          q: "¿Debo firmar el mismo día?",
          a: "Si no entiendes una línea, pide tiempo y desglose escrito. Firmar con prisa es un arrepentimiento habitual.",
        },
        {
          q: "¿Se suben mis datos?",
          a: "No — todo queda en tu dispositivo.",
        },
      ],
    },
  }),
  spainTool({
    slug: "cuota-de-autonomos",
    accent: "#facc15",
    en: {
      name: "Autónomos quota calculator",
      title: "Cuota de Autónomos 2026 — Monthly RETA Estimate by Net Earnings",
      description:
        "Estimate your monthly Spanish autónomo Social Security cuota from net earnings, with optional early flat-rate mode — free orientation for 2026 planning.",
      h1: "Autónomos cuota calculator (2026)",
      intro:
        "RETA does not wait for late invoices. Before you price clients or quit a salaried job, ballpark the monthly cuota from estimated net earnings. For 2026, Spain extended the previous bracket logic after negotiations stalled — treat this as planning math, then confirm in Importass or with your gestoría.",
      benefit: "Price your work with cuota already in the budget.",
      howTo: [
        "Estimate realistic monthly net earnings (not best-case month).",
        "Toggle flat-rate mode only if you are in an eligible early period.",
        "Read contribution base + monthly cuota orientation.",
        "Add a tax buffer on top before you set client prices.",
      ],
      whatItDoes: "Maps simplified earnings brackets to contribution bases and a monthly cuota estimate.",
      whatItDoesNot: "Not official Importass output. Brackets and flat-rate campaigns change — verify before you file.",
      tips: [
        "Use a quiet-month net, not your best month, when stress-testing cashflow.",
        "Tarifa plana is temporary — plan the step-up.",
        "Change of base is a process; ask your gestoría before you move.",
      ],
      faq: [
        {
          q: "Did cuotas change in 2026?",
          a: "Public reporting indicated the government extended the prior bracket system into early 2026 after talks stalled. Always confirm the table that applies to your alta before you budget.",
        },
        {
          q: "Is this the official Seguridad Social number?",
          a: "No. It is orientation so you can plan. Importass / your advisor is authoritative.",
        },
        {
          q: "What is tarifa plana?",
          a: "An early-period reduced cuota for many new altas. It is not permanent — model the later step-up or you will underprice clients.",
        },
        {
          q: "Should I include IVA when estimating net?",
          a: "Cuota is driven by your net earnings base for RETA, not by charging IVA to clients. Keep IVA cashflow separate from personal net.",
        },
        {
          q: "Is data uploaded?",
          a: "No — local only.",
        },
      ],
    },
    es: {
      name: "Cuota de autónomos",
      title: "Cuota de autónomos 2026 — Estimación mensual RETA por rendimientos",
      description:
        "Estima tu cuota mensual de autónomos según rendimiento neto, con modo tarifa plana opcional — orientación gratis para planificar 2026.",
      h1: "Calculadora de cuota de autónomos (2026)",
      intro:
        "La RETA no espera a que el cliente pague. Antes de fijar precios o dejar un empleo, estima la cuota mensual con un neto realista. En 2026 se prorrogó la lógica de tramos anterior tras el bloqueo negociador — úsalo para planificar y confirma en Importass o con tu gestoría.",
      benefit: "Precifica tu trabajo con la cuota ya en el presupuesto.",
      howTo: [
        "Estima un neto mensual realista (no el mejor mes).",
        "Activa tarifa plana solo si estás en periodo elegible.",
        "Lee base de cotización + cuota mensual orientativa.",
        "Suma un colchón fiscal antes de fijar precios a clientes.",
      ],
      whatItDoes: "Asocia tramos simplificados de rendimientos a bases y una cuota mensual estimada.",
      whatItDoesNot: "No es el resultado oficial de Importass. Los tramos y campañas cambian — verifica antes de presentar.",
      tips: [
        "Estresa la caja con un mes flojo, no con el mejor.",
        "La tarifa plana es temporal — planifica el salto.",
        "Cambiar de base es un trámite; habla con gestoría antes.",
      ],
      faq: [
        {
          q: "¿Cambió la cuota en 2026?",
          a: "La información pública indica que se prorrogó el sistema de tramos previo al inicio de 2026. Confirma siempre la tabla que aplica a tu alta.",
        },
        {
          q: "¿Es el número oficial de la Seguridad Social?",
          a: "No. Es orientación para planificar. Importass / tu asesor mandan.",
        },
        {
          q: "¿Qué es la tarifa plana?",
          a: "Una cuota reducida inicial para muchas altas nuevas. No es permanente — modela el tramo siguiente o infra-cobrarás.",
        },
        {
          q: "¿Debo incluir el IVA al estimar el neto?",
          a: "La cuota mira tu base de rendimientos netos RETA, no el IVA que cobras. Separa la caja del IVA del neto personal.",
        },
        {
          q: "¿Se suben datos?",
          a: "No — solo en local.",
        },
      ],
    },
  }),
  spainTool({
    slug: "calculadora-fecha-de-parto",
    accent: "#f9a8d4",
    en: {
      name: "Due date calculator",
      title: "Pregnancy Due Date Calculator — Week, Milestones & ETA",
      description: "Estimate due date, current pregnancy week, and key milestones from last menstrual period — free Naegele guidance tool.",
      h1: "Pregnancy due date calculator",
      intro: "Enter your LMP to estimate due date (~280 days), current week+day, days remaining, and trimester milestones.",
      benefit: "Due date, week, and milestones instantly.",
      howTo: ["Pick last menstrual period date.", "Read due date and current week.", "Review milestone dates."],
      whatItDoes: "Applies Naegele’s rule locally.",
      whatItDoesNot: "Not a medical diagnosis — confirm with your clinician.",
      tips: ["Ultrasound dating may adjust ETA.", "Track symptoms separately with your care team."],
      faq: [
        { q: "Why 280 days?", a: "Standard obstetric estimate from LMP (40 weeks)." },
        { q: "Private data?", a: "Stays in your browser only." },
      ],
    },
    es: {
      name: "Calculadora de fecha de parto",
      title: "Calculadora fecha de parto — Semana, hitos y FPP",
      description: "Estima la fecha probable de parto, semana de gestación e hitos desde la FUM — herramienta gratis (Naegele).",
      h1: "Calculadora de fecha de parto",
      intro: "Introduce la FUM para estimar la FPP (~280 días), semana+día actual, días restantes e hitos del embarazo.",
      benefit: "FPP, semana e hitos al instante.",
      howTo: ["Elige la fecha de última menstruación.", "Lee FPP y semana actual.", "Revisa hitos."],
      whatItDoes: "Aplica la regla de Naegele en local.",
      whatItDoesNot: "No es diagnóstico médico — confirma con tu profesional.",
      tips: ["La ecografía puede ajustar la FPP.", "Sigue síntomas con tu equipo sanitario."],
      faq: [
        { q: "¿Por qué 280 días?", a: "Estimación obstétrica estándar desde FUM (40 semanas)." },
        { q: "¿Datos privados?", a: "Solo en tu navegador." },
      ],
    },
  }),
];
