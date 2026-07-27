import { spainLifeTools } from "./spain-life-tools";

export type ToolCategory = "wasup" | "downitx" | "pinquill" | "spain" | "pickleball";

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

export type ToolPlaceholder = {
  id: string;
  category: ToolCategory;
  accent: string;
  relatedProductUrl: string;
  relatedProductLabel: string;
  en: { name: string; benefit: string; status: string };
  es: { name: string; benefit: string; status: string };
};

export const toolCategories: {
  id: ToolCategory;
  en: { name: string; blurb: string };
  es: { name: string; blurb: string };
  productUrl: string;
  productLabel: string;
}[] = [
  {
    id: "wasup",
    productUrl: "https://wasup.app/es",
    productLabel: "Wasup",
    en: {
      name: "Wasup tools",
      blurb: "Free WhatsApp utilities for operators who need links, QR, and cleaner lead intake.",
    },
    es: {
      name: "Herramientas Wasup",
      blurb: "Utilidades gratis de WhatsApp para operadores que necesitan enlaces, QR y captación más limpia.",
    },
  },
  {
    id: "downitx",
    productUrl: "https://downitx.com/",
    productLabel: "DownitX",
    en: {
      name: "DownitX tools",
      blurb: "Creator utilities that sit next to bulk download and Long→Short pipelines.",
    },
    es: {
      name: "Herramientas DownitX",
      blurb: "Utilidades para creadores junto a pipelines de descarga bulk y Long→Short.",
    },
  },
  {
    id: "pinquill",
    productUrl: "https://pinquill.com/en",
    productLabel: "PinQuill",
    en: {
      name: "PinQuill tools",
      blurb: "Pinterest-oriented helpers for pin canvas and composition checks.",
    },
    es: {
      name: "Herramientas PinQuill",
      blurb: "Ayudas orientadas a Pinterest para canvas y composición de pines.",
    },
  },
  {
    id: "spain",
    productUrl: "https://spaineats.info/",
    productLabel: "Spain Eats",
    en: {
      name: "Spain life & travel tools",
      blurb:
        "Free calculators for Spain: salary, mortgage, DNI/NIE, EvAU, CV, diet, budget, shipping, and travel dining helpers.",
    },
    es: {
      name: "Herramientas de vida y viaje en España",
      blurb:
        "Calculadoras gratis para España: salario, hipoteca, DNI/NIE, EvAU, CV, dieta, presupuesto, envíos y comidas de viaje.",
    },
  },
  {
    id: "pickleball",
    productUrl: "https://pickleballdeutch.com/",
    productLabel: "Pickleball Deutsch",
    en: {
      name: "Pickleball tools",
      blurb:
        "Court finders for USA, Canada, Australia, UK, Spain, and Germany — plus court dimension converters for builders and travelers.",
    },
    es: {
      name: "Herramientas de pickleball",
      blurb:
        "Buscadores de pistas para EE. UU., Canadá, Australia, Reino Unido, España y Alemania — más convertidores de medidas de pista.",
    },
  },
];

export const toolPlaceholders: ToolPlaceholder[] = [];

function regionalCourtTool(opts: {
  slug: string;
  countryEn: string;
  countryEs: string;
  h1En: string;
  h1Es: string;
  relatedProductUrl?: string;
  relatedProductLabel?: string;
}): Tool {
  const {
    slug,
    countryEn,
    countryEs,
    h1En,
    h1Es,
    relatedProductUrl = "https://pickleballdeutch.com/",
    relatedProductLabel = "Pickleball Deutsch",
  } = opts;
  return {
    slug,
    category: "pickleball",
    relatedProductSlug: "pickleball-deutsch",
    relatedProductUrl,
    relatedProductLabel,
    processing: "local",
    accent: "#ffb020",
    en: {
      name: `Pickleball courts finder (${countryEn})`,
      title: `Pickleball Courts in ${countryEn} — Free Court Finder`,
      description: `Find pickleball court hubs by city or region in ${countryEn} — indoor/outdoor notes for travelers and locals. Free, no signup.`,
      h1: h1En,
      intro: `Search a curated list of pickleball metro hubs across ${countryEn}. Filter by region or indoor/outdoor. This is not a complete national directory — always confirm hours and booking with the venue.`,
      benefit: `Filter ${countryEn} pickleball hubs by city, region, and indoor/outdoor.`,
      howTo: [
        "Type a city or region name to filter.",
        "Optionally limit to indoor or outdoor.",
        "Open any linked guide when available.",
      ],
      whatItDoes: `Filters a curated city-hub dataset for ${countryEn} so you can discover where scenes exist.`,
      whatItDoesNot:
        "It is not a live booking system and will not list every private, HOA, or newly opened court.",
      tips: [
        "Treat results as discovery hubs, then verify locally.",
        "Indoor capacity matters more in wet or cold seasons.",
      ],
      faq: [
        {
          q: "Is this a complete directory?",
          a: "No. It is a curated metro-hub starter list for discovery — expand your search with local clubs after you pick a city.",
        },
        {
          q: "Can I book a court here?",
          a: "No. Booking stays with the venue or club.",
        },
      ],
    },
    es: {
      name: `Buscador de pistas (${countryEs})`,
      title: `Pistas de pickleball en ${countryEs} — Buscador gratis`,
      description: `Encuentra hubs de pickleball por ciudad o región en ${countryEs} — notas indoor/outdoor. Gratis, sin registro.`,
      h1: h1Es,
      intro: `Busca una lista curada de hubs de pickleball en ${countryEs}. Filtra por región o indoor/outdoor. No es un directorio nacional completo — confirma horarios y reservas con el club.`,
      benefit: `Filtra hubs de pickleball en ${countryEs} por ciudad, región e indoor/outdoor.`,
      howTo: [
        "Escribe una ciudad o región para filtrar.",
        "Opcionalmente limita a indoor u outdoor.",
        "Abre cualquier guía enlazada si está disponible.",
      ],
      whatItDoes: `Filtra un dataset curado de hubs urbanos en ${countryEs} para descubrir dónde hay escena.`,
      whatItDoesNot:
        "No es un sistema de reservas y no lista todas las pistas privadas o recién abiertas.",
      tips: [
        "Úsalo para descubrir ciudades, luego verifica en local.",
        "En temporada fría o lluviosa prioriza opciones indoor.",
      ],
      faq: [
        {
          q: "¿Es un directorio completo?",
          a: "No. Es una lista curada de hubs para empezar — amplía con clubs locales cuando elijas ciudad.",
        },
        {
          q: "¿Puedo reservar aquí?",
          a: "No. La reserva es con el club o instalación.",
        },
      ],
    },
  };
}

export const tools: Tool[] = [
  {
    slug: "whatsapp-link-generator",
    category: "wasup",
    relatedProductSlug: "wasup",
    relatedProductUrl: "https://wasup.app/es",
    relatedProductLabel: "Wasup",
    processing: "local",
    accent: "#25d366",
    en: {
      name: "WhatsApp link & QR generator",
      title: "WhatsApp Link & QR Generator — Free wa.me Builder",
      description:
        "Create a wa.me short link with a pre-filled message and download a QR code — 100% in your browser. Free, no signup.",
      h1: "WhatsApp link & QR generator",
      intro:
        "Build a clickable WhatsApp link (wa.me) with country code, phone number, and optional pre-filled message. Preview and download a QR instantly — all client-side.",
      benefit: "Generate wa.me links and QR codes for lead capture — no signup, runs locally.",
      howTo: [
        "Choose a country code and enter the phone number.",
        "Optionally add a pre-filled message.",
        "Copy the wa.me link or download the QR as PNG/SVG.",
      ],
      whatItDoes:
        "Formats an international WhatsApp deep link and encodes it into a scannable QR code in your browser.",
      whatItDoesNot:
        "It does not send messages for you, validate WhatsApp account status, or store phone numbers on a server.",
      tips: [
        "Omit leading zeros from the national number after the country code.",
        "Keep pre-filled messages short — long text makes ugly URLs and busy QR codes.",
      ],
      faq: [
        {
          q: "Is my number uploaded anywhere?",
          a: "No. Link and QR generation happen entirely in your browser.",
        },
        {
          q: "Does this replace a WhatsApp business inbox?",
          a: "No. It creates an entry link. For AI drafts with human approval at scale, see Wasup.",
        },
      ],
    },
    es: {
      name: "Generador de enlace y QR de WhatsApp",
      title: "Generador de enlace y QR de WhatsApp — wa.me gratis",
      description:
        "Crea un enlace corto wa.me con mensaje precargado y descarga un código QR — 100% en tu navegador. Gratis, sin registro.",
      h1: "Generador de enlace y QR de WhatsApp",
      intro:
        "Construye un enlace clicable de WhatsApp (wa.me) con código de país, número y mensaje opcional. Previsualiza y descarga el QR al instante — todo en el cliente.",
      benefit: "Genera enlaces wa.me y QR para captar leads — sin registro, en local.",
      howTo: [
        "Elige el código de país e introduce el número.",
        "Opcionalmente añade un mensaje precargado.",
        "Copia el enlace wa.me o descarga el QR en PNG/SVG.",
      ],
      whatItDoes:
        "Formatea un deep link internacional de WhatsApp y lo codifica en un QR escaneable en tu navegador.",
      whatItDoesNot:
        "No envía mensajes por ti, no valida cuentas de WhatsApp ni guarda números en un servidor.",
      tips: [
        "Quita ceros a la izquierda del número nacional después del código de país.",
        "Mantén el mensaje corto — el texto largo ensucia la URL y el QR.",
      ],
      faq: [
        {
          q: "¿Se sube mi número a algún sitio?",
          a: "No. El enlace y el QR se generan solo en tu navegador.",
        },
        {
          q: "¿Sustituye a una bandeja de WhatsApp Business?",
          a: "No. Crea un enlace de entrada. Para borradores con IA y aprobación humana a escala, mira Wasup.",
        },
      ],
    },
  },
  {
    slug: "tiktok-reels-safe-zone",
    category: "downitx",
    relatedProductSlug: "downitx",
    relatedProductUrl: "https://downitx.com/",
    relatedProductLabel: "DownitX",
    processing: "local",
    accent: "#3d8bff",
    en: {
      name: "TikTok / Reels safe-zone checker",
      title: "TikTok & Reels Safe-Zone Checker — Free Vertical Overlay Preview",
      description:
        "Preview TikTok and Instagram Reels UI overlays on a 9:16 frame so captions and faces stay readable. Free, runs in your browser.",
      h1: "TikTok / Reels safe-zone checker",
      intro:
        "Upload a still or use the blank stage. Toggle TikTok vs Reels chrome to see where captions, buttons, and side actions cover your frame — before you burn text into a Long→Short clip.",
      benefit: "Preview caption and UI overlays so clips stay readable on vertical platforms.",
      howTo: [
        "Choose TikTok or Instagram Reels.",
        "Optionally upload a frame or poster image.",
        "Check that faces and captions sit outside the shaded chrome zones.",
      ],
      whatItDoes:
        "Draws approximate platform UI safe zones on a 9:16 stage so you can spot collision with captions and faces.",
      whatItDoesNot:
        "It is not an official TikTok/Meta layout export and does not encode video or burn captions for you.",
      tips: [
        "Keep primary text in the middle third — top and bottom get the heaviest chrome.",
        "Reels and TikTok share a vertical canvas but place actions differently — toggle both.",
      ],
      faq: [
        {
          q: "Are the overlays pixel-perfect?",
          a: "No. They are practical guides based on common UI placement — always spot-check on device.",
        },
        {
          q: "Where does my image go?",
          a: "Only into your browser via FileReader. Nothing is uploaded to a server.",
        },
      ],
    },
    es: {
      name: "Checker de safe-zone TikTok / Reels",
      title: "Safe-zone TikTok y Reels — Preview de overlays verticales",
      description:
        "Previsualiza overlays de UI de TikTok e Instagram Reels en un frame 9:16 para que subtítulos y rostros se lean. Gratis, en el navegador.",
      h1: "Checker de safe-zone TikTok / Reels",
      intro:
        "Sube un fotograma o usa el escenario vacío. Alterna TikTok vs Reels para ver dónde botones y captions cubren el frame — antes de quemar texto en un clip Long→Short.",
      benefit: "Previsualiza subtítulos y overlays de UI para que los clips se lean en vertical.",
      howTo: [
        "Elige TikTok o Instagram Reels.",
        "Opcionalmente sube una imagen o póster.",
        "Comprueba que rostros y textos queden fuera de las zonas sombreadas.",
      ],
      whatItDoes:
        "Dibuja zonas seguras aproximadas de UI en un escenario 9:16 para detectar choques con captions y rostros.",
      whatItDoesNot:
        "No es un export oficial de TikTok/Meta y no codifica vídeo ni quema subtítulos.",
      tips: [
        "Mantén el texto clave en el tercio central — arriba y abajo llevan más chrome.",
        "Reels y TikTok comparten canvas vertical pero colocan acciones distinto — prueba ambos.",
      ],
      faq: [
        {
          q: "¿Los overlays son exactos al píxel?",
          a: "No. Son guías prácticas según UI habitual — verifica siempre en el dispositivo.",
        },
        {
          q: "¿A dónde va mi imagen?",
          a: "Solo a tu navegador con FileReader. No se sube a ningún servidor.",
        },
      ],
    },
  },
  {
    slug: "vertical-aspect-guide",
    category: "downitx",
    relatedProductSlug: "downitx",
    relatedProductUrl: "https://downitx.com/",
    relatedProductLabel: "DownitX",
    processing: "local",
    accent: "#3d8bff",
    en: {
      name: "Vertical aspect ratio guide",
      title: "Vertical Aspect Ratio Guide — TikTok, Reels, Shorts & Feed",
      description:
        "Pick a platform target and preview the aspect ratio box for TikTok, Reels, Shorts, 4:5 feed, or 1:1 — free browser guide.",
      h1: "Vertical aspect ratio guide",
      intro:
        "Creators often export the wrong ratio. Pick a destination, see the preview frame, and copy the ratio label before you cut clips in DownitX or another editor.",
      benefit: "See the right canvas ratio for short-form and feed formats instantly.",
      howTo: [
        "Select a platform / format.",
        "Read the ratio and recommended use notes.",
        "Match your export settings to the preview box.",
      ],
      whatItDoes: "Shows a live aspect-ratio preview and short guidance for common creator formats.",
      whatItDoesNot: "It does not resize or export video files.",
      tips: [
        "9:16 wins for TikTok, Reels, and Shorts.",
        "4:5 often performs better than 1:1 in Instagram feed.",
      ],
      faq: [
        {
          q: "Is 9:16 always required?",
          a: "For full-screen short-form, yes. Feed placements may prefer 4:5 or square.",
        },
        {
          q: "Does this change my file?",
          a: "No. It is a visual guide only.",
        },
      ],
    },
    es: {
      name: "Guía de aspect ratio vertical",
      title: "Guía de aspect ratio — TikTok, Reels, Shorts y feed",
      description:
        "Elige un destino y previsualiza el ratio para TikTok, Reels, Shorts, feed 4:5 o 1:1 — guía gratis en el navegador.",
      h1: "Guía de aspect ratio vertical",
      intro:
        "Muchos creadores exportan el ratio equivocado. Elige destino, mira el frame y copia la etiqueta antes de cortar en DownitX u otro editor.",
      benefit: "Ve al instante el canvas correcto para formatos short-form y feed.",
      howTo: [
        "Selecciona plataforma / formato.",
        "Lee el ratio y las notas de uso.",
        "Ajusta el export al frame de preview.",
      ],
      whatItDoes: "Muestra un preview de aspect ratio y guía corta para formatos de creador habituales.",
      whatItDoesNot: "No redimensiona ni exporta archivos de vídeo.",
      tips: [
        "9:16 gana en TikTok, Reels y Shorts.",
        "4:5 suele rendir mejor que 1:1 en el feed de Instagram.",
      ],
      faq: [
        {
          q: "¿Siempre hace falta 9:16?",
          a: "Para short-form a pantalla completa, sí. En feed puede convenir 4:5 o cuadrado.",
        },
        {
          q: "¿Cambia mi archivo?",
          a: "No. Solo es una guía visual.",
        },
      ],
    },
  },
  {
    slug: "pinterest-23-canvas",
    category: "pinquill",
    relatedProductSlug: "pinquill",
    relatedProductUrl: "https://pinquill.com/en",
    relatedProductLabel: "PinQuill",
    processing: "local",
    accent: "#e60023",
    en: {
      name: "2:3 Pinterest canvas previewer",
      title: "2:3 Pinterest Canvas Previewer — Free Pin Framing Tool",
      description:
        "Upload a pin image and preview it in the standard 2:3 Pinterest ratio with a title-safe guide. Free, local in your browser.",
      h1: "2:3 Pinterest canvas previewer",
      intro:
        "Pinterest’s standard pin ratio is 2:3 (e.g. 1000×1500). Upload your artwork, toggle contain vs cover, and keep key text inside the title-safe band before you publish with PinQuill.",
      benefit: "Check pin framing at the standard 2:3 ratio before you publish.",
      howTo: [
        "Upload a pin image (PNG/JPG/WebP).",
        "Toggle contain or cover fit.",
        "Confirm important content sits inside the title-safe guide.",
      ],
      whatItDoes: "Forces a 2:3 preview frame and optional title-safe overlay on an image you choose locally.",
      whatItDoesNot: "It does not publish to Pinterest or generate pin copy for you.",
      tips: [
        "Design at 1000×1500 or any exact 2:3 multiple.",
        "Keep faces and headlines away from the very top and bottom edges.",
      ],
      faq: [
        {
          q: "Why 2:3?",
          a: "It is Pinterest’s recommended standard pin aspect ratio for clean grid display.",
        },
        {
          q: "Is my image uploaded?",
          a: "No. Preview stays in your browser.",
        },
      ],
    },
    es: {
      name: "Previewer de canvas Pinterest 2:3",
      title: "Previewer canvas Pinterest 2:3 — Encuadre de pines gratis",
      description:
        "Sube la imagen del pin y previsualízala en ratio 2:3 estándar con guía de título seguro. Gratis, en local.",
      h1: "Previewer de canvas Pinterest 2:3",
      intro:
        "El ratio estándar de pin en Pinterest es 2:3 (p. ej. 1000×1500). Sube el arte, alterna contain/cover y mantén el texto clave dentro de la banda segura antes de publicar con PinQuill.",
      benefit: "Revisa el encuadre del pin en ratio 2:3 antes de publicar.",
      howTo: [
        "Sube una imagen de pin (PNG/JPG/WebP).",
        "Alterna ajuste contain o cover.",
        "Confirma que lo importante queda dentro de la guía de título.",
      ],
      whatItDoes: "Fuerza un frame 2:3 y un overlay opcional de título seguro sobre una imagen local.",
      whatItDoesNot: "No publica en Pinterest ni genera el copy del pin.",
      tips: [
        "Diseña a 1000×1500 o cualquier múltiplo exacto 2:3.",
        "Aleja rostros y titulares de los bordes superior e inferior.",
      ],
      faq: [
        {
          q: "¿Por qué 2:3?",
          a: "Es el aspect ratio recomendado de Pinterest para pines estándar en el grid.",
        },
        {
          q: "¿Se sube mi imagen?",
          a: "No. El preview se queda en tu navegador.",
        },
      ],
    },
  },
  {
    slug: "pinterest-pin-copy-length",
    category: "pinquill",
    relatedProductSlug: "pinquill",
    relatedProductUrl: "https://pinquill.com/en",
    relatedProductLabel: "PinQuill",
    processing: "local",
    accent: "#e60023",
    en: {
      name: "Pinterest pin copy length checker",
      title: "Pinterest Pin Title & Description Length Checker",
      description:
        "Count characters for Pinterest pin titles and descriptions with soft limits — free local checker for cleaner pins.",
      h1: "Pinterest pin copy length checker",
      intro:
        "Paste your pin title and description. Soft limits (~100 title / ~500 description) help you stay scannable without cutting SEO value — then polish the final pin in PinQuill.",
      benefit: "Stay inside practical Pinterest title and description length ranges.",
      howTo: [
        "Paste or type the pin title.",
        "Paste the description.",
        "Watch the counters turn amber/red as you approach soft limits.",
      ],
      whatItDoes: "Counts characters and flags soft length guidance for pin title and description fields.",
      whatItDoesNot: "It does not publish pins or rewrite copy with AI.",
      tips: [
        "Front-load keywords in the first ~40 characters of the title.",
        "Descriptions can be longer — lead with the hook, then detail.",
      ],
      faq: [
        {
          q: "Are these hard Pinterest limits?",
          a: "No. They are practical soft targets for readability and common editor guidance.",
        },
        {
          q: "Is copy stored?",
          a: "No. Everything stays in your browser session.",
        },
      ],
    },
    es: {
      name: "Checker de longitud de copy de pin",
      title: "Checker de título y descripción de pines Pinterest",
      description:
        "Cuenta caracteres de título y descripción de pines con límites blandos — checker local gratis.",
      h1: "Checker de longitud de copy de pin",
      intro:
        "Pega título y descripción del pin. Límites blandos (~100 título / ~500 descripción) ayudan a mantener el texto escaneable — luego afina el pin en PinQuill.",
      benefit: "Mantente en rangos prácticos de título y descripción en Pinterest.",
      howTo: [
        "Pega o escribe el título del pin.",
        "Pega la descripción.",
        "Mira los contadores pasar a ámbar/rojo al acercarte a los límites.",
      ],
      whatItDoes: "Cuenta caracteres y marca guía blanda de longitud para título y descripción.",
      whatItDoesNot: "No publica pines ni reescribe el copy con IA.",
      tips: [
        "Pon keywords al inicio (~40 caracteres) del título.",
        "La descripción puede ser más larga — ganchó primero, detalle después.",
      ],
      faq: [
        {
          q: "¿Son límites duros de Pinterest?",
          a: "No. Son objetivos prácticos de legibilidad y guía habitual de editores.",
        },
        {
          q: "¿Se guarda el texto?",
          a: "No. Todo queda en la sesión del navegador.",
        },
      ],
    },
  },
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
  regionalCourtTool({
    slug: "pickleball-courts-usa",
    countryEn: "USA",
    countryEs: "EE. UU.",
    h1En: "Pickleball courts in the USA",
    h1Es: "Pistas de pickleball en EE. UU.",
  }),
  regionalCourtTool({
    slug: "pickleball-courts-canada",
    countryEn: "Canada",
    countryEs: "Canadá",
    h1En: "Pickleball courts in Canada",
    h1Es: "Pistas de pickleball en Canadá",
  }),
  regionalCourtTool({
    slug: "pickleball-courts-australia",
    countryEn: "Australia",
    countryEs: "Australia",
    h1En: "Pickleball courts in Australia",
    h1Es: "Pistas de pickleball en Australia",
  }),
  regionalCourtTool({
    slug: "pickleball-courts-uk",
    countryEn: "the UK",
    countryEs: "el Reino Unido",
    h1En: "Pickleball courts in the UK",
    h1Es: "Pistas de pickleball en el Reino Unido",
  }),
  regionalCourtTool({
    slug: "pickleball-courts-spain",
    countryEn: "Spain",
    countryEs: "España",
    h1En: "Pickleball courts in Spain",
    h1Es: "Pistas de pickleball en España",
  }),
  {
    slug: "pickleball-court-dimensions",
    category: "pickleball",
    relatedProductSlug: "pickleball-deutsch",
    relatedProductUrl: "https://pickleballdeutch.com/",
    relatedProductLabel: "Pickleball Deutsch",
    processing: "local",
    accent: "#ffb020",
    en: {
      name: "Pickleball court dimensions converter",
      title: "Pickleball Court Dimensions — Feet to Meters Converter",
      description:
        "Convert official pickleball court sizes between feet and meters — full court, kitchen/NVZ, and net height. Free browser tool.",
      h1: "Pickleball court dimensions (ft ↔ m)",
      intro:
        "Official pickleball courts are 20 × 44 feet. Use this converter for builders, facility managers, and travelers switching between US imperial and metric measurements used in Spain, Australia, and much of Europe.",
      benefit: "Convert standard court, kitchen, and net measurements between feet and meters.",
      howTo: [
        "Review the standard layout values.",
        "Enter a custom length in feet or meters.",
        "Copy the converted result for plans or travel notes.",
      ],
      whatItDoes:
        "Shows standard USA Pickleball court dimensions and converts custom lengths between feet and meters.",
      whatItDoesNot:
        "It does not replace local building codes, facility certifications, or tournament referee rulings.",
      tips: [
        "Kitchen / non-volley zone is 7 feet from the net on each side.",
        "Net height is 36 in at sidelines and 34 in at center.",
      ],
      faq: [
        {
          q: "What is the official court size?",
          a: "20 feet wide by 44 feet long (6.10 m × 13.41 m) for both singles and doubles.",
        },
        {
          q: "Why convert to meters?",
          a: "Many facilities outside the US plan in metric — this avoids tape-measure mistakes.",
        },
      ],
    },
    es: {
      name: "Convertidor de medidas de pista",
      title: "Medidas de pista de pickleball — Pies a metros",
      description:
        "Convierte el tamaño oficial de pista de pickleball entre pies y metros — pista completa, kitchen/NVZ y altura de red. Gratis.",
      h1: "Medidas de pista de pickleball (ft ↔ m)",
      intro:
        "La pista oficial mide 20 × 44 pies. Usa este convertidor si construyes o viajas entre medidas imperiales (EE. UU.) y métricas (España, Australia, gran parte de Europa).",
      benefit: "Convierte pista, kitchen y red entre pies y metros.",
      howTo: [
        "Revisa los valores estándar.",
        "Introduce una longitud en pies o metros.",
        "Copia el resultado convertido.",
      ],
      whatItDoes:
        "Muestra medidas oficiales y convierte longitudes personalizadas entre pies y metros.",
      whatItDoesNot:
        "No sustituye normativas locales de construcción ni reglas de torneo.",
      tips: [
        "La kitchen / zona de no volea tiene 7 pies desde la red a cada lado.",
        "La red mide 36 in en laterales y 34 in en el centro.",
      ],
      faq: [
        {
          q: "¿Cuál es el tamaño oficial?",
          a: "20 pies de ancho por 44 de largo (6,10 m × 13,41 m) en individuales y dobles.",
        },
        {
          q: "¿Por qué convertir a metros?",
          a: "Fuera de EE. UU. muchas instalaciones planifican en métrico — evita errores de medición.",
        },
      ],
    },
  },
  ...spainLifeTools,
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
