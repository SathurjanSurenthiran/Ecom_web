import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ReceiptText,
  Settings
} from 'lucide-react';
import { logoutUser } from '../../features/auth/authSlice';
import { shopDetails } from '../../data/shopDetails';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setProfileOpen(false);
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'top-2 w-[90%] max-w-6xl py-2 px-6 bg-dark/85 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] rounded-full'
          : 'top-4 w-[95%] max-w-7xl py-3.5 px-8 bg-dark/60 backdrop-blur-lg border border-white/10 shadow-lg rounded-full'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center space-x-2 select-none group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-poppins font-extrabold tracking-tight bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 bg-clip-text text-transparent hover:brightness-110 transition-all duration-300"
          >
            {shopDetails.name}
          </motion.div>
        </Link>

        {/* Right Side: Navigation Links / Action Icons / Auth Button */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full ${
                  active ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-primary-600/20 border border-primary-500/30 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2.5 text-white/75 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5">
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
              <Heart className="h-5 w-5" strokeWidth={1.8} />
            </motion.div>
            <AnimatePresence>
              {wishlistItems.length > 0 && (
                <motion.span
                  key={`wishlist-${wishlistItems.length}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-white text-slate-950 text-[10px] font-bold flex items-center justify-center border border-white/60 shadow-[0_6px_18px_rgba(255,255,255,0.22)]"
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2.5 text-white/75 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5">
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
              <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
            </motion.div>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={`cart-${totalItems}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-white text-slate-950 text-[10px] font-bold flex items-center justify-center border border-white/60 shadow-[0_6px_18px_rgba(255,255,255,0.22)]"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* User Profile Dropdown / Login */}
          {isAuthenticated ? (
            <div
              className="relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 text-white/80 hover:text-white transition-all duration-300"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center text-xs font-semibold text-white shadow-md">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
                <motion.div
                  animate={{ rotate: profileOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
                </motion.div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-52 bg-dark/95 border border-white/10 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl p-1.5 z-50"
                  >
                    <div className="px-4 py-2.5 border-b border-white/5 mb-1.5">
                      <p className="text-xs text-white/50">Logged in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-white/75 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <User className="h-4 w-4 text-primary-400" />
                      <span>Profile</span>
                    </Link>
                    
                    <Link
                      to="/orders"
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-white/75 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <ReceiptText className="h-4 w-4 text-primary-400" />
                      <span>Orders</span>
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-sm text-white/75 hover:text-white hover:bg-white/5 transition-all duration-200"
                      >
                        <Settings className="h-4 w-4 text-purple-400" />
                        <span>Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2.5 w-full text-left px-3 py-2 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 mt-1 border-t border-white/5 pt-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="relative overflow-hidden px-5 py-1.5 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white text-sm font-medium transition-all duration-300 shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)] transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl p-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { opacity: 0, height: 0, marginTop: 0 },
              show: {
                opacity: 1,
                height: 'auto',
                marginTop: 16,
                transition: {
                  height: { duration: 0.3, ease: 'easeOut' },
                  opacity: { duration: 0.2 },
                  staggerChildren: 0.08,
                  delayChildren: 0.05
                }
              },
              exit: {
                opacity: 0,
                height: 0,
                marginTop: 0,
                transition: {
                  height: { duration: 0.25, ease: 'easeIn' },
                  opacity: { duration: 0.15 },
                  staggerChildren: 0.05,
                  staggerDirection: -1
                }
              }
            }}
            className="md:hidden glass-dark overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="p-4 flex flex-col space-y-3">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <motion.div
                    key={link.path}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      show: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 }
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        active
                          ? 'bg-primary-600/20 text-white font-semibold border border-primary-500/20'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Wishlist Mobile */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  show: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 }
                }}
              >
                <Link
                  to="/wishlist"
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive('/wishlist')
                      ? 'bg-primary-600/20 text-white font-semibold border border-primary-500/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </span>
                  {wishlistItems.length > 0 && (
                    <span className="bg-white text-slate-950 text-[10px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              </motion.div>

              {/* Cart Mobile */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  show: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 }
                }}
              >
                <Link
                  to="/cart"
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive('/cart')
                      ? 'bg-primary-600/20 text-white font-semibold border border-primary-500/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Cart</span>
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-white text-slate-950 text-[10px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </motion.div>

              {/* Profile Links Mobile */}
              {isAuthenticated ? (
                <>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      show: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 }
                    }}
                    className="border-t border-white/5 pt-3 mt-1"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4 text-primary-400" />
                      <span>My Profile ({user?.name})</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      show: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 }
                    }}
                  >
                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <ReceiptText className="h-4 w-4 text-primary-400" />
                      <span>My Orders</span>
                    </Link>
                  </motion.div>

                  {user?.role === 'admin' && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: -10 },
                        show: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -10 }
                      }}
                    >
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-4 py-2 text-purple-400 hover:text-purple-300"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </motion.div>
                  )}

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      show: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 }
                    }}
                  >
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 w-full text-left text-red-400 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    show: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -10 }
                  }}
                  className="pt-2"
                >
                  <Link
                    to="/login"
                    className="block bg-gradient-to-r from-primary-600 to-purple-600 text-white text-center py-2.5 rounded-xl font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
