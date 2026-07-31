import type { Tool } from "./tools";

function tool(
  partial: Omit<Tool, "relatedProductSlug" | "relatedProductUrl" | "relatedProductLabel" | "processing" | "category"> & {
    category?: Tool["category"];
  },
): Tool {
  return {
    category: partial.category ?? "spain",
    relatedProductSlug: "spain-eats",
    relatedProductUrl: "https://spaineats.info/",
    relatedProductLabel: "Spain Eats",
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
        `Open the ${nameEn}.`,
        "Enter your values carefully.",
        "Read the on-device result — nothing is uploaded.",
      ],
      whatItDoes: `${nameEn} runs a free client-side estimate in your browser.`,
      whatItDoesNot: `The ${nameEn} does not replace official tax, payroll, or legal advice.`,
      tips: [
        `Use the ${nameEn} for orientation before you file or invoice.`,
        "Double-check rates and inputs against your latest official tables.",
      ],
      faq: [
        {
          q: `What does the ${nameEn} calculate?`,
          a: descEn,
        },
        {
          q: `Is the ${nameEn} free?`,
          a: "Yes — free, no signup, runs entirely in your browser.",
        },
        {
          q: "Is my data uploaded?",
          a: "No. Inputs and results stay on your device.",
        },
        {
          q: "Is this an official government tool?",
          a: "No. It is an orientation calculator for planning — verify with AEAT, your gestor, or the relevant authority before filing.",
        },
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
        `Abre ${nameEs}.`,
        "Introduce tus datos con cuidado.",
        "Lee el resultado en local — no se sube nada.",
      ],
      whatItDoes: `${nameEs} calcula una estimación gratis en tu navegador.`,
      whatItDoesNot: `${nameEs} no sustituye asesoría fiscal, laboral o legal oficial.`,
      tips: [
        `Usa ${nameEs} como orientación antes de facturar o declarar.`,
        "Contrasta tipos y datos con las tablas oficiales vigentes.",
      ],
      faq: [
        {
          q: `¿Qué calcula ${nameEs}?`,
          a: descEs,
        },
        {
          q: `¿${nameEs} es gratis?`,
          a: "Sí — gratis, sin registro, todo en tu navegador.",
        },
        {
          q: "¿Se suben mis datos?",
          a: "No. Los datos y resultados quedan en tu dispositivo.",
        },
        {
          q: "¿Es una herramienta oficial?",
          a: "No. Es una calculadora orientativa — verifica con AEAT, tu gestor o la autoridad correspondiente antes de presentar nada.",
        },
      ],
    },
  };
}

/** Wave 1 Spain + LatAm country packs */
export const expansionTools: Tool[] = [
  tool({
    slug: "calculadora-iva",
    accent: "#fbbf24",
    en: {
      name: "Spain VAT (IVA) calculator",
      title: "Spain IVA Calculator — Add or Extract 4% / 10% / 21%",
      description:
        "Add Spanish IVA to a taxable base or extract IVA from a gross total at 4%, 10%, or 21%. Built for quotes and expense checks — free, on-device.",
      h1: "IVA calculator (Spain)",
      intro:
        "Invoice math breaks when you treat a gross supermarket ticket like a net quote. Use 21% general, 10% reduced, or 4% super-reduced — add IVA to a base imponible, or extract base + IVA from a total that already includes tax.",
      benefit: "Stop mixing base and gross on quotes.",
      howTo: [
        "Choose add IVA (from base) or extract IVA (from gross).",
        "Pick 4%, 10%, or 21% to match the goods/services.",
        "Enter the amount and read base, IVA, and total.",
      ],
      whatItDoes: "Converts between taxable base and gross using the three common Spanish IVA rates.",
      whatItDoesNot: "Does not decide which rate your activity must use, and does not file modelo 303.",
      tips: [
        "If a client sends a gross total, extract before you book the expense base.",
        "Keep IVA cash separate from personal net as an autónomo.",
        "When unsure of the rate, check AEAT guidance or your gestoría — wrong rate is expensive.",
      ],
      faq: [
        {
          q: "When do I use 4%, 10%, or 21%?",
          a: "21% is the general rate. 10% and 4% apply to specific reduced / super-reduced categories. If you are unsure which bucket your invoice falls into, confirm before you issue it.",
        },
        {
          q: "Add vs extract — which one?",
          a: "Add when you know the net base and need the customer total. Extract when you only have a gross ticket and need the base for bookkeeping.",
        },
        {
          q: "Does this replace modelo 303?",
          a: "No. It is a pocket calculator for quotes and checks. Filing stays with AEAT / your gestoría.",
        },
        {
          q: "Is data uploaded?",
          a: "No. Local only.",
        },
      ],
    },
    es: {
      name: "Calculadora IVA España",
      title: "Calculadora IVA España — Añadir o extraer 4% / 10% / 21%",
      description:
        "Añade IVA español a una base o extráelo de un total al 4%, 10% o 21%. Para presupuestos y gastos — gratis, en local.",
      h1: "Calculadora de IVA (España)",
      intro:
        "Las facturas se tueren cuando tratas un ticket bruto como si fuera neto. Usa 21% general, 10% reducido o 4% superreducido — añade IVA a la base imponible, o extrae base + IVA de un total que ya lo incluye.",
      benefit: "Deja de mezclar base y bruto en presupuestos.",
      howTo: [
        "Elige añadir IVA (desde base) o extraer IVA (desde bruto).",
        "Escoge 4%, 10% o 21% según el bien/servicio.",
        "Introduce el importe y lee base, IVA y total.",
      ],
      whatItDoes: "Convierte entre base imponible y total con los tres tipos habituales de IVA.",
      whatItDoesNot: "No decide qué tipo debes aplicar ni presenta el modelo 303.",
      tips: [
        "Si el cliente manda un total bruto, extrae antes de contabilizar la base.",
        "Separa la caja del IVA del neto personal si eres autónomo.",
        "Si dudas del tipo, confirma con AEAT o gestoría — equivocarse sale caro.",
      ],
      faq: [
        {
          q: "¿Cuándo uso 4%, 10% o 21%?",
          a: "El 21% es el general. El 10% y el 4% aplican a categorías reducidas / superreducidas concretas. Si no tienes claro el cajón, confírmalo antes de emitir.",
        },
        {
          q: "¿Añadir o extraer?",
          a: "Añade cuando conoces la base neta y necesitas el total al cliente. Extrae cuando solo tienes un ticket bruto y necesitas la base contable.",
        },
        {
          q: "¿Sustituye al modelo 303?",
          a: "No. Es una calculadora de bolsillo. La presentación sigue en AEAT / gestoría.",
        },
        {
          q: "¿Se suben datos?",
          a: "No. Solo en local.",
        },
      ],
    },
  }),
  tool({
    slug: "validador-iban-es",
    accent: "#38bdf8",
    en: {
      name: "Spanish IBAN validator & generator",
      title: "Spanish IBAN Validator — Check ES IBAN or Build from CCC",
      description:
        "Stop SEPA transfers and payroll rejections from a single wrong IBAN digit. Validate ES checksums or build IBAN from a 20-digit CCC — free, in your browser.",
      h1: "IBAN ES validator",
      intro:
        "Banks and Bizum often bounce a transfer when the IBAN checksum fails — sometimes because the CCC was typed correctly but the ES prefix or check digits were not. Validate ISO 13616 checksums locally before you pay rent, invoice a client, or paste details into HR, or generate a full ES IBAN from the 20-digit cuenta corriente on your bank letter.",
      benefit: "Catch bad IBANs before money leaves your account.",
      howTo: [
        "Paste a full ES IBAN (ES + 22 digits) or enter the 20-digit CCC from your bank details.",
        "Run validation — the tool flags checksum errors and shows the expected structure.",
        "If you only have CCC, generate the complete IBAN and copy it once the checksum passes.",
        "Use the validated IBAN on the transfer screen; fix digits before confirming, not after a failed payment.",
      ],
      whatItDoes:
        "Runs the ISO 13616 mod-97 checksum for Spanish IBANs and maps a valid CCC (entity, office, DC, account number) into ES… format.",
      whatItDoesNot:
        "Does not confirm the account exists, is open, or belongs to the payee. No connection to Banco de España or your bank — checksum only.",
      tips: [
        "Spanish IBAN is always ES + 22 characters (24 total) — if yours is shorter, you are probably missing the country code or check digits.",
        "The two DC digits in the CCC are not the same as the IBAN check digits; do not copy only the CCC when a form asks explicitly for IBAN.",
        "When invoicing as autónomo, validate the client's IBAN before you save it in your billing app — one wrong digit means chasing a refund.",
      ],
      faq: [
        {
          q: "Why was my transfer rejected with “invalid IBAN”?",
          a: "Usually a transposed digit, a missing ES prefix, or a bad conversion from CCC. This tool checks the math locally so you can fix the string before submitting the payment.",
        },
        {
          q: "Can I build an IBAN from the numbers on my bank card?",
          a: "You need the full CCC (entity, branch, DC, account) from a statement or certificate — cards often show only part of the account. With all 20 digits, the generator adds ES and the IBAN check digits.",
        },
        {
          q: "Does a valid checksum mean the account is real?",
          a: "No. Checksum only proves the number is structurally valid. Whether the account exists and accepts transfers is confirmed only when the bank processes the payment.",
        },
        {
          q: "Is my IBAN uploaded anywhere?",
          a: "No. Validation and generation stay entirely in your browser.",
        },
        {
          q: "Is this an official Banco de España tool?",
          a: "No. It is a free helper for everyday payments and forms — not government certified. For disputes or formal certificates, use your bank or official channels.",
        },
      ],
    },
    es: {
      name: "Validador y generador IBAN ES",
      title: "Validador IBAN España — Comprueba IBAN ES o genera desde CCC",
      description:
        "Evita devoluciones en transferencias SEPA y nóminas por un solo dígito mal en el IBAN. Valida checksums ES o genera IBAN desde CCC de 20 dígitos — gratis, en tu navegador.",
      h1: "Validador IBAN ES",
      intro:
        "Bancos y Bizum devuelven transferencias cuando falla el checksum del IBAN — a veces porque el CCC está bien pero faltó el prefijo ES o los dígitos de control. Valida ISO 13616 en local antes de pagar el alquiler, facturar a un cliente o pegar datos en RR. HH., o genera el IBAN completo desde la cuenta corriente de 20 dígitos de tu cartilla bancaria.",
      benefit: "Detecta IBAN incorrectos antes de mandar el dinero.",
      howTo: [
        "Pega un IBAN ES completo (ES + 22 dígitos) o introduce el CCC de 20 dígitos de tus datos bancarios.",
        "Ejecuta la validación — la herramienta señala errores de checksum y muestra la estructura esperada.",
        "Si solo tienes CCC, genera el IBAN completo y cópialo cuando pase el checksum.",
        "Usa el IBAN validado en la pantalla de transferencia; corrige dígitos antes de confirmar, no tras un pago devuelto.",
      ],
      whatItDoes:
        "Aplica el checksum mod-97 ISO 13616 para IBAN españoles y convierte un CCC válido (entidad, oficina, DC, número de cuenta) al formato ES….",
      whatItDoesNot:
        "No confirma que la cuenta exista, esté abierta o sea del beneficiario. Sin conexión al Banco de España ni a tu banco — solo checksum.",
      tips: [
        "El IBAN español es siempre ES + 22 caracteres (24 en total) — si te falta longitud, probablemente falte el código país o los dígitos de control.",
        "Los dos DC del CCC no son los mismos dígitos de control del IBAN; no pegues solo el CCC si el formulario pide IBAN expresamente.",
        "Si facturas como autónomo, valida el IBAN del cliente antes de guardarlo en tu app — un dígito mal obliga a perseguir la devolución.",
      ],
      faq: [
        {
          q: "¿Por qué me rechazan la transferencia con “IBAN no válido”?",
          a: "Casi siempre por un dígito cambiado, falta el prefijo ES o una mala conversión desde el CCC. Esta herramienta comprueba la matemática en local para que corrijas la cadena antes de enviar el pago.",
        },
        {
          q: "¿Puedo montar el IBAN con los números de la tarjeta?",
          a: "Necesitas el CCC completo (entidad, oficina, DC, cuenta) del extracto o certificado — la tarjeta suele mostrar solo parte. Con los 20 dígitos, el generador añade ES y los dígitos de control IBAN.",
        },
        {
          q: "¿Checksum válido significa que la cuenta existe?",
          a: "No. Solo demuestra que el número es estructuralmente correcto. Que la cuenta exista y acepte ingresos lo confirma el banco al procesar el pago.",
        },
        {
          q: "¿Se sube mi IBAN a algún sitio?",
          a: "No. Validación y generación quedan solo en tu navegador.",
        },
        {
          q: "¿Es una herramienta oficial del Banco de España?",
          a: "No. Es una ayuda gratuita para pagos y formularios cotidianos — no certificada por ninguna autoridad. Para reclamaciones o certificados formales, usa tu banco o las vías oficiales.",
        },
      ],
    },
  }),
  tool({
    slug: "calculadora-irpf-retencion",
    accent: "#34d399",
    en: {
      name: "IRPF withholding calculator",
      title: "Spain IRPF Withholding Calculator — Per-Pay Estimate from Gross",
      description:
        "Estimate Spanish IRPF withholding per pay period from gross annual salary — so the net on your offer is not a surprise. Free orientation tool.",
      h1: "IRPF withholding estimate (Spain)",
      intro:
        "Take-home is what remains after withholding. When an offer only shows bruto, this tool estimates the IRPF slice per paga using simplified brackets so you can sanity-check the monthly transfer alongside the net salary calculator.",
      benefit: "See the tax slice before you accept.",
      howTo: [
        "Enter gross annual salary.",
        "Choose how many pagas the contract uses.",
        "Read estimated withholding per period and implied rate.",
      ],
      whatItDoes: "Maps annual gross into a simplified withholding orientation per pay period.",
      whatItDoesNot:
        "Ignores many personal/family situations, disability minimums, and multi-payer rules. Not a substitute for payroll software.",
      tips: [
        "Use with the net salary calculator — withholding is only one slice of the story.",
        "Two payers in one year often changes real withholding.",
        "Company benefits in kind can affect taxable base — ask HR.",
      ],
      faq: [
        {
          q: "Is this the same as my final renta?",
          a: "No. Withholding is an advance. Your annual renta settlement can mean paying more or getting a refund.",
        },
        {
          q: "Why does my payslip differ?",
          a: "Payroll uses your full personal situation and company rules. This is a fast orientation for offer comparison.",
        },
        {
          q: "Does CCAA matter?",
          a: "Yes for the final tax picture. This tool stays nationally orientative.",
        },
        {
          q: "Is data uploaded?",
          a: "No — on-device only.",
        },
      ],
    },
    es: {
      name: "Calculadora retención IRPF",
      title: "Calculadora retención IRPF España — Estimación por paga desde el bruto",
      description:
        "Estima la retención IRPF por paga a partir del bruto anual — para que el neto de la oferta no sorprenda. Herramienta orientativa gratis.",
      h1: "Estimación de retención IRPF (España)",
      intro:
        "El neto es lo que queda tras la retención. Si la oferta solo muestra bruto, esta herramienta estima el trozo de IRPF por paga con tramos simplificados para contrastar la transferencia mensual junto a la calculadora de salario neto.",
      benefit: "Ve el trozo fiscal antes de aceptar.",
      howTo: [
        "Introduce el bruto anual.",
        "Elige cuántas pagas tiene el contrato.",
        "Lee la retención estimada por periodo y el tipo implícito.",
      ],
      whatItDoes: "Traduce el bruto anual a una retención orientativa por paga con tramos simplificados.",
      whatItDoesNot:
        "Ignora muchas situaciones personales/familiares, mínimos por discapacidad y reglas de varios pagadores. No sustituye al software de nómina.",
      tips: [
        "Úsala con la calculadora de salario neto — la retención es solo una parte.",
        "Dos pagadores en el mismo año suelen cambiar la retención real.",
        "La retribución en especie puede afectar la base — pregunta a RR. HH.",
      ],
      faq: [
        {
          q: "¿Es lo mismo que la renta final?",
          a: "No. La retención es un anticipo. La declaración anual puede salir a pagar o a devolver.",
        },
        {
          q: "¿Por qué mi nómina difiere?",
          a: "Nómina usa tu situación completa y reglas de empresa. Esto es orientación rápida para comparar ofertas.",
        },
        {
          q: "¿Importa la CCAA?",
          a: "Sí en el cuadro fiscal final. Esta herramienta se queda en orientación estatal.",
        },
        {
          q: "¿Se suben datos?",
          a: "No — solo en el dispositivo.",
        },
      ],
    },
  }),
  tool({
    slug: "dividir-cuenta",
    accent: "#fb923c",
    ...copy(
      "Bill split calculator",
      "Dividir cuenta",
      "Bill Split Calculator — Split + Optional Tip (Spain)",
      "Dividir cuenta — Reparto + propina opcional (España)",
      "Split a restaurant bill between people with an optional tip percentage — free Spain-friendly tool.",
      "Divide la cuenta del restaurante entre personas con propina opcional — herramienta gratis.",
      "Split the bill",
      "Dividir la cuenta",
      "Companion to the Spain tip calculator — fair per-person totals in seconds.",
      "Compañera de la calculadora de propinas — total por persona en segundos.",
      "Split bill + tip per person.",
      "Reparto de cuenta + propina por persona.",
    ),
  }),
  tool({
    slug: "carta-de-presentacion",
    accent: "#7dd3fc",
    ...copy(
      "Cover letter generator",
      "Generador de carta de presentación",
      "Free Cover Letter Generator — Spanish & English Job Applications",
      "Generador de carta de presentación gratis — Candidaturas ES/EN",
      "Generate a concise cover letter for Spanish or English job applications — copy or download as text.",
      "Genera una carta de presentación breve para candidaturas — copia o descarga en texto.",
      "Cover letter generator",
      "Generador de carta de presentación",
      "Pair with the free CV builder for ATS-friendly applications.",
      "Combínala con el creador de CV gratis para candidaturas ATS.",
      "Draft a cover letter in seconds.",
      "Borrador de carta en segundos.",
    ),
  }),
  tool({
    slug: "calculadora-coste-viaje",
    accent: "#a3e635",
    ...copy(
      "Trip fuel cost calculator",
      "Calculadora coste de viaje",
      "Trip Fuel Cost Calculator — km × L/100km × €/L",
      "Calculadora coste de viaje — km × L/100km × €/L",
      "Estimate road-trip fuel cost and per-person split from distance, consumption, and fuel price.",
      "Estima el coste de combustible y el reparto por persona con distancia, consumo y precio.",
      "Fuel trip cost",
      "Coste de combustible",
      "Plan Spanish road trips with a quick fuel budget.",
      "Planifica viajes por carretera en España con un presupuesto rápido de combustible.",
      "Fuel cost and passenger split.",
      "Coste de combustible y reparto.",
    ),
  }),
  tool({
    slug: "coste-compra-vivienda",
    accent: "#f472b6",
    en: {
      name: "Home buying cost calculator",
      title: "Spain Home Buying Costs — ITP/VAT + Notary Beyond the Listing Price",
      description:
        "Ballpark Spanish purchase extras: ITP on resale or IVA on new builds, plus notary, registry, and agency fees — so savings targets match signing day.",
      h1: "Home purchase cost calculator (Spain)",
      intro:
        "The Idealista price is not what you pay at the notary. Resale usually means ITP that varies by CCAA; obra nueva usually means IVA; both add notary, registry, and often agency. Use this to estimate all-in cash need beyond the mortgage principal. Orientation — confirm rates with your notary and gestoría.",
      benefit: "See cash needed beyond the listing price.",
      howTo: [
        "Enter the agreed purchase price.",
        "Choose resale (ITP %) or new build (IVA %) for your case.",
        "Add estimated notary, registry, and agency fees (edit defaults).",
        "Read extras total and all-in price — then compare with your entrada + savings.",
      ],
      whatItDoes:
        "Sums purchase tax orientation (ITP or IVA) with editable closing fees to show extras and all-in cost.",
      whatItDoesNot:
        "Does not model AJD on the mortgage deed, age exemptions, or official tax filings. ITP bands differ by CCAA — verify locally.",
      tips: [
        "Ask which CCAA ITP tramo applies before you lock savings.",
        "Pair with the mortgage calculator — cuota ≠ cash at signing.",
        "Agency fees are often negotiable; notary/registry less so.",
      ],
      faq: [
        {
          q: "ITP or IVA — which one?",
          a: "Resale homes typically use ITP (regional). New builds (obra nueva) typically use IVA. Your notary confirms which regime applies.",
        },
        {
          q: "Does this include AJD on the mortgage?",
          a: "No. AJD on the loan deed is separate and region-dependent — ask the bank/notary for that line.",
        },
        {
          q: "Why do online estimates differ?",
          a: "ITP rates and exemptions vary by comunidad and buyer profile. Treat any single % as a starting point.",
        },
        {
          q: "Is this an official tax calculator?",
          a: "No — orientation for budgeting. Filing and liquidation go through official channels / gestoría.",
        },
        {
          q: "Is data uploaded?",
          a: "No — local only.",
        },
      ],
    },
    es: {
      name: "Coste de compra de vivienda",
      title: "Coste compra vivienda España — ITP/IVA + notaría más allá del anuncio",
      description:
        "Estima extras de compraventa: ITP en segunda mano o IVA en obra nueva, más notaría, registro y agencia — para que el ahorro cuadre el día de la firma.",
      h1: "Calculadora coste de compra de vivienda",
      intro:
        "El precio de Idealista no es lo que pagas en notaría. En segunda mano suele haber ITP (varía por CCAA); en obra nueva, IVA; y en ambos notaría, registro y a menudo agencia. Úsalo para estimar el efectivo total además del principal de la hipoteca. Orientación — confirma tipos con notario y gestoría.",
      benefit: "Ve el efectivo necesario más allá del precio de anuncio.",
      howTo: [
        "Introduce el precio de compraventa.",
        "Elige segunda mano (% ITP) u obra nueva (% IVA) según tu caso.",
        "Añade notaría, registro y agencia estimados (puedes editar los valores).",
        "Lee extras y precio all-in — compáralo con entrada + ahorro.",
      ],
      whatItDoes:
        "Suma un impuesto de compra orientativo (ITP o IVA) con gastos de cierre editables para mostrar extras y coste total.",
      whatItDoesNot:
        "No modela AJD de la escritura de hipoteca, bonificaciones por edad ni liquidaciones oficiales. Los tramos de ITP cambian por CCAA — verifica en local.",
      tips: [
        "Pregunta qué tramo de ITP aplica en tu CCAA antes de fijar el ahorro.",
        "Combínala con la calculadora de hipoteca — la cuota no es el efectivo en la firma.",
        "La agencia a menudo se negocia; notaría/registro menos.",
      ],
      faq: [
        {
          q: "¿ITP o IVA?",
          a: "Segunda mano suele ITP (autonómico). Obra nueva suele IVA. El notario confirma el régimen.",
        },
        {
          q: "¿Incluye el AJD de la hipoteca?",
          a: "No. El AJD de la escritura del préstamo es aparte y depende de la región — pídelo al banco/notario.",
        },
        {
          q: "¿Por qué cambian las estimaciones online?",
          a: "Tipos de ITP y exenciones varían por comunidad y perfil del comprador. Cualquier % es un punto de partida.",
        },
        {
          q: "¿Es una calculadora fiscal oficial?",
          a: "No — orientación para presupuestar. La liquidación va por canales oficiales / gestoría.",
        },
        {
          q: "¿Se suben datos?",
          a: "No — solo en local.",
        },
      ],
    },
  }),
  // LatAm packs
  tool({
    category: "latam",
    slug: "salario-neto-mexico",
    accent: "#22c55e",
    ...copy(
      "Mexico net salary estimate",
      "Salario neto México",
      "Mexico Net Salary Calculator — Gross to Net (MXN)",
      "Calculadora salario neto México — Bruto a neto (MXN)",
      "Orientative Mexico monthly net from gross with simplified ISR/SS assumptions — free.",
      "Neto mensual orientativo en México desde el bruto con ISR/SS simplificados — gratis.",
      "Mexico salary (gross → net)",
      "Salario México (bruto → neto)",
      "Quick MXN take-home estimate for offers and budgeting.",
      "Estimación rápida de neto en MXN para ofertas y presupuesto.",
      "MXN net pay ballpark.",
      "Orden de magnitud de neto MXN.",
    ),
  }),
  tool({
    category: "latam",
    slug: "validador-rfc-mexico",
    accent: "#22c55e",
    ...copy(
      "Mexico RFC format checker",
      "Validador RFC México",
      "Mexico RFC Format Validator — Free On-Device Check",
      "Validador de formato RFC México — Chequeo gratis en local",
      "Check Mexican RFC format locally before forms — free, no upload.",
      "Comprueba el formato de RFC mexicano en local antes de formularios — gratis.",
      "RFC format check",
      "Chequeo formato RFC",
      "Format validation only — not a SAT lookup.",
      "Solo validación de formato — no consulta al SAT.",
      "Validate RFC pattern on-device.",
      "Valida el patrón RFC en el dispositivo.",
    ),
  }),
  tool({
    category: "latam",
    slug: "iva-mexico",
    accent: "#22c55e",
    ...copy(
      "Mexico VAT (IVA 16%) calculator",
      "Calculadora IVA México 16%",
      "Mexico IVA 16% Calculator — Add or Extract VAT",
      "Calculadora IVA México 16% — Añadir o extraer",
      "Add or extract 16% Mexican IVA from invoice amounts — free browser tool.",
      "Añade o extrae el 16% de IVA mexicano de importes — herramienta gratis.",
      "Mexico IVA 16%",
      "IVA México 16%",
      "Fast 16% VAT math for MX invoices.",
      "Cálculo rápido de IVA 16% para facturas MX.",
      "16% add/extract VAT.",
      "Añadir/extraer IVA 16%.",
    ),
  }),
  tool({
    category: "latam",
    slug: "salario-neto-colombia",
    accent: "#f59e0b",
    ...copy(
      "Colombia net salary estimate",
      "Salario neto Colombia",
      "Colombia Net Salary Calculator — Gross to Net (COP)",
      "Calculadora salario neto Colombia — Bruto a neto (COP)",
      "Orientative Colombia monthly net from gross — free simplified model.",
      "Neto mensual orientativo en Colombia desde el bruto — modelo simplificado gratis.",
      "Colombia salary (gross → net)",
      "Salario Colombia (bruto → neto)",
      "COP take-home ballpark for planning.",
      "Orden de magnitud de neto COP para planificar.",
      "COP net pay estimate.",
      "Estimación de neto COP.",
    ),
  }),
  tool({
    category: "latam",
    slug: "validador-rut-colombia",
    accent: "#f59e0b",
    ...copy(
      "Colombia RUT / NIT checker",
      "Validador RUT / NIT Colombia",
      "Colombia RUT/NIT Format Checker — Free",
      "Validador formato RUT/NIT Colombia — Gratis",
      "Basic digit-length check for Colombian RUT/NIT — on-device only.",
      "Chequeo básico de longitud para RUT/NIT colombiano — solo en local.",
      "RUT / NIT check",
      "Chequeo RUT / NIT",
      "Format guidance before submitting forms.",
      "Guía de formato antes de enviar formularios.",
      "Quick RUT/NIT format check.",
      "Chequeo rápido de formato RUT/NIT.",
    ),
  }),
  tool({
    category: "latam",
    slug: "salario-neto-argentina",
    accent: "#38bdf8",
    ...copy(
      "Argentina net salary estimate",
      "Sueldo neto Argentina",
      "Argentina Net Salary Calculator — Gross to Net (ARS)",
      "Calculadora sueldo neto Argentina — Bruto a neto (ARS)",
      "Orientative Argentina monthly net from gross — free simplified model.",
      "Neto mensual orientativo en Argentina desde el bruto — modelo simplificado gratis.",
      "Argentina salary (gross → net)",
      "Sueldo Argentina (bruto → neto)",
      "ARS take-home ballpark.",
      "Orden de magnitud de neto ARS.",
      "ARS net pay estimate.",
      "Estimación de neto ARS.",
    ),
  }),
  tool({
    category: "latam",
    slug: "validador-cuit-argentina",
    accent: "#38bdf8",
    ...copy(
      "Argentina CUIT validator",
      "Validador CUIT Argentina",
      "Argentina CUIT Validator — Checksum On-Device",
      "Validador CUIT Argentina — Dígito verificador en local",
      "Validate Argentine CUIT checksum locally — free, no upload.",
      "Valida el dígito verificador de CUIT argentino en local — gratis.",
      "CUIT checksum validator",
      "Validador dígito CUIT",
      "Official-style modulo check without sending data.",
      "Control tipo módulo sin enviar datos.",
      "Validate CUIT checksum locally.",
      "Valida el CUIT en local.",
    ),
  }),
];
