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
  Settings,
  Search
} from 'lucide-react';
import { logoutUser } from '../../features/auth/authSlice';
import { clearCartState } from '../../features/cart/cartSlice';
import { clearWishlistState } from '../../features/wishlist/wishlistSlice';
import { shopDetails } from '../../data/shopDetails';
import logoIcon from '../../assets/icons/icon01.png';
import SearchBar from './SearchBar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  
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

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearCartState());
    dispatch(clearWishlistState());
    setProfileOpen(false);
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'top-2 w-[92%] max-w-6xl py-2.5 px-6 bg-zinc-100/80 backdrop-blur-xl border border-zinc-300 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] rounded-full'
            : 'top-4 w-[95%] max-w-7xl py-4 px-8 bg-zinc-50/90 backdrop-blur-lg border border-zinc-200 shadow-[0_6px_30px_rgba(0,0,0,0.03)] rounded-full'
        }`}
      >
      {/* Bottom accent glow */}
      <div className={`absolute bottom-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className="flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center select-none">
          <div className="text-2xl font-poppins font-black tracking-[0.18em] text-black flex items-center gap-2.5 relative">
            <img
              src={logoIcon}
              alt=""
              className="h-7 w-7 flex-shrink-0 object-contain"
              aria-hidden="true"
            />
            <span>{shopDetails.name.toUpperCase()}</span>
          </div>
        </div>

        {/* Right Side: Navigation Links / Action Icons / Auth Button */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Nav Links Tray */}
          <nav className="flex items-center space-x-1 relative">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const isHovered = hoveredTab === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredTab(link.path)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full"
                >
                  {/* Active Background Pill */}
                  {active && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-zinc-900 text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Background Pill (when not active) */}
                  {!active && isHovered && (
                    <motion.span
                      layoutId="hoverNavPill"
                      className="absolute inset-0 bg-zinc-100/70 border border-zinc-200/50 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}

                  <span className={`relative z-10 transition-colors duration-300 ${
                    active 
                      ? 'text-white font-semibold' 
                      : isHovered 
                        ? 'text-black font-medium' 
                        : 'text-zinc-500 font-medium'
                  }`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Separator line */}
          <span className="h-5 w-[1px] bg-zinc-200" />

          {/* Actions Tray */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-zinc-500 hover:text-black hover:bg-zinc-100/80 hover:border-zinc-200/50 border border-transparent transition-all duration-300 rounded-full flex items-center justify-center"
              title="Search Products"
            >
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <Search className="h-5 w-5" strokeWidth={1.8} />
              </motion.div>
            </button>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative p-2.5 text-zinc-500 hover:text-black hover:bg-zinc-100/80 hover:border-zinc-200/50 border border-transparent transition-all duration-300 rounded-full flex items-center justify-center"
              title="Wishlist"
            >
              <motion.div whileHover={{ scale: 1.15, rotate: 6 }} whileTap={{ scale: 0.9 }}>
                <Heart className="h-5 w-5" strokeWidth={1.8} />
              </motion.div>
              <AnimatePresence>
                {isAuthenticated && wishlistItems.length > 0 && (
                  <motion.span
                    key={`wishlist-${wishlistItems.length}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white shadow-md shadow-rose-500/20"
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2.5 text-zinc-500 hover:text-black hover:bg-zinc-100/80 hover:border-zinc-200/50 border border-transparent transition-all duration-300 rounded-full flex items-center justify-center"
              title="Shopping Cart"
            >
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
              </motion.div>
              <AnimatePresence>
                {isAuthenticated && totalItems > 0 && (
                  <motion.span
                    key={`cart-${totalItems}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white shadow-md shadow-rose-500/20"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* User Profile Dropdown / Login */}
            {isAuthenticated ? (
              <div
                className="relative ml-2"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <button
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full hover:bg-zinc-100/80 border border-transparent hover:border-zinc-200/50 text-zinc-700 hover:text-black transition-all duration-300"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-xs font-semibold text-white shadow-sm border border-zinc-700/20">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold tracking-wide hidden lg:inline">{user?.name}</span>
                  <motion.div
                    animate={{ rotate: profileOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-600" strokeWidth={2} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute right-0 mt-2.5 w-56 bg-white/95 backdrop-blur-xl border border-zinc-200/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden p-1.5 z-50"
                    >
                      <div className="px-4 py-3 border-b border-zinc-100/80 mb-1.5">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Logged in as</p>
                        <p className="text-sm font-semibold text-zinc-800 truncate mt-0.5">{user?.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="group flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 transition-all duration-200"
                      >
                        <User className="h-4 w-4 text-zinc-400 group-hover:text-black transition-colors" />
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">Profile</span>
                      </Link>
                      
                      <Link
                        to="/orders"
                        className="group flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 transition-all duration-200"
                      >
                        <ReceiptText className="h-4 w-4 text-zinc-400 group-hover:text-black transition-colors" />
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">Orders</span>
                      </Link>

                      {(user?.role === 'admin' || user?.role === 'superadmin') && (
                        <Link
                          to="/admin"
                          className="group flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-sm text-zinc-600 hover:text-black hover:bg-zinc-50 transition-all duration-200"
                        >
                          <Settings className="h-4 w-4 text-zinc-400 group-hover:text-black transition-colors" />
                          <span className="group-hover:translate-x-0.5 transition-transform duration-200">Dashboard</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="group flex items-center space-x-2.5 w-full text-left px-3.5 py-2.5 rounded-xl text-sm text-red-600 hover:text-red-700 hover:bg-red-50/50 mt-1 border-t border-zinc-100 pt-2"
                      >
                        <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors" />
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 px-5 py-2 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-sm font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Action Icons Tray */}
        <div className="flex md:hidden items-center space-x-1.5">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-zinc-500 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black p-2 rounded-full hover:bg-zinc-100 transition-all duration-300 focus:outline-none"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </motion.div>
          </button>
        </div>
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
            className="md:hidden bg-white border border-zinc-200 overflow-hidden rounded-2xl shadow-xl"
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
                          ? 'bg-zinc-100 text-black font-semibold border border-zinc-200/50'
                          : 'text-zinc-600 hover:text-black hover:bg-zinc-50'
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
                      ? 'bg-zinc-100 text-black font-semibold border border-zinc-200/50'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </span>
                  {isAuthenticated && wishlistItems.length > 0 && (
                    <span className="bg-black text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
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
                      ? 'bg-zinc-100 text-black font-semibold border border-zinc-200/50'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Cart</span>
                  </span>
                  {isAuthenticated && totalItems > 0 && (
                    <span className="bg-black text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
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
                    className="border-t border-zinc-100 pt-3 mt-1"
                  >
                    <Link
                      rm="true"
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-zinc-600 hover:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4 text-zinc-800" />
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
                      className="flex items-center space-x-2 px-4 py-2 text-zinc-600 hover:text-black"
                      onClick={() => setIsOpen(false)}
                    >
                      <ReceiptText className="h-4 w-4 text-zinc-800" />
                      <span>My Orders</span>
                    </Link>
                  </motion.div>

                  {(user?.role === 'admin' || user?.role === 'superadmin') && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: -10 },
                        show: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -10 }
                      }}
                    >
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-4 py-2 text-zinc-600 hover:text-black"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings className="h-4 w-4 text-zinc-800" />
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
                      className="flex items-center space-x-2 px-4 py-2 w-full text-left text-red-600 hover:text-red-700"
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
                    className="block bg-black text-white text-center py-2.5 rounded-xl font-medium hover:bg-zinc-800"
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

      {/* Search Overlay */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
