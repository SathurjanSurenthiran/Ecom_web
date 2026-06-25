import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiCreditCard, FiPaypal, FiTruck, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { createOrder } from '../../features/orders/orderSlice';
import { clearCart } from '../../features/cart/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { items, totalPrice } = useSelector((state) => state.cart);
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

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Shipping Address */}
                <div className="glass p-6 rounded-xl">
                  <h2 className="text-xl font-poppins font-bold text-white mb-4 flex items-center space-x-2">
                    <FiTruck className="text-primary-400" />
                    <span>Shipping Address</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">
                        Full Name *
                      </label>
                      <input
                        {...register('fullName', { required: 'Full name is required' })}
                        defaultValue={user?.name || ''}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.fullName && (
                        <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">
                        Phone *
                      </label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-white/60 text-sm mb-1 block">
                        Street Address *
                      </label>
                      <input
                        {...register('street', { required: 'Street address is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.street && (
                        <p className="text-red-400 text-sm mt-1">{errors.street.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">
                        City *
                      </label>
                      <input
                        {...register('city', { required: 'City is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.city && (
                        <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">
                        State *
                      </label>
                      <input
                        {...register('state', { required: 'State is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.state && (
                        <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">
                        ZIP Code *
                      </label>
                      <input
                        {...register('zipCode', { required: 'ZIP code is required' })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.zipCode && (
                        <p className="text-red-400 text-sm mt-1">{errors.zipCode.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1 block">
                        Country *
                      </label>
                      <input
                        {...register('country', { required: 'Country is required' })}
                        defaultValue="United States"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      {errors.country && (
                        <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="glass p-6 rounded-xl">
                  <h2 className="text-xl font-poppins font-bold text-white mb-4">
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'credit_card', icon: FiCreditCard, label: 'Credit Card' },
                      { id: 'paypal', icon: FiPaypal, label: 'PayPal' },
                      { id: 'cash_on_delivery', icon: FiCheckCircle, label: 'Cash on Delivery' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPayment(method.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          selectedPayment === method.id
                            ? 'border-primary-500 bg-primary-500/20'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <method.icon className="w-8 h-8 mx-auto text-primary-400 mb-2" />
                        <p className="text-white text-sm">{method.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Place Order $${finalTotal.toFixed(2)}`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-6 rounded-xl sticky top-24"
              >
                <h3 className="text-xl font-poppins font-bold text-white mb-4">
                  Order Summary
                </h3>

                <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={`${item.product._id}-${item.size}`} className="flex items-center space-x-3">
                      <img
                        src={item.product.images?.[0]?.url || 'https://via.placeholder.com/50'}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm">{item.product.name}</p>
                        <p className="text-white/60 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-white font-semibold">
                        ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-white/80 border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$${taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/10">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;