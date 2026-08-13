import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowUpRight, X, ShieldCheck, Hammer, Sparkles, Building } from 'lucide-react';
import { projects } from '../data';
import { Translation } from '../types';

interface GallerySectionProps {
  t: Translation;
}

// Word-by-word scroll highlight helper component
function ScrollWord({ children, progress, range }: { children: string; progress: any; range: [number, number]; key?: any }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const color = useTransform(progress, range, ["rgba(30,28,26,0.35)", "rgba(30,28,26,1)"]);
  
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em] transition-all duration-150">
      {children}
    </motion.span>
  );
}

function ScrollHighlightedText({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.45"]
  });

  const words = text.split(" ");
  return (
    <h3 
      ref={containerRef} 
      className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-4.5xl font-semibold tracking-tight leading-tight flex flex-wrap max-w-3xl"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </h3>
  );
}

// Elegant Case Study detailed data mapped to project IDs for authentic interactive portfolio feel
interface ProjectCaseStudy {
  materials: string[];
  materialsIt: string[];
  challenge: string;
  challengeIt: string;
  result: string;
  resultIt: string;
  acousticMetric: string;
  acousticMetricLabel: string;
  acousticMetricLabelIt: string;
}

const caseStudies: Record<number, ProjectCaseStudy> = {
  1: {
    materials: ["Canaletto Walnut Slatted Wall Panels", "9mm Recycled PET Acoustic Felt", "Custom Silent Joinery"],
    materialsIt: ["Pannelli a Parete Dogati in Noce Canaletto", "Feltro Acustico in PET Riciclato da 9mm", "Arredi Silenziosi su Misura"],
    challenge: "The villa's vast open spaces and floor-to-ceiling glass walls caused excessive echoing and sound resonance, compromising conversational privacy.",
    challengeIt: "I grandi spazi aperti e le pareti vetrate a tutta altezza della villa causavano un'eccessiva risonanza ed eco, compromettendo la privacy conversazionale.",
    result: "We integrated slatted walnut wall systems directly into the interior paneling. Reverberation was reduced to golden acoustic standards while maintaining Lake Como's organic design aesthetic.",
    resultIt: "Abbiamo integrato sistemi a parete in noce dogato direttamente nella pannellatura. La riverberazione è stata ridotta agli standard acustici ideali preservando il design organico.",
    acousticMetric: "-1.2s",
    acousticMetricLabel: "Reverberation Time Reduction",
    acousticMetricLabelIt: "Riduzione Tempo Riverbero"
  },
  2: {
    materials: ["Bleached Ash Acoustic Workstations", "Overhead Sound Absorptive Felt Clouds", "Silent Office Phone Pods"],
    materialsIt: ["Postazioni Acustiche in Frassino Sbiancato", "Nuvolette di Feltro Fonoassorbente Sospese", "Cabine Telefoniche Silenziose"],
    challenge: "An open architectural collective layout suffered from heavy keystroke noises, phone chatter, and high-frequency background hum.",
    challengeIt: "Un layout condiviso soffriva del rumore pesante dei tasti, chiacchiere telefoniche e ronzii di sottofondo ad alta frequenza.",
    result: "Suspended customized light grey felt clouds paired with solid ash desks. This local acoustic zoning restored private focus to team areas.",
    resultIt: "Sospese nuvolette sagomate in feltro abbinate a scrivanie in frassino. Questa zonizzazione ha restituito concentrazione privata alle aree di lavoro.",
    acousticMetric: "88%",
    acousticMetricLabel: "High Frequency Reflection Muted",
    acousticMetricLabelIt: "Riflessione Alte Frequenze Smorzata"
  },
  3: {
    materials: ["Carbonized Black Oak Wall Fluting", "Concealed Basotect® Absorption Liners", "Soundproof Leather Sconces"],
    materialsIt: ["Scanalature a Parete in Rovere Nero Carbonizzato", "Fodere fonoassorbenti Basotect® a Scomparsa", "Applique in Pelle Insonorizzate"],
    challenge: "A central executive meeting boardroom required strict acoustic confidentiality and speech clarity, with sleek minimal design.",
    challengeIt: "Una sala riunioni direzionale richiedeva assoluta riservatezza acustica e chiarezza del parlato, con un design minimalista elegante.",
    result: "Double-walled charcoal oak ribs layered with fire-rated Basotect foam, dampening echoes and sealing the room to an outstanding -28dB isolation rating.",
    resultIt: "Nervature in rovere carbone a doppia parete con schiuma Basotect, che attenuano gli echi e sigillano la sala a un isolamento di -28dB.",
    acousticMetric: "0.45s",
    acousticMetricLabel: "Target RT60 Speech Clarity Index",
    acousticMetricLabelIt: "Indice di Chiarezza del Parlato RT60"
  },
  4: {
    materials: ["Solid Walnut Ceilings", "Micro-Perforated Sub-layers", "Heavy Impact Sound Gliders"],
    materialsIt: ["Controsoffitti in Noce Massello", "Sotto-strati Microperforati", "Giunti Antivibranti per Rumore da Impatto"],
    challenge: "A mountain boutique lounge faced high acoustic feedback from heavy winter boots on timber floors and crackling fireplace resonance.",
    challengeIt: "Una lounge di montagna affrontava un forte feedback acustico dovuto a scarponi pesanti sui pavimenti in legno e la risonanza del camino.",
    result: "Applied micro-perforated natural timber panels to ceilings and backed them with sound barrier curtains, filtering structural vibration completely.",
    resultIt: "Applicati pannelli in legno naturale microperforati ai soffitti e retro-rivestiti con barriere acustiche, eliminando ogni vibrazione strutturale.",
    acousticMetric: "+24dB",
    acousticMetricLabel: "Impact Sound Insulation Increase",
    acousticMetricLabelIt: "Aumento Isolamento da Calpestio"
  }
};

export default function GallerySection({ t }: GallerySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const isItalian = t.customizerTitle.includes("Tela") || t.customizerTitle.includes("Spaziale");

  // Parallax for the gallery section heading background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const textParallax = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const slide = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth, scrollLeft } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="sustainability"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-[var(--color-luxury-beige)] overflow-hidden"
    >
      {/* Huge background luxury text moving with scroll parallax */}
      <motion.div
        style={{ x: textParallax }}
        className="absolute top-10 left-0 text-[12vw] font-display font-black text-[rgba(30,28,26,0.03)] uppercase tracking-widest whitespace-nowrap pointer-events-none select-none"
      >
        Indian ARCHITECTURE
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        
        {/* Section Header with Left/Right Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <div className="mb-4 border border-[rgba(142,124,104,0.2)] bg-[var(--color-luxury-cream)] rounded-full px-4 py-1 inline-block">
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)]">
                {isItalian ? "PROGETTI SELEZIONATI" : "CURATED PROJECTS"}
              </span>
            </div>
            
            {/* Elegant word-by-word scroll-highlighting subtitle */}
            <ScrollHighlightedText text={t.gallerySubtitle} />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <motion.button
              disabled={!canScrollLeft}
              onClick={() => slide('left')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                canScrollLeft
                  ? 'bg-[var(--color-luxury-cream)] border-[rgba(142,124,104,0.2)] text-[var(--color-luxury-dark)] hover:border-[var(--color-luxury-accent)]'
                  : 'bg-[var(--color-luxury-cream)]/30 border-[rgba(142,124,104,0.08)] text-[var(--color-luxury-dark)]/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              disabled={!canScrollRight}
              onClick={() => slide('right')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                canScrollRight
                  ? 'bg-[var(--color-luxury-cream)] border-[rgba(142,124,104,0.2)] text-[var(--color-luxury-dark)] hover:border-[var(--color-luxury-accent)]'
                  : 'bg-[var(--color-luxury-cream)]/30 border-[rgba(142,124,104,0.08)] text-[var(--color-luxury-dark)]/30 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Sliding Runway Content */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 md:gap-8 pb-10 scroll-smooth snap-x snap-mandatory scrollbar-none scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
              className="snap-start shrink-0 w-[85vw] sm:w-[50vw] lg:w-[35vw] bg-[var(--color-luxury-cream)] rounded-3xl p-3 border border-[rgba(142,124,104,0.12)] shadow-[0_10px_30px_-15px_rgba(30,28,26,0.05)] hover:border-[var(--color-luxury-accent)]/40 transition-colors duration-300 group relative cursor-pointer"
            >
              {/* Runway Image Container */}
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-[var(--color-luxury-beige)]">
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out animate-lazy"
                />
                
                {/* Image Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60" />

                {/* Floating Year Pill */}
                <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-xs border border-white/20 px-3 py-1 rounded-full">
                  <span className="font-mono text-[9px] font-bold text-[var(--color-luxury-dark)]">
                    {proj.year}
                  </span>
                </div>

                {/* Bottom branding overlay */}
                <div className="absolute bottom-5 left-5 text-white">
                  <span className="font-mono text-[8px] uppercase tracking-widest font-bold opacity-75">
                    {proj.location}
                  </span>
                  <h4 className="font-display font-semibold text-lg md:text-xl tracking-tight mt-0.5">
                    {proj.title}
                  </h4>
                </div>
              </div>

              {/* Bottom Spec drawer detailed elements */}
              <div className="mt-4 px-2 pb-2 flex justify-between items-center text-xs text-[var(--color-luxury-dark)]/70">
                <div className="flex gap-4">
                  <div>
                    <span className="font-mono text-[8px] uppercase block tracking-wider opacity-60">{isItalian ? "AMBITO" : "SCOPE"}</span>
                    <span className="font-medium text-[var(--color-luxury-dark)]">{isItalian ? "Arredo Acustico" : "Acoustic Furnishing"}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] uppercase block tracking-wider opacity-60">{isItalian ? "MISURA" : "SIZE"}</span>
                    <span className="font-medium text-[var(--color-luxury-dark)]">{proj.size}</span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  className="w-8 h-8 rounded-full bg-[var(--color-luxury-beige)] border border-[rgba(142,124,104,0.15)] flex items-center justify-center cursor-pointer hover:bg-[var(--color-luxury-accent)] hover:text-white transition-colors duration-200"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Details Overlaid Modal for rich portfolio interactivity */}
      <AnimatePresence>
        {selectedProject && (() => {
          const study = caseStudies[selectedProject.id];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.94, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 30 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="bg-[var(--color-luxury-cream)] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative border border-[rgba(142,124,104,0.15)] max-h-[90vh] flex flex-col md:flex-row"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 z-50 bg-[var(--color-luxury-cream)] border border-[rgba(142,124,104,0.15)] p-2 rounded-full hover:bg-[var(--color-luxury-beige)] cursor-pointer text-[var(--color-luxury-dark)] shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Side: Massive Image with dynamic info overlay */}
                <div className="w-full md:w-1/2 relative bg-[var(--color-luxury-beige)] aspect-video md:aspect-auto">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 text-white pr-6">
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold bg-[var(--color-luxury-accent)] px-3 py-1 rounded-full mb-3.5 inline-block">
                      {selectedProject.location}
                    </span>
                    <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight leading-tight mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="font-mono text-[10px] opacity-80 uppercase tracking-widest">
                      {isItalian ? `MISURA: ${selectedProject.size} • ANNO: ${selectedProject.year}` : `SIZE: ${selectedProject.size} • COMPLETED: ${selectedProject.year}`}
                    </p>
                  </div>
                </div>

                {/* Right Side: Detailed specs, challenges, results */}
                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[450px] md:max-h-none flex flex-col justify-between select-text">
                  <div className="flex flex-col gap-6">
                    
                    {/* Diagnostic Metric Circle block */}
                    <div className="flex items-center gap-4 bg-[var(--color-luxury-beige)] border border-[rgba(142,124,104,0.15)] rounded-2xl p-4">
                      <div className="w-14 h-14 rounded-full bg-[var(--color-luxury-dark)] flex items-center justify-center text-[var(--color-luxury-cream)] font-mono text-lg font-bold shadow-xs shrink-0">
                        {study.acousticMetric}
                      </div>
                      <div>
                        <h5 className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-luxury-accent)] font-bold">
                          {isItalian ? "PRESTAZIONE ACUSTICA" : "ACOUSTIC PERFORMANCE"}
                        </h5>
                        <p className="text-xs font-semibold text-[var(--color-luxury-dark)] leading-tight mt-0.5">
                          {isItalian ? study.acousticMetricLabelIt : study.acousticMetricLabel}
                        </p>
                      </div>
                    </div>

                    {/* Challenge and Solutions */}
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-1.5 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" />
                        {isItalian ? "IL PROGETTO" : "ARCHITECTURAL CHALLENGE"}
                      </h4>
                      <p className="text-xs text-[var(--color-luxury-dark)]/80 font-light leading-relaxed">
                        {isItalian ? study.challengeIt : study.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {isItalian ? "RISOLUZIONE Nivasa" : "Nivasa COMPOSITION & RESULT"}
                      </h4>
                      <p className="text-xs text-[var(--color-luxury-dark)]/80 font-light leading-relaxed">
                        {isItalian ? study.resultIt : study.result}
                      </p>
                    </div>

                    {/* Core Materials Used */}
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-2 flex items-center gap-1.5">
                        <Hammer className="w-3.5 h-3.5" />
                        {isItalian ? "MATERIALI SPECIFICATI" : "SPECIFIED ARCHITECTURAL MATERIALS"}
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {(isItalian ? study.materialsIt : study.materials).map((mat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="text-xs font-medium text-[var(--color-luxury-dark)]/85">{mat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full bg-[var(--color-luxury-dark)] text-[var(--color-luxury-cream)] hover:bg-[var(--color-luxury-accent)] text-xs font-semibold py-3.5 rounded-full tracking-wider transition-colors duration-300 cursor-pointer mt-8"
                  >
                    {isItalian ? "Chiudi Studio di Progetto" : "Close Case Study"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
