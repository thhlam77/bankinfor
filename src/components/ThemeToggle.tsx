import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import useToast from '../hooks/useToast';

type ThemeToggleProps = {
  onChange?: (isDarkMode: boolean) => void;
}

const ThemeToggle = ({ onChange }: ThemeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { showToast } = useToast();
  const controls = useAnimation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isCurrentlyDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(isCurrentlyDark);

    if (!isCurrentlyDark) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(async () => {
    if (isAnimating) return;

    setIsAnimating(true);

    await controls.start({
      scale: [1, 1.1, 0.95, 1],
      rotate: isDarkMode ? 0 : 360,
      transition: { duration: 0.5 }
    });

    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      showToast({
        type: 'info',
        message: 'Chế độ tối đã được kích hoạt',
        description: 'Giao diện đã chuyển sang chế độ tối',
        duration: 2000,
      });
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      showToast({
        type: 'info',
        message: 'Chế độ sáng đã được kích hoạt',
        description: 'Giao diện đã chuyển sang chế độ sáng',
        duration: 2000,
      });
    }

    if (onChange) {
      onChange(newDarkMode);
    }

    setIsAnimating(false);
  }, [controls, isDarkMode, isAnimating, onChange, showToast]);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  const orbitBoxShadow = isDarkMode
    ? "0 0 20px 2px rgba(120, 68, 255, 0.3)"
    : "0 0 20px 2px rgba(250, 204, 21, 0.3)";

  const orbitBoxShadowHovered = isDarkMode
    ? "0 0 30px 5px rgba(120, 68, 255, 0.5), 0 0 60px 10px rgba(120, 68, 255, 0.3)"
    : "0 0 30px 5px rgba(250, 204, 21, 0.5), 0 0 60px 10px rgba(250, 204, 21, 0.3)";

  const celestialBackground = isDarkMode
    ? "radial-gradient(circle at 30% 30%, #c7d2fe 0%, #a5b4fc 30%, #818cf8 70%)"
    : "radial-gradient(circle at 30% 30%, #fef08a 0%, #fde047 50%, #facc15 100%)";

  return (
    <motion.div
      className="fixed top-6 right-6 z-50 select-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
      style={{ willChange: 'transform' }}
    >
      <div className="relative perspective-1000">

        <motion.button
          ref={toggleRef}
          onClick={toggleTheme}
          className="relative outline-none group"
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          animate={controls}
          whileTap={{ scale: 0.95 }}
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >

          <motion.div
            className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg transition-all duration-500"
            animate={{
              rotateY: isHovered ? 360 : 0,
              boxShadow: isHovered ? orbitBoxShadowHovered : orbitBoxShadow
            }}
            transition={{
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 1 }
            }}
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform, box-shadow'
            }}
          >

            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                background: isDarkMode
                  ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
                  : "linear-gradient(135deg, #fef9c3 0%, #fef08a 50%, #fef9c3 100%)"
              }}
              transition={{ duration: 1 }}
            />

            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              animate={{
                opacity: 1,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
              style={{ willChange: 'transform' }}
            >
              <motion.div
                className={`relative w-10 h-10 rounded-full ${
                  isDarkMode ? 'bg-indigo-300' : 'bg-yellow-300'
                }`}
                animate={{
                  boxShadow: isDarkMode
                    ? "0 0 20px 5px rgba(165, 180, 252, 0.5)"
                    : "0 0 30px 10px rgba(253, 224, 71, 0.6)"
                }}
                transition={{ duration: 1 }}
              >

                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  animate={{
                    background: celestialBackground
                  }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute right-0 top-[calc(100%+12px)] z-50 origin-top-right"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative">
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 blur-sm" />
                <div className="relative bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl py-2 px-4 text-sm text-white shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-indigo-600/80' : 'bg-amber-500/80'
                    }`}>
                      {isDarkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                        </svg>
                      )}
                    </div>
                    <span>Chuyển sang chế độ {isDarkMode ? "sáng" : "tối"}</span>
                  </div>
                </div>
                <div className="absolute -top-1 right-6 w-2 h-2 bg-white/5 border-t border-l border-white/10 transform rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ThemeToggle;