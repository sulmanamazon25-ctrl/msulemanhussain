import type { ComparisonFaq } from "@/types/comparison";

/**
 * Spain Money Guides — semantic SEO pack (EN + ES).
 *
 * Cluster map (demand → site slot):
 * 1. Nómina / job offers → tools/calculadora-de-salario + calculadora-irpf-retencion
 * 2. Salida laboral → tools/calculadora-de-finiquito
 * 3. Autónomos + facturas → tools/cuota-de-autonomos + calculadora-iva
 * 4. Vivienda (spoke) → tools/calculadora-de-hipoteca + coste-compra-vivienda
 * 5. Identidad / pagos (spoke) → tools/validador-dni-nie + validador-iban-es
 *
 * This page is the hub. Tools are money pages. Official AEAT/SS always win for filing.
 */

export type MoneyToolLink = {
  slug: string;
  label: string;
  why: string;
};

export type MoneyCluster = {
  id: string;
  heading: string;
  problem: string;
  solution: string;
  mistakes: string[];
  tools: MoneyToolLink[];
};

export type SpainMoneyGuidesLocale = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; intro: string; badges: string[] };
  card: { title: string; blurb: string };
  trust: { heading: string; body: string };
  clusters: MoneyCluster[];
  how: { heading: string; intro: string; steps: { title: string; description: string }[] };
  faq: ComparisonFaq[];
  cta: { heading: string; body: string; toolsLabel: string; contactLabel: string };
};

export type SpainMoneyGuidesDoc = {
  slug: string;
  accent: string;
  en: SpainMoneyGuidesLocale;
  es: SpainMoneyGuidesLocale;
};

export const spainMoneyGuides: SpainMoneyGuidesDoc = {
  slug: "spain-money-guides",
  accent: "#3dd6c6",
  en: {
    meta: {
      title: "Spain Salary, IRPF, Finiquito & Autónomos Guides — Free Calculators",
      description:
        "Practical EN/ES guides for Spain: salary net, finiquito, autónomos, home buying costs, DNI/IBAN checks, and EvAU score planning — with free on-device calculators.",
    },
    hero: {
      eyebrow: "SPAIN MONEY GUIDES",
      h1: "Spain salary, tax and exit pay — clear numbers before you sign or quit",
      intro:
        "If you live or work in Spain, the expensive mistakes are boring ones: accepting a gross salary without knowing the net, leaving a job without a finiquito checklist, or starting as autónomo without a realistic monthly cuota. These guides explain the real decision — then hand you a free calculator that runs in your browser so your numbers never leave your device.",
      badges: [
        "EN + ES",
        "On-device calculators",
        "Orientation, not official filing",
        "Updated for 2026 planning",
      ],
    },
    card: {
      title: "Spain Money Guides",
      blurb:
        "Salary net, IRPF withholding, finiquito, autónomo cuota and IVA — problem-first guides with free tools.",
    },
    trust: {
      heading: "What these guides are (and are not)",
      body:
        "They are orientation tools for decisions you make this week: compare two offers, sanity-check a settlement, or ballpark what you keep after IVA and RETA. They are not Agencia Tributaria software, not Importass, and not a substitute for a gestor or labour lawyer when money or dismissal is contested. When rules and your convenio disagree, your convenio and the official bodies win.",
    },
    clusters: [
      {
        id: "nomina",
        heading: "Cluster 1 — Job offers and take-home pay",
        problem:
          "Spanish offers are quoted in bruto. Two “€36,000” roles can feel nothing alike if one pays 14 pagas, one has a company car benefit, or your IRPF withholding jumps because you already had another payer this year. Candidates and relocators often negotiate the wrong number.",
        solution:
          "Convert bruto → neto with a transparent estimate, then look at retention per paga so the monthly transfer into your account is not a surprise. Use the salary calculator first; use the IRPF tool when you need the withholding slice alone.",
        mistakes: [
          "Comparing offers on bruto only",
          "Forgetting 12 vs 14 pagas when budgeting rent",
          "Ignoring that CCAA and personal situation change real IRPF",
        ],
        tools: [
          {
            slug: "calculadora-de-salario",
            label: "Spain net salary calculator",
            why: "Gross annual → estimated net monthly/annual with employee SS orientation.",
          },
          {
            slug: "calculadora-irpf-retencion",
            label: "IRPF withholding estimator",
            why: "See the tax slice per pay period before you accept the offer letter.",
          },
        ],
      },
      {
        id: "finiquito",
        heading: "Cluster 2 — Leaving a job (finiquito)",
        problem:
          "When a contract ends, people mix three different pots: pending salary, unused vacation (and often paga extra proration), and statutory indemnity that only applies to some dismissal types. Signing a settlement you do not understand is how money gets left on the table — or disputes start later.",
        solution:
          "Separate the pots on paper first: days worked unpaid, vacation days left, extras, then indemnity days (commonly 20 or 33 per year of service depending on dismissal type, with legal caps). The finiquito calculator gives an orientation total so you know what to ask HR or your lawyer to explain line by line.",
        mistakes: [
          "Assuming every exit pays 33 days/year",
          "Ignoring convenio improvements over the statutory minimum",
          "Forgetting vacation and paga proration when the contract simply ends",
        ],
        tools: [
          {
            slug: "calculadora-de-finiquito",
            label: "Finiquito / severance calculator",
            why: "Orientation for indemnity + vacation + pending extras before you sign.",
          },
        ],
      },
      {
        id: "autonomos",
        heading: "Cluster 3 — Autónomos: cuota and invoices",
        problem:
          "Self-employed cashflow fails in quiet months because the RETA cuota does not care that a client paid late — and invoice math goes wrong when you confuse base imponible, IVA (4/10/21%), and IRPF retention on B2B invoices.",
        solution:
          "Ballpark monthly cuota from estimated net earnings (2026 continues the bracket logic used in 2025 after the freeze), then use the IVA calculator whenever you quote or reverse-engineer a gross total. Keep a gestoría in the loop before you change base or file modelos.",
        mistakes: [
          "Pricing clients on “what I need net” without cuota + tax buffer",
          "Adding IVA to a total that already included it",
          "Treating tarifa plana as permanent instead of an early-period rule",
        ],
        tools: [
          {
            slug: "cuota-de-autonomos",
            label: "Autónomos cuota calculator",
            why: "Monthly SS orientation from net earnings or flat-rate start mode.",
          },
          {
            slug: "calculadora-iva",
            label: "Spain IVA calculator",
            why: "Add or extract 4%, 10%, or 21% for quotes and expense checks.",
          },
        ],
      },
      {
        id: "vivienda",
        heading: "Cluster 4 — Buying a home (spoke)",
        problem:
          "Banks talk about monthly cuota; buyers get surprised by upfront costs (ITP/AJD, notary, registry) that are not the mortgage payment.",
        solution:
          "Stress-test the monthly payment, then separately estimate purchase-side costs so your savings target is honest.",
        mistakes: [
          "Maxing the bank’s approval without a cash buffer",
          "Ignoring community/region tax differences on purchase",
        ],
        tools: [
          {
            slug: "calculadora-de-hipoteca",
            label: "Mortgage payment calculator",
            why: "Monthly cuota orientation from principal, rate, and term.",
          },
          {
            slug: "coste-compra-vivienda",
            label: "Home purchase cost estimator",
            why: "Ballpark taxes and fees beyond the loan itself.",
          },
        ],
      },
      {
        id: "identidad",
        heading: "Cluster 5 — ID and payments (spoke)",
        problem:
          "Forms reject NIE/DNI checksums and bank transfers fail on mistyped IBANs — usually right when you are on a deadline.",
        solution:
          "Validate document and IBAN structure locally before you paste them into official portals or invoices.",
        mistakes: [
          "Confusing formatting spaces with invalid digits",
          "Generating an IBAN without confirming the CCC with your bank",
        ],
        tools: [
          {
            slug: "validador-dni-nie",
            label: "DNI / NIE validator",
            why: "Checksum orientation before submitting forms.",
          },
          {
            slug: "validador-iban-es",
            label: "Spanish IBAN validator",
            why: "Check ES IBAN / build from CCC on-device.",
          },
        ],
      },
      {
        id: "educacion",
        heading: "Cluster 6 — EvAU / Selectividad and household budget",
        problem:
          "Families plan degrees around notas de corte they do not yet have, while students burn time guessing Bach media and específicas weights. Separately, a Spanish net paycheck can look fine until rent + bills leave nothing.",
        solution:
          "Simulate access/admission with Bach + general + weighted específicas, track media early, and pressure-test the household month on net income — not bruto.",
        mistakes: [
          "Picking específicas without checking the degree's ponderaciones table",
          "Ignoring Bach media until June (it is ~60% of access)",
          "Budgeting rent on bruto salary",
        ],
        tools: [
          {
            slug: "calculadora-evau-2026",
            label: "EvAU 2026 score calculator",
            why: "Access + admission scenarios before exam day.",
          },
          {
            slug: "calculadora-nota-media",
            label: "Grade average calculator",
            why: "Estimate Bach/ESO/FP media while the expediente catches up.",
          },
          {
            slug: "planificador-de-presupuesto",
            label: "Household budget planner",
            why: "See what remains after rent and bills on Spanish net pay.",
          },
        ],
      },
    ],
    how: {
      heading: "How to use this hub",
      intro: "Pick the decision you are making this week, not a keyword.",
      steps: [
        {
          title: "Name the decision",
          description: "Accept offer, leave job, quote a client, or buy a flat — one decision per session.",
        },
        {
          title: "Read the cluster",
          description: "Skim the problem, solution, and common mistakes so you know which inputs matter.",
        },
        {
          title: "Run the calculator",
          description: "Use the linked tool. Everything stays in your browser.",
        },
        {
          title: "Verify before you file or sign",
          description: "Compare with payslips, convenio, AEAT, Importass, or a professional when stakes are high.",
        },
      ],
    },
    faq: [
      {
        q: "Are these official Spanish government calculators?",
        a: "No. They are free orientation tools on msulemanhussain.com. Filing and official simulations belong on AEAT, Seguridad Social / Importass, and your bank or gestoría systems.",
      },
      {
        q: "Why build this if big calculator sites already exist?",
        a: "Most of those sites exist to capture leads. These tools are on-device, bilingual, and wired into a founder portfolio that also ships real products — useful if you want a quick private estimate without creating an account.",
      },
      {
        q: "Do you store my salary or invoice numbers?",
        a: "No. The calculators run in your browser. Contact forms only keep what you choose to email.",
      },
      {
        q: "English and Spanish — which should I use?",
        a: "Same math either way. Use the language you think in when reading labour or tax terms; switch locale anytime.",
      },
      {
        q: "Will this replace my gestor?",
        a: "No. Use it to ask better questions and catch obvious errors. Contested dismissals, multi-payer IRPF, and company structures still need a human professional.",
      },
    ],
    cta: {
      heading: "Start with the decision in front of you",
      body: "Open the matching calculator, or tell me if you need a custom internal tool for your team.",
      toolsLabel: "Browse all free tools",
      contactLabel: "Contact",
    },
  },
  es: {
    meta: {
      title: "Guías salario, IRPF, finiquito y autónomos España — Calculadoras gratis",
      description:
        "Guías prácticas EN/ES: salario neto, finiquito, autónomos, costes de compraventa, DNI/IBAN y nota EvAU — con calculadoras gratis en el navegador.",
    },
    hero: {
      eyebrow: "GUÍAS DINERO ESPAÑA",
      h1: "Salario, impuestos y finiquito en España — números claros antes de firmar o irte",
      intro:
        "Si vives o trabajas en España, los errores caros suelen ser simples: aceptar un bruto sin saber el neto, firmar una liquidación sin checklist de finiquito, o darte de alta como autónomo sin una cuota mensual realista. Estas guías explican la decisión de verdad — y te pasan a una calculadora gratis que corre en tu navegador para que tus cifras no salgan de tu dispositivo.",
      badges: [
        "EN + ES",
        "Cálculo en local",
        "Orientación, no presentación oficial",
        "Pensado para planificar 2026",
      ],
    },
    card: {
      title: "Guías de dinero en España",
      blurb:
        "Salario neto, retención IRPF, finiquito, cuota de autónomos e IVA — guías por problema real con herramientas gratis.",
    },
    trust: {
      heading: "Qué son estas guías (y qué no son)",
      body:
        "Son herramientas de orientación para decisiones de esta semana: comparar dos ofertas, revisar una liquidación o estimar qué te queda tras IVA y RETA. No son software de la Agencia Tributaria, ni Importass, ni sustituyen a un gestor o laboralista cuando hay conflicto. Si el convenio y la norma general chocan, gana el convenio y el organismo oficial.",
    },
    clusters: [
      {
        id: "nomina",
        heading: "Cluster 1 — Ofertas de empleo y neto",
        problem:
          "En España las ofertas van en bruto. Dos puestos de «36.000 €» no se sienten igual si uno paga 14 pagas, hay retribución en especie o la retención sube por otro pagador. Se negocia el número equivocado.",
        solution:
          "Pasa de bruto a neto con una estimación transparente y mira la retención por paga para que la transferencia mensual no sorprenda. Primero la calculadora de salario; la de IRPF si solo necesitas el tramo de retención.",
        mistakes: [
          "Comparar ofertas solo en bruto",
          "Olvidar 12 vs 14 pagas al calcular el alquiler",
          "Ignorar que CCAA y situación personal cambian el IRPF real",
        ],
        tools: [
          {
            slug: "calculadora-de-salario",
            label: "Calculadora de salario neto",
            why: "Bruto anual → neto mensual/anual estimado con SS del trabajador.",
          },
          {
            slug: "calculadora-irpf-retencion",
            label: "Estimador de retención IRPF",
            why: "Ve el trozo fiscal por paga antes de aceptar la oferta.",
          },
        ],
      },
      {
        id: "finiquito",
        heading: "Cluster 2 — Salida del trabajo (finiquito)",
        problem:
          "Al acabar un contrato se mezclan tres cosas distintas: salario pendiente, vacaciones (y a menudo prorrata de pagas) e indemnización que solo aplica en algunos despidos. Firmar sin entender el desglose es dejar dinero o abrir un conflicto.",
        solution:
          "Separa los conceptos: días trabajados sin pagar, vacaciones, extras e indemnización (suele 20 o 33 días/año según el tipo, con topes). La calculadora da un total orientativo para pedir a RR. HH. o a tu abogado el desglose línea a línea.",
        mistakes: [
          "Asumir que toda salida paga 33 días/año",
          "Ignorar mejoras del convenio sobre el mínimo legal",
          "Olvidar vacaciones y prorratas cuando el contrato simplemente termina",
        ],
        tools: [
          {
            slug: "calculadora-de-finiquito",
            label: "Calculadora de finiquito",
            why: "Orientación de indemnización + vacaciones + extras antes de firmar.",
          },
        ],
      },
      {
        id: "autonomos",
        heading: "Cluster 3 — Autónomos: cuota y facturas",
        problem:
          "La caja del autónomo falla en meses flojos porque la cuota RETA no espera al cliente — y las facturas se tueren si mezclas base imponible, IVA (4/10/21%) y retención de IRPF en B2B.",
        solution:
          "Estima la cuota mensual según rendimiento neto (en 2026 se mantiene la lógica de tramos de 2025 tras la prórroga) y usa la calculadora de IVA al presupuestar o al sacar la base de un total. Habla con gestoría antes de cambiar base o presentar modelos.",
        mistakes: [
          "Fijar precios al «neto que necesito» sin colchón de cuota e impuestos",
          "Añadir IVA a un total que ya lo incluía",
          "Tratar la tarifa plana como permanente",
        ],
        tools: [
          {
            slug: "cuota-de-autonomos",
            label: "Calculadora cuota de autónomos",
            why: "Cuota mensual orientativa por rendimientos o modo tarifa plana.",
          },
          {
            slug: "calculadora-iva",
            label: "Calculadora IVA España",
            why: "Añade o extrae 4%, 10% o 21% en presupuestos y gastos.",
          },
        ],
      },
      {
        id: "vivienda",
        heading: "Cluster 4 — Comprar vivienda (spoke)",
        problem:
          "El banco habla de cuota mensual; el comprador tropieza con costes iniciales (ITP/AJD, notaría, registro) que no son la hipoteca.",
        solution:
          "Estresa la cuota mensual y, aparte, estima los costes de compraventa para que el ahorro objetivo sea realista.",
        mistakes: [
          "Ir al máximo de aprobación sin colchón de liquidez",
          "Ignorar diferencias autonómicas en impuestos de compra",
        ],
        tools: [
          {
            slug: "calculadora-de-hipoteca",
            label: "Calculadora de hipoteca",
            why: "Cuota mensual orientativa según capital, tipo y plazo.",
          },
          {
            slug: "coste-compra-vivienda",
            label: "Estimador coste compra vivienda",
            why: "Orden de magnitud de impuestos y gastos más allá del préstamo.",
          },
        ],
      },
      {
        id: "identidad",
        heading: "Cluster 5 — Identidad y pagos (spoke)",
        problem:
          "Los formularios rechazan NIE/DNI por dígito de control y las transferencias fallan por IBAN mal escrito — casi siempre con prisa.",
        solution:
          "Valida la estructura del documento y del IBAN en local antes de pegarlos en sedes electrónicas o facturas.",
        mistakes: [
          "Confundir espacios de formato con dígitos inválidos",
          "Generar IBAN sin confirmar el CCC con el banco",
        ],
        tools: [
          {
            slug: "validador-dni-nie",
            label: "Validador DNI / NIE",
            why: "Control de dígito antes de enviar formularios.",
          },
          {
            slug: "validador-iban-es",
            label: "Validador IBAN ES",
            why: "Comprueba IBAN ES / genera desde CCC en el dispositivo.",
          },
        ],
      },
      {
        id: "educacion",
        heading: "Cluster 6 — EvAU / Selectividad y presupuesto familiar",
        problem:
          "Las familias eligen grados con notas de corte que aún no tienen, y el alumnado pierde tiempo adivinando la media de Bach y las ponderaciones. En paralelo, un neto español puede parecer suficiente hasta que alquiler + facturas no dejan nada.",
        solution:
          "Simula acceso/admisión con Bach + general + específicas ponderadas, sigue la media pronto y estresa el mes familiar con ingresos netos — no el bruto.",
        mistakes: [
          "Elegir específicas sin mirar la tabla de ponderaciones del grado",
          "Ignorar la media de Bach hasta junio (~60% del acceso)",
          "Presupuestar el alquiler con el salario bruto",
        ],
        tools: [
          {
            slug: "calculadora-evau-2026",
            label: "Calculadora EvAU 2026",
            why: "Escenarios de acceso y admisión antes del examen.",
          },
          {
            slug: "calculadora-nota-media",
            label: "Calculadora de nota media",
            why: "Estima media Bach/ESO/FP mientras llega el expediente.",
          },
          {
            slug: "planificador-de-presupuesto",
            label: "Planificador de presupuesto",
            why: "Ve qué queda tras alquiler y facturas con el neto español.",
          },
        ],
      },
    ],
    how: {
      heading: "Cómo usar este hub",
      intro: "Elige la decisión de esta semana, no una keyword.",
      steps: [
        {
          title: "Nombra la decisión",
          description: "Aceptar oferta, salir del trabajo, cotizar a un cliente o comprar piso — una por sesión.",
        },
        {
          title: "Lee el cluster",
          description: "Problema, solución y errores frecuentes para saber qué datos importan.",
        },
        {
          title: "Usa la calculadora",
          description: "Abre la herramienta enlazada. Todo queda en tu navegador.",
        },
        {
          title: "Verifica antes de firmar o presentar",
          description: "Contrasta con nóminas, convenio, AEAT, Importass o un profesional si hay mucho en juego.",
        },
      ],
    },
    faq: [
      {
        q: "¿Son calculadoras oficiales del Gobierno?",
        a: "No. Son herramientas de orientación gratis en msulemanhussain.com. La presentación oficial va en AEAT, Seguridad Social / Importass y los sistemas de tu banco o gestoría.",
      },
      {
        q: "¿Por qué esto si ya hay portales grandes?",
        a: "Muchos viven de captar leads. Estas herramientas son locales, bilingües y están en el portfolio de un founder que también lanza productos — útiles para una estimación privada rápida sin crear cuenta.",
      },
      {
        q: "¿Guardáis mi salario o facturas?",
        a: "No. Las calculadoras corren en tu navegador. El formulario de contacto solo guarda lo que eliges enviar.",
      },
      {
        q: "¿Inglés o español?",
        a: "La misma lógica. Usa el idioma en el que piensas los términos laborales o fiscales; puedes cambiar de locale cuando quieras.",
      },
      {
        q: "¿Sustituye a mi gestor?",
        a: "No. Sirve para hacer mejores preguntas y pillar errores obvios. Despidos conflictivos, varios pagadores e estructuras societarias siguen necesitando un profesional.",
      },
    ],
    cta: {
      heading: "Empieza por la decisión que tienes delante",
      body: "Abre la calculadora que encaje, o dime si necesitas una herramienta interna a medida para tu equipo.",
      toolsLabel: "Ver todas las herramientas",
      contactLabel: "Contacto",
    },
  },
};

export function spainMoneyGuidesCopy(locale: "en" | "es"): SpainMoneyGuidesLocale {
  return locale === "es" ? spainMoneyGuides.es : spainMoneyGuides.en;
}
