import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Instagram, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import { Translation } from '../types';
import { navigateTo, Link } from '../utils/router';

interface FooterProps {
  t: Translation;
}

export default function Footer({ t }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = (id: string) => {
    if (window.location.pathname !== '/') {
      navigateTo('/#' + id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  return (
    <footer className="bg-[var(--color-luxury-dark)] text-[#DFD9D1] pt-20 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] ambient-glow opacity-10 rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] ambient-glow opacity-10 rounded-full" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        
        {/* Top block: Newsletter and Branding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#DFD9D1]/10 items-start">
          
          {/* Logo & Narrative */}
          <div className="lg:col-span-5">
            <span className="font-display font-black tracking-widest text-3xl text-[var(--color-luxury-cream)] block mb-4">
              Nivasa
            </span>
            <p className="text-sm font-light text-[#DFD9D1]/75 max-w-md leading-relaxed select-text">
              Designing acoustics, custom furniture, and silent interiors that harmonize wellness, indian wooden craft, and physical peace.
            </p>

            <div className="flex gap-4 mt-6">
              {[
                { icon: <Instagram className="w-4 h-4" />, url: "https://instagram.com" },
                { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com" }
              ].map((soc, idx) => (
                <motion.a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, backgroundColor: "#8E7C68", color: "#ffffff" }}
                  className="w-10 h-10 rounded-full bg-[#DFD9D1]/5 border border-[#DFD9D1]/10 flex items-center justify-center transition-all cursor-pointer"
                >
                  {soc.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Subscription Box */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h4 className="font-display font-medium text-lg text-[var(--color-luxury-cream)] mb-3 text-balance">
              {t.footerSubscribe}
            </h4>
            
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row gap-3 w-full max-w-lg relative mt-2"
                >
                  <input
                    type="email"
                    required
                    placeholder={t.footerPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#DFD9D1]/5 text-white placeholder-[#DFD9D1]/40 border border-[#DFD9D1]/10 rounded-2xl px-5 py-4 focus:outline-hidden focus:border-[var(--color-luxury-accent)] text-sm transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[var(--color-luxury-accent)] hover:bg-[var(--color-luxury-cream)] hover:text-[var(--color-luxury-dark)] text-[var(--color-luxury-cream)] px-7 py-4 rounded-2xl text-xs font-semibold tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <span>{t.footerButton}</span>
                    <Send className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-600/10 border border-emerald-600/30 rounded-2xl p-4 flex items-center gap-3 w-full max-w-lg mt-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">Successfully Subscribed</span>
                    <span className="text-[10px] text-[#DFD9D1]/70 block mt-0.5">Thank you. You have been added to our catalog circulation lists.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

         {/* Middle block: Directories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-[#DFD9D1]/10">
          
          {/* Col 1: Collections */}
          <div>
            <h5 className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-4">
              COLLECTIONS
            </h5>
            <ul className="flex flex-col gap-2 text-xs font-light text-[#DFD9D1]/70">
              <li><button onClick={() => handleScroll('products')} className="hover:text-white transition-colors cursor-pointer text-left">Acoustic Panels</button></li>
              <li><button onClick={() => handleScroll('products')} className="hover:text-white transition-colors cursor-pointer text-left">Modular Furniture</button></li>
              <li><button onClick={() => handleScroll('products')} className="hover:text-white transition-colors cursor-pointer text-left">Phone Booths</button></li>
              <li><button onClick={() => handleScroll('products')} className="hover:text-white transition-colors cursor-pointer text-left">Soundproof Partitions</button></li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div>
            <h5 className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-4">
              COMPANY
            </h5>
            <ul className="flex flex-col gap-2 text-xs font-light text-[#DFD9D1]/70">
              <li><button onClick={() => handleScroll('about')} className="hover:text-white transition-colors cursor-pointer text-left">Chi Siamo / Philosophy</button></li>
              <li><button onClick={() => handleScroll('about')} className="hover:text-white transition-colors cursor-pointer text-left">indian Craftsmanship</button></li>
              <li><button onClick={() => handleScroll('about')} className="hover:text-white transition-colors cursor-pointer text-left">FSC Timber & Certifications</button></li>
              <li><button onClick={() => handleScroll('journal')} className="hover:text-white transition-colors cursor-pointer text-left">News & Press</button></li>
            </ul>
          </div>

          {/* Col 3: Legal & Standards */}
          <div>
            <h5 className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-4">
              STANDARDS
            </h5>
            <ul className="flex flex-col gap-2 text-xs font-light text-[#DFD9D1]/70">
              <li><span className="opacity-75">CE Certified</span></li>
              <li><span className="opacity-75">Euroclass B-s1, d0</span></li>
              <li><span className="opacity-75">LEED Gold Contributor</span></li>
              <li><span className="opacity-75">ISO 9001 Quality System</span></li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <h5 className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-4">
              OFFICES & LAB
            </h5>
            <p className="text-xs font-light text-[#DFD9D1]/75 leading-relaxed select-text">
              Via dell'Artigianato, 12<br />
              61122 Pesaro (PU), Italy<br />
              <span className="font-medium text-white block mt-2">info@Nivasa.com</span>
            </p>
          </div>

        </div>

        {/* Bottom block: legal copy and back to top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 text-[10px] text-[#DFD9D1]/55 font-light">
          <span>{t.footerCopy}</span>
          
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#DFD9D1]/5 hover:bg-[var(--color-luxury-accent)] border border-[#DFD9D1]/10 rounded-full w-10 h-10 flex items-center justify-center text-[#DFD9D1] hover:text-white cursor-pointer transition-colors duration-200 shadow-xs"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
