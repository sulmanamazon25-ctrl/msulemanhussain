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
      title: "EvAU 2026 Calculator — Access & Admission Score Before Selectividad",
      description:
        "Simulate your Spanish university access and admission grades for EvAU/EBAU 2026: Bachillerato + general phase + weighted específicas — free, on-device orientation.",
      h1: "EvAU 2026 calculator — know your score before you pick específicas",
      intro:
        "Selectividad stress is usually about cut-offs you cannot see yet. This simulator applies the standard access formula (0.6×Bach + 0.4×general) and adds specific-phase subjects with 0.1/0.2 university weights so you can test which combination gets you closer to a degree's published nota de corte. Orientation only — official ponderaciones and cut-offs live on each university site.",
      benefit: "Test admission scenarios before exam day.",
      howTo: [
        "Enter your Bachillerato average (media).",
        "Add the general / mandatory EvAU phase grade.",
        "Add up to two specific subjects and choose 0.1 or 0.2 weights from your target degree table.",
        "Read access grade and admission grade (up to 14) — then compare with published cut-offs.",
      ],
      whatItDoes:
        "Computes access and admission scores using the common Spanish weighting model and the subject weights you enter.",
      whatItDoesNot:
        "Does not publish official notas de corte, CCAA convocatoria rules, or guarantee a plaza. Weights must match your target faculty table.",
      tips: [
        "Confirm ponderaciones on the exact grado page — the same subject can be 0.2 for one degree and 0.1 for another.",
        "Run best/worst Bach media scenarios if your expediente is still provisional.",
        "Admission up to 14 needs two strong específicas with high weights — plan subjects early.",
      ],
      faq: [
        {
          q: "What is the difference between access and admission?",
          a: "Access (nota de acceso) mixes Bachillerato and the general phase. Admission adds weighted específicas and is what cut-offs usually refer to (scale up to 14).",
        },
        {
          q: "Is EvAU the same as EBAU / Selectividad?",
          a: "Names vary by comunidad, but the access/admission logic families are similar. Always verify your CCAA convocatoria wording.",
        },
        {
          q: "Where do I get the 0.1 / 0.2 weights?",
          a: "From the university's ponderaciones table for that degree and year — not from this site.",
        },
        {
          q: "Does this replace the official university calculator?",
          a: "No. Use it to explore scenarios; trust the faculty tools and published cut-offs for decisions.",
        },
        {
          q: "Are my grades uploaded?",
          a: "No — everything stays in your browser.",
        },
      ],
    },
    es: {
      name: "Calculadora EvAU 2026",
      title: "Calculadora EvAU 2026 — Nota de acceso y admisión antes de Selectividad",
      description:
        "Simula tu nota de acceso y admisión EvAU/EBAU 2026: Bachillerato + fase general + específicas ponderadas — orientación gratis en el navegador.",
      h1: "Calculadora EvAU 2026 — conoce tu nota antes de elegir específicas",
      intro:
        "El estrés de Selectividad suele ser por notas de corte que aún no ves. Este simulador aplica la fórmula habitual de acceso (0,6×Bach + 0,4×general) y suma específicas con pesos 0,1/0,2 para probar qué combinación te acerca al corte publicado de un grado. Solo orientación — las ponderaciones y cortes oficiales están en cada universidad.",
      benefit: "Prueba escenarios de admisión antes del examen.",
      howTo: [
        "Introduce la media de Bachillerato.",
        "Añade la nota de la fase general / obligatoria.",
        "Añade hasta dos específicas y elige pesos 0,1 o 0,2 según la tabla del grado.",
        "Lee nota de acceso y de admisión (hasta 14) — compáralas con los cortes publicados.",
      ],
      whatItDoes:
        "Calcula acceso y admisión con el modelo de ponderación habitual y los pesos que introduces.",
      whatItDoesNot:
        "No publica notas de corte oficiales ni reglas de convocatoria autonómica. Los pesos deben coincidir con la tabla de tu facultad.",
      tips: [
        "Confirma ponderaciones en la ficha exacta del grado — la misma asignatura puede ser 0,2 en uno y 0,1 en otro.",
        "Simula mejor/peor media de Bach si el expediente aún es provisional.",
        "Llegar a 14 exige dos específicas fuertes con alto peso — elige asignaturas pronto.",
      ],
      faq: [
        {
          q: "¿Qué diferencia hay entre acceso y admisión?",
          a: "La de acceso mezcla Bachillerato y fase general. La de admisión suma específicas ponderadas y es la que suelen usar los cortes (hasta 14).",
        },
        {
          q: "¿EvAU es lo mismo que EBAU / Selectividad?",
          a: "El nombre cambia según la comunidad, pero la lógica de acceso/admisión es familiar. Verifica siempre el texto de tu convocatoria.",
        },
        {
          q: "¿De dónde salen los pesos 0,1 / 0,2?",
          a: "De la tabla de ponderaciones de la universidad para ese grado y año — no de este sitio.",
        },
        {
          q: "¿Sustituye a la calculadora oficial de la uni?",
          a: "No. Úsala para explorar escenarios; decide con las herramientas de la facultad y los cortes publicados.",
        },
        {
          q: "¿Se suben mis notas?",
          a: "No — todo queda en tu navegador.",
        },
      ],
    },
  }),
  spainTool({
    slug: "calculadora-nota-media",
    accent: "#a78bfa",
    en: {
      name: "Grade average calculator",
      title: "Grade Average Calculator — Know Your Bachillerato Media Before EvAU",
      description:
        "Need your ESO or Bachillerato average for selectividad but the expediente is not updated yet? Calculate simple or weighted means for ESO, Bach, FP, or uni — free, instant, on-device.",
      h1: "Grade average calculator — your media before the pressure hits",
      intro:
        "Your Bachillerato media feeds directly into the EvAU access formula (60% of the score). If you are tracking trimestre marks, recovering a suspenso, or weighting ECTS credits, this gives a quick arithmetic or weighted average — so you know where you stand before June. Orientation only; your centre's official expediente is what counts on exam day.",
      benefit: "Estimate your media before EvAU and cut-off planning.",
      howTo: [
        "List subject grades on the same 0–10 scale, separated by commas.",
        "For weighted averages (e.g. ECTS credits), add one weight per grade in the same order.",
        "Read the simple or weighted mean.",
        "Plug the result into the EvAU calculator or compare with your centre's provisional expediente.",
      ],
      whatItDoes:
        "Computes arithmetic or credit-weighted averages from the grades and weights you enter.",
      whatItDoesNot:
        "Does not pull grades from your school's platform, apply suspenso recovery rules, or certify the official expediente académico.",
      tips: [
        "For Bachillerato, include all curricular subjects your centre counts — ask orientación if a recovered mark replaces the old one.",
        "At university, match ECTS credits as weights (e.g. 6, 6, 3) so heavy subjects count more.",
        "Round only at the end; use two decimals when comparing with published cut-offs.",
      ],
      faq: [
        {
          q: "Why does Bachillerato media matter for EvAU?",
          a: "It is 60% of your access score (nota de acceso). A low media is hard to offset even with a strong general-phase mark — track it early.",
        },
        {
          q: "Can I weight by ECTS credits?",
          a: "Yes. Enter one weight per grade in the same order — typical for university trimestre or annual subject lists.",
        },
        {
          q: "What if I have a suspenso?",
          a: "This tool does not know your centre's recovery rules. Use the mark that will appear on the official expediente, or run best/worst scenarios manually.",
        },
        {
          q: "Does it work for FP and ESO?",
          a: "Yes, as long as all grades use the same scale (usually 0–10). FP higher-level averages follow the same math if you enter consistent weights.",
        },
        {
          q: "Are my grades stored?",
          a: "No. Calculations stay in your browser.",
        },
      ],
    },
    es: {
      name: "Calculadora de nota media",
      title: "Calculadora de nota media — Tu media de Bachillerato antes del EvAU",
      description:
        "¿Necesitas la media de ESO o Bachillerato para la selectividad y el expediente aún no está actualizado? Calcula medias aritméticas o ponderadas para ESO, Bach, FP o uni — gratis, al instante, en tu dispositivo.",
      h1: "Calculadora de nota media — tu media antes de que apriete",
      intro:
        "La media de Bachillerato entra directamente en la fórmula de acceso al EvAU (el 60%). Si vas apuntando notas de trimestre, recuperando un suspenso o ponderando créditos ECTS, aquí obtienes una media aritmética o ponderada rápida — para saber dónde estás antes de junio. Solo orientación; el expediente oficial del centro es el que cuenta el día del examen.",
      benefit: "Estima tu media antes del EvAU y de mirar cortes.",
      howTo: [
        "Lista las notas en escala 0–10, separadas por comas.",
        "Para media ponderada (p. ej. créditos ECTS), añade un peso por nota en el mismo orden.",
        "Lee la media simple o ponderada.",
        "Pasa el resultado a la calculadora EvAU o compáralo con el expediente provisional del instituto.",
      ],
      whatItDoes:
        "Calcula medias aritméticas o ponderadas por créditos a partir de las notas y pesos que introduces.",
      whatItDoesNot:
        "No descarga notas de la plataforma del centro, no aplica reglas de recuperación de suspensos ni certifica el expediente académico oficial.",
      tips: [
        "En Bachillerato, incluye las asignaturas curriculares que cuenta tu centro — pregunta en orientación si una recuperación sustituye la nota anterior.",
        "En la uni, usa los créditos ECTS como pesos (p. ej. 6, 6, 3) para que las asignaturas grandes pesen más.",
        "Redondea solo al final; usa dos decimales al comparar con cortes publicados.",
      ],
      faq: [
        {
          q: "¿Por qué importa la media de Bachillerato para el EvAU?",
          a: "Es el 60% de la nota de acceso. Una media baja cuesta mucho compensar aunque saques buena nota en la fase general — conviene irla siguiendo.",
        },
        {
          q: "¿Puedo ponderar por créditos ECTS?",
          a: "Sí. Un peso por cada nota en el mismo orden — habitual en listados trimestrales o anuales de la universidad.",
        },
        {
          q: "¿Y si tengo un suspenso?",
          a: "La herramienta no conoce las reglas de recuperación de tu centro. Usa la nota que figurará en el expediente oficial, o prueba escenarios optimista/pesimista a mano.",
        },
        {
          q: "¿Vale para FP y ESO?",
          a: "Sí, si todas las notas comparten escala (normalmente 0–10). Las medias de FP superior siguen la misma lógica con pesos coherentes.",
        },
        {
          q: "¿Se guardan mis notas?",
          a: "No. El cálculo queda en tu navegador.",
        },
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
      title: "Household Budget Planner — Does Your Net Pay Cover Rent in Spain?",
      description:
        "Rent, groceries, and transport eat most of a Spanish pay cheque — but where does the rest go? Map monthly net income vs housing, food, bills, and subscriptions to see leftover cash and savings rate. Free, private, no bank login.",
      h1: "Budget planner — see what is left after rent and bills",
      intro:
        "Whether you are a student splitting a piso, a family on 12 vs 14 pagas, or relocating and guessing at Spanish living costs, the first question is the same: after net income hits the account, what actually remains? Enter your monthly take-home and realistic expenses to see surplus, deficit, and savings rate — orientation for planning, not accounting software.",
      benefit: "Know if the month closes before you sign a lease or loan.",
      howTo: [
        "Enter net monthly income (salary, grants, family support — what actually lands in the account).",
        "Fill housing, food, transport, utilities, subscriptions, and other categories with realistic figures.",
        "Read leftover cash and savings rate (% of income not spent).",
        "Adjust categories — e.g. lower rent target or cut subscriptions — until the month balances or hits your savings goal.",
      ],
      whatItDoes:
        "Totals expense categories, subtracts from income, and calculates monthly surplus/deficit and savings rate.",
      whatItDoesNot:
        "Does not connect to banks, import transactions, file taxes, or tell you what you 'should' spend — amounts are whatever you enter.",
      tips: [
        "Use net pay, not gross: in Spain, IRPF and Social Security already reduced your transfer — budget on what you receive.",
        "If your contract uses 14 pagas, either enter the average monthly deposit or budget the months when extras do not arrive.",
        "Start with rent + groceries + transport (often 50–65% in cities); subscriptions and dining out are usually the fastest cuts.",
      ],
      faq: [
        {
          q: "Should I use gross or net salary?",
          a: "Net — what hits your bank. Gross bruto mis-prices rent in Madrid, Barcelona, or any city where owners ask for 3× net income.",
        },
        {
          q: "What is a healthy savings rate in Spain?",
          a: "There is no single rule. Many planners aim for 10–20% of net if possible; students and new arrivals often start lower — the tool shows your actual % so you can set a realistic target.",
        },
        {
          q: "Can students or families use it?",
          a: "Yes. Add ERASMUS grants, beca MEC, parental support, or combined household income in the income field — then map shared rent and groceries.",
        },
        {
          q: "Does it connect to my bank?",
          a: "No. Nothing is uploaded. You type amounts manually — useful if you want privacy or are planning before moving to Spain.",
        },
        {
          q: "12 or 14 pagas — how do I enter income?",
          a: "Either spread annual net over 12 equal months, or enter the lower months and keep a separate buffer for July/December extras. Consistency matters more than the method.",
        },
      ],
    },
    es: {
      name: "Planificador de presupuesto",
      title: "Planificador de presupuesto familiar — ¿Te llega el neto para el alquiler?",
      description:
        "Alquiler, compra y transporte se llevan gran parte del sueldo — ¿y el resto? Reparte ingresos netos mensuales vs vivienda, comida, facturas y suscripciones para ver el sobrante y la tasa de ahorro. Gratis, privado, sin banco.",
      h1: "Planificador de presupuesto — lo que queda tras alquiler y facturas",
      intro:
        "Ya seas estudiante en un piso compartido, familia con 12 o 14 pagas, o recién llegado estimando costes en España, la pregunta es la misma: cuando entra el neto en cuenta, ¿qué queda de verdad? Introduce ingresos y gastos realistas para ver superávit, déficit y tasa de ahorro — orientación para planificar, no un programa de contabilidad.",
      benefit: "Comprueba si cierras el mes antes de firmar un alquiler o un préstamo.",
      howTo: [
        "Introduce ingresos netos mensuales (nómina, becas, ayuda familiar — lo que entra en cuenta).",
        "Rellena vivienda, comida, transporte, suministros, suscripciones y otros gastos con cifras realistas.",
        "Lee el sobrante y la tasa de ahorro (% del ingreso no gastado).",
        "Ajusta categorías — p. ej. bajar objetivo de alquiler o recortar suscripciones — hasta equilibrar o alcanzar tu meta de ahorro.",
      ],
      whatItDoes:
        "Suma categorías de gasto, resta del ingreso y calcula superávit/déficit mensual y tasa de ahorro.",
      whatItDoesNot:
        "No se conecta al banco, no importa movimientos, no presenta impuestos ni dice cuánto 'deberías' gastar — los importes son los que tú pongas.",
      tips: [
        "Presupuesta en neto, no en bruto: IRPF y SS ya restaron antes de la transferencia.",
        "Con 14 pagas, mete el ingreso medio mensual o planifica los meses sin paga extra.",
        "Empieza por alquiler + compra + transporte (a menudo 50–65% en ciudades); suscripciones y comer fuera suelen ser los recortes más rápidos.",
      ],
      faq: [
        {
          q: "¿Pongo bruto o neto?",
          a: "Neto — lo que entra en el banco. Presupuestar en bruto distorsiona el alquiler en Madrid, Barcelona o donde pidan 3× ingresos netos.",
        },
        {
          q: "¿Qué tasa de ahorro es razonable en España?",
          a: "No hay una cifra única. Muchas familias apuntan al 10–20% del neto si pueden; estudiantes y recién llegados suelen empezar más bajo — la herramienta muestra tu % real para fijar una meta posible.",
        },
        {
          q: "¿Sirve para estudiantes o familias?",
          a: "Sí. Suma becas ERASMUS, MEC, ayuda de padres o ingresos del hogar — y reparte alquiler y compra compartidos.",
        },
        {
          q: "¿Se conecta a mi banco?",
          a: "No. No se sube nada. Tú introduces las cifras — útil si quieres privacidad o planificas antes de mudarte a España.",
        },
        {
          q: "¿12 o 14 pagas — cómo meto el sueldo?",
          a: "Reparte el neto anual en 12 meses iguales, o pon los meses bajos y guarda colchón para julio/diciembre. Lo importante es ser coherente.",
        },
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
      title: "Spain Mortgage Calculator — Monthly Cuota, Euribor & LTV Estimate",
      description:
        "Estimate your Spanish mortgage monthly payment, total interest, and LTV for fixed or Euribor + spread variable loans — free orientation before you visit the bank.",
      h1: "Spain mortgage calculator (cuota & LTV)",
      intro:
        "Banks sell you a monthly cuota, but affordability is more than that number. You still need cash for ITP or VAT, notary, registry, and often a 20% down payment — none of which appear in the loan quote. Use this to model principal, monthly payment, total interest, and LTV for fixed or variable (Euribor + spread) Spanish mortgages. Orientation only: your bank's FEIN and notary breakdown are what you sign.",
      benefit: "See cuota, LTV, and total interest before the bank meeting.",
      howTo: [
        "Enter the purchase price and your planned down payment (entrada).",
        "Set the loan term in years — 25–30 is common in Spain.",
        "Pick fixed rate or variable (Euribor + bank spread).",
        "Read monthly cuota, LTV, and total interest — then stress-test +1% on the rate.",
      ],
      whatItDoes:
        "Applies standard French amortization to the loan principal (price minus down payment), showing monthly payment, total interest paid, and LTV percentage.",
      whatItDoesNot:
        "Does not include home insurance, life insurance, opening fees, ITP/AJD/VAT purchase taxes, or notary costs. Not a bank binding offer (FEIN).",
      tips: [
        "Pair with a purchase-cost calculator — cuota alone hides €15k–€30k+ in upfront taxes and closing.",
        "Stress-test variable loans at Euribor +1% — Spanish variable mortgages review annually.",
        "Ask the bank what LTV they will actually grant; above 80% often means higher spread or mandatory linked products.",
      ],
      faq: [
        {
          q: "Why is my bank cuota different from this estimate?",
          a: "Banks add insurance bundles, use their own rounding, and may cap the term or principal differently. This tool uses pure amortization math — compare directionally, then read the FEIN.",
        },
        {
          q: "Fixed vs variable — which should I model?",
          a: "Model both. Fixed gives predictable cuota; variable starts from Euribor + spread and resets periodically. Neither is 'official' — the bank sets the spread and conditions.",
        },
        {
          q: "Does this include ITP, notary, or AJD?",
          a: "No. Purchase taxes and closing costs are paid upfront, outside the mortgage. Budget them separately before you fix your entrada.",
        },
        {
          q: "What LTV do Spanish banks typically accept?",
          a: "First homes often aim for ≤80% LTV (20% entrada). Higher LTV may be possible but usually costs more — confirm with your bank, not this calculator.",
        },
        {
          q: "Is my data uploaded?",
          a: "No. Everything stays in your browser.",
        },
      ],
    },
    es: {
      name: "Calculadora de hipoteca",
      title: "Calculadora hipoteca España — Cuota mensual, Euribor y LTV",
      description:
        "Estima la cuota mensual, intereses totales y LTV de tu hipoteca a tipo fijo o variable (Euribor + diferencial) — orientación gratis antes de ir al banco.",
      h1: "Calculadora de hipoteca (cuota y LTV)",
      intro:
        "El banco te enseña la cuota, pero la capacidad de pago no es solo ese número. Sigues necesitando efectivo para ITP o IVA, notaría, registro y, a menudo, un 20% de entrada — nada de eso sale en la oferta hipotecaria. Usa esta herramienta para modelar capital, cuota, intereses totales y LTV con hipoteca fija o variable (Euribor + diferencial). Solo orientación: lo que firmas es la FEIN del banco y el desglose del notario.",
      benefit: "Cuota, LTV e intereses antes de la cita con el banco.",
      howTo: [
        "Introduce el precio de compra y la entrada que piensas aportar.",
        "Define el plazo en años — 25–30 es lo habitual en España.",
        "Elige tipo fijo o variable (Euribor + diferencial del banco).",
        "Lee cuota, LTV e intereses totales — y prueba +1% en el tipo.",
      ],
      whatItDoes:
        "Aplica amortización francesa sobre el capital prestado (precio menos entrada), mostrando cuota mensual, intereses totales y porcentaje de LTV.",
      whatItDoesNot:
        "No incluye seguros de hogar o vida, comisiones de apertura, ITP/AJD/IVA de compraventa ni gastos de notaría. No es una oferta vinculante (FEIN).",
      tips: [
        "Combínala con una calculadora de costes de compra — la cuota sola esconde 15.000–30.000 € o más en impuestos y cierres.",
        "Estresa las variables con Euribor +1% — las hipotecas variables en España se revisan cada año.",
        "Pregunta al banco qué LTV te conceden de verdad; por encima del 80% suele haber más diferencial o productos vinculados.",
      ],
      faq: [
        {
          q: "¿Por qué la cuota del banco no coincide?",
          a: "Los bancos suman seguros vinculados, redondeos propios y pueden limitar plazo o capital. Esta herramienta usa matemática pura de amortización — compara en orientación y lee la FEIN.",
        },
        {
          q: "¿Modelo fija o variable?",
          a: "Las dos. La fija da cuota estable; la variable parte de Euribor + diferencial y se revisa periódicamente. Ninguna es 'oficial' — el banco fija el diferencial y las condiciones.",
        },
        {
          q: "¿Incluye ITP, notaría o AJD?",
          a: "No. Impuestos y gastos de cierre se pagan al contado, fuera de la hipoteca. Presupústalos aparte antes de cerrar la entrada.",
        },
        {
          q: "¿Qué LTV suelen aceptar los bancos?",
          a: "En vivienda habitual se apunta a ≤80% LTV (20% de entrada). Más LTV puede ser posible, pero suele encarecer — confírmalo con tu banco, no con esta calculadora.",
        },
        {
          q: "¿Se suben mis datos?",
          a: "No. Todo queda en tu navegador.",
        },
      ],
    },
  }),
  spainTool({
    slug: "validador-dni-nie",
    accent: "#38bdf8",
    en: {
      name: "DNI / NIE validator",
      title: "Spanish DNI / NIE Validator — Check Control Letter Before Forms",
      description:
        "Catch DNI and NIE typos before HR, landlords, or online portals reject your form. Checksum validation and control-letter calculation run in your browser — free, no upload.",
      h1: "DNI / NIE validator",
      intro:
        "Spanish portals, payroll, and rental forms often reject a DNI or NIE because the control letter is wrong — one swapped digit, a missing hyphen, or an old copy-paste. Run the standard modulo-23 checksum locally before you submit, so you fix typos instead of chasing a generic “invalid document” error.",
      benefit: "Fix letter errors before a form blocks you.",
      howTo: [
        "Paste your DNI (8 digits + letter) or NIE (X/Y/Z + 7 digits + letter).",
        "Read whether the checksum passes and which letter the algorithm expects.",
        "If the letter is wrong, correct it in your draft — do not guess.",
        "Submit the form only after the validator shows a valid checksum.",
      ],
      whatItDoes:
        "Applies the published Spanish control-letter algorithm (modulo 23 over the numeric part) for DNI and NIE formats, including NIE prefixes X, Y, and Z.",
      whatItDoesNot:
        "Does not query Policía, AEAT, or any registry. It cannot confirm that the number belongs to you, is currently valid, or replace an official certificate.",
      tips: [
        "NIE always starts with X, Y, or Z — if yours does not, check whether you pasted a passport or NIF by mistake.",
        "Store the number without spaces; many forms accept either, but copy-paste errors often hide an extra character.",
        "If the checksum fails but the card looks correct, re-type from the physical document — OCR and PDF scans swap 0/O and 1/I often.",
      ],
      faq: [
        {
          q: "Why did my NIE fail on a rental or HR form?",
          a: "Usually a wrong control letter or a typo in the seven digits. This tool checks the math only — it does not know your personal record, but it catches the errors forms reject most often.",
        },
        {
          q: "Is my DNI or NIE sent to a server?",
          a: "No. Validation runs entirely in your browser; nothing is uploaded or stored.",
        },
        {
          q: "Can this tool issue or renew a NIE?",
          a: "No. It only validates format and checksum. Assignment and renewal stay with extranjería / the police — use this before filling their or third-party forms.",
        },
        {
          q: "What is the difference between DNI and NIE here?",
          a: "DNI is eight digits plus letter for Spanish nationals. NIE is X, Y, or Z plus seven digits plus letter for foreigners. Both use the same letter algorithm on the numeric part.",
        },
        {
          q: "Is this an official government validator?",
          a: "No. It is a free checksum helper for everyday forms — not certified by any authority. When a process requires an official extract, use the relevant government channel.",
        },
      ],
    },
    es: {
      name: "Validador de DNI / NIE",
      title: "Validador DNI / NIE — Comprueba la letra antes del trámite",
      description:
        "Detecta erratas en DNI y NIE antes de que RR. HH., el casero o un portal rechacen el formulario. Validación del dígito de control en tu navegador — gratis, sin subir datos.",
      h1: "Validador de DNI / NIE",
      intro:
        "Portales, nóminas y contratos de alquiler suelen rechazar un DNI o NIE cuando la letra de control no cuadra: un dígito cambiado, un guion mal puesto o un copiar-pegar antiguo. Pasa el checksum módulo 23 en local antes de enviar, y corrige la errata en lugar de pelearte con un “documento no válido” genérico.",
      benefit: "Corrige la letra antes de que te bloqueen el formulario.",
      howTo: [
        "Pega tu DNI (8 dígitos + letra) o NIE (X/Y/Z + 7 dígitos + letra).",
        "Mira si pasa el checksum y qué letra calcula el algoritmo.",
        "Si la letra no coincide, corrige el borrador — no la adivines.",
        "Envía el formulario solo cuando el validador marque checksum correcto.",
      ],
      whatItDoes:
        "Aplica el algoritmo publicado de letra de control (módulo 23 sobre la parte numérica) para formatos DNI y NIE, incluidos los prefijos X, Y y Z.",
      whatItDoesNot:
        "No consulta Policía, AEAT ni ningún registro. No puede confirmar que el número sea tuyo, que siga vigente ni sustituir un certificado oficial.",
      tips: [
        "El NIE empieza siempre por X, Y o Z — si no es así, revisa si pegaste pasaporte o NIF por error.",
        "Guarda el número sin espacios; muchos formularios admiten ambos formatos, pero en el copiar-pegar suele colarse un carácter de más.",
        "Si falla el checksum pero la tarjeta se ve bien, vuelve a teclear desde el documento físico — OCR y PDF confunden 0/O y 1/I a menudo.",
      ],
      faq: [
        {
          q: "¿Por qué me rechazan el NIE en un alquiler o en RR. HH.?",
          a: "Casi siempre por letra de control incorrecta o un fallo en los siete dígitos. Esta herramienta solo comprueba la matemática — no conoce tu ficha, pero caza los errores que más bloquean formularios.",
        },
        {
          q: "¿Se envía mi DNI o NIE a un servidor?",
          a: "No. La validación es solo en tu navegador; no se sube ni guarda nada.",
        },
        {
          q: "¿Puede tramitar o renovar un NIE?",
          a: "No. Solo valida formato y checksum. La asignación y renovación son de extranjería / policía — úsalo antes de rellenar sus formularios o los de terceros.",
        },
        {
          q: "¿Qué diferencia hay entre DNI y NIE aquí?",
          a: "El DNI son 8 dígitos + letra para españoles. El NIE es X, Y o Z + 7 dígitos + letra para extranjeros. En ambos casos la letra sale del mismo algoritmo sobre la parte numérica.",
        },
        {
          q: "¿Es un validador oficial del Gobierno?",
          a: "No. Es una ayuda gratuita de checksum para formularios del día a día — no certificada por ninguna autoridad. Si el trámite exige un certificado oficial, usa la vía correspondiente.",
        },
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
