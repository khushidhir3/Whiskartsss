import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   AMBIENT MUSIC ENGINE — Web Audio API synth
   Generates chill lo-fi ambient pads procedurally.
   Each "track" uses a different chord progression & tempo.
   ═══════════════════════════════════════════════════════ */

const TRACKS = [
  {
    title: 'Midnight Meow',
    genre: 'Lo-fi Ambient',
    emoji: '🌙',
    // C minor vibes – dreamy pads
    notes: [261.63, 311.13, 392.0, 466.16],
    tempo: 0.4,
    filterFreq: 800,
    color: 'from-fuchsia-400 to-pink-600',
  },
  {
    title: 'Purring Rain',
    genre: 'Chill Synth',
    emoji: '🌧️',
    // Eb major – warm & cozy
    notes: [311.13, 369.99, 415.30, 523.25],
    tempo: 0.35,
    filterFreq: 600,
    color: 'from-blue-400 to-indigo-600',
  },
  {
    title: 'Catnip Dreams',
    genre: 'Ambient Drone',
    emoji: '💫',
    // F major – floaty
    notes: [349.23, 440.0, 523.25, 659.25],
    tempo: 0.5,
    filterFreq: 500,
    color: 'from-purple-400 to-violet-600',
  },
  {
    title: 'Whisker Waltz',
    genre: 'Music Box',
    emoji: '🎶',
    // G major – playful
    notes: [392.0, 493.88, 587.33, 783.99],
    tempo: 0.6,
    filterFreq: 1200,
    color: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Lazy Sunbeam',
    genre: 'Soft Piano',
    emoji: '☀️',
    // Db major – warm sunset
    notes: [277.18, 349.23, 415.30, 554.37],
    tempo: 0.3,
    filterFreq: 700,
    color: 'from-rose-400 to-pink-500',
  },
];

function useAmbientAudio() {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const filterRef = useRef(null);
  const intervalRef = useRef(null);
  const isPlayingRef = useRef(false);

  const initCtx = useCallback(() => {
    if (ctxRef.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.25;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;

    // Reverb-like effect using delay
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.3;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.3;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.4;

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // Delay chain for reverb feel
    masterGain.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wetGain);
    wetGain.connect(ctx.destination);

    ctxRef.current = ctx;
    gainRef.current = masterGain;
    filterRef.current = filter;
  }, []);

  const playNote = useCallback((freq, duration = 2) => {
    const ctx = ctxRef.current;
    const filter = filterRef.current;
    if (!ctx || !filter) return;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Alternate between sine and triangle for warmth
    osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
    // Slight detune for analog warmth
    osc.frequency.value = freq * (1 + (Math.random() - 0.5) * 0.008);
    osc.detune.value = (Math.random() - 0.5) * 10;

    const now = ctx.currentTime;
    // Gentle envelope
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.15, now + 0.3);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(filter);

    osc.start(now);
    osc.stop(now + duration);
  }, []);

  const startTrack = useCallback((track) => {
    initCtx();
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Resume audio context (browser policy)
    if (ctx.state === 'suspended') ctx.resume();

    // Update filter
    if (filterRef.current) {
      filterRef.current.frequency.value = track.filterFreq;
    }

    // Clear previous interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    isPlayingRef.current = true;

    // Play initial chord
    track.notes.forEach((n, i) => {
      setTimeout(() => {
        if (isPlayingRef.current) playNote(n, 3);
      }, i * 200);
    });

    // Ongoing ambient notes
    intervalRef.current = setInterval(() => {
      if (!isPlayingRef.current) return;
      const noteIdx = Math.floor(Math.random() * track.notes.length);
      const octaveShift = Math.random() > 0.7 ? 2 : 1;
      playNote(track.notes[noteIdx] * octaveShift, 2 + Math.random() * 2);

      // Occasionally play a second note for richness
      if (Math.random() > 0.5) {
        const secondIdx = (noteIdx + 2) % track.notes.length;
        setTimeout(() => {
          if (isPlayingRef.current) playNote(track.notes[secondIdx], 1.5 + Math.random() * 1.5);
        }, 300);
      }
    }, (1 / track.tempo) * 1000);
  }, [initCtx, playNote]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const setVolume = useCallback((v) => {
    if (gainRef.current) gainRef.current.gain.value = v;
  }, []);

  return { startTrack, stop, setVolume };
}


/* ═══════════════════════════════════════════════════════
   WHISKAR RADIO — Mini Player (bottom-left)
   Plays procedural ambient music with track switching.
   ═══════════════════════════════════════════════════════ */
function WhiskarRadio() {
  const [playing, setPlaying] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [volume, setVolume] = useState(0.25);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const { startTrack, stop, setVolume: setAudioVolume } = useAmbientAudio();
  const track = TRACKS[trackIdx];

  const togglePlay = () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      startTrack(track);
      setPlaying(true);
    }
  };

  const changeTrack = (idx) => {
    setTrackIdx(idx);
    if (playing) {
      stop();
      setTimeout(() => startTrack(TRACKS[idx]), 100);
    }
    setShowPlaylist(false);
  };

  const nextTrack = () => {
    const next = (trackIdx + 1) % TRACKS.length;
    changeTrack(next);
  };

  const prevTrack = () => {
    const prev = (trackIdx - 1 + TRACKS.length) % TRACKS.length;
    changeTrack(prev);
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setAudioVolume(v);
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 120 }}
      className="fixed bottom-5 left-5 z-50"
    >
      <AnimatePresence mode="wait">
        {minimized ? (
          /* ── Minimized FAB ── */
          <motion.button
            key="mini"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setMinimized(false)}
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${track.color} text-white text-lg shadow-lg hover:scale-110 transition-transform flex items-center justify-center ${playing ? 'animate-pulse-soft' : ''}`}
          >
            {playing ? '🎵' : '🎶'}
          </motion.button>
        ) : (
          <motion.div
            key="full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative"
          >
            {/* ── Playlist dropdown ── */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full mb-2 left-0 w-64 bg-white/95 dark:bg-whiskar-plum/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-200 dark:border-pink-900/40 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-pink-100 dark:border-pink-900/30">
                    <p className="text-xs font-bold text-whiskar-deep dark:text-pink-200 uppercase tracking-wider">
                      🎧 Whiskar Radio
                    </p>
                  </div>
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {TRACKS.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => changeTrack(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          i === trackIdx
                            ? 'bg-pink-50 dark:bg-pink-950/40'
                            : 'hover:bg-pink-50/60 dark:hover:bg-pink-950/20'
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center text-sm shadow-sm ${
                            i === trackIdx && playing ? 'animate-spin-slow' : ''
                          }`}
                        >
                          {t.emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${
                            i === trackIdx
                              ? 'text-whiskar-magenta'
                              : 'text-whiskar-deep dark:text-pink-200'
                          }`}>
                            {t.title}
                          </p>
                          <p className="text-[10px] text-pink-400">{t.genre}</p>
                        </div>
                        {i === trackIdx && playing && (
                          <div className="flex items-end gap-[2px] h-4">
                            {[1, 2, 3].map((bar) => (
                              <motion.div
                                key={bar}
                                className="w-[3px] bg-whiskar-magenta rounded-full"
                                animate={{ height: ['4px', '14px', '6px', '12px', '4px'] }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: bar * 0.15,
                                  ease: 'easeInOut',
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Player Card ── */}
            <div className="flex flex-col bg-white/90 dark:bg-whiskar-plum/90 backdrop-blur-md rounded-2xl shadow-xl border border-pink-200 dark:border-pink-900/40 overflow-hidden w-[260px]">
              {/* Top row: album art + track info + controls */}
              <div className="flex items-center gap-3 px-3 py-3">
                {/* Album art */}
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center text-white text-lg shadow-inner flex-shrink-0 ${
                    playing ? 'animate-spin-slow' : ''
                  } hover:scale-105 transition-transform`}
                  title="Open playlist"
                >
                  {track.emoji}
                </button>

                {/* Track info */}
                <div className="flex flex-col leading-tight flex-1 min-w-0">
                  <span className="text-xs font-bold text-whiskar-deep dark:text-pink-200 truncate">
                    {track.title}
                  </span>
                  <span className="text-[10px] text-pink-400 dark:text-pink-500">
                    {track.genre}
                  </span>
                </div>

                {/* Transport controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={prevTrack}
                    className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-900/40 text-whiskar-magenta flex items-center justify-center hover:bg-pink-200 dark:hover:bg-pink-800/50 transition-colors text-[10px]"
                    title="Previous"
                  >
                    ⏮
                  </button>
                  <button
                    onClick={togglePlay}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all text-xs font-bold ${
                      playing
                        ? 'bg-whiskar-magenta text-white shadow-md'
                        : 'bg-pink-100 dark:bg-pink-900/40 text-whiskar-magenta hover:bg-pink-200'
                    }`}
                    title={playing ? 'Pause' : 'Play'}
                  >
                    {playing ? '❚❚' : '▶'}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-900/40 text-whiskar-magenta flex items-center justify-center hover:bg-pink-200 dark:hover:bg-pink-800/50 transition-colors text-[10px]"
                    title="Next"
                  >
                    ⏭
                  </button>
                </div>

                {/* Minimize */}
                <button
                  onClick={() => { setShowPlaylist(false); setMinimized(true); }}
                  className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/40 text-whiskar-magenta flex items-center justify-center hover:bg-pink-200 dark:hover:bg-pink-800/50 transition-colors text-[10px] font-bold flex-shrink-0"
                  title="Minimize"
                >
                  –
                </button>
              </div>

              {/* Volume slider */}
              <div className="flex items-center gap-2 px-4 pb-2.5">
                <span className="text-[10px] text-pink-400">🔈</span>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={volume}
                  onChange={handleVolume}
                  className="flex-1 h-1 rounded-full appearance-none bg-pink-200 dark:bg-pink-900/60 cursor-pointer accent-whiskar-magenta"
                  style={{ accentColor: '#e91e8c' }}
                />
                <span className="text-[10px] text-pink-400">🔊</span>
              </div>

              {/* Now playing animation bar */}
              {playing && (
                <div className="h-1 w-full bg-pink-100 dark:bg-pink-900/30 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${track.color}`}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '60%' }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


/* ═══════════════════════════════════════════════════════
   PAW CHAT — Launcher (bottom-right)
   ═══════════════════════════════════════════════════════ */
function PawChat() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 120 }}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-72 bg-white dark:bg-whiskar-plum border border-pink-200 dark:border-pink-900/40 rounded-2xl shadow-2xl overflow-hidden mb-1"
          >
            <div className="bg-gradient-to-r from-whiskar-deep to-whiskar-magenta px-5 py-4">
              <p className="text-white font-bold text-sm">Meow! Need help? 🐾</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-pink-700 dark:text-pink-300 leading-relaxed">
                Our team is currently napping 😸 Drop us a line and we'll
                get back to you faster than a cat chasing a laser.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="mt-3 w-full px-4 py-2.5 rounded-full border border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-whiskar-night text-sm outline-none focus:ring-2 focus:ring-whiskar-magenta/50 text-whiskar-deep dark:text-pink-200 placeholder:text-pink-300"
              />
              <button className="mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-whiskar-deep to-whiskar-magenta text-white text-sm font-semibold hover:shadow-lg transition-shadow">
                Send a Meow-ssage
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-whiskar-magenta to-fuchsia-600 text-white text-2xl shadow-xl animate-pulse-soft hover:scale-110 transition-transform flex items-center justify-center"
      >
        🐾
      </button>
    </motion.div>
  );
}

export { WhiskarRadio, PawChat };
