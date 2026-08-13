import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, ChevronDown } from 'lucide-react';
import { Language, Translation } from '../types';
import { navigateTo, Link } from '../utils/router';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

export default function Navbar({ language, setLanguage, t }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      // Only watch dark sections if we are on the homepage
      if (window.location.pathname !== '/') {
        setIsOverDarkSection(false);
        return;
      }
      let overDark = false;
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        if (rect.top <= 30 && rect.bottom >= 30) {
          overDark = true;
        }
      }
      const footerEl = document.querySelector('footer');
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        if (rect.top <= 30) {
          overDark = true;
        }
      }
      setIsOverDarkSection(overDark);
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    handleScrollEvent();

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  // Smooth scroll to sections or route to home first
  const handleScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigateTo('/#' + id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    if (window.location.pathname !== '/') {
      navigateTo('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 py-3 md:px-8 md:py-5 flex justify-between items-center pointer-events-none">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Logo Button - plain text, no border/background, dynamic color */}
          <motion.button
            onClick={handleLogoClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-transparent border-0 p-0 shadow-none flex items-center cursor-pointer select-none focus:outline-hidden"
          >
            <span className={`font-display font-bold tracking-widest text-lg md:text-xl transition-colors duration-500 ${
              isOverDarkSection ? 'text-white' : 'text-[var(--color-luxury-dark)]'
            }`}>
              NivaSa
            </span>
          </motion.button>
        </div>

        {/* Right Side Desktop: Nav Links & Language Switcher */}
        <nav className="hidden md:flex items-center gap-3 pointer-events-auto">
          {/* Main Links Container */}
          <div className="bg-[var(--color-luxury-cream)] border border-[rgba(142,124,104,0.15)] rounded-full px-1.5 py-1.5 shadow-xs flex items-center gap-1">
            {[
              { label: t.navProducts, id: 'products' },
              { label: t.navAbout, id: 'about' },
              { label: t.navSustainability, id: 'sustainability' },
              { label: t.navJournal, id: 'journal' },
            ].map((link) => (
              <motion.button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2 rounded-full text-[10px] font-bold tracking-wider text-[var(--color-luxury-dark)] hover:bg-[var(--color-luxury-beige)] cursor-pointer transition-colors duration-300"
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center gap-2 pointer-events-auto">
          {/* Mobile dropdown/quick switcher */}
          <button
            onClick={() => setLanguage(language === 'EN' ? 'IT' : 'EN')}
            className="bg-[var(--color-luxury-cream)] border border-[rgba(142,124,104,0.15)] px-3 py-2.5 rounded-full text-[10px] font-bold text-[var(--color-luxury-dark)] transition-colors duration-200"
          >
            {language}
          </button>

          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--color-luxury-cream)] border border-[rgba(142,124,104,0.15)] rounded-full p-2.5 shadow-xs flex items-center justify-center cursor-pointer text-[var(--color-luxury-dark)]"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-full z-40 bg-[var(--color-luxury-cream)] border-b border-[rgba(142,124,104,0.1)] pt-24 pb-8 px-6 shadow-xl"
          >
            <div className="flex flex-col gap-4 text-center">
              {[
                { label: t.navProducts, id: 'products' },
                { label: t.navAbout, id: 'about' },
                { label: t.navSustainability, id: 'sustainability' },
                { label: t.navJournal, id: 'journal' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="py-3 text-lg font-display font-medium text-[var(--color-luxury-dark)] active:bg-[var(--color-luxury-beige)] rounded-lg w-full text-center block"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
