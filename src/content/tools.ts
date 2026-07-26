export type ToolCategory = "spain" | "pickleball";

export type ToolLocaleCopy = {
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  benefit: string;
  howTo: string[];
  whatItDoes: string;
  whatItDoesNot: string;
  tips: string[];
  faq: { q: string; a: string }[];
};

export type Tool = {
  slug: string;
  category: ToolCategory;
  relatedProductSlug: string;
  relatedProductUrl: string;
  relatedProductLabel: string;
  processing: "local";
  accent: string;
  en: ToolLocaleCopy;
  es: ToolLocaleCopy;
};

export const toolCategories: {
  id: ToolCategory;
  en: { name: string; blurb: string };
  es: { name: string; blurb: string };
}[] = [
  {
    id: "spain",
    en: {
      name: "Spain travel tools",
      blurb: "Practical calculators for travelers and diners in Spain.",
    },
    es: {
      name: "Herramientas para viajar por España",
      blurb: "Calculadoras prácticas para viajeros y comensales en España.",
    },
  },
  {
    id: "pickleball",
    en: {
      name: "Pickleball Germany tools",
      blurb: "Court discovery built from editorial city-guide coverage in Germany.",
    },
    es: {
      name: "Herramientas de pickleball en Alemania",
      blurb: "Búsqueda de pistas basada en guías editoriales de ciudades en Alemania.",
    },
  },
];

export const tools: Tool[] = [
  {
    slug: "spain-tip-calculator",
    category: "spain",
    relatedProductSlug: "spain-eats",
    relatedProductUrl: "https://spaineats.info/",
    relatedProductLabel: "Spain Eats",
    processing: "local",
    accent: "#c45c26",
    en: {
      name: "Spain tip calculator",
      title: "Spain Tip Calculator — How Much to Tip at Restaurants, Bars & Hotels",
      description:
        "Enter your bill and get the right tip for Spain — free calculator covering restaurants, bars, taxis, and hotels, based on real local etiquette.",
      h1: "How much should you tip in Spain?",
      intro:
        "Tipping in Spain is optional, not expected the way it is in the US. For restaurants, 5–10% is generous for good service; for cafés and bars, rounding up or leaving small change is enough. Use the calculator below to get an exact euro amount for your bill.",
      benefit: "Get a realistic tip range for cafés, restaurants, taxis, and hotels in Spain.",
      howTo: [
        "Enter your bill total in euros.",
        "Choose the venue type.",
        "Read the suggested tip range and total to pay.",
      ],
      whatItDoes:
        "Suggests culturally typical tip ranges for common venue types in Spain and converts them into euro amounts.",
      whatItDoesNot:
        "It does not replace local judgment, hotel policies, or situations where a service charge is already included.",
      tips: [
        "Service charge is rarely pre-included on Spanish restaurant bills — check the ticket.",
        "Rounding up is common at bars and cafés; percentages matter more at sit-down restaurants.",
      ],
      faq: [
        {
          q: "Is tipping required in Spain?",
          a: "No. It is appreciated for good service but not mandatory like in the US.",
        },
        {
          q: "How much should I tip at a restaurant?",
          a: "About 5–10% for good service is generous. Many locals leave less or round up.",
        },
      ],
    },
    es: {
      name: "Calculadora de propinas en España",
      title: "Calculadora de propinas en España — Restaurantes, bares y hoteles",
      description:
        "Introduce la cuenta y obtén una propina realista en España — calculadora gratis para restaurantes, bares, taxis y hoteles.",
      h1: "¿Cuánto se deja de propina en España?",
      intro:
        "En España la propina es opcional, no se espera como en EE. UU. En restaurantes, un 5–10% es generoso si el servicio fue bueno; en cafés y bares suele bastar redondear o dejar monedas. Usa la calculadora para obtener un importe en euros.",
      benefit: "Obtén un rango realista de propina para cafés, restaurantes, taxis y hoteles en España.",
      howTo: [
        "Introduce el total de la cuenta en euros.",
        "Elige el tipo de local.",
        "Consulta el rango de propina sugerido y el total a pagar.",
      ],
      whatItDoes:
        "Sugiere rangos típicos de propina por tipo de local en España y los convierte en euros.",
      whatItDoesNot:
        "No sustituye el criterio local, políticas de hotel ni casos con servicio ya incluido.",
      tips: [
        "El cargo por servicio rara vez viene incluido — revisa el ticket.",
        "En bares y cafés es habitual redondear; en restaurantes el porcentaje importa más.",
      ],
      faq: [
        {
          q: "¿Es obligatorio dejar propina en España?",
          a: "No. Se agradece si el servicio fue bueno, pero no es obligatorio como en EE. UU.",
        },
        {
          q: "¿Cuánto dejar en un restaurante?",
          a: "Un 5–10% por buen servicio es generoso. Muchos locales redondean o dejan menos.",
        },
      ],
    },
  },
  {
    slug: "menu-del-dia-calculator",
    category: "spain",
    relatedProductSlug: "spain-eats",
    relatedProductUrl: "https://spaineats.info/",
    relatedProductLabel: "Spain Eats",
    processing: "local",
    accent: "#c45c26",
    en: {
      name: "Menú del día value calculator",
      title: "Is the Menú del Día Worth It? Free Value Calculator",
      description:
        "Compare Spain's fixed-price lunch menu against ordering à la carte and see exactly how much you're saving.",
      h1: "Menú del día vs. à la carte — which is the better deal?",
      intro:
        "Spain’s menú del día is a fixed-price lunch that usually includes several courses and a drink. Compare it to ordering the same items separately and see the euro savings instantly.",
      benefit: "See whether the fixed lunch menu beats ordering each course à la carte.",
      howTo: [
        "Enter the menú del día price.",
        "Estimate starter, main, drink, and dessert à la carte.",
        "Compare euros saved and percent discount.",
      ],
      whatItDoes:
        "Subtracts the menú price from the summed à la carte estimate and shows absolute and percentage savings.",
      whatItDoesNot:
        "It does not scrape restaurant menus or guarantee identical portion quality between formats.",
      tips: [
        "Menú del día is typically weekday lunch — evenings and weekends often differ.",
        "Bread and tax may already be included; compare like-for-like items.",
      ],
      faq: [
        {
          q: "What is menú del día?",
          a: "A fixed-price weekday lunch set in Spain, often starter + main + dessert or coffee + drink.",
        },
        {
          q: "Is it always cheaper?",
          a: "Usually yes versus ordering the same courses separately — this calculator shows by how much.",
        },
      ],
    },
    es: {
      name: "Calculadora menú del día",
      title: "¿Merece la pena el menú del día? Calculadora gratis",
      description:
        "Compara el menú del día con pedir a la carta y mira exactamente cuánto ahorras.",
      h1: "Menú del día vs. a la carta — ¿cuál es mejor negocio?",
      intro:
        "El menú del día es un almuerzo a precio fijo que suele incluir varios platos y bebida. Compáralo con pedir lo mismo a la carta y ve el ahorro en euros al instante.",
      benefit: "Comprueba si el menú fijo gana a pedir cada plato a la carta.",
      howTo: [
        "Introduce el precio del menú del día.",
        "Estima entrante, principal, bebida y postre a la carta.",
        "Compara euros ahorrados y el descuento porcentual.",
      ],
      whatItDoes:
        "Resta el precio del menú a la suma a la carta y muestra ahorro absoluto y porcentual.",
      whatItDoesNot:
        "No scrapea cartas reales ni garantiza la misma calidad de ración entre formatos.",
      tips: [
        "El menú del día suele ser de lunes a viernes al mediodía.",
        "Compara elementos equivalentes (IVA, pan, bebida).",
      ],
      faq: [
        {
          q: "¿Qué es el menú del día?",
          a: "Un almuerzo a precio fijo entre semana, a menudo entrante + principal + postre o café + bebida.",
        },
        {
          q: "¿Siempre es más barato?",
          a: "Casi siempre frente a pedir lo mismo a la carta — esta calculadora muestra cuánto.",
        },
      ],
    },
  },
  {
    slug: "pickleball-courts-germany",
    category: "pickleball",
    relatedProductSlug: "pickleball-deutsch",
    relatedProductUrl: "https://pickleballdeutch.com/",
    relatedProductLabel: "Pickleball Deutsch",
    processing: "local",
    accent: "#ffb020",
    en: {
      name: "Pickleball courts finder (Germany)",
      title: "Pickleball Courts in Germany — Free Court Finder",
      description:
        "Find pickleball courts by German city or state — with indoor/outdoor notes and links to city guides on Pickleball Deutsch.",
      h1: "Pickleball-Plätze in Deutschland",
      intro:
        "Search a curated list of pickleball locations across Germany drawn from Pickleball Deutsch city-guide coverage. Filter by state or indoor/outdoor, then open the related city guide for deeper local context.",
      benefit: "Filter German pickleball courts by city, state, and indoor/outdoor.",
      howTo: [
        "Type a city or state name to filter.",
        "Optionally limit to indoor or outdoor.",
        "Open a city guide for local details.",
      ],
      whatItDoes:
        "Filters a curated court dataset for Germany and links out to editorial city guides.",
      whatItDoesNot:
        "It is not a live booking system and may not list every private or newly opened court.",
      tips: [
        "Coverage is strongest in cities with Pickleball Deutsch guides.",
        "Always confirm opening hours with the venue before traveling.",
      ],
      faq: [
        {
          q: "Where does the data come from?",
          a: "Editorial city-guide research from Pickleball Deutsch — stronger German coverage than thin global directories.",
        },
        {
          q: "Can I book a court here?",
          a: "No. This finder helps you discover locations; booking stays with the venue.",
        },
      ],
    },
    es: {
      name: "Buscador de pistas de pickleball (Alemania)",
      title: "Pistas de pickleball en Alemania — Buscador gratis",
      description:
        "Encuentra pistas de pickleball por ciudad o estado en Alemania — con notas indoor/outdoor y enlaces a guías de ciudad.",
      h1: "Pistas de pickleball en Alemania",
      intro:
        "Busca una lista curada de ubicaciones de pickleball en Alemania basada en las guías de ciudad de Pickleball Deutsch. Filtra por estado o indoor/outdoor y abre la guía relacionada.",
      benefit: "Filtra pistas de pickleball en Alemania por ciudad, estado e indoor/outdoor.",
      howTo: [
        "Escribe una ciudad o estado para filtrar.",
        "Opcionalmente limita a indoor u outdoor.",
        "Abre una guía de ciudad para más detalle.",
      ],
      whatItDoes:
        "Filtra un dataset curado de pistas en Alemania y enlaza a guías editoriales.",
      whatItDoesNot:
        "No es un sistema de reservas y puede no incluir pistas privadas o recién abiertas.",
      tips: [
        "La cobertura es más fuerte donde hay guía de Pickleball Deutsch.",
        "Confirma horarios con el club antes de viajar.",
      ],
      faq: [
        {
          q: "¿De dónde sale la información?",
          a: "De la investigación editorial de Pickleball Deutsch — mejor cobertura alemana que directorios globales finos.",
        },
        {
          q: "¿Puedo reservar aquí?",
          a: "No. El buscador ayuda a descubrir ubicaciones; la reserva es con el club.",
        },
      ],
    },
  },
];

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}

export function toolsByCategory(category: ToolCategory) {
  return tools.filter((t) => t.category === category);
}

export function toolCopy(tool: Tool, locale: "en" | "es") {
  return locale === "es" ? tool.es : tool.en;
}
