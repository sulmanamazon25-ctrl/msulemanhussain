import type { Tool } from "./tools";

function pkTool(
  partial: Omit<Tool, "relatedProductSlug" | "relatedProductUrl" | "relatedProductLabel" | "processing" | "category">,
): Tool {
  return {
    category: "pakistan",
    relatedProductSlug: "wasup",
    relatedProductUrl: "https://wasup.app/es",
    relatedProductLabel: "Wasup",
    processing: "local",
    accent: partial.accent,
    slug: partial.slug,
    en: partial.en,
    es: partial.es,
  };
}

function copy(
  nameEn: string,
  nameEs: string,
  titleEn: string,
  titleEs: string,
  descEn: string,
  descEs: string,
  h1En: string,
  h1Es: string,
  introEn: string,
  introEs: string,
  benefitEn: string,
  benefitEs: string,
  extraFaqEn?: { q: string; a: string }[],
  extraFaqEs?: { q: string; a: string }[],
): Pick<Tool, "en" | "es"> {
  return {
    en: {
      name: nameEn,
      title: titleEn,
      description: descEn,
      h1: h1En,
      intro: introEn,
      benefit: benefitEn,
      howTo: [
        "Open the calculator — everything runs in your browser.",
        "Enter project fees, rates, or costs using your real numbers.",
        "Read the breakdown. Nothing is uploaded to a server.",
      ],
      whatItDoes:
        "Gives Pakistani freelancers, sellers, and creators a fast, on-device estimate for fees, taxes, margins, or invoices.",
      whatItDoesNot:
        "Does not replace a CA, FBR return, bank FX quote, or marketplace policy document. Rates change — treat results as orientation.",
      tips: [
        "Update the USD/PKR rate to match your bank or Payoneer conversion that week.",
        "Confirm current platform / Daraz / ad fees before locking a quote for a client.",
        "Running many client chats? Automate WhatsApp follow-ups with Wasup.",
      ],
      faq: [
        { q: "Is it free?", a: "Yes — free, no signup, runs fully in your browser." },
        { q: "Is my data uploaded?", a: "No. Calculations and invoice text stay on your device." },
        ...(extraFaqEn ?? []),
      ],
    },
    es: {
      name: nameEs,
      title: titleEs,
      description: descEs,
      h1: h1Es,
      intro: introEs,
      benefit: benefitEs,
      howTo: [
        "Abre la calculadora — todo corre en tu navegador.",
        "Introduce tarifas, tipos de cambio o costes con tus números reales.",
        "Lee el desglose. No se sube nada a un servidor.",
      ],
      whatItDoes:
        "Da a freelancers, vendedores y creadores en Pakistán una estimación rápida en el dispositivo para comisiones, impuestos, márgenes o facturas.",
      whatItDoesNot:
        "No sustituye a un contador, una declaración FBR, una cotización FX del banco ni la política oficial del marketplace. Las tarifas cambian — úsalo como orientación.",
      tips: [
        "Actualiza el tipo USD/PKR al de tu banco o Payoneer esa semana.",
        "Confirma comisiones actuales de plataforma / Daraz / anuncios antes de cerrar una cotización.",
        "¿Muchos chats de clientes? Automatiza seguimientos en WhatsApp con Wasup.",
      ],
      faq: [
        { q: "¿Es gratis?", a: "Sí — gratis, sin registro, todo en el navegador." },
        { q: "¿Se suben mis datos?", a: "No. Cálculos y texto de factura quedan en tu dispositivo." },
        ...(extraFaqEs ?? []),
      ],
    },
  };
}

/** Pakistan market tools — freelancers, Daraz sellers, agencies, creators */
export const pakistanTools: Tool[] = [
  pkTool({
    slug: "upwork-fiverr-payout-calculator-pakistan",
    accent: "#01411C",
    ...copy(
      "Upwork & Fiverr payout calculator (PK)",
      "Calculadora de cobro Upwork y Fiverr (PK)",
      "Upwork & Fiverr Net Payout Calculator for Pakistan (2026) | Free",
      "Calculadora de cobro neto Upwork y Fiverr para Pakistán (2026) | Gratis",
      "Free Upwork and Fiverr fee calculator for Pakistan: platform fees, Payoneer/bank withdrawal, and USD→PKR net deposit estimate.",
      "Calculadora gratis de comisiones Upwork y Fiverr para Pakistán: fees de plataforma, retiro Payoneer/banco y depósito neto USD→PKR.",
      "Upwork & Fiverr net payout (Pakistan)",
      "Cobro neto Upwork y Fiverr (Pakistán)",
      "See what actually lands in PKR after Upwork or Fiverr fees, withdrawal charges, and a realistic bank FX spread — built for Pakistani freelancers.",
      "Mira cuánto llega realmente en PKR tras comisiones de Upwork o Fiverr, cargos de retiro y un spread FX realista — pensado para freelancers en Pakistán.",
      "Gross USD → net PKR after platform + withdrawal fees.",
      "USD bruto → PKR neto tras fees de plataforma y retiro.",
      [
        {
          q: "Which Upwork fee model should I use?",
          a: "Use flat 10% for a quick estimate, or the tiered 20%/10%/5% model if you know your lifetime billings with that client.",
        },
        {
          q: "Why subtract a bank spread?",
          a: "Pakistani banks and wallets often credit below the interbank mid rate. Adjust the spread to match your last statement.",
        },
      ],
      [
        {
          q: "¿Qué modelo de fee de Upwork uso?",
          a: "Usa 10% fijo para una estimación rápida, o el modelo por tramos 20%/10%/5% si conoces la facturación acumulada con ese cliente.",
        },
        {
          q: "¿Por qué restar un spread bancario?",
          a: "Bancos y wallets en Pakistán suelen abonar por debajo del tipo interbancario. Ajusta el spread a tu último extracto.",
        },
      ],
    ),
  }),
  pkTool({
    slug: "fbr-freelance-tax-calculator-pakistan",
    accent: "#0ea5e9",
    ...copy(
      "FBR freelance tax & withholding (PK)",
      "Impuesto freelance FBR y retención (PK)",
      "FBR Freelance Tax & Withholding Calculator Pakistan (2026) | Free",
      "Calculadora de impuesto freelance FBR y retención Pakistán (2026) | Gratis",
      "Orientative FBR freelance income tax slab and withholding estimate for Pakistani freelancers earning in PKR or USD.",
      "Estimación orientativa de tramos FBR y retención para freelancers pakistaníes que cobran en PKR o USD.",
      "FBR freelance tax estimator (Pakistan)",
      "Estimador de impuesto freelance FBR (Pakistán)",
      "Rough annual tax and monthly withholding orientation for freelancers in Pakistan. Not a filed return — use it to plan cash flow before you talk to a CA.",
      "Orientación aproximada de impuesto anual y retención mensual para freelancers en Pakistán. No es una declaración — úsala para planificar caja antes de hablar con un contador.",
      "Slab-style estimate + optional withholding on invoices.",
      "Estimación por tramos + retención opcional en facturas.",
      [
        {
          q: "Is this official FBR software?",
          a: "No. Slabs and rates are simplified for orientation and can change. Confirm with IRIS / a tax advisor before filing.",
        },
      ],
      [
        {
          q: "¿Es software oficial de FBR?",
          a: "No. Los tramos y tipos son simplificados y pueden cambiar. Confirma con IRIS / un asesor antes de declarar.",
        },
      ],
    ),
  }),
  pkTool({
    slug: "invoice-generator-pakistan",
    accent: "#f59e0b",
    ...copy(
      "Invoice generator (PKR / USD / AED)",
      "Generador de facturas (PKR / USD / AED)",
      "Free Professional Invoice Generator for Pakistan — PKR, USD, AED (2026)",
      "Generador de facturas profesional gratis para Pakistán — PKR, USD, AED (2026)",
      "Create a clean freelance invoice with local bank / JazzCash / IBAN details and download or print to PDF — free, no signup.",
      "Crea una factura freelance limpia con datos de banco / JazzCash / IBAN y descarga o imprime a PDF — gratis, sin registro.",
      "Pakistan invoice generator",
      "Generador de facturas Pakistán",
      "Fill your client, line items, and PK banking fields. Preview a professional invoice and print/save as PDF from the browser — data never leaves your device.",
      "Rellena cliente, líneas y datos bancarios PK. Previsualiza una factura profesional e imprime/guarda PDF desde el navegador — los datos no salen de tu dispositivo.",
      "Browser invoice with PKR/USD/AED and local payout details.",
      "Factura en el navegador con PKR/USD/AED y datos de cobro locales.",
      [
        {
          q: "How do I get a PDF?",
          a: "Use Print / Save as PDF in the tool — your browser creates the PDF. No account required.",
        },
      ],
      [
        {
          q: "¿Cómo obtengo un PDF?",
          a: "Usa Imprimir / Guardar como PDF en la herramienta — tu navegador crea el PDF. Sin cuenta.",
        },
      ],
    ),
  }),
  pkTool({
    slug: "daraz-profit-calculator-pakistan",
    accent: "#f97316",
    ...copy(
      "Daraz profit & fee margin calculator",
      "Calculadora de margen y fees Daraz",
      "Daraz Profit Margin Calculator Pakistan — Fees & Delivery (2026) | Free",
      "Calculadora de margen de beneficio Daraz Pakistán — fees y envío (2026) | Gratis",
      "Estimate Daraz seller net profit after category commission, packaging, and courier costs (TCS / Leopard / Trax style).",
      "Estima el beneficio neto de vendedor Daraz tras comisión de categoría, embalaje y costes de mensajería (estilo TCS / Leopard / Trax).",
      "Daraz profit calculator (Pakistan)",
      "Calculadora de beneficio Daraz (Pakistán)",
      "Enter selling price, product cost, category commission, and delivery. See contribution margin before ads and returns — built for Pakistani marketplace sellers.",
      "Introduce precio de venta, coste de producto, comisión de categoría y envío. Mira el margen de contribución antes de anuncios y devoluciones — para sellers pakistaníes.",
      "Sale price → net after Daraz-style fees & courier.",
      "Precio de venta → neto tras fees estilo Daraz y courier.",
      [
        {
          q: "Are commission rates exact?",
          a: "Defaults are orientative by category. Always match Daraz Seller Center for your SKU and campaign period.",
        },
      ],
      [
        {
          q: "¿Las comisiones son exactas?",
          a: "Los valores por defecto son orientativos por categoría. Contrasta siempre con Daraz Seller Center para tu SKU y campaña.",
        },
      ],
    ),
  }),
  pkTool({
    slug: "meta-tiktok-ad-roas-calculator-pakistan",
    accent: "#a855f7",
    ...copy(
      "Meta / TikTok ad ROAS estimator (PKR)",
      "Estimador ROAS Meta / TikTok (PKR)",
      "Meta & TikTok Ad Budget & ROAS Estimator for Pakistan (PKR) | Free",
      "Estimador de presupuesto y ROAS Meta y TikTok para Pakistán (PKR) | Gratis",
      "Plan Meta or TikTok ad spend in PKR: estimate revenue needed for target ROAS and break-even CPA for Pakistani ecommerce and agencies.",
      "Planifica gasto Meta o TikTok en PKR: estima ingresos para un ROAS objetivo y CPA de equilibrio para ecommerce y agencias en Pakistán.",
      "Ad ROAS calculator (Pakistan, PKR)",
      "Calculadora ROAS de anuncios (Pakistán, PKR)",
      "Set daily/monthly budget, target ROAS, and average order value. Get the revenue and orders you need — and a simple break-even view for PK campaigns.",
      "Define presupuesto diario/mensual, ROAS objetivo y ticket medio. Obtén ingresos y pedidos necesarios — y una vista simple de equilibrio para campañas PK.",
      "PKR ad budget → revenue & CPA targets.",
      "Presupuesto PKR → objetivos de ingreso y CPA.",
    ),
  }),
  pkTool({
    slug: "youtube-reels-cpm-estimator-pakistan",
    accent: "#ef4444",
    ...copy(
      "YouTube / Reels CPM estimator (PK)",
      "Estimador CPM YouTube / Reels (PK)",
      "YouTube & Reels Revenue Estimator for Pakistan CPM (2026) | Free",
      "Estimador de ingresos YouTube y Reels para CPM Pakistán (2026) | Gratis",
      "Rough YouTube and short-form revenue estimate using Pakistan-oriented CPM ranges — views × RPM style, not a guarantee.",
      "Estimación aproximada de ingresos YouTube y short-form con rangos CPM orientados a Pakistán — vistas × estilo RPM, sin garantía.",
      "YouTube / Reels CPM estimator (Pakistan)",
      "Estimador CPM YouTube / Reels (Pakistán)",
      "Pakistan creator CPM and RPM vary a lot by niche and audience geography. This tool shows a low / mid / high band so you can sanity-check channel math before pitching sponsors.",
      "El CPM y RPM de creadores en Pakistán varía mucho por nicho y geografía de audiencia. Esta herramienta muestra una banda baja / media / alta para contrastar números antes de pitch a sponsors.",
      "Views × PK-oriented CPM bands → revenue range.",
      "Vistas × bandas CPM orientadas a PK → rango de ingresos.",
      [
        {
          q: "Why is my real RPM different?",
          a: "AdSense RPM depends on advertiser demand, season, and where your viewers are. Use this as a planning band, not a payout promise.",
        },
      ],
      [
        {
          q: "¿Por qué mi RPM real es distinto?",
          a: "El RPM de AdSense depende de demanda publicitaria, temporada y dónde están tus viewers. Úsalo como banda de planificación, no como promesa de pago.",
        },
      ],
    ),
  }),
];
