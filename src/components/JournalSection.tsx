import { motion } from 'motion/react';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { journalItems } from '../data';
import { Translation } from '../types';
import { idToSlugMap, Link } from '../utils/router';

interface JournalSectionProps {
  t: Translation;
}

export default function JournalSection({ t }: JournalSectionProps) {
  const isItalian = t.customizerTitle.includes("Tela") || t.customizerTitle.includes("Spaziale");

  return (
    <section
      id="journal"
      className="relative py-24 md:py-36 bg-[var(--color-luxury-cream)] overflow-hidden"
    >
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] ambient-glow rounded-full pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[35vw] h-[35vw] ambient-glow rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        
        {/* Section Header with "View All" Link */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-4 border border-[rgba(142,124,104,0.2)] bg-[var(--color-luxury-beige)] rounded-full px-4 py-1 inline-block"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)]">
                {t.navJournal}
              </span>
            </motion.div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-luxury-dark)] tracking-tight mb-6">
              {(() => {
                const text = t.journalTitle;
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
            </h2>
            
            <p className="text-sm md:text-base text-[var(--color-luxury-dark)]/70 font-light leading-relaxed">
              {t.journalSubtitle}
            </p>
          </div>

          {/* View All Editorial Link */}
          <Link
            href="/journal"
            className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-luxury-accent)] uppercase tracking-widest font-bold border border-[rgba(142,124,104,0.3)] hover:bg-[var(--color-luxury-accent)] hover:text-white hover:border-transparent px-5 py-3 rounded-full transition-all duration-300 self-start md:self-auto"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isItalian ? "Vedi Tutti gli Articoli" : "View All Articles"}</span>
          </Link>
        </div>

        {/* Journal Editorial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {journalItems.map((post, idx) => {
            const slug = idToSlugMap[post.id] || String(post.id);
            const postUrl = `/journal/${slug}`;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.15, ease: "easeOut" }}
                className="flex flex-col h-full bg-[var(--color-luxury-beige)]/30 border border-[rgba(142,124,104,0.1)] rounded-3xl p-3 shadow-xs hover:border-[var(--color-luxury-accent)] transition-all duration-300 group"
              >
                {/* Image box link */}
                <Link
                  href={postUrl}
                  className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-[var(--color-luxury-beige)] mb-5 block"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-25 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out"
                  />
                  
                  {/* Floating category tag */}
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

                    <Link href={postUrl} className="block">
                      <h3 className="font-display font-semibold text-lg md:text-xl text-[var(--color-luxury-dark)] leading-snug tracking-tight mb-3 hover:text-[var(--color-luxury-accent)] group-hover:text-[var(--color-luxury-accent)] transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-[var(--color-luxury-dark)]/70 font-light leading-relaxed mb-6 line-clamp-3 select-text">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card footer trigger link */}
                  <Link
                    href={postUrl}
                    className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-luxury-dark)] uppercase tracking-widest font-bold cursor-pointer group-hover:text-[var(--color-luxury-accent)] pt-4 border-t border-[rgba(142,124,104,0.06)] mt-auto"
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
    </section>
  );
}
