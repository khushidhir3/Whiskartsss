import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GRID_ITEMS = [
  { gradient: 'from-pink-400 to-rose-500', label: 'Bow Ties', image: '/images/hero-1.png' },
  { gradient: 'from-fuchsia-400 to-purple-500', label: 'Collars', image: '/images/hero-2.png' },
  { gradient: 'from-rose-300 to-pink-500', label: 'Bandanas', image: '/images/hero-3.jpg' },
  { gradient: 'from-purple-400 to-pink-500', label: 'Harnesses', image: '/images/hero-4.png' },
  { gradient: 'from-pink-300 to-fuchsia-400', label: 'Sweaters', image: '/images/hero-5.png' },
  { gradient: 'from-rose-400 to-red-400', label: 'Hats', image: '/images/hero-6.png' },
  { gradient: 'from-fuchsia-300 to-rose-500', label: 'Scarves', image: '/images/hero-7.png' },
  { gradient: 'from-pink-500 to-purple-400', label: 'Costumes', image: '/images/hero-8.png' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function GridCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      className="group relative aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer snap-start min-w-[200px] sm:min-w-0"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-110`} />
      {item.image && (
        <img 
          src={item.image} 
          alt={item.label} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      )}
      {/* Paw watermark */}
      <span className={`absolute inset-0 flex items-center justify-center text-5xl transition-opacity pointer-events-none select-none ${item.image ? 'hidden' : 'opacity-20 group-hover:opacity-30'}`}>
        🐾
      </span>
      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        <span className="text-white text-sm font-semibold">{item.label}</span>
      </div>
    </motion.div>
  );
}

export default function Hero({ onExploreClick }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #d6127a 0%, #f472b6 100%)' }}
    >
      {/* Decorative blurred circles */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-fuchsia-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 pt-28 pb-10">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display italic font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-5"
        >
          Discover
          <br />
          Purr-emium Style
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-pink-100 text-lg sm:text-xl max-w-md mx-auto mb-8 font-light"
        >
          Handcrafted accessories & apparel designed for cats who know
          they're the main character.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onExploreClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="inline-block px-8 py-3.5 rounded-full bg-white text-whiskar-deep font-bold shadow-lg hover:shadow-xl transition-shadow text-base"
        >
          Explore More 😻
        </motion.button>
      </div>

      {/* ── Photo Grid ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 mt-4">
        {/* Grid: 2×4 desktop, horizontal scroll mobile */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 max-sm:flex max-sm:overflow-x-auto max-sm:snap-container max-sm:gap-3 max-sm:pb-4 max-sm:-mx-2 max-sm:px-2">
          {GRID_ITEMS.map((item, i) => (
            <GridCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Frosted wordmark overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none max-sm:hidden">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl px-10 py-6 text-center border border-white/10 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-white">
              WHISKARTS
            </h2>
            <p className="text-pink-200 text-sm mt-1 font-light tracking-wide">
              Fashion for the fiercest felines
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
