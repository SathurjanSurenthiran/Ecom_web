import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FiUsers, FiPackage, FiShoppingCart, FiDollarSign,
  FiTrendingUp, FiGrid, FiPlus, FiEye, FiEdit2,
  FiTrash2, FiDownload, FiLogOut
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const statStyles = {
  primary: {
    bg: 'bg-primary-500/20',
    text: 'text-primary-400',
  },
  purple: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
  },
  blue: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
  },
  green: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
  },
};

const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => {
  const styles = statStyles[color] || statStyles.primary;

  return (
    <motion.div whileHover={{ y: -5 }} className="glass rounded-xl p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-white/60">{label}</p>
          <p className="mt-1 truncate text-2xl font-bold text-white md:text-3xl">
            {value}
          </p>
        </div>
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${styles.bg}`}>
          <Icon className={`h-6 w-6 ${styles.text}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs text-green-400">
        <FiTrendingUp className="mr-1" />
        <span>+12% from last month</span>
      </div>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      toast.error('Admin access required');
    }
  }, [user, navigate]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Admin Dashboard
          </h1>
          <p className="text-white/60">Welcome back, {user?.name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors glass hover:bg-white/10">
            <FiDownload />
            <span>Export</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white transition-colors hover:bg-primary-700"
          >
            <FiLogOut />
            <span>Exit Admin</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FiUsers} label="Total Users" value="12,345" color="primary" />
        <StatCard icon={FiPackage} label="Total Products" value="856" color="purple" />
        <StatCard icon={FiShoppingCart} label="Total Orders" value="1,234" color="blue" />
        <StatCard icon={FiDollarSign} label="Total Revenue" value="$98,765" color="green" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="glass rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="font-semibold text-white">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-primary-400 hover:text-primary-300">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="border-b border-white/10 text-sm text-white/40">
                  <th className="px-4 py-3 text-left">Order ID</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 transition-colors hover:bg-white/5">
                    <td className="px-4 py-3 text-white">{order.id}</td>
                    <td className="px-4 py-3 text-white/80">{order.customer}</td>
                    <td className="px-4 py-3 font-semibold text-white">{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/60">{order.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button className="text-primary-400 hover:text-primary-300"><FiEye /></button>
                        <button className="text-blue-400 hover:text-blue-300"><FiEdit2 /></button>
                        <button className="text-red-400 hover:text-red-300"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-1">
          <Link to="/admin/products/add" className="rounded-xl p-4 text-center transition-all duration-300 glass hover:bg-white/10">
            <FiPlus className="mx-auto mb-2 h-8 w-8 text-primary-400" />
            <p className="text-sm text-white/80">Add Product</p>
          </Link>
          <Link to="/admin/categories" className="rounded-xl p-4 text-center transition-all duration-300 glass hover:bg-white/10">
            <FiGrid className="mx-auto mb-2 h-8 w-8 text-purple-400" />
            <p className="text-sm text-white/80">Categories</p>
          </Link>
          <Link to="/admin/coupons" className="rounded-xl p-4 text-center transition-all duration-300 glass hover:bg-white/10">
            <FiDollarSign className="mx-auto mb-2 h-8 w-8 text-green-400" />
            <p className="text-sm text-white/80">Coupons</p>
          </Link>
          <Link to="/admin/orders" className="rounded-xl p-4 text-center transition-all duration-300 glass hover:bg-white/10">
            <FiShoppingCart className="mx-auto mb-2 h-8 w-8 text-blue-400" />
            <p className="text-sm text-white/80">Orders</p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
