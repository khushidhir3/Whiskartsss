import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import WaistChainSection from './components/WaistChainSection';
import ExitIntentModal from './components/ExitIntentModal';
import LoginModal from './components/LoginModal';
import { WhiskarRadio, PawChat } from './components/FloatingWidgets';
import PawConfetti from './components/PawConfetti';

/* ═══════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════ */
function Nav({ dark, setDark, onWordmarkClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: 'Shop', href: '#product-showcase' },
    { label: 'Collections', href: '#hero' },
    { label: 'About', href: '#footer' },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[80] transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-whiskar-night/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Wordmark */}
        <button
          onClick={onWordmarkClick}
          className="text-xl font-extrabold tracking-widest text-white dark:text-pink-100 select-none"
          style={{ textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.2)' }}
        >
          <span className={scrolled ? 'text-whiskar-deep dark:text-pink-100' : 'text-white'}>
            WHISKARTS
          </span>
          <span className={`ml-1.5 text-[9px] font-normal opacity-40 italic ${scrolled ? 'text-whiskar-deep dark:text-pink-300' : 'text-pink-200'}`}>
            click me 3x
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-whiskar-deep/80 hover:text-whiskar-magenta dark:text-pink-200 dark:hover:text-pink-400'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              scrolled
                ? 'bg-pink-100 dark:bg-pink-900/40 text-whiskar-magenta'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* CTA */}
          <a
            href="#product-showcase"
            className="px-5 py-2 rounded-full bg-white text-whiskar-deep font-bold text-sm shadow hover:shadow-lg hover:scale-105 transition-all"
          >
            Join Pack 🐾
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center"
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center text-lg"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-whiskar-night/95 backdrop-blur-xl border-t border-pink-200 dark:border-pink-900/40"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 text-whiskar-deep dark:text-pink-100 font-medium text-sm"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#product-showcase"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center py-2.5 rounded-full bg-gradient-to-r from-whiskar-deep to-whiskar-magenta text-white font-bold text-sm"
              >
                Join Pack 🐾
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer id="footer" className="bg-whiskar-deep dark:bg-whiskar-night py-14 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-extrabold tracking-widest text-white mb-1">
              WHISKARTS
            </h3>
            <p className="text-pink-200 text-sm font-light">
              Fashion for the fiercest felines
            </p>
          </div>

          <div className="flex gap-6">
            {['Shop', 'Collections', 'About', 'Contact'].map((l) => (
              <a
                key={l}
                href="#"
                className="text-pink-200/80 hover:text-white text-sm transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-pink-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-pink-300/60 text-xs">
            © 2026 Whiskarts. All rights reserved.
          </p>
          <p className="text-pink-300/60 text-xs">
            Made with 🐾 and a lot of love
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Easter egg 1: click wordmark 3× → paw confetti
  const handleWordmarkClick = () => {
    clickCount.current += 1;
    clearTimeout(clickTimer.current);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5500);
    } else {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 1500);
    }
  };

  // Easter egg 2: Konami code (↑↑↓↓←→←→BA) → paw confetti
  const konamiSeq = useRef([]);
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

  useEffect(() => {
    const handleKey = (e) => {
      konamiSeq.current.push(e.key);
      // Keep only the last 10 keys
      if (konamiSeq.current.length > 10) konamiSeq.current.shift();
      // Check match
      if (konamiSeq.current.length === 10 &&
          konamiSeq.current.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        konamiSeq.current = [];
        setConfetti(true);
        setTimeout(() => setConfetti(false), 5500);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="min-h-screen transition-colors bg-whiskar-cream dark:bg-whiskar-night">
      <Nav dark={dark} setDark={setDark} onWordmarkClick={handleWordmarkClick} />
      <Hero onExploreClick={() => setLoginOpen(true)} />
      <ProductShowcase />
      <WaistChainSection />
      <Footer />

      {/* Floating widgets */}
      <WhiskarRadio />
      <PawChat />

      {/* Exit-intent modal */}
      <ExitIntentModal />

      {/* Easter egg confetti */}
      <PawConfetti active={confetti} />
      
      {/* Login Modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
