import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiPackage, FiTruck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from '../api/axios';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const formatPaymentMethod = (method) => (method || 'Not specified')
  .replace(/_/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const OrderDetails = ({ orderId, onClose, isAdmin }) => {
  const { id: paramId } = useParams();
  const { pathname } = useLocation();
  const id = orderId || paramId;
  const isAdminView = isAdmin !== undefined ? isAdmin : pathname.startsWith('/admin');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/orders/${id}`);
        setOrder(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  useEffect(() => {
    if (!onClose) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const renderContent = () => {
    if (loading) return <LoadingSkeleton type="product" count={3} />;

    if (!order) {
      return (
        <div className="py-16 text-center">
          <FiPackage className="mx-auto mb-4 h-12 w-12 text-zinc-400" />
          <p className="text-zinc-500">This order could not be found.</p>
          {onClose ? (
            <button onClick={onClose} className="mt-5 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-semibold">
              Close
            </button>
          ) : (
            <Link to={isAdminView ? '/admin/orders' : '/orders'} className="mt-5 inline-block text-primary-600 hover:underline">
              Back to orders
            </Link>
          )}
        </div>
      );
    }

    const address = order.shippingAddress || {};
    const status = order.orderStatus || 'pending';
    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <div className={onClose ? 'space-y-6' : (isAdminView ? 'space-y-6' : 'min-h-screen bg-[#fcfbfe] px-4 pb-16 pt-28 text-black md:px-8')}>
        <div className={(onClose || isAdminView) ? '' : 'container mx-auto max-w-6xl'}>
          {!onClose && (
            <Link
              to={isAdminView ? '/admin/orders' : '/orders'}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-black"
            >
              <FiArrowLeft /> Back to orders
            </Link>
          )}

          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Order details</p>
              <h1 className="mt-1 break-all text-2xl font-extrabold text-zinc-900 md:text-3xl">{order._id}</h1>
              <p className="mt-2 text-sm text-zinc-500">Placed {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
              <FiPackage /> {statusLabel}
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <section className="space-y-4 lg:col-span-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-zinc-900">Items ordered</h2>
                <div className="divide-y divide-zinc-100">
                  {order.orderItems?.map((item) => (
                    <div key={item._id || `${item.product}-${item.size}`} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <img src={item.image || 'https://via.placeholder.com/96'} alt={item.name} className="h-20 w-20 rounded-xl bg-zinc-100 object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-zinc-900">{item.name}</p>
                        <p className="mt-1 text-sm text-zinc-500">Quantity: {item.quantity}{item.size ? ` · Size: ${item.size}` : ''}{item.color ? ` · Color: ${item.color}` : ''}</p>
                        <p className="mt-2 text-sm font-semibold text-zinc-800">${Number(item.price || 0).toFixed(2)} each</p>
                      </div>
                      <p className="whitespace-nowrap font-bold text-zinc-900">${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2"><FiTruck className="text-primary-600" /><h2 className="text-lg font-bold text-zinc-900">Shipping address</h2></div>
                <div className="mt-4 text-sm leading-6 text-zinc-600">
                  <p className="font-semibold text-zinc-900">{address.fullName}</p>
                  <p>{address.street}</p><p>{[address.city, address.state, address.zipCode].filter(Boolean).join(', ')}</p>
                  <p>{address.country}</p><p className="mt-2">Phone: {address.phone || 'Not provided'}</p>
                </div>
              </div>
            </section>

            <aside className="space-y-4">
              {isAdminView && order.user && (
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-3 text-lg font-bold text-zinc-900">Customer</h2>
                  <p className="font-semibold text-zinc-900">{order.user.name}</p><p className="text-sm text-zinc-500">{order.user.email}</p>
                </div>
              )}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-zinc-900">Payment summary</h2>
                <div className="space-y-3 text-sm text-zinc-600">
                  <div className="flex justify-between"><span>Items</span><span>${(Number(order.totalPrice || 0) - Number(order.taxPrice || 0) - Number(order.shippingPrice || 0) + Number(order.discountAmount || 0)).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>${Number(order.shippingPrice || 0).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>${Number(order.taxPrice || 0).toFixed(2)}</span></div>
                  {order.discountAmount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span><span>-${Number(order.discountAmount).toFixed(2)}</span></div>}
                  <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-bold text-zinc-900"><span>Total</span><span>${Number(order.totalPrice || 0).toFixed(2)}</span></div>
                </div>
                <div className="mt-5 border-t border-zinc-100 pt-4 text-sm text-zinc-600"><p>Method: <span className="font-semibold text-zinc-900">{formatPaymentMethod(order.paymentMethod)}</span></p><p className="mt-2 flex items-center gap-1"><FiCheckCircle className={order.isPaid ? 'text-emerald-600' : 'text-zinc-400'} /> {order.isPaid ? 'Paid' : 'Payment pending'}</p></div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  };

  if (onClose) {
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" 
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-5xl bg-[#fcfbfe] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex justify-between items-center z-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Order Details</p>
              <h1 className="mt-1 break-all text-xl font-extrabold text-zinc-900">{order ? order._id : 'Loading...'}</h1>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  return renderContent();
};

export default OrderDetails;
