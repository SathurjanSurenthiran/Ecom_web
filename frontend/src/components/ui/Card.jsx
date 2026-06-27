import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  glass = true,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      className={`
        ${glass ? 'glass' : 'bg-white/5'}
        rounded-xl overflow-hidden
        ${hover ? 'transition-all duration-300 hover:shadow-2xl' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;