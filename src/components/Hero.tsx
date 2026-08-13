import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Star, 
  Sparkles, 
  Plus, 
  Eye, 
  Share2, 
  Compass, 
  Heart, 
  Volume2, 
  ArrowUpRight 
} from 'lucide-react';
import { Translation } from '../types';

interface HeroProps {
  t: Translation;
}

export default function Hero({ t }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  const isItalian = t.heroTitle.includes("Spazi") || t.heroTitle.includes("persone");

  // Rotating design space categories with premium variety
  const categoryAssets = [
    {
      word: "DRAWING ROOMS",
      wordIt: "SOGGIORNI",
      subtitle: "Living & Salon",
      assets: [
        {
          id: "dr-1",
          title: isItalian ? "Salotto Moderno" : "Modern Salon",
          subtitle: "Bouclé Textile",
          image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "dr-2",
          title: isItalian ? "Atelier Residenziale" : "Atelier Pavilion",
          subtitle: "Carbonized Oak",
          image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "dr-3",
          title: isItalian ? "Tavolo Travertino" : "Travertine Table",
          subtitle: "Honed Stone",
          image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "dr-4",
          title: isItalian ? "Sedia Lounge" : "Lounge Seat",
          subtitle: "Cognac Leather",
          image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
        }
      ]
    },
    {
      word: "CREATIVE OFFICES",
      wordIt: "UFFICI",
      subtitle: "Focus Sanctuaries",
      assets: [
        {
          id: "co-1",
          title: isItalian ? "Scrivania Direzionale" : "Executive Desk",
          subtitle: "Carbonized Oak",
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "co-2",
          title: isItalian ? "Pod Acustico" : "Acoustic Pod",
          subtitle: "Felt Panels",
          image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "co-3",
          title: isItalian ? "Sedia Atelier" : "Atelier Chair",
          subtitle: "Matt Steel",
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "co-4",
          title: isItalian ? "Angolo Libreria" : "Library Corner",
          subtitle: "Fluted Timber",
          image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
        }
      ]
    },
    {
      word: "HOTEL LOUNGES",
      wordIt: "LOUNGE",
      subtitle: "Hospitality Lounge",
      assets: [
        {
          id: "hl-1",
          title: isItalian ? "Divisorio Acustico" : "Acoustic Divider",
          subtitle: "Wool Textile",
          image: "https://images.unsplash.com/photo-1560185127-6a2806647f81?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "hl-2",
          title: isItalian ? "Bar Nivasa" : "Nivasa Bar",
          subtitle: "Piasentina Stone",
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "hl-3",
          title: isItalian ? "Sedute Lobby" : "Lobby Seating",
          subtitle: "Bronze Details",
          image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "hl-4",
          title: isItalian ? "Sofa Terrazza" : "Terrazza Sofa",
          subtitle: "Outdoor Teak",
          image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80",
        }
      ]
    },
    {
      word: "LUXURY SUITES",
      wordIt: "SUITE",
      subtitle: "High-End Suite",
      assets: [
        {
          id: "ls-1",
          title: isItalian ? "Letto a Baldacchino" : "Canopy Bed",
          subtitle: "Natural Ash",
          image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "ls-2",
          title: isItalian ? "Totem Comodino" : "Bedside Totem",
          subtitle: "Walnut Fluting",
          image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "ls-3",
          title: isItalian ? "Angolo Lettura" : "Reading Nook",
          subtitle: "Bouclé Chair",
          image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "ls-4",
          title: isItalian ? "Console Luminosa" : "Sunlit Console",
          subtitle: "Raw Travertine",
          image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80",
        }
      ]
    },
    {
      word: "ACOUSTIC SANCTUARIES",
      wordIt: "STANZE ACOUSTICHE",
      subtitle: "Acoustic Comfort",
      assets: [
        {
          id: "as-1",
          title: isItalian ? "Studio Registrazione" : "Recording Studio",
          subtitle: "Slatted Wood",
          image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "as-2",
          title: isItalian ? "Baffle a Soffitto" : "Ceiling Baffles",
          subtitle: "Sound Felt",
          image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "as-3",
          title: isItalian ? "Sala di Regia" : "Mixing Suite",
          subtitle: "Walnut Diffusers",
          image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
        },
        {
          id: "as-4",
          title: isItalian ? "Scrivania Podcast" : "Podcast Desk",
          subtitle: "Acoustic Wall",
          image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
        }
      ]
    }
  ];

  const currentCategory = categoryAssets[wordIndex];
  const fullWord = isItalian ? currentCategory.wordIt : currentCategory.word;

  // ---- Typewriter-driven word rotation (matches reference recording) ----
  const [typedLength, setTypedLength] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing');

  const TYPE_SPEED = 55;   // ms per character while typing
  const DELETE_SPEED = 28; // ms per character while deleting
  const HOLD_TIME = 1150;  // ms to hold the fully-typed word before deleting
  const SWITCH_GAP = 180;  // ms pause on an empty capsule before the next word starts

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (typedLength < fullWord.length) {
        timeoutId = setTimeout(() => setTypedLength((len) => len + 1), TYPE_SPEED);
      } else {
        timeoutId = setTimeout(() => setPhase('deleting'), HOLD_TIME);
      }
    } else {
      if (typedLength > 0) {
        timeoutId = setTimeout(() => setTypedLength((len) => len - 1), DELETE_SPEED);
      } else {
        timeoutId = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % categoryAssets.length);
          setPhase('typing');
        }, SWITCH_GAP);
      }
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, typedLength, fullWord]);

  const displayedWord = fullWord.slice(0, typedLength);

  // Dynamic dashed card icons to match current category
  const getDashedIcons = (index: number) => {
    switch (index) {
      case 0: return { left: Sparkles, right: Share2 };
      case 1: return { left: Search, right: ArrowUpRight };
      case 2: return { left: Compass, right: Eye };
      case 3: return { left: Heart, right: Star };
      default: return { left: Volume2, right: Sparkles };
    }
  };

  const currentDashedIcons = getDashedIcons(wordIndex);
  const LeftIcon = currentDashedIcons.left;
  const RightIcon = currentDashedIcons.right;

  // Image "wipe" transition (vertical curtain reveal) used when cards swap
  const wipeVariants = {
    initial: { clipPath: 'inset(0% 0% 100% 0%)' },
    animate: { clipPath: 'inset(0% 0% 0% 0%)' },
    exit: { clipPath: 'inset(100% 0% 0% 0%)' },
  };
  const wipeTransition = { duration: 0.65, ease: [0.65, 0, 0.35, 1] as const };

  const handleExplore = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[96vh] lg:min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[var(--color-luxury-beige)] pt-28 pb-10"
    >
      {/* Ambient luxury soft background glow */}
      <div className="absolute top-[8%] left-[15%] w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(243,240,235,0.85)_0%,transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute bottom-[8%] right-[10%] w-[45vw] h-[45vw] bg-[radial-gradient(circle,rgba(243,240,235,0.85)_0%,transparent_70%)] rounded-full pointer-events-none" />

      {/* Central Content Container: No buttons, compact elegant sizing */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center max-w-4xl px-4 select-text my-auto">
        
       

        {/* Dynamic Display Heading - Sized compact & elegant per user request */}
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-extrabold text-zinc-900 leading-[1.15] tracking-tight mb-6 uppercase">
          <span className="flex row items-center justify-center mb-1">
            {isItalian ? "I VOSTRI" : "YOUR"}{" "}
            
            {/* Rotating typewriter capsule / thin-bordered pill */}
            <span className="inline-flex items-center justify-center align-middle">
              <span className="inline-flex items-center justify-center border border-zinc-300 bg-white/90 rounded-full px-4.5 py-1 sm:px-6 sm:py-1.5 mx-1.5 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.04)] h-[1.1em] min-w-[170px] sm:min-w-[240px] md:min-w-[290px] overflow-hidden relative">
                <span className="font-serif font-bold italic text-[var(--color-luxury-accent)] text-1.5xl sm:text-2.5xl md:text-3.5xl lg:text-4xl uppercase tracking-normal whitespace-nowrap">
                  {displayedWord}
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
                    className="inline-block w-[1.5px] h-[0.8em] bg-[var(--color-luxury-accent)] ml-0.5"
                  />
                </span>
              </span>
            </span>
          </span>

          <span className="block text-zinc-900">
            {isItalian ? "SPAZI, PROGETTATI CON CURA." : "SPACES, ARTFULLY CRAFTED."}
          </span>
        </h1>

        {/* Short, elegant design narrative */}
        <p className="text-xs sm:text-sm text-zinc-500 font-light max-w-lg leading-relaxed text-balance">
          {isItalian 
            ? "Meno rumore visivo, più comfort acustico. Nivasa progetta santuari di design contemporaneo su misura con produzione sartoriale 100% Made in Italy."
            : "Less visual noise, more acoustic peace. Nivasa engineers bespoke luxury interior architectural modules, custom millwork, and sound absorbing panels."
          }
        </p>
      </div>

      {/* 
        Bottom Floating Cards Container: Cloned directly from screen recording 
        Beautiful staggered layouts of solid images and dashed outlines 
      */}
      <div className="relative z-20 w-full  mt-auto">
        
        {/* Desktop Layout: Split Left & Right groups, staggered organically at the bottom */}
        <div className="hidden md:flex justify-between items-end w-full mb-2 relative h-[14rem]">
          
          {/* Left Group (Cards 1, 2, 3) */}
          <div className="flex items-end gap-5">
            
            {/* Card 1: Solid Image (Asset 0) */}
            <motion.div
              onClick={handleExplore}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group w-36 h-44 rounded-2xl bg-white p-2 border border-zinc-200/50 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between cursor-pointer transition-colors duration-300 hover:border-zinc-300"
            >
              <div className="relative w-full h-[76%] rounded-xl overflow-hidden bg-zinc-50">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentCategory.assets[0].image}
                    src={currentCategory.assets[0].image}
                    alt={currentCategory.assets[0].title}
                    referrerPolicy="no-referrer"
                    variants={wipeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={wipeTransition}
                    className="absolute inset-0 w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
                  />
                </AnimatePresence>
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/95 flex items-center justify-center shadow-sm text-zinc-700">
                  <Search className="w-3 h-3" />
                </div>
              </div>
              <div className="px-1 py-0.5 flex flex-col min-w-0">
                <span className="font-display font-bold text-[9px] text-zinc-800 uppercase tracking-tight truncate">
                  {currentCategory.assets[0].title}
                </span>
                <span className="font-mono text-[7px] text-zinc-400 uppercase tracking-wider truncate">
                  {currentCategory.assets[0].subtitle}
                </span>
              </div>
            </motion.div>

            {/* Card 2: Dashed Empty Card with Centered Active Left Icon */}
            <div className="w-28 h-36 rounded-2xl border-2 border-dashed border-zinc-300/80 bg-white/30 flex items-center justify-center relative translate-y-3.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)]">
              <div className="w-11 h-11 rounded-full border border-dashed border-zinc-300 bg-white/80 flex items-center justify-center text-zinc-400">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={wordIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <LeftIcon className="w-4.5 h-4.5 stroke-[1.5]" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Card 3: Solid Image (Asset 1) */}
            <motion.div
              onClick={handleExplore}
              whileHover={{ y: -7, scale: 1.02 }}
              className="group w-34 h-42 rounded-2xl bg-white p-2 border border-zinc-200/50 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between -translate-y-2 cursor-pointer transition-colors duration-300 hover:border-zinc-300"
            >
              <div className="relative w-full h-[74%] rounded-xl overflow-hidden bg-zinc-50">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentCategory.assets[1].image}
                    src={currentCategory.assets[1].image}
                    alt={currentCategory.assets[1].title}
                    referrerPolicy="no-referrer"
                    variants={wipeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={wipeTransition}
                    className="absolute inset-0 w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
                  />
                </AnimatePresence>
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/95 flex items-center justify-center shadow-sm text-zinc-700">
                  <Star className="w-3 h-3 text-zinc-800 fill-zinc-800" />
                </div>
              </div>
              <div className="px-1 py-0.5 flex flex-col min-w-0">
                <span className="font-display font-bold text-[9px] text-zinc-800 uppercase tracking-tight truncate">
                  {currentCategory.assets[1].title}
                </span>
                <span className="font-mono text-[7px] text-zinc-400 uppercase tracking-wider truncate">
                  {currentCategory.assets[1].subtitle}
                </span>
              </div>
            </motion.div>

          </div>

          {/* Right Group (Cards 4, 5, 6) */}
          <div className="flex items-end gap-5">

            {/* Card 4: Solid Image (Asset 2) */}
            <motion.div
              onClick={handleExplore}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group w-36 h-44 rounded-2xl bg-white p-2 border border-zinc-200/50 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between cursor-pointer transition-colors duration-300 hover:border-zinc-300"
            >
              <div className="relative w-full h-[76%] rounded-xl overflow-hidden bg-zinc-50">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentCategory.assets[2].image}
                    src={currentCategory.assets[2].image}
                    alt={currentCategory.assets[2].title}
                    referrerPolicy="no-referrer"
                    variants={wipeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={wipeTransition}
                    className="absolute inset-0 w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
                  />
                </AnimatePresence>
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/95 flex items-center justify-center shadow-sm text-zinc-700">
                  <Plus className="w-3 h-3" />
                </div>
              </div>
              <div className="px-1 py-0.5 flex flex-col min-w-0">
                <span className="font-display font-bold text-[9px] text-zinc-800 uppercase tracking-tight truncate">
                  {currentCategory.assets[2].title}
                </span>
                <span className="font-mono text-[7px] text-zinc-400 uppercase tracking-wider truncate">
                  {currentCategory.assets[2].subtitle}
                </span>
              </div>
            </motion.div>

            {/* Card 5: Dashed Empty Card with Centered Active Right Icon */}
            <div className="w-28 h-36 rounded-2xl border-2 border-dashed border-zinc-300/80 bg-white/30 flex items-center justify-center relative translate-y-3.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.01)]">
              <div className="w-11 h-11 rounded-full border border-dashed border-zinc-300 bg-white/80 flex items-center justify-center text-zinc-400">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={wordIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <RightIcon className="w-4.5 h-4.5 stroke-[1.5]" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Card 6: Solid Image (Asset 3) */}
            <motion.div
              onClick={handleExplore}
              whileHover={{ y: -7, scale: 1.02 }}
              className="group w-34 h-42 rounded-2xl bg-white p-2 border border-zinc-200/50 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between -translate-y-2 cursor-pointer transition-colors duration-300 hover:border-zinc-300"
            >
              <div className="relative w-full h-[74%] rounded-xl overflow-hidden bg-zinc-50">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentCategory.assets[3].image}
                    src={currentCategory.assets[3].image}
                    alt={currentCategory.assets[3].title}
                    referrerPolicy="no-referrer"
                    variants={wipeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={wipeTransition}
                    className="absolute inset-0 w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
                  />
                </AnimatePresence>
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/95 flex items-center justify-center shadow-sm text-zinc-700">
                  <Sparkles className="w-3 h-3 text-zinc-800 fill-zinc-800" />
                </div>
              </div>
              <div className="px-1 py-0.5 flex flex-col min-w-0">
                <span className="font-display font-bold text-[9px] text-zinc-800 uppercase tracking-tight truncate">
                  {currentCategory.assets[3].title}
                </span>
                <span className="font-mono text-[7px] text-zinc-400 uppercase tracking-wider truncate">
                  {currentCategory.assets[3].subtitle}
                </span>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Mobile/Tablet Layout: Clean horizontal-scroll feed matching the desktop aesthetic */}
        <div className="flex md:hidden w-full overflow-x-auto pb-4 pt-2 scrollbar-none gap-4 snap-x snap-mandatory pointer-events-auto">
          
          {/* Card 1 */}
          <div className="w-34 h-42 bg-white p-2 border border-zinc-200/60 rounded-2xl shrink-0 snap-center shadow-md flex flex-col justify-between">
            <div className="relative w-full h-[74%] rounded-xl overflow-hidden bg-zinc-100">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={currentCategory.assets[0].image}
                  src={currentCategory.assets[0].image}
                  alt={currentCategory.assets[0].title}
                  referrerPolicy="no-referrer"
                  variants={wipeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={wipeTransition}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="px-1 flex flex-col min-w-0">
              <span className="font-display font-bold text-[9px] text-zinc-800 uppercase truncate">
                {currentCategory.assets[0].title}
              </span>
              <span className="font-mono text-[7px] text-zinc-400 uppercase truncate">
                {currentCategory.assets[0].subtitle}
              </span>
            </div>
          </div>

          {/* Card 2 (Dashed empty) */}
          <div className="w-24 h-34 rounded-2xl border border-dashed border-zinc-300/80 bg-white/20 flex items-center justify-center shrink-0 snap-center self-center">
            <div className="w-9 h-9 rounded-full border border-dashed border-zinc-300 flex items-center justify-center text-zinc-400">
              <LeftIcon className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-34 h-42 bg-white p-2 border border-zinc-200/60 rounded-2xl shrink-0 snap-center shadow-md flex flex-col justify-between">
            <div className="relative w-full h-[74%] rounded-xl overflow-hidden bg-zinc-100">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={currentCategory.assets[1].image}
                  src={currentCategory.assets[1].image}
                  alt={currentCategory.assets[1].title}
                  referrerPolicy="no-referrer"
                  variants={wipeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={wipeTransition}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="px-1 flex flex-col min-w-0">
              <span className="font-display font-bold text-[9px] text-zinc-800 uppercase truncate">
                {currentCategory.assets[1].title}
              </span>
              <span className="font-mono text-[7px] text-zinc-400 uppercase truncate">
                {currentCategory.assets[1].subtitle}
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-34 h-42 bg-white p-2 border border-zinc-200/60 rounded-2xl shrink-0 snap-center shadow-md flex flex-col justify-between">
            <div className="relative w-full h-[74%] rounded-xl overflow-hidden bg-zinc-100">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={currentCategory.assets[2].image}
                  src={currentCategory.assets[2].image}
                  alt={currentCategory.assets[2].title}
                  referrerPolicy="no-referrer"
                  variants={wipeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={wipeTransition}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="px-1 flex flex-col min-w-0">
              <span className="font-display font-bold text-[9px] text-zinc-800 uppercase truncate">
                {currentCategory.assets[2].title}
              </span>
              <span className="font-mono text-[7px] text-zinc-400 uppercase truncate">
                {currentCategory.assets[2].subtitle}
              </span>
            </div>
          </div>

          {/* Card 5 (Dashed empty) */}
          <div className="w-24 h-34 rounded-2xl border border-dashed border-zinc-300/80 bg-white/20 flex items-center justify-center shrink-0 snap-center self-center">
            <div className="w-9 h-9 rounded-full border border-dashed border-zinc-300 flex items-center justify-center text-zinc-400">
              <RightIcon className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6 */}
          <div className="w-34 h-42 bg-white p-2 border border-zinc-200/60 rounded-2xl shrink-0 snap-center shadow-md flex flex-col justify-between">
            <div className="relative w-full h-[74%] rounded-xl overflow-hidden bg-zinc-100">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={currentCategory.assets[3].image}
                  src={currentCategory.assets[3].image}
                  alt={currentCategory.assets[3].title}
                  referrerPolicy="no-referrer"
                  variants={wipeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={wipeTransition}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="px-1 flex flex-col min-w-0">
              <span className="font-display font-bold text-[9px] text-zinc-800 uppercase truncate">
                {currentCategory.assets[3].title}
              </span>
              <span className="font-mono text-[7px] text-zinc-400 uppercase truncate">
                {currentCategory.assets[3].subtitle}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
