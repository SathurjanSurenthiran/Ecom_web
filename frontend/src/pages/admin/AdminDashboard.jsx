import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FiUsers, FiPackage, FiShoppingCart, FiDollarSign,
  FiBarChart2, FiTrendingUp, FiUser, FiGrid,
  FiPlus, FiEdit2, FiTrash2, FiEye, FiClock,
  FiCheckCircle, FiXCircle, FiAlertCircle,
  FiSearch, FiFilter, FiDownload, FiSettings,
  FiLogOut
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '../../components/common/Header';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      toast.error('Admin access required');
    }
    // Fetch dashboard stats here
  }, [user, navigate]);

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart2 },
    { id: 'products', label: 'Products', icon: FiPackage },
    { id: 'orders', label: 'Orders', icon: FiShoppingCart },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'categories', label: 'Categories', icon: FiGrid },
    { id: 'coupons', label: 'Coupons', icon: FiDollarSign },
    { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', total: '$145.00', status: 'pending', date: '2026-06-14' },
    { id: '#12346', customer: 'Jane Smith', total: '$89.50', status: 'shipped', date: '2026-06-13' },
    { id: '#12347', customer: 'Mike Johnson', total: '$210.00', status: 'delivered', date: '2026-06-12' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-400 bg-yellow-400/10',
      processing: 'text-blue-400 bg-blue-400/10',
      shipped: 'text-purple-400 bg-purple-400/10',
      delivered: 'text-green-400 bg-green-400/10',
      cancelled: 'text-red-400 bg-red-400/10',
    };
    return colors[status] || 'text-white/40 bg-white/5';
  };

  const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm">{label}</p>
          <p className="text-3xl font-poppins font-bold text-white mt-1">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-${color}-500/20 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs text-green-400">
        <FiTrendingUp className="mr-1" />
        <span>+12% from last month</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-white/60">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors">
              <FiDownload className="inline mr-2" />
              Export
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiLogOut className="inline mr-2" />
              Exit Admin
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="glass p-4 rounded-xl sticky top-24">
              <nav className="space-y-1">
                {adminTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={FiUsers} label="Total Users" value="12,345" color="primary" />
                  <StatCard icon={FiPackage} label="Total Products" value="856" color="purple" />
                  <StatCard icon={FiShoppingCart} label="Total Orders" value="1,234" color="blue" />
                  <StatCard icon={FiDollarSign} label="Total Revenue" value="$98,765" color="green" />
                </div>

                {/* Recent Orders */}
                <div className="glass p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-primary-400 hover:text-primary-300 text-sm"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-white/40 text-sm border-b border-white/10">
                          <th className="text-left py-3 px-4">Order ID</th>
                          <th className="text-left py-3 px-4">Customer</th>
                          <th className="text-left py-3 px-4">Total</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-3 px-4 text-white">{order.id}</td>
                            <td className="py-3 px-4 text-white/80">{order.customer}</td>
                            <td className="py-3 px-4 text-white font-semibold">{order.total}</td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-white/60">{order.date}</td>
                            <td className="py-3 px-4">
                              <button className="text-primary-400 hover:text-primary-300 mr-2">
                                <FiEye />
                              </button>
                              <button className="text-blue-400 hover:text-blue-300 mr-2">
                                <FiEdit2 />
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                <FiTrash2 />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    to="/admin/products/add"
                    className="glass p-4 rounded-xl text-center hover:bg-white/10 transition-all duration-300"
                  >
                    <FiPlus className="w-8 h-8 mx-auto text-primary-400 mb-2" />
                    <p className="text-white/80 text-sm">Add Product</p>
                  </Link>
                  <Link
                    to="/admin/categories/add"
                    className="glass p-4 rounded-xl text-center hover:bg-white/10 transition-all duration-300"
                  >
                    <FiGrid className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                    <p className="text-white/80 text-sm">Add Category</p>
                  </Link>
                  <Link
                    to="/admin/coupons/add"
                    className="glass p-4 rounded-xl text-center hover:bg-white/10 transition-all duration-300"
                  >
                    <FiDollarSign className="w-8 h-8 mx-auto text-green-400 mb-2" />
                    <p className="text-white/80 text-sm">Add Coupon</p>
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="glass p-4 rounded-xl text-center hover:bg-white/10 transition-all duration-300"
                  >
                    <FiShoppingCart className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                    <p className="text-white/80 text-sm">Manage Orders</p>
                  </Link>
                </div>
              </motion.div>
            )}

            {activeTab === 'products' && (
              <div className="glass p-6 rounded-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-xl font-poppins font-bold text-white">Products</h2>
                  <Link
                    to="/admin/products/add"
                    className="mt-4 md:mt-0 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <FiPlus />
                    <span>Add Product</span>
                  </Link>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors">
                    <FiFilter className="inline mr-2" />
                    Filter
                  </button>
                </div>
                <div className="text-white/60">Product management content here</div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-poppins font-bold text-white mb-6">Orders</h2>
                <div className="text-white/60">Order management content here</div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-poppins font-bold text-white mb-6">Users</h2>
                <div className="text-white/60">User management content here</div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-poppins font-bold text-white mb-6">Categories</h2>
                <div className="text-white/60">Category management content here</div>
              </div>
            )}

            {activeTab === 'coupons' && (
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-poppins font-bold text-white mb-6">Coupons</h2>
                <div className="text-white/60">Coupon management content here</div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-poppins font-bold text-white mb-6">Analytics</h2>
                <div className="text-white/60">Analytics content here</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;