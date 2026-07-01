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
      pending: 'text-yellow-400 bg-yellow-400/10',
      processing: 'text-blue-400 bg-blue-400/10',
      shipped: 'text-purple-400 bg-purple-400/10',
      delivered: 'text-green-400 bg-green-400/10',
      cancelled: 'text-red-400 bg-red-400/10',
    };
    return colors[status] || 'text-white/40 bg-white/5';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <LoadingSkeleton type="product" count={3} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-8">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <FiPackage className="w-16 h-16 mx-auto text-white/20 mb-4" />
              <p className="text-white/60">No orders yet</p>
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
                    className="glass p-6 rounded-xl"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div>
                        <p className="text-white/60 text-sm">Order ID</p>
                        <p className="text-white font-semibold">{order._id}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(order.orderStatus)}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}</span>
                        </span>
                        <span className="text-white/60 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.orderItems.map((item) => (
                        <div key={item._id} className="flex items-center space-x-4 py-2 border-b border-white/5 last:border-0">
                          <img
                            src={item.image || 'https://via.placeholder.com/50'}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-white">{item.name}</p>
                            <p className="text-white/60 text-sm">
                              Qty: {item.quantity} | Size: {item.size}
                            </p>
                          </div>
                          <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-white/60 text-sm">Total</p>
                        <p className="text-white font-bold text-lg">${order.totalPrice.toFixed(2)}</p>
                      </div>
                      <button className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors">
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
  );
};

export default Orders;