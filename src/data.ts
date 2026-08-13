import { Translation, FloatingCardData, ProductData, JournalItem } from './types';

export const translations: { EN: Translation; IT: Translation } = {
  EN: {
    navProducts: "Products",
    navAbout: "About",
    navSustainability: "Sustainability",
    navJournal: "Journal",
    heroTitle: "Spaces for people, made for life.",
    heroSubtitle: "Nivasa integrates indian craftsmanship, custom architectural solutions, and cutting-edge acoustic engineering to compose silent, elegant spaces.",
    exploreMore: "Explore the Collection",
    aboutBadge: "Our Philosophy",
    aboutTitle: "We cultivate acoustic comfort and timeless beauty.",
    aboutText1: "At Nivasa, we believe spaces should nurture human well-being. By blending traditional woodcraft with acoustic physics, we design modular furniture and panels that absorb distracting frequencies while warming the visual landscape.",
    aboutText2: "Every piece is manufactured in Italy using certified sustainable wood sources, non-toxic finishes, and fully recyclable sound insulation core. We collaborate with architects worldwide to customize residential and contract projects.",
    productsTitle: "The Divisions",
    productsSubtitle: "Explore our architectural design and acoustic collections tailored for work, home, and acoustic well-being.",
    customizerTitle: "Interactive Spatial Canvas",
    customizerSubtitle: "Tailor your environment. Choose premium finishes, select modular layouts, and preview the acoustic reflection of custom configurations.",
    customizerChooseMaterial: "Select Material",
    customizerChooseLayout: "Choose Modular Composition",
    customizerLayoutAcoustic: "Acoustic Wall Composition",
    customizerLayoutOffice: "Creative Studio Layout",
    customizerLayoutLounge: "Premium Hotel Lounge",
    customizerWoodWarm: "Warm Walnut",
    customizerWoodDark: "Carbonized Oak",
    customizerWoodNatural: "Bleached Ash",
    customizerReset: "Reset Configuration",
    galleryTitle: "Curated Projects",
    gallerySubtitle: "A display of premium installations across residential, corporate, and luxury hospitality sectors worldwide.",
    journalTitle: "The Journal",
    journalSubtitle: "Insights into architectural acoustics, sustainable materials, and contemporary indian design.",
    journalReadMore: "Read Editorial",
    footerSubscribe: "Subscribe to our newsletters for product drops and project studies.",
    footerPlaceholder: "Your email address",
    footerButton: "Subscribe",
    footerCopy: "© 2026 Nivasa Studio All rights reserved. Designed in India.",
    acousticCalmOn: "Acoustic Calm: ON",
    acousticCalmOff: "Acoustic Calm: OFF",
    simulatedReverberation: "Simulated Reverberation",
    acousticCalmDesc: "Nivasa absorbs up to 85% of ambient auditory noise frequencies, lowering cortisol."
  },
  IT: {
    navProducts: "Prodotti",
    navAbout: "Chi Siamo",
    navSustainability: "Sostenibilità",
    navJournal: "Rivista",
    heroTitle: "Spazi per le persone, fatti per la vita.",
    heroSubtitle: "Nivasa unisce l'artigianato indiano, soluzioni architettoniche personalizzate e ingegneria acustica all'avanguardia per comporre spazi silenziosi ed eleganti.",
    exploreMore: "Esplora la Collezione",
    aboutBadge: "La Nostra Filosofia",
    aboutTitle: "Coltiviamo il comfort acustico e la bellezza senza tempo.",
    aboutText1: "In Nivasa crediamo che gli spazi debbano nutrire il benessere umano. Unendo la lavorazione tradizionale del legno con la fisica acustica, progettiamo arredi e pannelli modulari che assorbono le frequenze di distrazione riscaldando il paesaggio visivo.",
    aboutText2: "Ogni pezzo è prodotto in Italia utilizzando fonti di legno certificate e sostenibili, finiture atossiche e un nucleo di isolamento acustico completamente riciclabile. Collaboriamo con architetti di tutto il mondo per personalizzare progetti residenziali e contract.",
    productsTitle: "Le Divisioni",
    productsSubtitle: "Esplora le nostre collezioni di design architettonico e acustica su misura per il lavoro, la casa e il benessere acustico.",
    customizerTitle: "Tela Spaziale Interattiva",
    customizerSubtitle: "Personalizza il tuo ambiente. Scegli finiture pregiate, seleziona layout modulari e visualizza in anteprima la riflessione acustica di configurazioni personalizzate.",
    customizerChooseMaterial: "Seleziona Materiale",
    customizerChooseLayout: "Scegli Composizione Modulare",
    customizerLayoutAcoustic: "Composizione a Parete Acustica",
    customizerLayoutOffice: "Layout Studio Creativo",
    customizerLayoutLounge: "Lounge Hotel Premium",
    customizerWoodWarm: "Noce Caldo",
    customizerWoodDark: "Rovere Carbonizzato",
    customizerWoodNatural: "Frassino Sbiancato",
    customizerReset: "Reimposta Configurazione",
    galleryTitle: "Progetti Selezionati",
    gallerySubtitle: "Un'esposizione di installazioni premium nei settori residenziale, aziendale e dell'ospitalità di lusso in tutto il mondo.",
    journalTitle: "Il Giornale",
    journalSubtitle: "Approfondimenti su acustica architettonica, materiali sostenibili e design indiano contemporaneo.",
    journalReadMore: "Leggi l'Editoriale",
    footerSubscribe: "Iscriviti alle nostre newsletter per lanci di prodotti e studi di progetto.",
    footerPlaceholder: "Il tuo indirizzo email",
    footerButton: "Iscriviti",
    footerCopy: "© 2026 Nivasa Studio Tutti i diritti riservati. Prodotto in Italia.",
    acousticCalmOn: "Silenzio Acustico: ON",
    acousticCalmOff: "Silenzio Acustico: OFF",
    simulatedReverberation: "Riverberazione Simulata",
    acousticCalmDesc: "Nivasa assorbe fino all'85% dei rumori ambientali, riducendo i livelli di cortisolo."
  }
};

export const floatingCards: FloatingCardData[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80",
    title: "Acoustic Lounge Chair",
    category: "Nivasa Home",
    top: "14%",
    left: "10%",
    scale: 0.95,
    rotate: -4,
    speedX: 0.015,
    speedY: 0.02,
    zIndex: 10
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    title: "Slatted Walnut Panel",
    category: "Nivasa Acoustics",
    top: "18%",
    left: "75%",
    scale: 1.05,
    rotate: 3,
    speedX: -0.02,
    speedY: 0.015,
    zIndex: 12
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
    title: "Minimal Living Layout",
    category: "Nivasa Contract",
    top: "52%",
    left: "8%",
    scale: 1.0,
    rotate: 2,
    speedX: 0.025,
    speedY: -0.01,
    zIndex: 8
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
    title: "Brutalist Concrete & Wood",
    category: "Architecture",
    top: "58%",
    left: "78%",
    scale: 0.9,
    rotate: -5,
    speedX: -0.012,
    speedY: -0.025,
    zIndex: 14
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    title: "Modular Felt Absorber",
    category: "Nivasa Acoustics",
    top: "76%",
    left: "25%",
    scale: 1.02,
    rotate: 1,
    speedX: 0.01,
    speedY: 0.018,
    zIndex: 11
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    title: "Glow Ambient Sconce",
    category: "Nivasa Light",
    top: "74%",
    left: "60%",
    scale: 0.98,
    rotate: -2,
    speedX: -0.018,
    speedY: 0.012,
    zIndex: 9
  }
];

export const products: ProductData[] = [
  {
    id: "acoustics",
    title: "Nivasa Acoustics",
    category: "Acoustic Engineering",
    description: "Premium sound-absorption slatted panels and acoustic felt clouds designed to cut reverberation while maintaining high-end visual elegance. Engineered in collaboration with leading physics labs.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    features: ["NRC rating of 0.85+", "FSC Certified Hardwoods", "Eco-friendly PET acoustic core", "Class A fire retardant rating"],
    specs: {
      "Core Material": "Recycled Polyester Fiber",
      "Facing Options": "Oak, Walnut, Ash, Lacquered RAL",
      "Standard Panel Size": "600 x 2400 mm",
      "Thickness": "22 mm"
    }
  },
  {
    id: "home",
    title: "Nivasa Home",
    category: "Luxury Furniture",
    description: "Timeless modular residential furniture, sideboards, dining systems, and seating defined by crisp shadow gaps, solid wood craft, and integrated dampening to avoid contact noise.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    features: ["Soft-close felt track systems", "Matte nano-tech surfaces", "Invisible mechanical joins", "Custom sizing configurations"],
    specs: {
      "Wood Species": "indian Walnut, Smoked Oak",
      "Hardware": "Custom heavy-duty soft-damped tracks",
      "Finishes": "Zero-VOC Natural Oils",
      "Assembly": "Modular click-fit engineering"
    }
  },
  {
    id: "work",
    title: "Nivasa Work",
    category: "Commercial & Office",
    description: "Soundproof phone booths, acoustic work desks, and modular screen walls configured to restore deep focus and calm to creative open studios and fast-paced offices.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    features: ["Active fresh-air ventilation", "Integrated USB-C power grids", "Double-glazed acoustic panels", "Castor mobility options"],
    specs: {
      "Sound Reduction": "Up to -32dB (Booth standard)",
      "Frame Material": "Powder-coated structural steel",
      "Connectivity": "CAT6, USB-A/C, AC outlets",
      "Ventilation Speed": "60 m³/h ultra-silent fan"
    }
  }
];

export const projects = [
  {
    id: 1,
    title: "The Silent Villa",
    location: "Lake Como, Italy",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    size: "450 sqm",
    year: "2025"
  },
  {
    id: 2,
    title: "Helsinki Design Hub",
    location: "Helsinki, Finland",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    size: "1,200 sqm",
    year: "2026"
  },
  {
    id: 3,
    title: "Aura Executive Suite",
    location: "Milan, Italy",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    size: "180 sqm",
    year: "2025"
  },
  {
    id: 4,
    title: "The Alpine Retreat",
    location: "Zermatt, Switzerland",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    size: "310 sqm",
    year: "2024"
  }
];

export const journalItems: JournalItem[] = [
  {
    id: 1,
    title: "The Physics of Sound Absorption in Wood Panel Architecture",
    date: "June 14, 2026",
    category: "Acoustics",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    excerpt: "An exploration into slot geometries, micro-perforations, and resonance patterns that turn rigid wood panels into acoustic dampening masterpieces."
  },
  {
    id: 2,
    title: "Sustainable FSC Certified Timber: Protecting indian Forestry",
    date: "May 28, 2026",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    excerpt: "Understanding our strict timber tracking protocols, non-toxic zero-emission finishes, and the zero-waste lifecycle of modular wall solutions."
  },
  {
    id: 3,
    title: "Crafting Calm: The New Era of soundproof Residential Spaces",
    date: "April 19, 2026",
    category: "Design Trends",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
    excerpt: "How remote working and sensory overstimulation are shifting high-end residential interior designs toward auditory peace and visual serenity."
  }
];
