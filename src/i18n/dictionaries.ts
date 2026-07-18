import type { Locale } from "./config";

const en = {
  meta: {
    title: "Suleman Hussain — Founder World · Always Building",
    description:
      "Enter Founder World — software, AI products, SaaS systems, and digital businesses from a founder who is always building something.",
  },
  nav: {
    now: "NOW",
    products: "PRODUCTS",
    buildLog: "BUILD LOG",
    expertise: "EXPERTISE",
    about: "ABOUT",
    letsBuild: "LET'S BUILD",
    menu: "MENU",
    close: "CLOSE",
  },
  hero: {
    role: "FOUNDER / BUILDER / EXPERIMENTER",
    tagline: "I am always building something.",
    support: "Software, AI products, SaaS systems, automation, and digital businesses.",
    ctaExplore: "Explore what I'm building",
    ctaThink: "See how I think",
    liveNow: "LIVE NOW",
    moreSoon: "More coming soon",
  },
  now: {
    eyebrow: "RIGHT NOW",
    title: "Live products.",
    blurb:
      "Multilingual and live — DownitX, PinQuill, Wasup, Pickleball Deutsch, and Spain Eats. Everything else is coming soon.",
    open: "Open →",
  },
  products: {
    eyebrow: "PRODUCT WORLD",
    title: "Destinations inside the workshop.",
    blurb: "Five live products with real screenshots. The rest are coming soon from the same workshop.",
    pageTitle: "Product World",
    pageBlurb:
      "Destinations inside Founder World. Select a product to explore identity, status, and build context — then enter the full experience.",
    openLive: "Open live product",
    enter: "Enter",
    multilingual: "MULTILINGUAL",
    back: "← Product World",
    comingSoon: "COMING SOON FROM THE WORKSHOP",
    problem: "Problem",
    why: "Why it exists",
    built: "What was built",
    happening: "Happening now:",
    how: "How it works",
    tech: "Technology / build details",
    status: "CURRENT STATUS",
    liveStatus: "Live · multilingual product",
    related: "Related projects",
    talk: "Talk about this product",
  },
  think: {
    eyebrow: "HOW I THINK",
    title: "I see problems everywhere. Then I build solutions.",
    blurb:
      "Not a consulting funnel. A founder loop — from friction to product to users to growth — with real examples from the workshop.",
    see: "See",
  },
  advantage: {
    eyebrow: "UNFAIR ADVANTAGE",
    title: "My advantage is the overlap.",
    blurb:
      "I can understand the problem, design the product, build the system, connect the AI, launch it, and think about how it grows.",
    tied: "TIED TO PRODUCTS",
    explore: "Explore all ecosystems →",
  },
  archive: {
    eyebrow: "SHIPPED ARCHIVE",
    title: "What I have shipped.",
    full: "Full archive →",
  },
  buildLog: {
    eyebrow: "BUILD LOG",
    title: "Shipping notes from inside the workshop.",
    open: "Open build log →",
    insightsHint: "Longer thinking lives in",
    insights: "Insights",
    pageTitle: "Shipping in public",
    pageBlurb: "Not a generic blog. Notes from the workshop — building, failing, shipping, learning.",
    back: "← Build Log",
  },
  future: {
    eyebrow: "WHAT'S NEXT",
    title: "What I'm building next is the interesting part.",
    follow: "Follow the build",
    build: "Let's build something",
  },
  footer: {
    blurb: "Founder building software, AI products, and digital businesses.",
    explore: "EXPLORE",
    capabilities: "CAPABILITIES",
    connect: "CONNECT",
    products: "Products",
    buildLog: "Build Log",
    projects: "Projects",
    insights: "Insights",
    software: "Software",
    ai: "AI & Automation",
    growth: "Growth",
    product: "Product",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
  },
  about: {
    eyebrow: "ABOUT",
    title: "Who I am",
    who: "I'm Suleman Hussain — a multidisciplinary founder and product builder. I am not presenting a finished career. I am actively building.",
    whatTitle: "What I build",
    what:
      "SaaS products, AI systems, software, web applications, automation, growth systems, and digital businesses — across the full journey from problem to users.",
    thinkTitle: "How I think",
    p1: "Build fast.",
    p2: "Solve real problems.",
    p3: "Automate what should not be manual.",
    p4: "Learn by shipping.",
    evolution: "Evolution",
    shipped: "What I have shipped",
    focused: "Focused on now",
    next: "What I want to build next",
    cta: "Let's build",
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Let's build",
    blurb: "Tell me why you're here. The form adapts — so the conversation starts in the right place.",
  },
  expertise: {
    eyebrow: "EXPERTISE",
    title: "Not a skill dump. An overlap system.",
    blurb: "Capabilities that connect — so the journey from problem to product to growth stays in one head.",
    ecosystems: "ECOSYSTEMS",
  },
  projects: {
    eyebrow: "PROJECTS",
    title: "Shipped archive",
    blurb: "SaaS, AI, web, automation, experiments, client work, and tools — a timeline of progress, not a card dump.",
  },
  insights: {
    eyebrow: "INSIGHTS",
    title: "Thinking, structured",
    blurb: "Longer-form founder thinking. For shipping notes, see the",
    buildLog: "Build Log",
    back: "← Insights",
    related: "RELATED",
    explore: "Explore the Product Universe →",
  },
  lang: {
    en: "EN",
    es: "ES",
    label: "Language",
  },
} as const;

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Dictionary = DeepStringify<typeof en>;

const es: Dictionary = {
  meta: {
    title: "Suleman Hussain — Founder World · Siempre construyendo",
    description:
      "Entra en Founder World — software, productos de IA, sistemas SaaS y negocios digitales de un founder que siempre está construyendo.",
  },
  nav: {
    now: "AHORA",
    products: "PRODUCTOS",
    buildLog: "BUILD LOG",
    expertise: "EXPERTISE",
    about: "SOBRE MÍ",
    letsBuild: "CONSTRUYAMOS",
    menu: "MENÚ",
    close: "CERRAR",
  },
  hero: {
    role: "FOUNDER / BUILDER / EXPERIMENTER",
    tagline: "Siempre estoy construyendo algo.",
    support: "Software, productos de IA, sistemas SaaS, automatización y negocios digitales.",
    ctaExplore: "Explora lo que construyo",
    ctaThink: "Mira cómo pienso",
    liveNow: "EN VIVO",
    moreSoon: "Más próximamente",
  },
  now: {
    eyebrow: "AHORA MISMO",
    title: "Productos en vivo.",
    blurb:
      "Multilingües y en vivo — DownitX, PinQuill, Wasup, Pickleball Deutsch y Spain Eats. Todo lo demás llega pronto.",
    open: "Abrir →",
  },
  products: {
    eyebrow: "PRODUCT WORLD",
    title: "Destinos dentro del taller.",
    blurb: "Cinco productos en vivo con capturas reales. El resto llega pronto desde el mismo taller.",
    pageTitle: "Product World",
    pageBlurb:
      "Destinos dentro de Founder World. Elige un producto para explorar identidad, estado y contexto — y entra en la experiencia completa.",
    openLive: "Abrir producto en vivo",
    enter: "Entrar a",
    multilingual: "MULTILINGÜE",
    back: "← Product World",
    comingSoon: "PRÓXIMAMENTE DESDE EL TALLER",
    problem: "Problema",
    why: "Por qué existe",
    built: "Qué se construyó",
    happening: "Ahora mismo:",
    how: "Cómo funciona",
    tech: "Tecnología / detalles de build",
    status: "ESTADO ACTUAL",
    liveStatus: "En vivo · producto multilingüe",
    related: "Proyectos relacionados",
    talk: "Hablar de este producto",
  },
  think: {
    eyebrow: "CÓMO PIENSO",
    title: "Veo problemas en todas partes. Luego construyo soluciones.",
    blurb:
      "No es un embudo de consultoría. Es un bucle de founder — de la fricción al producto, a usuarios y crecimiento — con ejemplos reales del taller.",
    see: "Ver",
  },
  advantage: {
    eyebrow: "VENTAJA INJUSTA",
    title: "Mi ventaja es el solapamiento.",
    blurb:
      "Puedo entender el problema, diseñar el producto, construir el sistema, conectar la IA, lanzarlo y pensar cómo crece.",
    tied: "LIGADO A PRODUCTOS",
    explore: "Explorar todos los ecosistemas →",
  },
  archive: {
    eyebrow: "ARCHIVO ENVIADO",
    title: "Lo que he lanzado.",
    full: "Archivo completo →",
  },
  buildLog: {
    eyebrow: "BUILD LOG",
    title: "Notas de envío desde el taller.",
    open: "Abrir build log →",
    insightsHint: "El pensamiento largo vive en",
    insights: "Insights",
    pageTitle: "Construyendo en público",
    pageBlurb: "No es un blog genérico. Notas del taller — construir, fallar, lanzar, aprender.",
    back: "← Build Log",
  },
  future: {
    eyebrow: "LO QUE VIENE",
    title: "Lo que construyo después es lo interesante.",
    follow: "Seguir el build",
    build: "Construyamos algo",
  },
  footer: {
    blurb: "Founder construyendo software, productos de IA y negocios digitales.",
    explore: "EXPLORAR",
    capabilities: "CAPACIDADES",
    connect: "CONECTAR",
    products: "Productos",
    buildLog: "Build Log",
    projects: "Proyectos",
    insights: "Insights",
    software: "Software",
    ai: "IA y Automatización",
    growth: "Crecimiento",
    product: "Producto",
    contact: "Contacto",
    privacy: "Privacidad",
    terms: "Términos",
  },
  about: {
    eyebrow: "SOBRE MÍ",
    title: "Quién soy",
    who: "Soy Suleman Hussain — founder multidisciplinar y product builder. No presento una carrera terminada. Estoy construyendo activamente.",
    whatTitle: "Qué construyo",
    what:
      "Productos SaaS, sistemas de IA, software, aplicaciones web, automatización, sistemas de crecimiento y negocios digitales — en todo el viaje del problema al usuario.",
    thinkTitle: "Cómo pienso",
    p1: "Construir rápido.",
    p2: "Resolver problemas reales.",
    p3: "Automatizar lo que no debería ser manual.",
    p4: "Aprender lanzando.",
    evolution: "Evolución",
    shipped: "Lo que he lanzado",
    focused: "Enfoque ahora",
    next: "Qué quiero construir después",
    cta: "Construyamos",
  },
  contact: {
    eyebrow: "CONTACTO",
    title: "Construyamos",
    blurb: "Dime por qué estás aquí. El formulario se adapta — para que la conversación empiece en el lugar correcto.",
  },
  expertise: {
    eyebrow: "EXPERTISE",
    title: "No es una lista de skills. Es un sistema de solapamiento.",
    blurb: "Capacidades que se conectan — para que el viaje del problema al producto al crecimiento viva en una sola cabeza.",
    ecosystems: "ECOSISTEMAS",
  },
  projects: {
    eyebrow: "PROYECTOS",
    title: "Archivo enviado",
    blurb: "SaaS, IA, web, automatización, experimentos, clientes y herramientas — una línea de tiempo de progreso, no un dump de cards.",
  },
  insights: {
    eyebrow: "INSIGHTS",
    title: "Pensamiento, estructurado",
    blurb: "Pensamiento de founder en formato largo. Para notas de envío, mira el",
    buildLog: "Build Log",
    back: "← Insights",
    related: "RELACIONADO",
    explore: "Explorar el Product Universe →",
  },
  lang: {
    en: "EN",
    es: "ES",
    label: "Idioma",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
