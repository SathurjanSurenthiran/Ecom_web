import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
} from 'react-icons/fi';
import { logoutUser } from '../../features/auth/authSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Wishlist', path: '/wishlist', icon: <FiHeart />, count: wishlistItems.length },
    { name: 'Cart', path: '/cart', icon: <FiShoppingBag />, count: totalItems },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="text-2xl font-poppins font-bold gradient-text"
          >
            FASHION
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative text-white/80 hover:text-white transition-colors duration-300"
            >
              {link.icon ? (
                <div className="flex items-center space-x-1">
                  <span className="text-xl">{link.icon}</span>
                  {link.count > 0 && (
                    <span className="absolute -top-2 -right-3 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {link.count}
                    </span>
                  )}
                </div>
              ) : (
                link.name
              )}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-white/80 hover:text-white">
                <FiUser className="text-xl" />
                <span>{user?.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-dark/95 backdrop-blur-md rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10"
                >
                  Orders
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-dark mt-4 mx-4 rounded-lg p-4"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center justify-between text-white/80 hover:text-white py-2 border-b border-white/10"
                onClick={() => setIsOpen(false)}
              >
                <span>{link.icon ? link.name : link.name}</span>
                {link.icon && link.count > 0 && (
                  <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {link.count}
                  </span>
                )}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-red-400 py-2"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 text-white text-center py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;