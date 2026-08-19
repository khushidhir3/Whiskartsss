import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Premium Product SVG ── */
function ProductSVG() {
  return (
    <svg viewBox="0 0 260 260" className="w-full max-w-[220px] mx-auto drop-shadow-xl">
      {/* Glow ring */}
      <circle cx="130" cy="130" r="120" fill="none" stroke="url(#glow)" strokeWidth="3" opacity="0.5" />
      {/* Background circle */}
      <circle cx="130" cy="130" r="110" fill="url(#bgGrad)" />
      
      {/* Product Image */}
      <clipPath id="circleClip">
        <circle cx="130" cy="130" r="100" />
      </clipPath>
      <image href="/images/waist-chain.png" x="30" y="30" width="200" height="200" clipPath="url(#circleClip)" preserveAspectRatio="xMidYMid slice" />

      {/* Sparkles */}
      {[[50,80],[200,90],[180,200],[70,190]].map(([x,y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <line x1="-5" y1="0" x2="5" y2="0" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#d4af37" strokeWidth="1.5" opacity="0.7" />
        </g>
      ))}
      {/* Price tag */}
      <g transform="translate(185,85)">
        <rect x="-22" y="-12" width="44" height="24" rx="12" fill="white" />
        <text x="0" y="5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d6127a">₹1,299</text>
      </g>
      <defs>
        <radialGradient id="bgGrad"><stop offset="0%" stopColor="#fce7f3" /><stop offset="100%" stopColor="#f9a8d4" /></radialGradient>
        <radialGradient id="glow"><stop offset="60%" stopColor="transparent" /><stop offset="100%" stopColor="#e91e8c40" /></radialGradient>
      </defs>
    </svg>
  );
}

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [dontGo, setDontGo] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;

    const handleMouse = (e) => {
      if (e.clientY < 10 && !shown.current) {
        shown.current = true;
        setShow(true);
      }
    };

    let idleTimer = setTimeout(() => {
      if (!shown.current) { shown.current = true; setShow(true); }
    }, 15000);

    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!shown.current) { shown.current = true; setShow(true); }
      }, 15000);
    };

    document.addEventListener('mouseleave', handleMouse);
    document.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', resetIdle);

    return () => {
      document.removeEventListener('mouseleave', handleMouse);
      document.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', resetIdle);
      clearTimeout(idleTimer);
    };
  }, []);

  const handleClose = () => {
    if (!dontGo) {
      setDontGo(true);
    } else {
      setShow(false);
      setDontGo(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="exit-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(13,5,9,0.65)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            key="exit-modal"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(170deg, #1a0e14 0%, #2d1125 50%, #0d0509 100%)' }}
          >
            {/* ── X Close Button ── */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
            >
              <span className="text-whiskar-deep text-lg font-bold leading-none select-none">✕</span>
            </motion.button>

            {/* ── "Don't Go!" overlay ── */}
            <AnimatePresence>
              {dontGo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-whiskar-night/95 backdrop-blur-sm rounded-3xl p-6 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="text-6xl mb-4"
                  >
                    😿
                  </motion.span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Don't go!
                  </h3>
                  <p className="text-pink-300 text-sm mb-6 max-w-[280px]">
                    This exclusive deal is only available right now. Your cat deserves the best!
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDontGo(false)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-whiskar-deep to-whiskar-magenta text-white font-bold text-sm shadow-lg"
                    >
                      Stay & Shop 😻
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setShow(false); setDontGo(false); }}
                      className="px-6 py-3 rounded-full bg-white/10 text-pink-300 font-medium text-sm border border-pink-800/40 hover:bg-white/15"
                    >
                      Leave anyway
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Limited badge ── */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
              ✦ Limited Edition
            </div>

            {/* ── Product image area ── */}
            <div className="pt-14 pb-4 px-6 flex justify-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ProductSVG />
              </motion.div>
            </div>

            {/* ── Product info ── */}
            <div className="px-6 pb-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-1">
                Celestial Charm Waist Chain
              </h2>
              <p className="text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Handcrafted Gold Coin Discs × Adjustable Fit
              </p>

              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-3xl font-extrabold text-white">₹1,299</span>
                <span className="text-lg text-pink-500/60 line-through">₹2,499</span>
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                  48% OFF
                </span>
              </div>

              <p className="text-pink-300/80 text-sm leading-relaxed mb-5 max-w-[340px] mx-auto">
                Only <span className="text-amber-400 font-bold">12 left</span> — luxurious gold coin waist chain. Sign up for first access.
              </p>

              {/* ── Signup ── */}
              <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[340px] mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder:text-pink-400/50 text-sm outline-none focus:ring-2 focus:ring-whiskar-magenta/50 border border-white/10"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-whiskar-deep to-whiskar-magenta text-white font-bold text-sm shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
                >
                  Claim Deal 🔥
                </motion.button>
              </div>

              <p className="text-pink-500/40 text-[10px] mt-3">
                🔒 No spam. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
