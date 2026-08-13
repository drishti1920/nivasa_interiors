import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, RefreshCw, Volume2, ShieldCheck, TreePine, Eye, Info } from 'lucide-react';
import { Translation } from '../types';

interface InteractiveCustomizerProps {
  t: Translation;
}

type MaterialType = 'walnut' | 'oak' | 'ash';
type LayoutPresetType = 'acoustic' | 'studio' | 'lounge';

interface Hotspot {
  x: string;
  y: string;
  title: string;
  titleIt: string;
  desc: string;
  descIt: string;
}

interface CustomizerAsset {
  image: string;
  title: string;
  titleIt: string;
  badge: string;
  badgeIt: string;
  desc: string;
  descIt: string;
  hotspots: Hotspot[];
}

const realAssets: Record<MaterialType, Record<LayoutPresetType, CustomizerAsset>> = {
  walnut: {
    acoustic: {
      image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80",
      title: "Walnut Slatted Acoustical Panel",
      titleIt: "Pannello Acustico Dogato in Noce",
      badge: "ACOUSTIC COMPOSITION",
      badgeIt: "COMPOSIZIONE ACUSTICA",
      desc: "Warm Canaletto Walnut slats mounted on high-density sound-absorbing PET felt. Blends classical mid-century warmth with contemporary noise suppression.",
      descIt: "Doghe in caldo Noce Canaletto montate su feltro PET fonoassorbente ad alta densità. Unisce il calore classico di metà secolo con la moderna soppressione del rumore.",
      hotspots: [
        { x: "32%", y: "40%", title: "Canaletto Walnut", titleIt: "Noce Canaletto", desc: "Select grade real wood veneer with matte oiled seal.", descIt: "Impiallacciatura di vero legno di prima scelta con finitura a olio opaco." },
        { x: "48%", y: "65%", title: "Acoustic Gaps", titleIt: "Fessure Acustiche", desc: "15mm space ratio optimized to capture mid-to-high frequencies.", descIt: "Rapporto di spazio di 15mm ottimizzato per catturare le frequenze medio-alte." },
        { x: "72%", y: "25%", title: "Recycled PET Core", titleIt: "Nucleo in Feltro PET", desc: "Dense sound-absorbing backing made from 100% recycled ocean bottles.", descIt: "Supporto fonoassorbente denso realizzato al 100% da bottiglie oceaniche riciclate." }
      ]
    },
    studio: {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      title: "Executive Walnut Workstation",
      titleIt: "Postazione Direzionale in Noce",
      badge: "CREATIVE STUDIO",
      badgeIt: "STUDIO CREATIVO",
      desc: "A focus sanctuary featuring a floating desk module in dark-oiled solid walnut, surrounded by acoustic wall claddings.",
      descIt: "Un santuario di concentrazione dotato di scrivania sospesa in noce massello oliato scuro, circondato da rivestimenti acustici a parete.",
      hotspots: [
        { x: "25%", y: "55%", title: "Ergonomic Walnut Edge", titleIt: "Bordo Ergonomico", desc: "Hand-finished bullnose profile ensuring durable workspace comfort.", descIt: "Profilo arrotondato rifinito a mano per garantire un comfort durevole." },
        { x: "65%", y: "30%", title: "Rear Felt Deflector", titleIt: "Deflettore in Feltro", desc: "Absorbs ambient reflection from monitors and keystrokes directly.", descIt: "Assorbe direttamente la riflessione ambientale da monitor e tasti." },
        { x: "50%", y: "78%", title: "Smart Wire Channel", titleIt: "Passacavi Integrato", desc: "Concealed aluminum cable raceways lined with sound-dampening wool.", descIt: "Canaline nascoste in alluminio foderate in lana fonoassorbente." }
      ]
    },
    lounge: {
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      title: "Bespoke Walnut Hospitality Lounge",
      titleIt: "Lounge Contract in Noce",
      badge: "HOTEL LOUNGE",
      badgeIt: "LOUNGE ALBERGHIERA",
      desc: "An immersive lounge wrapped in custom vertical walnut millwork, designed to reduce sound travel in open areas.",
      descIt: "Una lounge immersiva avvolta in boiserie verticale in noce su misura, progettata per ridurre il viaggio del suono nelle aree comuni.",
      hotspots: [
        { x: "40%", y: "35%", title: "Staggered Wooden Fins", titleIt: "Alette in Legno Sfalsate", desc: "Varying depths of timber ribs scatter high frequencies and prevent flutter echoes.", descIt: "Profondità variabili delle doghe per disperdere le frequenze alte e prevenire echi metallici." },
        { x: "15%", y: "70%", title: "Plush Bouclé Seating", titleIt: "Sedute in Bouclé", desc: "Deep acoustic lounge modules upholstered with high-density flame-retardant wool.", descIt: "Profondi moduli lounge imbottiti con lana fonoassorbente ignifuga." },
        { x: "80%", y: "48%", title: "Ambient LED Backlight", titleIt: "Retroilluminazione LED", desc: "Warm illumination recessed inside acoustic joints to highlight the premium wood grains.", descIt: "Calda illuminazione incassata nei giunti acustici per evidenziare le venature." }
      ]
    }
  },
  oak: {
    acoustic: {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      title: "Carbonized Oak Acoustic Paneling",
      titleIt: "Pannellatura Acustica in Rovere Carbonizzato",
      badge: "ACOUSTIC COMPOSITION",
      badgeIt: "COMPOSIZIONE ACUSTICA",
      desc: "Deep-charred charcoal oak timber slats. Provides dramatic, brutalist-inspired contrast while creating perfect quietude.",
      descIt: "Doghe in rovere trattato a carbone profondo. Offre un contrasto drammatico d'ispirazione brutalista creando una quiete perfetta.",
      hotspots: [
        { x: "35%", y: "20%", title: "Carbonized Oak Face", titleIt: "Rovere Carbonizzato", desc: "Treated with active carbon pigment to bring out deep obsidian fiber patterns.", descIt: "Trattato con pigmento di carbonio per far risaltare i profondi motivi ossidiana." },
        { x: "60%", y: "55%", title: "Impact Resistance", titleIt: "Resistenza agli Impatti", desc: "Extremely hard oak wood surface ideal for heavy traffic commercial lobbies.", descIt: "Superficie in rovere estremamente dura, ideale per hall commerciali trafficate." },
        { x: "82%", y: "78%", title: "Integrated Joints", titleIt: "Giunti Integrati", desc: "Tongue-and-groove system for easy seamless architectural installation.", descIt: "Sistema a incastro maschio-femmina per una facile installazione a scomparsa." }
      ]
    },
    studio: {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      title: "Carbon Oak Creative Studio",
      titleIt: "Studio Creativo in Rovere Carbone",
      badge: "CREATIVE STUDIO",
      badgeIt: "STUDIO CREATIVO",
      desc: "A bold workspace crafted with matte black oak panels and dark acoustic dividers to cultivate deep flow states.",
      descIt: "Un audace spazio di lavoro realizzato con pannelli in rovere nero opaco e divisori acustici scuri per coltivare concentrazione profonda.",
      hotspots: [
        { x: "30%", y: "48%", title: "Charred Oak Desktop", titleIt: "Piano Rovere Carbone", desc: "Scratch-resistant carbon-baked lacquer on premium solid oak core.", descIt: "Lacca cotta al carbonio antigraffio su nucleo di pregiato rovere massiccio." },
        { x: "70%", y: "22%", title: "Absorptive Baffles", titleIt: "Baffle Assorbenti", desc: "Overhead ceiling acoustic baffles in charcoal wool felt to stop vertical reflections.", descIt: "Baffle acustici a soffitto in feltro grigio scuro per arrestare le riflessioni verticali." },
        { x: "52%", y: "85%", title: "Heavy Steel Base", titleIt: "Base in Acciaio Pesante", desc: "Powder-coated cast steel leg with custom integrated acoustic damping pads.", descIt: "Gamba in acciaio verniciato a polvere con cuscinetti antivibranti acustici." }
      ]
    },
    lounge: {
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      title: "Obsidian Oak Cocktail Lounge",
      titleIt: "Lounge Bar Rovere Ossidiana",
      badge: "HOTEL LOUNGE",
      badgeIt: "LOUNGE ALBERGHIERA",
      desc: "High-end bar space framed in deep oak fluting, achieving a moody architectural identity with acoustic comfort.",
      descIt: "Spazio bar d'élite incorniciato da scanalature in rovere scuro, per un'identità decisa e il massimo comfort acustico.",
      hotspots: [
        { x: "20%", y: "30%", title: "Fluted Charcoal Pillars", titleIt: "Pilastri Scanalati", desc: "Scattering sound waves away from conversational clusters.", descIt: "Disperdono le onde sonore lontano dai gruppi di conversazione." },
        { x: "65%", y: "60%", title: "Basotect® Sound Absorption", titleIt: "Assorbimento Basotect®", desc: "Concealed high-efficiency foam behind custom bar panels to hush glass clinking.", descIt: "Schiuma ad alta efficienza celata dietro i pannelli per attenuare il tintinnio dei bicchieri." },
        { x: "85%", y: "80%", title: "Premium Leather Accents", titleIt: "Dettagli in Pelle", desc: "Full-grain Indian hides combined with soundproofing sub-structures.", descIt: "Pelli italiane pieno fiore combinate con sottostrutture fonoisolanti." }
      ]
    }
  },
  ash: {
    acoustic: {
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
      title: "Scandinavian Bleached Ash Panel",
      titleIt: "Pannello in Frassino Sbiancato Scandi",
      badge: "ACOUSTIC COMPOSITION",
      badgeIt: "COMPOSIZIONE ACUSTICA",
      desc: "Lightweight, Nordic-inspired bleached ash wood. Brightens contemporary interiors while absorbing high-frequency chatter.",
      descIt: "Leggero frassino sbiancato di ispirazione nordica. Illumina gli interni contemporanei assorbendo il brusio delle alte frequenze.",
      hotspots: [
        { x: "42%", y: "30%", title: "Bleached Ash", titleIt: "Frassino Sbiancato", desc: "Protected with active non-yellowing UV filters to preserve pale ivory colors.", descIt: "Protetto con filtri UV ingiallenti attivi per preservare il colore avorio chiaro." },
        { x: "28%", y: "68%", title: "Dense Sound Fiber", titleIt: "Fibra Acustica Densa", desc: "Breathable, fire-rated class A mineral fiber with maximum acoustic ratings.", descIt: "Fibra minerale traspirante in classe A antincendio con le massime valutazioni acustiche." },
        { x: "78%", y: "45%", title: "Micro-Perforations", titleIt: "Microperforazioni", desc: "Invisible 0.5mm micro-holes in the ash face for high-efficiency sound capture.", descIt: "Micro-fori invisibili da 0,5 mm sulla superficie in frassino per catturare il suono." }
      ]
    },
    studio: {
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      title: "Nordic Ash Focus Sanctuary",
      titleIt: "Santuario Studio in Frassino Nordico",
      badge: "CREATIVE STUDIO",
      badgeIt: "STUDIO CREATIVO",
      desc: "A sunlit office composition highlighting the natural textures of pale ash wood and light grey wool dividers.",
      descIt: "Un ufficio inondato di sole che evidenzia le trame naturali del frassino chiaro e divisori in lana grigia.",
      hotspots: [
        { x: "35%", y: "52%", title: "Raw Texture Tactility", titleIt: "Tatto Frassino Grezzo", desc: "FSC certified timber with complete raw texture tactile feel.", descIt: "Legno certificato FSC con una finitura setosa altamente tattile." },
        { x: "58%", y: "25%", title: "Wool Desk Screen", titleIt: "Schermo in Lana", desc: "Upholstered in virgin wool felt for local acoustic partition and visual calm.", descIt: "Rivestito in feltro di lana vergine per divisori acustici locali e relax visivo." },
        { x: "82%", y: "70%", title: "Soft Close Hardware", titleIt: "Ferramenta Soft Close", desc: "Acoustically isolated runners and brass handles to minimize noise.", descIt: "Guide isolate acusticamente e maniglie in ottone per ridurre i rumori metallici." }
      ]
    },
    lounge: {
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      title: "Ivory Ash Library Lounge",
      titleIt: "Lounge Biblioteca in Frassino Avorio",
      badge: "HOTEL LOUNGE",
      badgeIt: "LOUNGE ALBERGHIERA",
      desc: "A light-filled relaxation room dressed in bleached ash shelves and sound-damping textiles for ultimate tranquility.",
      descIt: "Una luminosa sala relax arredata con scaffali in frassino sbiancato e tessuti fonoassorbenti per la massima tranquillità.",
      hotspots: [
        { x: "28%", y: "45%", title: "Acoustic Ash Shelving", titleIt: "Scaffali Acustici", desc: "Offset shelving compartments lined with hidden micro-absorbers to prevent vocal flutter.", descIt: "Ripiani sfalsati foderati con microassorbitori nascosti per prevenire il rimbombo vocale." },
        { x: "74%", y: "30%", title: "Soft-Weave Ceiling", titleIt: "Soffitto Soft-Weave", desc: "Stretched acoustic canvas ceilings to mute footsteps from upper floors.", descIt: "Soffitti in tela acustica tesa per attutire i passi dai piani superiori." },
        { x: "48%", y: "82%", title: "Organic Cotton Textiles", titleIt: "Tessuti Cotone Organico", desc: "Linen-look acoustic curtains and custom-tailored sound drapes.", descIt: "Tende acustiche effetto lino e drappeggi sonori su misura." }
      ]
    }
  }
};

export default function InteractiveCustomizer({ t }: InteractiveCustomizerProps) {
  const [material, setMaterial] = useState<MaterialType>('walnut');
  const [layout, setLayout] = useState<LayoutPresetType>('acoustic');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const isItalian = t.customizerTitle.includes("Tela") || t.customizerTitle.includes("Spaziale");

  const materials = [
    { id: 'walnut', name: t.customizerWoodWarm, texture: 'bg-linear-to-r from-[#4d3d31] to-[#6a5647]', border: 'border-[#44362b]' },
    { id: 'oak', name: t.customizerWoodDark, texture: 'bg-linear-to-r from-[#1f1d1b] to-[#34302e]', border: 'border-[#171514]' },
    { id: 'ash', name: t.customizerWoodNatural, texture: 'bg-linear-to-r from-[#cfc3aa] to-[#e4decb]', border: 'border-[#bfb39b]' }
  ];

  const layouts = [
    { id: 'acoustic', name: t.customizerLayoutAcoustic, absorption: '94%', dbRating: '-32dB' },
    { id: 'studio', name: t.customizerLayoutOffice, absorption: '82%', dbRating: '-24dB' },
    { id: 'lounge', name: t.customizerLayoutLounge, absorption: '75%', dbRating: '-18dB' }
  ];

  const currentLayout = layouts.find(l => l.id === layout) || layouts[0];
  const activeAsset = realAssets[material][layout];

  const handleReset = () => {
    setMaterial('walnut');
    setLayout('acoustic');
    setActiveHotspot(null);
  };

  return (
    <section
      id="customizer"
      className="relative min-h-screen py-24 md:py-36 bg-[var(--color-luxury-cream)] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] ambient-glow rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] ambient-glow rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        
        {/* Header Block */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mb-4 self-start inline-block border border-[rgba(142,124,104,0.2)] bg-[var(--color-luxury-beige)] rounded-full px-4 py-1"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)]">
                {isItalian ? "CONFIGURATORE SARTORIALE" : "TAILORED CONFIGURATOR"}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-luxury-dark)] tracking-tight mb-4"
            >
              {(() => {
                const text = t.customizerTitle;
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
              className="text-sm md:text-base text-[var(--color-luxury-dark)]/70 font-light leading-relaxed"
            >
              {isItalian 
                ? "Sperimenta l'artigianato reale. Visualizza materiali autentici, seleziona i nostri layout architettonici brevettati ed esplora le caratteristiche acustiche di Nivasa."
                : "Experience real craftsmanship. Preview authentic wood finishes and layout solutions on architectural installations, with interactive diagnostic specifications."
              }
            </motion.p>
          </div>

          {/* Reset Action */}
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-[var(--color-luxury-beige)] text-[var(--color-luxury-dark)] border border-[rgba(142,124,104,0.15)] rounded-full px-5 py-3 text-xs font-semibold tracking-wide cursor-pointer transition-colors hover:border-[var(--color-luxury-accent)] shrink-0 self-start md:self-end"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.customizerReset}</span>
          </motion.button>
        </div>

        {/* Customizer Application Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Left Column: Visual Authentic Photo Canvas with Hotspots */}
          <div className="lg:col-span-7 bg-[var(--color-luxury-beige)]/60 border border-[rgba(142,124,104,0.15)] rounded-3xl p-4 md:p-6 flex flex-col justify-between relative shadow-inner overflow-hidden min-h-[420px] md:min-h-[520px]">
            {/* Visual background details */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#1e1c1a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Live Indicator tag */}
            <div className="absolute top-6 left-6 z-30 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[rgba(142,124,104,0.12)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[8px] uppercase tracking-widest font-bold text-[var(--color-luxury-dark)]">
                {isItalian ? "FOTO DI PROGETTO REALE" : "AUTHENTIC PROJECT PHOTOGRAPH"}
              </span>
            </div>

            {/* Interactive Image Container */}
            <div className="flex-1 relative w-full rounded-2xl overflow-hidden aspect-16/11 shadow-md bg-zinc-800 my-4 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeAsset.image}
                  src={activeAsset.image}
                  alt={activeAsset.title}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.55 }}
                  className="w-full h-full object-cover grayscale-10 group-hover:grayscale-0 transition-all duration-1000"
                />
              </AnimatePresence>

              {/* Dark Ambient Overlay */}
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />

              {/* Interactive Hotspots Layer */}
              {activeAsset.hotspots.map((hotspot, index) => {
                const isSelected = activeHotspot === index;
                return (
                  <div
                    key={index}
                    style={{ left: hotspot.x, top: hotspot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    {/* Hotspot Pulse Trigger Button */}
                    <button
                      onClick={() => setActiveHotspot(isSelected ? null : index)}
                      onMouseEnter={() => setActiveHotspot(index)}
                      className="relative flex items-center justify-center cursor-pointer p-3 select-none focus:outline-hidden"
                    >
                      {/* Radiating Ripple effect */}
                      <motion.span
                        animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute w-8 h-8 rounded-full bg-[var(--color-luxury-accent)]/45"
                      />
                      
                      {/* Core Circle */}
                      <span className={`w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center shadow-md transition-all duration-300 ${
                        isSelected 
                          ? 'bg-[var(--color-luxury-dark)] scale-110' 
                          : 'bg-[var(--color-luxury-accent)] hover:scale-110'
                      }`}>
                        <span className="w-1 h-1 rounded-full bg-white" />
                      </span>
                    </button>

                    {/* Inline absolute tooltip overlay on hover */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 sm:w-56 bg-white/95 backdrop-blur-md border border-[rgba(142,124,104,0.18)] rounded-xl p-3 shadow-xl z-50 text-left cursor-default pointer-events-auto"
                        >
                          <h4 className="font-display font-bold text-[10px] uppercase text-[var(--color-luxury-dark)] tracking-wider mb-1 flex items-center gap-1">
                            <Info className="w-3 h-3 text-[var(--color-luxury-accent)]" />
                            {isItalian ? hotspot.titleIt : hotspot.title}
                          </h4>
                          <p className="text-[9px] text-[var(--color-luxury-dark)]/85 leading-relaxed font-light">
                            {isItalian ? hotspot.descIt : hotspot.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Informative description footer for the active photograph */}
            <div className="bg-white/50 border border-[rgba(142,124,104,0.08)] rounded-2xl p-4 select-text">
              <span className="font-mono text-[8px] tracking-widest font-extrabold text-[var(--color-luxury-accent)] uppercase block mb-1">
                {isItalian ? activeAsset.badgeIt : activeAsset.badge} — {isItalian ? activeAsset.titleIt : activeAsset.title}
              </span>
              <p className="text-[11px] sm:text-xs text-[var(--color-luxury-dark)]/80 leading-relaxed font-light">
                {isItalian ? activeAsset.descIt : activeAsset.desc}
              </p>
            </div>
          </div>

          {/* Right Column: Interaction Controls & Technical Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Control Panel 1: Material Selection */}
            <div className="bg-[var(--color-luxury-cream)] border border-[rgba(142,124,104,0.12)] rounded-3xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <Sliders className="w-4 h-4 text-[var(--color-luxury-accent)]" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[var(--color-luxury-dark)]">
                  {t.customizerChooseMaterial}
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {materials.map((m) => (
                  <motion.button
                    key={m.id}
                    onClick={() => {
                      setMaterial(m.id as MaterialType);
                      setActiveHotspot(null);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 text-left border ${
                      material === m.id
                        ? 'bg-[var(--color-luxury-beige)] border-[var(--color-luxury-accent)] shadow-xs'
                        : 'bg-transparent border-[rgba(142,124,104,0.1)] hover:border-[var(--color-luxury-accent)]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border ${m.border} ${m.texture} shadow-xs shrink-0`} />
                      <div>
                        <span className="text-xs font-semibold text-[var(--color-luxury-dark)] block">
                          {m.name}
                        </span>
                        <span className="text-[10px] text-[var(--color-luxury-accent)]/80 font-light block">
                          {m.id === 'walnut' 
                            ? (isItalian ? 'Noce Canaletto massello oliato a mano' : 'Premium hand-rubbed oil finish') 
                            : m.id === 'oak' 
                              ? (isItalian ? 'Finitura carbone spazzolato opaco' : 'Deep texturized carbon seal') 
                              : (isItalian ? 'Trattamento sbiancante nordico naturale' : 'Fine grain Scandinavian protection')
                          }
                        </span>
                      </div>
                    </div>
                    {material === m.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxury-accent)]" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Control Panel 2: Composition Selection */}
            <div className="bg-[var(--color-luxury-cream)] border border-[rgba(142,124,104,0.12)] rounded-3xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <TreePine className="w-4 h-4 text-[var(--color-luxury-accent)]" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[var(--color-luxury-dark)]">
                  {t.customizerChooseLayout}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {layouts.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLayout(l.id as LayoutPresetType);
                      setActiveHotspot(null);
                    }}
                    className={`px-4 py-3 text-xs font-medium rounded-xl text-left transition-all duration-300 cursor-pointer border ${
                      layout === l.id
                        ? 'bg-[var(--color-luxury-dark)] text-[var(--color-luxury-cream)] border-transparent'
                        : 'bg-transparent text-[var(--color-luxury-dark)] border-[rgba(142,124,104,0.15)] hover:bg-[var(--color-luxury-beige)]/40'
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Performance metrics panel */}
            <div className="bg-[var(--color-luxury-beige)] border border-[rgba(142,124,104,0.15)] rounded-3xl p-6 md:p-8 flex flex-col gap-4">
              <h4 className="font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-luxury-accent)]">
                {isItalian ? "TELEMENTRIA DI SIMULAZIONE ACUSTICA" : "ACOUSTIC SIMULATION TELEMETRY"}
              </h4>

              {/* Absorption Bar */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  <span className="text-[var(--color-luxury-dark)]/85 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    {isItalian ? "Coefficiente Assorbimento Acustico" : "Sound Absorption Coeff"}
                  </span>
                  <span className="font-mono text-[var(--color-luxury-accent)] font-bold">{currentLayout.absorption}</span>
                </div>
                <div className="w-full bg-[var(--color-luxury-cream)] h-2 rounded-full overflow-hidden border border-[rgba(142,124,104,0.1)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: currentLayout.absorption }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-[var(--color-luxury-accent)] h-full rounded-full"
                  />
                </div>
              </div>

              {/* Sound Transmission */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  <span className="text-[var(--color-luxury-dark)]/85 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isItalian ? "Attenuazione Rumore Decibel" : "Decibel Attenuation Rate"}
                  </span>
                  <span className="font-mono text-[var(--color-luxury-accent)] font-bold">{currentLayout.dbRating}</span>
                </div>
                <div className="w-full bg-[var(--color-luxury-cream)] h-2 rounded-full overflow-hidden border border-[rgba(142,124,104,0.1)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: layout === 'acoustic' ? '85%' : layout === 'studio' ? '65%' : '48%' }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-emerald-600 h-full rounded-full"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
