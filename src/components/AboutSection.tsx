import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Translation } from '../types';

interface AboutSectionProps {
  t: Translation;
}

export default function AboutSection({ t }: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 4 gorgeous, ultra-premium interior design work cards with minimal text and heavy focus on stunning imagery
  const projects = [
    {
      id: "01",
      category: t.aboutBadge || "Residential Architecture",
      title: "The Minimalist Pavilion",
      desc: t.aboutText1 || "A masterclass in natural light, raw concrete form, and pure negative space designed to elevate the human spirit.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90",
      location: "PESARO, ITALY",
    },
    {
      id: "02",
      category: "Creative Workspace",
      title: "Atelier of Silence",
      desc: t.aboutText2 || "A quiet, highly specialized creative sanctuary tailored for ultimate focus, sensory comfort, and professional meditation.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=90",
      location: "MILANO, ITALY",
    },
    {
      id: "03",
      category: "Public Masterpiece",
      title: "The Brutalist Conservatory",
      desc: "An avant-garde public interior blending robust exposed concrete textures with thriving organic flora and pure daylight streams.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
      location: "ROMA, ITALY",
    },
    {
      id: "04",
      category: "Hospitality Lounge",
      title: "Villa Nivasa Lounge",
      desc: "Our signature flagship lounge nested in the hills, merging state-of-the-art sustainable engineering with local woodcraft.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90",
      location: "TOSCANA, ITALY",
    }
  ];

  const total = projects.length;

  // Track scroll of the entire container exactly like the Nivasa / reference scroll system
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div 
      id="about" 
      ref={containerRef} 
      className="relative w-full bg-zinc-950"
      style={{ height: `${total * 100}vh` }}
    >
      {/* Absolute top separator line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-30 pointer-events-none" />

      {/* ONE Sticky Viewport hosting all absolutely positioned cards. Overflow clips cards during scale down. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {projects.map((project, index) => {
          return (
            <ProjectCard 
              key={project.id}
              project={project} 
              index={index} 
              total={total} 
              progress={scrollYProgress}
            />
          );
        })}
      </div>
    </div>
  );
}

interface CardProps {
  key?: string;
  project: {
    id: string;
    category: string;
    title: string;
    desc: string;
    image: string;
    location: string;
  };
  index: number;
  total: number;
  progress: any;
}

function ProjectCard({ project, index, total, progress }: CardProps) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const steps = Math.max(1, total - 1);

  const segStart = index / steps;       // scroll progress at which this card becomes active
  const segEnd = (index + 1) / steps;   // scroll progress at which the NEXT card has fully covered this one
  const prevStart = (index - 1) / steps; // scroll progress at which this card begins sliding in

  // --- translateY: card slides up from 100% (parked below) to 0% (covering the previous card) ---
  // Card 0 is visible from the very start, so it never needs to translate.
  let translateYRange: number[];
  let translateYOutput: string[];

  if (isFirst) {
    translateYRange = [0, 1];
    translateYOutput = ["0%", "0%"];
  } else {
    translateYRange = [0, prevStart, segStart, 1];
    translateYOutput = ["100%", "100%", "0%", "0%"];
  }

  // --- scale / borderRadius: card shrinks slightly *while the next card slides over it*, ---
  // i.e. during its own active segment [segStart, segEnd]. The last card is never covered, so it never shrinks.
  let scaleRange: number[];
  let scaleOutput: number[];
  let borderRadiusOutput: string[];

  if (isLast) {
    scaleRange = [0, 1];
    scaleOutput = [1, 1];
    borderRadiusOutput = ["0px", "0px"];
  } else if (isFirst) {
    scaleRange = [0, segEnd, 1];
    scaleOutput = [1, 0.94, 0.94];
    borderRadiusOutput = ["0px", "24px", "24px"];
  } else if (segEnd === 1) {
    scaleRange = [0, segStart, 1];
    scaleOutput = [1, 1, 0.94];
    borderRadiusOutput = ["0px", "0px", "24px"];
  } else {
    scaleRange = [0, segStart, segEnd, 1];
    scaleOutput = [1, 1, 0.94, 0.94];
    borderRadiusOutput = ["0px", "0px", "24px", "24px"];
  }

  const translateY = useTransform(progress, translateYRange, translateYOutput);
  const scale = useTransform(progress, scaleRange, scaleOutput);
  const borderRadius = useTransform(progress, scaleRange, borderRadiusOutput);

  return (
    <motion.div
      style={{
          top: 0,
          y: translateY,
          scale,
          borderRadius,
          zIndex: index + 1,
      }}
      className="absolute left-0 w-full h-screen overflow-hidden bg-black flex flex-col justify-between origin-top"
    >
      {/* Full-bleed high-resolution background image */}
      <div className="absolute inset-0 select-none pointer-events-none z-0">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-80"
        />
        {/* Multi-layered custom gradient overlay for incredible text legibility and ultra-premium feeling */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
      </div>

      {/* Top Minimal Bar */}
      <div className="relative z-10 flex justify-between items-center p-8 md:p-12 lg:p-16 w-full">
        {/* Work Identifier */}
        <div className="flex items-center space-x-4">
          <span className="font-display text-2xl md:text-3xl font-black text-white/40 tracking-tighter">
            {project.id}
          </span>
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-white/80">
            {project.category}
          </span>
        </div>

      
      </div>

      {/* Central / Bottom Minimal direct description content */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pb-4 md:pb-4 max-w-4xl self-start flex flex-col items-start mt-auto">
      
        {/* Large display project title */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] tracking-tight mb-5 uppercase text-balance">
          {project.title}
        </h2>

        {/* Short, direct single sentence description to keep emphasis on the image work */}
        <p className="text-sm md:text-lg text-white/80 font-light leading-relaxed mb-8 max-w-2xl text-balance">
          {project.desc}
        </p>

        {/* Subtle elegant action call */}
        <div>
          <a 
            href="#products" 
            className="group flex items-center space-x-3 bg-white text-zinc-950 px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[var(--color-luxury-beige)] hover:scale-105 active:scale-95 shadow-2xl"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Bottom subtle bar */}
      <div className="relative z-10 flex justify-between items-center px-8 md:px-12 py-5 border-t border-white/10 w-full bg-black/20 backdrop-blur-md">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
          © Nivasa ARCHITETTURA // FEATURED
        </span>
        
        {index < total - 1 ? (
          <div className="flex items-center space-x-2 text-white/60 text-[9px] font-mono uppercase tracking-[0.2em] select-none">
            <span>Scroll to next work</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-white/80" />
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-white/40 text-[9px] font-mono uppercase tracking-[0.2em] select-none">
            <span>End of featured works</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
