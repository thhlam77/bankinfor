import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaFacebook, FaEnvelope, FaCoffee, FaStar } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains('light'));
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        damping: 13
      }
    }
  };

  const socialLinks = [
    { icon: <FaFacebook />, url: "https://facebook.com/zuck", color: "from-blue-600 to-blue-500", hoverColor: "rgba(59, 130, 246, 0.2)", lightColor: "bg-blue-100 text-blue-600 hover:bg-blue-200" },
    { icon: <FaGithub />, url: "https://github.com/thhlam77", color: "from-gray-800 to-gray-600", hoverColor: "rgba(75, 85, 99, 0.2)", lightColor: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
    { icon: <FaEnvelope />, url: "mailto:gaidepvocungtan10@gmail.com", color: "from-red-600 to-pink-600", hoverColor: "rgba(225, 29, 72, 0.2)", lightColor: "bg-red-100 text-red-600 hover:bg-red-200" },
    { icon: <FaCoffee />, url: "#", color: "from-amber-600 to-amber-500", hoverColor: "rgba(217, 119, 6, 0.2)", lightColor: "bg-amber-100 text-amber-600 hover:bg-amber-200" },
  ];

  const stars = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2
  }));

  return (
    <motion.footer
      className="py-16 mt-16 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      <motion.div
        className={`absolute top-0 inset-x-0 h-px ${
          isLightMode
            ? 'bg-gradient-to-r from-transparent via-indigo-300 to-transparent'
            : 'bg-gradient-to-r from-transparent via-[rgba(var(--glow-primary),0.5)] to-transparent'
        }`}
      />

      <motion.div
        className={`absolute -left-32 top-20 w-64 h-64 rounded-full ${
          isLightMode
            ? 'bg-[rgba(var(--glow-primary),0.03)]'
            : 'bg-[rgba(var(--glow-primary),0.03)]'
        } blur-3xl`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: isLightMode ? [0.3, 0.4, 0.3] : [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {!isLightMode && stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute text-[rgb(var(--glow-primary))]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: star.size,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        >
          <FaStar />
        </motion.div>
      ))}

      {isLightMode && (
        <>
          <motion.div
            className="absolute -right-32 top-10 w-52 h-52 rounded-full bg-blue-50/70 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute left-10 bottom-10 w-40 h-40 rounded-full bg-indigo-50/70 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}

      <div className="max-w-xl mx-auto flex flex-col items-center justify-center relative z-10 px-4">
        <motion.div
          className="mb-8 flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.div
            className="w-24 h-24 mb-6 relative"
            whileHover={{ scale: 1.05, rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`absolute inset-0 rounded-full ${
                isLightMode
                  ? 'bg-[rgba(var(--glow-primary),0.15)] blur-md'
                  : 'bg-[rgba(var(--glow-primary),0.2)] blur-md'
              }`}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <img
              src="https://i.imgur.com/WQGAda7.jpeg"
              alt="Logo"
              className={`w-full h-full rounded-full object-cover border-2 ${
                isLightMode
                  ? 'border-gray-200'
                  : 'border-[rgba(255,255,255,0.2)]'
              } z-10 relative`}
            />
          </motion.div>

          <motion.h3
            className="text-xl font-bold gradient-text mb-2 tracking-wide"
            whileHover={{ scale: 1.05 }}
          >
            VUONG HONG LIN
          </motion.h3>

          <motion.p
            className={`text-sm ${
              isLightMode
                ? 'text-gray-600'
                : 'text-[rgba(255,255,255,0.6)]'
            }`}
            variants={itemVariants}
          >
            Not Developer just gái nghịch source :V
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-4 mb-10"
          variants={containerVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden transition-all ${
                isLightMode
                  ? link.lightColor
                  : ''
              }`}
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                y: -5,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {!isLightMode && (
                <>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-20`}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 backdrop-blur-sm border border-white/10 rounded-full"
                    whileHover={{
                      boxShadow: `0 0 15px 5px ${link.hoverColor}`,
                    }}
                  />
                </>
              )}
              <span className={`relative z-10 ${isLightMode ? '' : 'text-white'}`}>{link.icon}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className={`h-px w-3/4 ${
            isLightMode
              ? 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent'
          } mb-8`}
          variants={itemVariants}
        />

        <motion.div
          className={`text-center mb-6 ${
            isLightMode
              ? 'text-gray-600'
              : 'text-[rgba(255,255,255,0.6)]'
          }`}
          variants={itemVariants}
        >
          <p className={`mb-2 ${isLightMode ? 'text-gray-700' : ''}`}>
            Liên hệ súp pọt: <span className="font-medium">https://t.me/hognlin</span>
          </p>
          <motion.p
            className={`text-sm flex items-center justify-center ${
              isLightMode
                ? 'text-gray-500'
                : 'text-[rgba(255,255,255,0.5)]'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Made with
            <motion.span
              className="mx-1 text-red-500"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <FaHeart />
            </motion.span>
            by Vuong Hong Lin
          </motion.p>
        </motion.div>

        <motion.div
          className={`text-sm ${
            isLightMode
              ? 'text-gray-400'
              : 'text-gray-400 dark:text-gray-500'
          }`}
          variants={itemVariants}
        >
          <motion.span
            className="relative"
            whileHover={{
              color: isLightMode ? "#6366f1" : "#8b5cf6",
              transition: { duration: 0.2 }
            }}
          >
            <span className="relative z-10">© {currentYear} Vuong Hong Lin. All rights reserved.</span>
            <motion.span
              className={`absolute bottom-0 left-0 right-0 h-1 ${
                isLightMode
                  ? 'bg-indigo-100'
                  : 'bg-indigo-400/30 dark:bg-indigo-600/30'
              } rounded-full`}
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        </motion.div>

        <motion.div
          className={`absolute bottom-0 right-10 w-32 h-32 ${
            isLightMode
              ? 'opacity-20'
              : 'opacity-30'
          }`}
          animate={{
            y: ["-10%", "10%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${
            isLightMode
              ? 'text-indigo-300'
              : 'text-indigo-500 dark:text-indigo-400'
          }`}>
            <path
              fill="currentColor"
              d="M45.3,-59.2C58.4,-49.3,68.9,-35.1,73.3,-19.3C77.8,-3.5,76.4,13.9,69.1,28.1C61.8,42.2,48.5,53.1,33.8,60.3C19.1,67.5,3,70.9,-13.4,70C-29.9,69.1,-46.7,63.8,-57.4,52.1C-68.1,40.4,-72.6,22.4,-71.7,5.2C-70.7,-12,-64.3,-28.3,-53.6,-39.9C-42.9,-51.4,-28,-58.3,-13.2,-62.6C1.6,-66.9,16.3,-68.6,30.2,-65.9C44.1,-63.2,57.1,-56,45.3,-59.2Z"
              transform="translate(100 100)"
              className="animate-morph"
            />
          </svg>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;