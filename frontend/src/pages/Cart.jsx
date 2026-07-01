import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleRemove = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color }));
    toast.success('Removed from cart');
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
      <div className="container mx-auto px-4 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <FiShoppingBag className="w-20 h-20 mx-auto text-white/20 mb-6" />
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-white/60 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
            >
              <FiArrowLeft />
              <span>Continue Shopping</span>
            </Link>
          </motion.div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-poppins font-bold text-white">
              Shopping Cart
            </h1>
            <p className="text-white/60">{totalItems} items in your cart</p>
          </div>
          <button
            onClick={handleClearCart}
            className="mt-4 md:mt-0 text-red-400 hover:text-red-300 transition-colors duration-300"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={`${item.product._id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <img
                  src={item.product.images?.[0]?.url || 'https://via.placeholder.com/100'}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <Link
                    to={`/product/${item.product.slug || item.product._id}`}
                    className="text-white font-semibold hover:text-primary-400 transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-white/60 text-sm">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="text-white font-bold">
                    ${item.product.discountPrice || item.product.price}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product._id,
                          item.size,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20"
                    >
                      <FiMinus />
                    </button>
                    <span className="text-white w-8 text-center">
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
                      className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      handleRemove(item.product._id, item.size, item.color)
                    }
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FiTrash2 />
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
              className="glass p-6 rounded-xl sticky top-24"
            >
              <h3 className="text-xl font-poppins font-bold text-white mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-white/80">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${totalPrice > 100 ? 'FREE' : '$10.00'}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span>${(totalPrice + (totalPrice > 100 ? 0 : 10)).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
              </button>

              <Link
                to="/shop"
                className="block text-center mt-4 text-white/60 hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
  );
};

export default Cart;