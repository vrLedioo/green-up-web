import type { Locale } from "./i18n";

export type ActionButton = {
  label: { sq: string; en: string; de: string };
  type: "navigate" | "call" | "email";
  value: string;
};

export type Intent = {
  id: string;
  keywords: { sq: string[]; en: string[]; de: string[] };
  response: { sq: string; en: string; de: string };
  actions?: ActionButton[];
  followUps?: string[];
};

const PHONE_TEL = "+38344123456";
const PHONE_DISPLAY = "+383 44 123 456";
const EMAIL = "info@greenup-ks.com";

const BTN_VIEW_SERVICES: ActionButton = {
  label: { sq: "Shiko Shërbimet", en: "View Services", de: "Leistungen ansehen" },
  type: "navigate",
  value: "/services",
};
const BTN_VIEW_PROJECTS: ActionButton = {
  label: { sq: "Shiko Projektet", en: "View Projects", de: "Projekte ansehen" },
  type: "navigate",
  value: "/projects",
};
const BTN_VIEW_FAQ: ActionButton = {
  label: { sq: "Shiko FAQ", en: "View FAQ", de: "FAQ ansehen" },
  type: "navigate",
  value: "/faq",
};
const BTN_VIEW_ABOUT: ActionButton = {
  label: { sq: "Rreth Nesh", en: "About Us", de: "Über Uns" },
  type: "navigate",
  value: "/about",
};
const BTN_VIEW_CONTACT: ActionButton = {
  label: { sq: "Na Kontaktoni", en: "Contact Us", de: "Kontaktieren" },
  type: "navigate",
  value: "/contact",
};
const BTN_VIEW_PARTNERS: ActionButton = {
  label: { sq: "Partnerët", en: "Partners", de: "Partner" },
  type: "navigate",
  value: "/partners",
};
const BTN_VIEW_HOME: ActionButton = {
  label: { sq: "Ballina", en: "Home", de: "Startseite" },
  type: "navigate",
  value: "/",
};
const BTN_CALL_NOW: ActionButton = {
  label: { sq: "Telefono Tani", en: "Call Now", de: "Jetzt Anrufen" },
  type: "call",
  value: PHONE_TEL,
};
const BTN_EMAIL: ActionButton = {
  label: { sq: "Dërgo Email", en: "Send Email", de: "E-Mail senden" },
  type: "email",
  value: EMAIL,
};

export const INTENTS: Intent[] = [
  {
    id: "greeting",
    keywords: {
      sq: ["përshëndetje", "tung", "ckemi", "mirëdita", "mirëmbrëma", "hej", "hi", "hello"],
      en: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy"],
      de: ["hallo", "hi", "guten tag", "guten morgen", "guten abend", "servus", "grüß"],
    },
    response: {
      sq: "Përshëndetje! 👋 Jam asistenti virtual i Green Up. Mund t'ju ndihmoj me informacione rreth ashensorëve, çmimeve, mirëmbajtjes ose t'ju drejtoj në faqen e duhur. Çfarë ju intereson?",
      en: "Hi there! 👋 I'm the Green Up virtual assistant. I can help with info on elevators, pricing, maintenance, or guide you to the right page. What would you like to know?",
      de: "Hallo! 👋 Ich bin der virtuelle Assistent von Green Up. Ich helfe bei Fragen zu Aufzügen, Preisen, Wartung oder leite Sie zur richtigen Seite. Was möchten Sie wissen?",
    },
    followUps: ["services_overview", "quote", "emergency_info", "faq_intent"],
  },
  {
    id: "services_overview",
    keywords: {
      sq: ["shërbime", "shërbimet", "çfarë ofroni", "cfare ofroni", "çfarë bëni"],
      en: ["services", "what do you offer", "what do you do", "offerings"],
      de: ["leistungen", "dienstleistungen", "was bieten", "was macht ihr"],
    },
    response: {
      sq: "Ofrojmë 6 shërbime kryesore: 🛗 Shitje & Instalim Ashensorësh, 🔧 Mirëmbajtje & Riparim, 🏠 Home Lift për shtëpi, ♿ Platforma për Persona me Nevoja, 🪜 Eskalatorë dhe 🔒 Sisteme Sigurie. Dua t'ju tregoj më shumë për ndonjërën?",
      en: "We offer 6 main services: 🛗 Elevator Sales & Installation, 🔧 Maintenance & Repair, 🏠 Home Lifts, ♿ Accessibility Platforms, 🪜 Escalators, and 🔒 Security Systems. Want to hear more about any of these?",
      de: "Wir bieten 6 Hauptleistungen: 🛗 Aufzugsverkauf & -installation, 🔧 Wartung & Reparatur, 🏠 Hausaufzüge, ♿ Barrierefreiheitsplattformen, 🪜 Fahrtreppen und 🔒 Sicherheitssysteme. Möchten Sie mehr über eine davon erfahren?",
    },
    actions: [BTN_VIEW_SERVICES],
    followUps: ["installation", "maintenance_info", "home_lift", "quote"],
  },
  {
    id: "installation",
    keywords: {
      sq: ["instalim", "instaloni", "ashensor i ri", "montim"],
      en: ["install", "installation", "new elevator", "setup"],
      de: ["installation", "installieren", "neuer aufzug", "montage"],
    },
    response: {
      sq: "Instalojmë ashensorë pasagjerësh (2–30+ persona), ashensorë mallrash, industrialë dhe panoramikë me xham. Punojmë sipas standardeve EN 81 dhe CE, me dokumentacion të plotë. Instalimi zgjat zakonisht 3–7 ditë pune.",
      en: "We install passenger elevators (2–30+ persons), cargo, industrial, and panoramic glass elevators. All per EN 81 and CE standards, with complete documentation. Installation typically takes 3–7 working days.",
      de: "Wir installieren Personenaufzüge (2–30+ Personen), Waren-, Industrie- und Panoramaaufzüge. Alles nach EN 81 und CE-Normen mit vollständiger Dokumentation. Die Installation dauert in der Regel 3–7 Arbeitstage.",
    },
    actions: [BTN_VIEW_SERVICES, BTN_VIEW_CONTACT],
    followUps: ["quote", "warranty_info", "installation_time"],
  },
  {
    id: "maintenance_info",
    keywords: {
      sq: ["mirëmbajtje", "mirembajtje", "riparim", "servis", "service"],
      en: ["maintenance", "maintain", "repair", "service", "servicing"],
      de: ["wartung", "warten", "reparatur", "service", "instandhaltung"],
    },
    response: {
      sq: "Ofrojmë kontrata vjetore mirëmbajtjeje me inspektime çdo 6 muaj, shërbim urgjent 24/7, pjesë origjinale rezervë dhe raporte teknike pas çdo vizite. Mund edhe ta modernizojmë ashensorin tuaj ekzistues.",
      en: "We offer annual maintenance contracts with inspections every 6 months, 24/7 emergency service, original spare parts, and technical reports after every visit. We can also modernize your existing elevator.",
      de: "Wir bieten jährliche Wartungsverträge mit Inspektionen alle 6 Monate, 24/7-Notdienst, Original-Ersatzteile und technische Berichte nach jedem Besuch. Wir modernisieren auch bestehende Anlagen.",
    },
    actions: [BTN_VIEW_CONTACT, BTN_CALL_NOW],
    followUps: ["emergency_info", "quote"],
  },
  {
    id: "home_lift",
    keywords: {
      sq: ["home lift", "ashensor shtëpiak", "shtëpi", "vilë", "privat"],
      en: ["home lift", "residential elevator", "house", "villa", "private"],
      de: ["hausaufzug", "homelift", "haus", "villa", "privat"],
    },
    response: {
      sq: "Home liftet tona kanë kapacitet 2–4 persona, dizajn të personalizuar, mund të instalohen pa gropë (pitless), operojnë me energji të ulët dhe vijnë me garanci 5-vjeçare. Idealë për shtëpi private dhe vila.",
      en: "Our home lifts carry 2–4 persons, have customized design, pitless installation, low-energy operation, and come with a 5-year warranty. Perfect for private homes and villas.",
      de: "Unsere Hausaufzüge fassen 2–4 Personen, haben individuelles Design, grubenlose Installation, energiesparenden Betrieb und 5 Jahre Garantie. Ideal für Privathäuser und Villen.",
    },
    actions: [BTN_VIEW_SERVICES, BTN_VIEW_CONTACT],
    followUps: ["quote", "installation_time"],
  },
  {
    id: "accessibility",
    keywords: {
      sq: ["aftësi të kufizuara", "persona me nevoja", "karrocë", "barrierë", "platformë"],
      en: ["disability", "wheelchair", "accessibility", "disabled", "ada"],
      de: ["behinderung", "rollstuhl", "barrierefreiheit", "behindert"],
    },
    response: {
      sq: "Ofrojmë platforma vertikale ngritëse, stairlifte, rampa dhe ashensorë mjekësorë për të gjitha llojet e ndërtesave. Të certifikuara sipas direktivave BE me shërbim të shpejtë instalimi.",
      en: "We offer vertical lifting platforms, stairlifts, ramps, and medical elevators for all building types. Certified per EU directives with fast installation service.",
      de: "Wir bieten vertikale Hebeplattformen, Treppenlifte, Rampen und medizinische Aufzüge für alle Gebäudetypen. Zertifiziert nach EU-Richtlinien mit schnellem Installationsservice.",
    },
    actions: [BTN_VIEW_SERVICES, BTN_VIEW_CONTACT],
    followUps: ["quote"],
  },
  {
    id: "escalator_info",
    keywords: {
      sq: ["eskalator", "shkallë lëvizëse", "moving walkway"],
      en: ["escalator", "moving walkway", "moving stairs"],
      de: ["fahrtreppe", "rolltreppe", "fahrsteig"],
    },
    response: {
      sq: "Instalojmë eskalatorë komercialë dhe fahrsteige (moving walkways) me gjerësi 600–1000mm, shpejtësi 0.5 m/s, dritat LED të integruara dhe mirëmbajtje periodike. Ideale për qendra tregtare dhe hotele.",
      en: "We install commercial escalators and moving walkways with 600–1000mm widths, 0.5 m/s speed, integrated LED lighting, and regular maintenance. Perfect for shopping centers and hotels.",
      de: "Wir installieren kommerzielle Fahrtreppen und Fahrsteige mit 600–1000mm Breite, 0,5 m/s Geschwindigkeit, integrierter LED-Beleuchtung und regelmäßiger Wartung. Ideal für Einkaufszentren und Hotels.",
    },
    actions: [BTN_VIEW_SERVICES],
    followUps: ["quote"],
  },
  {
    id: "security_systems",
    keywords: {
      sq: ["sigurisë", "sigurie", "kamera", "alarm", "cctv", "monitorim"],
      en: ["security", "cctv", "camera", "alarm", "monitoring", "surveillance"],
      de: ["sicherheit", "kamera", "alarm", "überwachung"],
    },
    response: {
      sq: "Sistemet tona të sigurisë përfshijnë kamera CCTV brenda kabinës, alarme dhe intercom, monitorim të largët 24/7, kyçje automatike, sensorë mbingarkimi dhe sisteme emergjencie ARD.",
      en: "Our security systems include CCTV cameras inside cabins, alarm and intercom systems, 24/7 remote monitoring, automatic locking, overload sensors, and ARD emergency systems.",
      de: "Unsere Sicherheitssysteme umfassen CCTV-Kameras in der Kabine, Alarm- und Gegensprechanlagen, 24/7-Fernüberwachung, automatische Verriegelung, Überlastsensoren und ARD-Notfallsysteme.",
    },
    actions: [BTN_VIEW_SERVICES],
    followUps: ["quote"],
  },
  {
    id: "emergency_info",
    keywords: {
      sq: ["urgjencë", "urgjence", "bllokuar", "ngecur", "mbyllur", "emergjencë", "panik"],
      en: ["emergency", "stuck", "trapped", "urgent", "broken", "not working", "panic"],
      de: ["notfall", "notdienst", "stecken", "eingeschlossen", "kaputt", "dringend"],
    },
    response: {
      sq: `🚨 Shërbimi ynë urgjent është i disponueshëm 24/7! Nëse jeni bllokuar në ashensor ose keni emergjencë, telefononi menjëherë ${PHONE_DISPLAY}. Mos u përpiqni të hapni dyert me forcë.`,
      en: `🚨 Our emergency service is available 24/7! If you're stuck in an elevator or have an emergency, call ${PHONE_DISPLAY} immediately. Do not try to force the doors open.`,
      de: `🚨 Unser Notdienst ist rund um die Uhr verfügbar! Wenn Sie im Aufzug feststecken oder einen Notfall haben, rufen Sie sofort ${PHONE_DISPLAY} an. Versuchen Sie nicht, die Türen mit Gewalt zu öffnen.`,
    },
    actions: [BTN_CALL_NOW],
  },
  {
    id: "quote",
    keywords: {
      sq: ["ofertë", "oferte", "çmim", "cmim", "kushton", "sa kushton", "price"],
      en: ["quote", "price", "cost", "how much", "pricing", "estimate"],
      de: ["angebot", "preis", "kosten", "wie viel", "kostenlos"],
    },
    response: {
      sq: "Ofrojmë konsultim dhe ofertë falas pa detyrim. Çmimet varen nga lloji i ashensorit, dimensionet dhe specifikimet. Plotësoni formularin e kontaktit ose na telefononi për një ofertë të personalizuar.",
      en: "We offer free consultation and no-obligation quotes. Prices depend on elevator type, dimensions, and specifications. Fill out the contact form or call us for a personalized quote.",
      de: "Wir bieten kostenlose Beratung und unverbindliche Angebote. Die Preise hängen von Aufzugstyp, Abmessungen und Spezifikationen ab. Füllen Sie das Kontaktformular aus oder rufen Sie uns an.",
    },
    actions: [BTN_VIEW_CONTACT, BTN_CALL_NOW],
    followUps: ["contact_info", "installation_time"],
  },
  {
    id: "contact_info",
    keywords: {
      sq: ["kontakt", "kontaktoni", "kontaktoj", "na gjeni"],
      en: ["contact", "reach you", "get in touch"],
      de: ["kontakt", "erreichen", "kontaktieren"],
    },
    response: {
      sq: `📞 Telefon: ${PHONE_DISPLAY}\n📧 Email: ${EMAIL}\n📍 Adresa: Prishtinë, Kosovë\n\nJemi të disponueshëm 24/7 për urgjenca.`,
      en: `📞 Phone: ${PHONE_DISPLAY}\n📧 Email: ${EMAIL}\n📍 Address: Prishtina, Kosovo\n\nWe're available 24/7 for emergencies.`,
      de: `📞 Telefon: ${PHONE_DISPLAY}\n📧 E-Mail: ${EMAIL}\n📍 Adresse: Prishtina, Kosovo\n\nWir sind rund um die Uhr für Notfälle erreichbar.`,
    },
    actions: [BTN_CALL_NOW, BTN_EMAIL, BTN_VIEW_CONTACT],
  },
  {
    id: "location",
    keywords: {
      sq: ["ku jeni", "vendndodhja", "adresa", "zyra", "ku ndodheni"],
      en: ["where are you", "location", "address", "office"],
      de: ["wo seid ihr", "standort", "adresse", "büro"],
    },
    response: {
      sq: "Zyra jonë qendrore është në Prishtinë, Kosovë. Punojmë në të gjithë Kosovën dhe kemi projekte edhe në Shqipëri dhe Maqedoninë e Veriut.",
      en: "Our head office is in Prishtina, Kosovo. We operate throughout Kosovo and have projects in Albania and North Macedonia as well.",
      de: "Unser Hauptsitz ist in Prishtina, Kosovo. Wir arbeiten in ganz Kosovo und haben auch Projekte in Albanien und Nordmazedonien.",
    },
    actions: [BTN_VIEW_CONTACT],
    followUps: ["coverage", "hours"],
  },
  {
    id: "hours",
    keywords: {
      sq: ["orari", "orarin", "hapur", "kur punoni"],
      en: ["hours", "open", "when are you open", "working hours"],
      de: ["öffnungszeiten", "geöffnet", "wann", "arbeitszeiten"],
    },
    response: {
      sq: "Zyra punon E Hënë–E Premte 08:00–17:00, E Shtunë 09:00–13:00. Shërbimi urgjent 24/7 është gjithmonë aktiv.",
      en: "Office hours: Monday–Friday 8am–5pm, Saturday 9am–1pm. Our 24/7 emergency service is always active.",
      de: "Bürozeiten: Montag–Freitag 8–17 Uhr, Samstag 9–13 Uhr. Unser 24/7-Notdienst ist immer aktiv.",
    },
    followUps: ["emergency_info", "contact_info"],
  },
  {
    id: "warranty_info",
    keywords: {
      sq: ["garanci", "garancion", "siguroheni"],
      en: ["warranty", "guarantee", "warranted"],
      de: ["garantie", "gewährleistung", "gewähr"],
    },
    response: {
      sq: "Të gjithë ashensorët tanë vijnë me garanci minimale 2 vjeçare. Home liftet dhe disa modele kanë garanci deri në 5 vjet për pjesë mekanike. After-sales service i plotë i përfshirë.",
      en: "All our elevators come with a minimum 2-year warranty. Home lifts and some models have up to 5 years on mechanical parts. Full after-sales service included.",
      de: "Alle unsere Aufzüge haben mindestens 2 Jahre Garantie. Hausaufzüge und einige Modelle haben bis zu 5 Jahre auf mechanische Teile. Vollständiger After-Sales-Service inklusive.",
    },
    followUps: ["maintenance_info", "brands"],
  },
  {
    id: "installation_time",
    keywords: {
      sq: ["sa kohë", "sa kohe", "sa zgjat", "kohëzgjatje", "kur mbaron"],
      en: ["how long", "how much time", "duration", "timeline", "when finished"],
      de: ["wie lange", "dauer", "zeitrahmen", "fertig"],
    },
    response: {
      sq: "Një ashensor standard zakonisht instalohet në 3–7 ditë pune. Home liftet mund të instalohen edhe në 1–2 ditë. Projekte më komplekse mund të zgjasin më shumë — do t'ju japim një afat të saktë pas inspektimit.",
      en: "A standard elevator typically installs in 3–7 working days. Home lifts can be installed in as little as 1–2 days. Complex projects may take longer — we'll give you an exact timeline after inspection.",
      de: "Ein Standardaufzug wird in der Regel in 3–7 Arbeitstagen installiert. Hausaufzüge können in 1–2 Tagen installiert werden. Bei komplexeren Projekten geben wir Ihnen nach der Inspektion einen genauen Zeitplan.",
    },
    followUps: ["quote", "installation"],
  },
  {
    id: "brands",
    keywords: {
      sq: ["marka", "markë", "brand", "prodhues"],
      en: ["brands", "brand", "manufacturer", "makes"],
      de: ["marken", "marke", "hersteller"],
    },
    response: {
      sq: "Punojmë me markat më të njohura evropiane: Thyssenkrupp, KONE, Schindler, Otis, si dhe marka cilësore italiane dhe gjermane. Të gjitha produktet janë të certifikuara BE.",
      en: "We work with the most renowned European brands: Thyssenkrupp, KONE, Schindler, Otis, plus quality Italian and German makers. All products are EU-certified.",
      de: "Wir arbeiten mit den bekanntesten europäischen Marken: Thyssenkrupp, KONE, Schindler, Otis sowie hochwertigen italienischen und deutschen Herstellern. Alle Produkte sind EU-zertifiziert.",
    },
    actions: [BTN_VIEW_PARTNERS],
    followUps: ["warranty_info", "quote"],
  },
  {
    id: "coverage",
    keywords: {
      sq: ["mbulim", "mbuloni", "punoni në", "shërbeni", "jashtë kosovës"],
      en: ["cover", "work in", "serve", "outside kosovo", "coverage", "international"],
      de: ["abdeckung", "arbeiten in", "außerhalb", "international"],
    },
    response: {
      sq: "Shërbejmë në të gjithë Kosovën — nga Prizreni në Mitrovicë, nga Peja në Gjilan. Kemi projekte edhe në Shqipëri dhe Maqedoninë e Veriut. Na kontaktoni për projekte ndërkombëtare.",
      en: "We serve throughout Kosovo — from Prizren to Mitrovica, from Peja to Gjilan. We also have projects in Albania and North Macedonia. Contact us for international projects.",
      de: "Wir arbeiten in ganz Kosovo — von Prizren bis Mitrovica, von Peja bis Gjilan. Wir haben auch Projekte in Albanien und Nordmazedonien. Kontaktieren Sie uns für internationale Projekte.",
    },
    actions: [BTN_VIEW_CONTACT],
  },
  {
    id: "projects_show",
    keywords: {
      sq: ["projekte", "projektet", "punët", "punet tuaja", "referenca"],
      en: ["projects", "portfolio", "work", "references", "case studies"],
      de: ["projekte", "referenzen", "arbeiten", "portfolio"],
    },
    response: {
      sq: "Kemi mbi 500 projekte të kryera në Kosovë dhe rajon — ndërtesa banimi, hotele, qendra tregtare, spitale. Secili projekt ka galeri fotosh dhe detaje teknike.",
      en: "We've completed over 500 projects across Kosovo and the region — residential buildings, hotels, shopping centers, hospitals. Each project has photo galleries and technical details.",
      de: "Wir haben über 500 Projekte in Kosovo und der Region abgeschlossen — Wohngebäude, Hotels, Einkaufszentren, Krankenhäuser. Jedes Projekt hat Fotogalerien und technische Details.",
    },
    actions: [BTN_VIEW_PROJECTS],
    followUps: ["quote"],
  },
  {
    id: "about_company",
    keywords: {
      sq: ["rreth jush", "kush jeni", "historia", "kompania"],
      en: ["about you", "who are you", "about the company", "history"],
      de: ["über euch", "wer seid", "firmengeschichte", "unternehmen"],
    },
    response: {
      sq: "Green Up është themeluar në vitin 2009 në Prishtinë dhe është kompania lider në Kosovë për shitjen, instalimin dhe mirëmbajtjen e ashensorëve premium. Mbi 15 vite eksperiencë dhe 500+ projekte.",
      en: "Green Up was founded in 2009 in Prishtina and is Kosovo's leading company for premium elevator sales, installation, and maintenance. Over 15 years of experience and 500+ projects.",
      de: "Green Up wurde 2009 in Prishtina gegründet und ist das führende Unternehmen in Kosovo für den Verkauf, die Installation und Wartung von Premium-Aufzügen. Über 15 Jahre Erfahrung und 500+ Projekte.",
    },
    actions: [BTN_VIEW_ABOUT],
  },
  {
    id: "faq_intent",
    keywords: {
      sq: ["faq", "pyetje", "pyetjet", "ndihmë"],
      en: ["faq", "questions", "help", "frequently asked"],
      de: ["faq", "fragen", "hilfe", "häufige"],
    },
    response: {
      sq: "Kemi një seksion të plotë FAQ me 10 pyetjet më të shpeshta rreth instalimit, garancisë, mirëmbajtjes, çmimeve dhe më shumë.",
      en: "We have a full FAQ section with the 10 most common questions about installation, warranty, maintenance, pricing, and more.",
      de: "Wir haben einen vollständigen FAQ-Bereich mit den 10 häufigsten Fragen zu Installation, Garantie, Wartung, Preisen und mehr.",
    },
    actions: [BTN_VIEW_FAQ],
  },
  {
    id: "partners_info",
    keywords: {
      sq: ["partnerët", "partnere", "bashkëpunim"],
      en: ["partners", "partnerships", "collaboration"],
      de: ["partner", "partnerschaften", "zusammenarbeit"],
    },
    response: {
      sq: "Bashkëpunojmë me prodhuesit më të njohur evropianë për të ofruar produkte premium me çmime konkurruese.",
      en: "We collaborate with the most renowned European manufacturers to offer premium products at competitive prices.",
      de: "Wir arbeiten mit den bekanntesten europäischen Herstellern zusammen, um Premium-Produkte zu wettbewerbsfähigen Preisen anzubieten.",
    },
    actions: [BTN_VIEW_PARTNERS],
  },
  {
    id: "gallery_show",
    keywords: {
      sq: ["galeri", "foto", "fotografi", "imazhe"],
      en: ["gallery", "photos", "pictures", "images"],
      de: ["galerie", "fotos", "bilder"],
    },
    response: {
      sq: "Galeria është integruar në faqen e Projekteve — mund të shihni foto para/pas, punën tonë në terren, ekipin dhe instalimet e kryera.",
      en: "The gallery is integrated in the Projects page — you can see before/after photos, fieldwork, our team, and completed installations.",
      de: "Die Galerie ist auf der Projektseite integriert — Sie können Vorher/Nachher-Fotos, Feldarbeit, unser Team und abgeschlossene Installationen sehen.",
    },
    actions: [BTN_VIEW_PROJECTS],
  },
  {
    id: "home_page",
    keywords: {
      sq: ["ballina", "faqja kryesore", "fillimi"],
      en: ["home", "homepage", "main page", "start"],
      de: ["startseite", "hauptseite", "home"],
    },
    response: {
      sq: "Sigurisht, t'ju dërgoj te ballina.",
      en: "Sure, let me take you to the homepage.",
      de: "Gerne, ich bringe Sie zur Startseite.",
    },
    actions: [BTN_VIEW_HOME],
  },
  {
    id: "safety",
    keywords: {
      sq: ["siguri", "i sigurt", "standarde", "certifikim"],
      en: ["safe", "safety", "standards", "certified"],
      de: ["sicher", "sicherheit", "standards", "zertifiziert"],
    },
    response: {
      sq: "Të gjithë ashensorët tanë certifikohen sipas standardeve evropiane EN 81 dhe i nënshtrohen inspektimit të rregullt nga organet kompetente. Siguria është prioriteti ynë kryesor.",
      en: "All our elevators are certified per European EN 81 standards and undergo regular inspection by competent bodies. Safety is our top priority.",
      de: "Alle unsere Aufzüge sind nach europäischen EN 81-Normen zertifiziert und werden regelmäßig von zuständigen Behörden inspiziert. Sicherheit hat höchste Priorität.",
    },
    followUps: ["warranty_info", "brands"],
  },
  {
    id: "existing_building",
    keywords: {
      sq: ["ndërtesë ekzistuese", "ndertese ekzistuese", "ndërtesë të vjetër", "shtim ashensori"],
      en: ["existing building", "old building", "add elevator", "retrofit"],
      de: ["bestehendes gebäude", "altes gebäude", "nachrüsten"],
    },
    response: {
      sq: "Po! Kemi eksperiencë të gjerë në instalimin e ashensorëve në ndërtesa ekzistuese pa planifikim të mëparshëm. Gjejmë zgjidhje teknike optimale për çdo situatë.",
      en: "Yes! We have extensive experience installing elevators in existing buildings without prior planning. We find optimal technical solutions for every situation.",
      de: "Ja! Wir haben umfangreiche Erfahrung mit dem Einbau von Aufzügen in bestehenden Gebäuden ohne vorherige Planung. Wir finden für jede Situation optimale technische Lösungen.",
    },
    actions: [BTN_VIEW_CONTACT],
    followUps: ["quote", "installation_time"],
  },
  {
    id: "thanks",
    keywords: {
      sq: ["faleminderit", "flm", "mirë, flm", "falemnderit"],
      en: ["thanks", "thank you", "thx", "appreciate"],
      de: ["danke", "vielen dank", "danke schön"],
    },
    response: {
      sq: "Me kënaqësi! Nëse keni pyetje të tjera ose dëshironi një ofertë, jam këtu. 🙂",
      en: "You're welcome! If you have more questions or want a quote, I'm here. 🙂",
      de: "Gerne! Wenn Sie weitere Fragen haben oder ein Angebot wünschen, bin ich da. 🙂",
    },
    followUps: ["quote", "contact_info"],
  },
  {
    id: "goodbye",
    keywords: {
      sq: ["mirupafshim", "tung", "ditën e mbarë", "bye"],
      en: ["bye", "goodbye", "see you", "see ya"],
      de: ["tschüss", "auf wiedersehen", "bis bald", "ciao"],
    },
    response: {
      sq: "Ditën e mbarë! Jemi këtu për çdo nevojë. 👋",
      en: "Have a great day! We're here whenever you need us. 👋",
      de: "Einen schönen Tag noch! Wir sind da, wenn Sie uns brauchen. 👋",
    },
  },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keywordMatch(text: string, kw: string): boolean {
  const k = kw.toLowerCase();
  const t = text.toLowerCase();
  if (k.includes(" ")) return t.includes(k);
  const re = new RegExp(`(^|[^a-z0-9ëçöäüß])${escapeRegex(k)}($|[^a-z0-9ëçöäüß])`, "iu");
  return re.test(t);
}

export function matchIntent(text: string, locale: Locale): Intent | null {
  const normalized = text.toLowerCase().trim();
  if (!normalized) return null;

  let best: { intent: Intent; score: number } | null = null;

  for (const intent of INTENTS) {
    const keywords = intent.keywords[locale];
    let score = 0;
    for (const kw of keywords) {
      if (keywordMatch(normalized, kw)) {
        score += kw.length + (kw.includes(" ") ? 3 : 0);
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  return best?.intent ?? null;
}

export function getIntentById(id: string): Intent | undefined {
  return INTENTS.find((i) => i.id === id);
}

export function intentDisplayLabel(intent: Intent, locale: Locale): string {
  const labels: Record<string, { sq: string; en: string; de: string }> = {
    services_overview: { sq: "Shërbimet", en: "Services", de: "Leistungen" },
    quote: { sq: "Kërko ofertë", en: "Request quote", de: "Angebot" },
    emergency_info: { sq: "Urgjencë 24/7", en: "Emergency 24/7", de: "Notdienst 24/7" },
    faq_intent: { sq: "FAQ", en: "FAQ", de: "FAQ" },
    installation: { sq: "Instalim", en: "Installation", de: "Installation" },
    maintenance_info: { sq: "Mirëmbajtje", en: "Maintenance", de: "Wartung" },
    home_lift: { sq: "Home Lift", en: "Home Lift", de: "Hausaufzug" },
    warranty_info: { sq: "Garancia", en: "Warranty", de: "Garantie" },
    installation_time: { sq: "Sa kohë zgjat?", en: "How long?", de: "Wie lange?" },
    contact_info: { sq: "Kontakt", en: "Contact", de: "Kontakt" },
    projects_show: { sq: "Projektet", en: "Projects", de: "Projekte" },
    brands: { sq: "Markat", en: "Brands", de: "Marken" },
    coverage: { sq: "Ku punojmë", en: "Coverage", de: "Abdeckung" },
    hours: { sq: "Orari", en: "Hours", de: "Öffnungszeiten" },
    safety: { sq: "Siguria", en: "Safety", de: "Sicherheit" },
  };
  const entry = labels[intent.id];
  if (entry) return entry[locale];
  const kws = intent.keywords[locale];
  const first = kws[0] ?? intent.id;
  return first.charAt(0).toUpperCase() + first.slice(1);
}
