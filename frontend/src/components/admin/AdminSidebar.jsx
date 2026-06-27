import React from 'react';
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
    <div className="glass p-4 rounded-xl sticky top-24">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
              ${isActive 
                ? 'bg-primary-600 text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-8 bg-white rounded-full"
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