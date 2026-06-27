import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const Alert = ({
  children,
  variant = 'info',
  onClose,
  className = '',
}) => {
  const variants = {
    success: 'bg-green-500/20 border-green-500/50 text-green-400',
    error: 'bg-red-500/20 border-red-500/50 text-red-400',
    warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
    primary: 'bg-primary-500/20 border-primary-500/50 text-primary-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        relative px-4 py-3 rounded-lg border
        ${variants[variant]}
        ${className}
      `}
    >
      <div className="pr-8">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-current opacity-60 hover:opacity-100 transition-opacity"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default Alert;