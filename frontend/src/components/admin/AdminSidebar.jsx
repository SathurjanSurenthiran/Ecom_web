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
              group flex min-h-[52px] flex-col items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[10px] transition-all duration-300 sm:text-xs lg:min-h-[44px] lg:flex-row lg:justify-start lg:gap-3.5 lg:px-4 lg:py-3 lg:text-sm
              ${isActive 
                ? 'bg-zinc-800/80 border border-zinc-700/50 text-white font-semibold shadow-inner' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30 hover:translate-x-0.5'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${isActive ? 'text-purple-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                <span className="w-full truncate text-center font-medium tracking-wide lg:text-left">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto hidden lg:block h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
