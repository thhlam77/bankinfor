import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaPhone, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';

interface HeaderProps {
  profileImage: string;
  name: string;
  title: string;
  facebookUrl: string;
  locationText: string;
}

const Header: React.FC<HeaderProps> = ({
  profileImage,
  name,
  title,
  facebookUrl,
  locationText,
}) => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
  };

  const linkVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
  };

  return (
    <motion.header
      className="py-16 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`absolute -left-20 -top-20 w-64 h-64 rounded-full ${
          isLightMode
            ? 'bg-[rgba(var(--glow-primary),0.05)]'
            : 'bg-[rgba(var(--glow-primary),0.03)]'
        } blur-3xl animate-pulse-slow`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: isLightMode ? [0.4, 0.6, 0.4] : [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className={`absolute top-1/2 -right-32 w-80 h-80 rounded-full ${
          isLightMode
            ? 'bg-[rgba(var(--glow-secondary),0.05)]'
            : 'bg-[rgba(var(--glow-secondary),0.03)]'
        } blur-3xl animate-pulse-slow`}
        animate={{
          scale: [1, 1.15, 1],
          opacity: isLightMode ? [0.3, 0.5, 0.3] : [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="flex flex-col md:flex-row items-center md:items-start">
        <motion.div
          className="mb-8 md:mb-0 md:mr-12"
          variants={itemVariants}
        >
          <div className="relative">
            <motion.div
              className={`w-36 h-36 md:w-44 md:h-44 rounded-full ${
                isLightMode
                  ? 'bg-[rgba(var(--glow-primary),0.15)]'
                  : 'bg-[rgba(var(--glow-primary),0.2)]'
              } absolute -inset-1.5 blur-sm`}
              animate={{
                scale: [1, 1.05, 1],
                opacity: isLightMode ? [0.5, 0.7, 0.5] : [0.7, 0.9, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div
              className={`w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 ${
                isLightMode
                  ? 'border-[rgba(var(--glow-primary),0.2)]'
                  : 'border-[rgba(var(--glow-primary),0.3)]'
              } relative z-10`}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover"
              />
              <motion.div
                className={`absolute inset-0 bg-gradient-to-t ${
                  isLightMode
                    ? 'from-black/20 to-transparent'
                    : 'from-black/40 to-transparent'
                }`}
                animate={{ opacity: [isLightMode ? 0.2 : 0.3, isLightMode ? 0.3 : 0.5, isLightMode ? 0.2 : 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              className={`absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 ${
                isLightMode
                  ? 'bg-white shadow-lg border border-gray-200'
                  : 'bg-[rgba(20,20,30,0.8)] backdrop-blur-sm border border-[rgba(var(--glow-primary),0.3)]'
              } rounded-full flex items-center justify-center z-20`}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-5 h-5 md:w-6 md:h-6 bg-emerald-500 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(52, 211, 153, 0.7)",
                    "0 0 0 10px rgba(52, 211, 153, 0)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3"
            variants={itemVariants}
          >
            {name}
          </motion.h1>

          <motion.p
            className={`text-xl ${
              isLightMode
                ? 'text-gray-600'
                : 'text-[rgba(255,255,255,0.7)]'
            } mb-8 relative inline-block`}
            variants={itemVariants}
          >
            {title}
            <motion.span
              className={`absolute bottom-0 left-0 h-px w-full ${
                isLightMode
                  ? 'bg-gradient-to-r from-transparent via-[rgba(var(--glow-primary),0.5)] to-transparent'
                  : 'bg-gradient-to-r from-transparent via-[rgba(var(--glow-primary),0.7)] to-transparent'
              }`}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            />
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-3 mb-8"
            variants={itemVariants}
          >
            <motion.a
              href={`https://${facebookUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors shine ${
                isLightMode
                  ? 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
                  : 'bg-[rgba(30,30,50,0.5)] hover:bg-[rgba(var(--glow-primary),0.15)] border border-[rgba(var(--glow-primary),0.2)]'
              }`}
              variants={linkVariants}
              whileHover="hover"
              initial="rest"
            >
              <FaFacebook className={isLightMode ? "text-blue-600" : "text-blue-400"} />
              <span className={isLightMode ? "text-blue-900" : "text-white"}>{facebookUrl}</span>
            </motion.a>

            <motion.a
              href="tel:+84123456789"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors shine ${
                isLightMode
                  ? 'bg-green-50 hover:bg-green-100 border border-green-200'
                  : 'bg-[rgba(30,30,50,0.5)] hover:bg-[rgba(var(--glow-tertiary),0.15)] border border-[rgba(var(--glow-tertiary),0.2)]'
              }`}
              variants={linkVariants}
              whileHover="hover"
              initial="rest"
            >
              <FaPhone className={isLightMode ? "text-green-600" : "text-green-400"} />
              <span className={isLightMode ? "text-green-900" : "text-white"}>+84 123 456 789</span>
            </motion.a>

            <motion.a
              href={`https://github.com/williamcachamwri`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors shine ${
                isLightMode
                  ? 'bg-purple-50 hover:bg-purple-100 border border-purple-200'
                  : 'bg-[rgba(30,30,50,0.5)] hover:bg-[rgba(var(--glow-secondary),0.15)] border border-[rgba(var(--glow-secondary),0.2)]'
              }`}
              variants={linkVariants}
              whileHover="hover"
              initial="rest"
            >
              <FaGithub className={isLightMode ? "text-purple-700" : "text-purple-300"} />
              <span className={isLightMode ? "text-purple-900" : "text-white"}>github.com/williamcachamwri</span>
            </motion.a>
          </motion.div>

          <motion.div
            className={`flex items-center justify-center md:justify-start gap-2 ${
              isLightMode ? 'text-gray-500' : 'text-[rgba(255,255,255,0.6)]'
            }`}
            variants={itemVariants}
          >
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <FaMapMarkerAlt className={isLightMode ? "text-pink-600" : "text-pink-400"} />
            </motion.div>
            <span>{locationText}</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className={`mt-16 h-px w-full ${
          isLightMode
            ? 'bg-gradient-to-r from-transparent via-[rgba(var(--glow-primary),0.2)] to-transparent'
            : 'bg-gradient-to-r from-transparent via-[rgba(var(--glow-primary),0.3)] to-transparent'
        }`}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      />
    </motion.header>
  );
};

export default Header;
