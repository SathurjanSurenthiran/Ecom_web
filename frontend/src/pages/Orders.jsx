import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle } from 'react-icons/fi';

import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { getOrders } from '../features/orders/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

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

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-amber-700 bg-amber-50 border-amber-100',
      processing: 'text-sky-700 bg-sky-50 border-sky-100',
      shipped: 'text-violet-700 bg-violet-50 border-violet-100',
      delivered: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      cancelled: 'text-red-700 bg-red-50 border-red-100',
    };
    return colors[status] || 'text-zinc-600 bg-zinc-100 border-zinc-200';
  };

  if (loading) {
    return (
      <div className="bg-[#fcfbfe] min-h-screen px-4 pt-28 pb-16">
        <LoadingSkeleton type="product" count={3} />
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbfe] text-black min-h-screen px-4 md:px-8 pt-28 pb-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-1">Account History</p>
            <h1 className="text-3xl md:text-4xl font-poppins font-extrabold text-black uppercase tracking-tight">
              My Orders
            </h1>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-white border border-zinc-200 rounded-2xl shadow-sm">
              <FiPackage className="w-16 h-16 mx-auto text-zinc-300 mb-4" />
              <p className="text-zinc-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const StatusIcon = getStatusIcon(order.orderStatus);
                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div>
                        <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold">Order ID</p>
                        <p className="text-black font-semibold break-all">{order._id}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 border ${getStatusColor(order.orderStatus)}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}</span>
                        </span>
                        <span className="text-zinc-500 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.orderItems.map((item) => (
                        <div key={item._id} className="flex items-center space-x-4 py-3 border-b border-zinc-100 last:border-0">
                          <img
                            src={item.image || 'https://via.placeholder.com/50'}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg bg-zinc-100"
                          />
                          <div className="flex-1">
                            <p className="text-black font-medium">{item.name}</p>
                            <p className="text-zinc-500 text-sm">
                              Qty: {item.quantity} | Size: {item.size}
                            </p>
                          </div>
                          <p className="text-black font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-200">
                      <div>
                        <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold">Total</p>
                        <p className="text-black font-bold text-lg">${order.totalPrice.toFixed(2)}</p>
                      </div>
                      <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-semibold">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;
