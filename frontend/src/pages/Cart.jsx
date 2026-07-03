import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleRemove = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color }));
  };

  const handleUpdateQuantity = (productId, size, color, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, size, color, quantity }));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
      toast.success('Cart cleared');
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#fcfbfe] text-black min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-xl text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-300">
              <FiShoppingBag className="w-9 h-9" />
            </div>
            <h2 className="text-3xl font-poppins font-bold text-black uppercase tracking-tight">
              Your Cart is Empty
            </h2>
            <p className="text-zinc-500 font-light max-w-sm mx-auto">
              You haven't added any luxury pieces to your cart yet. Explore our latest arrivals.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-black text-white rounded-full font-semibold text-xs tracking-wider uppercase hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfbfe] text-black min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-zinc-100">
          <div>
            <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-2">Checkout Flow</p>
            <h1 className="text-3xl md:text-4xl font-poppins font-bold text-black uppercase tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-zinc-500 text-sm mt-1 font-light">{totalItems} pieces selected</p>
          </div>
          <button
            onClick={handleClearCart}
            className="mt-4 sm:mt-0 text-sm text-red-600 hover:text-red-700 font-medium uppercase tracking-wider text-xs border-b border-red-200 hover:border-red-400 pb-0.5"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${item.product._id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-200/70 p-5 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-5 shadow-sm"
              >
                <div className="w-24 h-28 bg-zinc-50 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-100">
                  <img
                    src={item.product.images?.[0]?.url || 'https://via.placeholder.com/100'}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">{item.product.brand}</span>
                    <h3 className="font-semibold text-black hover:text-zinc-600 transition-colors text-base mt-0.5">
                      <Link to={`/product/${item.product.slug || item.product._id}`}>
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-zinc-500 text-xs mt-1.5 font-light">
                      Size: <span className="font-medium text-black">{item.size}</span> &nbsp;|&nbsp; Color: <span className="font-medium text-black">{item.color}</span>
                    </p>
                  </div>
                  <div className="mt-3 text-lg font-bold text-black">
                    ${item.product.discountPrice || item.product.price}
                  </div>
                </div>

                <div className="flex sm:flex-col justify-between items-center sm:items-end gap-4 border-t sm:border-t-0 border-zinc-100 pt-4 sm:pt-0">
                  <div className="flex items-center space-x-2.5 bg-zinc-50 border border-zinc-200/50 p-1.5 rounded-xl">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product._id,
                          item.size,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-zinc-500 hover:text-black hover:border-black transition-all shadow-sm"
                    >
                      <FiMinus size={12} />
                    </button>
                    <span className="text-black font-semibold text-sm w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product._id,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 bg-white border border-zinc-200 rounded-lg flex items-center justify-center text-zinc-500 hover:text-black hover:border-black transition-all shadow-sm"
                    >
                      <FiPlus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      handleRemove(item.product._id, item.size, item.color)
                    }
                    className="w-9 h-9 border border-zinc-100 hover:border-red-200 text-zinc-400 hover:text-red-600 rounded-xl flex items-center justify-center transition-all bg-zinc-50/50 hover:bg-red-50/30"
                    title="Remove item"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-zinc-200/70 p-6 rounded-2xl shadow-sm sticky top-24 space-y-6"
            >
              <h3 className="text-lg font-poppins font-bold text-black uppercase tracking-wider">
                Order Summary
              </h3>

              <div className="space-y-4 text-sm text-zinc-600">
                <div className="flex justify-between font-light">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-black">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-light">
                  <span>Shipping Concierge</span>
                  <span className="font-semibold text-black">{totalPrice > 100 ? 'FREE' : '$10.00'}</span>
                </div>
                <div className="flex justify-between text-black font-bold text-base pt-4 border-t border-zinc-100">
                  <span>Estimated Total</span>
                  <span className="text-lg">${(totalPrice + (totalPrice > 100 ? 0 : 10)).toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors uppercase tracking-wider text-xs flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <FiChevronRight size={14} />
                </button>

                <Link
                  to="/shop"
                  className="block text-center text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-black transition-colors py-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
