import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

interface EpicLoadingProps {
  onLoadingComplete: () => void;
  profileImage: string;
  name: string;
}

const EpicLoading: React.FC<EpicLoadingProps> = ({ onLoadingComplete, profileImage, name }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const orbitRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const textControls = useAnimationControls();

  let interval: ReturnType<typeof setTimeout> | null = null;
  let progressInterval: ReturnType<typeof setTimeout> | null = null;

  const cosmicParticles = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 2,
    rotation: Math.random() * 360,
    color: i % 5 === 0
      ? 'rgba(139, 92, 246, 0.8)' 
      : i % 4 === 0
        ? 'rgba(79, 70, 229, 0.8)' 
        : i % 3 === 0
          ? 'rgba(59, 130, 246, 0.8)' 
          : i % 2 === 0
            ? 'rgba(236, 72, 153, 0.7)' 
            : 'rgba(255, 255, 255, 0.7)' 
  }));

  const hexPoints = [0, 1, 2, 3, 4, 5].map(i => {
    const angle = (i * Math.PI * 2) / 6 + Math.PI / 6;
    return {
      id: i,
      x: Math.cos(angle),
      y: Math.sin(angle),
      delay: i * 0.15
    };
  });

  const energyLines = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    rotate: i * 18,
    length: 30 + Math.random() * 80,
    thickness: Math.random() * 2 + 1,
    speed: Math.random() * 2 + 2,
    offset: Math.random() * 100,
    color: `hsl(${(i * 20) % 360}, 90%, 60%)`
  }));

  useEffect(() => {

    const runPhase0 = () => {
      controls.start({
        scale: [0, 1.2, 1],
        opacity: [0, 1],
        transition: { duration: 1.5, ease: "easeOut" }
      });

      textControls.start({
        opacity: [0, 1],
        y: [20, 0],
        transition: { duration: 1, delay: 0.5 }
      });

      progressInterval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + (1 + Math.random() * 2);
          return newValue > 30 ? 30 : newValue;
        });
      }, 120);

      setTimeout(() => {
        clearInterval(progressInterval as number); 
        progressInterval = null; 
        setPhase(1);
      }, 2000);
    };

    const runPhase1 = () => {
      controls.start({
        rotate: 180,
        transition: { duration: 1.5, ease: "easeInOut" }
      });

      progressInterval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + (1 + Math.random() * 3);
          return newValue > 60 ? 60 : newValue;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(progressInterval as number); 
        progressInterval = null; 
        setPhase(2);
      }, 2000);
    };

    const runPhase2 = () => {
      controls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 1.5, ease: "easeInOut" }
      });

      progressInterval = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + (1 + Math.random() * 4);
          return newValue > 95 ? 95 : newValue;
        });
      }, 80);

      setTimeout(() => {
        clearInterval(progressInterval as number); 
        progressInterval = null; 
        setPhase(3);
      }, 2000);
    };

    const runPhase3 = () => {
      controls.start({
        scale: [1, 1.5, 0],
        opacity: [1, 1, 0],
        transition: { duration: 1.5, ease: "easeInOut" }
      });

      textControls.start({
        opacity: [1, 0],
        y: [0, -20],
        transition: { duration: 1 }
      });

      setProgress(100);

      setTimeout(() => {
        onLoadingComplete();
      }, 1500);
    };

    if (phase === 0) runPhase0();
    else if (phase === 1) runPhase1();
    else if (phase === 2) runPhase2();
    else if (phase === 3) runPhase3();

    return () => {
      if (interval) { 
        clearInterval(interval as number); 
        interval = null; 
      }
      if (progressInterval) { 
        clearInterval(progressInterval as number); 
        progressInterval = null; 
      }
    };
  }, [controls, textControls, phase, onLoadingComplete]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;

      const rect = orbitRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = (e.clientX - centerX) / 40;
      const moveY = (e.clientY - centerY) / 40;

      orbitRef.current.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >

      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/30 to-black">

        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-pink-500/10 blur-3xl"></div>
        </div>

        {cosmicParticles.map(particle => (
          <motion.div
            key={`cosmic-${particle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}vw`,
              top: `${particle.y}vh`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              rotate: `${particle.rotation}deg`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              rotate: [`${particle.rotation}deg`, `${particle.rotation + 180}deg`],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {energyLines.map(line => (
          <motion.div
            key={`energy-${line.id}`}
            className="absolute h-px origin-center"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${line.color} 50%, transparent 100%)`,
              rotate: `${line.rotate}deg`,
              width: line.length,
              height: line.thickness,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.2, 1.5, 0.2],
              width: [0, line.length, 0],
            }}
            transition={{
              duration: line.speed,
              repeat: Infinity,
              delay: line.offset / 100,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center" style={{ perspective: 1000 }}>
        <motion.div
          ref={orbitRef}
          className="relative flex items-center justify-center mb-16"
          style={{ transformStyle: 'preserve-3d' }}
          animate={controls}
        >

          {[1, 2, 3].map((ring) => (
            <motion.div
              key={`ring-${ring}`}
              className="absolute rounded-full border-2 border-indigo-500/30"
              style={{
                width: 160 + ring * 40,
                height: 160 + ring * 40,
              }}
              animate={{
                rotateZ: [0, 360],
                rotateX: [30, 60, 30],
                rotateY: [0, 180, 0],
                opacity: [0.1, 0.3, 0.1],
                borderColor: [
                  'rgba(99, 102, 241, 0.3)',
                  'rgba(139, 92, 246, 0.3)',
                  'rgba(236, 72, 153, 0.3)',
                  'rgba(99, 102, 241, 0.3)',
                ],
              }}
              transition={{
                duration: 10 - ring * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {hexPoints.map((point) => (
            <motion.div
              key={`hex-${point.id}`}
              className="absolute w-4 h-4 z-10"
              style={{
                x: point.x * 110,
                y: point.y * 110,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                z: [30, -30, 30],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: point.delay,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-full h-full rounded-md bg-indigo-500"
                animate={{
                  rotateZ: [0, 360],
                  backgroundColor: [
                    'rgb(99, 102, 241)',
                    'rgb(139, 92, 246)',
                    'rgb(236, 72, 153)',
                    'rgb(99, 102, 241)',
                  ],
                  boxShadow: [
                    '0 0 10px 2px rgba(99, 102, 241, 0.5)',
                    '0 0 15px 4px rgba(139, 92, 246, 0.6)',
                    '0 0 10px 2px rgba(236, 72, 153, 0.5)',
                    '0 0 10px 2px rgba(99, 102, 241, 0.5)',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}

          <div className="relative w-40 h-40 flex items-center justify-center">

            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 40px 10px rgba(139, 92, 246, 0.3)',
                  '0 0 60px 20px rgba(139, 92, 246, 0.4)',
                  '0 0 40px 10px rgba(139, 92, 246, 0.3)',
                ],
                background: [
                  'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, rgba(79, 70, 229, 0.1) 50%, transparent 70%)',
                  'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
                  'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, rgba(79, 70, 229, 0.1) 50%, transparent 70%)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative w-32 h-32 rounded-full overflow-hidden border border-indigo-500/50 bg-black/30 backdrop-blur-sm">

              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'radial-gradient(circle at center, transparent 0%, rgba(79, 70, 229, 0.3) 100%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={`grid-${i}`}
                    className="border-[0.5px] border-indigo-500/10"
                    animate={{
                      opacity: [
                        0.05 + Math.random() * 0.1,
                        0.2 + Math.random() * 0.2,
                        0.05 + Math.random() * 0.1
                      ]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-indigo-900/30"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 12;
                const radius = 60;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={`energy-particle-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: -1,
                      marginTop: -1,
                    }}
                    animate={{
                      x: [x * 0.5, x, x * 0.5],
                      y: [y * 0.5, y, y * 0.5],
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center space-y-6"
          animate={textControls}
        >

          <div className="relative">
            <motion.div
              className="absolute inset-0 blur-md opacity-50"
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                {name}
              </h1>
            </motion.div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {name}
            </h1>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-white text-lg font-medium">
                {phase === 0 ? "Initializing System" :
                 phase === 1 ? "Energizing Core" :
                 phase === 2 ? "Stabilizing Interface" :
                 "Launching Experience"}
              </div>
              <div className="flex space-x-1">
                {[0, 1, 2].map((_, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.2, 1, 0.2],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative w-80 h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-0 rounded-full opacity-10"
                animate={{
                  background: [
                    'linear-gradient(90deg, rgba(79, 70, 229, 0.5) 0%, rgba(139, 92, 246, 0.5) 100%)',
                    'linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, rgba(236, 72, 153, 0.5) 100%)',
                    'linear-gradient(90deg, rgba(236, 72, 153, 0.5) 0%, rgba(79, 70, 229, 0.5) 100%)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                style={{ width: `${progress}%` }}
              />

              {progress > 0 && Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={`packet-${i}`}
                  className="absolute top-0 h-full w-6 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                  }}
                  animate={{
                    left: ['-10%', `${Math.min(progress, 100) + 5}%`],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                    repeatDelay: 0.2
                  }}
                />
              ))}
            </div>

            <div className="text-indigo-300 font-mono text-sm">
              {Math.floor(progress)}% <span className="opacity-50">| {Math.floor(progress * 1.2)} blocks processed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EpicLoading;