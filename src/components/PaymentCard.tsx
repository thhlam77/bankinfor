import { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaExternalLinkAlt, FaCheck, FaInfoCircle } from 'react-icons/fa';
import useToast from '../hooks/useToast';

interface PaymentCardProps {
  bankName: string;
  logoSrc: string;
  accountName: string;
  accountNumber: string;
  buttonType: 'copy' | 'link';
  buttonLink?: string;
}

const PaymentCard = memo(({
  bankName,
  logoSrc,
  accountName,
  accountNumber,
  buttonType,
  buttonLink,
}: PaymentCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const { showToast } = useToast();

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

  const handleCopy = useCallback(() => {
    if (buttonType === 'copy') {
      navigator.clipboard.writeText(accountNumber);
      setCopied(true);

      showToast({
        type: 'success',
        message: 'Đã sao chép thành công!',
        description: `Số tài khoản ${bankName} đã được sao chép vào clipboard.`,
        duration: 3000,
        showProgress: true,
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [accountNumber, bankName, buttonType, showToast]);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleLinkClick = useCallback(() => {
    showToast({
      type: 'info',
      message: `Đang chuyển hướng đến ${bankName}`,
      description: 'Bạn sẽ được chuyển đến trang thanh toán ngoài.',
      duration: 3000,
    });
  }, [bankName, showToast]);

  const copyButtonContent = (
    <>
      <motion.div
        className={`absolute inset-0 ${
          isLightMode
            ? 'bg-gradient-to-r from-indigo-50 to-indigo-100'
            : 'bg-gradient-to-r from-[rgba(var(--glow-primary),0.05)] to-[rgba(var(--glow-primary),0.2)]'
        }`}
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div className="relative z-10 flex items-center justify-center gap-2">
        {copied ? (
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaCheck className={isLightMode ? "text-green-600" : "text-green-400"} />
            <span>ĐÃ SAO CHÉP</span>
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaCopy />
            <span>SAO CHÉP</span>
          </motion.div>
        )}
      </motion.div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "100%" }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          style={{
            background: isLightMode
              ? "linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent)"
              : "linear-gradient(90deg, transparent, rgba(var(--glow-primary), 0.15), transparent)",
            zIndex: 0
          }}
        />
      )}
    </>
  );

  const linkButtonContent = (
    <>
      <motion.div
        className={`absolute inset-0 ${
          isLightMode
            ? 'bg-gradient-to-r from-blue-50 to-blue-100'
            : 'bg-gradient-to-r from-[rgba(var(--glow-tertiary),0.05)] to-[rgba(var(--glow-tertiary),0.2)]'
        }`}
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div className="relative z-10 flex items-center justify-center gap-2">
        <FaExternalLinkAlt />
        <span>MỞ LIÊN KẾT</span>
      </motion.div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "100%" }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          style={{
            background: isLightMode
              ? "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)"
              : "linear-gradient(90deg, transparent, rgba(var(--glow-tertiary), 0.15), transparent)",
            zIndex: 0
          }}
        />
      )}
    </>
  );

  return (
    <motion.div
      className={`h-full rounded-2xl overflow-hidden border hover-3d ${
        isLightMode
          ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-lg'
          : 'bg-gradient-to-br from-[#0A0A1A] to-[#12121E] border-[rgba(255,255,255,0.03)]'
      }`}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{ willChange: 'transform' }}
    >

      <motion.div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[rgba(var(--glow-primary),0.5)] to-transparent`}
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-7 h-full flex flex-col">

        <div className="flex items-center space-x-4 mb-7">
          <motion.div
            className={`w-16 h-16 rounded-xl flex items-center justify-center p-3 relative overflow-hidden border ${
              isLightMode
                ? 'bg-white border-gray-200 shadow-md'
                : 'glass border-[rgba(255,255,255,0.05)]'
            }`}
            animate={{
              boxShadow: isHovered
                ? isLightMode
                  ? ["0 0 0 rgba(var(--glow-primary), 0)", "0 0 25px rgba(var(--glow-primary), 0.15)", "0 0 0 rgba(var(--glow-primary), 0)"]
                  : ["0 0 0 rgba(var(--glow-primary), 0)", "0 0 25px rgba(var(--glow-primary), 0.2)", "0 0 0 rgba(var(--glow-primary), 0)"]
                : isLightMode
                  ? "0 4px 10px rgba(0, 0, 0, 0.05)"
                  : "0 0 0 rgba(var(--glow-primary), 0)",
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          >

            {isHovered && (
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${isLightMode ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'}, transparent)`,
                }}
              />
            )}
            <img
              src={logoSrc}
              alt={bankName}
              className="w-full h-full object-contain relative z-10"
            />
          </motion.div>

          <div>
            <motion.h3
              className={`font-bold text-2xl ${isLightMode ? 'text-gray-800' : 'text-white'}`}
              animate={{
                textShadow: isHovered
                  ? isLightMode
                    ? ["0 0 0 rgba(0,0,0,0)", "0 0 10px rgba(var(--glow-primary),0.2)", "0 0 0 rgba(0,0,0,0)"]
                    : ["0 0 0 rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.3)", "0 0 0 rgba(255,255,255,0)"]
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            >
              {bankName}
            </motion.h3>

            <motion.p
              className={`text-sm mt-1 ${isLightMode ? 'text-gray-500' : 'text-[rgba(255,255,255,0.5)]'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Bank Account
            </motion.p>
          </div>
        </div>

        <motion.div
          className={`rounded-xl p-5 mb-7 relative overflow-hidden ${
            isLightMode ? 'bg-gray-50 border border-gray-200' : 'bg-[#0D0D15]'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >

          <div className="absolute inset-0 p-[1px] rounded-xl">
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-[rgba(var(--glow-primary),0.2)] via-[rgba(var(--glow-secondary),0.2)] to-[rgba(var(--glow-tertiary),0.2)] opacity-60 ${
              isLightMode ? 'blur-[2px]' : 'blur-sm'
            }`} />
          </div>

          <div className="relative z-10">
            <p className={`text-sm mb-2 uppercase tracking-wider ${
              isLightMode ? 'text-gray-500' : 'text-[rgba(255,255,255,0.4)]'
            }`}>{accountName}</p>
            <p className={`text-xl font-semibold tracking-wide ${
              isLightMode ? 'text-gray-800' : 'text-white'
            }`}>{accountNumber}</p>
          </div>
        </motion.div>

        <motion.div
          className={`rounded-lg p-3 mb-7 flex items-start space-x-3 ${
            isLightMode
              ? 'bg-blue-50/50 border border-blue-100'
              : 'bg-[rgba(var(--glow-primary),0.03)] backdrop-blur-sm'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaInfoCircle className={`mt-0.5 flex-shrink-0 ${
            isLightMode ? 'text-blue-500' : 'text-[rgba(var(--glow-primary),0.8)]'
          }`} />
          <p className={`text-xs ${
            isLightMode ? 'text-gray-600' : 'text-[rgba(255,255,255,0.6)]'
          }`}>
            {buttonType === 'copy'
              ? "Nhấn nút bên dưới để sao chép số tài khoản."
              : "Nhấn nút bên dưới để mở liên kết thanh toán."}
          </p>
        </motion.div>

        <div className="flex-grow"></div>

        {buttonType === 'copy' ? (
          <motion.button
            className={`w-full py-4 px-5 rounded-xl font-medium relative overflow-hidden ${
              isLightMode
                ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border border-indigo-200'
                : 'bg-[rgba(var(--glow-primary),0.1)] hover:bg-[rgba(var(--glow-primary),0.15)] text-white border border-[rgba(var(--glow-primary),0.1)] backdrop-blur-sm'
            }`}
            onClick={handleCopy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {copyButtonContent}
          </motion.button>
        ) : (
          <motion.a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-4 px-5 rounded-xl font-medium flex items-center justify-center gap-2 relative overflow-hidden ${
              isLightMode
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200'
                : 'bg-[rgba(var(--glow-tertiary),0.1)] hover:bg-[rgba(var(--glow-tertiary),0.15)] text-white border border-[rgba(var(--glow-tertiary),0.1)] backdrop-blur-sm'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLinkClick}
          >
            {linkButtonContent}
          </motion.a>
        )}
      </div>
    </motion.div>
  );
});

PaymentCard.displayName = 'PaymentCard';

export default PaymentCard;