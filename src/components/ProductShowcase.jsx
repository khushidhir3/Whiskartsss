import { useState } from 'react';
import { motion } from 'framer-motion';

const OUTFITS = [
  { id: 'bowtie', label: 'Bow Tie', emoji: '🎀', color: '#e91e8c' },
  { id: 'crown', label: 'Crown', emoji: '👑', color: '#f59e0b' },
  { id: 'glasses', label: 'Shades', emoji: '🕶️', color: '#4b5563' },
  { id: 'scarf', label: 'Scarf', emoji: '🧣', color: '#8b5cf6' },
];

function CatSVG({ active }) {
  return (
    <svg viewBox="0 0 300 340" className="w-full max-w-[260px] mx-auto">
      {/* Tail */}
      <path d="M225,260 Q260,210 245,165" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" className="text-pink-300 dark:text-pink-600" />
      {/* Body */}
      <ellipse cx="150" cy="250" rx="65" ry="75" className="fill-pink-200 dark:fill-pink-800" />
      {/* Head */}
      <circle cx="150" cy="140" r="60" className="fill-pink-200 dark:fill-pink-800" />
      {/* Left ear */}
      <polygon points="105,100 85,40 135,80" className="fill-pink-200 dark:fill-pink-800" />
      <polygon points="108,95 93,48 130,80" className="fill-pink-300 dark:fill-pink-700" />
      {/* Right ear */}
      <polygon points="195,100 215,40 165,80" className="fill-pink-200 dark:fill-pink-800" />
      <polygon points="192,95 207,48 170,80" className="fill-pink-300 dark:fill-pink-700" />
      {/* Eyes */}
      <ellipse cx="125" cy="135" rx="10" ry="13" fill="white" />
      <ellipse cx="175" cy="135" rx="10" ry="13" fill="white" />
      <circle cx="127" cy="138" r="6" fill="#1a1a2e" />
      <circle cx="177" cy="138" r="6" fill="#1a1a2e" />
      <circle cx="129" cy="135" r="2" fill="white" />
      <circle cx="179" cy="135" r="2" fill="white" />
      {/* Nose */}
      <polygon points="150,158 144,152 156,152" className="fill-pink-400" />
      {/* Mouth */}
      <path d="M142,162 Q150,170 158,162" fill="none" className="stroke-pink-400" strokeWidth="2" />
      {/* Whiskers */}
      <line x1="90" y1="150" x2="130" y2="155" className="stroke-pink-300 dark:stroke-pink-600" strokeWidth="1.5" />
      <line x1="90" y1="160" x2="130" y2="160" className="stroke-pink-300 dark:stroke-pink-600" strokeWidth="1.5" />
      <line x1="210" y1="150" x2="170" y2="155" className="stroke-pink-300 dark:stroke-pink-600" strokeWidth="1.5" />
      <line x1="210" y1="160" x2="170" y2="160" className="stroke-pink-300 dark:stroke-pink-600" strokeWidth="1.5" />
      {/* Paws */}
      <ellipse cx="110" cy="315" rx="22" ry="12" className="fill-pink-200 dark:fill-pink-800" />
      <ellipse cx="190" cy="315" rx="22" ry="12" className="fill-pink-200 dark:fill-pink-800" />

      {/* ── Accessories ── */}
      {active === 'bowtie' && (
        <g>
          <polygon points="150,195 130,208 130,182" fill="#e91e8c" />
          <polygon points="150,195 170,208 170,182" fill="#d6127a" />
          <circle cx="150" cy="195" r="5" fill="#c2185b" />
        </g>
      )}
      {active === 'crown' && (
        <g>
          <polygon points="115,80 125,50 137,72 150,38 163,72 175,50 185,80" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <circle cx="125" cy="68" r="3" fill="#fbbf24" />
          <circle cx="150" cy="52" r="3" fill="#fbbf24" />
          <circle cx="175" cy="68" r="3" fill="#fbbf24" />
        </g>
      )}
      {active === 'glasses' && (
        <g>
          <rect x="102" y="125" width="30" height="22" rx="6" fill="#1f2937" opacity="0.85" />
          <rect x="168" y="125" width="30" height="22" rx="6" fill="#1f2937" opacity="0.85" />
          <line x1="132" y1="136" x2="168" y2="136" stroke="#374151" strokeWidth="3" />
          <line x1="100" y1="132" x2="88" y2="125" stroke="#374151" strokeWidth="3" />
          <line x1="200" y1="132" x2="212" y2="125" stroke="#374151" strokeWidth="3" />
        </g>
      )}
      {active === 'scarf' && (
        <g>
          <ellipse cx="150" cy="198" rx="58" ry="14" fill="#8b5cf6" />
          <rect x="138" y="198" width="24" height="38" rx="6" fill="#7c3aed" />
          <line x1="142" y1="210" x2="158" y2="210" stroke="#a78bfa" strokeWidth="1.5" />
          <line x1="142" y1="218" x2="158" y2="218" stroke="#a78bfa" strokeWidth="1.5" />
          <line x1="142" y1="226" x2="158" y2="226" stroke="#a78bfa" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}

export default function ProductShowcase() {
  const [activeOutfit, setActiveOutfit] = useState(null);

  return (
    <section id="product-showcase" className="py-20 sm:py-28 bg-white dark:bg-whiskar-night transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-whiskar-deep dark:text-pink-100 mb-4">
            Dress Your Whisker-Model 😻
          </h2>
          <p className="text-pink-600 dark:text-pink-400 max-w-lg mx-auto leading-relaxed">
            Every piece is handcrafted with soft, pet-safe fabrics. Tap an
            accessory below to see it on our runway model — then imagine it on
            yours.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Cat preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-64 h-80 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-100 to-fuchsia-50 dark:from-pink-950/40 dark:to-fuchsia-950/30 -rotate-3" />
              <div className="relative z-10 text-pink-400 dark:text-pink-500">
                <CatSVG active={activeOutfit} />
              </div>
            </div>
          </motion.div>

          {/* Swatch picker */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1"
          >
            <p className="text-sm text-pink-500 dark:text-pink-400 font-semibold uppercase tracking-wider mb-4">
              Tap to try on
            </p>
            <div className="grid grid-cols-2 gap-3">
              {OUTFITS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setActiveOutfit(activeOutfit === o.id ? null : o.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                    activeOutfit === o.id
                      ? 'border-whiskar-magenta bg-pink-50 dark:bg-pink-950/40 shadow-lg scale-[1.03]'
                      : 'border-pink-200 dark:border-pink-900/40 bg-white dark:bg-whiskar-plum hover:border-pink-400 dark:hover:border-pink-700 hover:shadow-md'
                  }`}
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${o.color}22` }}
                  >
                    {o.emoji}
                  </span>
                  <div>
                    <span className="block font-bold text-whiskar-deep dark:text-pink-100 text-sm">
                      {o.label}
                    </span>
                    <span className="text-xs text-pink-400">
                      {activeOutfit === o.id ? 'Wearing ✓' : 'Tap to try'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
