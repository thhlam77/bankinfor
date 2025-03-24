import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import PaymentSection from './components/PaymentSection';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { ToastProvider } from './contexts/ToastContext';
import './index.css';
import EpicLoading from './components/EpicLoading'; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true); 
  const [isContentReady, setIsContentReady] = useState(false); 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stars = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.3,
  })), []);

  const handleMouseMove = useCallback((e: MouseEvent) => {

    if (
      Math.abs(e.clientX - mousePosition.x) > 10 ||
      Math.abs(e.clientY - mousePosition.y) > 10
    ) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  }, [mousePosition]);

  useEffect(() => {

    const loadTimer = setTimeout(() => {
      setIsLoading(false);

      setTimeout(() => {
        setIsContentReady(true);
      }, 600);
    }, 2500);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const handleThemeChange = useCallback((darkMode: boolean) => {
    setIsDarkMode(darkMode);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      setIsContentReady(true);
    }, 600); 
  }, []);

  const profileImageURL = "https://i.imgur.com/WQGAda7.jpeg"; 
  const profileName = "Vuong Hong Lin"; 

  return (
    <ToastProvider>

      <AnimatePresence mode="wait">
        {isLoading && (
          <EpicLoading
            onLoadingComplete={handleLoadingComplete}
            profileImage={profileImageURL}
            name={profileName}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && !isContentReady && (
          <motion.div
            className="fixed inset-0 z-[90] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-lg"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen overflow-hidden relative">

        <div className="grid-background" />

        <div className="glow-point" style={{ left: '20%', top: '20%' }} />
        <div className="glow-point" style={{ right: '25%', top: '60%' }} />
        <div className="glow-point" style={{ left: '50%', bottom: '20%' }} />

        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="star"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              '--duration': `${star.duration}s`,
              '--opacity': star.opacity,
              animationDelay: `${star.delay}s`,
            } as React.CSSProperties}
          />
        ))}

        <motion.div
          className="pointer-events-none fixed w-64 h-64 rounded-full z-0"
          animate={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            opacity: 0.08,
          }}
          transition={{ duration: 0.1 }}
          style={{
            background: "radial-gradient(circle, rgba(var(--glow-primary), 0.4) 0%, rgba(var(--glow-primary), 0) 70%)",
          }}
        />

        <ThemeToggle onChange={handleThemeChange} />

        <AnimatePresence>
          {isContentReady && (
            <motion.div
              className="container-custom py-8 relative z-10"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
            >
              <motion.div variants={itemVariants}>
                <Header
                  profileImage={profileImageURL}
                  name={profileName}
                  title="Just gái nghijch sourceeee"
                  facebookUrl="fb.com/zuck"
                  locationText="Vietnam"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <PaymentSection />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Footer />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isContentReady && (
            <motion.div
              className="fixed bottom-6 right-6 z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, type: "spring" }}
            >
              <motion.button
                className="w-10 h-10 rounded-full glass border-glow flex items-center justify-center text-white/80 hover:text-white"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(var(--glow-primary), 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastProvider>
  );
}

export default App;