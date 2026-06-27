import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ isOpen, onClose, className = '' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 ${className}`}
        >
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full pl-14 pr-12 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </form>
            <div className="mt-4 text-white/40 text-sm text-center">
              Press ESC to close
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;