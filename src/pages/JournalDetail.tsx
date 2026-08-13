import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft, Clock, Quote, Share2, CornerDownRight, ShieldCheck, Home } from 'lucide-react';
import { journalItems, translations } from '../data';
import { idToSlugMap, slugToIdMap, Link, navigateTo } from '../utils/router';
import { Language } from '../types';

interface JournalDetailProps {
  slug: string;
  language: Language;
}

// Full content articles corresponding to journal items for a premium reader experience
const articleContents: Record<number, string[]> = {
  1: [
    "Auditory architecture is more than just sound absorption; it is the management of sound reflection coefficients. High-quality wood panel craftsmanship can absorb up to 85% of ambient noise when engineered with precise linear slots and micro-perforations.",
    "The physics behind this process utilizes Helmholtz resonance. When sound waves hit the slotted wood face, they enter air chambers behind the panels, causing air molecules to vibrate against a porous recycled polyester fiber core. This friction converts acoustic kinetic energy into harmless, micro-thermal energy, effectively dissolving the sound.",
    "By specifying the depth of the slots (typically 2mm to 4mm) and the width of the wooden ribs, acoustic engineers can target specific frequencies. For instance, deeper grooves excel at trapping lower vocal tones, creating a hushed, cozy atmosphere ideal for hotel lounges and corporate conference suites."
  ],
  2: [
    "Sustainability is woven into the very fabric of Nivasa. We harvest timber exclusively from European state-regulated forests certified under FSC (Forest Stewardship Council) standards, guaranteeing that for every tree harvested, new saplings are cultivated.",
    "In addition to ecological timber sourcing, our manufacturing plant operates on a zero-waste policy. Wood off-cuts are shredded to power our factory's climate heating systems, and sawdust is compressed into local agricultural fuel sources.",
    "To safeguard indoor air quality, we apply strict chemical transparency standards. All panels are cured with organic, water-soluble, zero-VOC (volatile organic compound) finishes. This ensures our acoustic systems contain zero formaldehyde emissions, contributing directly to healthy breathing conditions and gold-standard LEED ratings."
  ],
  3: [
    "The modern architectural world is experiencing a paradigm shift. With the rise of hybrid working, visual clutter, and sensory overstimulation, high-end residential clients are demanding spaces that act as absolute acoustic sanctuaries.",
    "Nivasa integrates sound isolation membranes directly inside residential sideboards and wardrobes. Contact noise is eliminated via dense felt gliders on tracks, preventing heavy doors or drawers from transmitting vibrations through the floorboards.",
    "By introducing soft, raw slatted cedar textures and light fabrics to the eyes, and dampening echo reflections to the ears, we create a sensory equilibrium. Auditory peace reduces biological cortisol levels, fostering deeper focus, restorative sleep cycles, and authentic relaxation."
  ]
};

const articleContentsIt: Record<number, string[]> = {
  1: [
    "L'architettura acustica è molto più del semplice assorbimento acustico; è la gestione intelligente dei coefficienti di riflessione del suono. La lavorazione artigianale dei pannelli in legno di alta qualità può assorbire fino all'85% del rumore quando progettata con fessure lineari e microperforazioni.",
    "La fisica alla base di questo processo utilizza la risonanza di Helmholtz. Quando le onde sonore colpiscono il legno dogato, penetrano nelle camere d'aria retrostanti, provocando la vibrazione delle molecole d'aria contro un nucleo di fibra di poliestere riciclata. Questo attrito converte l'energia cinetica in micro-energia termica, dissolvendo il rumore.",
    "Definendo la profondità delle scanalature (solitamente da 2mm a 4mm) e la larghezza delle coste in legno, gli ingegneri acustici possono mirare a frequenze specifiche. Ad esempio, scanalature più profonde eccellono nell'intrappolare i toni vocali bassi, creando un'atmosfera ovattata e accogliente ideale per le lounge degli hotel e le sale riunioni aziendali."
  ],
  2: [
    "La sostenibilità è intrecciata nel tessuto stesso di Nivasa. Raccogliamo legname esclusivamente da foreste europee regolamentate dallo Stato e certificate FSC (Forest Stewardship Council) garantendo che per ogni albero raccolto vengano coltivati nuovi alberi.",
    "Oltre all'approvvigionamento ecologico del legname, il nostro impianto di produzione segue una politica zero rifiuti. Gli scarti di legno vengono sminuzzati per alimentare i sistemi di riscaldamento della fabbrica e la segatura viene compressa in combustibile agricolo locale.",
    "Per salvaguardare la qualità dell'aria interna, applichiamo severi standard di trasparenza chimica. Tutti i pannelli sono trattati con finiture organiche, idrosolubili e a zero emissioni di VOC (composti organici volatili). Ciò garantisce l'assenza di formaldeide, contribuendo a condizioni di respiro salutari e certificazioni LEED d'oro."
  ],
  3: [
    "Il mondo dell'architettura moderna sta vivendo un cambiamento epocale. Con l'ascesa del lavoro ibrido, del disordine visivo e dell'iperstimolazione sensoriale, i clienti residenziali di fascia alta richiedono spazi che fungano da veri e propri santuari acustici.",
    "Nivasa integra membrane fonoassorbenti direttamente all'interno di credenze e armadi residenziali. Il rumore da contatto viene eliminato tramite densi pattini in feltro sui binari, impedendo alle ante o ai cassetti pesanti di trasmettere vibrazioni attraverso le assi del pavimento.",
    "Introducendo morbide trame di cedro dogato grezzo e tessuti leggeri agli occhi, e smorzando i rimbombi alle orecchie, creiamo un equilibrio sensoriale perfetto. La pace uditiva riduce i livelli di cortisolo biologico, favorendo una concentrazione più profonda e un relax autentico."
  ]
};

export default function JournalDetail({ slug, language }: JournalDetailProps) {
  // Resolve ID from slug
  let id = slugToIdMap[slug];
  
  // Support numeric ID fallback just in case
  if (!id && !isNaN(Number(slug))) {
    id = Number(slug);
  }

  const post = journalItems.find(item => item.id === id);
  const t = translations[language];
  const isItalian = language === 'IT';

  // Settle window scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle sharing
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isItalian ? "Link copiato negli appunti!" : "Link copied to clipboard!");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--color-luxury-cream)] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-display font-semibold text-3xl text-[var(--color-luxury-dark)] mb-4">
          {isItalian ? "Articolo non trovato" : "Article Not Found"}
        </h1>
        <p className="text-sm text-[var(--color-luxury-dark)]/70 mb-8 max-w-md">
          {isItalian 
            ? "L'articolo della rivista richiesto non esiste o potrebbe essere stato rimosso." 
            : "The journal article you requested could not be found or may have been moved."}
        </p>
        <Link 
          href="/" 
          className="bg-[var(--color-luxury-dark)] text-[var(--color-luxury-cream)] hover:bg-[var(--color-luxury-accent)] text-xs font-mono uppercase tracking-widest font-bold py-4 px-8 rounded-full transition-colors"
        >
          {isItalian ? "Torna alla Home" : "Back to Home"}
        </Link>
      </div>
    );
  }

  const paragraphs = isItalian ? articleContentsIt[post.id] : articleContents[post.id];

  return (
    <div className="min-h-screen bg-[var(--color-luxury-cream)] pt-24 pb-12 md:pb-24">
      {/* Immersive Article Content Container */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
        
        {/* Navigation Breadcrumb bar */}
        <div className="flex justify-between items-center border-b border-[rgba(142,124,104,0.12)] pb-4 mb-8">
          <Link
            href="/#journal"
            className="flex items-center gap-2 text-[var(--color-luxury-dark)] hover:text-[var(--color-luxury-accent)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
              {isItalian ? "Torna alla Rivista" : "Back to Journal"}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full border border-[rgba(142,124,104,0.15)] hover:border-[var(--color-luxury-accent)] text-[var(--color-luxury-dark)] hover:text-[var(--color-luxury-accent)] transition-colors">
              <Home className="w-3.5 h-3.5" />
            </Link>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full border border-[rgba(142,124,104,0.15)] hover:border-[var(--color-luxury-accent)] text-[var(--color-luxury-dark)] hover:text-[var(--color-luxury-accent)] cursor-pointer transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category & Stats block */}
        <div className="flex flex-wrap items-center gap-4 text-[var(--color-luxury-accent)] font-mono text-[9px] uppercase font-bold tracking-widest mb-6">
          <span className="bg-[var(--color-luxury-beige)] border border-[rgba(142,124,104,0.15)] px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {isItalian ? "4 MIN DI LETTURA" : "4 MIN READ"}
          </span>
        </div>

        {/* Title Header with high-end Serif formatting */}
        <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl text-[var(--color-luxury-dark)] tracking-tight leading-tight mb-8">
          {(() => {
            const words = post.title.split(" ");
            if (words.length > 2) {
              const first = words.slice(0, -2).join(" ");
              const lastTwo = words.slice(-2).join(" ");
              return (
                <>
                  {first}{" "}
                  <span className="font-serif font-light italic text-[var(--color-luxury-accent)] block sm:inline">
                    {lastTwo}
                  </span>
                </>
              );
            }
            return post.title;
          })()}
        </h1>

        {/* Big High-End Hero Image */}
        <div className="aspect-16/10 sm:aspect-21/10 w-full overflow-hidden rounded-3xl bg-[var(--color-luxury-beige)] shadow-md mb-12 relative">
          <img
            src={post.image}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-5 hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Essay Content Paragraphs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left side details index on desktop */}
          <div className="lg:col-span-3 hidden lg:flex flex-col gap-6 sticky top-28 border-t border-[rgba(142,124,104,0.15)] pt-6">
            <div>
              <h5 className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-luxury-accent)] font-extrabold mb-1">
                {isItalian ? "AUTORE" : "EDITORIAL BOARD"}
              </h5>
              <p className="text-[11px] font-semibold text-[var(--color-luxury-dark)] leading-snug">
                Nivasa Research Division
              </p>
            </div>
            <div>
              <h5 className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-luxury-accent)] font-extrabold mb-1">
                {isItalian ? "LUOGO" : "ORIGIN"}
              </h5>
              <p className="text-[11px] font-semibold text-[var(--color-luxury-dark)] leading-snug">
                Pesaro, Marche, IT
              </p>
            </div>
            <div>
              <h5 className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-luxury-accent)] font-extrabold mb-1">
                {isItalian ? "TEMI" : "TOPIC AREAS"}
              </h5>
              <div className="flex flex-col gap-1 text-[10px] font-medium text-[var(--color-luxury-dark)]/70">
                <span className="flex items-center gap-1"><CornerDownRight className="w-3 h-3 text-[var(--color-luxury-accent)]" /> Acoustic Science</span>
                <span className="flex items-center gap-1"><CornerDownRight className="w-3 h-3 text-[var(--color-luxury-accent)]" /> Italian Materials</span>
                <span className="flex items-center gap-1"><CornerDownRight className="w-3 h-3 text-[var(--color-luxury-accent)]" /> Sound Wellness</span>
              </div>
            </div>
          </div>

          {/* Right side narrative essay columns */}
          <div className="lg:col-span-9 flex flex-col gap-6 text-sm md:text-base text-[var(--color-luxury-dark)]/85 font-light leading-relaxed max-w-2xl">
            {paragraphs.map((para, idx) => {
              // Pull drop-cap on first paragraph for premium print layout
              if (idx === 0) {
                return (
                  <p key={idx} className="first-letter:text-5xl first-letter:font-serif first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[var(--color-luxury-accent)]">
                    {para}
                  </p>
                );
              }
              return <p key={idx}>{para}</p>;
            })}

            {/* Print design style pull quote */}
            <div className="bg-[var(--color-luxury-beige)]/40 border-y border-[rgba(142,124,104,0.15)] py-8 px-6 md:px-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center my-6">
              <Quote className="w-10 h-10 text-[var(--color-luxury-accent)] shrink-0 opacity-30 self-start" />
              <p className="font-display italic text-base md:text-lg font-medium text-[var(--color-luxury-dark)]/90 leading-relaxed">
                {isItalian 
                  ? '"Il vero design sostenibile è silenzioso: agisce in modo sottile sullo sfondo, depurando sia l\'acustica che l\'atmosfera."'
                  : '"True sustainable design is silent — it works quietly in the background, purifying both acoustics and atmosphere."'
                }
              </p>
            </div>

            <p>
              {isItalian
                ? "La nostra missione in Nivasa continua a spingere i confini dell'integrazione di materiali pregiati. Lavorando a stretto contatto con architetti e sound designer internazionali, continuiamo a perfezionare i nostri sistemi di assorbimento e riduzione del suono, offrendo ambienti sereni che migliorano direttamente la qualità della vita quotidiana."
                : "Our continuous mission at Nivasa is to push the boundaries of luxury architectural woodcraft and acoustic engineering. Working side-by-side with international designers, we seek to create soundscapes that quiet the world, allowing focused minds and peaceful lifestyles to flourish naturally."
              }
            </p>

            <div className="pt-8 border-t border-[rgba(142,124,104,0.15)] mt-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-luxury-accent)] font-bold">
                  {isItalian ? "COLLABORATORI EDITORIALI" : "EDITORIAL BOARD AUTHORS"}
                </p>
                <p className="text-xs text-[var(--color-luxury-dark)]/70 font-semibold italic mt-0.5">
                  Matteo Nivasa, Elena Vagnini
                </p>
              </div>
              <Link
                href="/#journal"
                className="bg-[var(--color-luxury-dark)] text-[var(--color-luxury-cream)] hover:bg-[var(--color-luxury-accent)] text-[10px] font-mono uppercase tracking-widest font-bold py-3.5 px-6 rounded-full transition-all text-center inline-block"
              >
                {isItalian ? "TORNA ALLA RIVISTA" : "BACK TO JOURNAL"}
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
