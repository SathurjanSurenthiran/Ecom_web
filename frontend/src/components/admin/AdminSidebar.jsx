import { NavLink } from 'react-router-dom';
import {
  FiHome, FiPackage, FiShoppingCart, FiUsers,
  FiGrid, FiDollarSign, FiBarChart2, FiSettings
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
  const navItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/products', icon: FiPackage, label: 'Products' },
    { path: '/admin/orders', icon: FiShoppingCart, label: 'Orders' },
    { path: '/admin/users', icon: FiUsers, label: 'Users' },
    { path: '/admin/categories', icon: FiGrid, label: 'Categories' },
    { path: '/admin/coupons', icon: FiDollarSign, label: 'Coupons' },
    { path: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
    { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <div className="h-full overflow-hidden">
      <nav className="grid grid-cols-4 gap-2 lg:grid-cols-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              relative group flex min-h-[52px] flex-col items-center justify-center gap-1.5 rounded-xl px-3 py-3 text-[10px] transition-colors duration-300 sm:text-xs lg:min-h-[48px] lg:flex-row lg:justify-start lg:gap-3.5 lg:px-4 lg:py-3 lg:text-sm z-10
              ${isActive 
                ? 'text-white font-semibold' 
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.02]'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarTab"
                    className="absolute inset-0 bg-white/[0.08] border border-white/[0.04] rounded-xl -z-10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  >
                    {/* Glowing left bar for desktop, bottom bar for mobile */}
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r-md shadow-[0_0_10px_rgba(168,85,247,0.6)] hidden lg:block" />
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-md shadow-[0_0_10px_rgba(168,85,247,0.6)] lg:hidden" />
                  </motion.div>
                )}
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${isActive ? 'text-purple-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                <span className="w-full truncate text-center font-medium tracking-wide lg:text-left">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
