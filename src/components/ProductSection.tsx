import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Plus, X, ShieldCheck, Cpu, Sliders, ChevronRight } from 'lucide-react';
import { products } from '../data';
import { Translation, ProductData } from '../types';

interface ProductSectionProps {
  t: Translation;
}

export default function ProductSection({ t }: ProductSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  return (
    <section
      id="products"
      className="relative min-h-screen py-24 md:py-36 bg-[var(--color-luxury-beige)] overflow-hidden"
    >
      <div className="absolute top-[30%] left-[-10%] w-[40vw] h-[40vw] ambient-glow rounded-full" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] ambient-glow rounded-full" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-4 border border-[rgba(142,124,104,0.2)] bg-[var(--color-luxury-cream)] rounded-full px-4 py-1"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)]">
              {t.navProducts}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-luxury-dark)] tracking-tight mb-6"
          >
            {(() => {
              const text = t.productsTitle;
              const words = text.split(" ");
              if (words.length > 1) {
                const firstPart = words.slice(0, -1).join(" ");
                const lastWord = words[words.length - 1];
                return (
                  <>
                    {firstPart}{" "}
                    <span className="font-serif font-light italic text-[var(--color-luxury-accent)]">
                      {lastWord}
                    </span>
                  </>
                );
              }
              return text;
            })()}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="text-sm md:text-base text-[var(--color-luxury-dark)]/70 font-light leading-relaxed text-balance"
          >
            {t.productsSubtitle}
          </motion.p>
        </div>

        {/* Divisions Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="bg-[var(--color-luxury-cream)] border border-[rgba(142,124,104,0.12)] rounded-3xl p-3 flex flex-col shadow-[0_15px_35px_-20px_rgba(30,28,26,0.06)] group"
            >
              {/* Product Card Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[var(--color-luxury-beige)]">
                <img
                  src={prod.image}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-[var(--color-luxury-cream)]/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[rgba(142,124,104,0.1)] shadow-xs">
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-dark)]">
                    {prod.category}
                  </span>
                </div>
              </div>

              {/* Product Info Block */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--color-luxury-dark)] tracking-tight mb-2">
                    {prod.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--color-luxury-dark)]/70 font-light leading-relaxed mb-6 line-clamp-3">
                    {prod.description}
                  </p>
                </div>

                {/* Card CTA Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(142,124,104,0.1)] mt-auto">
                  <span className="font-mono text-[10px] text-[var(--color-luxury-accent)] uppercase tracking-wider font-semibold">
                    MODULAR SYSTEMS
                  </span>
                  
                  <motion.button
                    onClick={() => setSelectedProduct(prod)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[var(--color-luxury-beige)] hover:bg-[var(--color-luxury-accent)] hover:text-[var(--color-luxury-cream)] text-[var(--color-luxury-dark)] border border-[rgba(142,124,104,0.15)] rounded-full px-4 py-2 text-xs font-semibold tracking-wide cursor-pointer transition-colors duration-300 flex items-center gap-1.5"
                  >
                    <span>View Specifications</span>
                    <Plus className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Specifications Overlaid Modal */}
      <AnimatePresence>
        {selectedProduct && (
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
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 z-50 bg-[var(--color-luxury-cream)] border border-[rgba(142,124,104,0.15)] p-2 rounded-full hover:bg-[var(--color-luxury-beige)] cursor-pointer text-[var(--color-luxury-dark)]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Left Column: Big Image & Branding */}
              <div className="w-full md:w-1/2 relative bg-[var(--color-luxury-beige)] aspect-video md:aspect-auto">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold bg-[var(--color-luxury-accent)] px-2.5 py-1 rounded-full mb-2.5 inline-block">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight">
                    {selectedProduct.title}
                  </h3>
                </div>
              </div>

              {/* Modal Right Column: Details and Spec Grid */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[450px] md:max-h-none flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-3">
                    Architectural Impact
                  </h4>
                  <p className="text-sm text-[var(--color-luxury-dark)]/80 font-light leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  {/* Highlights Bullet Grid */}
                  <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-3">
                    Core Attributes & Standards
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5 mb-6">
                    {selectedProduct.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-medium text-[var(--color-luxury-dark)]/90">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Specifications Specs Grid */}
                  <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)] mb-3">
                    Technical Specifications
                  </h4>
                  <div className="bg-[var(--color-luxury-beige)]/60 border border-[rgba(142,124,104,0.1)] rounded-2xl p-4 flex flex-col gap-2 mb-6">
                    {Object.entries(selectedProduct.specs).map(([label, val]) => (
                      <div key={label} className="flex justify-between items-center text-xs pb-1.5 border-b border-[rgba(142,124,104,0.06)] last:border-0 last:pb-0">
                        <span className="text-[var(--color-luxury-dark)]/60 font-light">{label}</span>
                        <span className="font-medium text-[var(--color-luxury-dark)]">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button Anchor */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full bg-[var(--color-luxury-dark)] text-[var(--color-luxury-cream)] hover:bg-[var(--color-luxury-accent)] text-xs font-semibold py-3.5 rounded-full tracking-wide transition-colors duration-300 cursor-pointer"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
