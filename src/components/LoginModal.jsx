import { motion, AnimatePresence } from 'framer-motion';

export default function LoginModal({ open, onClose }) {
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md rounded-[2.5rem] overflow-hidden bg-white dark:bg-whiskar-night shadow-2xl border-4 border-pink-200 dark:border-pink-900/40 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/40 dark:hover:bg-pink-800/60 text-pink-600 dark:text-pink-300 flex items-center justify-center transition-colors text-lg font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-pink-100 dark:bg-pink-900/40 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">
                😻
              </div>
              <h3 className="text-3xl font-extrabold text-whiskar-deep dark:text-pink-100 font-display italic">
                Welcome Back!
              </h3>
              <p className="text-pink-500 dark:text-pink-400 text-sm mt-2">
                Log in to join the purr-ty and fetch your favorites 🐾
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-whiskar-deep/70 dark:text-pink-300/70 uppercase tracking-widest mb-1.5 ml-2">
                  Email / Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. fluffy_paws_99"
                  className="w-full px-5 py-3.5 rounded-2xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800/30 text-whiskar-deep dark:text-pink-100 placeholder-pink-300 dark:placeholder-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-whiskar-deep/70 dark:text-pink-300/70 uppercase tracking-widest mb-1.5 ml-2">
                  Secret Meowcode (Password)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 rounded-2xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800/30 text-whiskar-deep dark:text-pink-100 placeholder-pink-300 dark:placeholder-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>

              <div className="flex justify-between items-center px-2 pt-2 pb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-pink-500 rounded border-pink-300 focus:ring-pink-500" />
                  <span className="text-sm text-pink-600 dark:text-pink-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-pink-500 hover:text-whiskar-magenta dark:text-pink-400 dark:hover:text-pink-300 font-medium transition-colors">
                  Lost your collar?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-whiskar-deep to-whiskar-magenta text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Let me in! 🐾
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-pink-500 dark:text-pink-400">
                New to the pack?{' '}
                <a href="#" className="font-bold text-whiskar-deep dark:text-pink-300 hover:underline">
                  Sign up here
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
