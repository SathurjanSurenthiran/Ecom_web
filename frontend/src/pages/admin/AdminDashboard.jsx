import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FiUsers, FiPackage, FiShoppingCart, FiDollarSign,
  FiTrendingUp, FiGrid, FiPlus, FiEye, FiEdit2,
  FiTrash2, FiDownload, FiArrowRight
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const statStyles = {
  primary: {
    bg: 'bg-purple-500/10 border-purple-500/20',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  },
  purple: {
    bg: 'bg-indigo-500/10 border-indigo-500/20',
    text: 'text-indigo-400',
    glow: 'shadow-[0_0_20px_rgba(99,102,241,0.15)]',
  },
  blue: {
    bg: 'bg-blue-500/10 border-blue-500/20',
    text: 'text-blue-400',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
  },
  green: {
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
};

const StatCard = ({ icon: Icon, label, value, color = 'primary' }) => {
  const styles = statStyles[color] || statStyles.primary;

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
      className={`bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group ${styles.glow}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{label}</p>
          <p className="mt-2 truncate text-3xl font-poppins font-extrabold text-white">
            {value}
          </p>
        </div>
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${styles.bg}`}>
          <Icon className={`h-5.5 w-5.5 ${styles.text}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
        <FiTrendingUp className="mr-1" />
        <span>+12.4% vs past month</span>
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
      pending: 'text-yellow-400 bg-yellow-400/5 border-yellow-400/20',
      processing: 'text-blue-400 bg-blue-400/5 border-blue-400/20',
      shipped: 'text-purple-400 bg-purple-400/5 border-purple-400/20',
      delivered: 'text-emerald-400 bg-emerald-400/5 border-emerald-400/20',
      cancelled: 'text-red-400 bg-red-400/5 border-red-400/20',
    };
    return colors[status] || 'text-zinc-400 bg-zinc-800/10 border-zinc-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Action Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-8">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-zinc-900 dark:text-white tracking-tight uppercase">
            Admin Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 font-light">Operational overview for Administrator {user?.name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => toast.success('Report successfully downloaded')}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-all shadow-sm"
          >
            <FiDownload />
            <span>Export Metrics</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black dark:text-white transition-all shadow-sm"
          >
            <span>Exit Dashboard</span>
            <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FiUsers} label="Registered Customers" value="12,345" color="primary" />
        <StatCard icon={FiPackage} label="Total Products" value="856" color="purple" />
        <StatCard icon={FiShoppingCart} label="Acquired Orders" value="1,234" color="blue" />
        <StatCard icon={FiDollarSign} label="Monthly Revenue" value="$98,765" color="green" />
      </div>

      {/* Dashboard workspace grids */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Recent Orders Card */}
        <div className="glass rounded-[28px] border border-white/10 p-6 overflow-hidden flex flex-col justify-between shadow-[0_28px_80px_-30px_rgba(0,0,0,0.55)]">
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-poppins font-bold uppercase text-sm tracking-wider text-white">Recent Orders</h2>
              <Link to="/admin/orders" className="text-xs font-semibold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors">
                View All Orders
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm text-left">
                <thead>
                  <tr className="border-b border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-950/10">
                    <th className="px-4 py-3.5">Order ID</th>
                    <th className="px-4 py-3.5">Customer</th>
                    <th className="px-4 py-3.5">Total</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-zinc-800/40 transition-colors hover:bg-zinc-800/25">
                      <td className="px-4 py-3.5 font-mono text-zinc-300">{order.id}</td>
                      <td className="px-4 py-3.5 font-semibold text-white">{order.customer}</td>
                      <td className="px-4 py-3.5 text-white font-medium">{order.total}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-500 font-light">{order.date}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-3.5">
                          <button
                            type="button"
                            className="admin-action-btn-view"
                            title="View details"
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            type="button"
                            className="admin-action-btn-edit"
                            title="Edit details"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            type="button"
                            className="admin-action-btn-delete"
                            title="Remove order"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-1">
          <Link to="/admin/products/add" className="glass border border-white/10 rounded-2xl p-5 text-center transition-all duration-300 shadow-[0_22px_60px_-30px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-purple-400 border border-purple-500/20">
              <FiPlus className="h-6 w-6" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">Add Product</p>
          </Link>
          <Link to="/admin/categories" className="glass border border-white/10 rounded-2xl p-5 text-center transition-all duration-300 shadow-[0_22px_60px_-30px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center group">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-indigo-400 border border-indigo-500/20">
              <FiGrid className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">Categories</p>
          </Link>
          <Link to="/admin/coupons" className="glass border border-white/10 rounded-2xl p-5 text-center transition-all duration-300 shadow-[0_22px_60px_-30px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-emerald-400 border border-emerald-500/20">
              <FiDollarSign className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">Coupons</p>
          </Link>
          <Link to="/admin/orders" className="glass border border-white/10 rounded-2xl p-5 text-center transition-all duration-300 shadow-[0_22px_60px_-30px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform text-blue-400 border border-blue-500/20">
              <FiShoppingCart className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">Manage Orders</p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
