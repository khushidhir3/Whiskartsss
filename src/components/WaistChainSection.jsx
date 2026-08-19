import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   VIDEO MODAL — plays the cat belly-dancing video
   ═══════════════════════════════════════════════════════ */
function VideoModal({ open, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden bg-gradient-to-br from-pink-950 to-fuchsia-950 shadow-2xl border border-pink-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-pink-600/60 transition-colors text-lg"
            >
              ✕
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-3 text-center">
              <p className="text-pink-300 text-sm font-semibold tracking-widest uppercase mb-1">
                🐱 Exclusive Catwalk Preview 🐱
              </p>
              <h3 className="text-white text-2xl font-extrabold">
                Our Feline Model Approves! 💃
              </h3>
              <p className="text-pink-400 text-sm mt-1">
                Even cats can't resist a belly dance in this waist chain ✨
              </p>
            </div>

            {/* Video Container */}
            <div className="px-6 pb-6">
              <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-pink-500/10" style={{ maxHeight: '60vh' }}>
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  style={{ maxHeight: '60vh' }}
                >
                  <source src="/cat-belly-dance.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Bottom fun text */}
            <div className="px-6 pb-5 text-center">
              <p className="text-pink-400/70 text-xs italic">
                "If it's good enough for a belly-dancing cat, it's definitely good enough for you!" 😹
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   SPARKLE ICON — decorative
   ═══════════════════════════════════════════════════════ */
function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${className}`} fill="currentColor">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURES — quirky cat-related selling points
   ═══════════════════════════════════════════════════════ */
const FEATURES = [
  {
    emoji: '✨',
    title: 'Purrfectly Crafted',
    desc: "Hand-finished with the precision of a cat stalking a laser pointer.",
  },
  {
    emoji: '🐾',
    title: 'Cat-Approved Shine',
    desc: 'So shiny even your cat will try to bat at it. Hooman tested, feline distracted.',
  },
  {
    emoji: '💫',
    title: 'Adjustable Fit',
    desc: 'Fits waists of all sizes — unlike a cat, this actually adapts.',
  },
  {
    emoji: '🎀',
    title: 'Gift-Ready',
    desc: "Comes in a cute box. Your cat WILL sit in it. We don't make the rules.",
  },
];

/* ═══════════════════════════════════════════════════════
   REVIEWS — quirky customer reviews
   ═══════════════════════════════════════════════════════ */
const REVIEWS = [
  {
    name: 'Whiskers McFluffington',
    stars: 5,
    text: '"My hooman wore this and suddenly she started belly dancing. I was shook. 10/10 would judge again."',
    avatar: '🐱',
  },
  {
    name: 'Sir Paws-a-Lot',
    stars: 5,
    text: '"Tried to steal it. Got caught. No regrets. This chain is meow-gnificent."',
    avatar: '😺',
  },
  {
    name: 'Princess Nap Queen',
    stars: 5,
    text: '"I napped on it. It jingled. Best alarm clock ever. Buy it for the jingles."',
    avatar: '😻',
  },
];

/* ═══════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════ */
export default function WaistChainSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      <section
        id="waist-chain"
        className="relative py-20 sm:py-28 overflow-hidden transition-colors"
        style={{
          background: 'linear-gradient(180deg, #fff5f7 0%, #fce7f3 50%, #fff5f7 100%)',
        }}
      >
        {/* Dark mode override */}
        <div className="absolute inset-0 bg-whiskar-night dark:block hidden" />

        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-300/20 dark:bg-pink-900/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-fuchsia-300/20 dark:bg-fuchsia-900/20 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">

          {/* ── BEST SELLER BADGE ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-500/30">
              <Sparkle className="w-3.5 h-3.5" />
              #1 Best Seller
              <Sparkle className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          {/* ── HEADLINE ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display italic text-4xl sm:text-5xl lg:text-6xl font-bold text-whiskar-deep dark:text-pink-100 leading-tight mb-4">
              The Purr-fect Waist Chain 💎
            </h2>
            <p className="text-pink-600 dark:text-pink-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Even cats stop grooming themselves to stare at this one.
              <br className="hidden sm:block" />
              If a belly-dancing kitty can rock it, so can you! 🐱✨
            </p>
          </motion.div>

          {/* ── PRODUCT CARD ── */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative group">
                {/* Glowing ring behind */}
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-pink-400/30 via-fuchsia-400/20 to-amber-400/30 dark:from-pink-600/20 dark:via-fuchsia-600/15 dark:to-amber-600/20 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70 group-hover:opacity-100" />

                {/* Card */}
                <div className="relative w-72 sm:w-80 rounded-3xl overflow-hidden shadow-2xl border border-pink-200/50 dark:border-pink-800/30 bg-white dark:bg-whiskar-plum">
                  {/* Image shimmer placeholder */}
                  {!imgLoaded && (
                    <div className="w-full aspect-square bg-gradient-to-br from-pink-100 to-fuchsia-100 dark:from-pink-950 dark:to-fuchsia-950 animate-pulse" />
                  )}
                  <img
                    src="/images/waist-chain.png"
                    alt="Gold waist chain with celestial charms — best selling belly chain"
                    className={`w-full aspect-square object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
                    onLoad={() => setImgLoaded(true)}
                  />

                  {/* Overlay badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      🔥 Selling Fast
                    </span>
                  </div>

                  {/* Price tag */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                    <p className="text-white/80 text-xs font-medium mb-1">Celestial Charm Waist Chain</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white text-2xl font-extrabold">₹1,299</span>
                      <span className="text-pink-300 text-sm line-through">₹2,499</span>
                      <span className="ml-1 px-2 py-0.5 rounded bg-green-500/80 text-white text-[10px] font-bold">48% OFF</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex-1 max-w-lg"
            >
              <p className="text-xs text-pink-500 dark:text-pink-400 font-bold uppercase tracking-[0.2em] mb-3">
                🐾 Meow-st Wanted Collection
              </p>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-whiskar-deep dark:text-pink-100 mb-4 leading-snug">
                "Not Just a Chain — <br className="hidden sm:block" />
                It's a <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500">Whole Vibe</span>" 😻
              </h3>

              <p className="text-pink-700 dark:text-pink-300 leading-relaxed mb-6">
                This isn't your average waist chain, bestie. This little jingly masterpiece was designed while a cat supervised every single bead placement. Wear it to brunch, festivals, or just around the house while your cat judges you (lovingly, of course).
              </p>

              {/* Feature pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/60 dark:bg-pink-950/30 border border-pink-200/40 dark:border-pink-800/20 backdrop-blur-sm"
                  >
                    <span className="text-2xl mt-0.5">{f.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-whiskar-deep dark:text-pink-100">{f.title}</p>
                      <p className="text-xs text-pink-600 dark:text-pink-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── SEE BY YOURSELF BUTTON ── */}
              <motion.button
                onClick={() => setVideoOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #e91e8c 0%, #d6127a 50%, #c2185b 100%)',
                }}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="relative z-10 flex items-center gap-3">
                  {/* Play icon */}
                  <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 ml-0.5" fill="white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-left text-sm font-extrabold tracking-wide">
                      See By Yourself! 🐱💃
                    </span>
                    <span className="block text-left text-[10px] text-pink-200 font-normal">
                      Watch our cat model strut this chain
                    </span>
                  </span>
                </span>

                {/* Pulse ring */}
                <span className="absolute -inset-1 rounded-full animate-pulse-soft pointer-events-none" />
              </motion.button>

              <p className="mt-4 text-xs text-pink-400 dark:text-pink-500 italic">
                🐾 Warning: May cause uncontrollable urge to belly dance with your cat
              </p>
            </motion.div>
          </div>

          {/* ── REVIEWS ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-center text-2xl sm:text-3xl font-extrabold text-whiskar-deep dark:text-pink-100 mb-2">
              What the Cats Are Saying 😹
            </h3>
            <p className="text-center text-pink-500 dark:text-pink-400 text-sm mb-8">
              Real reviews from real feline supervisors
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {REVIEWS.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="p-5 rounded-2xl bg-white/70 dark:bg-pink-950/30 border border-pink-200/40 dark:border-pink-800/20 backdrop-blur-sm shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center text-2xl">
                      {r.avatar}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-whiskar-deep dark:text-pink-100">{r.name}</p>
                      <p className="text-amber-400 text-xs">{'⭐'.repeat(r.stars)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-300 leading-relaxed italic">
                    {r.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
