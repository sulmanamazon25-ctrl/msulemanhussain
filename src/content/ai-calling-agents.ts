import type { ComparisonFaq } from "@/types/comparison";

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type AiCallingAgentsLocaleCopy = {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; intro: string; badges: string[] };
  card: { title: string; blurb: string };
  what: { heading: string; paragraphs: string[] };
  why: { heading: string; paragraphs: string[]; bullets: string[] };
  how: { heading: string; intro: string; steps: { title: string; description: string }[] };
  pricing: { heading: string; intro: string; tiers: PricingTier[]; disclaimer: string };
  useCases: { heading: string; intro: string; items: { title: string; description: string }[] };
  whyUs: { heading: string; intro: string; reasons: { title: string; description: string }[] };
  faq: ComparisonFaq[];
  cta: { heading: string; body: string; buttonLabel: string; badge: string };
};

export type AiCallingAgentsDoc = {
  slug: string;
  accent: string;
  en: AiCallingAgentsLocaleCopy;
  es: AiCallingAgentsLocaleCopy;
};

export const aiCallingAgents: AiCallingAgentsDoc = {
  slug: "ai-calling-agents",
  accent: "#3d8bff",
  en: {
    meta: {
      title: "AI Calling Agents by Suleman Hussain — Low-Cost Voice AI for Any Business",
      description:
        "Custom AI calling agents that answer, qualify, and book calls 24/7 — built and run by one founder, priced for small businesses and scaled for large ones.",
    },
    hero: {
      eyebrow: "AI CALLING AGENTS",
      h1: "AI Calling Agents That Actually Answer the Phone — Built for Small Budgets and Big Operations",
      intro:
        "Every missed call is a missed booking, a missed sale, or a customer who just called your competitor instead. I build AI calling agents — real voice agents that pick up the phone, understand what a caller needs, and either solve it or route it to a human — for businesses that can't justify a full call center and for larger teams that need one more automated line without more headcount. No call center. No script that breaks the moment someone asks something unexpected. Just a voice agent trained on your business, running on infrastructure I build and maintain myself.",
      badges: [
        "Inbound + outbound calling",
        "English & Spanish out of the box",
        "Live in 2-3 weeks",
        "Founder-built, not agency-built",
      ],
    },
    card: {
      title: "AI Calling Agents",
      blurb: "Voice agents that answer, qualify, and book calls 24/7 — priced for small teams, built to scale for large ones.",
    },
    what: {
      heading: "What an AI calling agent actually is",
      paragraphs: [
        "An AI calling agent is software that answers or makes phone calls the same way a trained employee would — it listens, understands intent, responds in natural speech, and takes action inside your existing tools. Under the hood it's three systems working together in real time: speech-to-text that transcribes the caller as they talk, a language model that decides what to say and do next, and text-to-speech that turns the decision back into a natural-sounding voice, all stitched to a phone line through a telephony provider like Twilio.",
        "That's a different animal from the chatbot widget on your website. A chatbot waits for someone to type. A calling agent has to handle interruptions, background noise, people who say \"um\" for three seconds, accents, and the fact that a phone call has no undo button — if the agent hesitates for two seconds, the caller notices. Getting that timing right, and getting the agent to sound like it's actually listening rather than reading a script, is most of the engineering work.",
        "What makes it useful isn't the voice — it's what happens after the call. A well-built agent checks your calendar before offering a slot, looks up an order in your CRM before promising a refund, and knows when a question is too sensitive or too unusual to answer alone, so it hands off to a human with full context instead of making the caller repeat themselves. That's the bar I build to: an agent that does real work, not one that just sounds impressive in a demo.",
        "Inbound and outbound are both in scope. Inbound covers the calls that come to you — booking, support, quotes, order status. Outbound covers the calls you want made for you — appointment reminders, lead follow-ups, no-show recovery — with clear opt-out and escalation rules so the agent never feels like a robocaller. Same stack, different flow design, always under your control.",
      ],
    },
    why: {
      heading: "Why this matters for your business right now",
      paragraphs: [
        "Phones still run a huge share of real business — bookings, quotes, support, orders — and most small and mid-sized businesses can't staff a phone line the way a call center can. One person answering calls also has to run the counter, manage the schedule, or close the shop at 6pm. Every call that comes in after that, or during lunch, or while they're already on another line, goes to voicemail — and most callers don't leave one, they just call the next business on the list.",
        "Larger businesses have the opposite problem: enough call volume that adding one more automated line is worth doing, but not enough appetite to rebuild their whole phone system or lock into a huge enterprise voice AI contract with a six-month onboarding. What both groups actually need is the same thing — a calling agent that plugs into what they already use, costs less than one part-time hire, and can be adjusted in days instead of quarters.",
        "That's the gap this service is built for. I'm not selling a platform with a self-serve dashboard you have to configure yourself, and I'm not selling an enterprise contract with a sales team in the middle. I design, build, and run the agent for you, in English and Spanish from day one, so it can serve customers most agencies would treat as an afterthought.",
        "Speed of first response also compounds. A lead who called you five minutes ago is still deciding; a lead who hit voicemail yesterday already booked elsewhere. An agent that picks up on the first ring — or calls back within a minute when your team is busy — closes that gap without asking you to hire overnight coverage.",
      ],
      bullets: [
        "Calls answered instantly, 24/7 or during set hours — your choice",
        "No more voicemail black hole for after-hours or overflow calls",
        "Consistent script and tone on every single call, no bad days",
        "Bilingual coverage (English/Spanish) without hiring bilingual staff",
        "Frees your team from repetitive calls to focus on the calls that need a human",
        "Every call logged and summarized, so nothing gets lost in memory",
      ],
    },
    how: {
      heading: "How we go from first call to a live agent",
      intro:
        "This isn't a plug-and-play widget you configure alone. I run the whole build, end to end, and you stay in control of what the agent says and does.",
      steps: [
        {
          title: "Discovery call (30-45 min)",
          description:
            "We map every call type your business gets — bookings, quotes, support, order status — and decide what the agent should handle alone versus hand off to a human.",
        },
        {
          title: "Script and flow design",
          description:
            "I write the actual conversation flow: how the agent opens, how it handles the five most common questions, and exactly when it escalates. You review and edit it before anything goes live.",
        },
        {
          title: "Integration",
          description:
            "I connect the agent to your phone number, calendar, CRM, or booking system so it can check availability, pull order info, or log a lead — not just talk, but actually act.",
        },
        {
          title: "Testing and QA",
          description:
            "I run real test calls, including deliberately awkward ones, to find where the agent breaks before a real customer does.",
        },
        {
          title: "Go live",
          description:
            "The agent starts taking real calls, either alongside your existing line as overflow or as the primary line — you decide the rollout.",
        },
        {
          title: "Monitoring and iteration",
          description:
            "I review call transcripts and outcomes weekly in the first month, then monthly after that, and tune the flow as real callers ask things the first draft didn't anticipate.",
        },
      ],
    },
    pricing: {
      heading: "Pricing built for small teams and large ones",
      intro:
        "Every business's call volume and integrations are different, so these are starting points, not a rigid menu — think of them as where most projects land, not a hard ceiling. The full quote depends on how many calls a month you expect and what systems the agent needs to talk to.",
      tiers: [
        {
          name: "Starter",
          price: "$149",
          period: "/mo + setup",
          description: "For solo operators and small businesses with one core call type to automate.",
          features: [
            "One phone line, one call flow",
            "Up to ~300 handled calls/month",
            "Business-hours or 24/7 coverage",
            "Calendar or CRM integration (one)",
            "Monthly call summary report",
          ],
        },
        {
          name: "Growth",
          price: "$349",
          period: "/mo + setup",
          description: "For businesses handling multiple call types across more volume.",
          features: [
            "Up to 3 call flows (bookings, support, sales)",
            "Up to ~1,200 handled calls/month",
            "Bilingual English/Spanish flows",
            "CRM + calendar + booking integrations",
            "Priority tuning after go-live",
            "Weekly call analytics",
          ],
          highlighted: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          period: "quote",
          description: "For larger operations with multiple locations or lines.",
          features: [
            "Multiple phone lines / locations",
            "Custom call volume and SLAs",
            "Deep integrations (CRM, ERP, internal tools)",
            "Dedicated monitoring and support",
            "Custom voice and brand persona",
          ],
        },
      ],
      disclaimer:
        "Prices above are indicative starting points based on typical setups; your actual quote depends on call volume, number of integrations, and whether you need custom voice work. Ask for a quote after the discovery call — no obligation.",
    },
    useCases: {
      heading: "Where this fits — by industry",
      intro: "Every business with a phone line and repeat questions is a candidate. A few that fit especially well:",
      items: [
        {
          title: "Real estate & property management",
          description: "Qualify leads, answer listing questions, and schedule viewings without a receptionist glued to the phone.",
        },
        {
          title: "Clinics, dental, and appointment-based services",
          description: "Handle booking, rescheduling, and reminder calls, and route anything medical or urgent straight to a human.",
        },
        {
          title: "E-commerce & order support",
          description: "Answer \"where's my order\" and return-policy calls automatically, and hand off refunds or disputes.",
        },
        {
          title: "Home services (plumbing, HVAC, cleaning)",
          description: "Capture every after-hours emergency call instead of losing it to a competitor who answers first.",
        },
        {
          title: "Restaurants & reservations",
          description: "Take reservations and answer hours/menu questions during your busiest, loudest hours.",
        },
        {
          title: "Agencies & multi-location businesses",
          description: "Standardize how every location answers the phone, without training every front desk the same way.",
        },
      ],
    },
    whyUs: {
      heading: "Why work with me instead of an agency",
      intro:
        "There's no account manager, no offshore team, and no hand-off between the person who sold you the project and the person who builds it. It's one builder, end to end.",
      reasons: [
        {
          title: "I build the AI, not just configure it",
          description:
            "This isn't reselling a no-code voice platform. I design the conversation logic, wire the integrations, and can change anything about how the agent behaves — most agencies can't go past what their platform's dashboard allows.",
        },
        {
          title: "Proven on real voice AI, not just theory",
          description:
            "This service comes out of Voice Agent Lab, my own realtime voice experiments — testing latency, speech-to-text accuracy, and tool-calling reliability before offering it as a service, not learning on your project.",
        },
        {
          title: "Bilingual by default",
          description:
            "English and Spanish aren't an add-on tier here — the agent is built to handle both from the start, which matters if any share of your callers are more comfortable in Spanish.",
        },
        {
          title: "Priced for the business that isn't a call center",
          description:
            "Pricing starts where a small business can actually justify it, not where an enterprise voice AI platform starts its sales conversation.",
        },
        {
          title: "You can reach the person who built it",
          description:
            "If something needs to change — a new question type, a new integration, a tone adjustment — you tell me directly, and I ship the change, not a support ticket that routes through three people.",
        },
      ],
    },
    faq: [
      {
        q: "How much does an AI calling agent cost?",
        a: "Most projects start around $149/mo plus a one-time setup fee for a single call flow, scaling up based on call volume and integrations — see the pricing section above for the three typical tiers. You get an exact number after the discovery call, based on your actual call types and volume.",
      },
      {
        q: "How long does it take to go live?",
        a: "Most single-flow projects go from discovery call to live agent in 2-3 weeks. Multi-flow or deeply integrated projects (multiple systems, custom voice) typically take 4-6 weeks.",
      },
      {
        q: "Can it handle calls in both English and Spanish?",
        a: "Yes — bilingual English/Spanish handling is built in from the Starter tier, not an add-on. The agent detects the caller's language and responds naturally in it.",
      },
      {
        q: "What happens if the agent doesn't know how to answer something?",
        a: "It hands off to a human with full context — what the caller asked, what's already been discussed — instead of guessing or looping the caller. You decide exactly which situations trigger a handoff during the design phase.",
      },
      {
        q: "Can it work with my existing phone number and CRM?",
        a: "In most cases, yes. The agent connects to your existing phone number through the telephony provider, and integrates with common CRMs, calendars, and booking tools. If your setup is unusual, we cover it in the discovery call before any commitment.",
      },
      {
        q: "Is my customer data safe?",
        a: "Calls are processed through the same kind of infrastructure enterprise voice platforms use, and I don't store more than what's needed to run the agent and report on call outcomes. If you have specific compliance requirements, tell me during discovery and I'll confirm what's feasible before we start.",
      },
      {
        q: "Is there a long-term contract?",
        a: "No lock-in beyond the setup itself. You pay for the build once and a monthly fee to keep the agent running and monitored; you can pause or stop at any point.",
      },
      {
        q: "What if I only need this for overflow calls, not every call?",
        a: "That's a common setup — the agent only picks up when your line is busy, after hours, or when nobody answers within a set number of rings, so it works alongside your existing team rather than replacing them.",
      },
    ],
    cta: {
      heading: "Stop losing calls to voicemail",
      body: "Tell me what your business needs a phone to do, and I'll tell you honestly whether an AI calling agent is worth building for it — no generic pitch, no pressure.",
      buttonLabel: "Book a discovery call",
      badge: "Reply within 1 business day",
    },
  },
  es: {
    meta: {
      title: "Agentes de IA para Llamadas — Suleman Hussain — Bajo Costo para Cualquier Negocio",
      description:
        "Agentes de IA que contestan, califican y agendan llamadas 24/7 — construidos y mantenidos por un solo desarrollador, con precios accesibles para pequeños negocios y escalables para grandes empresas.",
    },
    hero: {
      eyebrow: "AGENTES DE IA PARA LLAMADAS",
      h1: "Agentes de IA que Sí Contestan el Teléfono — Para Presupuestos Pequeños y Operaciones Grandes",
      intro:
        "Cada llamada perdida es una cita perdida, una venta perdida o un cliente que acaba de llamar a tu competencia. Construyo agentes de IA para llamadas — agentes de voz reales que contestan el teléfono, entienden lo que necesita quien llama, y resuelven la solicitud o la derivan a una persona — para negocios que no pueden justificar un call center completo, y para equipos más grandes que necesitan una línea automatizada más sin contratar más personal. Sin call center. Sin un guion que se rompe en cuanto alguien pregunta algo inesperado. Solo un agente de voz entrenado en tu negocio, sobre infraestructura que construyo y mantengo yo mismo.",
      badges: [
        "Llamadas entrantes y salientes",
        "Inglés y español desde el inicio",
        "En marcha en 2-3 semanas",
        "Construido por el fundador, no por una agencia",
      ],
    },
    card: {
      title: "Agentes de IA para Llamadas",
      blurb: "Agentes de voz que contestan, califican y agendan llamadas 24/7 — con precios para equipos pequeños y listos para escalar en grandes empresas.",
    },
    what: {
      heading: "Qué es realmente un agente de IA para llamadas",
      paragraphs: [
        "Un agente de IA para llamadas es software que contesta o realiza llamadas de la misma forma que lo haría un empleado capacitado: escucha, entiende la intención, responde con voz natural y actúa dentro de tus herramientas actuales. Detrás de eso hay tres sistemas trabajando juntos en tiempo real: reconocimiento de voz que transcribe lo que dice quien llama, un modelo de lenguaje que decide qué decir y qué hacer, y síntesis de voz que convierte esa decisión en una voz natural, todo conectado a una línea telefónica a través de un proveedor como Twilio.",
        "Eso es muy distinto a un chatbot de sitio web. Un chatbot espera a que alguien escriba. Un agente de llamadas tiene que manejar interrupciones, ruido de fondo, personas que dudan varios segundos, acentos, y el hecho de que una llamada no tiene botón de deshacer: si el agente tarda dos segundos en responder, quien llama lo nota de inmediato. Lograr ese tiempo de respuesta correcto, y que el agente suene como que realmente está escuchando y no leyendo un guion, es la mayor parte del trabajo de ingeniería.",
        "Lo útil no es la voz — es lo que pasa después de la llamada. Un buen agente revisa tu calendario antes de ofrecer un horario, consulta un pedido en tu CRM antes de prometer un reembolso, y sabe cuándo una pregunta es demasiado delicada o inusual para resolverla solo, así que la deriva a una persona con todo el contexto, sin que quien llama tenga que repetir todo. Ese es el estándar con el que construyo: un agente que hace trabajo real, no uno que solo suena impresionante en una demo.",
        "Tanto las llamadas entrantes como las salientes están dentro del alcance. Las entrantes cubren las que llegan a ti — reservas, soporte, cotizaciones, estado de pedido. Las salientes cubren las que quieres que se hagan por ti — recordatorios de cita, seguimiento de leads, recuperación de no-shows — con reglas claras de opt-out y escalado para que el agente nunca se sienta como un robot de telemarketing. Misma infraestructura, distinto diseño de flujo, siempre bajo tu control.",
      ],
    },
    why: {
      heading: "Por qué esto importa para tu negocio ahora mismo",
      paragraphs: [
        "El teléfono todavía maneja una parte enorme del negocio real — reservas, cotizaciones, soporte, pedidos — y la mayoría de las PYMEs no pueden mantener una línea telefónica atendida como lo haría un call center. La misma persona que contesta llamadas también atiende el mostrador, gestiona la agenda o cierra el local a las 6pm. Cada llamada que llega después de eso, o durante el almuerzo, o mientras ya está en otra línea, cae en el buzón de voz — y la mayoría de quienes llaman no dejan mensaje, simplemente llaman al siguiente negocio de la lista.",
        "Las empresas más grandes tienen el problema contrario: suficiente volumen de llamadas como para justificar una línea automatizada más, pero sin ganas de rehacer todo su sistema telefónico ni firmar un contrato enterprise de IA de voz con seis meses de implementación. Lo que ambos grupos necesitan en realidad es lo mismo: un agente de llamadas que se conecte con lo que ya usan, que cueste menos que contratar a media persona, y que se pueda ajustar en días, no en trimestres.",
        "Para ese vacío existe este servicio. No vendo una plataforma con un panel de autoservicio que tienes que configurar tú mismo, ni un contrato enterprise con un equipo de ventas de por medio. Yo diseño, construyo y opero el agente por ti, en inglés y español desde el primer día, para que pueda atender a clientes que la mayoría de agencias tratarían como algo secundario.",
        "La velocidad de la primera respuesta también suma. Un lead que te llamó hace cinco minutos todavía está decidiendo; uno que cayó en el buzón de voz ayer ya reservó en otro sitio. Un agente que contesta al primer timbre — o que devuelve la llamada en un minuto cuando tu equipo está ocupado — cierra ese hueco sin pedirte que contrates cobertura nocturna.",
      ],
      bullets: [
        "Llamadas contestadas al instante, 24/7 o en el horario que elijas",
        "Se acaba el agujero negro del buzón de voz fuera de horario o en horas pico",
        "El mismo tono y guion en cada llamada, sin días malos",
        "Cobertura bilingüe (inglés/español) sin contratar personal bilingüe",
        "Libera a tu equipo de llamadas repetitivas para enfocarse en las que sí necesitan una persona",
        "Cada llamada queda registrada y resumida, así nada se pierde en la memoria de alguien",
      ],
    },
    how: {
      heading: "Cómo pasamos de la primera llamada a un agente en producción",
      intro:
        "Esto no es un widget que configuras solo. Yo llevo toda la construcción de principio a fin, y tú mantienes el control de lo que el agente dice y hace.",
      steps: [
        {
          title: "Llamada de descubrimiento (30-45 min)",
          description:
            "Mapeamos todos los tipos de llamada que recibe tu negocio — reservas, cotizaciones, soporte, estado de pedidos — y decidimos qué maneja el agente solo y qué se deriva a una persona.",
        },
        {
          title: "Diseño del guion y del flujo",
          description:
            "Escribo el flujo real de la conversación: cómo abre el agente, cómo maneja las cinco preguntas más comunes, y en qué momento exacto escala a una persona. Tú revisas y editas antes de que nada salga en vivo.",
        },
        {
          title: "Integración",
          description:
            "Conecto el agente a tu número de teléfono, calendario, CRM o sistema de reservas para que pueda revisar disponibilidad, consultar un pedido o registrar un lead — no solo hablar, sino actuar.",
        },
        {
          title: "Pruebas y control de calidad",
          description:
            "Hago llamadas de prueba reales, incluyendo algunas deliberadamente incómodas, para encontrar dónde falla el agente antes de que lo note un cliente real.",
        },
        {
          title: "Puesta en marcha",
          description:
            "El agente empieza a tomar llamadas reales, ya sea como respaldo junto a tu línea actual o como línea principal — tú decides cómo se lanza.",
        },
        {
          title: "Monitoreo y ajustes",
          description:
            "Reviso transcripciones y resultados de llamadas cada semana durante el primer mes, y luego cada mes, ajustando el flujo según lo que preguntan las personas reales que la primera versión no contempló.",
        },
      ],
    },
    pricing: {
      heading: "Precios pensados para equipos pequeños y grandes",
      intro:
        "El volumen de llamadas y las integraciones varían en cada negocio, así que estos son puntos de partida, no un menú rígido — piénsalos como donde suele caer la mayoría de los proyectos, no como un techo fijo. La cotización final depende de cuántas llamadas esperas al mes y con qué sistemas debe conectarse el agente.",
      tiers: [
        {
          name: "Starter",
          price: "$149",
          period: "/mes + configuración",
          description: "Para negocios pequeños o independientes con un tipo de llamada principal para automatizar.",
          features: [
            "Una línea telefónica, un flujo de llamada",
            "Hasta ~300 llamadas atendidas al mes",
            "Cobertura en horario comercial o 24/7",
            "Una integración (calendario o CRM)",
            "Reporte mensual de llamadas",
          ],
        },
        {
          name: "Growth",
          price: "$349",
          period: "/mes + configuración",
          description: "Para negocios que manejan varios tipos de llamada con más volumen.",
          features: [
            "Hasta 3 flujos de llamada (reservas, soporte, ventas)",
            "Hasta ~1,200 llamadas atendidas al mes",
            "Flujos bilingües inglés/español",
            "Integraciones de CRM, calendario y reservas",
            "Ajustes prioritarios tras el lanzamiento",
            "Analítica semanal de llamadas",
          ],
          highlighted: true,
        },
        {
          name: "Enterprise",
          price: "Personalizado",
          period: "cotización",
          description: "Para operaciones más grandes con varias sucursales o líneas.",
          features: [
            "Múltiples líneas telefónicas / sucursales",
            "Volumen y SLA a medida",
            "Integraciones profundas (CRM, ERP, herramientas internas)",
            "Monitoreo y soporte dedicado",
            "Voz y personalidad de marca a medida",
          ],
        },
      ],
      disclaimer:
        "Los precios anteriores son puntos de partida orientativos según configuraciones típicas; tu cotización real depende del volumen de llamadas, el número de integraciones y si necesitas una voz personalizada. Pide tu cotización después de la llamada de descubrimiento — sin compromiso.",
    },
    useCases: {
      heading: "Dónde encaja esto — por industria",
      intro: "Cualquier negocio con una línea telefónica y preguntas repetidas es candidato. Algunos que encajan especialmente bien:",
      items: [
        {
          title: "Inmobiliarias y administración de propiedades",
          description: "Califica leads, responde preguntas sobre propiedades y agenda visitas sin tener a alguien pegado al teléfono.",
        },
        {
          title: "Clínicas, dentistas y servicios con cita previa",
          description: "Gestiona reservas, cambios de horario y recordatorios, y deriva de inmediato cualquier caso médico o urgente a una persona.",
        },
        {
          title: "E-commerce y soporte de pedidos",
          description: "Responde automáticamente \"¿dónde está mi pedido?\" y preguntas de devoluciones, y deriva reembolsos o disputas.",
        },
        {
          title: "Servicios a domicilio (plomería, climatización, limpieza)",
          description: "Captura cada llamada de emergencia fuera de horario en vez de perderla frente a un competidor que contesta primero.",
        },
        {
          title: "Restaurantes y reservas",
          description: "Toma reservas y responde preguntas de horario o menú en tus horas más ocupadas y ruidosas.",
        },
        {
          title: "Agencias y negocios con varias sucursales",
          description: "Estandariza cómo contesta el teléfono cada sucursal, sin tener que capacitar a cada recepción por igual.",
        },
      ],
    },
    whyUs: {
      heading: "Por qué trabajar conmigo y no con una agencia",
      intro:
        "No hay account manager, ni equipo offshore, ni una entrega entre quien te vendió el proyecto y quien lo construye. Es un solo desarrollador, de principio a fin.",
      reasons: [
        {
          title: "Construyo la IA, no solo la configuro",
          description:
            "Esto no es revender una plataforma de voz sin código. Diseño la lógica de conversación, conecto las integraciones y puedo cambiar cualquier comportamiento del agente — la mayoría de agencias no pueden ir más allá de lo que permite el panel de su plataforma.",
        },
        {
          title: "Probado en IA de voz real, no solo en teoría",
          description:
            "Este servicio nace de Voice Agent Lab, mis propios experimentos de voz en tiempo real — probando latencia, precisión de reconocimiento de voz y confiabilidad de llamadas a herramientas antes de ofrecerlo como servicio, no aprendiendo sobre tu proyecto.",
        },
        {
          title: "Bilingüe por defecto",
          description:
            "Inglés y español no son un plan superior aquí — el agente se construye para manejar ambos desde el inicio, algo clave si parte de tus clientes se sienten más cómodos hablando en español.",
        },
        {
          title: "Precios pensados para el negocio que no es un call center",
          description:
            "Los precios empiezan donde un negocio pequeño realmente puede justificarlos, no donde arranca la conversación de ventas de una plataforma enterprise de IA de voz.",
        },
        {
          title: "Hablas directo con quien lo construyó",
          description:
            "Si algo necesita cambiar — un nuevo tipo de pregunta, una nueva integración, un ajuste de tono — me lo dices directamente y yo hago el cambio, no un ticket de soporte que pasa por tres personas.",
        },
      ],
    },
    faq: [
      {
        q: "¿Cuánto cuesta un agente de IA para llamadas?",
        a: "La mayoría de proyectos empiezan alrededor de $149/mes más una configuración inicial única para un flujo de llamada, y escalan según el volumen de llamadas y las integraciones — revisa los tres planes típicos en la sección de precios. Recibes un número exacto después de la llamada de descubrimiento, según tus tipos de llamada reales y su volumen.",
      },
      {
        q: "¿Cuánto tarda en estar en marcha?",
        a: "La mayoría de proyectos de un solo flujo pasan de la llamada de descubrimiento a un agente en producción en 2-3 semanas. Los proyectos con varios flujos o integraciones profundas (varios sistemas, voz personalizada) suelen tardar 4-6 semanas.",
      },
      {
        q: "¿Puede manejar llamadas en inglés y en español?",
        a: "Sí — el manejo bilingüe inglés/español viene incluido desde el plan Starter, no es un extra. El agente detecta el idioma de quien llama y responde naturalmente en ese idioma.",
      },
      {
        q: "¿Qué pasa si el agente no sabe responder algo?",
        a: "Deriva la llamada a una persona con todo el contexto — qué preguntó quien llama, qué ya se habló — en vez de adivinar o hacer que la persona se repita. Tú decides exactamente qué situaciones activan esa derivación durante la fase de diseño.",
      },
      {
        q: "¿Puede funcionar con mi número y mi CRM actuales?",
        a: "En la mayoría de los casos, sí. El agente se conecta a tu número de teléfono actual a través del proveedor de telefonía, y se integra con CRMs, calendarios y sistemas de reservas comunes. Si tu configuración es poco habitual, lo revisamos en la llamada de descubrimiento antes de cualquier compromiso.",
      },
      {
        q: "¿Mis datos y los de mis clientes están seguros?",
        a: "Las llamadas se procesan con el mismo tipo de infraestructura que usan las plataformas empresariales de voz, y no almaceno más de lo necesario para operar el agente y reportar resultados de llamadas. Si tienes requisitos de cumplimiento específicos, dímelo en el descubrimiento y confirmo qué es viable antes de empezar.",
      },
      {
        q: "¿Hay contrato de largo plazo?",
        a: "No hay permanencia forzada más allá de la configuración inicial. Pagas una vez por la construcción y una cuota mensual para mantener el agente en funcionamiento y monitoreado; puedes pausar o detener en cualquier momento.",
      },
      {
        q: "¿Y si solo lo necesito para llamadas que no alcanzo a contestar?",
        a: "Es una configuración muy común — el agente solo contesta cuando tu línea está ocupada, fuera de horario, o cuando nadie responde tras cierta cantidad de timbres, así que trabaja junto a tu equipo actual en vez de reemplazarlo.",
      },
    ],
    cta: {
      heading: "Deja de perder llamadas en el buzón de voz",
      body: "Cuéntame qué necesitas que haga tu teléfono, y te digo con honestidad si un agente de IA para llamadas vale la pena construirlo para tu caso — sin pitch genérico, sin presión.",
      buttonLabel: "Agenda una llamada de descubrimiento",
      badge: "Respuesta en 1 día hábil",
    },
  },
};

export function aiCallingAgentsCopy(locale: "en" | "es"): AiCallingAgentsLocaleCopy {
  return locale === "es" ? aiCallingAgents.es : aiCallingAgents.en;
}
