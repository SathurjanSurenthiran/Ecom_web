import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiSearch, FiEye, FiTrash2,
  FiChevronLeft, FiChevronRight, FiPackage,
  FiClock, FiTruck, FiCheckCircle, FiXCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import axios from '../../api/axios';
import OrderDetails from '../OrderDetails';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get('/orders/admin/all');
      setOrders(response.data.data);
    } catch {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchOrders, 0);
    return () => window.clearTimeout(timeoutId);
  }, [fetchOrders]);

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`/orders/${id}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`/orders/${id}`);
        toast.success('Order deleted successfully');
        fetchOrders();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete order');
      }
    }
  };

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

  const getStatusIcon = (status) => {
    const icons = {
      pending: FiClock,
      processing: FiPackage,
      shipped: FiTruck,
      delivered: FiCheckCircle,
      cancelled: FiXCircle,
    };
    return icons[status] || FiPackage;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id.includes(searchTerm) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <LoadingSkeleton type="product" count={5} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
          {/* Action Header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-8">
            <div>
              <h1 className="text-3xl font-poppins font-extrabold text-zinc-900 dark:text-white tracking-tight uppercase">
                Orders
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 font-light">{orders.length} orders total</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="glass rounded-[28px] border border-white/10 overflow-hidden shadow-[0_26px_70px_-30px_rgba(0,0,0,0.55)]">
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
                  {filteredOrders.map((order) => {
                    const StatusIcon = getStatusIcon(order.orderStatus);
                    return (
                      <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-white font-mono text-sm">
                          {order._id.slice(0, 8)}...
                        </td>
                        <td className="py-3 px-4 text-white/80">
                          {order.user?.name || 'Guest'}
                        </td>
                        <td className="py-3 px-4 text-white font-semibold">
                          ${order.totalPrice?.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(order.orderStatus)}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-white/60">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <select
                              value={order.orderStatus}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 mr-2"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button 
                              onClick={() => setSelectedOrderId(order._id)}
                              className="admin-action-btn-view"
                              title="View Details"
                            >
                              <FiEye size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteOrder(order._id)}
                              className="admin-action-btn-delete"
                              title="Delete Order"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
              <p className="text-white/40 text-sm">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 glass text-white rounded-xl hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                >
                  <FiChevronLeft />
                </button>
                <span className="text-white/60 text-sm">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={filteredOrders.length < 10}
                  className="p-2 glass text-white rounded-xl hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>

          {selectedOrderId && (
            <OrderDetails 
              orderId={selectedOrderId} 
              onClose={() => setSelectedOrderId(null)} 
            />
          )}
    </motion.div>
  );
};

export default AdminOrders;
