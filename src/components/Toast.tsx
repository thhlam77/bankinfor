import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  showProgress?: boolean;
}

const Toast = memo(({
  open,
  onClose,
  message,
  description = '',
  type = 'success',
  duration = 3000,
  showProgress = true,
}: ToastProps) => {
  const [progress, setProgress] = useState(100);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {

    setIsLightMode(document.documentElement.classList.contains('light'));

    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        setIsLightMode(document.documentElement.classList.contains('light'));
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    setProgress(100);

    let timer: number | undefined;
    let interval: number | undefined;

    if (duration > 0) {
      timer = window.setTimeout(() => {
        onClose();
      }, duration);

      if (showProgress) {
        const stepTime = 100; 
        const steps = duration / stepTime;
        const decrementPerStep = 100 / steps;

        interval = window.setInterval(() => {
          setProgress((prev) => {

            if (prev <= 0) return 0;
            const newProgress = prev - decrementPerStep;
            return newProgress < 0 ? 0 : newProgress;
          });
        }, stepTime);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [open, duration, onClose, showProgress]);

  const toastConfig = useMemo(() => {
    switch (type) {
      case 'success':
        return {
          icon: <FaCheckCircle className="text-2xl" />,
          iconBg: isLightMode ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-gradient-to-br from-emerald-500 to-green-600',
          primaryColor: isLightMode ? 'from-emerald-400 to-green-500' : 'from-emerald-500 to-green-600',
          progressColor: isLightMode ? 'bg-emerald-400' : 'bg-emerald-500',
          ringColor: isLightMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.2)',
          glowColor: isLightMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.5)',
          borderColor: isLightMode ? 'border-emerald-200' : 'border-[rgba(16,185,129,0.3)]',
          bgColor: isLightMode ? 'bg-white' : 'bg-[#0A0A15]/95',
          headerColor: isLightMode ? 'text-emerald-800' : 'text-white',
          textColor: isLightMode ? 'text-gray-700' : 'text-white/70',
        };
      case 'info':
        return {
          icon: <FaInfoCircle className="text-2xl" />,
          iconBg: isLightMode ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : 'bg-gradient-to-br from-blue-500 to-indigo-600',
          primaryColor: isLightMode ? 'from-blue-400 to-indigo-500' : 'from-blue-500 to-indigo-600',
          progressColor: isLightMode ? 'bg-blue-400' : 'bg-blue-500',
          ringColor: isLightMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.2)',
          glowColor: isLightMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.5)',
          borderColor: isLightMode ? 'border-blue-200' : 'border-[rgba(59,130,246,0.3)]',
          bgColor: isLightMode ? 'bg-white' : 'bg-[#0A0A15]/95',
          headerColor: isLightMode ? 'text-blue-800' : 'text-white',
          textColor: isLightMode ? 'text-gray-700' : 'text-white/70',
        };
      case 'warning':
        return {
          icon: <FaExclamationTriangle className="text-2xl" />,
          iconBg: isLightMode ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-amber-500 to-orange-600',
          primaryColor: isLightMode ? 'from-amber-400 to-orange-500' : 'from-amber-500 to-orange-600',
          progressColor: isLightMode ? 'bg-amber-400' : 'bg-amber-500',
          ringColor: isLightMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.2)',
          glowColor: isLightMode ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.5)',
          borderColor: isLightMode ? 'border-amber-200' : 'border-[rgba(245,158,11,0.3)]',
          bgColor: isLightMode ? 'bg-white' : 'bg-[#0A0A15]/95',
          headerColor: isLightMode ? 'text-amber-800' : 'text-white',
          textColor: isLightMode ? 'text-gray-700' : 'text-white/70',
        };
      case 'error':
        return {
          icon: <FaTimesCircle className="text-2xl" />,
          iconBg: isLightMode ? 'bg-gradient-to-br from-rose-400 to-red-500' : 'bg-gradient-to-br from-rose-500 to-red-600',
          primaryColor: isLightMode ? 'from-rose-400 to-red-500' : 'from-rose-500 to-red-600',
          progressColor: isLightMode ? 'bg-rose-400' : 'bg-rose-500',
          ringColor: isLightMode ? 'rgba(244, 63, 94, 0.15)' : 'rgba(244, 63, 94, 0.2)',
          glowColor: isLightMode ? 'rgba(244, 63, 94, 0.3)' : 'rgba(244, 63, 94, 0.5)',
          borderColor: isLightMode ? 'border-rose-200' : 'border-[rgba(244,63,94,0.3)]',
          bgColor: isLightMode ? 'bg-white' : 'bg-[#0A0A15]/95',
          headerColor: isLightMode ? 'text-rose-800' : 'text-white',
          textColor: isLightMode ? 'text-gray-700' : 'text-white/70',
        };
      default:
        return {
          icon: <FaCheckCircle className="text-2xl" />,
          iconBg: isLightMode ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-gradient-to-br from-emerald-500 to-green-600',
          primaryColor: isLightMode ? 'from-emerald-400 to-green-500' : 'from-emerald-500 to-green-600',
          progressColor: isLightMode ? 'bg-emerald-400' : 'bg-emerald-500',
          ringColor: isLightMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.2)',
          glowColor: isLightMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.5)',
          borderColor: isLightMode ? 'border-emerald-200' : 'border-[rgba(16,185,129,0.3)]',
          bgColor: isLightMode ? 'bg-white' : 'bg-[#0A0A15]/95',
          headerColor: isLightMode ? 'text-emerald-800' : 'text-white',
          textColor: isLightMode ? 'text-gray-700' : 'text-white/70',
        };
    }
  }, [type, isLightMode]);

  const {
    icon,
    iconBg,
    primaryColor,
    progressColor,
    ringColor,
    glowColor,
    borderColor,
    bgColor,
    headerColor,
    textColor
  } = toastConfig;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const containerAnimationVariants = {
    initial: { opacity: 0, x: -100, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100, scale: 0.9 }
  };

  const headerAnimationVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 }
  };

  const descriptionAnimationVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 }
  };

  const miniStarsCount = !isLightMode ? 6 : 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-8 left-8 z-50 max-w-md"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerAnimationVariants}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          style={{
            filter: `drop-shadow(0 10px 15px ${ringColor})`,
            willChange: 'transform'
          }}
        >
          <div className={`relative p-[1px] rounded-xl overflow-hidden`}>

            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${primaryColor} rounded-xl ${isLightMode ? 'opacity-50' : 'opacity-70'}`}
              animate={{
                opacity: isLightMode ? [0.5, 0.7, 0.5] : [0.7, 0.9, 0.7],
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% 200%' }}
            />

            <div className={`relative p-5 ${bgColor} ${isLightMode ? 'backdrop-blur-sm' : 'backdrop-blur-md'} rounded-xl border ${borderColor} ${isLightMode ? 'shadow-lg' : ''} flex items-start gap-4 overflow-hidden`}>

              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{ opacity: [0, isLightMode ? 0.05 : 0.1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
                }}
              />

              {!isLightMode && miniStarsCount > 0 && Array.from({ length: miniStarsCount }).map((_, i) => (
                <motion.div
                  key={`mini-star-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    x: `calc(50% + ${Math.cos(Math.PI * 2 * i / miniStarsCount) * 60}px)`,
                    y: `calc(50% + ${Math.sin(Math.PI * 2 * i / miniStarsCount) * 60}px)`,
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}

              <motion.div
                className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center text-white flex-shrink-0 ${isLightMode ? 'shadow-md' : ''}`}
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  delay: 0.1
                }}
                style={{ willChange: 'transform' }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {icon}
                </motion.div>
              </motion.div>

              <div className="flex-1 pr-6">
                <motion.h4
                  className={`text-lg font-bold ${headerColor} mb-1`}
                  variants={headerAnimationVariants}
                  transition={{ delay: 0.2 }}
                >
                  {message}
                </motion.h4>

                {description && (
                  <motion.p
                    className={`${textColor} text-sm`}
                    variants={descriptionAnimationVariants}
                    transition={{ delay: 0.3 }}
                  >
                    {description}
                  </motion.p>
                )}

                {showProgress && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 rounded-full origin-left"
                    style={{
                      width: '100%',
                      transform: `scaleX(${progress / 100})`,
                      background: isLightMode
                        ? `linear-gradient(to right, ${progressColor}, ${progressColor}88)`
                        : `linear-gradient(to right, ${progressColor}, ${progressColor}88)`,
                    }}
                  />
                )}
              </div>

              <motion.button
                className={`absolute top-3 right-3 ${isLightMode ? 'text-gray-400 hover:text-gray-600' : 'text-white/50 hover:text-white'} transition-colors`}
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Toast.displayName = 'Toast';

export default Toast;