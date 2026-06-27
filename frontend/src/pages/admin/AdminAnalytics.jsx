import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiTrendingUp, FiDollarSign, FiUsers, FiShoppingCart,
  FiPackage, FiBarChart2, FiDownload
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '../../components/common/Header';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import axios from '../../api/axios';

const StatCard = ({ icon: Icon, label, value, change, color = 'primary' }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass p-6 rounded-xl"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/60 text-sm">{label}</p>
        <p className="text-2xl font-poppins font-bold text-white mt-1">
          {value}
        </p>
      </div>
      <div className={`w-12 h-12 rounded-lg bg-${color}-500/20 flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
    </div>
    {change && (
      <div className={`mt-3 flex items-center text-xs ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
        <FiTrendingUp className={`mr-1 ${change < 0 ? 'transform rotate-180' : ''}`} />
        <span>{Math.abs(change)}% from last period</span>
      </div>
    )}
  </motion.div>
);

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('monthly');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/analytics', { params: { period } });
        setAnalytics(response.data.data);
      } catch {
        toast.error('Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <LoadingSkeleton type="product" count={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-poppins font-bold text-white">
                Analytics
              </h1>
              <p className="text-white/60">Store performance overview</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-2">
                <FiDownload />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={FiDollarSign}
              label="Revenue"
              value={`$${analytics?.revenue?.toLocaleString() || '0'}`}
              change={12}
              color="green"
            />
            <StatCard
              icon={FiShoppingCart}
              label="Orders"
              value={analytics?.orders || 0}
              change={8}
              color="blue"
            />
            <StatCard
              icon={FiUsers}
              label="Customers"
              value={analytics?.customers || 0}
              change={15}
              color="purple"
            />
            <StatCard
              icon={FiPackage}
              label="Products Sold"
              value={analytics?.productsSold || 0}
              change={5}
              color="orange"
            />
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-4">Revenue Overview</h3>
              <div className="h-64 flex items-center justify-center text-white/40">
                <div className="text-center">
                  <FiBarChart2 className="w-12 h-12 mx-auto mb-2" />
                  <p>Chart visualization here</p>
                  <p className="text-sm">(Revenue: ${analytics?.revenue?.toLocaleString() || '0'})</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-4">Order Statistics</h3>
              <div className="h-64 flex items-center justify-center text-white/40">
                <div className="text-center">
                  <FiBarChart2 className="w-12 h-12 mx-auto mb-2" />
                  <p>Chart visualization here</p>
                  <p className="text-sm">(Total Orders: {analytics?.orders || 0})</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="glass p-6 rounded-xl mt-6">
            <h3 className="text-white font-semibold mb-4">Top Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-white/40 text-sm border-b border-white/10">
                    <th className="text-left py-3 px-4">Product</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Sold</th>
                    <th className="text-left py-3 px-4">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics?.topProducts?.map((product, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white">{product.name}</td>
                      <td className="py-3 px-4 text-white/80">${product.price}</td>
                      <td className="py-3 px-4 text-white/80">{product.sold}</td>
                      <td className="py-3 px-4 text-white font-semibold">${product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
