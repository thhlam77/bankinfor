import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface DarkModeToggleProps {
  onChange: (isDarkMode: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ onChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storagePreference = localStorage.getItem('darkMode');

    const initialDarkMode =
      storagePreference !== null
        ? storagePreference === 'true'
        : prefersDark;

    setIsDarkMode(initialDarkMode);
    onChange(initialDarkMode);
  }, [onChange]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    onChange(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  const renderStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 5 + 4;
      const animDelay = Math.random() * 1.5;

      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, (Math.random() * 30) - 15],
            y: [0, (Math.random() * 30) - 15],
          }}
          transition={{
            duration: 2,
            delay: animDelay,
            ease: "easeInOut"
          }}
          className="absolute text-yellow-300"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: size
          }}
        >
          <FaStar />
        </motion.div>
      );
    });
  };

  return (
    <div className="fixed top-5 right-5 z-40">
      <motion.button
        className={`relative w-14 h-14 rounded-full overflow-hidden shadow-lg flex items-center justify-center ${isDarkMode ? 'bg-indigo-900' : 'bg-blue-400'} animated-border`}
        onClick={toggleDarkMode}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >

        <motion.div
          className="absolute inset-0"
          animate={{
            background: isDarkMode
              ? "radial-gradient(circle, rgba(79, 70, 229, 0.8) 0%, rgba(55, 48, 163, 1) 100%)"
              : "radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 1) 100%)"
          }}
          transition={{ duration: 0.6 }}
        />

        <AnimatePresence>
          {!isDarkMode && isHovered && (
            <>
              <motion.div
                key="cloud1"
                className="absolute w-10 h-5 bg-white rounded-full"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 0.7 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ top: '25%', left: '10%' }}
              />
              <motion.div
                key="cloud2"
                className="absolute w-8 h-4 bg-white rounded-full"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 0.7 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ top: '60%', right: '10%' }}
              />
            </>
          )}

          {isDarkMode && isHovered && renderStars(8)}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                <FaMoon className="text-white text-xl" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <motion.div
                animate={{
                  rotate: [0, 180],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, repeatType: "mirror" }
                }}
              >
                <FaSun className="text-white text-xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isDarkMode
              ? [
                  "0 0 10px 2px rgba(79, 70, 229, 0.3)",
                  "0 0 20px 4px rgba(79, 70, 229, 0.5)",
                  "0 0 10px 2px rgba(79, 70, 229, 0.3)"
                ]
              : [
                  "0 0 10px 2px rgba(59, 130, 246, 0.3)",
                  "0 0 20px 4px rgba(59, 130, 246, 0.5)",
                  "0 0 10px 2px rgba(59, 130, 246, 0.3)"
                ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-full top-1/2 -translate-y-1/2 mr-4 whitespace-nowrap"
          >
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-1 text-sm font-medium shadow-lg">
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DarkModeToggle;