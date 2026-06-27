import React from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers, FiPackage, FiShoppingCart, FiDollarSign,
  FiTrendingUp, FiTrendingDown
} from 'react-icons/fi';

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      icon: FiUsers,
      label: 'Total Users',
      value: stats?.totalUsers || 0,
      change: stats?.userChange || 12,
      color: 'primary',
    },
    {
      icon: FiPackage,
      label: 'Total Products',
      value: stats?.totalProducts || 0,
      change: stats?.productChange || 8,
      color: 'purple',
    },
    {
      icon: FiShoppingCart,
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      change: stats?.orderChange || 15,
      color: 'blue',
    },
    {
      icon: FiDollarSign,
      label: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`,
      change: stats?.revenueChange || 20,
      color: 'green',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">{stat.label}</p>
              <p className="text-2xl font-poppins font-bold text-white mt-1">
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
            </div>
          </div>
          <div className={`mt-3 flex items-center text-xs ${stat.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stat.change > 0 ? (
              <FiTrendingUp className="mr-1" />
            ) : (
              <FiTrendingDown className="mr-1" />
            )}
            <span>{Math.abs(stat.change)}% from last month</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminStats;