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
    <div className="glass rounded-xl p-3">
      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex min-h-12 items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all duration-300 sm:text-base
              ${isActive 
                ? 'bg-primary-600 text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto hidden h-8 w-1.5 rounded-full bg-white lg:block"
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
