import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCheckCircle, FiCreditCard, FiLock, FiTruck } from 'react-icons/fi';
import { FaPaypal } from 'react-icons/fa';
import toast from 'react-hot-toast';

import { createOrder } from '../features/orders/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

const paymentMethods = [
  { id: 'credit_card', icon: FiCreditCard, label: 'Credit Card' },
  { id: 'paypal', icon: FaPaypal, label: 'PayPal' },
  { id: 'cash_on_delivery', icon: FiCheckCircle, label: 'Cash on Delivery' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [selectedPayment, setSelectedPayment] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingPrice = totalPrice > 100 ? 0 : 10;
  const taxPrice = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingPrice + taxPrice;

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      const orderData = {
        orderItems: items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.discountPrice || item.product.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.product.images?.[0]?.url,
        })),
        shippingAddress: {
          fullName: data.fullName,
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
          phone: data.phone,
        },
        paymentMethod: selectedPayment,
        taxPrice,
        shippingPrice,
        totalPrice: finalTotal,
      };

      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  if (items.length === 0) return null;

  return (
    <div className="bg-[#fcfbfe] text-black min-h-screen pt-24 pb-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto"
      >
        <div className="mb-10 pb-6 border-b border-zinc-100">
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-black transition-colors mb-5"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-2">Secure Checkout</p>
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-black uppercase tracking-tight">
            Complete Your Order
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-light">
            Confirm delivery details and payment method for {totalItems} selected pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <section className="bg-white border border-zinc-200/70 p-5 md:p-6 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-black">
                    <FiTruck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Step 01</p>
                    <h2 className="text-lg font-poppins font-bold text-black uppercase tracking-wide">
                      Shipping Address
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2 block">
                      Full Name *
                    </label>
                    <input
                      {...register('fullName', { required: 'Full name is required' })}
                      defaultValue={user?.name || ''}
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5"
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2 block">
                      Phone *
                    </label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2 block">
                      Street Address *
                    </label>
                    <input
                      {...register('street', { required: 'Street address is required' })}
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5"
                    />
                    {errors.street && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.street.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2 block">
                      City *
                    </label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2 block">
                      State *
                    </label>
                    <input
                      {...register('state', { required: 'State is required' })}
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5"
                    />
                    {errors.state && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.state.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2 block">
                      ZIP Code *
                    </label>
                    <input
                      {...register('zipCode', { required: 'ZIP code is required' })}
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5"
                    />
                    {errors.zipCode && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.zipCode.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2 block">
                      Country *
                    </label>
                    <input
                      {...register('country', { required: 'Country is required' })}
                      defaultValue="United States"
                      className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5"
                    />
                    {errors.country && (
                      <p className="text-red-600 text-xs mt-1.5">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              </section>

              <section className="bg-white border border-zinc-200/70 p-5 md:p-6 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-black">
                    <FiCreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Step 02</p>
                    <h2 className="text-lg font-poppins font-bold text-black uppercase tracking-wide">
                      Payment Method
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                        selectedPayment === method.id
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-zinc-200 bg-zinc-50/70 text-black hover:border-black hover:bg-white'
                      }`}
                    >
                      <method.icon
                        className={`w-7 h-7 mb-4 ${
                          selectedPayment === method.id ? 'text-white' : 'text-zinc-500'
                        }`}
                      />
                      <p className="text-sm font-semibold">{method.label}</p>
                    </button>
                  ))}
                </div>
              </section>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors uppercase tracking-wider text-xs flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiLock className="w-4 h-4" />
                <span>{isProcessing ? 'Processing...' : `Place Order $${finalTotal.toFixed(2)}`}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-zinc-200/70 p-6 rounded-2xl shadow-sm sticky top-24"
            >
              <h3 className="text-lg font-poppins font-bold text-black uppercase tracking-wider mb-5">
                Order Summary
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1 mb-5">
                {items.map((item) => (
                  <div
                    key={`${item.product._id}-${item.size}-${item.color}`}
                    className="flex items-center gap-3"
                  >
                    <div className="w-14 h-16 bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-100">
                      <img
                        src={item.product.images?.[0]?.url || 'https://via.placeholder.com/80'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black truncate">{item.product.name}</p>
                      <p className="text-zinc-500 text-xs mt-1">
                        Qty: {item.quantity}
                        {item.size ? ` | Size: ${item.size}` : ''}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-black">
                      ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-zinc-600 border-t border-zinc-100 pt-5">
                <div className="flex justify-between font-light">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-light">
                  <span>Shipping</span>
                  <span className="font-semibold text-black">
                    {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-light">
                  <span>Tax</span>
                  <span className="font-semibold text-black">${taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black font-bold text-base pt-4 border-t border-zinc-100">
                  <span>Total</span>
                  <span className="text-lg">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-5 bg-zinc-50 border border-zinc-100 rounded-xl p-4 flex items-start space-x-3">
                <FiLock className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Your checkout details are protected and used only to complete this order.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
