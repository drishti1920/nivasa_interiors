import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Clock, ArrowLeft, Home } from 'lucide-react';
import { journalItems, translations } from '../data';
import { idToSlugMap, Link } from '../utils/router';
import { Language } from '../types';

interface JournalArchiveProps {
  language: Language;
}

export default function JournalArchive({ language }: JournalArchiveProps) {
  const t = translations[language];
  const isItalian = language === 'IT';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-luxury-cream)] pt-28 pb-20">
      {/* Decorative ambient elements */}
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] ambient-glow rounded-full pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[35vw] h-[35vw] ambient-glow rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        
        {/* Editorial Navigation breadcrumb */}
        <div className="flex justify-between items-center border-b border-[rgba(142,124,104,0.12)] pb-4 mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-luxury-dark)] hover:text-[var(--color-luxury-accent)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
              {isItalian ? "Torna alla Home" : "Back to Home"}
            </span>
          </Link>

          <Link href="/" className="p-2 rounded-full border border-[rgba(142,124,104,0.15)] hover:border-[var(--color-luxury-accent)] text-[var(--color-luxury-dark)] hover:text-[var(--color-luxury-accent)] transition-colors">
            <Home className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 border border-[rgba(142,124,104,0.2)] bg-[var(--color-luxury-beige)] rounded-full px-4 py-1 inline-block">
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)]">
              {isItalian ? "PUBBLICAZIONI" : "Nivasa JOURNAL"}
            </span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-[var(--color-luxury-dark)] tracking-tight mb-6">
            {isItalian ? (
              <>
                Spazi di{" "}
                <span className="font-serif font-light italic text-[var(--color-luxury-accent)]">
                  Silenzio
                </span>
              </>
            ) : (
              <>
                Spaces of{" "}
                <span className="font-serif font-light italic text-[var(--color-luxury-accent)]">
                  Silence
                </span>
              </>
            )}
          </h1>
          
          <p className="text-sm md:text-base text-[var(--color-luxury-dark)]/70 font-light leading-relaxed">
            {t.journalSubtitle}
          </p>
        </div>

        {/* Grid of articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journalItems.map((post, idx) => {
            const slug = idToSlugMap[post.id] || String(post.id);
            const detailUrl = `/journal/${slug}`;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="flex flex-col h-full bg-[var(--color-luxury-beige)]/30 border border-[rgba(142,124,104,0.1)] rounded-3xl p-3 shadow-xs hover:border-[var(--color-luxury-accent)] transition-all duration-300 group"
              >
                {/* Image Link Box */}
                <Link href={detailUrl} className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-[var(--color-luxury-beige)] mb-5 block">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-25 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out"
                  />
                  <span className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-widest font-bold text-[var(--color-luxury-cream)] bg-[var(--color-luxury-dark)]/85 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </Link>

                {/* Text Area */}
                <div className="px-3 pb-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-[var(--color-luxury-accent)] font-mono text-[9px] font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>

                    <Link href={detailUrl} className="block">
                      <h3 className="font-display font-semibold text-lg md:text-xl text-[var(--color-luxury-dark)] leading-snug tracking-tight mb-3 hover:text-[var(--color-luxury-accent)] transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-[var(--color-luxury-dark)]/70 font-light leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card footer trigger link */}
                  <Link
                    href={detailUrl}
                    className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-luxury-dark)] uppercase tracking-widest font-bold cursor-pointer hover:text-[var(--color-luxury-accent)] pt-4 border-t border-[rgba(142,124,104,0.06)] mt-auto"
                  >
                    <span>{t.journalReadMore}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </div>
  );
}
