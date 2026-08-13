import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProductSection from './components/ProductSection';
import InteractiveCustomizer from './components/InteractiveCustomizer';
import GallerySection from './components/GallerySection';
import JournalSection from './components/JournalSection';
import Footer from './components/Footer';

import JournalArchive from './pages/JournalArchive';
import JournalDetail from './pages/JournalDetail';

import { translations } from './data';
import { Language } from './types';
import { usePathname } from './utils/router';

export default function App() {
  const [language, setLanguage] = useState<Language>('EN');
  const [isAcousticMode, setIsAcousticMode] = useState(false);
  const [showScrollTip, setShowScrollTip] = useState(true);
  
  const pathname = usePathname();

  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Watch scroll to show/hide back-to-top / scroll tip
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTip(false);
      } else {
        setShowScrollTip(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle hash-scrolling on homepage mount (when returning from subpages)
  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  }, [pathname]);

  const t = translations[language];

  // Route routing logic
  const isJournalDetail = pathname.startsWith('/journal/') && pathname.length > 9;
  const journalSlug = isJournalDetail ? pathname.substring(9) : '';
  const isJournalArchive = pathname === '/journal' || pathname === '/journal/';

  return (
    <div className="relative min-h-screen bg-[var(--color-luxury-beige)] selection:bg-[var(--color-luxury-accent)] selection:text-white">
      {/* Background ambient texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.025] mix-blend-overlay bg-repeat bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=40&q=20')]" />

      {/* Navigation Header */}
      <Navbar language={language} setLanguage={setLanguage} t={t} />

      {/* Core Sections Stack */}
      <main className="relative">
        {isJournalDetail ? (
          <JournalDetail slug={journalSlug} language={language} />
        ) : isJournalArchive ? (
          <JournalArchive language={language} />
        ) : (
          <>
            <Hero t={t} />
            <AboutSection t={t} />
            <ProductSection t={t} />
            <InteractiveCustomizer t={t} />
            <GallerySection t={t} />
            <JournalSection t={t} />
          </>
        )}
      </main>

      {/* Elegant Footer */}
      <Footer t={t} />

      {/* Floating Interactive Widget: Sound Wave Silence Simulator (Bottom Left) */}
      {/* <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3">
        <motion.button
          onClick={() => setIsAcousticMode(!isAcousticMode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`h-12 rounded-full px-5 border flex items-center gap-3 cursor-pointer transition-all duration-500 shadow-lg ${
            isAcousticMode
              ? 'bg-[var(--color-luxury-accent)] border-transparent text-[var(--color-luxury-cream)]'
              : 'bg-[var(--color-luxury-cream)] border-[rgba(142,124,104,0.2)] text-[var(--color-luxury-dark)] hover:border-[var(--color-luxury-accent)]'
          }`}
        >
          {isAcousticMode ? (
            <Volume2 className="w-4 h-4 text-white animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[var(--color-luxury-accent)]" />
          )}
          
          <span className="font-mono text-[9px] uppercase tracking-widest font-bold">
            {isAcousticMode ? t.acousticCalmOn : t.acousticCalmOff}
          </span>

          <div className="flex items-end gap-[2px] h-3">
            {[6, 12, 8, 14, 4].map((h, idx) => (
              <motion.div
                key={idx}
                animate={isAcousticMode ? { height: [h, h / 3, h * 1.2, h] } : { height: 2 }}
                transition={{
                  duration: 0.6 + idx * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`w-[2px] rounded-full ${isAcousticMode ? 'bg-white' : 'bg-[var(--color-luxury-accent)]'}`}
                style={{ height: 2 }}
              />
            ))}
          </div>
        </motion.button>

        <AnimatePresence>
          {isAcousticMode && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-md border border-[rgba(142,124,104,0.15)] rounded-2xl px-4 py-2.5 shadow-xl max-w-[240px]"
            >
              <div className="flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-luxury-accent)]" />
                <span className="font-mono text-[8px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)]">
                  {t.simulatedReverberation}
                </span>
              </div>
              <p className="text-[10px] text-[var(--color-luxury-dark)]/85 leading-relaxed font-light">
                {t.acousticCalmDesc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}
    </div>
  );
}
