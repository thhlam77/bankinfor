import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentCard from './PaymentCard';
import { FaCreditCard, FaFilter, FaUniversity, FaWallet, FaGlobeAmericas } from 'react-icons/fa';

const FilterButton = memo(({
  label,
  value,
  icon,
  isActive,
  isLightMode,
  onHoverStart,
  onHoverEnd,
  onClick
}: {
  label: string;
  value: string | null;
  icon: React.ReactNode;
  isActive: boolean;
  isLightMode: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) => {
  const filterVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-full flex items-center gap-2 border ${
        isActive
          ? isLightMode
            ? 'bg-indigo-100 border-indigo-300 text-indigo-900 shadow-md'
            : 'bg-[rgba(var(--glow-primary),0.15)] border-[rgba(var(--glow-primary),0.3)] text-white neon-outline'
          : isLightMode
            ? 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700 shadow-sm'
            : 'bg-[rgba(10,10,25,0.6)] hover:bg-[rgba(20,20,35,0.8)] border-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.7)]'
      } transition-all`}
      variants={filterVariants}
      animate={isActive ? 'active' : 'inactive'}
      whileHover="hover"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileTap={{ scale: 0.98 }}
    >
      <span className={isActive && isLightMode ? 'text-indigo-700' : ''}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </motion.button>
  );
});

const PaymentSection = memo(() => {
  const [filter, setFilter] = useState<string | null>(null);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
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

  const paymentMethods = useMemo(() => [
    {
      id: 1,
      bankName: 'MBBank',
      logoSrc: 'https://ibrand.vn/wp-content/uploads/2024/07/mbbank-logo-5.png',
      accountName: 'VUONG HONG LIN',
      accountNumber: '1007200924xxxx',
      buttonType: 'copy' as const,
      category: 'bank',
    },
    {
      id: 2,
      bankName: 'Vietcombank',
      logoSrc: 'https://play-lh.googleusercontent.com/hRq2DVKkzBXQkyftxr0e2ytl0fS2hEWx3UTe3V652RfJVYWqVRGgBNhmZgqNzJ8PKHE=w480-h960-rw',
      accountName: 'VUONG HONG LIN',
      accountNumber: '1007200924xxxx',
      buttonType: 'copy' as const,
      category: 'bank',
    },
    {
      id: 3,
      bankName: 'MoMo',
      logoSrc: 'https://dinhduyvinh.eu.org/assets/img/momo.png',
      accountName: 'VUONG HONG LIN',
      accountNumber: 'Nhấp vào nút bên dưới',
      buttonType: 'link' as const,
      buttonLink: '#',
      category: 'e-wallet',
    },
  ], []);

  const filteredPayments = useMemo(() =>
    filter
      ? paymentMethods.filter(method => method.category === filter)
      : paymentMethods
  , [filter, paymentMethods]);

  const handleFilterChange = useCallback((newFilter: string | null) => {
    setFilter(newFilter);
  }, []);

  const handleHoverStart = useCallback((value: string | null) => {
    setHoveredFilter(value);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredFilter(null);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const filterIcons = useMemo(() => ({
    all: <FaFilter className={`${
      isLightMode
        ? (filter === null ? 'text-indigo-700' : 'text-gray-500')
        : 'text-[rgba(var(--glow-primary),0.8)]'
    }`} />,
    bank: <FaUniversity className={`${
      isLightMode
        ? (filter === 'bank' ? 'text-indigo-700' : 'text-gray-500')
        : 'text-[rgba(var(--glow-primary),0.8)]'
    }`} />,
    wallet: <FaWallet className={`${
      isLightMode
        ? (filter === 'e-wallet' ? 'text-indigo-700' : 'text-gray-500')
        : 'text-[rgba(var(--glow-primary),0.8)]'
    }`} />,
    globe: <FaGlobeAmericas className={`${
      isLightMode
        ? (filter === 'international' ? 'text-indigo-700' : 'text-gray-500')
        : 'text-[rgba(var(--glow-primary),0.8)]'
    }`} />
  }), [filter, isLightMode]);

  return (
    <motion.section
      className="py-24 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      <motion.div
        className={`absolute -right-32 top-0 w-64 h-64 rounded-full ${
          isLightMode
            ? 'bg-[rgba(var(--glow-tertiary),0.05)]'
            : 'bg-[rgba(var(--glow-tertiary),0.03)]'
        } blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: isLightMode ? [0.3, 0.5, 0.3] : [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className={`absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t ${
          isLightMode
            ? 'from-[rgba(var(--glow-primary),0.04)]'
            : 'from-[rgba(var(--glow-primary),0.03)]'
        } to-transparent blur-3xl`}
        animate={{
          opacity: isLightMode ? [0.15, 0.25, 0.15] : [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="text-center mb-20"
        variants={itemVariants}
      >
        <motion.div
          className="inline-flex items-center justify-center gap-3 mb-4 text-glow"
          whileHover={{ scale: 1.03 }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <FaCreditCard className={`text-2xl ${
              isLightMode ? 'text-indigo-600' : 'text-[rgb(var(--glow-primary))]'
            }`} />
          </motion.div>
          <h2 className={`text-4xl md:text-5xl font-bold ${
            isLightMode
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700'
              : 'bg-clip-text text-transparent bg-gradient-to-r from-white via-[rgb(var(--glow-primary))] to-white'
          }`}>
            THÔNG TIN THANH TOÁN
          </h2>
        </motion.div>

        <motion.p
          className={`max-w-xl mx-auto mb-10 text-lg ${
            isLightMode ? 'text-gray-600' : 'text-[rgba(255,255,255,0.6)]'
          }`}
          variants={itemVariants}
        >
          Các phương thức thanh toán được chấp nhận để giao dịch với Vuong Honglin
        </motion.p>

        <motion.div
          className={`w-24 h-1 ${
            isLightMode
              ? 'bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200'
              : 'bg-gradient-to-r from-[rgba(var(--glow-primary),0.2)] via-[rgba(var(--glow-primary),0.5)] to-[rgba(var(--glow-primary),0.2)]'
          } mx-auto mb-10 rounded-full`}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-2"
          variants={itemVariants}
        >
          <FilterButton
            label="Tất cả"
            value={null}
            icon={filterIcons.all}
            isActive={filter === null}
            isLightMode={isLightMode}
            onHoverStart={() => handleHoverStart(null)}
            onHoverEnd={handleHoverEnd}
            onClick={() => handleFilterChange(null)}
          />
          <FilterButton
            label="Ngân hàng"
            value="bank"
            icon={filterIcons.bank}
            isActive={filter === 'bank'}
            isLightMode={isLightMode}
            onHoverStart={() => handleHoverStart('bank')}
            onHoverEnd={handleHoverEnd}
            onClick={() => handleFilterChange('bank')}
          />
          <FilterButton
            label="Ví điện tử"
            value="e-wallet"
            icon={filterIcons.wallet}
            isActive={filter === 'e-wallet'}
            isLightMode={isLightMode}
            onHoverStart={() => handleHoverStart('e-wallet')}
            onHoverEnd={handleHoverEnd}
            onClick={() => handleFilterChange('e-wallet')}
          />
          <FilterButton
            label="Quốc tế"
            value="international"
            icon={filterIcons.globe}
            isActive={filter === 'international'}
            isLightMode={isLightMode}
            onHoverStart={() => handleHoverStart('international')}
            onHoverEnd={handleHoverEnd}
            onClick={() => handleFilterChange('international')}
          />
        </motion.div>

        <motion.p
          className={`text-sm mt-4 ${
            isLightMode ? 'text-gray-500' : 'text-[rgba(255,255,255,0.4)]'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {filter ? `Đang hiển thị ${filteredPayments.length} phương thức thanh toán` : `Đang hiển thị tất cả ${paymentMethods.length} phương thức thanh toán`}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8"
        style={{ willChange: 'transform, opacity' }}
        variants={containerVariants}
      >
        <AnimatePresence mode="popLayout">
          {filteredPayments.map((method) => (
            <motion.div
              key={method.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout="position"
              layoutId={`payment-card-${method.id}`}
              className="h-full"
              style={{ willChange: 'transform' }}
            >
              <PaymentCard
                bankName={method.bankName}
                logoSrc={method.logoSrc}
                accountName={method.accountName}
                accountNumber={method.accountNumber}
                buttonType={method.buttonType}
                buttonLink={method.buttonLink}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={`mt-16 h-px w-full max-w-3xl mx-auto ${
          isLightMode
            ? 'bg-gradient-to-r from-transparent via-indigo-200 to-transparent'
            : 'bg-gradient-to-r from-transparent via-[rgba(var(--glow-primary),0.15)] to-transparent'
        }`}
        initial={{ width: "0%", opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />
    </motion.section>
  );
});

PaymentSection.displayName = 'PaymentSection';
FilterButton.displayName = 'FilterButton';

export default PaymentSection;
