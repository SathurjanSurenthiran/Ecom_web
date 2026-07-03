import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ isOpen, onClose, className = '' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setQuery('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`fixed inset-0 bg-zinc-950/85 backdrop-blur-xl z-50 flex items-center justify-center p-4 ${className}`}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="w-full max-w-2xl"
          >
            <form onSubmit={handleSubmit} className="relative group">
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-zinc-400 group-focus-within:text-white transition-colors duration-300 w-6 h-6" />
              <input
                type="text"
                placeholder="Search premium collections..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full pl-16 pr-14 py-4.5 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 focus:border-zinc-600 rounded-3xl text-white placeholder-zinc-500 text-lg focus:outline-none focus:ring-4 focus:ring-white/5 transition-all duration-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all duration-300"
              >
                <FiX className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-5 text-zinc-500 text-xs tracking-wider uppercase font-semibold text-center flex items-center justify-center space-x-1.5">
              <span>Press</span>
              <kbd className="px-2 py-0.5 bg-zinc-900 text-zinc-300 rounded-lg border border-zinc-800/80 shadow-md font-mono text-[10px]">ESC</kbd>
              <span>to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;